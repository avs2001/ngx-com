# `com-select` — Testing Plan

## Summary

Two testing layers for `com-select`, each with distinct scope and tooling:

| Layer | Where | Runner | What it tests |
|-------|-------|--------|---------------|
| **Unit** | Library (`ngx-com`) | Vitest + TestBed (jsdom) | Component logic, harness API, CVA, signals, DOM structure |
| **Browser** | Integration app | Vitest + Playwright browser mode | Real browser interactions, keyboard, a11y, visual regression |

The **CDK Component Harness** (`ComSelectHarness`) ships with the library and is used in **both** layers via `TestbedHarnessEnvironment`. Browser tests run the same harness code in a real Chromium browser through Vitest's `@vitest/browser-playwright` integration.

---

## Part 1 — Library Unit Tests (Vitest)

### Stack

- **Runner:** Vitest via `ng test` (default Angular CLI)
- **DOM:** jsdom (default) or `--browsers=chromium` for real browser when needed
- **Harness:** `TestbedHarnessEnvironment` from `@angular/cdk/testing/testbed`
- **Location:** `ngx-com/components/select/*.spec.ts`

### Setup

```bash
# Default (jsdom, fast)
ng test

# Real browser when needed (keyboard, focus, rendering)
ng test --browsers=chromium

# CI
ng test --browsers=chromiumHeadless --no-watch
```

### What unit tests cover

- Component creation and defaults
- Harness API correctness (every method works)
- ControlValueAccessor contract (reactive forms, template-driven)
- Signal-based inputs/outputs
- Option projection and filtering
- Search predicate logic
- Template slot rendering
- Disabled/required/error states
- compareWith / displayWith functions
- CVA variant classes

### What unit tests do NOT cover

- Real keyboard navigation (jsdom key events are unreliable)
- Dialog positioning / overlay behavior
- Cross-browser rendering
- Visual regression / theme screenshots
- Full page integration with routing

---

### Component Harness: `ComSelectHarness`

Ships at `ngx-com/components/select/testing`. Used in unit tests AND available for consumers + e2e.

```ts
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';

export class ComSelectHarness extends ComponentHarness {
  static hostSelector = 'com-select';

  static with(options: SelectHarnessFilters = {}): HarnessPredicate<ComSelectHarness> {
    return new HarnessPredicate(ComSelectHarness, options)
      .addOption('value', options.value, async (harness, value) =>
        (await harness.getValueText()) === value
      );
  }

  // --- Trigger ---
  async open(): Promise<void>;
  async close(): Promise<void>;
  async isOpen(): Promise<boolean>;
  async isDisabled(): Promise<boolean>;
  async isRequired(): Promise<boolean>;

  // --- Value ---
  async getValueText(): Promise<string>;
  async getPlaceholder(): Promise<string>;

  // --- Selection ---
  async selectOption(filter: OptionHarnessFilters): Promise<void>;
  async getOptions(filter?: OptionHarnessFilters): Promise<ComSelectOptionHarness[]>;
  async getSelectedOption(): Promise<ComSelectOptionHarness | null>;

  // --- Search ---
  async isSearchable(): Promise<boolean>;
  async enterSearchQuery(query: string): Promise<void>;
  async getSearchQuery(): Promise<string>;
  async clearSearch(): Promise<void>;

  // --- Clear ---
  async isClearable(): Promise<boolean>;
  async clear(): Promise<void>;

  // --- State ---
  async isValid(): Promise<boolean>;
  async isTouched(): Promise<boolean>;
  async isDirty(): Promise<boolean>;
}

export class ComSelectOptionHarness extends ComponentHarness {
  static hostSelector = '[ngOption]';

  static with(options: OptionHarnessFilters = {}): HarnessPredicate<ComSelectOptionHarness> {
    return new HarnessPredicate(ComSelectOptionHarness, options)
      .addOption('label', options.label, async (harness, label) =>
        (await harness.getLabel()) === label
      )
      .addOption('isSelected', options.isSelected, async (harness, isSelected) =>
        (await harness.isSelected()) === isSelected
      );
  }

  async getLabel(): Promise<string>;
  async getValue(): Promise<string>;
  async isSelected(): Promise<boolean>;
  async isActive(): Promise<boolean>;
  async isDisabled(): Promise<boolean>;
  async click(): Promise<void>;
}

export interface SelectHarnessFilters {
  value?: string;
}

export interface OptionHarnessFilters {
  label?: string | RegExp;
  isSelected?: boolean;
  isDisabled?: boolean;
}
```

