/**
 * Notebook info type.
 */
export class Notebook {

  /**
   * Creates new notebook from url.
   * @param url Notebook url.
   * @param fileName Notebook file name.
   * @param authorName Notebook author name.
   */
  constructor(public url: string,
    public fileName: string,
    public authorName: string = '',
    public source: string = '') {
    
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
}
