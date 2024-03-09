import * as vscode from 'vscode';

// Array to keep track of newly created file URIs
const createdFileURIs: string[] = [];

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
        const uriString = document.uri.toString();

        // Check if the saved document is one of the newly created files
        if (createdFileURIs.includes(uriString)) {
            // Insert template comments for the newly created file
            insertTemplate(document.uri);

            // Remove the URI from the array since we handled it
            const index = createdFileURIs.indexOf(uriString);
            if (index !== -1) {
                createdFileURIs.splice(index, 1);
            }
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

export function handleFileCreation(uri: vscode.Uri) {
    // Add the URI of the newly created file to the array
    createdFileURIs.push(uri.toString());
}