---

### Unit Test Suites

#### Suite U1 — Component Creation & Defaults

**File:** `select.spec.ts`

| Test | Description |
|------|-------------|
| creates component | Component instantiates without errors |
| shows placeholder when no value | `getPlaceholder()` returns configured placeholder |
| isDisabled defaults to false | `isDisabled()` → false |
| isRequired defaults to false | `isRequired()` → false |
| isSearchable defaults to false | `isSearchable()` → false |
| isClearable defaults to false | `isClearable()` → false |
| isOpen defaults to false | `isOpen()` → false |

#### Suite U2 — Harness API: Opening & Selection

**File:** `select.spec.ts`

| Test | Description |
|------|-------------|
| open() opens dialog | `open()` → `isOpen()` true |
| close() closes dialog | `open()`, `close()` → `isOpen()` false |
| selectOption selects by label | `selectOption({label: 'Banana'})` → `getValueText()` "Banana" |
| selectOption closes dialog | After selection → `isOpen()` false |
| getOptions returns all | `getOptions()` length matches option count |
| getOptions filters by label | `getOptions({label: /^B/})` returns filtered set |
| getSelectedOption returns current | After select → `getSelectedOption()` not null |
| getSelectedOption returns null initially | No selection → null |

#### Suite U3 — ControlValueAccessor

**File:** `select-cva.spec.ts`

| Test | Description |
|------|-------------|
| syncs value to formControl | `selectOption()` → formControl.value matches |
| reflects initial formControl value | Preset value → `getValueText()` matches |
| patchValue updates trigger | `form.patchValue()` → `getValueText()` updates |
| setValue updates trigger | `formControl.setValue()` → display updates |
| reset clears selection | `form.reset()` → placeholder shown |
| disabled via formControl.disable() | `isDisabled()` → true |
| touched after open+close | `open()`, `close()` → `isTouched()` true |
| dirty after selection | `selectOption()` → `isDirty()` true |
| pristine initially | No interaction → `isDirty()` false |
| invalid when required + empty | Required + no value + touched → `isValid()` false |
| valid after selection | Required + selected → `isValid()` true |
| ngModel two-way binding | Selection updates model variable |
| ngModel initial value | Preset model → correct display |

#### Suite U4 — compareWith & displayWith

**File:** `select-cva.spec.ts`

| Test | Description |
|------|-------------|
| compareWith matches objects by id | Preset object value matched by comparator |
| displayWith formats trigger text | `getValueText()` returns formatted string |

#### Suite U5 — Disabled & Clear

**File:** `select.spec.ts`

| Test | Description |
|------|-------------|
| disabled prevents opening | Disabled → `open()` has no effect |
| disabled option not selectable | Option with disabled → `isDisabled()` true |
| clear resets value to null | Select, `clear()` → value reset |
| clear hidden when no value | No selection → clear button not rendered |

#### Suite U6 — Search

**File:** `select-search.spec.ts`

| Test | Description |
|------|-------------|
| isSearchable true when configured | `isSearchable()` → true |
| enterSearchQuery filters options | Type "ban" → `getOptions()` returns 1 |
| clearSearch shows all options | Clear → full option count |
| no match shows zero options | Type "xyz" → 0 options |
| search resets on close | Search, close, reopen → `getSearchQuery()` empty |
| custom predicate filters by field | Custom predicate matches by code, not label |
| searchChange emits on input | Spy on output → emitted with query string |
| loading input shows loading state | `[loading]=true` → loading content rendered |

#### Suite U7 — Templates

**File:** `select-templates.spec.ts`

