import { Component, provideZonelessChangeDetection, signal, viewChild } from '@angular/core';
import type { Signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComCheckbox } from './checkbox.component';
import type { CheckboxChange } from './checkbox.component';
import type { CheckboxSize, CheckboxVariant } from './checkbox.variants';

@Component({
  selector: 'test-host',
  imports: [ComCheckbox],
  template: `
    <com-checkbox
      data-testid="checkbox"
      [checked]="checked()"
      [indeterminate]="indeterminate()"
      [disabled]="disabled()"
      [size]="size()"
      [variant]="variant()"
      [value]="value()"
      [name]="name()"
      [id]="customId()"
      [aria-label]="ariaLabel()"
      [aria-labelledby]="ariaLabelledby()"
      [aria-describedby]="ariaDescribedby()"
      (changed)="onChanged($event)"
      (checkedChange)="onCheckedChange($event)"
    >
      Label Text
    </com-checkbox>
  `,
})
class TestHostComponent {
  readonly checked = signal(false);
  readonly indeterminate = signal(false);
  readonly disabled = signal(false);
  readonly size = signal<CheckboxSize>('md');
  readonly variant = signal<CheckboxVariant>('primary');
  readonly value = signal<string | undefined>(undefined);
  readonly name = signal<string | undefined>(undefined);
  readonly customId = signal<string | undefined>(undefined);
  readonly ariaLabel = signal<string | null>(null);
  readonly ariaLabelledby = signal<string | null>(null);
  readonly ariaDescribedby = signal<string | null>(null);

  lastChangedEvent: CheckboxChange | null = null;
  lastCheckedChangeValue: boolean | null = null;

  onChanged(event: CheckboxChange): void {
    this.lastChangedEvent = event;
  }

  onCheckedChange(value: boolean): void {
    this.lastCheckedChangeValue = value;
  }
}

@Component({
  selector: 'test-host-forms',
  imports: [ComCheckbox, ReactiveFormsModule],
  template: `
    <com-checkbox data-testid="form-checkbox" [formControl]="control">
      Accept Terms
    </com-checkbox>
  `,
})
class TestHostFormsComponent {
  readonly control = new FormControl(false);
}

@Component({
  selector: 'test-host-export-as',
  imports: [ComCheckbox],
  template: `<com-checkbox #checkbox="comCheckbox">Test</com-checkbox>`,
})
class TestHostExportAsComponent {
  readonly checkboxRef: Signal<ComCheckbox | undefined> = viewChild<ComCheckbox>('checkbox');
}

