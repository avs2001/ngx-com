# `[component-name]` — Testing Plan

## Summary

[Brief description of testing layers and scope]

| Layer | Where | Runner | What it tests |
|-------|-------|--------|---------------|
| **Unit** | Library | [Runner] | Component logic, API, state |
| **Browser** | App | [Runner + Browser] | Keyboard, a11y, visual |

---

## Part 1 — Unit Tests

### Stack

- **Runner:** [Vitest/Jest/etc.]
- **DOM:** [jsdom/happy-dom]
- **Harness:** [CDK harness / Testing Library / custom]
- **Location:** `[path]/*.spec.ts`

### Setup

```bash
# Run unit tests
[test command]

# Watch mode
[test command --watch]
```

---

### Component Harness: `[ComponentName]Harness`

Ships at `[path]/testing`. Used in unit tests AND available for consumers.

```ts
export class [ComponentName]Harness extends ComponentHarness {
  static hostSelector = '[selector]';

  static with(options: HarnessFilters = {}): HarnessPredicate<[ComponentName]Harness> {
    // Filter options
  }

  // --- Core Methods ---
  async getValue(): Promise<T>;
  async setValue(value: T): Promise<void>;
  async isDisabled(): Promise<boolean>;
  // ... other methods mapping to component behaviors
}
```

---

### Unit Test Suites

#### Suite U1 — Component Creation & Defaults

**File:** `[component].spec.ts`

| Test | Description |
|------|-------------|
| creates component | Component instantiates without errors |
| [input] defaults to [value] | Default value verified |
| ... | ... |

#### Suite U2 — [Behavior Category]

**File:** `[component].spec.ts`

| Test | Description |
|------|-------------|
| [action] does [result] | Behavior description |
| ... | ... |

#### Suite U3 — Forms Integration

**File:** `[component]-cva.spec.ts`

| Test | Description |
|------|-------------|
| syncs value to formControl | Selection updates form |
| reflects formControl value | Form updates display |
| touched after blur | Touched state tracked |
| dirty after change | Dirty state tracked |
| valid/invalid states | Validation reflected |
| ... | ... |

#### Suite U4 — [Additional Behavior]

**File:** `[component]-[concern].spec.ts`

| Test | Description |
|------|-------------|
| ... | ... |

---

### Unit Test Usage Pattern

```ts
import { TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { [ComponentName]Harness } from '[path]/testing';

describe('[ComponentName]', () => {
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestHostComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should [behavior]', async () => {
    const harness = await loader.getHarness([ComponentName]Harness);
    // Test implementation
  });
});
```

---

## Part 2 — Browser Tests

### Stack

- **Runner:** [Vitest browser mode / Playwright / Cypress]
- **Browser:** [Chromium/Firefox/etc.]
- **A11y:** [axe-core / vitest-axe]
- **Location:** `[path]/*.browser.spec.ts`

### Setup

```bash
# Run browser tests
[browser test command]

# Headed mode
[browser test command --headed]
```

---

### Browser Test Suites

#### Suite B1 — Keyboard Navigation

**File:** `[component]-keyboard.browser.spec.ts`

| Test | Description |
|------|-------------|
| [key] does [action] | Keyboard behavior |
| ... | ... |

#### Suite B2 — Accessibility

**File:** `[component]-a11y.browser.spec.ts`

| Test | Description |
|------|-------------|
| passes AXE scan | No violations |
| has correct ARIA | Roles/attributes correct |
| ... | ... |

#### Suite B3 — Visual Regression

**File:** `[component]-visual.browser.spec.ts`

| Test | Description |
|------|-------------|
| [state] — [theme] | Screenshot match |
| ... | ... |

---

## Implementation Phases

### Phase 1 — Harness + Core Unit Tests

**Goal:** Build test harness and core tests.

**Scope:**
1. Create harness classes
2. Export from testing barrel
3. Write Suites U1, U2

**Prompt:**
```
Read [IMPL_PLAN] and [TEST_PLAN]. Implement Phase 1 tests.
[Detailed instructions]
```

---

### Phase 2 — Forms + [Feature] Tests

**Goal:** Complete unit test coverage.

**Depends on:** Phase 1 complete.

**Scope:**
1. Write Suite U3 (forms)
2. Write Suite U4 ([feature])

**Prompt:**
```
Read [IMPL_PLAN] and [TEST_PLAN]. Implement Phase 2 tests.
Phase 1 complete — harness and core tests passing.
[Detailed instructions]
```

---

### Phase 3 — Browser Tests

**Goal:** Browser-based testing.

**Depends on:** Component implementation functional.

**Scope:**
1. Set up browser test runner
2. Write Suites B1, B2, B3

**Prompt:**
```
Read [IMPL_PLAN] and [TEST_PLAN]. Implement Phase 3 browser tests.
Phase 1-2 complete — all unit tests passing.
[Detailed instructions]
```