| Test | Description |
|------|-------------|
| custom option template renders | Template content visible in option |
| option template receives context | `$implicit` has value, selected, active |
| custom value template renders | Trigger shows template content |
| value template receives context | `$implicit` has value, placeholder flag |
| panel header template renders | Header content above options |
| panel footer template renders | Footer content below options |
| no-results template renders | Custom empty message shown |
| no-results template receives query | Context contains search query |
| loading template renders | Custom loading content shown |

#### Suite U8 — Sizes & CVA Variants

**File:** `select-variants.spec.ts`

| Test | Description |
|------|-------------|
| sm size applies correct class | Size sm → CVA class applied |
| md size applies correct class | Size md (default) → CVA class |
| lg size applies correct class | Size lg → CVA class applied |
| invalid state applies warn styling | Invalid + touched → warn variant |

---

### Unit Test Usage Pattern

```ts
import { TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { ComSelectHarness } from 'ngx-com/components/select/testing';

describe('ComSelect', () => {
  let loader: HarnessLoader;
  let rootLoader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestHostComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    // For dialog elements outside component root:
    rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

  it('should select option', async () => {
    const select = await loader.getHarness(ComSelectHarness);
    await select.open();

    // Options are in the dialog (document root)
    const options = await select.getOptions();
    expect(options.length).toBe(5);

    await select.selectOption({ label: 'Banana' });
    expect(await select.getValueText()).toBe('Banana');
  });
});
```

**IMPORTANT:** `ComSelectHarness` internally uses `documentRootLocatorFactory()` for dialog-related locators since `ngComboboxDialog` renders outside the component host.

---

### Library File Structure

```
ngx-com/components/select/
├── testing/
│   ├── select-harness.ts
│   ├── select-option-harness.ts
│   ├── select-harness-filters.ts
│   └── index.ts
├── select.spec.ts              ← Suites U1, U2, U5
├── select-cva.spec.ts          ← Suites U3, U4
├── select-search.spec.ts       ← Suite U6
├── select-templates.spec.ts    ← Suite U7
├── select-variants.spec.ts     ← Suite U8
├── select.ts
├── select-option.ts
├── select.variants.ts
├── select.tokens.ts
├── select.types.ts
└── index.ts
```

---

## Part 2 — Integration App Browser Tests (Vitest + Playwright)

### Stack

- **Runner:** Vitest via `ng test` with browser mode
- **Browser Provider:** `@vitest/browser-playwright` (Chromium)
- **A11y:** `vitest-axe` (axe-core wrapper for Vitest)
- **Location:** `src/app/test/select/*.browser.spec.ts`
- **Test pages:** Test host components in browser spec files

### Setup

```bash
# Install Playwright browser provider for Vitest
npm install --save-dev @vitest/browser-playwright playwright vitest-axe

# Install browser binaries
npx playwright install chromium
```

### Configuration

Browser tests use Angular's Vitest integration. No separate `playwright.config.ts` needed — configuration lives in `angular.json` or `vitest.config.ts`.

The `--browsers` flag switches Vitest from jsdom to real browser:

```json
// angular.json (test target options)
{
  "test": {
    "builder": "@angular/build:unit-test",
    "options": {
      "browsers": ["chromium"]
    }
  }
}
```

### Run tests

```bash
# Real browser (headed, development)
ng test --browsers=chromium

# Real browser (headless, CI)
ng test --browsers=chromiumHeadless --no-watch

# Run specific browser test file
ng test --browsers=chromium --include=**/select*.browser.spec.ts

# Default jsdom (fast, unit tests only)
ng test
```

### What browser tests cover

- Real keyboard navigation (ArrowDown, ArrowUp, Home, End, Enter, Escape, Tab)
- Dialog open/close with real focus management
- Real browser focus trapping in `<dialog>`
- AXE accessibility scans on live DOM
- Visual regression screenshots across themes
- Cross-component interactions in test hosts

### What browser tests do NOT cover

