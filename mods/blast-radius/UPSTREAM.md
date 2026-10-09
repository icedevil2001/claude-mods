# Upstream

Source: https://github.com/anthropics/claude-code-playground/tree/main/claude-code/mods/blast-radius
Author: Anthropic PBC (Claude Code DevRel). License: Apache-2.0 (copy in `LICENSE`). Commit: 569c5283d9a0a7ee7938df85bb32e4f48cbb8c86.
Vendored unmodified.

Reviewed before inclusion: runs `bash`, `git` and `sleep` through `$.process.run` to measure a risky command, and migration status listers (`manage.py showmigrations`, `alembic history`, `bin/rails db:migrate:status`, `npx --no-install prisma migrate status`) in the project folder, only when the held Bash command is a migration. Paths are passed as arguments, never as shell source. No network.
