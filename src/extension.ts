import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
        if (document.languageId === 'javascript' && document.uri.scheme === 'file') {
            insertTemplate(document.uri);
        }
    });

    context.subscriptions.push(disposable);
}

function insertTemplate(uri: vscode.Uri) {
    const template = [
        "/**",
        " * File: $0      // eg. : filename.js",
        " * Author: ${1}    // eg. : John Doe",
        " * Created: ${2}   // eg. : March 8, 2024",
        " * Modified: ${3}  // March 10, 2024",
        " * Description: This file contains the implementation of XYZ feature.",
        " * Version: 1.0",
        " */"
    ].join('\n');

    vscode.workspace.openTextDocument(uri).then(doc => {
        const edit = new vscode.WorkspaceEdit();
        const firstLine = new vscode.Position(0, 0);
        edit.insert(uri, firstLine, template);

        vscode.workspace.applyEdit(edit);
    });
}