- Internal component logic (that's jsdom unit tests)
- ControlValueAccessor contract details (that's unit tests)
- Harness API correctness (that's unit tests)

### Why Vitest Browser Mode (not standalone Playwright)

Angular's official testing guide recommends `@vitest/browser-playwright` over standalone `@playwright/test` for these reasons:

1. **Unified test infrastructure** — Same Vitest runner, assertions, and config for both jsdom and browser tests
2. **Shared test code** — CDK harnesses work identically in both environments via `TestbedHarnessEnvironment`
3. **Angular CLI integration** — `ng test --browsers=chromium` just works, no separate webServer config
4. **Consistent DX** — Same `describe/it/expect` API, same watch mode, same coverage tooling

---

### Test Host Architecture

Browser tests use test host components (same as unit tests). The difference is they run in a real browser via `--browsers=chromium`.

```ts
// select-keyboard.browser.spec.ts
import { TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComSelectHarness } from 'ngx-com/components/select/testing';

@Component({
  template: `
    <com-select
      [value]="value()"
      (valueChange)="value.set($event)"
      placeholder="Pick a fruit">
      @for (item of items; track item) {
        <com-select-option [value]="item" [label]="item">
          {{ item }}
        </com-select-option>
      }
    </com-select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestSelectKeyboard {
  value = signal<string | null>(null);
  items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
}

describe('ComSelect Keyboard Navigation', () => {
  let harness: ComSelectHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestSelectKeyboard, ComSelect, ComSelectOption],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestSelectKeyboard);
    const loader = TestbedHarnessEnvironment.loader(fixture);
    harness = await loader.getHarness(ComSelectHarness);
  });

  it('opens on Enter key', async () => {
    // In real browser, keyboard events work correctly
    await harness.focus();
    await harness.sendKeys('Enter');
    expect(await harness.isOpen()).toBe(true);
  });
});
```

### Test Host Variants

Each browser spec file contains its own test host component(s) tailored to the scenarios being tested:

| Spec File | Test Host(s) | Scenarios |
|-----------|--------------|-----------|
| `select-keyboard.browser.spec.ts` | `TestSelectKeyboard`, `TestSelectKeyboardDisabled` | All keyboard navigation |
| `select-dialog.browser.spec.ts` | `TestSelectDialog`, `TestSelectSearchable` | Focus management, backdrop |
| `select-interactions.browser.spec.ts` | Multiple hosts per scenario | Selection, clear, search, dynamic |
| `select-a11y.browser.spec.ts` | `TestSelectA11y` | AXE scans, ARIA checks |
| `select-visual.browser.spec.ts` | `TestSelectTheme` | Screenshot comparisons |

### Locator Strategy

Browser tests use the **same CDK harnesses** as unit tests. The harness abstracts DOM queries:

```ts
// Harness handles all locators internally
const select = await loader.getHarness(ComSelectHarness);

// No need for raw Playwright locators — harness methods work in real browser
await select.open();
await select.selectOption({ label: 'Banana' });
expect(await select.getValueText()).toBe('Banana');

