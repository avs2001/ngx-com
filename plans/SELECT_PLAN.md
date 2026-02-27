# `com-select` — Design & Implementation Plan

## Summary

A single-select component built on top of `@angular/aria/combobox` dialog popup pattern. Wraps Angular Aria primitives for accessibility, keyboard navigation, and focus management — no reinventing the wheel. Styled with CVA + app theme tokens. Implements `ControlValueAccessor` for forms integration.

**Import path:** `ngx-com/components/select`
**Prefix:** `com-`
**Built on:** `@angular/aria/combobox` + `@angular/aria/listbox`

---

## Architecture: Dialog Popup Pattern

The component uses a **nested combobox** structure from Angular Aria:

```
com-select (host component + ControlValueAccessor)
└── div[ngCombobox][readonly]              ← outer combobox (trigger)
    ├── div.trigger                        ← styled trigger area
    │   ├── [selectedValueTpl] or default  ← displays current selection
    │   ├── input[ngComboboxInput]         ← hidden readonly input (ARIA)
    │   ├── clear button (optional)        ← resets value
    │   └── arrow icon                     ← visual indicator
    └── ng-template[ngComboboxPopupContainer]
        └── dialog[ngComboboxDialog]       ← modal with backdrop + focus trap
            └── div[ngCombobox][filterMode="manual"][alwaysExpanded]  ← inner combobox
                ├── div.search-container (optional)
                │   ├── search icon
                │   └── input[ngComboboxInput]  ← search input
                ├── [panelHeaderTpl] (optional)
                ├── [loadingTpl] (when loading)
                ├── [noResultsTpl] (when empty)
                ├── div[ngListbox]
                │   └── div[ngOption] per item  ← uses [optionTpl] or default
                └── [panelFooterTpl] (optional)
```

**Why dialog popup?**
- Focus trapping handled by `<dialog>` + `ngComboboxDialog`
- Backdrop for free (dismisses on outside click)
- Clean separation: trigger is readonly, search lives inside dialog
- Keyboard nav, ARIA roles, `aria-expanded`, `aria-activedescendant` all handled by Angular Aria

---

## Styling (Tailwind 4 + App Theme Tokens)

### Token Mapping

| Element | Token Usage |
|---------|-------------|
| Trigger bg | `bg-surface-50` |
| Trigger border | `border-surface-300`, focus: `border-primary-500` |
| Trigger text | `text-surface-900`, placeholder: `text-surface-400` |
| Trigger focus ring | `outline-primary-500` (inherits `:focus-visible` base) |
| Trigger invalid | `border-warn-500` |
| Arrow icon | `text-surface-400` |
| Clear button | `text-surface-400`, hover: `text-surface-600` |
| Dialog bg | `bg-surface-50` |
| Dialog border | `border-surface-200` |
| Dialog shadow | `shadow-lg` |
| Search input bg | `bg-surface-50` |
| Search border | `border-b border-surface-200` |
| Option hover | `bg-surface-100` |
| Option active (keyboard) | `ring-2 ring-primary-500` |
| Option selected | `bg-primary-50 text-primary-700` |
| Option disabled | `text-surface-400 opacity-50` |
| Check icon | `text-primary-500` |
| No results / loading | `text-surface-400` |

Dark mode + forest theme handled automatically via `[data-theme]`.

### CVA Variants

```ts
const triggerVariants = cva(
  'flex items-center gap-2 w-full rounded-md border bg-surface-50 text-surface-900 font-sans cursor-pointer transition-colors',
  {
    variants: {
      state: {
        default: 'border-surface-300 hover:border-surface-400',
        focused: 'border-primary-500 ring-2 ring-primary-500/20',
        open: 'border-primary-500 ring-2 ring-primary-500/20',
        disabled: 'bg-surface-100 text-surface-400 cursor-not-allowed',
        invalid: 'border-warn-500 hover:border-warn-600',
      },
      size: {
        sm: 'h-8 px-2.5 text-sm',
        md: 'h-10 px-3 text-base',
        lg: 'h-12 px-4 text-lg',
      },
    },
  }
);

const optionVariants = cva(
  'flex items-center px-3 min-h-9 rounded-md cursor-pointer transition-colors',
  {
    variants: {
      state: {
        default: 'text-surface-900',
        active: 'bg-surface-100 ring-2 ring-primary-500 ring-offset-[-2px]',
        selected: 'bg-primary-50 text-primary-700',
        disabled: 'text-surface-400 opacity-50 cursor-not-allowed',
      },
    },
  }
);

const dialogVariants = cva(
  'rounded-lg border border-surface-200 bg-surface-50 shadow-lg overflow-hidden',
  {
    variants: {
      size: {
        sm: 'max-h-56',
        md: 'max-h-72',
        lg: 'max-h-96',
      },
    },
  }
);
```

