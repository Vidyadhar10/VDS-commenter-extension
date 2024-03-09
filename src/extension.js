"use strict";
exports.__esModule = true;
exports.activate = void 0;
var vscode = require("vscode");
function activate(context) {
    var disposable = vscode.workspace.onDidSaveTextDocument(function (document) {
        if (document.languageId === 'javascript' && document.uri.scheme === 'file') {
            insertTemplate(document.uri);
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function insertTemplate(uri) {
    var template = [
        "/**",
        " * File: $0      // eg. : filename.js",
        " * Author: ${1}    // eg. : John Doe",
        " * Created: ${2}   // eg. : March 8, 2024",
        " * Modified: ${3}  // March 10, 2024",
        " * Description: This file contains the implementation of XYZ feature.",
        " * Version: 1.0",
        " */"
    ].join('\n');
    vscode.workspace.openTextDocument(uri).then(function (doc) {
        var edit = new vscode.WorkspaceEdit();
        var firstLine = new vscode.Position(0, 0);
        edit.insert(uri, firstLine, template);
        vscode.workspace.applyEdit(edit);
    });
}
