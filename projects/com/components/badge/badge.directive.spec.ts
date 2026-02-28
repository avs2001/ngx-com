import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ComBadge } from './badge.directive';
import type { BadgeVariant, BadgeSize } from './badge.variants';

@Component({
  selector: 'test-host',
  imports: [ComBadge],
  template: `
    <span
      comBadge
      [variant]="variant()"
      [size]="size()"
      [pill]="pill()"
      [class]="userClass()"
    >
      Test
    </span>
  `,
})
class TestHostComponent {
  readonly variant = signal<BadgeVariant>('primary');
  readonly size = signal<BadgeSize>('default');
  readonly pill = signal(false);
  readonly userClass = signal('');
}

@Component({
  selector: 'test-host-elements',
  imports: [ComBadge],
  template: `
    <span comBadge data-testid="span-badge">Span</span>
    <a href="#" comBadge data-testid="a-badge">Link</a>
    <button comBadge data-testid="button-badge">Button</button>
    <div comBadge data-testid="div-badge">Div</div>
  `,
})
class TestHostElementsComponent {}

describe('ComBadge', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let badgeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, TestHostElementsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    badgeEl = fixture.nativeElement.querySelector('[comBadge]');
  });

  describe('default state', () => {
    it('should apply base classes', () => {
      expect(badgeEl.classList.contains('com-badge')).toBe(true);
      expect(badgeEl.classList.contains('inline-flex')).toBe(true);
      expect(badgeEl.classList.contains('items-center')).toBe(true);
      expect(badgeEl.classList.contains('justify-center')).toBe(true);
      expect(badgeEl.classList.contains('font-medium')).toBe(true);
    });

    it('should apply default variant (primary)', () => {
      expect(badgeEl.classList.contains('bg-primary')).toBe(true);
      expect(badgeEl.classList.contains('text-primary-foreground')).toBe(true);
    });

    it('should apply default size', () => {
      expect(badgeEl.classList.contains('px-2')).toBe(true);
      expect(badgeEl.classList.contains('py-0.5')).toBe(true);
      expect(badgeEl.classList.contains('text-xs')).toBe(true);
      expect(badgeEl.classList.contains('rounded-md')).toBe(true);
    });

    it('should not apply pill rounding by default', () => {
      expect(badgeEl.classList.contains('rounded-pill')).toBe(false);
    });
  });

  describe('variants', () => {
    const variantTests: Array<{
      variant: BadgeVariant;
      bgClass: string;
      textClass: string;
    }> = [
      { variant: 'primary', bgClass: 'bg-primary', textClass: 'text-primary-foreground' },
      { variant: 'accent', bgClass: 'bg-accent', textClass: 'text-accent-foreground' },
      { variant: 'warn', bgClass: 'bg-warn', textClass: 'text-warn-foreground' },
      { variant: 'success', bgClass: 'bg-success', textClass: 'text-success-foreground' },
      { variant: 'muted', bgClass: 'bg-muted', textClass: 'text-muted-foreground' },
      { variant: 'outline', bgClass: 'bg-transparent', textClass: 'text-foreground' },
    ];

    variantTests.forEach(({ variant, bgClass, textClass }) => {
      it(`should apply ${variant} variant classes`, () => {
        host.variant.set(variant);
        fixture.detectChanges();

        expect(badgeEl.classList.contains(bgClass)).toBe(true);
        expect(badgeEl.classList.contains(textClass)).toBe(true);
      });
    });

    it('should apply border-border for outline variant', () => {
      host.variant.set('outline');
      fixture.detectChanges();

      expect(badgeEl.classList.contains('border-border')).toBe(true);
    });

    it('should apply border-transparent for non-outline variants', () => {
      host.variant.set('primary');
      fixture.detectChanges();

      expect(badgeEl.classList.contains('border-transparent')).toBe(true);
    });
  });

  describe('sizes', () => {
    it('should apply sm size classes', () => {
      host.size.set('sm');
      fixture.detectChanges();

      expect(badgeEl.classList.contains('px-1.5')).toBe(true);
      expect(badgeEl.classList.contains('py-px')).toBe(true);
      expect(badgeEl.classList.contains('text-[10px]')).toBe(true);
      expect(badgeEl.classList.contains('rounded-sm')).toBe(true);
    });

    it('should apply default size classes', () => {
      host.size.set('default');
      fixture.detectChanges();

      expect(badgeEl.classList.contains('px-2')).toBe(true);
      expect(badgeEl.classList.contains('py-0.5')).toBe(true);
      expect(badgeEl.classList.contains('text-xs')).toBe(true);
      expect(badgeEl.classList.contains('rounded-md')).toBe(true);
    });

    it('should apply lg size classes', () => {
      host.size.set('lg');
      fixture.detectChanges();

      expect(badgeEl.classList.contains('px-2.5')).toBe(true);
      expect(badgeEl.classList.contains('py-1')).toBe(true);
      expect(badgeEl.classList.contains('text-sm')).toBe(true);
    });
  });

  describe('pill', () => {
    it('should apply rounded-pill when pill is true', () => {
      host.pill.set(true);
      fixture.detectChanges();

      expect(badgeEl.classList.contains('rounded-pill')).toBe(true);
    });

    it('should not apply rounded-pill when pill is false', () => {
      host.pill.set(false);
      fixture.detectChanges();

      expect(badgeEl.classList.contains('rounded-pill')).toBe(false);
    });
  });

  describe('class merging', () => {
    it('should merge consumer classes with variant classes', () => {
      host.userClass.set('uppercase tracking-wider');
      fixture.detectChanges();

      expect(badgeEl.classList.contains('uppercase')).toBe(true);
      expect(badgeEl.classList.contains('tracking-wider')).toBe(true);
      // Should still have base classes
      expect(badgeEl.classList.contains('com-badge')).toBe(true);
      expect(badgeEl.classList.contains('bg-primary')).toBe(true);
    });

    it('should allow consumer classes to override variant classes via tailwind-merge', () => {
      host.userClass.set('px-4');
      fixture.detectChanges();

      // px-4 should win over px-2 via tailwind-merge
      expect(badgeEl.classList.contains('px-4')).toBe(true);
      expect(badgeEl.classList.contains('px-2')).toBe(false);
    });
  });

  describe('host elements', () => {
    let elementsFixture: ComponentFixture<TestHostElementsComponent>;

    beforeEach(() => {
      elementsFixture = TestBed.createComponent(TestHostElementsComponent);
      elementsFixture.detectChanges();
    });

    it('should work on span elements', () => {
      const el = elementsFixture.nativeElement.querySelector('[data-testid="span-badge"]');
      expect(el.classList.contains('com-badge')).toBe(true);
      expect(el.tagName.toLowerCase()).toBe('span');
    });

    it('should work on anchor elements', () => {
      const el = elementsFixture.nativeElement.querySelector('[data-testid="a-badge"]');
      expect(el.classList.contains('com-badge')).toBe(true);
      expect(el.tagName.toLowerCase()).toBe('a');
    });

    it('should work on button elements', () => {
      const el = elementsFixture.nativeElement.querySelector('[data-testid="button-badge"]');
      expect(el.classList.contains('com-badge')).toBe(true);
      expect(el.tagName.toLowerCase()).toBe('button');
    });

    it('should work on div elements', () => {
      const el = elementsFixture.nativeElement.querySelector('[data-testid="div-badge"]');
      expect(el.classList.contains('com-badge')).toBe(true);
      expect(el.tagName.toLowerCase()).toBe('div');
    });
  });

  describe('dynamic changes', () => {
    it('should re-render when variant changes', () => {
      expect(badgeEl.classList.contains('bg-primary')).toBe(true);

      host.variant.set('warn');
      fixture.detectChanges();

      expect(badgeEl.classList.contains('bg-warn')).toBe(true);
      expect(badgeEl.classList.contains('bg-primary')).toBe(false);
    });

    it('should re-render when size changes', () => {
      expect(badgeEl.classList.contains('px-2')).toBe(true);

      host.size.set('lg');
      fixture.detectChanges();

      expect(badgeEl.classList.contains('px-2.5')).toBe(true);
      expect(badgeEl.classList.contains('px-2')).toBe(false);
    });

    it('should re-render when pill changes', () => {
      expect(badgeEl.classList.contains('rounded-pill')).toBe(false);

      host.pill.set(true);
      fixture.detectChanges();

      expect(badgeEl.classList.contains('rounded-pill')).toBe(true);
    });
  });

  describe('exportAs', () => {
    @Component({
      imports: [ComBadge],
      template: `<span comBadge #badge="comBadge">Test</span>`,
    })
    class ExportAsTestComponent {}

    it('should export as comBadge', async () => {
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