---

## API Surface

### `com-select<T>` Inputs (signal-based)

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `value` | `T \| null` | `null` | Current selected value |
| `placeholder` | `string` | `''` | Trigger placeholder text |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Required state |
| `compareWith` | `(a: T, b: T) => boolean` | `===` | Value identity comparator |
| `displayWith` | `(value: T) => string` | `String(value)` | Formats value for trigger display |
| `searchable` | `boolean` | `false` | Show search input in dialog |
| `searchPredicate` | `(option: T, query: string) => boolean` | label includes query | Local filter function |
| `loading` | `boolean` | `false` | Show loading template |
| `clearable` | `boolean` | `false` | Show clear button |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Trigger + dialog size |
| `panelClass` | `string` | `''` | Extra dialog CSS class |

### `com-select<T>` Outputs

| Output | Type | Description |
|--------|------|-------------|
| `valueChange` | `T \| null` | Emits on selection change |
| `opened` | `void` | Dialog opened |
| `closed` | `void` | Dialog closed |
| `searchChange` | `string` | Emits search query (for server search) |
| `cleared` | `void` | Emits on clear |

### `com-select-option<T>` Inputs

| Input | Type | Description |
|-------|------|-------------|
| `value` | `T` | Option value |
| `label` | `string` | Display label (used by Angular Aria for ARIA + search) |
| `disabled` | `boolean` | Disabled state |

### Template Slots (ng-template directives)

| Directive | Context | Description |
|-----------|---------|-------------|
| `comSelectOptionTpl` | `{ $implicit: T, label: string, selected: boolean, active: boolean }` | Custom option rendering |
| `comSelectValueTpl` | `{ $implicit: T \| null, placeholder: string }` | Custom trigger value display |
| `comSelectPanelHeaderTpl` | `{}` | Content above listbox in dialog |
| `comSelectPanelFooterTpl` | `{}` | Content below listbox in dialog |
| `comSelectNoResultsTpl` | `{ query: string }` | Empty state |
| `comSelectLoadingTpl` | `{}` | Loading state |

---

## Search Architecture

```
searchable = true
├── Local search (default)
│   └── searchPredicate filters options client-side
│   └── Default: label.toLowerCase().includes(query.toLowerCase())
└── Server search
    └── Consumer listens to (searchChange) output
    └── Consumer sets [loading]="true" while fetching
    └── Consumer updates options list with results
    └── Consumer sets [loading]="false" when done
```

### Local search usage

```html
<com-select [searchable]="true" [searchPredicate]="myFilter">
  <com-select-option *ngFor="let item of items" [value]="item" [label]="item.name">
    {{ item.name }}
  </com-select-option>
</com-select>
```

### Server search usage

```html
<com-select
  [searchable]="true"
  [loading]="loading()"
  (searchChange)="onSearch($event)"
>
  <com-select-option *ngFor="let item of results()" [value]="item" [label]="item.name">
    {{ item.name }}
  </com-select-option>
</com-select>
```

---

## ControlValueAccessor

Implements `ControlValueAccessor` for both form types:

```html
<!-- Reactive -->
<com-select formControlName="country" [compareWith]="compareById">

<!-- Template-driven -->
<com-select [(ngModel)]="selectedCountry" [compareWith]="compareById">
```

Handles: `writeValue`, `registerOnChange`, `registerOnTouched`, `setDisabledState`.
Reflects form states: `ng-invalid`, `ng-touched`, `ng-dirty`, `ng-pristine`.

---

## Keyboard Navigation

Handled by `@angular/aria/combobox` + `@angular/aria/listbox`. The component inherits:

| Key | Trigger (outer combobox) | Dialog (inner combobox) |
|-----|--------------------------|------------------------|
| Enter / Space / ↓ | Opens dialog | Selects active option |
| Escape | — | Closes dialog |
| ↑ ↓ | Opens dialog | Moves active option |
| Home / End | — | First / last option |
| Type characters | — | Filters via search input |

---

## Accessibility

Handled by Angular Aria primitives. The component inherits:

- Outer: `role="combobox"`, `aria-haspopup="dialog"`, `aria-expanded`
- Dialog: `<dialog>` element with focus trap
- Inner: `role="combobox"` for search, `role="listbox"` for options
- Options: `role="option"`, `aria-selected`, `aria-disabled`, `data-active`
- `aria-activedescendant` tracks keyboard focus

---

## File Structure

```
ngx-com/
└── components/
    └── select/
        ├── select.ts                  ← com-select (orchestrator + CVA)
        ├── select-option.ts           ← com-select-option (wraps ngOption)
        ├── select.variants.ts         ← CVA trigger, option, dialog variants
        ├── select.tokens.ts           ← InjectionTokens for template directives
        ├── select.types.ts            ← shared types
        └── index.ts                   ← public API barrel
```

