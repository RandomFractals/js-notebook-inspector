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
  constructor(public url: string = '', 
    public fileName: string = '', 
    public authorName: string = '') {
    
  }

  /**
   * Gets notebook path.
   */
  public get path(): string {
    return `${this.authorName}/${this.fileName}.js`;
  }

}
