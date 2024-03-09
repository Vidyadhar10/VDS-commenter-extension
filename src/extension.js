"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFileCreation = exports.activate = void 0;
var vscode = require("vscode");
// Array to keep track of newly created file URIs
var createdFileURIs = [];
function activate(context) {
    var disposable = vscode.workspace.onDidSaveTextDocument(function (document) {
        var uriString = document.uri.toString();
        // Check if the saved document is one of the newly created files
        if (createdFileURIs.includes(uriString)) {
            // Insert template comments for the newly created file
            insertTemplate(document.uri);
            // Remove the URI from the array since we handled it
            var index = createdFileURIs.indexOf(uriString);
            if (index !== -1) {
                createdFileURIs.splice(index, 1);
            }
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
function handleFileCreation(uri) {
    // Add the URI of the newly created file to the array
    createdFileURIs.push(uri.toString());
}
exports.handleFileCreation = handleFileCreation;