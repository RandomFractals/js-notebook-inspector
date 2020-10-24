import {
  TreeItem, 
  TreeItemCollapsibleState
} from 'vscode';
import * as path from 'path';

const MD_CELL: string = 'md`';
const MD_CODE: string = '```';
const NEW_LINE: string = '\n';

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
   * Gets notebook js code string.
   */
  public get code(): string {
    return this.document.nodes.map((node: any) => node.value).join('\n\n');
  }

  /**
   * Gets notebook markdown text.
   */
  public get markdown(): string {
    const markdownLines: string[] = [];
    let inJS: boolean = false;

    // crete markdown text lines
    this.document.nodes.forEach((node:any) => {
      const cell: string = node.value.trim();
      if (cell.substring(0, 3) === MD_CELL) {
        if (inJS) {
          // start markdown code demarcation
          markdownLines.push(MD_CODE);
          inJS = false;
        }
        else {
          markdownLines.push('');
        }
        markdownLines.push(cell.substring(3, cell.length -1) + '');
      }
      else {
        if (!inJS) {
          // close markdown code demarcation
          markdownLines.push(MD_CODE);
          inJS = true;
        }
        else {
          markdownLines.push('');
        }
        markdownLines.push(node.value + '');
      }
    });

    if (inJS) {
      // close markdown code demarcation
      markdownLines.push(MD_CODE);
    }
    return markdownLines.join(NEW_LINE);
  }

  /**
   * Notebook icon.
   */
  iconPath = {
    light: path.join(__filename, '../../notebook.svg'),
    dark: path.join(__filename, '../../notebook.svg')
  };
}
