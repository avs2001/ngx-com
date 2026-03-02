import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ComSegmentedControl } from './segmented-control.component';
import type { SegmentOption } from './segmented-control.component';
import { ComSegmentDef } from './segment-def.directive';
import type {
  SegmentedControlSize,
  SegmentedControlColor,
  SegmentedControlVariant,
} from './segmented-control.variants';

@Component({
  selector: 'test-host',
  imports: [ComSegmentedControl],
  template: `
    <com-segmented-control
      [options]="options()"
      [(value)]="value"
      [size]="size()"
      [color]="color()"
      [variant]="variant()"
      [fullWidth]="fullWidth()"
      [aria-label]="ariaLabel()"
    />
  `,
})
class TestHostComponent {
  readonly options = signal<SegmentOption<string>[]>([
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
  ]);
  readonly value = signal<string | undefined>('admin');
  readonly size = signal<SegmentedControlSize>('md');
  readonly color = signal<SegmentedControlColor>('primary');
  readonly variant = signal<SegmentedControlVariant>('filled');
  readonly fullWidth = signal(false);
  readonly ariaLabel = signal<string | null>('Select role');
}

@Component({
  selector: 'test-host-template',
  imports: [ComSegmentedControl, ComSegmentDef],
  template: `
    <com-segmented-control [options]="options()" [(value)]="value">
      <ng-template comSegmentDef let-option let-active="active">
        <span class="icon">{{ option.value === 'grid' ? 'G' : 'L' }}</span>
        <span class="label">{{ option.label }}</span>
      </ng-template>
    </com-segmented-control>
  `,
})
class TestHostTemplateComponent {
  readonly options = signal<SegmentOption<string>[]>([
    { value: 'grid', label: 'Grid View' },
    { value: 'list', label: 'List View' },
  ]);
  readonly value = signal<string | undefined>('grid');
}

@Component({
  selector: 'test-host-disabled',
  imports: [ComSegmentedControl],
  template: `
    <com-segmented-control [options]="options()" [(value)]="value" />
  `,
})
class TestHostDisabledComponent {
  readonly options = signal<SegmentOption<string>[]>([
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
    { value: 'enterprise', label: 'Enterprise', disabled: true },
  ]);
  readonly value = signal<string | undefined>('free');
}

