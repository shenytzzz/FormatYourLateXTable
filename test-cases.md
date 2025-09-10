// 测试用例示例（基于新的长度计算逻辑）

// 原始数据：
SDI~\cite{sd} & {CVPR 2022}      & 26.304      & \color{blue}26.526        \\
CNI~\cite{CNI}          &        {ICCV 2023} &       26.341      &    26.972     \\

// 基本格式化后：
SDI~\cite{sd} & {CVPR 2022} & 26.304 & \color{blue}26.526 \\
CNI~\cite{CNI} & {ICCV 2023} & 26.341 & 26.972 \\

// 加粗最大值 + 下划线第二大后：
SDI~\cite{sd} & {CVPR 2022} & \underline{26.304} & \textbf{26.972} \\
CNI~\cite{CNI} & {ICCV 2023} & \textbf{26.341} & \underline{26.526} \\

// 复杂测试用例（包含LaTeX命令）：
\textbf{Method} & \color{blue}Conference & \cellcolor{gray}{Value} & Note \\
Baseline~\cite{base} & {NeurIPS 2021} & \underline{23.456} & Standard \\
Our Method & {ICML 2023} & \textbf{25.789} & Improved \\

// 预期格式化后（长度计算包含LaTeX命令）：
\textbf{Method} & \color{blue}Conference & \cellcolor{gray}{Value} & Note \\
Baseline~\cite{base} & {NeurIPS 2021} & \underline{23.456} & Standard \\
Our Method & {ICML 2023} & \textbf{25.789} & Improved \\