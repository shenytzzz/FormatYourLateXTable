import * as vscode from 'vscode';

export interface FormatOptions {
    boldMaxima?: boolean;
    underlineSecondMaxima?: boolean;
    boldMinima?: boolean;
    underlineSecondMinima?: boolean;
}

export function formatLatexTable(options: FormatOptions) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor');
        return;
    }

    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);
    
    if (!selectedText.trim()) {
        vscode.window.showErrorMessage('Please select LaTeX table data to format');
        return;
    }

    try {
        const formattedText = formatTableText(selectedText, options);
        editor.edit(editBuilder => {
            editBuilder.replace(selection, formattedText);
        });
    } catch (error) {
        vscode.window.showErrorMessage(`Error formatting table: ${error}`);
    }
}

function formatTableText(text: string, options: FormatOptions): string {
    const lines = text.split('\n').filter(line => line.trim());
    const tableData: string[][] = [];
    
    for (const line of lines) {
        const cells = line.split('&').map(cell => cell.trim());
        const lastCell = cells[cells.length - 1];
        if (lastCell.includes('\\\\')) {
            cells[cells.length - 1] = lastCell.replace('\\\\', '').trim();
        }
        tableData.push(cells);
    }

    if (tableData.length === 0) {
        return text;
    }

    const numCols = tableData[0].length;
    
    // Calculate lengths for each column
    const lengths: number[][] = [];
    for (let col = 0; col < numCols; col++) {
        lengths[col] = [];
        for (let row = 0; row < tableData.length; row++) {
            lengths[col][row] = calculateLength(tableData[row][col]);
        }
    }

    // Calculate column widths: max length + 2
    const columnWidths: number[] = [];
    for (let col = 0; col < numCols; col++) {
        const maxLength = Math.max(...lengths[col]);
        columnWidths[col] = maxLength + 2;
    }

    // Apply emphasis formatting
    const processedData = applyEmphasisFormatting(tableData, options);

    // Calculate final column widths considering both original and formatted content
    const finalColumnWidths: number[] = [];
    for (let col = 0; col < numCols; col++) {
        const originalLengths = lengths[col].map(len => len);
        const formattedLengths = processedData.map(row => calculateLength(row[col]));
        const allLengths = [...originalLengths, ...formattedLengths];
        const maxLength = Math.max(...allLengths);
        finalColumnWidths[col] = maxLength + 2;
    }

    // Format each cell with proper alignment
    const formattedLines: string[] = [];
    for (let row = 0; row < processedData.length; row++) {
        const formattedCells: string[] = [];
        for (let col = 0; col < numCols; col++) {
            const cell = processedData[row][col];
            const cellLength = calculateLength(cell);
            const padding = Math.max(0, finalColumnWidths[col] - cellLength);
            const formattedCell = ' '.repeat(padding) + cell;
            formattedCells.push(formattedCell);
        }
        formattedLines.push(formattedCells.join(' & ') + ' \\\\');
    }

    return formattedLines.join('\n');
}

function calculateLength(text: string): number {
    // Calculate length considering LaTeX commands and their arguments
    return text.length;
}

function applyEmphasisFormatting(data: string[][], options: FormatOptions): string[][] {
    const result = data.map(row => [...row]);
    const numCols = data[0].length;
    
    for (let col = 0; col < numCols; col++) {
        const numericCells = data
            .map((row, rowIndex) => ({
                rowIndex,
                value: extractNumericValue(row[col])
            }))
            .filter((cell): cell is { rowIndex: number; value: number } => cell.value !== null);

        if (numericCells.length === 0) {
            continue;
        }

        // Apply bold to maxima
        if (options.boldMaxima) {
            const maxima = Math.max(...numericCells.map(cell => cell.value));
            for (const cell of numericCells) {
                if (cell.value === maxima) {
                    result[cell.rowIndex][col] = wrapWithLatexCommand(result[cell.rowIndex][col], 'textbf');
                }
            }
        }
        
        // Apply bold to minima
        if (options.boldMinima) {
            const minima = Math.min(...numericCells.map(cell => cell.value));
            for (const cell of numericCells) {
                if (cell.value === minima) {
                    result[cell.rowIndex][col] = wrapWithLatexCommand(result[cell.rowIndex][col], 'textbf');
                }
            }
        }
        
        // Apply underline to second maxima
        if (options.underlineSecondMaxima) {
            const secondMaxima = getNthDistinctValue(numericCells.map(cell => cell.value), 1, 'desc');
            if (secondMaxima !== null) {
                for (const cell of numericCells) {
                    if (cell.value === secondMaxima) {
                        result[cell.rowIndex][col] = wrapWithLatexCommand(result[cell.rowIndex][col], 'underline');
                    }
                }
            }
        }
        
        // Apply underline to second minima
        if (options.underlineSecondMinima) {
            const secondMinima = getNthDistinctValue(numericCells.map(cell => cell.value), 1, 'asc');
            if (secondMinima !== null) {
                for (const cell of numericCells) {
                    if (cell.value === secondMinima) {
                        result[cell.rowIndex][col] = wrapWithLatexCommand(result[cell.rowIndex][col], 'underline');
                    }
                }
            }
        }
    }
    
    return result;
}

function getNthDistinctValue(values: number[], index: number, direction: 'asc' | 'desc'): number | null {
    const sorted = [...new Set(values)].sort((a, b) => direction === 'asc' ? a - b : b - a);
    return sorted[index] ?? null;
}

function extractNumericValue(text: string): number | null {
    const cleanText = stripLatexFormattingForNumericValue(text);
    
    // Only match if the entire string is numeric (with optional sign and decimal)
    const match = cleanText.match(/^(-?\d+\.?\d*)$/);
    return match ? parseFloat(match[0]) : null;
}

function stripLatexFormattingForNumericValue(text: string): string {
    return text
        .replace(/\\(?:textbf|underline|emph|mathbf|mathrm)\s*\{/g, '{')
        .replace(/\\(?:textcolor|colorbox)\s*\{[^{}]*\}\s*\{/g, '{')
        .replace(/\\(?:color|cellcolor)\s*\{[^{}]*\}\s*/g, '')
        .replace(/[{}]/g, '')
        .trim();
}

function wrapWithLatexCommand(text: string, command: string): string {
    // Check if text already has the command
    if (text.includes(`\\${command}{`)) {
        return text;
    }
    
    return `\\${command}{${text.trim()}}`;
}
