import * as vscode from 'vscode';
import { formatLatexTable } from './formatter';

export function activate(context: vscode.ExtensionContext) {
    const formatTableCommand = vscode.commands.registerCommand('format-your-latex-table.formatTable', () => {
        formatLatexTable({});
    });

    const formatTableWithBoldMaximaCommand = vscode.commands.registerCommand('format-your-latex-table.formatTableWithBoldMaxima', () => {
        formatLatexTable({ boldMaxima: true });
    });

    const formatTableWithUnderlineSecondMaximaCommand = vscode.commands.registerCommand('format-your-latex-table.formatTableWithUnderlineSecondMaxima', () => {
        formatLatexTable({ underlineSecondMaxima: true });
    });

    const formatTableWithBoldMinimaCommand = vscode.commands.registerCommand('format-your-latex-table.formatTableWithBoldMinima', () => {
        formatLatexTable({ boldMinima: true });
    });

    const formatTableWithUnderlineSecondMinimaCommand = vscode.commands.registerCommand('format-your-latex-table.formatTableWithUnderlineSecondMinima', () => {
        formatLatexTable({ underlineSecondMinima: true });
    });

    context.subscriptions.push(
        formatTableCommand,
        formatTableWithBoldMaximaCommand,
        formatTableWithUnderlineSecondMaximaCommand,
        formatTableWithBoldMinimaCommand,
        formatTableWithUnderlineSecondMinimaCommand
    );
}

export function deactivate() {}