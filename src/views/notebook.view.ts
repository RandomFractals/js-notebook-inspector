'use strict';
import {
  workspace,
  window,
  Disposable,
  Uri,
  ViewColumn,
  WorkspaceFolder,
  Webview,
  WebviewPanel,
  WebviewPanelOnDidChangeViewStateEvent,
  WebviewPanelSerializer,
  commands,
} from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import fetch from 'node-fetch';
import * as config from '../config';
import * as fileUtils from '../utils/file.utils';
import { Logger } from '../logger';
import { Notebook } from '../notebook';
import { Template } from '../template.manager';
import { notebookManager } from '../notebook.manager';
import { viewManager } from '../view.manager';

/**
 * Notebook webview panel serializer for restoring notebook views on vscode reload.
 */
export class NotebookViewSerializer implements WebviewPanelSerializer {
  private _logger: Logger;

  /**
   * Creates new webview serializer.
   * @param viewType Web view type.
   * @param extensionPath Extension path for loading scripts, examples and data.
   * @param template Webview html template.
   */
  constructor(
    private viewType: string,
    private extensionPath: string,
    private template: Template | undefined
  ) {
    this._logger = new Logger(`${this.viewType}.serializer:`, config.logLevel);
  }

  /**
   * Restores webview panel on vscode reload.
   * @param webviewPanel Webview panel to restore.
   * @param state Saved web view panel state.
   */
  async deserializeWebviewPanel(webviewPanel: WebviewPanel, state: any) {
    this._logger.debug('deserializeWeviewPanel(): url:', state.uri.toString());
    const viewColumn: ViewColumn = webviewPanel.viewColumn
      ? webviewPanel.viewColumn
      : ViewColumn.One;
    viewManager.add(
      new NotebookView(
        this.viewType,
        this.extensionPath,
        Uri.parse(state.uri),
        viewColumn,
        this.template,
        webviewPanel
      )
    );
  }
}

/**
 * Notebook view implementation for this vscode extension.
 */
export class NotebookView {
  protected _disposables: Disposable[] = [];
  private _extensionPath: string;
  private _uri: Uri;
  private _url: string;
  private _fileName: string;
  private _fileExtension: string;
  private _fileSize: number = 0;
  private _title: string;
  private _isRemoteData: boolean = false;
  private _content: string = '';
  private _rowCount: number = 0;
  private _html: string = '';
  private _viewUri: Uri;
  private _panel: WebviewPanel;
  private _template: Template;
  private _notebook: Notebook;
  private _logger: Logger;

  /**
   * Creates new notebook view.
   * @param viewType webview type, i.e. notebook.view.
   * @param extensionPath Extension path for loading webview scripts, etc.
   * @param uri data source uri.
   * @param viewColumn vscode IDE view column to display this view in.
   * @param template Webview html template reference.
   * @param panel Optional webview panel reference for restore on vscode IDE reload.
   */
  constructor(
    viewType: string,
    extensionPath: string,
    uri: Uri,
    viewColumn: ViewColumn,
    template: Template | undefined,
    panel?: WebviewPanel
  ) {
    // save webview html template reference
    this._template = template;

    // save ext path, document uri, and create view uri
    this._extensionPath = extensionPath;
    this._uri = uri;
    this._url = uri.toString(true);
    this._fileName = path.basename(uri.fsPath);
    this._fileExtension = path.extname(this._fileName);    
    
    // check for remote data load
    if (this._url.startsWith('http://') || this._url.startsWith('https:')) {
      this._isRemoteData = true;
    }

    // TODO: move this to observable js notebook provider
    if (this._url.startsWith('https://observablehq.com/')) {
      // extract notebook name and author info
      const pathTokens: Array<string> = this._uri.path.split('/');
      const authorName: string = pathTokens[pathTokens.length - 2]; // observable js notebook author name
      this._fileName = pathTokens[pathTokens.length - 1]; // last in url
      this._isRemoteData = true;

      // create notebook instance for this view
      this._notebook = new Notebook(this._url, this._fileName, authorName);
    } else {
      window.showErrorMessage(`Invalid JS Notebook URL: ${this._url}. \
        \nOnly Observable JS Notebooks 📚 are supported in this JS Notebook 📓 Inspector 🔎 version.`);
    }

    // create notebook view uri
    this._viewUri = this._uri.with({ scheme: 'js.notebook.view' });
    this._logger = new Logger(`${viewType}:`, config.logLevel);
    this._logger.debug('initializing notebook:', this._url);

    // initialize webview panel
    this._panel = this.initWebview(viewType, viewColumn, panel);
    this.configure();
  } // end of constructor()

