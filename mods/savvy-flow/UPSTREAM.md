# Upstream

Source: https://github.com/JohnnyVizz/claude-kit/tree/main/plugins/savvy-flow
Author: johnnyvizz. License: MIT (copy in `LICENSE`). Commit: 272a877f39b6971690e087b16a7cc3951b811e39. Vendored unmodified.

Not a hooks mod: a skill (`/savvy-flow:savvy-flow`, user-invoked only) plus five worker subagents. Reviewed before inclusion: plain instructions, no hidden or exfiltrating steps. Worth knowing: workers run on Opus at low to xhigh effort and `savvy-fable` needs the Fable model (edit its `model:` otherwise), so a flow uses real tokens; in an empty folder the skill runs `git init` without asking (it never pushes unasked).
