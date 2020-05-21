import {
  Disposable,
  Event,
  EventEmitter,
  FileType,
  TreeDataProvider,
  TreeItem,
  TreeItemCollapsibleState,
  window,
  workspace
} from "vscode";
import * as fs from 'fs';
import * as path from 'path';
import * as config from './config';
import { Notebook } from './notebook';
import { ObservableNotebookProvider } from './notebook.providers/observable.notebook.provider';
import { Logger } from './logger';

/**
 * Notebook Manager API.
 */
export interface INotebookManager {
  
  /**
  * Gets INotebookProvider instance for the specified notebook url.
  * @param notebookUrl Local notebook file path or remote notebook url.
  */
  getNotebookProvider(notebookUrl: string): INotebookProvider;

  /**
  * Gets local or remote notebook info.
  * @param notebookUrl Local notebook file path or remote notebook url.
  * @param parseOptions Notebook parse options.
  * @param loadNotebook Load notebook callback.
  */
  getNotebook(notebookUrl: string, parseOptions: any, loadNotebook: Function): void;
}

/**
 * Notebook Provider API interface.
 */
export interface INotebookProvider {

  /**
   * Supported notebook provider file mime types or extensions.
   */
  supportedFileTypes: Array<string>;

  /**
   * Gets local or remote notebook info.
   * @param notebookUrl Local notebook file path or remote notebook url.
   * @param parseOptions Notebook parse options.
   * @param loadData Load notebook callback.
   */
  getNotebook(notebookUrl: string, parseOptions: any, loadNotebook: Function): void;
 
}

/**
 * INotebookManager implementation.
 */
export class NotebookManager implements INotebookManager, TreeDataProvider<Notebook> {
  
  // singleton instance
  private static _instance: NotebookManager;
  private _notebookProviders: Map<string, INotebookProvider>;
  private _logger: Logger = new Logger('notebook.manager:', config.logLevel);

  /**
   * Creates new data manager instance and loads IDataProvider's
   * for the supported data formats listed in package.json.
   */
  private constructor() {
    this._notebookProviders = this.loadNotebookProviders();
  }

 /**
   * Creates data manager singleton instance.
   */
  public static get Instance() {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  /**
   * Initializes notebook providers for the supported notebook formats.
   * @see package.json and config.ts for more info.
   */
  private loadNotebookProviders(): any {
    this._logger.debug('loadNotebookProviders(): loading notebook providers...');
    // create notebook provider instances for the supported notebook formats
    const notebookProviders: Map<string, INotebookProvider> = new Map<string, INotebookProvider>();
    this.addNotebookProvider(notebookProviders, new ObservableNotebookProvider());
    this._logger.debug('loadNotebookProviders(): loaded notebook providers:', Object.keys(notebookProviders));
    return notebookProviders;
  }

 /**
   * Adds new notebook provider to the provider/file types map.
   * @param notebookProviderMap Notebook provider map to update.
   * @param notebookProvider Notebook provider to add.
   */
  private addNotebookProvider(notebookProviderMap: Map<string, INotebookProvider>, 
    notebookProvider: INotebookProvider): void {
    notebookProvider.supportedFileTypes.forEach(fileType => {
      notebookProviderMap.set(fileType, notebookProvider);
    });
  }

  /**
   * Gets INotebookProvider instance for the specified notebook url.
   * @param notebookUrl Local notebook file path or remote notebook url.
   */
  public getNotebookProvider(notebookUrl: string): INotebookProvider {
    const fileName: string = path.basename(notebookUrl);
    const fileType: string = path.extname(fileName); // file extension
    if (fileType.length > 0 && this._notebookProviders.has(fileType)) {
      return this._notebookProviders.get(fileType);
    } else if (this._notebookProviders.has(fileName)) { // no file extension
      return this._notebookProviders.get(fileName);
    }
    return this._notebookProviders.get('.js'); // default to js notebook provider for now
  }

  /**
   * Gets local or remote notebook info.
   * @param notebookUrl Local notebook file path or remote notebook url.
   * @param parseOptions Notebook parse options.
   * @param loadNotebook Load notebook callback.
   */
  public getNotebook(notebookUrl: string, parseOptions: any, loadNotebook: Function): void {
    const notebookProvider: INotebookProvider = this.getNotebookProvider(notebookUrl);
    notebookProvider.getNotebook(notebookUrl, parseOptions, loadNotebook);
  }

  /**
   * Gets notebook collections tree item.
   * @param notebook Notebook tree item to add to the notebooks tree view.
   */
  getTreeItem(notebook: Notebook): TreeItem {
    return notebook;
  }

  /**
   * Gets notebook collections for the tree view display.
   * @param notebook The notebook to get children for, or null for notebooks tree root.
   */
  async getChildren(notebook?: Notebook): Promise<Notebook[] | undefined> {
    if (!notebook) { 
      // TODO: show starred notebooks for the notebook collections root to start with
      return undefined;
    }
    // TODO: get and return imported notebooks
    return [];
  }
}

// export Notebook Manager singleton
export const notebookManager = NotebookManager.Instance;
