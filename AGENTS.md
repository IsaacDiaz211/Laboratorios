# AGENTS.md

## Purpose
This repository is a terminal-based Bun + TypeScript app for computational methods labs.
Agents should make small, local changes that preserve the current CLI/TUI flow, JSON format, and validation behavior.

## Stack
- Runtime: Bun
- Language: TypeScript
- Module system: ESM via `"type": "module"`
- TS config: `strict: true`, `noEmit: true`, `moduleResolution: "Bundler"`
- Entry point: `src/cli.ts`
- Shared helpers: `src/core/`
- Lab implementations: `src/labs/lab1/`, `src/labs/lab2/`
- Additional numerical methods: `src/algorithms/lab3.ts`
- Input files: `data/*.json`

## Important Files
- `package.json`: only defines the `start` script
- `tsconfig.json`: strict type-checking rules
- `README.md`: user-facing usage and JSON expectations
- `src/core/input.ts`: prompts and validation
- `src/core/files.ts`: JSON loading and numeric validation
- `src/core/timer.ts`: execution timing
- `src/core/output.ts`: execution time formatting

## Build, Run, And Verification Commands
- Install dependencies: `bun install`
- Run the TUI: `bun run start`
- Under the hood, `start` runs: `bun src/cli.ts`
- Type-check the repo: `bunx tsc --noEmit`

## Lint And Format
- There is no ESLint config and no lint script.
- There is no Prettier config and no format script.
- Do not claim lint or format commands exist.
- Match the surrounding file style manually.
- Do not mass-reformat unrelated files.

## Tests
- There are currently no project test files.
- There is no `test` script in `package.json`.
- Main automated verification today is `bunx tsc --noEmit`.
- Runtime verification is `bun run start` plus manual exercise of the relevant menu path.

## Single-Test Guidance
If Bun tests are added later, use these conventions:
- Run all tests: `bun test`
- Run one test file: `bun test path/to/file.test.ts`
- Run one named test: `bun test --test-name-pattern "test name"`
- Until tests exist, do not invent test commands in summaries, PRs, or task reports.

## Data Expectations
JSON input files live in `data/` and are expected to look like:

```json
{
  "numeros": [1, 2, 3]
}
```

Preserve these existing behaviors from `src/core/files.ts`:
- File names are normalized to `.json`
- Files are loaded from `process.cwd()/data`
- `numeros` must be an array
- Some exercises require exact counts
- Some exercises require integers only
- Some exercises require positive values
- Some exercises require min/max bounds

## Cursor And Copilot Rules
No repository-specific AI instruction files were found:
- No `.cursorrules`
- No `.cursor/rules/`
- No `.github/copilot-instructions.md`

Agents should follow this file and the codebase's existing patterns.

## Code Style

### General
- Use TypeScript only.
- Use ESM imports/exports.
- Use double quotes.
- End statements with semicolons.
- Prefer 2-space indentation.
- Keep functions direct and readable.
- Preserve Spanish user-facing text unless the task explicitly changes UX copy.

### Imports
- Keep imports at the top of the file.
- Prefer relative imports within `src/`.
- Omit file extensions in TS imports.
- Import only what is used.
- Follow nearby file ordering; no sorter is configured.
- Examples already in use:
- `import prompts from "prompts";`
- `import { timeExecution } from "../../core/timer";`

### Formatting
- Match the surrounding file before applying a global preference.
- Keep blank lines between logical sections.
- Avoid rewrapping or restyling unrelated code.
- Keep diffs minimal.

### Types
- Keep code compatible with `strict: true`.
- Avoid `any`.
- Use `unknown` only at boundaries, then narrow it.
- Add explicit return types on exported functions.
- Prefer `type` aliases for option objects and structured results.
- Use narrow unions when a function returns multiple result shapes.

### Naming
- Use `camelCase` for variables and functions.
- Use `PascalCase` for type aliases.
- Use `UPPER_SNAKE_CASE` for constants.
- Follow the existing runner naming style, e.g. `runLab1Exercise1`.
- Keep file names aligned with the lab numbering scheme, e.g. `lab1-1.ts`.

### Error Handling
- Throw `Error` with direct, user-readable messages.
- For caught unknown values, use `error instanceof Error ? error.message : String(error)`.
- Catch near input/file boundaries when retrying is expected.
- Let fatal failures bubble to the top-level CLI handler.
- Keep validation messages specific and actionable.

## CLI And Numerical Conventions
- This is a terminal-first app; keep using `prompts`.
- Preserve the menu-driven structure in `src/cli.ts`.
- Keep each exercise responsible for its own input, calculation, and output.
- Continue printing execution time for each calculation flow.
- Reuse helpers from `src/core/` before adding new utilities.
- Validate numeric ranges explicitly.
- Be careful with Float32 versus JS `number` behavior.
- Avoid changing mathematical formulas unless the task is about correctness.

## File Organization
- Shared utilities belong in `src/core/`.
- Lab-specific code belongs in the matching `src/labs/labX/` directory.
- Keep top-level orchestration in `src/cli.ts`.
- Keep JSON fixtures/examples in `data/`.
- Avoid moving files unless there is a strong structural reason.

## Change Strategy
- Make the smallest correct change.
- Avoid broad refactors during targeted fixes.
- Avoid adding dependencies unless clearly necessary.
- Do not change exercise numbering or expected inputs without a requirement.
- If editing `src/algorithms/lab3.ts`, prefer localized changes; it is less uniform than the rest of `src/`.

## Verification Checklist
1. Run `bunx tsc --noEmit`.
2. Run `bun run start` if the change affects the TUI or runtime wiring.
3. Manually exercise the relevant flow when no automated tests exist.
4. Confirm JSON expectations still match `README.md` and `src/core/files.ts`.

## Notes
- Bun was not installed in the execution environment used for analysis, so the commands above were derived from repository configuration rather than executed successfully here.
