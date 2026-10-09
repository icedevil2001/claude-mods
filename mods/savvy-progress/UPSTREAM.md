# Upstream

Source: https://github.com/JohnnyVizz/claude-kit/tree/main/plugins/savvy-progress
Author: johnnyvizz. License: MIT (copy in `LICENSE`). Commit: 272a877f39b6971690e087b16a7cc3951b811e39. Vendored unmodified.

Reviewed before inclusion: no network or process access. Reads Claude Code's settings (`$.settings.read`, only to pick the `language`) and the locale env vars; registers two tools for the model (`progress`, `step`) that only draw a bar; opens a pane; ticks a 1 s timer only while subagents run. Pairs with savvy-flow.