  /**
   * Initializes map webview panel.
   * @param viewType Map webview type, i.e. map.view.
   * @param viewColumn vscode IDE view column to display preview in.
   * @param viewPanel Optional web view panel to initialize.
   */
  private initWebview(
    viewType: string,
    viewColumn: ViewColumn,
    viewPanel: WebviewPanel | undefined
  ): WebviewPanel {

    // create webview panel title
    switch (viewType) {
      case 'js.notebook.view':
        this._title = this._fileName;
        break;
      default:
        // notebook.help
        this._title = 'Notebook View Help';
        break;
    }

    if (!viewPanel) {
      // create new webview panel
      viewPanel = window.createWebviewPanel(
        viewType,
        this._title,
        viewColumn,
        this.getWebviewOptions()
      );
      viewPanel.iconPath = Uri.file(path.join(this._extensionPath, "./images/notebook.png"));
      this._panel = viewPanel;
    } 
    else {
      // use deserialized webview panel
      this._panel = viewPanel;
    }

    // create webview html template
    if (this._template && this._notebook) {
      const cspSource: string = this.webview.cspSource;
      this._html = this._template.replace({
        cspSource: cspSource,
        notebookUrl: this._notebook.url,
        notebookPath: this._notebook.path,
        notebookName: this._notebook.fileName,
        notebookAuthor: this._notebook.authorName
      });
    }

    // dispose view
    viewPanel.onDidDispose(() => {
        this.dispose();
      },
      null,
      this._disposables
    );

    // TODO: handle view state changes later
    viewPanel.onDidChangeViewState(
      (viewStateEvent: WebviewPanelOnDidChangeViewStateEvent) => {
        let active = viewStateEvent.webviewPanel.visible;
      },
      null,
      this._disposables
    );

    // process web view messages
    this.webview.onDidReceiveMessage(
      (message) => {
        switch (message.command) {
          case 'refresh':
            // loads notebook view
            this.refresh();
            break;
          case 'loadView':
            // launch new view
            this.loadView(message.viewName, message.uri);
            break;
          case 'saveNotebook':
            // save notebook in requested file format
            this.saveNotebook(message.fileType);
            break;
        }
      },
      null,
      this._disposables
    );

    return viewPanel;
  } // end of initWebview()

  /**
   * Creates webview options with local resource roots, etc. for notebook webview display.
   */
  private getWebviewOptions(): any {
    return {
      enableScripts: true,
      enableCommandUris: true,
      retainContextWhenHidden: true,
      localResourceRoots: this.getLocalResourceRoots(),
    };
  }

  /**
   * Creates local resource roots for loading scripts in webview.
   */
  private getLocalResourceRoots(): Uri[] {
    const localResourceRoots: Uri[] = [];
    const workspaceFolder:
      | WorkspaceFolder
      | undefined = workspace.getWorkspaceFolder(this.uri);
    if (workspaceFolder) {
      localResourceRoots.push(workspaceFolder.uri);
    } else if (!this.uri.scheme || this.uri.scheme === "file") {
      localResourceRoots.push(Uri.file(path.dirname(this.uri.fsPath)));
    }
    // add web view styles and scripts folders
    localResourceRoots.push(
      Uri.file(path.join(this._extensionPath, "./web/styles"))
    );
    localResourceRoots.push(
      Uri.file(path.join(this._extensionPath, "./web/scripts"))
    );
    this._logger.debug('getLocalResourceRoots():', localResourceRoots);
    return localResourceRoots;
  }

