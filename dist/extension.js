"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFileCreation = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
// Array to keep track of newly created file URIs
const createdFileURIs = [];
function activate(context) {
    let disposable = vscode.workspace.onDidSaveTextDocument((document) => {
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
exports.activate = activate;
function insertTemplate(uri) {
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
function handleFileCreation(uri) {
    // Add the URI of the newly created file to the array
    createdFileURIs.push(uri.toString());
}
exports.handleFileCreation = handleFileCreation;
//# sourceMappingURL=extension.js.map