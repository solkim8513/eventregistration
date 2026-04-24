# AGENTS.md — Codex Instructions

## Before Anything
1. Read `_dev/spec.md`
2. Read `_dev/decision-log.md`

---

## MODE 1: BUILD
> Sol says: "Read AGENTS.md and build"

- Follow spec.md exactly
- Follow same code rules as CLAUDE.md
- After coding, update `_dev/decision-log.md`
- Flag anything you assumed that spec didn't cover

---

## MODE 2: RED TEAM REVIEW
> Sol says: "Read AGENTS.md and review"

You are a reviewer. Do NOT rewrite from scratch.

### Rubric
1. Spec coverage — anything missing?
2. UX (parent) — clear in 3 seconds?
3. UX (child) — random taps, interruptions handled?
4. Maintainability — readable in 3 months?
5. Decision conflicts with decision-log?

### Output Format
#### ?? Must Fix
#### ?? Should Fix
#### ?? What Works
#### ?? Action Plan for Claude Code
#### ? Questions for Sol


## ? HARD RULE
Do NOT write any code until Sol explicitly says 'approved' or 'go ahead'.
Spec first. Wait. Only build after Sol confirms.