  /**
   * Configures webview html for view display.
   */
  public configure(): void {
    this.webview.html = this.html;
    // NOTE: let webview fire refresh message
    // when map view DOM content is initialized
    // see: this.refresh();
  }
  
  /**
   * Launches new view via commands.executeCommand interface.
   * @param viewName View name to launch.
   * @param url View document url parameter.
   * @see https://code.visualstudio.com/api/extension-guides/command
   */
  private loadView(viewName: string, url: string): void {
    const fileUri: Uri = Uri.parse(url);
    try {
      this._logger.debug(`loadView(): loading view... \n ${viewName}`, url);
      //fileUri.toString(true)); // skip encoding
      if (url.startsWith("http://") || url.startsWith("https://")) {
        // launch requested remote data view command
        this._logger.debug(`loadView():executeCommand: \n ${viewName}`, url);
        commands.executeCommand(viewName, fileUri);
      } else if (fs.existsSync(fileUri.fsPath)) {
        // launch requested local data view command
        this._logger.debug(`loadView():executeCommand: \n ${viewName}`, fileUri.fsPath);
        commands.executeCommand(viewName, fileUri);
      } else {
        // try to find requested data file(s) in open workspace
        workspace.findFiles(`**/${url}`).then((files) => {
          if (files.length > 0) {
            // pick the 1st matching file from the workspace
            const dataUri: Uri = files[0];
            // launch requested view command
            this._logger.debug(`loadView():executeCommand: \n ${viewName}`, 
              dataUri.toString(true)); // skip encoding
            commands.executeCommand(viewName, dataUri);
          } else {
            this._logger.error(`loadView(): Error:\n no such files in this workspace:`, url);
            window.showErrorMessage(`No '**/${url}' file(s) found in this workspace!`);
          }
        });
      }
    } catch (error) {
      this._logger.error(`loadView(${url}): Error:\n`, error.message);
      window.showErrorMessage(
        `Failed to load '${viewName}' for document: '${url}'! Error:\n${error.message}`
      );
    }
  } // end of loadView()

  /**
   * Refreshes notebook view on load or vscode IDE reload.
   */
  public async refresh(): Promise<void> {
    // reveal corresponding notebook view panel
    this._panel.reveal(this._panel.viewColumn, true); // preserve focus

    // determine data file encoding
    const dataEncoding: string = 'utf8'; // default
    if (this._url.startsWith('https://') && dataEncoding === 'utf8') {
      // load remote notebook document
      notebookManager.getNotebook(this._url, {}, // parse options
        (notebookJS: string) => {
          this._content = notebookJS;
          this._notebook.source = notebookJS;
          this.refreshView(this._notebook.module);
        });
    } else if (dataEncoding === 'utf8') {
      // open local text document
      workspace.openTextDocument(this.uri).then((document) => {
        this._logger.debug('refresh(): file:', this._fileName);
        this._content = document.getText();
        // this.refreshView();
      });
    } else {
      // delegate to refresh view for loading binary shapefiles
      this.refreshView(this._notebook);
    }
  }

  /**
   * Refreshes notebook view.
   */
  public async refreshView(notebook: any) {
    try {
      // update notebook view
      this.webview.postMessage({
        command: 'refresh',
        fileName: this._fileName,
        uri: this._uri.toString(),
        notebook: notebook
      });
    } catch (error) {
      this._logger.debug('refresh():', error.message);
      this.webview.postMessage({ error: error });
    }
  } // end of refreshView()

