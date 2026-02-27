# Example: Angular Component TDD

This example shows how the TDD skill was used to create tests for `com-select`.

## Input: Implementation Plan

The implementation plan (`SELECT_PLAN.md`) defined:

```markdown
## API Surface

### Inputs
- value: T | null
- placeholder: string
- disabled: boolean
- required: boolean
- compareWith: (a: T, b: T) => boolean
- displayWith: (value: T) => string
- searchable: boolean
- searchPredicate: (option: T, query: string) => boolean
- loading: boolean
- clearable: boolean
- size: 'sm' | 'md' | 'lg'

### Outputs
- valueChange: T | null
- opened: void
- closed: void
- searchChange: string
- cleared: void

### Implementation Phases
1. Phase 1 — Core Select + CVA
2. Phase 2 — Search & Async
3. Phase 3 — Templates & Customization
4. Phase 4 — Polish & Integration
```

## Output: Test Plan

The TDD skill generated `SELECT_TEST_PLAN.md` with:

### Test Architecture Decision

```
Unit Tests (Vitest + jsdom)
├── Component Harness (ComSelectHarness)
├── Suite U1-U8 organized by concern
└── Test host components for each scenario

Browser Tests (Vitest + Playwright)
├── Same harness, real browser
├── Suite B1-B5 for keyboard, a11y, visual
└── Test host components inline
```

### Harness Design

```typescript
export class ComSelectHarness extends ComponentHarness {
  static hostSelector = 'com-select';

  // Trigger methods
  async open(): Promise<void>;
  async close(): Promise<void>;
  async isOpen(): Promise<boolean>;

  // Value methods
  async getValueText(): Promise<string>;
  async selectOption(filter: OptionHarnessFilters): Promise<void>;

  // State methods
  async isDisabled(): Promise<boolean>;
  async isValid(): Promise<boolean>;
  async isTouched(): Promise<boolean>;
}
```

### Test Suites Mapped to Features

| Suite | Concern | Tests for Phase |
|-------|---------|-----------------|
| U1 | Defaults | Phase 1 |
| U2 | Open/Select | Phase 1 |
| U3 | CVA Forms | Phase 1 |
| U4 | compareWith/displayWith | Phase 1-2 |
| U5 | Disabled/Clear | Phase 1 |
| U6 | Search | Phase 2 |
| U7 | Templates | Phase 3 |
| U8 | Variants | Phase 1 |

### Phase Implementation

**Phase 1 Implementation:**
```
1. Create testing/ directory
2. Implement ComSelectHarness
3. Implement ComSelectOptionHarness
4. Write select.spec.ts (U1, U2, U5)
5. Write select-variants.spec.ts (U8)
```

**Phase 2 Implementation:**
```
1. Write select-cva.spec.ts (U3, U4)
2. Write select-search.spec.ts (U6) — skipped until feature exists
3. Write select-templates.spec.ts (U7) — skipped until feature exists
```

## TDD Learnings Applied

### 1. Tests Before Features
Tests for search and templates were written with `it.skip()` since features don't exist:

```typescript
describe('Suite U6 — Search', () => {
  it.skip('isSearchable true when configured', () => {
    // Will be implemented when searchable input added
  });
});
```

### 2. Compilation Required
Even skipped tests must compile. When a feature doesn't exist, we can't reference it in templates:

```typescript
// BAD - won't compile if [searchable] input doesn't exist
template: `<com-select [searchable]="true">`

// GOOD - skip the entire test, document expected behavior
it.skip('searchable filters options', () => {
  // Expected: [searchable]="true" shows search input
});
```

### 3. Phase Dependencies
Test phases align with implementation phases:

```
Implementation Phase 1 → Test Phase 1 (core tests)
Implementation Phase 2 → Unskip search tests
Implementation Phase 3 → Unskip template tests
```

### 4. Harness as Contract
The harness defines the testing contract before implementation:

```typescript
// Harness method defined
async isSearchable(): Promise<boolean>;

// Component must implement behavior to make test pass
// This drives the implementation
```

## File Structure Result

```
projects/com/components/select/
├── testing/
│   ├── select-harness.ts
│   ├── select-option-harness.ts
│   ├── select-harness-filters.ts
│   └── index.ts
├── select.spec.ts              ← U1, U2, U5
├── select-cva.spec.ts          ← U3, U4
├── select-search.spec.ts       ← U6 (skipped)
├── select-templates.spec.ts    ← U7 (skipped)
├── select-variants.spec.ts     ← U8
└── [component files]
```
