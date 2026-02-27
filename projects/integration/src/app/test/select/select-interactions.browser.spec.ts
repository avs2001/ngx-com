/**
 * Suite B3 — Real Browser Interactions for ComSelect
 *
 * Tests real user interaction scenarios in a real browser environment.
 * Run via: ng test integration --browsers=chromium
 *
 * @see SELECT_TEST_PLAN.md Phase 4
 */
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import type { HarnessLoader } from '@angular/cdk/testing';
import { ComSelect, ComSelectOption } from 'ngx-com/components/select';
import { ComSelectHarness } from 'ngx-com/components/select/testing';

// ─────────────────────────────────────────────────────────────────────────────
// Test Host Components
// ─────────────────────────────────────────────────────────────────────────────

@Component({
  template: `
    <com-select
      [(ngModel)]="value"
      placeholder="Select a fruit"
    >
      @for (item of items; track item) {
        <com-select-option [value]="item">{{ item }}</com-select-option>
      }
    </com-select>
    <span data-testid="current-value">{{ value }}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComSelect, ComSelectOption, FormsModule],
})
class TestSelectBasic {
  value: string | null = null;
  items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
}

@Component({
  template: `
    <com-select
      [(ngModel)]="value"
      placeholder="Select a fruit"
    >
      @for (item of items; track item) {
        <com-select-option [value]="item">{{ item }}</com-select-option>
      }
    </com-select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComSelect, ComSelectOption, FormsModule],
})
class TestSelectClearable {
  value: string | null = null;
  items = ['Apple', 'Banana', 'Cherry'];
  // Note: clearable feature requires [clearable]="true" input once implemented
}

@Component({
  template: `
    <com-select
      [(ngModel)]="value"
      placeholder="Search fruits..."
    >
      @for (item of items; track item) {
        <com-select-option [value]="item">{{ item }}</com-select-option>
      }
    </com-select>
    <span data-testid="current-value">{{ value }}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComSelect, ComSelectOption, FormsModule],
})
class TestSelectSearchable {
  value: string | null = null;
  items = ['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cherry', 'Coconut'];
  // Note: searchable feature requires [searchable]="true" input once implemented
}

@Component({
  template: `
    <com-select
      [(ngModel)]="value"
      placeholder="Search..."
    >
      @for (item of results(); track item) {
        <com-select-option [value]="item">{{ item }}</com-select-option>
      }
    </com-select>
    <span data-testid="loading-state">{{ loading() }}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComSelect, ComSelectOption, FormsModule],
})
class TestSelectServerSearch {
  value: string | null = null;
  loading = signal(false);
  results = signal<string[]>(['Apple', 'Banana', 'Cherry']);

  // Simulate server search
  search(query: string): void {
    this.loading.set(true);
    setTimeout(() => {
      const allItems = ['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cherry', 'Coconut'];
      this.results.set(
        allItems.filter(item => item.toLowerCase().includes(query.toLowerCase()))
      );
      this.loading.set(false);
    }, 100);
  }
}

@Component({
  template: `
    <com-select
      [(ngModel)]="value"
      placeholder="Select item..."
    >
      @for (item of items(); track item) {
        <com-select-option [value]="item">{{ item }}</com-select-option>
      }
    </com-select>
    <button type="button" data-testid="add-button" (click)="addItem()">Add Item</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComSelect, ComSelectOption, FormsModule],
})
class TestSelectDynamic {
  value: string | null = null;
  items = signal<string[]>(['Item 1', 'Item 2', 'Item 3']);

  addItem(): void {
    this.items.update(current => [...current, `Item ${current.length + 1}`]);
  }
}

@Component({
  template: `
    <com-select
      [(ngModel)]="value"
      placeholder="Select item..."
    >
      @for (item of items; track item) {
        <com-select-option [value]="item">{{ item }}</com-select-option>
      }
    </com-select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComSelect, ComSelectOption, FormsModule],
})
class TestSelectEmpty {
  value: string | null = null;
  items: string[] = [];
}