Minimal file count — Angular Aria handles the heavy lifting. No need for separate trigger, panel, search, or value components.

---

## Implementation Phases

---

### Phase 1 — Core Select + CVA

**Goal:** Working single-select with trigger, dialog, listbox, forms integration.

**Scope:**
1. `select.types.ts` — shared types (`ComSelectSize`, etc.)
2. `select.tokens.ts` — injection tokens for template directives
3. `select.variants.ts` — CVA trigger, option, dialog variants using app theme tokens
4. `com-select-option` — wraps `ngOption`, exposes `value`, `label`, `disabled` inputs
5. `com-select` — orchestrates outer readonly `ngCombobox` trigger + `ngComboboxDialog` + inner `ngCombobox` with `ngListbox`
6. `ControlValueAccessor` — `writeValue`, `registerOnChange`, `registerOnTouched`, `setDisabledState`, `compareWith`
7. `displayWith` — formats selected value for trigger display
8. `clearable` — clear button resets value to null
9. Size variants — sm / md / lg on trigger and dialog
10. `index.ts` — public API barrel

**Deliverables:** single select working with `formControlName` and `ngModel`, dialog opens/closes, value syncs
**Tests:** CVA read/write, dialog open/close, selection, clear, disabled, size variants

**Claude Code Prompt:**
```
Read SELECT_PLAN.md and CLAUDE.md. Implement Phase 1 of com-select.

Build a single-select component at ngx-com/components/select/ using the Angular Aria
dialog popup pattern. Reference https://angular.dev/guide/aria/combobox#dialog-popup

Dependencies from @angular/aria:
- Combobox, ComboboxInput, ComboboxDialog, ComboboxPopupContainer from '@angular/aria/combobox'
- Listbox, Option from '@angular/aria/listbox'

Architecture (nested combobox):
- Outer: div[ngCombobox][readonly] as trigger with hidden input[ngComboboxInput]
- Popup: dialog[ngComboboxDialog] containing inner div[ngCombobox][filterMode="manual"][alwaysExpanded="true"]
- Inner: div[ngListbox] with com-select-option items rendered as div[ngOption]

Files to create:
- select.types.ts — ComSelectSize type
- select.tokens.ts — InjectionTokens for template directives
- select.variants.ts — CVA variants (triggerVariants, optionVariants, dialogVariants) using app theme tokens (primary, surface, warn). See SELECT_PLAN.md for exact variant definitions.
- select-option.ts — com-select-option: standalone, wraps ngOption, inputs: value<T>, label (string), disabled (boolean)
- select.ts — com-select<T>: standalone, orchestrator + ControlValueAccessor
  - Inputs: value, placeholder, disabled, required, compareWith, displayWith, clearable, size, panelClass
  - Outputs: valueChange, opened, closed, cleared
  - Implements writeValue, registerOnChange, registerOnTouched, setDisabledState
  - Uses viewChild for Combobox, Listbox, ComboboxDialog refs
  - Manages dialog positioning (see dialog popup example in docs)
  - Clear button resets to null
- index.ts — barrel export

Use OnPush, signal inputs, inject(), content projection for options.
Style with CVA + app theme tokens. No custom CSS properties.
Follow CLAUDE.md rules. Track in Project #3.
```

---

### Phase 2 — Search & Async

**Goal:** Optional search with local predicate and server search support.

**Depends on:** Phase 1 complete.

**Scope:**
1. `searchable` input — when true, render search input inside dialog (inner combobox input becomes visible)
2. Local search — filter projected `com-select-option` visibility via `searchPredicate` input
3. Default predicate — `label.toLowerCase().includes(query.toLowerCase())`
4. Server search — `(searchChange)` output emits debounced query string
5. `loading` input — when true, show loading state instead of options
6. No-results state — when filtered options empty and not loading
7. Search clears when dialog closes

**Deliverables:** searchable select with local + server modes, loading + no-results states
**Tests:** local predicate filter, custom predicate, search debounce, async loading flow, search reset on close

**Claude Code Prompt:**
```
Read SELECT_PLAN.md and CLAUDE.md. Implement Phase 2 of com-select (Search & Async).

Phase 1 is complete — single select with CVA, dialog popup, and ControlValueAccessor working.

Now add search to the dialog:
- searchable input (boolean, default false): when true, the inner ngComboboxInput in the dialog
  becomes a visible search field with a search icon
- Local search: use searchPredicate input to filter options. Default predicate:
  (option, query) => label.toLowerCase().includes(query.toLowerCase())
  Hide non-matching com-select-option elements
- Server search: (searchChange) output emits the search query string (debounced).
  Consumer listens, fetches, updates options externally. Component just shows what's projected.
- loading input: when true, hide listbox and show a loading indicator
- No-results: when no visible options and not loading, show "No results" message
- Search string resets to '' when dialog closes
- Keyboard: typing in search filters options, arrow keys still navigate listbox below

Use app theme tokens for search input styling (bg-surface-50, border-b border-surface-200).
Follow CLAUDE.md rules. Track in Project #3.
```

