# CLAUDE.md

You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## Memory Bank: GitHub Project #3

**Project:** https://github.com/users/avs2001/projects/3 | **Owner:** avs2001

**IMPORTANT:** Every code change, feature, fix, or refactor MUST have a GitHub Issue tracked in Project #3. No exceptions.

**IMPORTANT:** At the start of every session, rebuild context:
```bash
gh project item-list 3 --owner avs2001 --format json
gh issue list --state closed --limit 10
```

### Workflow
1. **Check board** → `gh project item-list 3 --owner avs2001`
2. **Create issue** → `gh issue create --title "<title>" --body "<what, why, scope>"` then `gh project item-add 3 --owner avs2001 --url <URL>`
3. **Branch** → `issue-<number>-<short-name>`
4. **Commit** → conventional commits with issue ref: `feat: add X (#12)`
5. **Close** → comment with summary (what changed, files, notes) then `gh issue close <number>`

**IMPORTANT:** Update issues with comments during complex multi-step work. Log discovered bugs/tech debt as new issues even if not fixing now.

**IMPORTANT:** The project board is the handoff document. Anyone should understand full project history from the issues alone.

## TypeScript
- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid `any`; use `unknown` when type is uncertain

## Angular
- **IMPORTANT:** Use https://github.com/angular/components as the quality standard for code structure, patterns, and conventions
- Always use standalone components over NgModules
- **IMPORTANT:** Must NOT set `standalone: true` inside decorators — it's the default in Angular v20+
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use `@HostBinding`/`@HostListener` — use the `host` object in `@Component`/`@Directive` instead
- Use `NgOptimizedImage` for all static images (does not work for inline base64)

## Components
- Single responsibility, keep small and focused
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush`
- Prefer inline templates for small components
- Prefer Reactive forms over Template-driven
- Use `class` bindings instead of `ngClass`, `style` bindings instead of `ngStyle`
- Use paths relative to the component TS file for external templates/styles

## State Management
- Signals for local state, `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals — use `update` or `set`

## Templates
- Keep simple, avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe for observables
- Do not assume globals like `new Date()` are available
- Do not write arrow functions in templates (not supported)

## Services
- Single responsibility per service
- Use `providedIn: 'root'` for singletons
- Use `inject()` instead of constructor injection

## Accessibility
- **IMPORTANT:** Must pass all AXE checks
- **IMPORTANT:** Must follow all WCAG AA minimums — focus management, color contrast, ARIA attributes