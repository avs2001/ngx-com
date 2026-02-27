---
name: tdd
description: Generate comprehensive test plans from implementation plans following Test-Driven Development. Use when creating tests for a new feature, component, or module based on an existing implementation plan or design document.
argument-hint: [implementation-plan-path]
---

# Test-Driven Development (TDD) Skill

Generate a comprehensive test plan from an implementation plan, then implement tests phase-by-phase.

## Input Requirements

You need an **implementation plan** that describes:
- Component/feature API (inputs, outputs, methods)
- Architecture and dependencies
- Implementation phases with scope

If `$ARGUMENTS` is provided, read that file as the implementation plan.
If no argument, ask the user for the implementation plan location.

## Workflow

### Step 1: Analyze the Implementation Plan

Read the implementation plan and extract:

1. **Public API Surface**
   - Inputs/props with types and defaults
   - Outputs/events with payloads
   - Public methods
   - Template slots/projections

2. **Behaviors to Test**
   - Default states
   - User interactions
   - State transitions
   - Edge cases
   - Error conditions

3. **Integration Points**
   - Form integration (CVA, validation)
   - Accessibility requirements
   - Dependencies

4. **Implementation Phases**
   - What features exist in each phase
   - Dependencies between phases

### Step 2: Design Test Architecture

Based on the codebase conventions, determine:

1. **Testing Stack**
   - Unit test runner (Vitest, Jest, etc.)
   - Browser test runner if needed
   - Test utilities (harnesses, testing library)

2. **Test File Structure**
   - Where test files live
   - Naming conventions
   - File organization by concern

3. **Test Harness Design** (if applicable)
   - Harness class structure
   - Methods mapping to component API
   - Filter interfaces

### Step 3: Generate Test Plan Document

Create a `*_TEST_PLAN.md` file in the same location as the implementation plan with:

```markdown
# [Component] — Testing Plan

## Summary
[Testing layers, tools, and scope]

## Test Stack
[Runner, DOM environment, utilities]

## Test Harness (if applicable)
[Harness API design]

## Unit Test Suites
[Organized by concern with test tables]

## Browser Test Suites (if applicable)
[Keyboard, a11y, visual regression]

## Implementation Phases
[Phased test implementation matching feature phases]
```

### Step 4: Implement Tests Phase-by-Phase

For each implementation phase:

1. **Create Test Harness** (Phase 1 typically)
   - Implement harness class with all methods
   - Export from testing barrel

2. **Write Test Suites**
   - Create test host components
   - Write describe/it blocks
   - Use harness methods for assertions

3. **Handle Unimplemented Features**
   - Skip tests for features not yet implemented
   - Add TODO comments documenting expected behavior
   - Tests should compile but may fail/skip

4. **Verify Tests Run**
   - Run test command
   - Fix compilation errors
   - Report pass/fail/skip counts

## Test Suite Organization

### Unit Tests (Fast, jsdom)
Organize by concern:

| Suite | File | Tests |
|-------|------|-------|
| Defaults | `component.spec.ts` | Creation, default values |
| API | `component.spec.ts` | Public methods, inputs |
| Forms | `component-cva.spec.ts` | CVA, validation, touched/dirty |
| Search | `component-search.spec.ts` | Filtering, predicates |
| Templates | `component-templates.spec.ts` | Custom templates |
| Variants | `component-variants.spec.ts` | Sizes, themes |

### Browser Tests (Real browser)
Organize by capability:

| Suite | File | Tests |
|-------|------|-------|
| Keyboard | `*-keyboard.browser.spec.ts` | Navigation, shortcuts |
| Focus | `*-dialog.browser.spec.ts` | Focus management |
| Interactions | `*-interactions.browser.spec.ts` | Real user flows |
| Accessibility | `*-a11y.browser.spec.ts` | AXE scans, ARIA |
| Visual | `*-visual.browser.spec.ts` | Screenshots |

## Test Host Pattern

```typescript
@Component({
  template: `
    <my-component
      [input]="inputValue()"
      (output)="onOutput($event)"
    >
      <!-- projected content -->
    </my-component>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MyComponent],
})
class TestHostComponent {
  inputValue = signal<Type>(defaultValue);
  outputSpy = vi.fn();

  onOutput(event: unknown): void {
    this.outputSpy(event);
  }
}
```

## Harness Pattern

```typescript
export class MyComponentHarness extends ComponentHarness {
  static hostSelector = 'my-component';

  static with(options: HarnessFilters = {}): HarnessPredicate<MyComponentHarness> {
    return new HarnessPredicate(MyComponentHarness, options)
      .addOption('value', options.value, async (harness, value) =>
        (await harness.getValue()) === value
      );
  }

  // Methods map 1:1 to component behaviors
  async getValue(): Promise<string> { /* ... */ }
  async isDisabled(): Promise<boolean> { /* ... */ }
  async click(): Promise<void> { /* ... */ }
}
```

## TDD Rules

1. **Tests Document Expected Behavior**
   - Write tests before implementation
   - Tests define the contract

2. **Skip Unimplemented Features**
   - Use `it.skip()` for features not yet built
   - Add TODO comments with expected behavior

3. **Tests Must Compile**
   - Even skipped tests should be valid TypeScript
   - Fix type errors immediately

4. **Phase Alignment**
   - Test phases match implementation phases
   - Each phase is independently testable

5. **No Test Pollution**
   - Each test is isolated
   - No shared mutable state
   - Clean up after async operations

## Output

After generating the test plan, ask the user which phase to implement:

> Test plan created at `plans/COMPONENT_TEST_PLAN.md`
>
> Implementation phases:
> 1. Phase 1 — Harness + Core Tests (Suites X, Y)
> 2. Phase 2 — Forms + Search Tests (Suites Z)
> 3. Phase 3 — Browser Tests
>
> Which phase should I implement?

Then implement that phase following the test plan.
