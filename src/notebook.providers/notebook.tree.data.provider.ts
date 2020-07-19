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

  /**
   * Creates new notebook tree data provider.
   * @param notebookCollectionName Notebook tree view collection name,
   * i.e. Open, Poplular, Favorite etc.
   */
  constructor(private notebookCollectionName: string) {

  }

  /**
   * Gets notebook collection tree item.
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
