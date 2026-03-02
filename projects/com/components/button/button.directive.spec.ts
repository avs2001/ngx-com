import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ComButton } from './button.directive';
import type { ButtonVariant, ButtonColor, ButtonSize } from './button.variants';

@Component({
  selector: 'test-host',
  imports: [ComButton],
  template: `
    <button
      comButton
      [variant]="variant()"
      [color]="color()"
      [size]="size()"
      [fullWidth]="fullWidth()"
      [disabled]="disabled()"
      [class]="userClass()"
    >
      Test
    </button>
  `,
})
class TestHostComponent {
  readonly variant = signal<ButtonVariant>('solid');
  readonly color = signal<ButtonColor>('primary');
  readonly size = signal<ButtonSize>('md');
  readonly fullWidth = signal(false);
  readonly disabled = signal(false);
  readonly userClass = signal('');
}

@Component({
  selector: 'test-host-elements',
  imports: [ComButton],
  template: `
    <button comButton data-testid="button-el">Button</button>
    <a href="#" comButton data-testid="anchor-el">Link</a>
  `,
})
class TestHostElementsComponent {}

describe('ComButton', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let buttonEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, TestHostElementsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    buttonEl = fixture.nativeElement.querySelector('[comButton]');
  });

  describe('default state', () => {
    it('should apply base classes', () => {
      expect(buttonEl.classList.contains('inline-flex')).toBe(true);
      expect(buttonEl.classList.contains('items-center')).toBe(true);
      expect(buttonEl.classList.contains('justify-center')).toBe(true);
      expect(buttonEl.classList.contains('font-medium')).toBe(true);
    });

    it('should apply default variant (solid)', () => {
      expect(buttonEl.classList.contains('bg-primary')).toBe(true);
      expect(buttonEl.classList.contains('text-primary-foreground')).toBe(true);
    });

    it('should apply default size (md)', () => {
      expect(buttonEl.classList.contains('h-10')).toBe(true);
      expect(buttonEl.classList.contains('px-4')).toBe(true);
      expect(buttonEl.classList.contains('text-sm')).toBe(true);
      expect(buttonEl.classList.contains('rounded-control')).toBe(true);
    });

    it('should not apply full width by default', () => {
      expect(buttonEl.classList.contains('w-full')).toBe(false);
    });

    it('should not have aria-disabled by default', () => {
      expect(buttonEl.getAttribute('aria-disabled')).toBeNull();
    });
  });

  describe('variants', () => {
    describe('solid variant', () => {
      const colorTests: Array<{
        color: ButtonColor;
        bgClass: string;
        textClass: string;
        hoverClass: string;
      }> = [
        { color: 'primary', bgClass: 'bg-primary', textClass: 'text-primary-foreground', hoverClass: 'hover:bg-primary-hover' },
        { color: 'accent', bgClass: 'bg-accent', textClass: 'text-accent-foreground', hoverClass: 'hover:bg-accent-hover' },
        { color: 'warn', bgClass: 'bg-warn', textClass: 'text-warn-foreground', hoverClass: 'hover:bg-warn-hover' },
        { color: 'muted', bgClass: 'bg-muted', textClass: 'text-muted-foreground', hoverClass: 'hover:bg-muted-hover' },
      ];

      colorTests.forEach(({ color, bgClass, textClass, hoverClass }) => {
        it(`should apply solid ${color} classes`, () => {
          host.variant.set('solid');
          host.color.set(color);
          fixture.detectChanges();

          expect(buttonEl.classList.contains(bgClass)).toBe(true);
          expect(buttonEl.classList.contains(textClass)).toBe(true);
          expect(buttonEl.classList.contains(hoverClass)).toBe(true);
        });
      });
    });

    describe('outline variant', () => {
      it('should apply outline base classes', () => {
        host.variant.set('outline');
        fixture.detectChanges();

        expect(buttonEl.classList.contains('border')).toBe(true);
        expect(buttonEl.classList.contains('bg-transparent')).toBe(true);
      });

      const colorTests: Array<{
        color: ButtonColor;
        borderClass: string;
        textClass: string;
        hoverClass: string;
      }> = [
        { color: 'primary', borderClass: 'border-primary', textClass: 'text-primary', hoverClass: 'hover:bg-primary-subtle' },
        { color: 'accent', borderClass: 'border-accent', textClass: 'text-accent', hoverClass: 'hover:bg-accent-subtle' },
        { color: 'warn', borderClass: 'border-warn', textClass: 'text-warn', hoverClass: 'hover:bg-warn-subtle' },
        { color: 'muted', borderClass: 'border-border', textClass: 'text-muted-foreground', hoverClass: 'hover:bg-muted' },
      ];

      colorTests.forEach(({ color, borderClass, textClass, hoverClass }) => {
        it(`should apply outline ${color} classes`, () => {
          host.variant.set('outline');
          host.color.set(color);
          fixture.detectChanges();

          expect(buttonEl.classList.contains(borderClass)).toBe(true);
          expect(buttonEl.classList.contains(textClass)).toBe(true);
          expect(buttonEl.classList.contains(hoverClass)).toBe(true);
        });
      });
    });

    describe('ghost variant', () => {
      it('should apply ghost base classes', () => {
        host.variant.set('ghost');
        fixture.detectChanges();

        expect(buttonEl.classList.contains('bg-transparent')).toBe(true);
      });

      const colorTests: Array<{
        color: ButtonColor;
        textClass: string;
        hoverClass: string;
      }> = [
        { color: 'primary', textClass: 'text-primary', hoverClass: 'hover:bg-primary-subtle' },
        { color: 'accent', textClass: 'text-accent', hoverClass: 'hover:bg-accent-subtle' },
        { color: 'warn', textClass: 'text-warn', hoverClass: 'hover:bg-warn-subtle' },
        { color: 'muted', textClass: 'text-muted-foreground', hoverClass: 'hover:bg-muted' },
      ];

      colorTests.forEach(({ color, textClass, hoverClass }) => {
        it(`should apply ghost ${color} classes`, () => {
          host.variant.set('ghost');
          host.color.set(color);
          fixture.detectChanges();

          expect(buttonEl.classList.contains(textClass)).toBe(true);
          expect(buttonEl.classList.contains(hoverClass)).toBe(true);
        });
      });
    });

    describe('link variant', () => {
      it('should apply link base classes', () => {
        host.variant.set('link');
        fixture.detectChanges();

        expect(buttonEl.classList.contains('bg-transparent')).toBe(true);
        expect(buttonEl.classList.contains('underline-offset-4')).toBe(true);
        expect(buttonEl.classList.contains('hover:underline')).toBe(true);
      });

      it('should remove height/padding constraints for link variant', () => {
        host.variant.set('link');
        fixture.detectChanges();

        expect(buttonEl.classList.contains('h-auto')).toBe(true);
        expect(buttonEl.classList.contains('px-0')).toBe(true);
      });

      const colorTests: Array<{ color: ButtonColor; textClass: string }> = [
        { color: 'primary', textClass: 'text-primary' },
        { color: 'accent', textClass: 'text-accent' },
        { color: 'warn', textClass: 'text-warn' },
        { color: 'muted', textClass: 'text-muted-foreground' },
      ];

      colorTests.forEach(({ color, textClass }) => {
        it(`should apply link ${color} classes`, () => {
          host.variant.set('link');
          host.color.set(color);
          fixture.detectChanges();

          expect(buttonEl.classList.contains(textClass)).toBe(true);
        });
      });
    });
  });

  describe('sizes', () => {
    it('should apply sm size classes', () => {
      host.size.set('sm');
      fixture.detectChanges();

      expect(buttonEl.classList.contains('h-8')).toBe(true);
      expect(buttonEl.classList.contains('px-3')).toBe(true);
      expect(buttonEl.classList.contains('text-sm')).toBe(true);
      expect(buttonEl.classList.contains('rounded-control-sm')).toBe(true);
    });

    it('should apply md size classes', () => {
      host.size.set('md');
      fixture.detectChanges();

      expect(buttonEl.classList.contains('h-10')).toBe(true);
      expect(buttonEl.classList.contains('px-4')).toBe(true);
      expect(buttonEl.classList.contains('text-sm')).toBe(true);
      expect(buttonEl.classList.contains('rounded-control')).toBe(true);
    });

    it('should apply lg size classes', () => {
      host.size.set('lg');
      fixture.detectChanges();

      expect(buttonEl.classList.contains('h-12')).toBe(true);
      expect(buttonEl.classList.contains('px-6')).toBe(true);
      expect(buttonEl.classList.contains('text-base')).toBe(true);
      expect(buttonEl.classList.contains('rounded-control')).toBe(true);
    });

    it('should apply icon size classes', () => {
      host.size.set('icon');
      fixture.detectChanges();

      expect(buttonEl.classList.contains('h-10')).toBe(true);
      expect(buttonEl.classList.contains('w-10')).toBe(true);
      expect(buttonEl.classList.contains('rounded-control')).toBe(true);
    });
  });

  describe('fullWidth', () => {
    it('should apply w-full when fullWidth is true', () => {
      host.fullWidth.set(true);
      fixture.detectChanges();

      expect(buttonEl.classList.contains('w-full')).toBe(true);
    });

    it('should not apply w-full when fullWidth is false', () => {
      host.fullWidth.set(false);
      fixture.detectChanges();

      expect(buttonEl.classList.contains('w-full')).toBe(false);
    });
  });

  describe('disabled state', () => {
    it('should set aria-disabled when disabled', () => {
      host.disabled.set(true);
      fixture.detectChanges();

      expect(buttonEl.getAttribute('aria-disabled')).toBe('true');
    });

    it('should apply pointer-events-none when disabled', () => {
      host.disabled.set(true);
      fixture.detectChanges();

      expect(buttonEl.classList.contains('pointer-events-none')).toBe(true);
    });

    it('should remove aria-disabled when not disabled', () => {
      host.disabled.set(true);
      fixture.detectChanges();
      host.disabled.set(false);
      fixture.detectChanges();

      expect(buttonEl.getAttribute('aria-disabled')).toBeNull();
    });
  });

  describe('class merging', () => {
    it('should merge consumer classes with variant classes', () => {
      host.userClass.set('uppercase tracking-wider');
      fixture.detectChanges();

      expect(buttonEl.classList.contains('uppercase')).toBe(true);
      expect(buttonEl.classList.contains('tracking-wider')).toBe(true);
      // Should still have base classes
      expect(buttonEl.classList.contains('inline-flex')).toBe(true);
      expect(buttonEl.classList.contains('bg-primary')).toBe(true);
    });

    it('should allow consumer classes to override variant classes via tailwind-merge', () => {
      host.userClass.set('px-8');
      fixture.detectChanges();

      // px-8 should win over px-4 via tailwind-merge
      expect(buttonEl.classList.contains('px-8')).toBe(true);
      expect(buttonEl.classList.contains('px-4')).toBe(false);
    });
  });

  describe('host elements', () => {
    let elementsFixture: ComponentFixture<TestHostElementsComponent>;

    beforeEach(() => {
      elementsFixture = TestBed.createComponent(TestHostElementsComponent);
      elementsFixture.detectChanges();
    });

    it('should work on button elements', () => {
      const el = elementsFixture.nativeElement.querySelector('[data-testid="button-el"]');
      expect(el.classList.contains('inline-flex')).toBe(true);
      expect(el.tagName.toLowerCase()).toBe('button');
    });

    it('should work on anchor elements', () => {
      const el = elementsFixture.nativeElement.querySelector('[data-testid="anchor-el"]');
      expect(el.classList.contains('inline-flex')).toBe(true);
      expect(el.tagName.toLowerCase()).toBe('a');
    });
  });

  describe('dynamic changes', () => {
    it('should re-render when variant changes', () => {
      expect(buttonEl.classList.contains('bg-primary')).toBe(true);

      host.variant.set('outline');
      fixture.detectChanges();

      expect(buttonEl.classList.contains('border')).toBe(true);
      expect(buttonEl.classList.contains('bg-transparent')).toBe(true);
    });

    it('should re-render when color changes', () => {
      expect(buttonEl.classList.contains('bg-primary')).toBe(true);

      host.color.set('accent');
      fixture.detectChanges();

      expect(buttonEl.classList.contains('bg-accent')).toBe(true);
      expect(buttonEl.classList.contains('bg-primary')).toBe(false);
    });

    it('should re-render when size changes', () => {
      expect(buttonEl.classList.contains('h-10')).toBe(true);

      host.size.set('lg');
      fixture.detectChanges();

      expect(buttonEl.classList.contains('h-12')).toBe(true);
      expect(buttonEl.classList.contains('h-10')).toBe(false);
    });

    it('should re-render when fullWidth changes', () => {
      expect(buttonEl.classList.contains('w-full')).toBe(false);

      host.fullWidth.set(true);
      fixture.detectChanges();

      expect(buttonEl.classList.contains('w-full')).toBe(true);
    });
  });

  describe('exportAs', () => {
    @Component({
      imports: [ComButton],
      template: `<button comButton #btn="comButton">Test</button>`,
    })
    class ExportAsTestComponent {}

    it('should export as comButton', async () => {
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