  /**
   * Saves notebook in requested file formats.
   * @param fileType Notebook file type to save.
   */
  private async saveNotebook(fileType: string): Promise<void> {
    // create requested notebook file name
    let notebookFileName: string = `${this._notebook.fileName}${fileType}`;

    // create full notebook file path for saving
    let notebookFilePath: string = path.dirname(this._uri.fsPath);
    const workspaceFolders: readonly WorkspaceFolder[] | undefined = workspace.workspaceFolders;
    if (this._isRemoteData && workspaceFolders && workspaceFolders.length > 0) {
      // use 'rootPath' workspace folder for saving remote notebook file
      notebookFilePath = workspaceFolders[0].uri.fsPath;
    }
    notebookFilePath = path.join(notebookFilePath, notebookFileName);
    this._logger.debug('saveNotebook(): saving notebook file:', notebookFilePath);

    // display save file dialog
    const notebookFileUri: Uri | undefined = await window.showSaveDialog({
      defaultUri: Uri.parse(notebookFilePath).with({scheme: 'file'})
    });

    if (notebookFileUri) {
      // save notebook file
      switch (fileType) {
        case '.js':
          const notebookDocumentUrl: string = 
            `${config.observableApiUrl}/${this._notebook.authorName}/${this._notebook.fileName}.js`;
          fetch(notebookDocumentUrl)
            .then((response: any) => response.text())
            .then((notebookJS: string) => {
              this.saveFile(notebookFileUri, notebookJS);
            });
          break;
        case '.html':
          // TODO
          window.showInformationMessage('Save notebook html coming soon! :)');
          break;
      }
    }
  } // end of saveNotebook()

  /**
   * Saves notebook file to disk and opens it after save.
   * @param fileUri Notebook file Uri.
   * @param content Notebook file content.
   * @param encoding Notebook file encoding.
   */
  private saveFile(fileUri: Uri, content: string, encoding: string = 'utf8') {
      // write notebook file to disk
      const filePath: string = fileUri.fsPath;
      fs.writeFile(filePath, content, encoding, (error) => {
        if (error) {
          this._logger.error(`saveNotebook(): Error saving '${filePath}'. \n\t Error:`, error.message);
          window.showErrorMessage(`Unable to save data file: '${filePath}'. \n\t Error: ${error.message}`);
        }
        else { // if (this.openSavedFileEditor) {
          // open saved notebook file
          this.loadView('vscode.open', fileUri.with({scheme: 'file'}).toString(false)); // skip encoding
        }
      });
  }

  /**
   * Logs data stats and optional data schema or metadata for debug.
   * @param dataRows Data rows array.
   * @param dataSchema Optional data schema or metadata for debug logging.
   */
  private logDataStats(dataRows: Array<any>, dataSchema: any = null): void {
    // get data file size in bytes
    this._fileSize = fileUtils.getFileSize(this._uri.fsPath); //this._dataUrl);
    this._rowCount = dataRows.length;
    // this.updateStats(this._columns, this._rowCount);
    if (dataRows.length > 0 && dataRows.constructor !== Uint8Array) {
      const firstRow = dataRows[0];
      this._logger.debug('logDataStats(): 1st row:', firstRow);
      this._logger.debug('logDataStats(): rowCount:', this._rowCount);
    }
  }

  /**
   * Disposes this view resources.
   */
  public dispose() {
    viewManager.remove(this);
    this._panel.dispose();
    while (this._disposables.length) {
      const item = this._disposables.pop();
      if (item) {
        item.dispose();
      }
    }
  }

  /**
   * Gets view panel visibility status.
   */
  get visible(): boolean {
    return this._panel.visible;
  }

  /**
   * Gets the underlying webview instance for this view.
   */
  get webview(): Webview {
    return this._panel.webview;
  }

  /**
   * Gets the notebook uri for this view.
   */
  get uri(): Uri {
    return this._uri;
  }

  /**
   * Gets the view uri to load on commands triggers or vscode IDE reload.
   */
  get viewUri(): Uri {
    return this._viewUri;
  }

  /**
   * Gets the html content to load for this webview.
   */
  get html(): string {
    return this._html;
  }
}