@Component({
  template: `
    <com-select
      [(ngModel)]="value"
      placeholder="Select item..."
      class="w-48"
    >
      @for (item of items; track item) {
        <com-select-option [value]="item">{{ item }}</com-select-option>
      }
    </com-select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComSelect, ComSelectOption, FormsModule],
})
class TestSelectLongLabels {
  value: string | null = null;
  items = [
    'This is a very long option label that should be truncated',
    'Another extremely long label that exceeds the container width',
    'Short',
    'Medium length option',
  ];
}

@Component({
  template: `
    <form [formGroup]="form">
      <com-select
        formControlName="fruit"
        placeholder="Select a fruit (required)"
      >
        @for (item of items; track item) {
          <com-select-option [value]="item">{{ item }}</com-select-option>
        }
      </com-select>
    </form>
    <span data-testid="form-valid">{{ form.valid }}</span>
    <span data-testid="form-touched">{{ form.controls.fruit.touched }}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComSelect, ComSelectOption, ReactiveFormsModule],
})
class TestSelectReactiveForm {
  items = ['Apple', 'Banana', 'Cherry'];
  form = new FormGroup({
    fruit: new FormControl<string | null>(null, Validators.required),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Suite B3 — Real Browser Interactions
// ─────────────────────────────────────────────────────────────────────────────

describe('ComSelect - Suite B3: Real Browser Interactions', () => {
  describe('Basic Selection', () => {
    let fixture: ComponentFixture<TestSelectBasic>;
    let loader: HarnessLoader;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestSelectBasic],
      }).compileComponents();

      fixture = TestBed.createComponent(TestSelectBasic);
      fixture.detectChanges();
      await fixture.whenStable();
      loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it('selects option and updates binding', async () => {
      const select = await loader.getHarness(ComSelectHarness);

      // Select an option
      await select.selectOption({ label: 'Banana' });
      fixture.detectChanges();
      await fixture.whenStable();

      // Verify the model was updated
      expect(fixture.componentInstance.value).toBe('Banana');

      // Verify the display text
      expect(await select.getValueText()).toBe('Banana');

      // Verify via DOM
      fixture.detectChanges();
      const currentValueEl = fixture.nativeElement.querySelector('[data-testid="current-value"]');
      expect(currentValueEl?.textContent?.trim()).toBe('Banana');
    });
  });

  describe('Clearable', () => {
    let fixture: ComponentFixture<TestSelectClearable>;
    let loader: HarnessLoader;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestSelectClearable],
      }).compileComponents();