// For elements outside harness scope, use fixture.nativeElement
const currentValue = fixture.nativeElement.querySelector('[data-testid="current-value"]');
expect(currentValue.textContent).toBe('Banana');
```

---

### Browser Test Suites

#### Suite B1 — Keyboard Navigation

**File:** `src/app/test/select/select-keyboard.browser.spec.ts`

| Test | Test Host | Description |
|------|-----------|-------------|
| opens on Enter | `TestSelectKeyboard` | Focus trigger, Enter → dialog visible |
| opens on ArrowDown | `TestSelectKeyboard` | Focus trigger, ArrowDown → dialog visible |
| opens on Space | `TestSelectKeyboard` | Focus trigger, Space → dialog visible |
| ArrowDown moves to next option | `TestSelectKeyboard` | ArrowDown → next option highlighted |
| ArrowUp moves to previous option | `TestSelectKeyboard` | ArrowUp → previous option highlighted |
| Home moves to first option | `TestSelectKeyboard` | Home → first option active |
| End moves to last option | `TestSelectKeyboard` | End → last option active |
| ArrowDown skips disabled options | `TestSelectKeyboardDisabled` | Disabled in path → skips |
| Enter selects active and closes | `TestSelectKeyboard` | Navigate + Enter → value set, dialog closed |
| Escape closes without selecting | `TestSelectKeyboard` | Navigate + Escape → no change, closed |
| Tab closes dialog | `TestSelectKeyboard` | Tab → dialog closed |
| focus returns to trigger on close | `TestSelectKeyboard` | Close → trigger has focus |
| keyboard works in search mode | `TestSelectSearchable` | Type, ArrowDown, Enter → selects filtered option |

#### Suite B2 — Dialog & Focus Management

**File:** `src/app/test/select/select-dialog.browser.spec.ts`

| Test | Test Host | Description |
|------|-----------|-------------|
| click trigger opens dialog | `TestSelectBasic` | Click → dialog visible |
| click backdrop closes dialog | `TestSelectBasic` | Click outside → dialog hidden |
| selecting closes dialog | `TestSelectBasic` | Click option → closed |
| focus trapped inside dialog | `TestSelectBasic` | Tab cycles within dialog |
| focus moves to search on open | `TestSelectSearchable` | Open → search input focused |
| does not open when disabled | `TestSelectDisabled` | Click → stays closed |

#### Suite B3 — Real Browser Interactions

**File:** `src/app/test/select/select-interactions.browser.spec.ts`

| Test | Test Host | Description |
|------|-----------|-------------|
| selects option and updates binding | `TestSelectBasic` | Click option → signal updates |
| clear button resets value | `TestSelectClearable` | Select, clear → value reset |
| search filters live options | `TestSelectSearchable` | Type "ban" → only matching options visible |
| search resets on reopen | `TestSelectSearchable` | Search, close, reopen → all options visible |
| server search shows loading | `TestSelectServerSearch` | Type → loading indicator → results appear |
| dynamic options update list | `TestSelectDynamic` | Add button → new option in list |
| empty options shows empty state | `TestSelectEmpty` | Open → no-results state, no crash |
| long labels don't break layout | `TestSelectLongLabels` | Open → options render within bounds |
| reactive form validation visible | `TestSelectReactiveForm` | Open+close without selecting → invalid styling |

#### Suite B4 — Accessibility (AXE)

**File:** `src/app/test/select/select-a11y.browser.spec.ts`

Uses `vitest-axe` for automated scans.

| Test | Test Host | Description |
|------|-----------|-------------|
| trigger passes AXE scan | `TestSelectBasic` | Closed state → no violations |
| open dialog passes AXE scan | `TestSelectBasic` | Open → no violations |
| searchable dialog passes AXE scan | `TestSelectSearchable` | Open searchable → no violations |
| trigger has role=combobox | `TestSelectBasic` | ARIA role check |
| aria-expanded toggles | `TestSelectBasic` | Closed: false, open: true |
| options have role=option | `TestSelectBasic` | Each option role verified |
| selected has aria-selected=true | `TestSelectBasic` | After select → attribute set |
| disabled has aria-disabled=true | `TestSelectDisabled` | Disabled option → attribute set |

#### Suite B5 — Visual Regression & Theming

**File:** `src/app/test/select/select-visual.browser.spec.ts`

Uses Vitest's `toMatchImageSnapshot()` or `@vitest/browser/context` for visual comparison.

| Test | Test Host | Description |
|------|-----------|-------------|
| closed trigger — light theme | `TestSelectTheme` | Screenshot match |
| open dialog — light theme | `TestSelectTheme` | Screenshot match |
| closed trigger — dark theme | `TestSelectTheme` | Toggle dark → screenshot |
| open dialog — dark theme | `TestSelectTheme` | Toggle dark, open → screenshot |
| closed trigger — forest theme | `TestSelectTheme` | Toggle forest → screenshot |
| open dialog — forest theme | `TestSelectTheme` | Toggle forest, open → screenshot |
| invalid state — all themes | `TestSelectTheme` | Invalid + touched → warn border in each |

---

### Browser Test File Structure

```
src/app/test/select/
├── select-keyboard.browser.spec.ts    ← Suite B1 (keyboard navigation)
├── select-dialog.browser.spec.ts      ← Suite B2 (focus management)
├── select-interactions.browser.spec.ts ← Suite B3 (real interactions)
├── select-a11y.browser.spec.ts        ← Suite B4 (AXE scans)
├── select-visual.browser.spec.ts      ← Suite B5 (screenshots)
└── __snapshots__/                     ← Visual regression baselines
    └── select-visual.browser.spec.ts/
        ├── closed-trigger-light.png
        ├── open-dialog-light.png
        └── ...
