import { window } from 'vscode';
import * as config from '../config';
import * as fileUtils from '../utils/file.utils';
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
    let notebookInfo: any;
    try {
      let content: string = String(await fileUtils.readDataFile(notebookUrl, 'utf8'));
      notebookInfo = JSON.parse(content);
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
    loadNotebook(notebookInfo);
  }
}
