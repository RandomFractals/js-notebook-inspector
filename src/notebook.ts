import {
  TreeItem, 
  TreeItemCollapsibleState
} from 'vscode';
import * as path from 'path';

/**
 * Notebook info type.
 */
export class Notebook extends TreeItem {

  /**
   * Creates new notebook from url.
   * @param url Notebook url.
   * @param fileName Notebook file name.
   * @param authorName Notebook author name.
   * @param source Optional notebook source code.
   * @param document Optional notebook metadata document.
   */
  constructor(public url: string,
    public fileName: string,
    public authorName: string = '',
    public source: string = '',
    public document: any = undefined) {
    super(fileName, TreeItemCollapsibleState.Collapsed);
    // set notebook tree item tooltip
    this.tooltip = `${this.authorName}/${this.fileName}`;
  }

  /**
   * Gets notebook path.
   */
  public get path(): string {
    return `${this.authorName}/${this.fileName}.js`;
  }

  /**
   * Gets notebook js module.
   */
  public get module(): Function {
    let jsModule: Function = new Function(`return undefined`);
    if (this.source.length > 0) {
      // parse notebook JS and create a notebook prototype for introspection
      jsModule = new Function(`${this.source.slice(0, -26)} return notebook;`)();
    }
    return jsModule;
  }

  /**
   * Notebook icon.
   */
  iconPath = {
    light: path.join(__filename, '../../notebook.svg'),
    dark: path.join(__filename, '../../notebook.svg')
  };
}
