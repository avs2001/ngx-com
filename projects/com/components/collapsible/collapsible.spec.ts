import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  ComCollapsible,
  ComCollapsibleTrigger,
  ComCollapsibleContent,
  ComCollapsibleTriggerTpl,
  ComCollapsibleContentTpl,
  ComCollapsibleIconTpl,
  ComCollapsibleLazy,
} from './index';

describe('Collapsible', () => {
  describe('Basic functionality', () => {
    @Component({
      template: `
        <div comCollapsible [(open)]="isOpen">
          <button comCollapsibleTrigger>Toggle</button>
          <com-collapsible-content>
            <div class="content">Content here</div>
          </com-collapsible-content>
        </div>
      `,
      imports: [ComCollapsible, ComCollapsibleTrigger, ComCollapsibleContent],
    })
    class BasicCollapsibleComponent {
      isOpen = signal(false);
    }

    let fixture: ComponentFixture<BasicCollapsibleComponent>;
    let component: BasicCollapsibleComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BasicCollapsibleComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(BasicCollapsibleComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should start closed by default', () => {
      const collapsible = fixture.debugElement.query(By.directive(ComCollapsible));
      expect(collapsible.attributes['data-state']).toBe('closed');
    });

    it('should toggle via click', () => {
      const trigger = fixture.debugElement.query(By.directive(ComCollapsibleTrigger));
      trigger.nativeElement.click();
      fixture.detectChanges();

      expect(component.isOpen()).toBe(true);

      const collapsible = fixture.debugElement.query(By.directive(ComCollapsible));
      expect(collapsible.attributes['data-state']).toBe('open');
    });

    it('should toggle via Enter key', () => {
      const trigger = fixture.debugElement.query(By.directive(ComCollapsibleTrigger));
      trigger.triggerEventHandler('keydown.enter', { preventDefault: () => {} });
      fixture.detectChanges();

      expect(component.isOpen()).toBe(true);
    });

    it('should toggle via Space key', () => {
      const trigger = fixture.debugElement.query(By.directive(ComCollapsibleTrigger));
      trigger.triggerEventHandler('keydown.space', { preventDefault: () => {} });
      fixture.detectChanges();

      expect(component.isOpen()).toBe(true);
    });

    it('should have correct ARIA attributes when closed', () => {
      const trigger = fixture.debugElement.query(By.directive(ComCollapsibleTrigger));
      const content = fixture.debugElement.query(By.directive(ComCollapsibleContent));

      expect(trigger.attributes['aria-expanded']).toBe('false');
      expect(trigger.attributes['aria-controls']).toBeTruthy();
      expect(content.attributes['role']).toBe('region');
      expect(content.attributes['aria-labelledby']).toBe(trigger.attributes['id']);
    });

    it('should have correct ARIA attributes when open', () => {
      component.isOpen.set(true);
      fixture.detectChanges();

      const trigger = fixture.debugElement.query(By.directive(ComCollapsibleTrigger));
      expect(trigger.attributes['aria-expanded']).toBe('true');
    });

    it('should support two-way binding', () => {
      // Open via binding
      component.isOpen.set(true);
      fixture.detectChanges();

      const collapsible = fixture.debugElement.query(By.directive(ComCollapsible));
      expect(collapsible.attributes['data-state']).toBe('open');

      // Close via click
      const trigger = fixture.debugElement.query(By.directive(ComCollapsibleTrigger));
      trigger.nativeElement.click();
      fixture.detectChanges();

      expect(component.isOpen()).toBe(false);
    });
  });

  describe('Disabled state', () => {
    @Component({
      template: `
        <div comCollapsible [disabled]="disabled()">
          <button comCollapsibleTrigger>Toggle</button>
          <com-collapsible-content>Content</com-collapsible-content>
        </div>
      `,
      imports: [ComCollapsible, ComCollapsibleTrigger, ComCollapsibleContent],
    })
    class DisabledCollapsibleComponent {
      disabled = signal(true);
    }

    let fixture: ComponentFixture<DisabledCollapsibleComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DisabledCollapsibleComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(DisabledCollapsibleComponent);
      fixture.detectChanges();
    });

    it('should prevent toggle when disabled', () => {
      const trigger = fixture.debugElement.query(By.directive(ComCollapsibleTrigger));
      const collapsible = fixture.debugElement.query(By.directive(ComCollapsible));

      trigger.nativeElement.click();
      fixture.detectChanges();

      expect(collapsible.attributes['data-state']).toBe('closed');
    });

    it('should have aria-disabled when disabled', () => {
      const trigger = fixture.debugElement.query(By.directive(ComCollapsibleTrigger));
      expect(trigger.attributes['aria-disabled']).toBe('true');
    });

    it('should have tabindex -1 when disabled', () => {
      const trigger = fixture.debugElement.query(By.directive(ComCollapsibleTrigger));
      expect(trigger.attributes['tabindex']).toBe('-1');
    });
  });

  describe('External control via template ref', () => {
    @Component({
      template: `
        <div comCollapsible #section="comCollapsible">
          <button comCollapsibleTrigger>Toggle</button>
          <com-collapsible-content>Content</com-collapsible-content>
        </div>
        <button class="external" (click)="section.toggle()">External Toggle</button>
        <button class="expand" (click)="section.expand()">Expand</button>
        <button class="collapse" (click)="section.collapse()">Collapse</button>
      `,
      imports: [ComCollapsible, ComCollapsibleTrigger, ComCollapsibleContent],
    })
    class ExternalControlComponent {}

    let fixture: ComponentFixture<ExternalControlComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ExternalControlComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ExternalControlComponent);
      fixture.detectChanges();
    });

    it('should toggle via external button', () => {
      const externalBtn = fixture.debugElement.query(By.css('.external'));
      const collapsible = fixture.debugElement.query(By.directive(ComCollapsible));

      externalBtn.nativeElement.click();
      fixture.detectChanges();

      expect(collapsible.attributes['data-state']).toBe('open');
    });

    it('should expand via external button', () => {
      const expandBtn = fixture.debugElement.query(By.css('.expand'));
      const collapsible = fixture.debugElement.query(By.directive(ComCollapsible));

      expandBtn.nativeElement.click();
      fixture.detectChanges();

      expect(collapsible.attributes['data-state']).toBe('open');
    });

    it('should collapse via external button', () => {
      // First open
      const expandBtn = fixture.debugElement.query(By.css('.expand'));
      expandBtn.nativeElement.click();
      fixture.detectChanges();

      // Then collapse
      const collapseBtn = fixture.debugElement.query(By.css('.collapse'));
      collapseBtn.nativeElement.click();
      fixture.detectChanges();

      const collapsible = fixture.debugElement.query(By.directive(ComCollapsible));
      expect(collapsible.attributes['data-state']).toBe('closed');
    });
  });

  describe('Shell preset variants', () => {
    @Component({
      template: `
        <div comCollapsible [variant]="variant()">
          <button comCollapsibleTrigger>Toggle</button>
          <com-collapsible-content>Content</com-collapsible-content>
        </div>
      `,
      imports: [ComCollapsible, ComCollapsibleTrigger, ComCollapsibleContent],
    })
    class VariantCollapsibleComponent {
      variant = signal<'card' | 'bordered' | 'flush' | 'ghost' | 'unstyled'>('ghost');
    }

    let fixture: ComponentFixture<VariantCollapsibleComponent>;
    let component: VariantCollapsibleComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [VariantCollapsibleComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(VariantCollapsibleComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should apply card variant classes', () => {
      component.variant.set('card');
      fixture.detectChanges();

      const collapsible = fixture.debugElement.query(By.directive(ComCollapsible));
      expect(collapsible.nativeElement.classList.contains('rounded-md')).toBe(true);
      expect(collapsible.nativeElement.classList.contains('border')).toBe(true);
      expect(collapsible.nativeElement.classList.contains('shadow-xs')).toBe(true);
    });

    it('should apply bordered variant classes', () => {
      component.variant.set('bordered');
      fixture.detectChanges();

      const collapsible = fixture.debugElement.query(By.directive(ComCollapsible));
      expect(collapsible.nativeElement.classList.contains('rounded-md')).toBe(true);
      expect(collapsible.nativeElement.classList.contains('border')).toBe(true);
    });

    it('should apply flush variant classes', () => {
      component.variant.set('flush');
      fixture.detectChanges();

      const collapsible = fixture.debugElement.query(By.directive(ComCollapsible));
      expect(collapsible.nativeElement.classList.contains('border-b')).toBe(true);
    });

    it('should apply ghost variant (no visual classes)', () => {
      component.variant.set('ghost');
      fixture.detectChanges();

      const collapsible = fixture.debugElement.query(By.directive(ComCollapsible));
      expect(collapsible.nativeElement.classList.contains('com-collapsible')).toBe(true);
    });
  });

  describe('Trigger preset variants', () => {
    @Component({
      template: `
        <div comCollapsible>
          <button comCollapsibleTrigger [variant]="variant()" [size]="size()">Toggle</button>
          <com-collapsible-content>Content</com-collapsible-content>
        </div>
      `,
      imports: [ComCollapsible, ComCollapsibleTrigger, ComCollapsibleContent],
    })
    class TriggerVariantComponent {
      variant = signal<'ghost' | 'filled' | 'header' | 'unstyled'>('ghost');
      size = signal<'sm' | 'default' | 'lg'>('default');
    }

    let fixture: ComponentFixture<TriggerVariantComponent>;
    let component: TriggerVariantComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TriggerVariantComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TriggerVariantComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should apply ghost variant classes', () => {
      component.variant.set('ghost');
      fixture.detectChanges();

      const trigger = fixture.debugElement.query(By.directive(ComCollapsibleTrigger));
      expect(trigger.nativeElement.classList.contains('rounded-md')).toBe(true);
    });

    it('should apply filled variant classes', () => {
      component.variant.set('filled');
      fixture.detectChanges();

      const trigger = fixture.debugElement.query(By.directive(ComCollapsibleTrigger));
      expect(trigger.nativeElement.classList.contains('bg-muted')).toBe(true);
    });

    it('should apply sm size classes', () => {
      component.size.set('sm');
      fixture.detectChanges();

      const trigger = fixture.debugElement.query(By.directive(ComCollapsibleTrigger));
      expect(trigger.nativeElement.classList.contains('text-xs')).toBe(true);
    });

    it('should apply lg size classes', () => {
      component.size.set('lg');
      fixture.detectChanges();

      const trigger = fixture.debugElement.query(By.directive(ComCollapsibleTrigger));
      expect(trigger.nativeElement.classList.contains('text-base')).toBe(true);
    });
  });

  describe('Custom trigger template', () => {
    @Component({
      template: `
        <div comCollapsible>
          <button comCollapsibleTrigger>
            <ng-template comCollapsibleTriggerTpl let-open let-toggle="toggle">
              <span class="custom-trigger">{{ open ? 'Close' : 'Open' }}</span>
            </ng-template>
          </button>
          <com-collapsible-content>Content</com-collapsible-content>
        </div>
      `,
      imports: [
        ComCollapsible,
        ComCollapsibleTrigger,
        ComCollapsibleContent,
        ComCollapsibleTriggerTpl,
      ],
    })
    class CustomTriggerComponent {}

    let fixture: ComponentFixture<CustomTriggerComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [CustomTriggerComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(CustomTriggerComponent);
      fixture.detectChanges();
    });

    it('should render custom trigger template', () => {
      const customTrigger = fixture.debugElement.query(By.css('.custom-trigger'));
      expect(customTrigger).toBeTruthy();
      expect(customTrigger.nativeElement.textContent).toBe('Open');
    });

    it('should receive correct context', () => {
      const trigger = fixture.debugElement.query(By.directive(ComCollapsibleTrigger));
      trigger.nativeElement.click();
      fixture.detectChanges();

      const customTrigger = fixture.debugElement.query(By.css('.custom-trigger'));
      expect(customTrigger.nativeElement.textContent).toBe('Close');
    });
  });

  describe('Custom content template', () => {
    @Component({
      template: `
        <div comCollapsible>
          <button comCollapsibleTrigger>Toggle</button>
          <com-collapsible-content>
            <ng-template comCollapsibleContentTpl let-open="open">
              <div class="custom-content" [class.is-open]="open">
                Custom chrome content
              </div>
            </ng-template>
          </com-collapsible-content>
        </div>
      `,
      imports: [
        ComCollapsible,
        ComCollapsibleTrigger,
        ComCollapsibleContent,
        ComCollapsibleContentTpl,
      ],
    })
    class CustomContentComponent {}

    let fixture: ComponentFixture<CustomContentComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [CustomContentComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(CustomContentComponent);
      fixture.detectChanges();
    });

    it('should render custom content template', () => {
      const customContent = fixture.debugElement.query(By.css('.custom-content'));
      expect(customContent).toBeTruthy();
    });

    it('should receive correct context', () => {
      const trigger = fixture.debugElement.query(By.directive(ComCollapsibleTrigger));
      trigger.nativeElement.click();
      fixture.detectChanges();

      const customContent = fixture.debugElement.query(By.css('.custom-content'));
      expect(customContent.nativeElement.classList.contains('is-open')).toBe(true);
    });
  });

  describe('Custom icon template', () => {
    @Component({
      template: `
        <div comCollapsible>
          <button comCollapsibleTrigger>
            Toggle
            <ng-template comCollapsibleIcon let-open="open">
              <span class="custom-icon">{{ open ? '−' : '+' }}</span>
            </ng-template>
          </button>
          <com-collapsible-content>Content</com-collapsible-content>
        </div>
      `,
      imports: [
        ComCollapsible,
        ComCollapsibleTrigger,
        ComCollapsibleContent,
        ComCollapsibleIconTpl,
      ],
    })
    class CustomIconComponent {}

    let fixture: ComponentFixture<CustomIconComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [CustomIconComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(CustomIconComponent);
      fixture.detectChanges();
    });

    it('should render custom icon template', () => {
      const customIcon = fixture.debugElement.query(By.css('.custom-icon'));
      expect(customIcon).toBeTruthy();
      expect(customIcon.nativeElement.textContent).toBe('+');
    });

    it('should receive correct context', () => {
      const trigger = fixture.debugElement.query(By.directive(ComCollapsibleTrigger));
      trigger.nativeElement.click();
      fixture.detectChanges();

      const customIcon = fixture.debugElement.query(By.css('.custom-icon'));
      expect(customIcon.nativeElement.textContent).toBe('−');
    });
  });

  describe('Lazy content', () => {
    @Component({
      template: `
        <div comCollapsible>
          <button comCollapsibleTrigger>Toggle</button>
          <com-collapsible-content>
            <ng-template comCollapsibleLazy>
              <div class="lazy-content">Lazy loaded content</div>
            </ng-template>
          </com-collapsible-content>
        </div>
      `,
      imports: [
        ComCollapsible,
        ComCollapsibleTrigger,
        ComCollapsibleContent,
        ComCollapsibleLazy,
      ],
    })
    class LazyContentComponent {}

    let fixture: ComponentFixture<LazyContentComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [LazyContentComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(LazyContentComponent);
      fixture.detectChanges();
    });

    it('should not render lazy content initially', () => {
      const lazyContent = fixture.debugElement.query(By.css('.lazy-content'));
      expect(lazyContent).toBeNull();
    });

    it('should render lazy content on first expand', () => {
      const trigger = fixture.debugElement.query(By.directive(ComCollapsibleTrigger));
      trigger.nativeElement.click();
      fixture.detectChanges();

      const lazyContent = fixture.debugElement.query(By.css('.lazy-content'));
      expect(lazyContent).toBeTruthy();
    });

    it('should preserve lazy content after collapse', () => {
      const trigger = fixture.debugElement.query(By.directive(ComCollapsibleTrigger));

      // Expand
      trigger.nativeElement.click();
      fixture.detectChanges();

      // Collapse
      trigger.nativeElement.click();
      fixture.detectChanges();

      // Content should still be in DOM
      const lazyContent = fixture.debugElement.query(By.css('.lazy-content'));
      expect(lazyContent).toBeTruthy();
    });
  });

  describe('Template override + preset composition', () => {
    @Component({
      template: `
        <div comCollapsible variant="card">
          <button comCollapsibleTrigger variant="filled">
            <ng-template comCollapsibleTriggerTpl let-open>
              <span class="composed">{{ open ? 'Opened' : 'Closed' }}</span>
            </ng-template>
          </button>
          <com-collapsible-content>Content</com-collapsible-content>
        </div>
      `,
      imports: [
        ComCollapsible,
        ComCollapsibleTrigger,
        ComCollapsibleContent,
        ComCollapsibleTriggerTpl,
      ],
    })
    class ComposedComponent {}

    let fixture: ComponentFixture<ComposedComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ComposedComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ComposedComponent);
      fixture.detectChanges();
    });

    it('should apply card preset to shell', () => {
      const collapsible = fixture.debugElement.query(By.directive(ComCollapsible));
      expect(collapsible.nativeElement.classList.contains('shadow-xs')).toBe(true);
    });

    it('should apply filled preset to trigger', () => {
      const trigger = fixture.debugElement.query(By.directive(ComCollapsibleTrigger));
      expect(trigger.nativeElement.classList.contains('bg-muted')).toBe(true);
    });

    it('should render custom template inside preset', () => {
      const composed = fixture.debugElement.query(By.css('.composed'));
      expect(composed).toBeTruthy();
    });
  });

  describe('showIcon input', () => {
    @Component({
      template: `
        <div comCollapsible>
          <button comCollapsibleTrigger [showIcon]="showIcon()">Toggle</button>
          <com-collapsible-content>Content</com-collapsible-content>
        </div>
      `,
      imports: [ComCollapsible, ComCollapsibleTrigger, ComCollapsibleContent],
    })
    class ShowIconComponent {
      showIcon = signal(true);
    }

    let fixture: ComponentFixture<ShowIconComponent>;
    let component: ShowIconComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ShowIconComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ShowIconComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should show icon by default', () => {
      const icon = fixture.debugElement.query(By.css('.com-collapsible-icon'));
      expect(icon).toBeTruthy();
    });

    it('should hide icon when showIcon is false', () => {
      component.showIcon.set(false);
      fixture.detectChanges();

      const icon = fixture.debugElement.query(By.css('.com-collapsible-icon'));
      expect(icon).toBeNull();
    });
  });

  describe('Content animation attributes', () => {
    @Component({
      template: `
        <div comCollapsible>
          <button comCollapsibleTrigger>Toggle</button>
          <com-collapsible-content [duration]="300">Content</com-collapsible-content>
        </div>
      `,
      imports: [ComCollapsible, ComCollapsibleTrigger, ComCollapsibleContent],
    })
    class AnimationComponent {}

    let fixture: ComponentFixture<AnimationComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [AnimationComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(AnimationComponent);
      fixture.detectChanges();
    });

    it('should set custom duration CSS variable', () => {
      const content = fixture.debugElement.query(By.directive(ComCollapsibleContent));
      const style = content.nativeElement.style.getPropertyValue('--duration');
      expect(style).toBe('300ms');
    });

    it('should have data-state closed initially', () => {
      const content = fixture.debugElement.query(By.directive(ComCollapsibleContent));
      expect(content.attributes['data-state']).toBe('closed');
    });

    it('should have data-state open when expanded', () => {
      const trigger = fixture.debugElement.query(By.directive(ComCollapsibleTrigger));
      trigger.nativeElement.click();
      fixture.detectChanges();

      const content = fixture.debugElement.query(By.directive(ComCollapsibleContent));
      expect(content.attributes['data-state']).toBe('open');
    });

    it('should have inert attribute when closed', () => {
      const content = fixture.debugElement.query(By.directive(ComCollapsibleContent));
      expect(content.attributes['inert']).toBe('true');
    });

    it('should not have inert attribute when open', () => {
      const trigger = fixture.debugElement.query(By.directive(ComCollapsibleTrigger));
      trigger.nativeElement.click();
      fixture.detectChanges();

      const content = fixture.debugElement.query(By.directive(ComCollapsibleContent));
      expect(content.nativeElement.hasAttribute('inert')).toBe(false);
    });
  });
});
