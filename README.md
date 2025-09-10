# Format Your LaTeX Table

A VS Code extension that formats LaTeX table data with one click. Features automatic alignment, adaptive column widths, and optional emphasis on numeric values (maxima/minima).

## Features

- **One-click formatting**: Select LaTeX table data and format it instantly
- **Automatic alignment**: Right-aligns all cells with proper spacing
- **Smart emphasis options**: Optional bold/underline for maxima, minima, and second-order values
- **LaTeX-aware**: Handles LaTeX commands like `\textbf{}`, `\color{}`, `\cellcolor{}`, etc.
- **String detection**: Automatically skips string columns for emphasis formatting
- **Adaptive column widths**

## Installation

### VS Code Marketplace
Coming soon!

### Manual Installation
1. Download the latest `.vsix` file from the [releases page](https://github.com/your-username/format-your-latex-table/releases)
2. In VS Code, press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Type "Extensions: Install from VSIX..."
4. Select the downloaded `.vsix` file

## Usage

### Basic Formatting

1. **Select** your LaTeX table data (exclude headers like `\hline` or `\end{tabular}`)
2. **Press** `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. **Type** "Format LaTeX Table" and select the basic option

| Command | Description |
|---------|-------------|
| `Format LaTeX Table` | Basic formatting without emphasis |
| `Format LaTeX Table (Bold Maxima)` | Format + bold maximum values |
| `Format LaTeX Table (Underline Second Maxima)` | Format + underline second maximum values |
| `Format LaTeX Table (Bold Minima)` | Format + bold minimum values |
| `Format LaTeX Table (Underline Second Minima)` | Format + underline second minimum values |

## Tips

1. **Select only the data rows**, not the entire tabular environment
2. **Works with mixed content**: numbers, strings, LaTeX commands
3. **Preserves existing formatting**: Won't duplicate `\textbf{}` or `\underline{}` commands
4. **Handles edge cases**: empty cells, negative numbers, decimals

## Development

### Building from Source
```bash
git clone https://github.com/your-username/format-your-latex-table.git
cd format-your-latex-table
npm install
npm run compile
```

## Changelog

### v1.0.0
- Initial release
- Basic table formatting with automatic alignment
- Emphasis formatting for maxima/minima
- Support for LaTeX commands and brace-enclosed content
