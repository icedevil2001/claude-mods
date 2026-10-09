# Safety reviews of the vendored mods

Read before each was added, at the commit it is pinned to in `vendor/`. Re-review when you move a pin.

| Mod | Commit | Findings |
| --- | --- | --- |
| cache-tax | `06cac47` | No `$.http`, `$.process` or `$.fs`. Only model request is a fixed-prompt `$.model.fork` ping inside an armed `/keepwarm` window (costs tokens). Embedded status icons are valid PNGs and plain SVGs. Needs Claude Code 2.1.287+. |
| blast-radius | `569c528` | Runs `bash`, `git` and `sleep` through `$.process.run` to measure a risky command; for database migrations it also runs the project's own status listers (Django, Alembic, Rails, Prisma). Paths are passed as arguments, never as shell source. No network. Holds the command until you press Proceed or Cancel (a 10 minute timeout denies it). It matches on command text, so it can hold a harmless command that merely contains a risky-looking word. |
| replay-theater | `569c528` | Reads a file with `$.fs` only to diff it before a Write; diffs stay in memory. No process, network or store use. |
| reflect-mod | `b6c4232` | Sends each short typed prompt (500 characters or fewer, not a slash command, not matching secret patterns) plus the last 1,200 characters of the assistant's reply to a `haiku` completion on your own session (costs tokens). Writes `CLAUDE.md` only when you press Save, one sanitized line in a marked section. No network or processes. Use instead of, not with, the original Python plugin. |
| savvy-progress | `272a877` | No network or process access. Reads Claude Code settings only to pick the language; registers two harmless tools (`progress`, `step`); 1 s timer only while subagents run. |
| savvy-flow | `272a877` | A skill plus five worker subagents, plain instructions, no hidden steps. Workers run on Opus at low to xhigh effort and `savvy-fable` needs the Fable model, so flows use real tokens. In an empty folder the skill runs `git init` without asking (never pushes unasked). |
