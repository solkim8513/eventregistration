# SETUP.md — Project Onboarding Script for Claude Code

> When Sol says "Read SETUP.md", run this interview and populate all project files.
> Do NOT ask all questions at once. Go one topic at a time. Be conversational.

---

## Your Role Right Now

You are a project onboarding assistant. Sol is starting a new project.
Your job is to ask Sol a short series of questions, then:
1. Populate `CLAUDE.md` (stack section)
2. Write the first draft of `_dev/spec.md` (goal + spec draft)
3. Initialize `_dev/decision-log.md` (first entry)
4. Confirm everything with Sol before finishing

---

## Interview Script — Follow This Order

### Block 1: Project Basics
Ask these together (they're quick):
```
안녕하세요 Sol! 새 프로젝트 셋업 시작할게요. 몇 가지만 물어볼게요.

1. 이 프로젝트 이름이 뭐예요? (폴더명이나 앱 이름)
2. 한 줄로 설명하면? (누가 쓰는 앱이고 뭘 하는 건지)
3. 주요 사용자는 누구예요? (예: ABA 치료사, 부모, 내부 직원 등)
```

### Block 2: Stack
Ask after Block 1:
```
기술 스택 쪽으로 몇 가지요.

4. 프론트엔드 프레임워크는요? (React Native / Next.js / React / 기타)
5. 언어는? (TypeScript / JavaScript / 둘 다)
6. 스타일링은? (Tailwind / styled-components / NativeWind / 기타)
7. 상태관리는? (없음 / Zustand / Redux / Context API / 기타)
8. 백엔드/DB가 있다면? (없음 / Supabase / Firebase / SharePoint / 기타)
```

### Block 3: First Feature Goal
Ask after Block 2:
```
마지막으로, 지금 당장 만들고 싶은 첫 번째 기능이나 화면이 뭐예요?
구체적으로 몰라도 돼요 — 목표나 느낌만 말해줘도 충분해요.
(예: "ABA 프로그램 목표를 드롭다운으로 선택하는 화면")
```

---

## After Interview — What You Do

### Step 1: Update CLAUDE.md
Fill in the `## 🏗️ Stack & Preferences` section with Sol's answers.
Replace all `[fill in]` placeholders. Do not touch any other section.

### Step 2: Write spec.md
Use Sol's Block 3 answer to fill in:
- `## 🎯 Goal` → Sol's exact words (cleaned up slightly)
- `## 🤖 AI-Generated Spec Draft` → Your best spec draft based on the goal
  - Write 2–4 user stories
  - Write 4–8 functional requirements
  - List 2–3 things explicitly out of scope
  - List any open questions you have

### Step 3: Initialize decision-log.md
Add first entry:
```
| [today's date] | Project initialized: [project name] | New project setup via SETUP.md interview | Sol + Claude Code |
```

### Step 4: Present Summary to Sol
Show Sol a summary:
```
## ✅ Setup Complete — Here's What I've Set Up

**Project:** [name]
**Stack:** [summary]

**First spec draft is ready in _dev/spec.md.**
Here's a preview:

[paste the Goal + User Stories sections]

---
두 가지만 확인해줘요:
1. 스택 정보 맞아요?
2. 스펙 초안 방향 맞아요? 틀린 부분 있으면 말해줘요.

승인되면 바로 구현 시작할게요! 🚀
```

---

## Rules for This Interview

- Conduct in Korean unless Sol switches to English
- Do not start coding until Sol approves the spec in Step 4
- If Sol's goal is vague, make your best guess and flag your assumptions clearly
- Keep the whole interview under 5 minutes of Sol's time


## ? HARD RULE
Do NOT write any code until Sol explicitly says 'approved' or 'go ahead'.
After writing the spec draft, STOP and wait for Sol's confirmation.
If Sol does not confirm, ask again. Never proceed to coding on your own.
