import { window } from 'vscode';
import * as config from '../config';
import fetch from 'node-fetch';
import { Logger, LogLevel } from '../logger';
import { INotebookProvider } from '../notebook.manager';

/**
 * Observable JS Notebook provider.
 */
export class ObservableNotebookProvider implements INotebookProvider {
  public supportedFileTypes: Array<string> = ['.js', '.jsnb'];

  private logger: Logger = new Logger('observable.notebook.provider:', config.logLevel);

  /**
   * Creates new JS notebook provider for Observable .js and .jsnb notebook files.
   */
  constructor() {
    this.logger.debug('created for:', this.supportedFileTypes);
  }

  /**
   * Gets local or remote notebook info.
   * @param notebookUrl Local notebook file path or remote notebook url.
   * @param parseOptions Notebook parse options.
   * @param loadNotebook Load notebook callback.
   */
  public async getNotebook(
    notebookUrl: string,
    parseOptions: any,
    loadNotebook: Function
  ): Promise<void> {
    try {
      const notebookDocumentUrl: string = 
        notebookUrl.replace(config.observableSiteUrl, config.observableApiUrl) + '.js';
      this.logger.debug('getNotebook(): documentUrl:', notebookDocumentUrl);
      fetch(notebookDocumentUrl)
        .then((response: any) => response.text())
        .then((notebookJS: string) => {
          // parse notebook JS and create a notebook prototype for introspection
          const notebookInfo = new Function(`${notebookJS.slice(0, -26)} return notebook;`)();
          this.logger.debug('notebook:', JSON.stringify(notebookInfo));
          loadNotebook(notebookInfo);
        });
    } catch (error) {
      this.logger.logMessage(
        LogLevel.Error,
        `getNotebook(): Error parsing '${notebookUrl}' \n\t Error:`,
        error.message
      );
      window.showErrorMessage(
        `Unable to load notebook: '${notebookUrl}'. \n\t Error: ${error.message}`
      );
    }
  }
}
