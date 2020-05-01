"use strict";
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
} from "vscode";
import * as fs from "fs";
import * as path from "path";
import * as config from "../config";
import * as fileUtils from "../utils/file.utils";
import { Logger } from "../logger";
import { viewManager } from "../view.manager";
import { Template } from "../template.manager";

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
    // adjust for observable js notebook url input ...
    if (this._url.startsWith('https://observablehq.com/')) {
      // init map view uri from kepler.gl demo map config url query string
      this._url = this._url.replace('https://observablehq.com/', '');
      this._uri = Uri.parse(this._url);
      const pathTokens: Array<string> = this._uri.path.split('/');
      this._fileName = pathTokens[pathTokens.length - 1]; // last in url
      this._isRemoteData = true;
    }
    this._viewUri = this._uri.with({ scheme: 'js.notebook.view' });
    this._logger = new Logger(`${viewType}:`, config.logLevel);

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

    // create html template for the webview
    const stylesPath: string = Uri.file(path.join(this._extensionPath, 'web/styles'))
      .with({ scheme: 'vscode-resource' })
      .toString(true);
    const scriptsPath: string = Uri.file(path.join(this._extensionPath, 'web/scripts'))
      .with({ scheme: 'vscode-resource' })
      .toString(true);
    if (template) {
      this._html = template?.replace({
        styles: stylesPath,
        scripts: scriptsPath
      });
    }

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
    } else {
      this._panel = viewPanel;
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
          case "refresh":
            // loads notebook view
            this.refresh();
            break;
          case "loadView":
            // launch new view
            this.loadView(message.viewName, message.uri);
            break;
        }
      },
      null,
      this._disposables
    );

    return viewPanel;
  } // end of initWebview()

  
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
   * Creates webview options with local resource roots, etc. for map webview display.
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
   * Reload map view on map data save changes or vscode IDE reload.
   */
  public async refresh(): Promise<void> {
    // reveal corresponding map view panel
    this._panel.reveal(this._panel.viewColumn, true); // preserve focus

    // determine data file encoding
    const dataEncoding: string = 'utf8'; // default
    if (this._url.startsWith('https://') && dataEncoding === 'utf8') {
      // load remote text data file
      this._content = String(await fileUtils.readDataFile(this._url, dataEncoding));
      this.refreshView();
    } else if (dataEncoding === 'utf8') {
      // open local text document
      workspace.openTextDocument(this.uri).then((document) => {
        this._logger.debug('refresh(): file:', this._fileName);
        this._content = document.getText();
        // this.refreshView();
      });
    } else {
      // delegate to refresh view for loading binary shapefiles
      this.refreshView();
    }
  }

  /**
   * Refreshes notebook view.
   */
  public async refreshView() {
    try {
      // update notebook view
      this.webview.postMessage({
        command: 'refresh',
        fileName: this._fileName,
        uri: this._uri.toString(),
      });
    } catch (error) {
      this._logger.debug('refresh():', error.message);
      this.webview.postMessage({ error: error });
    }
  } // end of refreshView()

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