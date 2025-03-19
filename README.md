# Rubique

Rubique is a modern reimplementation of the Ubique mathematical and quantitative
library. Built with contemporary JavaScript, TypeScript, and Deno, Rubique
delivers high-performance numerical computations by leveraging Rust’s
[nalgebra](https://nalgebra.org/) library compiled to WebAssembly. The library
provides a comprehensive suite of functions for vectors, matrices, linear
algebra, statistics, time series analysis, and computational finance.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Performance Highlights](#performance-highlights)
- [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Overview

Rubique is designed for modern web and server-side applications requiring robust
and efficient mathematical operations. By integrating WebAssembly for heavy
linear algebra tasks and using Deno as its runtime, Rubique offers a secure and
developer-friendly environment. The library supports vectors, matrices, linear
algebra, statistics, time series analysis, and computational finance—all while
maintaining exceptional performance compared to traditional JavaScript
solutions.

## Key Features

- **Modern Syntax & Tooling:** Written in TypeScript and running on Deno for
  improved development experience, security, and performance.
- **Efficient Linear Algebra:** Uses Rust’s [nalgebra](https://nalgebra.org/)
  compiled to WebAssembly to accelerate matrix operations.
- **Comprehensive Functionality:** Provides a full suite of operations for
  vectors and matrices, including elementary operations, statistics, time series
  analysis, and financial computations.
- **High Performance:** Benchmarks show significant speed improvements over
  traditional JavaScript libraries, making Rubique ideal for
  computation-intensive applications.

## Performance Highlights

Rubique demonstrates substantial performance gains in matrix multiplication.
Here’s a sample benchmark comparing Rubique’s custom matrix multiplication
against a traditional JavaScript library (e.g., math.js):

| Matrix Size | rubique (ms) | math.js (ms) | Faster (%) |
| ----------- | ------------ | ------------ | ---------- |
| 10x10       | 0.07         | 0.32         | 77.38      |
| 100x100     | 4.03         | 11.02        | 63.44      |
| 1000x1000   | 1089.51      | 42508.00     | 97.44      |

_These results highlight Rubique's potential in handling heavy matrix operations
efficiently._

## Installation

Ensure you have [Deno](https://deno.land/) installed, then import Rubique
directly into your project:

```ts
import * as rubique from "https://github.com/bemayer/rubique/mod.ts";
```

Alternatively, you can clone the repository:

```bash
git clone https://github.com/bemayer/rubique.git
cd rubique
```

## Usage

Below is a quick example demonstrating matrix multiplication with Rubique:

```ts
import * as rubique from "https://github.com/bemayer/rubique/mod.ts";

const A = rubique.matrix([
  [1, 2],
  [3, 4],
]);

const B = rubique.matrix([
  [5, 6],
  [7, 8],
]);

const C = rubique.multiply(A, B);
console.log(C);
// Expected Output:
// [
//   [19, 22],
//   [43, 50],
// ]
```

Rubique’s API is designed to be intuitive, closely mirroring familiar operations
from Ubique and MATLAB-like environments.

## Roadmap

Rubique is an ongoing project with a clear vision for continuous improvement.
Planned enhancements include:

[ ] **Documentation Tests:** Add all tests to the `@example` sections to
leverage Deno’s documentation testing. [ ] **Enhanced WebAssembly Usage:**
Generalize the use of WebAssembly for heavy matrix operations to further boost
performance. [ ] **Refactoring:** Complete the refactoring of the `quants`
function to ensure consistency and reliability. [ ] **Type Improvements:** Clean
up type definitions to avoid the overuse of `any` and ensure robust TypeScript
support.

## Contributing

Contributions are welcome and encouraged! If you have ideas or improvements,
please fork the repository and submit a pull request. For issues or feature
requests, use the [GitHub Issues](https://github.com/bemayer/rubique/issues)
page.

## License

Rubique is released under the MIT License. See the [LICENSE](LICENSE) file for
more details.
