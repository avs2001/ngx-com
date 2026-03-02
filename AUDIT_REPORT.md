# com Library Audit Report

**Date:** 2026-03-02
**Files scanned:** 166
**Total lines:** 20,767
**Components audited:** 17 component groups (button, badge, card, checkbox, dropdown, menu, popover, calendar, sort, tabs, collapsible, form-field, radio, icon, utils, tokens)

## Executive Summary

The `com` component library demonstrates **excellent overall quality** with strong adherence to modern Angular patterns. The codebase consistently uses:
- Signal-based inputs/outputs (`input()`, `output()`, `model()`)
- `OnPush` change detection
- `host` object instead of `@HostBinding`/`@HostListener`
- Native control flow (`@if`, `@for`) instead of structural directives
- Semantic theme tokens exclusively (no hardcoded colors or scale tokens)
- CVA variants in separate `.variants.ts` files
- Proper `DOCUMENT` injection instead of direct `document` access

**Top 3 Most Impactful Issues:**
1. **Wrong prefix in tabs.utils.ts** - Uses `ui-tab-` instead of `com-tab-` prefix (violates project naming convention)
2. **Missing type annotations for `isolatedDeclarations`** - Several `inject()` calls and signal queries lack explicit type annotations
3. **Missing `@tokens` JSDoc** - Many sub-directives and components lack required token documentation

**Quick Wins:**
- Fix the `ui-tab-` → `com-tab-` prefix in `tabs.utils.ts`
- Add missing `@tokens` JSDoc to card, dropdown, calendar, and sort sub-components
- Add explicit type annotations to injected dependencies

## Severity Definitions

- 🔴 **Critical** — Bug, broken behavior, or security concern. Fix immediately.
- 🟠 **High** — Convention violation that affects maintainability or theme consistency. Fix soon.
- 🟡 **Medium** — Improvement opportunity. Plan for next sprint.
- 🟢 **Low** — Nice-to-have cleanup. Address opportunistically.

---

## 1. CLAUDE.md Compliance

### Passing Checks (All Components)

| Check | Status |
|-------|--------|
| `input()` / `output()` functions instead of decorators | ✅ PASS |
| No `standalone: true` in decorators (Angular v20+ default) | ✅ PASS |
| `changeDetection: OnPush` (where applicable) | ✅ PASS |
| `host` object instead of `@HostBinding`/`@HostListener` | ✅ PASS |
| `com-` prefix on selectors | ✅ PASS |
| Native control flow (`@if`, `@for`) | ✅ PASS (1 exception) |
| CVA in separate `.variants.ts` files | ✅ PASS |
| No direct DOM/`document` access | ✅ PASS |
| Semantic tokens only (no scale tokens/hardcoded colors) | ✅ PASS |

### Violations Found

| File | Rule Violated | Detail | Severity |
|------|---------------|--------|----------|
| `tabs.utils.ts:17` | Prefix Rule | `generateTabId()` returns `ui-tab-${id}` instead of `com-tab-${id}` | 🟠 High |
| `dropdown-panel.component.ts:58` | Template Syntax | Uses `*cdkVirtualFor` legacy structural directive (CDK limitation) | 🟡 Medium |

---

## 2. Theme Token Usage

All components correctly use semantic tokens. No hardcoded colors, hex values, or scale tokens (like `bg-primary-500`) were found.

| File:Line | Issue | Current Value | Suggested Token/Utility | Severity |
|-----------|-------|---------------|------------------------|----------|
| - | No issues | - | - | - |

**Token compliance is excellent across the library.**

---

## 3. CVA Audit

All CVA definitions are properly organized in separate `.variants.ts` files with:
- Proper `defaultVariants` configurations
- Type exports via `VariantProps<typeof ...>`
- Consistent variant axis naming (`variant`, `size`, `color`)

| Component | Issue | Detail | Recommendation |
|-----------|-------|--------|----------------|
| All components | - | CVA properly separated into `.variants.ts` files | No action needed |

---

