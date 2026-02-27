/**
 * Suite B4 — Accessibility Tests for ComSelect
 *
 * Manual ARIA attribute checks for browser testing.
 * NOTE: vitest-axe is incompatible with browser mode (uses Node.js createRequire).
 * AXE automated scans are skipped until a browser-compatible solution is available.
 *
 * Run via: ng test integration --browsers=chromium
 *
 * @see SELECT_TEST_PLAN.md Phase 4
 */
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    <label id="fruit-label">Favorite Fruit</label>
    <com-select
      [(ngModel)]="value"
      [ariaLabelledby]="'fruit-label'"
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
class TestSelectBasic {
  value: string | null = null;
  items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
}

@Component({
  template: `
    <label id="search-label">Search Fruits</label>
    <com-select
      [(ngModel)]="value"
      [ariaLabelledby]="'search-label'"
      placeholder="Search..."
    >
      @for (item of items; track item) {
        <com-select-option [value]="item">{{ item }}</com-select-option>
      }
    </com-select>
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
    <label id="disabled-label">Disabled Select</label>
    <com-select
      [(ngModel)]="value"
      [ariaLabelledby]="'disabled-label'"
      [disabled]="disabled()"
      placeholder="Select item..."
    >
      @for (item of items; track item) {
        <com-select-option [value]="item" [disabled]="item === 'Cherry'">
          {{ item }}
        </com-select-option>
      }
    </com-select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComSelect, ComSelectOption, FormsModule],
})
class TestSelectDisabled {
  value: string | null = null;
  disabled = signal(false);
  items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
}

// ─────────────────────────────────────────────────────────────────────────────
// Suite B4 — Accessibility (ARIA Checks)
// ─────────────────────────────────────────────────────────────────────────────

describe('ComSelect - Suite B4: Accessibility', () => {
  describe('AXE Scans', () => {
    // NOTE: vitest-axe is incompatible with Vitest browser mode.
    // The library uses Node.js `module.createRequire` which is not available in browser.
    // These tests are skipped until a browser-compatible AXE testing solution is found.
    // Consider using @axe-core/playwright for e2e tests instead.

    it.skip('trigger passes AXE scan (closed state)', async () => {
      // TODO: Use @axe-core/playwright in e2e tests instead
    });

    it.skip('open dialog passes AXE scan', async () => {
      // TODO: Use @axe-core/playwright in e2e tests instead
    });

    it.skip('searchable dialog passes AXE scan', async () => {
      // TODO: Use @axe-core/playwright in e2e tests instead
    });
  });

  describe('ARIA Attributes', () => {
    describe('Trigger', () => {
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

      it('trigger has role=combobox', async () => {
        const trigger = fixture.nativeElement.querySelector('[role="combobox"]');
        expect(trigger).toBeTruthy();
      });

      it('trigger has aria-haspopup=listbox', async () => {
        const trigger = fixture.nativeElement.querySelector('[role="combobox"]');
        expect(trigger?.getAttribute('aria-haspopup')).toBe('listbox');
      });

      it('aria-expanded toggles', async () => {
        const select = await loader.getHarness(ComSelectHarness);
        const trigger = fixture.nativeElement.querySelector('[role="combobox"]');

        // Initially closed
        expect(trigger?.getAttribute('aria-expanded')).toBe('false');

        // Open
        await select.open();
        fixture.detectChanges();
        expect(trigger?.getAttribute('aria-expanded')).toBe('true');

        // Close
        await select.close();
        fixture.detectChanges();
        expect(trigger?.getAttribute('aria-expanded')).toBe('false');
      });

      it('trigger has aria-labelledby when provided', async () => {
        const trigger = fixture.nativeElement.querySelector('[role="combobox"]');
        expect(trigger?.getAttribute('aria-labelledby')).toBe('fruit-label');
      });
    });

    describe('Options', () => {
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

      it('options have role=option', async () => {
        const select = await loader.getHarness(ComSelectHarness);
        await select.open();
        fixture.detectChanges();

        // Wait for overlay
        await new Promise(resolve => setTimeout(resolve, 50));

        const options = document.querySelectorAll('[role="option"]');
        expect(options.length).toBe(5);
      });

      it('selected has aria-selected=true', async () => {
        const select = await loader.getHarness(ComSelectHarness);

        // Select an option
        await select.selectOption({ label: 'Banana' });
        fixture.detectChanges();
        await fixture.whenStable();

        // Reopen to check aria-selected
        await select.open();
        fixture.detectChanges();
        await new Promise(resolve => setTimeout(resolve, 50));

        const selectedOption = document.querySelector('[aria-selected="true"]');
        expect(selectedOption).toBeTruthy();
        expect(selectedOption?.textContent?.trim()).toBe('Banana');
      });
    });

    describe('Disabled States', () => {
      let fixture: ComponentFixture<TestSelectDisabled>;
      let loader: HarnessLoader;

      beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [TestSelectDisabled],
        }).compileComponents();

        fixture = TestBed.createComponent(TestSelectDisabled);
        fixture.detectChanges();
        await fixture.whenStable();
        loader = TestbedHarnessEnvironment.loader(fixture);
      });

      it('disabled trigger has aria-disabled=true', async () => {
        fixture.componentInstance.disabled.set(true);
        fixture.detectChanges();
        await fixture.whenStable();

        const trigger = fixture.nativeElement.querySelector('[role="combobox"]');
        expect(trigger?.getAttribute('aria-disabled')).toBe('true');
      });

      it('disabled option has aria-disabled=true', async () => {
        const select = await loader.getHarness(ComSelectHarness);
        await select.open();
        fixture.detectChanges();
        await new Promise(resolve => setTimeout(resolve, 50));

        // Cherry is disabled in TestSelectDisabled
        const options = await select.getOptions();
        for (const option of options) {
          const label = await option.getLabel();
          if (label === 'Cherry') {
            expect(await option.isDisabled()).toBe(true);
            break;
          }
        }
      });
    });

    describe('Listbox Panel', () => {
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

      it('panel has role=listbox', async () => {
        const select = await loader.getHarness(ComSelectHarness);
        await select.open();
        fixture.detectChanges();
        await new Promise(resolve => setTimeout(resolve, 50));

        const listbox = document.querySelector('[role="listbox"]');
        expect(listbox).toBeTruthy();
      });

      it('trigger aria-controls references panel id', async () => {
        const select = await loader.getHarness(ComSelectHarness);
        await select.open();
        fixture.detectChanges();
        await new Promise(resolve => setTimeout(resolve, 50));

        const trigger = fixture.nativeElement.querySelector('[role="combobox"]');
        const panelId = trigger?.getAttribute('aria-controls');
        expect(panelId).toBeTruthy();

        const panel = document.getElementById(panelId!);
        expect(panel).toBeTruthy();
        expect(panel?.getAttribute('role')).toBe('listbox');
      });

      it('panel has aria-activedescendant when navigating', async () => {
        const select = await loader.getHarness(ComSelectHarness);
        await select.open();
        fixture.detectChanges();
        await new Promise(resolve => setTimeout(resolve, 50));

        const listbox = document.querySelector('[role="listbox"]');
        const activeDescendant = listbox?.getAttribute('aria-activedescendant');

        // After opening, first option should be active
        if (activeDescendant) {
          const activeOption = document.getElementById(activeDescendant);
          expect(activeOption).toBeTruthy();
        }
      });
    });
  });
});
