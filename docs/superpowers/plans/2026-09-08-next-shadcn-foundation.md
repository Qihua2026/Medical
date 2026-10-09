# Next.js + shadcn/ui Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish a production-ready web foundation and a calm, low-density medical career advisor landing experience.

**Architecture:** Use the Next.js App Router with TypeScript and React Server Components by default. Tailwind CSS v4 carries semantic design tokens, while local shadcn/ui-compatible components provide an owned UI layer; Radix is introduced only through the `Slot` primitive needed for composable buttons.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui conventions, Radix Slot, Vitest, Testing Library

**Spec:** User-approved product direction in the project request and `DESIGN.md`

## Global Constraints

- Brand primary is `#4E9365`, sampled from the approved screenshot.
- The product voice is calm, professional, and deeply familiar with medical careers.
- Pages use low information density, generous whitespace, large cards, and one primary task.
- Web V0 serves paid, activated users; it does not offer diagnosis purchase or payment.
- MVP flow remains activation → profile assessment → role recommendation → strategy report → optional human coaching.
- Never fabricate career history or promise offers, salaries, or admission probability.
- Changes originate from `dev`; no direct changes to `main`.

---

### Task 1: Application foundation and theme

**Files:**
- Create: `package.json`, framework configuration, `src/app/layout.tsx`, `src/app/globals.css`
- Create: `components.json`, `src/lib/utils.ts`, `src/components/ui/button.tsx`, `src/components/ui/card.tsx`, `src/components/ui/progress.tsx`
- Test: `src/components/ui/button.test.tsx`

**Interfaces:**
- Produces: semantic CSS tokens and reusable `Button`, `Card`, and `Progress` components.

- [ ] Write a component test showing the button supports normal and `asChild` rendering.
- [ ] Run the focused test and confirm it fails because the component is missing.
- [ ] Add the minimal Next.js, Tailwind, shadcn/ui-compatible, and test configuration.
- [ ] Implement the shared primitives and semantic theme tokens.
- [ ] Run the focused test and confirm it passes.
- [ ] Commit the foundation.

### Task 2: Focused medical career advisor home page

**Files:**
- Create: `src/app/page.test.tsx`
- Create: `src/components/brand-mark.tsx`, `src/components/advisor-preview.tsx`
- Modify: `src/app/page.tsx`, `src/app/globals.css`

**Interfaces:**
- Consumes: `Button`, `Card`, `Progress`, semantic CSS tokens.
- Produces: a responsive, accessible home page with one primary assessment CTA and restrained supporting proof.

- [ ] Write a page test for the central heading, assessment CTA, advisor framing, and PRD-aligned product scope.
- [ ] Run the focused test and confirm it fails because the page is missing.
- [ ] Implement the minimum responsive page and supporting presentation components.
- [ ] Run the focused test and confirm it passes.
- [ ] Run accessibility-oriented DOM assertions and full test suite.
- [ ] Commit the page.

### Task 3: Project and design documentation

**Files:**
- Create: `PROJECT.md`, `DESIGN.md`
- Modify: `README.md`

**Interfaces:**
- Produces: source-of-truth technology, contribution, visual, content, accessibility, and compliance guidance.

- [ ] Document the stack, directory map, commands, branch policy, and MVP boundary.
- [ ] Document the sampled color token, typography, spacing, density, component, interaction, benchmark, and anti-pattern rules.
- [ ] Link the documents from the README and state the app setup commands.
- [ ] Review the documents against the PRD and approved request for omissions or contradictions.
- [ ] Commit the documentation.

### Task 4: Verification and delivery

**Files:**
- Modify only if verification exposes a defect.

**Interfaces:**
- Consumes: the complete implementation.
- Produces: verified lint, test, production build, and branch/PR evidence.

- [ ] Run the full unit test suite.
- [ ] Run lint and the production build.
- [ ] Inspect the rendered page at desktop and mobile widths.
- [ ] Review the final diff against all requirements.
- [ ] Push the feature branch and open a Pull Request targeting `dev` when repository permission allows.
