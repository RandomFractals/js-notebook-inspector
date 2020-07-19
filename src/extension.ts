'use strict';
import {
  workspace,
  window,
  commands,
  ExtensionContext,
  Disposable,
  Uri,
  ViewColumn,
} from 'vscode';
import * as path from 'path';
import * as config from './config';
import { Logger } from './logger';
import { NotebookView, NotebookViewSerializer } from './views/notebook.view';
import {
  Template,
  ITemplateManager,
  TemplateManager,
} from './template.manager';
import { notebookManager } from './notebook.manager';
import { NotebookTreeDataProvider } from './notebook.providers/notebook.tree.data.provider';
import { viewManager } from './view.manager';

// extension logger
const logger: Logger = new Logger('js.notebook.inspector:', config.logLevel);

/**
 * Activates this extension per rules set in package.json.
 * @param context vscode extension context.
 * @see https://code.visualstudio.com/api/references/activation-events for more info.
 */
export function activate(context: ExtensionContext) {
  const extensionPath: string = context.extensionPath;
  logger.debug('activate(): activating from extPath:', extensionPath);

  // register notebook collections tree view data providers
  window.registerTreeDataProvider('js.notebook.open',
    new NotebookTreeDataProvider('Open'));
  window.registerTreeDataProvider('js.notebook.popular',
    new NotebookTreeDataProvider('Popular'));
  window.registerTreeDataProvider('js.notebook.favorite',
    new NotebookTreeDataProvider('Favorite'));
  
  // initialize webview panel templates
  const templateManager: ITemplateManager = new TemplateManager(context.asAbsolutePath('web'));
  const notebookViewTemplate: Template | undefined = templateManager.getTemplate('notebook.view.html');

  // register map view serializer for restore on vscode restart
  window.registerWebviewPanelSerializer('js.notebook.view',
    new NotebookViewSerializer(
      'notebook.view',
      extensionPath,
      notebookViewTemplate
    )
  );

	// add JS Notebook: View Notebook command
	const notebookWebview: Disposable = 
		createNotebookViewCommand('js.notebook.view', extensionPath, notebookViewTemplate);
	context.subscriptions.push(notebookWebview);

  // add JS Notebook: View Notebook from URL command
  const notebookUrlCommand: Disposable = commands.registerCommand('js.notebook.url', () => {
		window.showInputBox({
    	ignoreFocusOut: true,
      placeHolder: 'https://observablehq.com/@<username>/<notebook>',
      prompt: 'Observable JS Notebook URL',
    })
  	.then((notebookUrl) => {
    	if (
        notebookUrl &&
        notebookUrl !== undefined &&
        notebookUrl.length > 0
      ) {
      	const notebookUri: Uri = Uri.parse(notebookUrl);
        // launch new notebook view
        commands.executeCommand('js.notebook.view', notebookUri);
      }
    });
  });
  context.subscriptions.push(notebookUrlCommand);

  logger.debug('activate(): activated!');
} // end of activate()

/**
 * Deactivates this vscode extension to free up resources.
 */
export function deactivate() {
  // TODO: add extension cleanup code, if needed
}

/**
 * Creates js.notebook.view command.
 * @param viewType View command type.
 * @param extensionPath Extension path for loading scripts, examples and data.
 * @param viewTemplate View html template.
 */
function createNotebookViewCommand(
	viewType: string,
	extensionPath: string, 
	viewTemplate: Template | undefined
	): Disposable {
  const notebookWebview: Disposable = commands.registerCommand(viewType, (uri) => {
    let resource: any = uri;
    let viewColumn: ViewColumn = getViewColumn();
    if (!(resource instanceof Uri)) {
      if (window.activeTextEditor) {
        resource = window.activeTextEditor.document.uri;
      } else {
        window.showInformationMessage('Open a JS notebook file to view notebook.');
        return;
      }
		}
    const notebookView: NotebookView = new NotebookView(viewType,
      extensionPath, resource, viewColumn, viewTemplate);		
    viewManager.add(notebookView);
    return notebookView.webview;
  });
  return notebookWebview;
}

/**
 * Gets notebook panel display view column
 * based on the active editor view column.
 */
function getViewColumn(): ViewColumn {
	let viewColumn: ViewColumn = ViewColumn.One;
	const activeEditor = window.activeTextEditor;
	if (activeEditor && activeEditor.viewColumn) {
		viewColumn = activeEditor.viewColumn; // + 1; // for view on side ...
	}
	return viewColumn;
}