      fixture = TestBed.createComponent(TestSelectClearable);
      fixture.detectChanges();
      await fixture.whenStable();
      loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it.skip('clear button resets value', async () => {
      // TODO: Enable once clearable input is implemented
      // const select = await loader.getHarness(ComSelectHarness);
      //
      // // Select an option first
      // await select.selectOption({ label: 'Apple' });
      // expect(fixture.componentInstance.value).toBe('Apple');
      //
      // // Clear the selection
      // await select.clear();
      //
      // // Verify value is reset
      // expect(fixture.componentInstance.value).toBeNull();
      // expect(await select.getPlaceholder()).toBe('Select a fruit');
    });
  });

  describe('Searchable', () => {
    let fixture: ComponentFixture<TestSelectSearchable>;
    let loader: HarnessLoader;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestSelectSearchable],
      }).compileComponents();

      fixture = TestBed.createComponent(TestSelectSearchable);
      fixture.detectChanges();
      await fixture.whenStable();
      loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it.skip('search filters live options', async () => {
      // TODO: Enable once searchable input is implemented
      // const select = await loader.getHarness(ComSelectHarness);
      //
      // await select.open();
      //
      // // Initially all options visible
      // let options = await select.getOptions();
      // expect(options.length).toBe(6);
      //
      // // Type search query
      // await select.enterSearchQuery('ban');
      //
      // // Only matching options visible
      // options = await select.getOptions();
      // expect(options.length).toBe(1);
      // expect(await options[0]?.getLabel()).toBe('Banana');
    });

    it.skip('search resets on reopen', async () => {
      // TODO: Enable once searchable input is implemented
      // const select = await loader.getHarness(ComSelectHarness);
      //
      // await select.open();
      // await select.enterSearchQuery('apple');
      //
      // // Close and reopen
      // await select.close();
      // await select.open();
      //
      // // Search should be reset, all options visible
      // const options = await select.getOptions();
      // expect(options.length).toBe(6);
      // expect(await select.getSearchQuery()).toBe('');
    });
  });

  describe('Server Search', () => {
    let fixture: ComponentFixture<TestSelectServerSearch>;
    let loader: HarnessLoader;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestSelectServerSearch],
      }).compileComponents();

      fixture = TestBed.createComponent(TestSelectServerSearch);
      fixture.detectChanges();
      await fixture.whenStable();
      loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it.skip('server search shows loading', async () => {
      // TODO: Enable once searchable and loading inputs are implemented
      // const select = await loader.getHarness(ComSelectHarness);
      //
      // await select.open();
      // fixture.componentInstance.loading.set(true);
      // fixture.detectChanges();
      //
      // // Loading indicator should be visible
      // // This would require checking for loading template rendering
      //
      // fixture.componentInstance.loading.set(false);
      // fixture.detectChanges();
      //
      // // Options should now be visible
      // const options = await select.getOptions();
      // expect(options.length).toBeGreaterThan(0);
    });
  });

  describe('Dynamic Options', () => {
    let fixture: ComponentFixture<TestSelectDynamic>;
    let loader: HarnessLoader;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestSelectDynamic],
      }).compileComponents();

      fixture = TestBed.createComponent(TestSelectDynamic);
      fixture.detectChanges();
      await fixture.whenStable();
      loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it('dynamic options update list', async () => {
      const select = await loader.getHarness(ComSelectHarness);

      // Initially 3 options
      let options = await select.getOptions();
      expect(options.length).toBe(3);

      // Close the panel
      await select.close();

      // Add a new item via button click
      const addButton = fixture.nativeElement.querySelector('[data-testid="add-button"]');
      addButton?.click();
      fixture.detectChanges();
      await fixture.whenStable();

      // Re-check options
      options = await select.getOptions();
      expect(options.length).toBe(4);

      // Verify new option exists
      const labels = await Promise.all(options.map(o => o.getLabel()));
      expect(labels).toContain('Item 4');
    });
  });

  describe('Empty Options', () => {
    let fixture: ComponentFixture<TestSelectEmpty>;
    let loader: HarnessLoader;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestSelectEmpty],
      }).compileComponents();

      fixture = TestBed.createComponent(TestSelectEmpty);
      fixture.detectChanges();
      await fixture.whenStable();
      loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it('empty options shows empty state', async () => {
      const select = await loader.getHarness(ComSelectHarness);

      // Open should work without crashing
      await select.open();
      expect(await select.isOpen()).toBe(true);

      // No options available
      const options = await select.getOptions();
      expect(options.length).toBe(0);

      // Clicking backdrop should close (the harness uses Escape key)
      // Wait a bit for any animations
      await new Promise(resolve => setTimeout(resolve, 50));
      await select.close();

      // Need to wait for close animation and detectChanges
      fixture.detectChanges();
      await fixture.whenStable();
      await new Promise(resolve => setTimeout(resolve, 50));

      expect(await select.isOpen()).toBe(false);
    });
  });

  describe('Long Labels', () => {
    let fixture: ComponentFixture<TestSelectLongLabels>;
    let loader: HarnessLoader;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestSelectLongLabels],
      }).compileComponents();

      fixture = TestBed.createComponent(TestSelectLongLabels);
      fixture.detectChanges();
      await fixture.whenStable();
      loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it("long labels don't break layout", async () => {
      const select = await loader.getHarness(ComSelectHarness);

      await select.open();

      // All options should be accessible
      const options = await select.getOptions();
      expect(options.length).toBe(4);

      // Select the long label option
      await select.selectOption({
        label: 'This is a very long option label that should be truncated',
      });
      fixture.detectChanges();
      await fixture.whenStable();

      // Value should be set correctly
      expect(fixture.componentInstance.value).toBe(
        'This is a very long option label that should be truncated'
      );

      // Display text should show (possibly truncated in UI, but full text in DOM)
      const valueText = await select.getValueText();
      expect(valueText).toContain('This is a very long option label');
    });
  });

  describe('Reactive Form Validation', () => {
    let fixture: ComponentFixture<TestSelectReactiveForm>;
    let loader: HarnessLoader;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestSelectReactiveForm],
      }).compileComponents();

      fixture = TestBed.createComponent(TestSelectReactiveForm);
      fixture.detectChanges();
      await fixture.whenStable();
      loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it('reactive form validation visible', async () => {
      const select = await loader.getHarness(ComSelectHarness);

      // Initially form is invalid (required field empty)
      expect(fixture.componentInstance.form.valid).toBe(false);

      // Open and close without selecting - should become touched
      await select.open();
      await select.close();
      fixture.detectChanges();
      await fixture.whenStable();

      // Form control should be touched
      expect(fixture.componentInstance.form.controls.fruit.touched).toBe(true);

      // Should show invalid state
      expect(await select.isValid()).toBe(false);

      // Now select an option
      await select.selectOption({ label: 'Apple' });
      fixture.detectChanges();
      await fixture.whenStable();

      // Form should now be valid
      expect(fixture.componentInstance.form.valid).toBe(true);
      expect(await select.isValid()).toBe(true);
    });
  });
});
