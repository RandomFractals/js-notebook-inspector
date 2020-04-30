'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const config = require("./config");
const logger_1 = require("./logger");
// extension logger
const logger = new logger_1.Logger('geo.data.viewer:', config.logLevel);
/**
 * Activates this extension per rules set in package.json.
 * @param context vscode extension context.
 * @see https://code.visualstudio.com/api/references/activation-events for more info.
 */
function activate(context) {
    const extensionPath = context.extensionPath;
    logger.info('activate(): activating from extPath:', extensionPath);
    // add JS Notebook: View Notebook from URL command
    const notebookUrlCommand = vscode_1.commands.registerCommand('js.notebook.url', () => {
        vscode_1.window.showInputBox({
            ignoreFocusOut: true,
            placeHolder: 'https://observablehq.com/@<username>/<notebook>',
            prompt: 'Observable JS Notebook URL'
        }).then((notebookUrl) => {
            if (notebookUrl && notebookUrl !== undefined && notebookUrl.length > 0) {
                const notebookUri = vscode_1.Uri.parse(notebookUrl);
                // launch new notebook view
                vscode_1.commands.executeCommand('js.notebook.view', notebookUri);
            }
        });
    });
    context.subscriptions.push(notebookUrlCommand);
    logger.info('activate(): activated! extPath:', context.extensionPath);
} // end of activate()
exports.activate = activate;
/**
 * Deactivates this vscode extension to free up resources.
 */
function deactivate() {
    // TODO: add extension cleanup code, if needed
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map