## 4. Naming & Pattern Conventions

| File | Convention Issue | Current | Expected | Severity |
|------|------------------|---------|----------|----------|
| `tabs.utils.ts:17` | Wrong ID prefix | `ui-tab-${id}` | `com-tab-${id}` | 🟠 High |

All other naming conventions are followed:
- Selectors use `com-` prefix consistently
- File naming follows `[name].[type].ts` pattern
- Input/output naming is consistent across components

---

## 5. Component Reuse Opportunities

| Location(s) | Duplicated Pattern | Suggested Reuse | Impact |
|-------------|-------------------|-----------------|--------|
| `popover.utils.ts`, `utils/src/merge-classes.ts` | `mergeClasses()` function duplicated | Extract to shared utility or import from utils | 🟢 Low |
| `deep-equal.ts`, `deep-merge.ts` | `isPlainObject()` helper duplicated | Extract to shared internal utility | 🟢 Low |

---

## 6. Gaps & Bugs

### Missing Type Annotations (`isolatedDeclarations` Violations)

| File:Line | Bug/Gap Type | Detail | Severity | Fix Suggestion |
|-----------|--------------|--------|----------|----------------|
| `menu.component.ts:126` | Missing type annotation | `items` contentChildren query needs explicit `Signal<readonly MenuItemBase[]>` type | 🟠 High | Add explicit type |
| `calendar.ts:200` | Missing type annotation | `viewChildren(ComCalendarMonthView<D>)` needs explicit `Signal<...>` type | 🟠 High | Add explicit type |
| `views/month-view.ts:88` | Missing type annotation | `viewChildren(ComCalendarCell<D>)` needs explicit type | 🟠 High | Add explicit type |
| `views/year-view.ts:67` | Missing type annotation | `viewChildren(ComCalendarCell<D>)` needs explicit type | 🟠 High | Add explicit type |
| `views/multi-year-view.ts:65` | Missing type annotation | `viewChildren(ComCalendarCell<D>)` needs explicit type | 🟠 High | Add explicit type |
| `calendar-cell.ts:76` | Missing type annotation | `viewChild<ElementRef<HTMLButtonElement>>('cellButton')` needs explicit type | 🟠 High | Add explicit type |
| `native-date-adapter.ts:11` | Missing type annotation | `private readonly localeId = inject(LOCALE_ID)` | 🟠 High | Add `: string` type |
| `single-selection-strategy.ts:31` | Missing type annotation | `private readonly dateAdapter = inject(DATE_ADAPTER)` | 🟠 High | Add explicit type |
| `range-selection-strategy.ts:40` | Missing type annotation | `private readonly dateAdapter = inject(DATE_ADAPTER)` | 🟠 High | Add explicit type |
| `multi-selection-strategy.ts:34` | Missing type annotation | `private readonly dateAdapter = inject(DATE_ADAPTER)` | 🟠 High | Add explicit type |
| `week-selection-strategy.ts:32` | Missing type annotation | `private readonly dateAdapter = inject(DATE_ADAPTER)` | 🟠 High | Add explicit type |
| `datepicker.component.ts:290` | Missing type annotation | `datepickerId = generateDatepickerId()` | 🟠 High | Add `: string` type |
| `date-range-picker.component.ts:332` | Missing type annotation | `datepickerId = generateDatepickerId()` | 🟠 High | Add `: string` type |
| `sort.directive.ts:72` | Missing type annotation | `private readonly headers = new Map<string, SortHeaderComponent>()` | 🟠 High | Type is inferrable, add explicit annotation |
| `sort-header.component.ts:76-77` | Missing type annotation | `inject(SortDirective)`, `inject(DestroyRef)` | 🟠 High | Add explicit types |
| `tab-header.component.ts:181` | Missing type annotation | `private readonly destroyRef = inject(DestroyRef)` | 🟠 High | Add `: DestroyRef` type |
| `tab.component.ts:102-103` | Missing type annotation | `viewChild<TemplateRef<unknown>>('implicitContent')` | 🟠 High | Add explicit Signal type |
| `tab-link.directive.ts:53` | Missing type annotation | `inject(RouterLinkActive, { optional: true })` | 🟠 High | Add explicit type |
| `tab-nav-bar.component.ts:144` | Missing type annotation | `inject(DestroyRef)` | 🟠 High | Add `: DestroyRef` type |
| `tokens/src/index.ts:6` | Missing type annotation | `TOKENS_PLACEHOLDER = true` | 🟡 Medium | Add `: boolean` or remove placeholder |

