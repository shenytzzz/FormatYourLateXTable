# Format Your LaTeX Table

A VS Code extension that formats LaTeX table rows with one click. It aligns cells, keeps LaTeX table syntax tidy, and can optionally highlight numeric maxima/minima.

## Features

- **One-click formatting**: Select LaTeX table rows and format them instantly
- **Automatic alignment**: Right-aligns cells with adaptive column widths
- **Numeric emphasis**: Bold maxima/minima or underline second maxima/minima
- **Mixed-column support**: Ignores non-numeric cells when finding numeric values
- **Full table selections**: Preserves `\begin{tabular}`, `\hline`, `\end{tabular}`, blank lines, and comments while formatting table rows
- **LaTeX-aware output**: Preserves existing wrappers such as `\textbf{}`, `\underline{}`, `\color{}`, `\textcolor{}`, and `\cellcolor{}`
- **Symbolic numeric support**: Treats `\infty`, `-\infty`, and `∞` as numeric values for emphasis
- **Safe command activation**: All contributed commands can activate the extension directly

## Installation

### VS Code Marketplace
Coming soon!

### Manual Installation
1. Download the latest `.vsix` file from the [releases page](https://github.com/shenytzzz/FormatYourLateXTable/releases)
2. In VS Code, press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Type "Extensions: Install from VSIX..."
4. Select the downloaded `.vsix` file

You can also install a local VSIX from the command line:

```bash
code --install-extension format-your-latex-table-*.vsix
```

## Usage

### Basic Formatting

1. **Select** your LaTeX table rows or the full `tabular` environment
2. **Press** `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. **Type** "Format LaTeX Table" and select the basic option

| Command | Description |
|---------|-------------|
| `Format LaTeX Table` | Basic formatting without emphasis |
| `Format LaTeX Table (Bold Maxima)` | Format + bold maximum values |
| `Format LaTeX Table (Underline Second Maxima)` | Format + underline second maximum values |
| `Format LaTeX Table (Bold Minima)` | Format + bold minimum values |
| `Format LaTeX Table (Underline Second Minima)` | Format + underline second minimum values |

### Example

Input:

```latex
ResNet-50 & 0.2341 & 92.34 & 15.7 \\
EfficientNet & 0.1987 & 94.56 & 12.3 \\
Vision Transformer & 0.1567 & 96.78 & 18.9 \\
MobileNet & 0.2654 & 89.12 & {\color{blue} 8.4} \\
```

Running `Format LaTeX Table (Bold Minima)` keeps the color command while adding bold formatting:

```latex
           ResNet-50 &            0.2341 &            92.34 &                          15.7 \\
        EfficientNet &            0.1987 &            94.56 &                          12.3 \\
  Vision Transformer &   \textbf{0.1567} &            96.78 &                          18.9 \\
           MobileNet &            0.2654 &   \textbf{89.12} &   \textbf{{\color{blue} 8.4}} \\
```

## Tips

1. **Full `tabular` selections are supported**: non-row lines are preserved in place
2. **Works with mixed content**: numbers, strings, LaTeX commands, empty cells, and missing values
3. **Preserves existing formatting**: Won't duplicate `\textbf{}` or `\underline{}` commands
4. **Missing values are skipped**: empty cells, `NaN`, `--`, and `N/A` do not affect numeric emphasis
5. **Second maxima/minima are distinct**: duplicate best values do not count as second-best values

## Development

### Building from Source
```bash
git clone https://github.com/shenytzzz/FormatYourLateXTable.git
cd FormatYourLateXTable
npm install
npm run compile
```

### Package a VSIX

```bash
npm install -g @vscode/vsce
npm run compile
vsce package
```

### Test in VS Code

Open this project in VS Code and press `F5` to launch an Extension Development Host. Select LaTeX table rows in the new window, then run one of the commands from the Command Palette.

## Changelog

### v1.0.2
- Added support for formatting a full selected `tabular` environment
- Added numeric comparison support for `\infty`, `-\infty`, and `∞`
- Empty cells and missing values such as `NaN`, `--`, and `N/A` are skipped safely

### v1.0.1
- Fixed command activation for all emphasis commands
- Fixed emphasis logic for mixed text/numeric selections
- Preserved LaTeX color formatting when adding bold or underline
- Used distinct values for second maxima/minima

### v1.0.0
- Initial release
- Basic table formatting with automatic alignment
- Emphasis formatting for maxima/minima
- Support for LaTeX commands and brace-enclosed content
