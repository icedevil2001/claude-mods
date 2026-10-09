# Claude Mods

My Claude Code mods in one place: plugins of function hooks that add UI, commands and behaviour. Some are mine, some are vendored from other people's repos so I get the same setup on every machine.

## Mods

| Mod | What it does | Source |
| --- | --- | --- |
| [auto-continue](mods/auto-continue) | When the 5-hour usage limit is hit, waits for the reset and sends "continue" for you. | Mine: [icedevil2001/auto-continue](https://github.com/icedevil2001/auto-continue) (submodule) |
| [cache-tax](vendor/cache-tax) | Keeps the prompt cache warm during breaks and warns before a costly cold send. Needs Claude Code 2.1.287+. | [karanb192/cache-tax](https://github.com/karanb192/cache-tax) |
| [blast-radius](vendor/claude-code-playground/claude-code/mods/blast-radius) | Holds a risky shell command (`rm -rf`, `git reset --hard`, force push, migration) and shows what it would change, with Proceed and Cancel. | [anthropics/claude-code-playground → blast-radius](https://github.com/anthropics/claude-code-playground/tree/main/claude-code/mods/blast-radius) |
| [replay-theater](vendor/claude-code-playground/claude-code/mods/replay-theater) | Step through the file edits Claude made in the last turn, one diff at a time. | [anthropics/claude-code-playground → replay-theater](https://github.com/anthropics/claude-code-playground/tree/main/claude-code/mods/replay-theater) |
| [reflect-mod](vendor/claude-reflect/mod) | Finds reusable corrections in your short prompts and saves them to `CLAUDE.md` from a band above the prompt. | [BayramAnnakov/claude-reflect](https://github.com/BayramAnnakov/claude-reflect) (its `mod/` folder) |
| [savvy-progress](vendor/claude-kit/plugins/savvy-progress) | Progress bar above the prompt for `/savvy-flow` plus a live panel of subagents with model, context, cost and time. | [JohnnyVizz/claude-kit → savvy-progress](https://github.com/JohnnyVizz/claude-kit/tree/main/plugins/savvy-progress) |
| [savvy-flow](vendor/claude-kit/plugins/savvy-flow) | Skill plus five tiered worker subagents: the session model plans and reviews, workers implement (`/savvy-flow:savvy-flow <task>`). Not a hooks mod. | [JohnnyVizz/claude-kit → savvy-flow](https://github.com/JohnnyVizz/claude-kit/tree/main/plugins/savvy-flow) |

## Where the vendored mods came from

The third-party mods are **git submodules** under `vendor/`, not copies, so the code is exactly what the author published and each one links straight to its source. Each is pinned to the commit I reviewed. Go to the original for updates, issues and docs.

| Mod | Original | Author | License | Submodule, pinned at |
| --- | --- | --- | --- | --- |
| cache-tax | https://github.com/karanb192/cache-tax | Karan Bansal | MIT | `vendor/cache-tax` @ `06cac47` |
| blast-radius | https://github.com/anthropics/claude-code-playground/tree/main/claude-code/mods/blast-radius | Anthropic PBC | Apache-2.0 | `vendor/claude-code-playground` @ `569c528` |
| replay-theater | https://github.com/anthropics/claude-code-playground/tree/main/claude-code/mods/replay-theater | Anthropic PBC | Apache-2.0 | `vendor/claude-code-playground` @ `569c528` |
| reflect-mod | https://github.com/BayramAnnakov/claude-reflect/tree/main/mod | Bayram Annakov | MIT | `vendor/claude-reflect` @ `b6c4232` |
| savvy-progress | https://github.com/JohnnyVizz/claude-kit/tree/main/plugins/savvy-progress | johnnyvizz | MIT | `vendor/claude-kit` @ `272a877` |
| savvy-flow | https://github.com/JohnnyVizz/claude-kit/tree/main/plugins/savvy-flow | johnnyvizz | MIT | `vendor/claude-kit` @ `272a877` |

What I checked in each before adding it is in [REVIEWS.md](REVIEWS.md). **Updating a submodule means re-reviewing it:** bump with `git -C vendor/<name> pull` (or checkout a commit), read the diff, commit the new pin. From the same repos, `claude-reflect`'s Python plugin, the playground's `token-weather` and the rest of `claude-kit` are present in the submodules but not exposed in the marketplace.

## Install everything (global)

Every mod here is a git submodule, so clone with `--recurse-submodules` and add the folder as a local marketplace:

```bash
git clone --recurse-submodules https://github.com/icedevil2001/claude-mods ~/git/Claude_mods
claude plugin marketplace add ~/git/Claude_mods
for m in auto-continue cache-tax blast-radius replay-theater reflect-mod savvy-progress savvy-flow; do
  claude plugin install "$m@claude-mods" --scope user
done
```

Already cloned without submodules? Run `git submodule update --init --recursive`. Adding the marketplace straight from GitHub (`claude plugin marketplace add icedevil2001/claude-mods`) may not fetch submodules; I have not tested it, so use the clone above.

Or one at a time, e.g. `claude plugin install blast-radius@claude-mods --scope user`. To pull in my own changes later: `git pull --recurse-submodules`, then `claude plugin marketplace update claude-mods` and `claude plugin update <name>@claude-mods`.

Try a mod for one session without installing: `claude --plugin-dir ~/git/Claude_mods/mods/auto-continue` (or the matching `vendor/...` path).

## Things to know

- **Install only what you want.** `cache-tax` pings the model while armed and `reflect-mod` sends each short prompt to a small model, so both use tokens.
- **Don't run the original `claude-reflect` Python plugin alongside `reflect-mod`** (every correction would be captured twice).
- **Versions:** `cache-tax` says it needs Claude Code 2.1.287+ and `reflect-mod` 2.1.286+. The first five mods (everything except `savvy-progress` and `savvy-flow`) install and answer their commands on 2.1.286 (checked 2026-10-08, headless), and `claude plugin validate` passes for all; `auto-continue`, `cache-tax` and `reflect-mod` also pass their own tests. The mod API is early access and moves between releases.
- Check one with `claude plugin validate mods/<name>`; mods with tests run with `claude plugin test mods/<name>`.

## Licenses

This repo (README, marketplace manifest): MIT, see [LICENSE](LICENSE). Each submodule keeps its own license.