### Missing @tokens JSDoc

| File:Line | Bug/Gap Type | Detail | Severity | Fix Suggestion |
|-----------|--------------|--------|----------|----------------|
| `card-header.directive.ts` | Missing @tokens | No token documentation | 🟡 Medium | Add `@tokens` JSDoc |
| `card-content.directive.ts` | Missing @tokens | No token documentation | 🟡 Medium | Add `@tokens` JSDoc |
| `card-title.directive.ts` | Missing @tokens | Uses `text-foreground` | 🟡 Medium | Add `@tokens \`--color-foreground\`` |
| `card-subtitle.directive.ts` | Missing @tokens | Uses `text-muted-foreground` | 🟡 Medium | Add `@tokens \`--color-muted-foreground\`` |
| `card-footer.directive.ts` | Missing @tokens | No token documentation | 🟡 Medium | Add `@tokens` JSDoc |
| `card-actions.directive.ts` | Missing @tokens | No token documentation | 🟡 Medium | Add `@tokens` JSDoc |
| `card-media.directive.ts` | Missing @tokens | No token documentation | 🟡 Medium | Add `@tokens` JSDoc |
| `card-divider.directive.ts` | Missing @tokens | Uses `border-border` | 🟡 Medium | Add `@tokens \`--color-border\`` |
| `dropdown-panel.component.ts` | Missing @tokens | No token documentation | 🟡 Medium | Add `@tokens` JSDoc |
| `dropdown-option.component.ts` | Missing @tokens | No token documentation | 🟡 Medium | Add `@tokens` JSDoc |
| `dropdown-group.component.ts` | Missing @tokens | No token documentation | 🟡 Medium | Add `@tokens` JSDoc |
| `dropdown-search.component.ts` | Missing @tokens | No token documentation | 🟡 Medium | Add `@tokens` JSDoc |
| `dropdown-tag.component.ts` | Missing @tokens | No token documentation | 🟡 Medium | Add `@tokens` JSDoc |
| `menu-group.directive.ts` | Missing @tokens | No token documentation | 🟡 Medium | Add `@tokens` JSDoc |
| `calendar-header.ts` | Missing @tokens | No token documentation | 🟡 Medium | Add `@tokens` JSDoc |
| `calendar-cell.ts` | Missing @tokens | No token documentation | 🟡 Medium | Add `@tokens` JSDoc |
| `views/calendar-view-base.ts` | Missing @tokens | No token documentation | 🟡 Medium | Add `@tokens` JSDoc |
| `views/month-view.ts` | Missing @tokens | No token documentation | 🟡 Medium | Add `@tokens` JSDoc |
| `views/year-view.ts` | Missing @tokens | No token documentation | 🟡 Medium | Add `@tokens` JSDoc |
| `views/multi-year-view.ts` | Missing @tokens | No token documentation | 🟡 Medium | Add `@tokens` JSDoc |
| `sort-icon.component.ts` | Missing @tokens | No token documentation | 🟡 Medium | Add `@tokens` JSDoc |
| `utils/src/merge-classes.ts` | Missing JSDoc | No function documentation | 🟡 Medium | Add JSDoc with @param, @returns, @example |

---

## 7. Simplification Opportunities

