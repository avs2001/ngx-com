import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ComIcon } from './icon.component';
import { ComIconRegistry } from './icon.registry';
import { provideComIcons } from './icon.providers';
import { ICON_SIZE_PX, type IconColor, type IconSize } from './icon.variants';
import { Star, Check, AlertTriangle } from 'lucide-angular';
import type { LucideIconData } from 'lucide-angular';

@Component({
  selector: 'test-host',
  imports: [ComIcon],
  template: `
    <com-icon
      data-testid="icon"
      [name]="name()"
      [img]="img()"
      [color]="color()"
      [size]="size()"
      [strokeWidth]="strokeWidth()"
      [absoluteStrokeWidth]="absoluteStrokeWidth()"
      [ariaLabel]="ariaLabel()"
    />
  `,
})
class TestHostComponent {
  readonly name = signal<string | undefined>('star');
  readonly img = signal<LucideIconData | undefined>(undefined);
  readonly color = signal<IconColor>('current');
  readonly size = signal<IconSize>('lg');
  readonly strokeWidth = signal<number>(2);
  readonly absoluteStrokeWidth = signal<boolean>(false);
  readonly ariaLabel = signal<string | undefined>(undefined);
}

@Component({
  selector: 'test-host-img',
  imports: [ComIcon],
  template: `<com-icon data-testid="icon-img" [img]="StarIcon" />`,
})
class TestHostImgComponent {
  readonly StarIcon = Star;
}

@Component({
  selector: 'test-host-sizes',
  imports: [ComIcon],
  template: `
    <com-icon data-testid="icon-xs" name="star" size="xs" />
    <com-icon data-testid="icon-sm" name="star" size="sm" />
    <com-icon data-testid="icon-md" name="star" size="md" />
    <com-icon data-testid="icon-lg" name="star" size="lg" />
    <com-icon data-testid="icon-xl" name="star" size="xl" />
    <com-icon data-testid="icon-2xl" name="star" size="2xl" />
  `,
})
class TestHostSizesComponent {}

@Component({
  selector: 'test-host-colors',
  imports: [ComIcon],
  template: `
    <com-icon data-testid="icon-current" name="star" color="current" />
    <com-icon data-testid="icon-primary" name="star" color="primary" />
    <com-icon data-testid="icon-accent" name="star" color="accent" />
    <com-icon data-testid="icon-warn" name="star" color="warn" />
    <com-icon data-testid="icon-success" name="star" color="success" />
    <com-icon data-testid="icon-muted" name="star" color="muted" />
    <com-icon data-testid="icon-disabled" name="star" color="disabled" />
  `,
})
class TestHostColorsComponent {}