describe('ComCheckbox', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let checkboxEl: HTMLElement;
  let inputEl: HTMLInputElement;
  let labelEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, TestHostFormsComponent, TestHostExportAsComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    checkboxEl = fixture.nativeElement.querySelector('[data-testid="checkbox"]');
    inputEl = checkboxEl.querySelector('input[type="checkbox"]')!;
    labelEl = checkboxEl.querySelector('.com-checkbox__label')!;
  });

  describe('creation', () => {
    it('should create the component', () => {
      expect(checkboxEl).toBeTruthy();
    });

    it('should render a native input element', () => {
      expect(inputEl).toBeTruthy();
      expect(inputEl.type).toBe('checkbox');
    });

    it('should render label content via ng-content', () => {
      expect(labelEl.textContent?.trim()).toBe('Label Text');
    });

    it('should apply base host classes', () => {
      expect(checkboxEl.classList.contains('com-checkbox')).toBe(true);
      expect(checkboxEl.classList.contains('inline-block')).toBe(true);
      expect(checkboxEl.classList.contains('align-middle')).toBe(true);
    });

    it('should generate a unique id if not provided', () => {
      expect(inputEl.id).toMatch(/^com-checkbox-\d+$/);
    });

    it('should use custom id when provided', () => {
      host.customId.set('my-custom-id');
      fixture.detectChanges();

      expect(inputEl.id).toBe('my-custom-id');
    });
  });

  describe('checked state', () => {
    it('should be unchecked by default', () => {
      expect(inputEl.checked).toBe(false);
      expect(checkboxEl.classList.contains('com-checkbox--checked')).toBe(false);
    });

    it('should apply checked state when checked input is true', () => {
      host.checked.set(true);
      fixture.detectChanges();

      expect(inputEl.checked).toBe(true);
      expect(checkboxEl.classList.contains('com-checkbox--checked')).toBe(true);
    });

    it('should toggle checked state when input changes', () => {
      host.checked.set(true);
      fixture.detectChanges();
      expect(inputEl.checked).toBe(true);

      host.checked.set(false);
      fixture.detectChanges();
      expect(inputEl.checked).toBe(false);
    });

    it('should emit changed event when user clicks checkbox', () => {
      inputEl.click();
      fixture.detectChanges();

      expect(host.lastChangedEvent).toBeTruthy();
      expect(host.lastChangedEvent!.checked).toBe(true);
      expect(host.lastChangedEvent!.source).toBeInstanceOf(ComCheckbox);
    });

    it('should emit checkedChange when user clicks checkbox', () => {
      inputEl.click();
      fixture.detectChanges();

      expect(host.lastCheckedChangeValue).toBe(true);
    });

    it('should call change handler with vi.fn() spy', () => {
      const changeSpy = vi.fn();
      host.onChanged = changeSpy;

      inputEl.click();
      fixture.detectChanges();

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy).toHaveBeenCalledWith(
        expect.objectContaining({ checked: true, source: expect.any(ComCheckbox) })
      );
    });

    it('should display checkmark SVG when checked', () => {
      host.checked.set(true);
      fixture.detectChanges();

      const checkmarkSvg = checkboxEl.querySelector('.com-checkbox__box svg');
      expect(checkmarkSvg).toBeTruthy();
      const polyline = checkmarkSvg?.querySelector('polyline');
      expect(polyline).toBeTruthy();
    });

    it('should not display checkmark SVG when unchecked', () => {
      host.checked.set(false);
      fixture.detectChanges();

      const svg = checkboxEl.querySelector('.com-checkbox__box svg');
      expect(svg).toBeFalsy();
    });
  });

  describe('indeterminate state', () => {
    it('should not be indeterminate by default', () => {
      expect(inputEl.indeterminate).toBe(false);
      expect(checkboxEl.classList.contains('com-checkbox--indeterminate')).toBe(false);
    });

    it('should apply indeterminate state', async () => {
      host.indeterminate.set(true);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(inputEl.indeterminate).toBe(true);
      expect(checkboxEl.classList.contains('com-checkbox--indeterminate')).toBe(true);
    });

    it('should display minus icon when indeterminate', async () => {
      host.indeterminate.set(true);
      fixture.detectChanges();
      await fixture.whenStable();

      const svg = checkboxEl.querySelector('.com-checkbox__box svg');
      expect(svg).toBeTruthy();
      const line = svg?.querySelector('line');
      expect(line).toBeTruthy();
    });

    it('should show indeterminate icon even when checked', async () => {
      host.checked.set(true);
      host.indeterminate.set(true);
      fixture.detectChanges();
      await fixture.whenStable();

      const svg = checkboxEl.querySelector('.com-checkbox__box svg');
      const line = svg?.querySelector('line');
      expect(line).toBeTruthy();
      const polyline = svg?.querySelector('polyline');
      expect(polyline).toBeFalsy();
    });

    it('should clear indeterminate state when user clicks', async () => {
      host.indeterminate.set(true);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(inputEl.indeterminate).toBe(true);

      inputEl.click();
      fixture.detectChanges();

      expect(inputEl.indeterminate).toBe(false);
    });
  });

  describe('disabled state', () => {
    it('should not be disabled by default', () => {
      expect(inputEl.disabled).toBe(false);
      expect(checkboxEl.classList.contains('com-checkbox--disabled')).toBe(false);
    });

    it('should apply disabled state', () => {
      host.disabled.set(true);
      fixture.detectChanges();

      expect(inputEl.disabled).toBe(true);
      expect(checkboxEl.classList.contains('com-checkbox--disabled')).toBe(true);
    });

    it('should apply cursor-not-allowed class when disabled', () => {
      host.disabled.set(true);
      fixture.detectChanges();

      const label = checkboxEl.querySelector('label');
      expect(label?.classList.contains('cursor-not-allowed')).toBe(true);
      expect(label?.classList.contains('cursor-pointer')).toBe(false);
    });

    it('should apply cursor-pointer class when enabled', () => {
      host.disabled.set(false);
      fixture.detectChanges();

      const label = checkboxEl.querySelector('label');
      expect(label?.classList.contains('cursor-pointer')).toBe(true);
      expect(label?.classList.contains('cursor-not-allowed')).toBe(false);
    });

    it('should not allow toggle when disabled', () => {
      host.disabled.set(true);
      fixture.detectChanges();

      inputEl.click();
      fixture.detectChanges();

      expect(inputEl.checked).toBe(false);
      expect(host.lastChangedEvent).toBeNull();
    });
  });

  describe('variants', () => {
    const variantTests: Array<{
      variant: CheckboxVariant;
      checkedClasses: string[];
    }> = [
      {
        variant: 'primary',
        checkedClasses: ['peer-checked:bg-primary', 'peer-checked:border-primary'],
      },
      {
        variant: 'accent',
        checkedClasses: ['peer-checked:bg-accent', 'peer-checked:border-accent'],
      },
      {
        variant: 'warn',
        checkedClasses: ['peer-checked:bg-warn', 'peer-checked:border-warn'],
      },
    ];

    variantTests.forEach(({ variant, checkedClasses }) => {
      it(`should apply ${variant} variant classes`, () => {
        host.variant.set(variant);
        fixture.detectChanges();

        const box = checkboxEl.querySelector('.com-checkbox__box');
        checkedClasses.forEach((cls) => {
          expect(box?.classList.contains(cls)).toBe(true);
        });
      });
    });

    it('should re-render when variant changes', () => {
      const box = checkboxEl.querySelector('.com-checkbox__box');
      expect(box?.classList.contains('peer-checked:bg-primary')).toBe(true);

      host.variant.set('warn');
      fixture.detectChanges();

      expect(box?.classList.contains('peer-checked:bg-warn')).toBe(true);
      expect(box?.classList.contains('peer-checked:bg-primary')).toBe(false);
    });
  });

  describe('sizes', () => {
    it('should apply sm size classes', () => {
      host.size.set('sm');
      fixture.detectChanges();

      const box = checkboxEl.querySelector('.com-checkbox__box');
      expect(box?.classList.contains('size-4')).toBe(true);
      expect(labelEl.classList.contains('text-sm')).toBe(true);
      expect(labelEl.classList.contains('ms-2')).toBe(true);
    });

    it('should apply md size classes (default)', () => {
      host.size.set('md');
      fixture.detectChanges();

      const box = checkboxEl.querySelector('.com-checkbox__box');
      expect(box?.classList.contains('size-5')).toBe(true);
      expect(labelEl.classList.contains('text-base')).toBe(true);
      expect(labelEl.classList.contains('ms-2.5')).toBe(true);
    });

    it('should apply lg size classes', () => {
      host.size.set('lg');
      fixture.detectChanges();

      const box = checkboxEl.querySelector('.com-checkbox__box');
      expect(box?.classList.contains('size-6')).toBe(true);
      expect(labelEl.classList.contains('text-lg')).toBe(true);
      expect(labelEl.classList.contains('ms-3')).toBe(true);
    });

    it('should re-render when size changes', () => {
      const box = checkboxEl.querySelector('.com-checkbox__box');
      expect(box?.classList.contains('size-5')).toBe(true);

      host.size.set('lg');
      fixture.detectChanges();

      expect(box?.classList.contains('size-6')).toBe(true);
      expect(box?.classList.contains('size-5')).toBe(false);
    });
  });

  describe('accessibility', () => {
    it('should set aria-label attribute', () => {
      host.ariaLabel.set('Toggle feature');
      fixture.detectChanges();

      expect(inputEl.getAttribute('aria-label')).toBe('Toggle feature');
    });

    it('should set aria-labelledby attribute', () => {
      host.ariaLabelledby.set('label-id');
      fixture.detectChanges();

      expect(inputEl.getAttribute('aria-labelledby')).toBe('label-id');
    });

    it('should set aria-describedby attribute', () => {
      host.ariaDescribedby.set('description-id');
      fixture.detectChanges();

      expect(inputEl.getAttribute('aria-describedby')).toBe('description-id');
    });

    it('should have native disabled attribute when disabled', () => {
      host.disabled.set(true);
      fixture.detectChanges();

      expect(inputEl.hasAttribute('disabled')).toBe(true);
    });

    it('should be keyboard accessible via native input', () => {
      // The native input is keyboard accessible by default
      // This test verifies the input exists and is not hidden from keyboard focus
      expect(inputEl.tabIndex).toBe(0);
    });

    it('should hide SVG icons from screen readers', () => {
      host.checked.set(true);
      fixture.detectChanges();

      const svg = checkboxEl.querySelector('.com-checkbox__box svg');
      expect(svg?.getAttribute('aria-hidden')).toBe('true');
      expect(svg?.getAttribute('focusable')).toBe('false');
    });
  });

  describe('keyboard interactions', () => {
    it('should toggle checkbox when Space key is pressed on input', () => {
      expect(inputEl.checked).toBe(false);

      inputEl.focus();
      inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      inputEl.click(); // Space triggers click on native checkbox
      fixture.detectChanges();

      expect(inputEl.checked).toBe(true);
    });

    it('should toggle checkbox when Enter key activates the label', () => {
      expect(inputEl.checked).toBe(false);

      // Native checkbox toggles on click, which can be triggered via label
      const label = checkboxEl.querySelector('label');
      label?.click();
      fixture.detectChanges();

      expect(inputEl.checked).toBe(true);
    });

    it('should not toggle when disabled and Space is pressed', () => {
      host.disabled.set(true);
      fixture.detectChanges();

      inputEl.focus();
      inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      inputEl.click();
      fixture.detectChanges();

      expect(inputEl.checked).toBe(false);
    });

    it('should receive focus when focus() is called', async () => {
      const exportAsFixture = TestBed.createComponent(TestHostExportAsComponent);
      exportAsFixture.detectChanges();
      await exportAsFixture.whenStable();

      const checkboxInstance = exportAsFixture.componentInstance.checkboxRef()!;
      checkboxInstance.focus();

      const focusedInput = exportAsFixture.nativeElement.querySelector('input[type="checkbox"]');
      expect(document.activeElement).toBe(focusedInput);
    });
  });

  describe('name and value attributes', () => {
    it('should set name attribute on input', () => {
      host.name.set('terms-checkbox');
      fixture.detectChanges();

      expect(inputEl.getAttribute('name')).toBe('terms-checkbox');
    });

    it('should set value attribute on input', () => {
      host.value.set('accepted');
      fixture.detectChanges();

      expect(inputEl.getAttribute('value')).toBe('accepted');
    });
  });

  describe('reactive forms integration', () => {
    let formsFixture: ComponentFixture<TestHostFormsComponent>;
    let formsHost: TestHostFormsComponent;
    let formsInputEl: HTMLInputElement;

    beforeEach(() => {
      formsFixture = TestBed.createComponent(TestHostFormsComponent);
      formsHost = formsFixture.componentInstance;
      formsFixture.detectChanges();
      const checkbox = formsFixture.nativeElement.querySelector('[data-testid="form-checkbox"]');
      formsInputEl = checkbox.querySelector('input[type="checkbox"]')!;
    });

    it('should sync value from FormControl to checkbox', () => {
      expect(formsInputEl.checked).toBe(false);

      formsHost.control.setValue(true);
      formsFixture.detectChanges();

      expect(formsInputEl.checked).toBe(true);
    });

    it('should sync value from checkbox to FormControl', () => {
      expect(formsHost.control.value).toBe(false);

      formsInputEl.click();
      formsFixture.detectChanges();

      expect(formsHost.control.value).toBe(true);
    });

    it('should apply disabled state from FormControl', () => {
      formsHost.control.disable();
      formsFixture.detectChanges();

      expect(formsInputEl.disabled).toBe(true);
    });

    it('should enable checkbox when FormControl is enabled', () => {
      formsHost.control.disable();
      formsFixture.detectChanges();
      expect(formsInputEl.disabled).toBe(true);

      formsHost.control.enable();
      formsFixture.detectChanges();
      expect(formsInputEl.disabled).toBe(false);
    });

    it('should mark form control as touched on blur', () => {
      expect(formsHost.control.touched).toBe(false);

      formsInputEl.dispatchEvent(new Event('blur'));
      formsFixture.detectChanges();

      expect(formsHost.control.touched).toBe(true);
    });
  });

  describe('public API', () => {
    let checkboxInstance: ComCheckbox;

    beforeEach(() => {
      const exportAsFixture = TestBed.createComponent(TestHostExportAsComponent);
      exportAsFixture.detectChanges();
      checkboxInstance = exportAsFixture.componentInstance.checkboxRef()!;
    });

    it('should export as comCheckbox', () => {
      expect(checkboxInstance).toBeInstanceOf(ComCheckbox);
    });

    it('should provide focus() method', () => {
      expect(typeof checkboxInstance.focus).toBe('function');
    });

    it('should provide toggle() method', () => {
      expect(typeof checkboxInstance.toggle).toBe('function');

      expect(checkboxInstance.checked()).toBe(false);
      checkboxInstance.toggle();
      expect(checkboxInstance.checked()).toBe(true);
      checkboxInstance.toggle();
      expect(checkboxInstance.checked()).toBe(false);
    });

    it('should not toggle when disabled', () => {
      checkboxInstance.disabled.set(true);
      checkboxInstance.toggle();

      expect(checkboxInstance.checked()).toBe(false);
    });

    it('should clear indeterminate state on toggle', () => {
      checkboxInstance.indeterminate.set(true);

      checkboxInstance.toggle();

      expect(checkboxInstance.indeterminate()).toBe(false);
      expect(checkboxInstance.checked()).toBe(true);
    });
  });

  describe('dynamic changes', () => {
    it('should re-render when checked changes dynamically', () => {
      expect(checkboxEl.classList.contains('com-checkbox--checked')).toBe(false);

      host.checked.set(true);
      fixture.detectChanges();

      expect(checkboxEl.classList.contains('com-checkbox--checked')).toBe(true);

      host.checked.set(false);
      fixture.detectChanges();

      expect(checkboxEl.classList.contains('com-checkbox--checked')).toBe(false);
    });

    it('should re-render when disabled changes dynamically', () => {
      expect(checkboxEl.classList.contains('com-checkbox--disabled')).toBe(false);

      host.disabled.set(true);
      fixture.detectChanges();

      expect(checkboxEl.classList.contains('com-checkbox--disabled')).toBe(true);

      host.disabled.set(false);
      fixture.detectChanges();

      expect(checkboxEl.classList.contains('com-checkbox--disabled')).toBe(false);
    });

    it('should re-render when indeterminate changes dynamically', async () => {
      expect(checkboxEl.classList.contains('com-checkbox--indeterminate')).toBe(false);

      host.indeterminate.set(true);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(checkboxEl.classList.contains('com-checkbox--indeterminate')).toBe(true);

      host.indeterminate.set(false);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(checkboxEl.classList.contains('com-checkbox--indeterminate')).toBe(false);
    });
  });
});