---

### Phase 3 — Templates & Customization

**Goal:** All ng-template slots wired with typed context.

**Depends on:** Phase 2 complete.

**Scope:**
1. `comSelectOptionTpl` directive — custom option rendering with context `{ $implicit: T, label: string, selected: boolean, active: boolean }`
2. `comSelectValueTpl` directive — custom trigger value display with context `{ $implicit: T | null, placeholder: string }`
3. `comSelectPanelHeaderTpl` directive — content above listbox in dialog
4. `comSelectPanelFooterTpl` directive — content below listbox in dialog
5. `comSelectNoResultsTpl` directive — custom empty state with context `{ query: string }`
6. `comSelectLoadingTpl` directive — custom loading indicator
7. Ensure all templates work alongside search and non-search modes

**Deliverables:** all 6 template slots rendering with correct typed context
**Tests:** each template renders, context values correct, templates work with/without search

**Claude Code Prompt:**
```
Read SELECT_PLAN.md and CLAUDE.md. Implement Phase 3 of com-select (Templates & Customization).

Phase 1-2 complete — single select with dialog, CVA, search, and async all working.

Now add 6 ng-template directive slots. Each is a standalone directive the consumer places
inside <com-select> to customize rendering:

1. comSelectOptionTpl — context: { $implicit: T, label: string, selected: boolean, active: boolean }
   Replaces the default option content inside each ngOption
2. comSelectValueTpl — context: { $implicit: T | null, placeholder: string }
   Replaces the default trigger value display
3. comSelectPanelHeaderTpl — context: {}
   Rendered above the listbox inside the dialog
4. comSelectPanelFooterTpl — context: {}
   Rendered below the listbox inside the dialog
5. comSelectNoResultsTpl — context: { query: string }
   Replaces the default "No results" message
6. comSelectLoadingTpl — context: {}
   Replaces the default loading indicator

Use @ContentChild to query each directive. Each directive is just a simple directive
that holds a TemplateRef. Define them in select.tokens.ts or as standalone directives
in their own files.

Follow CLAUDE.md rules. Track in Project #3.
```

---

### Phase 4 — Polish & Integration

**Goal:** Production-ready, fully themed, documented.

**Depends on:** Phase 3 complete.

**Scope:**
1. Theme verification — all tokens render correctly across light / dark / forest themes
2. Form validation — error states reflected (`ng-invalid` + `ng-touched` → `border-warn-500`)
3. Edge cases — empty options, dynamic option changes, very long labels (ellipsis), single option, null value
4. Animations — dialog open/close transitions using `animate-scale-in` / `animate-fade-in` from app theme
5. Dialog positioning — ensure dialog aligns to trigger width, repositions on scroll/resize
6. Performance — OnPush verified, no unnecessary re-renders, signals audit
7. AXE + WCAG AA audit
8. Documentation — usage examples: basic, searchable, server search, custom templates, forms

**Deliverables:** theme verified, docs, final test suite, public API barrel
**Tests:** form validation states, theme rendering, edge cases, animations, a11y audit

**Claude Code Prompt:**
```
Read SELECT_PLAN.md and CLAUDE.md. Implement Phase 4 of com-select (Polish & Integration).

Phase 1-3 complete — single select with dialog, CVA, search, async, and all 6 template
slots working.

Now finalize:
- Verify all CVA variants render correctly across light, dark ([data-theme='dark']),
  and forest ([data-theme='forest']) themes using app theme tokens
- Form validation: com-select reflects ng-invalid, ng-touched, ng-dirty, ng-pristine.
  When invalid + touched, trigger shows border-warn-500
- Edge cases: empty option list (show no-results), dynamic options (options added/removed
  after init), very long labels (text-overflow: ellipsis), null/undefined value handling
- Animations: dialog uses animate-scale-in on open, fade out on close. Use app theme's
  --ease-spring and animation keyframes.
- Dialog positioning: dialog width matches trigger width, position below trigger.
  Handle viewport edge cases. Use Renderer2 for DOM positioning (per CLAUDE.md rules).
- Performance: confirm OnPush on all components, verify signal reactivity, no glitches
- Run AXE audit, fix violations, verify WCAG AA (focus management, contrast, ARIA)
- Write usage docs with examples:
  - Basic single select with formControlName
  - Searchable with local predicate
  - Server search with loading
  - Custom option template
  - Custom value template
  - Panel header/footer
  - All sizes (sm/md/lg)
- Clean up index.ts barrel — export only public API

Follow CLAUDE.md rules. Track in Project #3.
```