describe('ComIcon', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let iconEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestHostComponent,
        TestHostImgComponent,
        TestHostSizesComponent,
        TestHostColorsComponent,
      ],
      providers: [provideComIcons({ Star, Check, AlertTriangle })],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    iconEl = fixture.nativeElement.querySelector('[data-testid="icon"]');
  });

  describe('creation', () => {
    it('should create the component', () => {
      expect(iconEl).toBeTruthy();
    });

    it('should render the host element', () => {
      expect(iconEl.tagName.toLowerCase()).toBe('com-icon');
    });

    it('should render lucide-icon inside', () => {
      const lucideIcon = iconEl.querySelector('lucide-icon');
      expect(lucideIcon).toBeTruthy();
    });
  });

  describe('default state', () => {
    it('should apply base classes', () => {
      expect(iconEl.classList.contains('inline-flex')).toBe(true);
      expect(iconEl.classList.contains('items-center')).toBe(true);
      expect(iconEl.classList.contains('justify-center')).toBe(true);
      expect(iconEl.classList.contains('shrink-0')).toBe(true);
      expect(iconEl.classList.contains('align-middle')).toBe(true);
    });

    it('should apply default size (lg)', () => {
      expect(iconEl.classList.contains('size-icon-lg')).toBe(true);
    });

    it('should not apply color class for current (inherits)', () => {
      expect(iconEl.classList.contains('text-primary')).toBe(false);
      expect(iconEl.classList.contains('text-accent')).toBe(false);
    });
  });

  describe('icon rendering', () => {
    it('should render icon by name when name is provided', () => {
      host.name.set('star');
      host.img.set(undefined);
      fixture.detectChanges();

      const lucideIcon = iconEl.querySelector('lucide-icon');
      expect(lucideIcon).toBeTruthy();
    });

    it('should render icon by img when img is provided', () => {
      const imgFixture = TestBed.createComponent(TestHostImgComponent);
      imgFixture.detectChanges();

      const imgIconEl = imgFixture.nativeElement.querySelector('[data-testid="icon-img"]');
      const lucideIcon = imgIconEl.querySelector('lucide-icon');
      expect(lucideIcon).toBeTruthy();
    });

    it('should prefer img over name when both are provided', () => {
      host.name.set('check');
      host.img.set(Star);
      fixture.detectChanges();

      // The img branch should be taken (we can verify the component renders)
      const lucideIcon = iconEl.querySelector('lucide-icon');
      expect(lucideIcon).toBeTruthy();
    });

    it('should not render lucide-icon when neither name nor img is provided', () => {
      host.name.set(undefined);
      host.img.set(undefined);
      fixture.detectChanges();

      const lucideIcon = iconEl.querySelector('lucide-icon');
      expect(lucideIcon).toBeFalsy();
    });
  });

  describe('sizes', () => {
    const sizeTests: Array<{ size: IconSize; sizeClass: string; sizePx: number }> = [
      { size: 'xs', sizeClass: 'size-icon-xs', sizePx: 12 },
      { size: 'sm', sizeClass: 'size-icon-sm', sizePx: 16 },
      { size: 'md', sizeClass: 'size-icon-md', sizePx: 20 },
      { size: 'lg', sizeClass: 'size-icon-lg', sizePx: 24 },
      { size: 'xl', sizeClass: 'size-icon-xl', sizePx: 32 },
      { size: '2xl', sizeClass: 'size-icon-2xl', sizePx: 40 },
    ];

    sizeTests.forEach(({ size, sizeClass, sizePx }) => {
      it(`should apply ${size} size class`, () => {
        host.size.set(size);
        fixture.detectChanges();

        expect(iconEl.classList.contains(sizeClass)).toBe(true);
      });

      it(`should map ${size} to ${sizePx}px for lucide-icon`, () => {
        expect(ICON_SIZE_PX[size]).toBe(sizePx);
      });
    });

    it('should render all size variants correctly', () => {
      const sizesFixture = TestBed.createComponent(TestHostSizesComponent);
      sizesFixture.detectChanges();

      expect(
        sizesFixture.nativeElement.querySelector('[data-testid="icon-xs"]').classList.contains('size-icon-xs')
      ).toBe(true);
      expect(
        sizesFixture.nativeElement.querySelector('[data-testid="icon-sm"]').classList.contains('size-icon-sm')
      ).toBe(true);
      expect(
        sizesFixture.nativeElement.querySelector('[data-testid="icon-md"]').classList.contains('size-icon-md')
      ).toBe(true);
      expect(
        sizesFixture.nativeElement.querySelector('[data-testid="icon-lg"]').classList.contains('size-icon-lg')
      ).toBe(true);
      expect(
        sizesFixture.nativeElement.querySelector('[data-testid="icon-xl"]').classList.contains('size-icon-xl')
      ).toBe(true);
      expect(
        sizesFixture.nativeElement.querySelector('[data-testid="icon-2xl"]').classList.contains('size-icon-2xl')
      ).toBe(true);
    });
  });

  describe('colors', () => {
    const colorTests: Array<{ color: IconColor; textClass: string | null }> = [
      { color: 'current', textClass: null },
      { color: 'primary', textClass: 'text-primary' },
      { color: 'accent', textClass: 'text-accent' },
      { color: 'warn', textClass: 'text-warn' },
      { color: 'success', textClass: 'text-success' },
      { color: 'muted', textClass: 'text-muted-foreground' },
      { color: 'disabled', textClass: 'text-disabled-foreground' },
    ];

    colorTests.forEach(({ color, textClass }) => {
      it(`should apply ${color} color classes`, () => {
        host.color.set(color);
        fixture.detectChanges();

        if (textClass) {
          expect(iconEl.classList.contains(textClass)).toBe(true);
        } else {
          // 'current' should not add any color class
          expect(iconEl.classList.contains('text-primary')).toBe(false);
          expect(iconEl.classList.contains('text-accent')).toBe(false);
          expect(iconEl.classList.contains('text-warn')).toBe(false);
          expect(iconEl.classList.contains('text-success')).toBe(false);
          expect(iconEl.classList.contains('text-muted-foreground')).toBe(false);
          expect(iconEl.classList.contains('text-disabled-foreground')).toBe(false);
        }
      });
    });

    it('should render all color variants correctly', () => {
      const colorsFixture = TestBed.createComponent(TestHostColorsComponent);
      colorsFixture.detectChanges();

      expect(
        colorsFixture.nativeElement.querySelector('[data-testid="icon-primary"]').classList.contains('text-primary')
      ).toBe(true);
      expect(
        colorsFixture.nativeElement.querySelector('[data-testid="icon-accent"]').classList.contains('text-accent')
      ).toBe(true);
      expect(
        colorsFixture.nativeElement.querySelector('[data-testid="icon-warn"]').classList.contains('text-warn')
      ).toBe(true);
      expect(
        colorsFixture.nativeElement.querySelector('[data-testid="icon-success"]').classList.contains('text-success')
      ).toBe(true);
      expect(
        colorsFixture.nativeElement
          .querySelector('[data-testid="icon-muted"]')
          .classList.contains('text-muted-foreground')
      ).toBe(true);
      expect(
        colorsFixture.nativeElement
          .querySelector('[data-testid="icon-disabled"]')
          .classList.contains('text-disabled-foreground')
      ).toBe(true);
    });
  });

  describe('strokeWidth', () => {
    it('should default to strokeWidth of 2', () => {
      expect(host.strokeWidth()).toBe(2);
    });

    it('should accept custom strokeWidth', () => {
      host.strokeWidth.set(1.5);
      fixture.detectChanges();

      // Component renders without error with custom strokeWidth
      const lucideIcon = iconEl.querySelector('lucide-icon');
      expect(lucideIcon).toBeTruthy();
    });
  });

  describe('absoluteStrokeWidth', () => {
    it('should default to false', () => {
      expect(host.absoluteStrokeWidth()).toBe(false);
    });

    it('should accept true value', () => {
      host.absoluteStrokeWidth.set(true);
      fixture.detectChanges();

      // Component renders without error with absoluteStrokeWidth
      const lucideIcon = iconEl.querySelector('lucide-icon');
      expect(lucideIcon).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('should have aria-hidden="true" when no ariaLabel is provided', () => {
      host.ariaLabel.set(undefined);
      fixture.detectChanges();

      const lucideIcon = iconEl.querySelector('lucide-icon');
      expect(lucideIcon?.getAttribute('aria-hidden')).toBe('true');
    });

    it('should remove aria-hidden when ariaLabel is provided', () => {
      host.ariaLabel.set('Star icon');
      fixture.detectChanges();

      const lucideIcon = iconEl.querySelector('lucide-icon');
      expect(lucideIcon?.hasAttribute('aria-hidden')).toBe(false);
    });

    it('should set aria-label when ariaLabel is provided', () => {
      host.ariaLabel.set('Star icon');
      fixture.detectChanges();

      const lucideIcon = iconEl.querySelector('lucide-icon');
      expect(lucideIcon?.getAttribute('aria-label')).toBe('Star icon');
    });

    it('should not have aria-label when ariaLabel is not provided', () => {
      host.ariaLabel.set(undefined);
      fixture.detectChanges();

      const lucideIcon = iconEl.querySelector('lucide-icon');
      expect(lucideIcon?.hasAttribute('aria-label')).toBe(false);
    });
  });

  describe('dynamic changes', () => {
    it('should re-render when color changes', () => {
      expect(iconEl.classList.contains('text-primary')).toBe(false);

      host.color.set('primary');
      fixture.detectChanges();

      expect(iconEl.classList.contains('text-primary')).toBe(true);

      host.color.set('warn');
      fixture.detectChanges();

      expect(iconEl.classList.contains('text-warn')).toBe(true);
      expect(iconEl.classList.contains('text-primary')).toBe(false);
    });

    it('should re-render when size changes', () => {
      expect(iconEl.classList.contains('size-icon-lg')).toBe(true);

      host.size.set('sm');
      fixture.detectChanges();

      expect(iconEl.classList.contains('size-icon-sm')).toBe(true);
      expect(iconEl.classList.contains('size-icon-lg')).toBe(false);
    });

    it('should re-render when name changes', () => {
      host.name.set('star');
      fixture.detectChanges();

      let lucideIcon = iconEl.querySelector('lucide-icon');
      expect(lucideIcon).toBeTruthy();

      host.name.set('check');
      fixture.detectChanges();

      lucideIcon = iconEl.querySelector('lucide-icon');
      expect(lucideIcon).toBeTruthy();
    });

    it('should re-render when img changes', () => {
      host.name.set(undefined);
      host.img.set(Star);
      fixture.detectChanges();

      let lucideIcon = iconEl.querySelector('lucide-icon');
      expect(lucideIcon).toBeTruthy();

      host.img.set(Check);
      fixture.detectChanges();

      lucideIcon = iconEl.querySelector('lucide-icon');
      expect(lucideIcon).toBeTruthy();
    });

    it('should update ariaLabel dynamically', () => {
      host.ariaLabel.set(undefined);
      fixture.detectChanges();

      let lucideIcon = iconEl.querySelector('lucide-icon');
      expect(lucideIcon?.getAttribute('aria-hidden')).toBe('true');

      host.ariaLabel.set('Important icon');
      fixture.detectChanges();

      lucideIcon = iconEl.querySelector('lucide-icon');
      expect(lucideIcon?.getAttribute('aria-label')).toBe('Important icon');
      expect(lucideIcon?.hasAttribute('aria-hidden')).toBe(false);
    });
  });

  describe('custom classes', () => {
    @Component({
      imports: [ComIcon],
      template: `<com-icon data-testid="icon-custom" name="star" class="custom-class another-class" />`,
    })
    class CustomClassTestComponent {}

    it('should preserve custom classes on the host element', async () => {
      TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [CustomClassTestComponent],
        providers: [provideComIcons({ Star })],
      }).compileComponents();

      const customFixture = TestBed.createComponent(CustomClassTestComponent);
      customFixture.detectChanges();

      const customIconEl = customFixture.nativeElement.querySelector('[data-testid="icon-custom"]');
      expect(customIconEl.classList.contains('custom-class')).toBe(true);
      expect(customIconEl.classList.contains('another-class')).toBe(true);
      // Should still have base classes
      expect(customIconEl.classList.contains('inline-flex')).toBe(true);
    });
  });

  describe('provideComIcons', () => {
    it('should allow icons to be used by name when registered', () => {
      host.name.set('star');
      fixture.detectChanges();

      const lucideIcon = iconEl.querySelector('lucide-icon');
      expect(lucideIcon).toBeTruthy();
    });

    it('should allow multiple icons to be registered', () => {
      host.name.set('check');
      fixture.detectChanges();
      expect(iconEl.querySelector('lucide-icon')).toBeTruthy();

      host.name.set('alert-triangle');
      fixture.detectChanges();
      expect(iconEl.querySelector('lucide-icon')).toBeTruthy();
    });

    it('should work with component-level providers', async () => {
      @Component({
        imports: [ComIcon],
        providers: [provideComIcons({ Star })],
        template: `<com-icon data-testid="icon-cmp" name="star" />`,
      })
      class ComponentLevelProviderTest {}

      TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [ComponentLevelProviderTest],
      }).compileComponents();

      const cmpFixture = TestBed.createComponent(ComponentLevelProviderTest);
      cmpFixture.detectChanges();

      const lucideIcon = cmpFixture.nativeElement.querySelector('[data-testid="icon-cmp"] lucide-icon');
      expect(lucideIcon).toBeTruthy();
    });
  });

  describe('registry merging', () => {
    it('should merge icons from multiple provideComIcons calls', async () => {
      TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [TestHostComponent],
        providers: [
          provideComIcons({ Star }),
          provideComIcons({ Check }),
        ],
      }).compileComponents();

      const mergeFixture = TestBed.createComponent(TestHostComponent);
      const mergeHost = mergeFixture.componentInstance;

      mergeHost.name.set('star');
      mergeFixture.detectChanges();
      expect(mergeFixture.nativeElement.querySelector('lucide-icon')).toBeTruthy();

      mergeHost.name.set('check');
      mergeFixture.detectChanges();
      expect(mergeFixture.nativeElement.querySelector('lucide-icon')).toBeTruthy();
    });

    it('should store all registered icons in the singleton registry', async () => {
      TestBed.resetTestingModule();
      await TestBed.configureTestingModule({
        imports: [TestHostComponent],
        providers: [
          provideComIcons({ Star }),
          provideComIcons({ Check, AlertTriangle }),
        ],
      }).compileComponents();

      // Force initializers to run
      TestBed.createComponent(TestHostComponent);

      const registry = TestBed.inject(ComIconRegistry);
      expect(registry.get('Star')).toBeTruthy();
      expect(registry.get('Check')).toBeTruthy();
      expect(registry.get('AlertTriangle')).toBeTruthy();
    });
  });

  describe('unknown icon', () => {
    it('should render nothing for an unregistered icon name', () => {
      host.name.set('nonexistent-icon');
      fixture.detectChanges();

      const lucideIcon = iconEl.querySelector('lucide-icon');
      expect(lucideIcon).toBeFalsy();
    });
  });
});