| File:Line | Simplification | Current Approach | Suggested Approach | Effort |
|-----------|----------------|------------------|-------------------|--------|
| `checkbox.component.ts:211-217` | effect() usage | Uses `effect()` to sync `indeterminate` property to DOM | Justified - indeterminate is a DOM property (not attribute) requiring imperative sync | None needed |
| `collapsible-content.component.ts:146` | effect() usage | Uses `effect()` for lazy rendering tracking | Could use `linkedSignal()` or computed state | 🟡 Medium |
| `form-field.component.ts:213-246` | Multiple effects | 4 `effect()` calls for ARIA wiring | Some could potentially use template bindings | 🟡 Medium |
| `deep-clone.ts:39` | Redundant check | `if (typeof value === 'object')` always true at this point | Remove redundant condition | 🟢 Low |

---

## Summary Statistics

| Severity | Count |
|----------|-------|
| 🔴 Critical | 0 |
| 🟠 High | 20 |
| 🟡 Medium | 26 |
| 🟢 Low | 6 |

### Issue Breakdown by Category

| Category | Critical | High | Medium | Low |
|----------|----------|------|--------|-----|
| Wrong prefix | 0 | 1 | 0 | 0 |
| Missing type annotations | 0 | 19 | 1 | 0 |
| Missing @tokens JSDoc | 0 | 0 | 22 | 0 |
| Duplicate code | 0 | 0 | 0 | 2 |
| Legacy syntax | 0 | 0 | 1 | 0 |
| Effect usage | 0 | 0 | 2 | 0 |
| Redundant code | 0 | 0 | 0 | 1 |
| Missing JSDoc | 0 | 0 | 0 | 3 |

---

## Recommendations

### Priority 1: Fix Wrong Prefix (Immediate)
```typescript
// tabs.utils.ts:17
// Change from:
return `ui-tab-${++tabIdCounter}`;
// To:
return `com-tab-${++tabIdCounter}`;
```

### Priority 2: Add Type Annotations for `isolatedDeclarations` (High Priority)
Add explicit type annotations to all injected dependencies and signal queries:
```typescript
// Before:
private readonly destroyRef = inject(DestroyRef);

// After:
private readonly destroyRef: DestroyRef = inject(DestroyRef);
```

### Priority 3: Add @tokens JSDoc (Medium Priority)
Add `@tokens` documentation to all components that use semantic tokens:
```typescript
/**
 * Card divider...
 *
 * @tokens `--color-border`
 */
```

---

## Appendix: File Manifest

