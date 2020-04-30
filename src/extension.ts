'use strict';
import {
  workspace,
  window,
  commands,
  ExtensionContext,
	Disposable,
  Uri,
  ViewColumn
} from 'vscode';
import * as path from 'path';
import * as config from './config';
import {Logger} from './logger';

// extension logger
const logger: Logger = new Logger('geo.data.viewer:', config.logLevel);

/**
 * Activates this extension per rules set in package.json.
 * @param context vscode extension context.
 * @see https://code.visualstudio.com/api/references/activation-events for more info.
 */
export function activate(context: ExtensionContext) {
	const extensionPath: string = context.extensionPath;
	logger.info('activate(): activating from extPath:', extensionPath);

	// add JS Notebook: View Notebook from URL command
	const notebookUrlCommand: Disposable = commands.registerCommand('js.notebook.url', () => {
		window.showInputBox({
			ignoreFocusOut: true,
			placeHolder: 'https://observablehq.com/@<username>/<notebook>',
			prompt: 'Observable JS Notebook URL'
		}).then((notebookUrl) => {
			if (notebookUrl && notebookUrl !== undefined && notebookUrl.length > 0) {
				const notebookUri: Uri = Uri.parse(notebookUrl);
				// launch new notebook view
				commands.executeCommand('js.notebook.view', notebookUri);
			}
		});
	});
	context.subscriptions.push(notebookUrlCommand);

	logger.info('activate(): activated! extPath:', context.extensionPath);
}	// end of activate()


/**
 * Deactivates this vscode extension to free up resources.
 */
export function deactivate() {
  // TODO: add extension cleanup code, if needed
}