```

**Note:** Test host components are defined inline within each `.browser.spec.ts` file. No separate route pages needed — Vitest browser mode renders components directly via TestBed.

---

## Implementation Phases

---

### Phase 1 — Harness + Library Unit Tests (Core)

**Goal:** Build CDK harness and core unit tests.

**Scope:**
1. Create `ComSelectHarness`, `ComSelectOptionHarness`, filter interfaces
2. Export from `ngx-com/components/select/testing`
3. Write `select.spec.ts` — Suites U1 (defaults), U2 (open/select), U5 (disabled/clear)
4. Write `select-variants.spec.ts` — Suite U8 (sizes, CVA variants)

**Claude Code Prompt:**
```
Read SELECT_PLAN.md, SELECT_TEST_PLAN.md, and CLAUDE.md. Implement Phase 1 of com-select tests.

Build CDK Component Test Harnesses following Angular Material's pattern:
1. Create ComSelectHarness extending ComponentHarness at ngx-com/components/select/testing/
   - hostSelector = 'com-select'
   - Static with() method returning HarnessPredicate
   - Methods: open(), close(), isOpen(), isDisabled(), isRequired(), getValueText(),
     getPlaceholder(), selectOption(filter), getOptions(filter), getSelectedOption(),
     isSearchable(), enterSearchQuery(), getSearchQuery(), clearSearch(),
     isClearable(), clear(), isValid(), isTouched(), isDirty()
   - Use documentRootLocatorFactory() for dialog elements
2. Create ComSelectOptionHarness extending ComponentHarness
   - hostSelector = '[ngOption]'
   - Methods: getLabel(), getValue(), isSelected(), isActive(), isDisabled(), click()
3. Create filter interfaces and export from testing/index.ts
4. Write select.spec.ts — Suites U1, U2, U5
5. Write select-variants.spec.ts — Suite U8

All tests use TestbedHarnessEnvironment.
Use documentRootLoader for dialog/option assertions.
Follow CLAUDE.md rules. Track in Project #3.
```

---

### Phase 2 — Library Unit Tests (Forms + Search + Templates)

**Goal:** Complete library unit test coverage.

**Depends on:** Phase 1 complete.

**Scope:**
1. Write `select-cva.spec.ts` — Suites U3 (CVA), U4 (compareWith/displayWith)
2. Write `select-search.spec.ts` — Suite U6
3. Write `select-templates.spec.ts` — Suite U7

**Claude Code Prompt:**
```
Read SELECT_PLAN.md, SELECT_TEST_PLAN.md, and CLAUDE.md. Implement Phase 2 of com-select tests.

Phase 1 complete — harness and core unit tests passing.

Now add remaining library unit tests:
1. Write select-cva.spec.ts — Suite U3 (reactive forms, template-driven, touched/dirty/valid)
   + Suite U4 (compareWith, displayWith)
2. Write select-search.spec.ts — Suite U6 (local search, custom predicate, searchChange, loading)
3. Write select-templates.spec.ts — Suite U7 (all 6 template slots, context objects)

