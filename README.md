# Claude Mods

My Claude Code mods in one place: plugins of function hooks that add UI, commands and behaviour. Some are mine, some are vendored from other people's repos so I get the same setup on every machine.

## Mods

| Mod | What it does | Source |
| --- | --- | --- |
| [auto-continue](mods/auto-continue) | When the 5-hour usage limit is hit, waits for the reset and sends "continue" for you. | Mine |
| [cache-tax](mods/cache-tax) | Keeps the prompt cache warm during breaks and warns before a costly cold send. Needs Claude Code 2.1.287+. | [karanb192/cache-tax](https://github.com/karanb192/cache-tax) |
| [blast-radius](mods/blast-radius) | Holds a risky shell command (`rm -rf`, `git reset --hard`, force push, migration) and shows what it would change, with Proceed and Cancel. | [anthropics/claude-code-playground → blast-radius](https://github.com/anthropics/claude-code-playground/tree/main/claude-code/mods/blast-radius) |
| [replay-theater](mods/replay-theater) | Step through the file edits Claude made in the last turn, one diff at a time. | [anthropics/claude-code-playground → replay-theater](https://github.com/anthropics/claude-code-playground/tree/main/claude-code/mods/replay-theater) |
| [reflect-mod](mods/reflect-mod) | Finds reusable corrections in your short prompts and saves them to `CLAUDE.md` from a band above the prompt. | [BayramAnnakov/claude-reflect](https://github.com/BayramAnnakov/claude-reflect) (its `mod/` folder) |

## Where the vendored mods came from

Go to the original for updates, issues and the author's own docs. Each vendored folder has an `UPSTREAM.md` with the exact commit, license, what changed (if anything) and what I checked before adding it.

| Mod | Original | Author | License | Copied from |
| --- | --- | --- | --- | --- |
| cache-tax | https://github.com/karanb192/cache-tax | Karan Bansal | MIT | `main` @ `06cac47` |
| blast-radius | https://github.com/anthropics/claude-code-playground/tree/main/claude-code/mods/blast-radius | Anthropic PBC | Apache-2.0 | `main` @ `569c528` |
| replay-theater | https://github.com/anthropics/claude-code-playground/tree/main/claude-code/mods/replay-theater | Anthropic PBC | Apache-2.0 | `main` @ `569c528` |
| reflect-mod | https://github.com/BayramAnnakov/claude-reflect/tree/main/mod | Bayram Annakov | MIT | `main` @ `b6c4232` |

The code is as published, except `reflect-mod/README.md`, where two image/doc links were repointed. The rest of `claude-reflect` (its Python plugin) and the `token-weather` mod from the playground are not included.

## Install everything (global)

```bash
claude plugin marketplace add icedevil2001/claude-mods
for m in auto-continue cache-tax blast-radius replay-theater reflect-mod; do
  claude plugin install "$m@claude-mods" --scope user
done
```

Or one at a time, e.g. `claude plugin install blast-radius@claude-mods --scope user`. Update later with `claude plugin marketplace update claude-mods`, then `claude plugin update <name>@claude-mods`.

Try a mod for one session without installing: `claude --plugin-dir ~/git/Claude_mods/mods/<name>`.

## Things to know

- **Install only what you want.** `cache-tax` pings the model while armed and `reflect-mod` sends each short prompt to a small model, so both use tokens.
- **Don't run the original `claude-reflect` Python plugin alongside `reflect-mod`** (every correction would be captured twice).
- **Versions:** `cache-tax` needs Claude Code 2.1.287+, `reflect-mod` 2.1.286+. The mod API is early access and moves between releases.
- Check one with `claude plugin validate mods/<name>`; mods with tests run with `claude plugin test mods/<name>`.

## Licenses

My own mods (`auto-continue`, repo scaffolding): MIT, see [LICENSE](LICENSE). Each vendored mod keeps its original license file in its own folder.
