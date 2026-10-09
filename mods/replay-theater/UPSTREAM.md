# Upstream

Source: https://github.com/anthropics/claude-code-playground/tree/main/claude-code/mods/replay-theater
Author: Anthropic PBC (Claude Code DevRel). License: Apache-2.0 (copy in `LICENSE`). Commit: 569c5283d9a0a7ee7938df85bb32e4f48cbb8c86.
Vendored unmodified.

Reviewed before inclusion: reads a file with `$.fs` only to diff it before a Write; keeps diffs in memory. No process, network or store use.
