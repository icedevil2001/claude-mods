# Upstream

Source: https://github.com/BayramAnnakov/claude-reflect (the `mod/` folder). Author: Bayram Annakov. License: MIT (copy in `LICENSE`). Commit: b6c42326903af3dd2bf3772b979730a44d8548ca.
Vendored from `mod/` only; the repo's Python plugin (command hooks, `/reflect`) is not included, and the upstream README says to use one or the other, not both.
Changed: in `README.md`, the screenshot link now points to `./assets/reflect-mod-band.png` (copied here) and the BACKLOG links point to the upstream repo. Code is unmodified.

Reviewed before inclusion: sends each short typed prompt (500 characters or fewer, not a slash command, not matching secret patterns) plus the last 1,200 characters of the assistant's reply to a `haiku` completion on your own session, to find reusable rules (costs tokens on every short prompt). Writes to `./CLAUDE.md` or `~/.claude/CLAUDE.md` only when you press a Save button, one sanitized line inside a marked section. Keeps found rules in the plugin store. No network, no processes.