describe('ComSegmentedControl', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let containerEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestHostComponent,
        TestHostTemplateComponent,
        TestHostDisabledComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    containerEl = fixture.nativeElement.querySelector('[role="radiogroup"]');
  });

  function getButtons(): HTMLButtonElement[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll('button[role="radio"]')
    );
  }

  describe('default state', () => {
    it('should render a radiogroup', () => {
      expect(containerEl).toBeTruthy();
      expect(containerEl.getAttribute('role')).toBe('radiogroup');
    });

    it('should render segment buttons for each option', () => {
      const buttons = getButtons();
      expect(buttons.length).toBe(2);
    });

    it('should apply aria-label to the radiogroup', () => {
      expect(containerEl.getAttribute('aria-label')).toBe('Select role');
    });

    it('should set aria-checked on the selected segment', () => {
      const buttons = getButtons();
      expect(buttons[0]?.getAttribute('aria-checked')).toBe('true');
      expect(buttons[1]?.getAttribute('aria-checked')).toBe('false');
    });

    it('should apply container classes', () => {
      expect(containerEl.classList.contains('inline-flex')).toBe(true);
      expect(containerEl.classList.contains('rounded-pill')).toBe(true);
      expect(containerEl.classList.contains('bg-muted')).toBe(true);
    });
  });

  describe('selection', () => {
    it('should update value when clicking a segment', () => {
      const buttons = getButtons();
      buttons[1]?.click();
      fixture.detectChanges();

      expect(host.value()).toBe('user');
    });

    it('should update aria-checked when selection changes', () => {
      const buttons = getButtons();
      buttons[1]?.click();
      fixture.detectChanges();

      expect(buttons[0]?.getAttribute('aria-checked')).toBe('false');
      expect(buttons[1]?.getAttribute('aria-checked')).toBe('true');
    });

    it('should apply active classes to selected segment', () => {
      const buttons = getButtons();
      // First button is selected (admin)
      expect(buttons[0]?.classList.contains('bg-primary')).toBe(true);
      expect(buttons[0]?.classList.contains('text-primary-foreground')).toBe(
        true
      );
    });

    it('should apply inactive classes to unselected segment', () => {
      const buttons = getButtons();
      // Second button is not selected
      expect(buttons[1]?.classList.contains('text-foreground')).toBe(true);
      expect(buttons[1]?.classList.contains('bg-primary')).toBe(false);
    });
  });

  describe('sizes', () => {
    it('should apply sm size classes', () => {
      host.size.set('sm');
      fixture.detectChanges();

      const buttons = getButtons();
      expect(buttons[0]?.classList.contains('h-7')).toBe(true);
      expect(buttons[0]?.classList.contains('px-3')).toBe(true);
      expect(buttons[0]?.classList.contains('text-sm')).toBe(true);
    });

    it('should apply md size classes', () => {
      host.size.set('md');
      fixture.detectChanges();

      const buttons = getButtons();
      expect(buttons[0]?.classList.contains('h-8')).toBe(true);
      expect(buttons[0]?.classList.contains('px-4')).toBe(true);
      expect(buttons[0]?.classList.contains('text-sm')).toBe(true);
    });

    it('should apply lg size classes', () => {
      host.size.set('lg');
      fixture.detectChanges();

      const buttons = getButtons();
      expect(buttons[0]?.classList.contains('h-10')).toBe(true);
      expect(buttons[0]?.classList.contains('px-5')).toBe(true);
      expect(buttons[0]?.classList.contains('text-base')).toBe(true);
    });
  });

  describe('colors', () => {
    it('should apply primary color classes', () => {
      host.color.set('primary');
      fixture.detectChanges();

      const buttons = getButtons();
      expect(buttons[0]?.classList.contains('bg-primary')).toBe(true);
      expect(buttons[0]?.classList.contains('text-primary-foreground')).toBe(
        true
      );
    });

    it('should apply accent color classes', () => {
      host.color.set('accent');
      fixture.detectChanges();

      const buttons = getButtons();
      expect(buttons[0]?.classList.contains('bg-accent')).toBe(true);
      expect(buttons[0]?.classList.contains('text-accent-foreground')).toBe(
        true
      );
    });

    it('should apply muted color classes', () => {
      host.color.set('muted');
      fixture.detectChanges();

      const buttons = getButtons();
      expect(buttons[0]?.classList.contains('bg-background')).toBe(true);
      expect(buttons[0]?.classList.contains('text-foreground')).toBe(true);
    });
  });

  describe('variants', () => {
    it('should apply filled variant classes', () => {
      host.variant.set('filled');
      fixture.detectChanges();

      const buttons = getButtons();
      expect(buttons[0]?.classList.contains('bg-primary')).toBe(true);
      expect(buttons[0]?.classList.contains('shadow-sm')).toBe(true);
    });

    it('should apply outline variant classes', () => {
      host.variant.set('outline');
      fixture.detectChanges();

      const buttons = getButtons();
      expect(buttons[0]?.classList.contains('ring-2')).toBe(true);
      expect(buttons[0]?.classList.contains('ring-primary')).toBe(true);
      expect(buttons[0]?.classList.contains('text-primary')).toBe(true);
    });
  });

  describe('fullWidth', () => {
    it('should apply full width classes when enabled', () => {
      host.fullWidth.set(true);
      fixture.detectChanges();

      expect(containerEl.classList.contains('w-full')).toBe(true);

      const buttons = getButtons();
      expect(buttons[0]?.classList.contains('flex-1')).toBe(true);
    });

    it('should not apply full width classes when disabled', () => {
      host.fullWidth.set(false);
      fixture.detectChanges();

      expect(containerEl.classList.contains('w-full')).toBe(false);
    });
  });

  describe('keyboard navigation', () => {
    it('should implement roving tabindex', () => {
      const buttons = getButtons();
      // Selected (first) button has tabindex 0
      expect(buttons[0]?.getAttribute('tabindex')).toBe('0');
      // Other buttons have tabindex -1
      expect(buttons[1]?.getAttribute('tabindex')).toBe('-1');
    });

    it('should navigate right with ArrowRight', () => {
      const buttons = getButtons();
      buttons[0]?.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
      );
      fixture.detectChanges();

      expect(host.value()).toBe('user');
    });

    it('should navigate left with ArrowLeft', () => {
      host.value.set('user');
      fixture.detectChanges();

      const buttons = getButtons();
      buttons[1]?.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
      );
      fixture.detectChanges();

      expect(host.value()).toBe('admin');
    });

    it('should wrap around when navigating past end', () => {
      host.value.set('user');
      fixture.detectChanges();

      const buttons = getButtons();
      buttons[1]?.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
      );
      fixture.detectChanges();

      expect(host.value()).toBe('admin');
    });

    it('should go to first option with Home', () => {
      host.value.set('user');
      fixture.detectChanges();

      const buttons = getButtons();
      buttons[1]?.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Home', bubbles: true })
      );
      fixture.detectChanges();

      expect(host.value()).toBe('admin');
    });

    it('should go to last option with End', () => {
      const buttons = getButtons();
      buttons[0]?.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'End', bubbles: true })
      );
      fixture.detectChanges();

      expect(host.value()).toBe('user');
    });
  });

  describe('disabled options', () => {
    let disabledFixture: ComponentFixture<TestHostDisabledComponent>;

    beforeEach(() => {
      disabledFixture = TestBed.createComponent(TestHostDisabledComponent);
      disabledFixture.detectChanges();
    });

    function getDisabledButtons(): HTMLButtonElement[] {
      return Array.from(
        disabledFixture.nativeElement.querySelectorAll('button[role="radio"]')
      );
    }

    it('should apply disabled attribute', () => {
      const buttons = getDisabledButtons();
      expect(buttons[2]?.disabled).toBe(true);
    });

    it('should apply aria-disabled', () => {
      const buttons = getDisabledButtons();
      expect(buttons[2]?.getAttribute('aria-disabled')).toBe('true');
    });

    it('should apply disabled classes', () => {
      const buttons = getDisabledButtons();
      expect(buttons[2]?.classList.contains('bg-disabled')).toBe(true);
      expect(buttons[2]?.classList.contains('text-disabled-foreground')).toBe(
        true
      );
      expect(buttons[2]?.classList.contains('cursor-not-allowed')).toBe(true);
    });

    it('should not select disabled option on click', () => {
      const buttons = getDisabledButtons();
      buttons[2]?.click();
      disabledFixture.detectChanges();

      expect(disabledFixture.componentInstance.value()).toBe('free');
    });

    it('should skip disabled options during keyboard navigation', () => {
      disabledFixture.componentInstance.value.set('pro');
      disabledFixture.detectChanges();

      const buttons = getDisabledButtons();
      buttons[1]?.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
      );
      disabledFixture.detectChanges();

      // Should skip 'enterprise' (disabled) and wrap to 'free'
      expect(disabledFixture.componentInstance.value()).toBe('free');
    });
  });

  describe('custom template', () => {
    let templateFixture: ComponentFixture<TestHostTemplateComponent>;

    beforeEach(() => {
      templateFixture = TestBed.createComponent(TestHostTemplateComponent);
      templateFixture.detectChanges();
    });

    function getTemplateButtons(): HTMLButtonElement[] {
      return Array.from(
        templateFixture.nativeElement.querySelectorAll('button[role="radio"]')
      );
    }

    it('should render custom template content', () => {
      const buttons = getTemplateButtons();
      const icon = buttons[0]?.querySelector('.icon');
      const label = buttons[0]?.querySelector('.label');

      expect(icon?.textContent).toBe('G');
      expect(label?.textContent).toBe('Grid View');
    });

    it('should apply aria-label from option.label when using custom template', () => {
      const buttons = getTemplateButtons();
      expect(buttons[0]?.getAttribute('aria-label')).toBe('Grid View');
      expect(buttons[1]?.getAttribute('aria-label')).toBe('List View');
    });

    it('should provide active context to template', () => {
      const buttons = getTemplateButtons();
      // First button is active
      expect(buttons[0]?.getAttribute('aria-checked')).toBe('true');

      // Click second button
      buttons[1]?.click();
      templateFixture.detectChanges();

      expect(buttons[1]?.getAttribute('aria-checked')).toBe('true');
    });
  });

  describe('exportAs', () => {
    @Component({
      imports: [ComSegmentedControl],
      template: `
        <com-segmented-control
          [options]="options"
          [(value)]="value"
          #control="comSegmentedControl"
        />
      `,
    })
    class ExportAsTestComponent {
      options: SegmentOption<string>[] = [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
      ];
      value: string | undefined = 'a';
    }

    it('should export as comSegmentedControl', async () => {
      TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [ExportAsTestComponent],
      }).compileComponents();

      const exportFixture = TestBed.createComponent(ExportAsTestComponent);
      exportFixture.detectChanges();

      // If exportAs is wrong, Angular will throw during template compilation
      expect(exportFixture.componentInstance).toBeTruthy();
    });
  });
});
