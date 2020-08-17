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
import { NotebookTreeDataProvider } from './notebook.providers/notebook.tree.data.provider';
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

  /**
  * Gets notebooks info.
  * @param notebooksUrl Notebooks url with search query params.
  * @param parseOptions Notebooks parse options.
  * @param loadNotebook Load notebooks callback.
  */
  getNotebooks(notebooksUrl: string, parseOptions: any, loadNotebooks: Function): void;

  /**
   * Added notebook tree data provider.
   * @param viewId Notebook tree view id.
   * @param notebookTreeDataProvider Notebook tree view provider instance.
   */
  registerNotebookTreeDataProvider(viewId: string, notebookTreeDataProvider: NotebookTreeDataProvider): void;

  /**
   * Adds a notebook to a notebook collection.
   * @param notebookCollectionName Notebook collection name to add notebook to.
   * @param notebook The notebook to add to notebooks collection.
   */
  addNotebook(notebookCollectionName: string, notebook: Notebook): void;

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
 
  /**
  * Gets notebooks info.
  * @param notebooksUrl Notebooks url with search query params.
  * @param parseOptions Notebooks parse options.
  * @param loadNotebook Load notebooks callback.
  */
  getNotebooks(notebooksUrl: string, parseOptions: any, loadNotebooks: Function): void;

}

/**
 * INotebookManager implementation.
 */
export class NotebookManager implements INotebookManager {
  
  // singleton instance
  private static _instance: NotebookManager;
  private _notebookProviders: Map<string, INotebookProvider>;
  private _notebookTreeDataProviders: Map<string, NotebookTreeDataProvider> =
    new Map<string, NotebookTreeDataProvider>();
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
  * Gets notebooks info.
  * @param notebooksUrl Notebooks url with search query params.
  * @param parseOptions Notebooks parse options.
  * @param loadNotebook Load notebooks callback.
  */
  public getNotebooks(notebooksUrl: string, parseOptions: any, loadNotebooks: Function): void {
    const notebookProvider: INotebookProvider = this.getNotebookProvider(notebooksUrl);
    notebookProvider.getNotebooks(notebooksUrl, parseOptions, loadNotebooks);
  }

  /**
   * Added notebook tree data provider.
   * @param viewId Notebook tree view id/notebook collection name.
   * @param notebookTreeDataProvider Notebook tree view provider instance.
   */
  public registerNotebookTreeDataProvider(viewId: string, notebookTreeDataProvider: NotebookTreeDataProvider): void {
    window.registerTreeDataProvider(viewId, notebookTreeDataProvider);
    this._notebookTreeDataProviders.set(viewId, notebookTreeDataProvider);
  }

  /**
   * Adds a notebook to a notebook collection.
   * @param notebookCollectionName Notebook collection name to add notebook to.
   * @param notebook The notebook to add to notebooks collection.
   */
  public addNotebook(notebookCollectionName: string, notebook: Notebook): void {
    const notebookCollectionKey: string = `js.notebook.${notebookCollectionName.toLowerCase()}`;
    const notebookTreeDataProvider = this._notebookTreeDataProviders.get(notebookCollectionKey);
    switch (notebookCollectionKey) {
      case 'js.notebook.favorite':
        // get favorite notebooks stored in global state
        let collectionNotebooks: Notebook[] = 
          notebookTreeDataProvider.context.globalState.get(notebookCollectionKey);
        if (collectionNotebooks === undefined) {
          // create new favorite notebooks collection
          collectionNotebooks = [];
        }
        if (collectionNotebooks.findIndex((favoriteNotebook: Notebook) => 
          favoriteNotebook.url === notebook.url) < 0) {
          // add notebook to favorites in global state for all workspaces
          collectionNotebooks.push(notebook);
          notebookTreeDataProvider.context.globalState.update(notebookCollectionKey, collectionNotebooks);  
        }

        // refresh top level tree nodes
        notebookTreeDataProvider.refresh();
        break;
    }
  }

}

// export Notebook Manager singleton
export const notebookManager = NotebookManager.Instance;