| File | Type | Lines |
|------|------|-------|
| `components/badge/badge.directive.ts` | Component | ~80 |
| `components/badge/badge.variants.ts` | Variants | ~50 |
| `components/badge/index.ts` | Barrel | ~15 |
| `components/button/button.directive.ts` | Directive | ~100 |
| `components/button/button.variants.ts` | Variants | ~120 |
| `components/button/index.ts` | Barrel | ~10 |
| `components/calendar/calendar.ts` | Component | ~350 |
| `components/calendar/calendar-cell.ts` | Component | ~150 |
| `components/calendar/calendar-header.ts` | Component | ~200 |
| `components/calendar/calendar.types.ts` | Types | ~80 |
| `components/calendar/calendar.utils.ts` | Utils | ~150 |
| `components/calendar/calendar.variants.ts` | Variants | ~50 |
| `components/calendar/calendar-cell.variants.ts` | Variants | ~80 |
| `components/calendar/calendar-header.variants.ts` | Variants | ~60 |
| `components/calendar/providers.ts` | Providers | ~100 |
| `components/calendar/date-adapter/date-adapter.ts` | Abstract | ~100 |
| `components/calendar/date-adapter/native-date-adapter.ts` | Service | ~200 |
| `components/calendar/selection/selection-strategy.ts` | Abstract | ~50 |
| `components/calendar/selection/single-selection-strategy.ts` | Service | ~60 |
| `components/calendar/selection/range-selection-strategy.ts` | Service | ~100 |
| `components/calendar/selection/multi-selection-strategy.ts` | Service | ~80 |
| `components/calendar/selection/week-selection-strategy.ts` | Service | ~80 |
| `components/calendar/views/calendar-view-base.ts` | Abstract | ~100 |
| `components/calendar/views/month-view.ts` | Component | ~200 |
| `components/calendar/views/year-view.ts` | Component | ~150 |
| `components/calendar/views/multi-year-view.ts` | Component | ~150 |
| `components/calendar/datepicker/datepicker.component.ts` | Component | ~400 |
| `components/calendar/datepicker/date-range-picker.component.ts` | Component | ~450 |
| `components/calendar/datepicker/datepicker.variants.ts` | Variants | ~200 |
| `components/card/card.component.ts` | Component | ~60 |
| `components/card/card.variants.ts` | Variants | ~80 |
| `components/card/*.directive.ts` | Directives | ~300 total |
| `components/checkbox/checkbox.component.ts` | Component | ~270 |
| `components/checkbox/checkbox.variants.ts` | Variants | ~85 |
| `components/collapsible/collapsible.directive.ts` | Directive | ~150 |
| `components/collapsible/collapsible-trigger.component.ts` | Component | ~150 |
| `components/collapsible/collapsible-content.component.ts` | Component | ~200 |
| `components/collapsible/collapsible.variants.ts` | Variants | ~80 |
| `components/dropdown/dropdown.component.ts` | Component | ~500 |
| `components/dropdown/dropdown.variants.ts` | Variants | ~150 |
| `components/dropdown/*.component.ts` | Components | ~600 total |
| `components/form-field/form-field.component.ts` | Component | ~300 |
| `components/form-field/form-field.variants.ts` | Variants | ~100 |
| `components/form-field/input.directive.ts` | Directive | ~250 |
| `components/form-field/*.directive.ts` | Directives | ~200 total |
| `components/icon/icon.component.ts` | Component | ~107 |
| `components/icon/icon.variants.ts` | Variants | ~45 |
| `components/icon/icon.providers.ts` | Provider | ~25 |
| `components/menu/menu.component.ts` | Component | ~250 |
| `components/menu/menu.variants.ts` | Variants | ~150 |
| `components/menu/*.directive.ts` | Directives | ~400 total |
| `components/popover/popover-trigger.directive.ts` | Directive | ~400 |
| `components/popover/popover-content.component.ts` | Component | ~100 |
| `components/popover/popover.variants.ts` | Variants | ~65 |
| `components/radio/radio.component.ts` | Component | ~200 |
| `components/radio/radio-group.component.ts` | Component | ~250 |
| `components/radio/radio.variants.ts` | Variants | ~90 |
| `components/sort/sort.directive.ts` | Directive | ~150 |
| `components/sort/sort-header.component.ts` | Component | ~200 |
| `components/sort/sort.variants.ts` | Variants | ~50 |
| `components/tabs/tab-group.component.ts` | Component | ~300 |
| `components/tabs/tab.component.ts` | Component | ~150 |
| `components/tabs/tab-header.component.ts` | Component | ~250 |
| `components/tabs/tab-nav-bar.component.ts` | Component | ~340 |
| `components/tabs/tabs.variants.ts` | Variants | ~200 |
| `utils/src/chunk.ts` | Utility | ~30 |
| `utils/src/debounce.ts` | Utility | ~50 |
| `utils/src/deep-clone.ts` | Utility | ~50 |
| `utils/src/deep-equal.ts` | Utility | ~90 |
| `utils/src/deep-merge.ts` | Utility | ~60 |
| `utils/src/group-by.ts` | Utility | ~30 |
| `utils/src/merge-classes.ts` | Utility | ~10 |
| `utils/src/omit.ts` | Utility | ~25 |
| `utils/src/partition.ts` | Utility | ~30 |
| `utils/src/pick.ts` | Utility | ~25 |
| `utils/src/resolve-path.ts` | Utility | ~55 |
| `utils/src/retry.ts` | Utility | ~90 |
| `utils/src/throttle.ts` | Utility | ~95 |
| `tokens/src/index.ts` | Tokens | ~7 |

**Total: 166 TypeScript files, ~20,767 lines**
