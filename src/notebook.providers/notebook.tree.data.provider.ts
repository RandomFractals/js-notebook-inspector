import {
  Disposable,
  Event,
  EventEmitter,
  ExtensionContext,
  FileType,
  TreeDataProvider,
  TreeItem,
  TreeItemCollapsibleState,
  window,
  workspace,
  Uri
} from "vscode";
import * as fs from 'fs';
import * as path from 'path';
import * as config from '../config';
import { Notebook } from '../notebook';
import { notebookManager } from '../notebook.manager';
import { Logger } from '../logger';

/**
 * Implements TreeDataProvider for notebook collections tree view display.
 * @see https://code.visualstudio.com/api/extension-guides/tree-view
 */
export class NotebookTreeDataProvider implements TreeDataProvider<Notebook> {
  
  private _logger: Logger = new Logger('notebook.tree.data.provider:', config.logLevel);
  private _notebookCollectionKey: string = 'js.notebook.';
  private _onDidChangeTreeData: EventEmitter<Notebook | undefined> = 
    new EventEmitter<Notebook | undefined>();
  readonly onDidChangeTreeData: Event<Notebook | undefined> = this._onDidChangeTreeData.event;

  /**
   * Creates new notebook tree data provider.
   * @param notebookCollectionName Notebook tree view collection name,
   * i.e. Open, Poplular, Favorite etc.
   */
  constructor(public context: ExtensionContext, private notebookCollectionName: string) {
    this._notebookCollectionKey += notebookCollectionName.toLowerCase();
  }

  refresh(notebook?: Notebook): void {
    this._onDidChangeTreeData.fire(notebook);
  }

  /**
   * Gets notebook collection tree item.
   * @param notebook Notebook tree item to add to the notebooks tree view.
   */
  getTreeItem(notebook: Notebook): TreeItem {
    if (notebook) {
      this.setIconPath(notebook);
    }
    return notebook;
  }

  /**
   * Gets notebook collections for the tree view display.
   * @param notebook The notebook to get children for, or null for notebooks tree root.
   */
  async getChildren(notebook?: Notebook): Promise<Notebook[] | undefined> {
    let collectionNotebooks: Notebook[] = [];
    if (!notebook) {
      switch (this._notebookCollectionKey) {
        case 'js.notebook.favorite':
          // get favorite notebooks for the notebook collections root to start with
          collectionNotebooks = this.context.globalState.get<Notebook[]>(this._notebookCollectionKey);
          break;
      }      
    }
    else {
      // TODO: get and return imported notebooks
    }

    // set notebook tree icon path
    collectionNotebooks.forEach(notebook => this.setIconPath(notebook));
    return Promise.resolve(collectionNotebooks);
  }

  private setIconPath(notebook: Notebook): void {
    notebook.iconPath = {
      light: this.getIconPath(),
      dark: this.getIconPath()
    };
  }

  private getIconPath(): string {
    return path.join(this.context.extensionPath, 'images/notebook.svg');
  }
}