All tests use TestbedHarnessEnvironment + ComSelectHarness.
Follow CLAUDE.md rules. Track in Project #3.
```

---

### Phase 3 — Browser Tests Infrastructure + Keyboard & Dialog Tests

**Goal:** Set up Vitest browser mode with Playwright, write core browser tests.

**Depends on:** Component implementation functional.

**Scope:**
1. Install `@vitest/browser-playwright`, `playwright`, `vitest-axe`
2. Verify `ng test --browsers=chromium` works
3. Write `select-keyboard.browser.spec.ts` — Suite B1
4. Write `select-dialog.browser.spec.ts` — Suite B2

**Claude Code Prompt:**
```
Read SELECT_PLAN.md, SELECT_TEST_PLAN.md, and CLAUDE.md. Implement Phase 3 of com-select tests.

Phase 1-2 complete — all library unit tests passing.

Now set up Vitest browser mode for real browser testing:
1. Install @vitest/browser-playwright, playwright, vitest-axe
2. Run npx playwright install chromium
3. Verify ng test --browsers=chromium runs successfully
4. Write select-keyboard.browser.spec.ts — Suite B1
   - Test hosts: TestSelectKeyboard, TestSelectKeyboardDisabled, TestSelectSearchable
   - Use ComSelectHarness with sendKeys() for keyboard events
   - All 13 keyboard navigation tests
5. Write select-dialog.browser.spec.ts — Suite B2
   - Test hosts: TestSelectBasic, TestSelectSearchable, TestSelectDisabled
   - Focus management, backdrop clicks, focus trapping

All tests use TestbedHarnessEnvironment + ComSelectHarness (same as unit tests).
Browser tests run via: ng test --browsers=chromium
Follow CLAUDE.md rules. Track in Project #3.
```

---

### Phase 4 — Browser Interactions + Accessibility

**Goal:** Browser interaction tests and AXE audits.

**Depends on:** Phase 3 complete.

**Scope:**
1. Write `select-interactions.browser.spec.ts` — Suite B3
2. Write `select-a11y.browser.spec.ts` — Suite B4

**Claude Code Prompt:**
```
Read SELECT_PLAN.md, SELECT_TEST_PLAN.md, and CLAUDE.md. Implement Phase 4 of com-select browser tests.

Phase 3 complete — Vitest browser mode setup, keyboard + dialog tests passing.

Now add:
1. Write select-interactions.browser.spec.ts — Suite B3
   - Test hosts for each scenario: TestSelectBasic, TestSelectClearable,
     TestSelectSearchable, TestSelectServerSearch, TestSelectDynamic,
     TestSelectEmpty, TestSelectLongLabels, TestSelectReactiveForm
   - All 9 interaction tests using ComSelectHarness
2. Write select-a11y.browser.spec.ts — Suite B4
   - Use vitest-axe for AXE scans
   - Test hosts: TestSelectBasic, TestSelectSearchable, TestSelectDisabled
   - AXE scans: trigger closed, dialog open, searchable open
   - Manual ARIA checks via fixture.nativeElement queries

Run via: ng test --browsers=chromium
Follow CLAUDE.md rules. Track in Project #3.
```

---

### Phase 5 — Visual Regression & Theming

**Goal:** Screenshot tests across all themes.

**Depends on:** Phase 4 complete.

**Scope:**
1. Write `select-visual.browser.spec.ts` — Suite B5
2. Generate baseline screenshots
3. Verify all tests pass in CI mode

**Claude Code Prompt:**
```
Read SELECT_PLAN.md, SELECT_TEST_PLAN.md, and CLAUDE.md. Implement Phase 5 of com-select browser tests.

Phase 1-4 complete — all unit + browser tests passing.

Now finalize with visual regression:
1. Write select-visual.browser.spec.ts — Suite B5
   - Test host: TestSelectTheme with data-theme toggle (light/dark/forest)
     + invalid state variant (required, touched, no value)
   - Use Vitest's toMatchImageSnapshot() or @vitest/browser/context
   - Screenshots: closed trigger + open dialog × 3 themes
   - Invalid state screenshot per theme
2. Run ng test --browsers=chromium --update-snapshots to generate baselines
3. Verify full suite:
   - ng test (jsdom unit tests)
   - ng test --browsers=chromiumHeadless --no-watch (browser tests)

Follow CLAUDE.md rules. Track in Project #3.
```
