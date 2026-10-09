# Claude Mods

Small mods for [Claude Code](https://claude.com/claude-code): plugins of function hooks that add UI, commands and behaviour, and hot-reload in a running session.

## Mods

| Mod | What it does |
| --- | --- |
| [auto-continue](mods/auto-continue) | When the 5-hour usage limit is hit, waits for the reset and sends "continue" for you. |

## Install (global)

```bash
claude plugin marketplace add icedevil2001/claude-mods
claude plugin install auto-continue@claude-mods --scope user
```

## Try a mod without installing

```bash
claude --plugin-dir ~/git/Claude_mods/mods/auto-continue
```

Each mod is a self-contained folder under `mods/` (`.claude-plugin/plugin.json`, `hooks/`, optional `types/`). Check one with `claude plugin validate mods/<name>` and `claude plugin test mods/<name>`.

> The mod API is early access and moves between Claude Code releases; mods here are tested against 2.1.286.
