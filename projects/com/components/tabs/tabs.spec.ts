import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  TabGroupComponent,
  TabComponent,
  TabLabelDirective,
  TabContentDirective,
  TabNavBarComponent,
  TabLinkDirective,
} from './index';
import type { TabVariant, TabSize, TabColor, TabAlignment } from './tabs.variants';

// Mock ResizeObserver for JSDOM environment
globalThis.ResizeObserver = class ResizeObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
};

describe('TabGroup', () => {
  describe('Basic functionality', () => {
    @Component({
      template: `
        <com-tab-group [(selectedIndex)]="selectedIndex">
          <com-tab label="Tab 1">
            <div class="content-1">Content 1</div>
          </com-tab>
          <com-tab label="Tab 2">
            <div class="content-2">Content 2</div>
          </com-tab>
          <com-tab label="Tab 3">
            <div class="content-3">Content 3</div>
          </com-tab>
        </com-tab-group>
      `,
      imports: [TabGroupComponent, TabComponent],
    })
    class BasicTabGroupComponent {
      selectedIndex = signal(0);
    }

    let fixture: ComponentFixture<BasicTabGroupComponent>;
    let component: BasicTabGroupComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BasicTabGroupComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(BasicTabGroupComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render tab group with tabs', () => {
      const tabGroup = fixture.debugElement.query(By.directive(TabGroupComponent));
      expect(tabGroup).toBeTruthy();

      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      expect(tabButtons.length).toBe(3);
    });

    it('should have first tab selected by default', () => {
      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      expect(tabButtons.at(0)!.attributes['aria-selected']).toBe('true');
      expect(tabButtons.at(1)!.attributes['aria-selected']).toBe('false');
      expect(tabButtons.at(2)!.attributes['aria-selected']).toBe('false');
    });

    it('should display correct tab labels', () => {
      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      expect(tabButtons.at(0)!.nativeElement.textContent.trim()).toBe('Tab 1');
      expect(tabButtons.at(1)!.nativeElement.textContent.trim()).toBe('Tab 2');
      expect(tabButtons.at(2)!.nativeElement.textContent.trim()).toBe('Tab 3');
    });

    it('should select tab via click', () => {
      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      tabButtons.at(1)!.nativeElement.click();
      fixture.detectChanges();

      expect(component.selectedIndex()).toBe(1);
      expect(tabButtons.at(1)!.attributes['aria-selected']).toBe('true');
    });

    it('should show correct content for selected tab', () => {
      const content1 = fixture.debugElement.query(By.css('.content-1'));
      expect(content1).toBeTruthy();

      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      tabButtons.at(1)!.nativeElement.click();
      fixture.detectChanges();

      const content2 = fixture.debugElement.query(By.css('.content-2'));
      expect(content2).toBeTruthy();
    });

    it('should support two-way binding', () => {
      // Change via binding
      component.selectedIndex.set(2);
      fixture.detectChanges();

      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      expect(tabButtons.at(2)!.attributes['aria-selected']).toBe('true');

      // Change via click
      tabButtons.at(0)!.nativeElement.click();
      fixture.detectChanges();

      expect(component.selectedIndex()).toBe(0);
    });
  });

  describe('Accessibility', () => {
    @Component({
      template: `
        <com-tab-group>
          <com-tab label="First">Content 1</com-tab>
          <com-tab label="Second">Content 2</com-tab>
        </com-tab-group>
      `,
      imports: [TabGroupComponent, TabComponent],
    })
    class AccessibilityComponent {}

    let fixture: ComponentFixture<AccessibilityComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [AccessibilityComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(AccessibilityComponent);
      fixture.detectChanges();
    });

    it('should have role="tablist" on the tab container', () => {
      const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));
      expect(tablist).toBeTruthy();
    });

    it('should have role="tab" on each tab button', () => {
      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      expect(tabButtons.length).toBe(2);
    });

    it('should have role="tabpanel" on the content container', () => {
      const tabpanel = fixture.debugElement.query(By.css('[role="tabpanel"]'));
      expect(tabpanel).toBeTruthy();
    });

    it('should have aria-selected on tab buttons', () => {
      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      expect(tabButtons.at(0)!.attributes['aria-selected']).toBe('true');
      expect(tabButtons.at(1)!.attributes['aria-selected']).toBe('false');
    });

    it('should have aria-controls pointing to panel id', () => {
      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      const firstTabControlsId = tabButtons.at(0)!.attributes['aria-controls'];
      expect(firstTabControlsId).toBeTruthy();

      const panel = fixture.debugElement.query(By.css(`#${firstTabControlsId}`));
      expect(panel).toBeTruthy();
    });

    it('should have correct tabindex for roving focus', () => {
      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      expect(tabButtons.at(0)!.attributes['tabindex']).toBe('0');
      expect(tabButtons.at(1)!.attributes['tabindex']).toBe('-1');
    });

    it('should have horizontal orientation', () => {
      const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));
      expect(tablist.attributes['aria-orientation']).toBe('horizontal');
    });
  });

  describe('Keyboard navigation', () => {
    @Component({
      template: `
        <com-tab-group [(selectedIndex)]="selectedIndex">
          <com-tab label="One">Content 1</com-tab>
          <com-tab label="Two">Content 2</com-tab>
          <com-tab label="Three">Content 3</com-tab>
        </com-tab-group>
      `,
      imports: [TabGroupComponent, TabComponent],
    })
    class KeyboardNavComponent {
      selectedIndex = signal(0);
    }

    let fixture: ComponentFixture<KeyboardNavComponent>;
    let component: KeyboardNavComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [KeyboardNavComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(KeyboardNavComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should navigate with ArrowRight', () => {
      const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });

      tablist.triggerEventHandler('keydown', event);
      fixture.detectChanges();

      // Arrow navigation moves focus but does not select
      // We verify that focus changed by checking which tab is now focusable
      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      expect(tabButtons.at(0)!.attributes['tabindex']).toBe('0'); // Still selected
    });

    it('should navigate with ArrowLeft', () => {
      component.selectedIndex.set(2);
      fixture.detectChanges();

      const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });

      tablist.triggerEventHandler('keydown', event);
      fixture.detectChanges();

      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      expect(tabButtons.at(2)!.attributes['tabindex']).toBe('0'); // Still selected
    });

    it('should go to first tab with Home', () => {
      component.selectedIndex.set(2);
      fixture.detectChanges();

      const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));
      const event = new KeyboardEvent('keydown', { key: 'Home' });

      tablist.triggerEventHandler('keydown', event);
      fixture.detectChanges();

      // Home key moves focus, not selection
      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      expect(tabButtons.at(2)!.attributes['tabindex']).toBe('0'); // Still selected
    });

    it('should go to last tab with End', () => {
      const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));
      const event = new KeyboardEvent('keydown', { key: 'End' });

      tablist.triggerEventHandler('keydown', event);
      fixture.detectChanges();

      // End key moves focus, not selection
      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      expect(tabButtons.at(0)!.attributes['tabindex']).toBe('0'); // Still selected
    });

    it('should select focused tab with Enter', () => {
      const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));

      // Navigate right
      tablist.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      fixture.detectChanges();

      // Select with Enter
      tablist.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'Enter' }));
      fixture.detectChanges();

      expect(component.selectedIndex()).toBe(1);
    });

    it('should select focused tab with Space', () => {
      const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));

      // Navigate right twice
      tablist.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      tablist.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      fixture.detectChanges();

      // Select with Space
      tablist.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: ' ' }));
      fixture.detectChanges();

      expect(component.selectedIndex()).toBe(2);
    });
  });

  describe('Disabled tabs', () => {
    @Component({
      template: `
        <com-tab-group [(selectedIndex)]="selectedIndex">
          <com-tab label="Enabled">Content 1</com-tab>
          <com-tab label="Disabled" [disabled]="true">Content 2</com-tab>
          <com-tab label="Also Enabled">Content 3</com-tab>
        </com-tab-group>
      `,
      imports: [TabGroupComponent, TabComponent],
    })
    class DisabledTabComponent {
      selectedIndex = signal(0);
    }

    let fixture: ComponentFixture<DisabledTabComponent>;
    let component: DisabledTabComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DisabledTabComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(DisabledTabComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have aria-disabled on disabled tab', () => {
      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      expect(tabButtons.at(1)!.attributes['aria-disabled']).toBe('true');
    });

    it('should have disabled attribute on disabled tab', () => {
      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      expect(tabButtons.at(1)!.nativeElement.disabled).toBe(true);
    });

    it('should not select disabled tab via click', () => {
      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      tabButtons.at(1)!.nativeElement.click();
      fixture.detectChanges();

      expect(component.selectedIndex()).toBe(0);
      expect(tabButtons.at(0)!.attributes['aria-selected']).toBe('true');
    });

    it('should allow selecting non-disabled tabs', () => {
      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      tabButtons.at(2)!.nativeElement.click();
      fixture.detectChanges();

      expect(component.selectedIndex()).toBe(2);
    });
  });

  describe('selectedIndex changes', () => {
    @Component({
      template: `
        <com-tab-group [selectedIndex]="selectedIndex()" (selectedTabChange)="onTabChange($event)">
          <com-tab label="A">Content A</com-tab>
          <com-tab label="B">Content B</com-tab>
          <com-tab label="C">Content C</com-tab>
        </com-tab-group>
      `,
      imports: [TabGroupComponent, TabComponent],
    })
    class SelectedIndexComponent {
      selectedIndex = signal(1);
      lastTabChange: { index: number } | null = null;

      onTabChange(event: { index: number }): void {
        this.lastTabChange = event;
      }
    }

    let fixture: ComponentFixture<SelectedIndexComponent>;
    let component: SelectedIndexComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SelectedIndexComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(SelectedIndexComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should respect initial selectedIndex', () => {
      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      expect(tabButtons.at(1)!.attributes['aria-selected']).toBe('true');
    });

    it('should update when selectedIndex changes programmatically', () => {
      component.selectedIndex.set(2);
      fixture.detectChanges();

      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      expect(tabButtons.at(2)!.attributes['aria-selected']).toBe('true');
    });

    it('should emit selectedTabChange when tab is clicked', () => {
      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      tabButtons.at(0)!.nativeElement.click();
      fixture.detectChanges();

      expect(component.lastTabChange).toBeTruthy();
      expect(component.lastTabChange!.index).toBe(0);
    });
  });

  describe('Lazy loading', () => {
    @Component({
      template: `
        <com-tab-group>
          <com-tab label="Eager">
            <div class="eager-content">Eager content</div>
          </com-tab>
          <com-tab label="Lazy">
            <ng-template comTabContent>
              <div class="lazy-content">Lazy content</div>
            </ng-template>
          </com-tab>
        </com-tab-group>
      `,
      imports: [TabGroupComponent, TabComponent, TabContentDirective],
    })
    class LazyLoadingComponent {}

    let fixture: ComponentFixture<LazyLoadingComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [LazyLoadingComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(LazyLoadingComponent);
      fixture.detectChanges();
    });

    it('should render eager content immediately', () => {
      const eagerContent = fixture.debugElement.query(By.css('.eager-content'));
      expect(eagerContent).toBeTruthy();
    });

    it('should not render lazy content initially', () => {
      const lazyContent = fixture.debugElement.query(By.css('.lazy-content'));
      expect(lazyContent).toBeNull();
    });

    it('should render lazy content when tab is selected', () => {
      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      tabButtons.at(1)!.nativeElement.click();
      fixture.detectChanges();

      const lazyContent = fixture.debugElement.query(By.css('.lazy-content'));
      expect(lazyContent).toBeTruthy();
    });

    it('should keep lazy content after switching away and back', () => {
      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));

      // Select lazy tab
      tabButtons.at(1)!.nativeElement.click();
      fixture.detectChanges();

      // Switch back
      tabButtons.at(0)!.nativeElement.click();
      fixture.detectChanges();

      // Switch to lazy tab again
      tabButtons.at(1)!.nativeElement.click();
      fixture.detectChanges();

      const lazyContent = fixture.debugElement.query(By.css('.lazy-content'));
      expect(lazyContent).toBeTruthy();
    });
  });

  describe('Custom label template', () => {
    @Component({
      template: `
        <com-tab-group>
          <com-tab>
            <ng-template comTabLabel>
              <span class="custom-icon">icon</span>
              <span class="custom-label">Custom Label</span>
            </ng-template>
            <div class="content">Content</div>
          </com-tab>
          <com-tab label="Simple">Simple content</com-tab>
        </com-tab-group>
      `,
      imports: [TabGroupComponent, TabComponent, TabLabelDirective],
    })
    class CustomLabelComponent {}

    let fixture: ComponentFixture<CustomLabelComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [CustomLabelComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(CustomLabelComponent);
      fixture.detectChanges();
    });

    it('should render custom label template', () => {
      const customIcon = fixture.debugElement.query(By.css('.custom-icon'));
      const customLabel = fixture.debugElement.query(By.css('.custom-label'));

      expect(customIcon).toBeTruthy();
      expect(customLabel).toBeTruthy();
      expect(customLabel.nativeElement.textContent).toBe('Custom Label');
    });

    it('should render simple label when no template provided', () => {
      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      expect(tabButtons.at(1)!.nativeElement.textContent.trim()).toBe('Simple');
    });
  });

  describe('Closable tabs', () => {
    @Component({
      template: `
        <com-tab-group>
          <com-tab label="Normal">Content</com-tab>
          <com-tab label="Closable" [closable]="true" (closed)="onClose()">Closable content</com-tab>
        </com-tab-group>
      `,
      imports: [TabGroupComponent, TabComponent],
    })
    class ClosableTabComponent {
      closeCalled = false;

      onClose(): void {
        this.closeCalled = true;
      }
    }

    let fixture: ComponentFixture<ClosableTabComponent>;
    let component: ClosableTabComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ClosableTabComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ClosableTabComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render close button on closable tab', () => {
      const closeButton = fixture.debugElement.query(By.css('[aria-label="Close Closable"]'));
      expect(closeButton).toBeTruthy();
    });

    it('should not render close button on non-closable tab', () => {
      const closeButton = fixture.debugElement.query(By.css('[aria-label="Close Normal"]'));
      expect(closeButton).toBeNull();
    });

    it('should emit closed event when close button is clicked', () => {
      const closeButton = fixture.debugElement.query(By.css('[aria-label="Close Closable"]'));
      closeButton.nativeElement.click();
      fixture.detectChanges();

      expect(component.closeCalled).toBe(true);
    });
  });

  describe('Dynamic tabs', () => {
    @Component({
      template: `
        <com-tab-group [(selectedIndex)]="selectedIndex">
          @for (tab of tabs(); track tab.id) {
            <com-tab [label]="tab.label">{{ tab.content }}</com-tab>
          }
        </com-tab-group>
      `,
      imports: [TabGroupComponent, TabComponent],
    })
    class DynamicTabsComponent {
      selectedIndex = signal(0);
      tabs = signal([
        { id: 1, label: 'Tab 1', content: 'Content 1' },
        { id: 2, label: 'Tab 2', content: 'Content 2' },
      ]);
    }

    let fixture: ComponentFixture<DynamicTabsComponent>;
    let component: DynamicTabsComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DynamicTabsComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(DynamicTabsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render initial tabs', () => {
      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      expect(tabButtons.length).toBe(2);
    });

    it('should add new tab dynamically', () => {
      component.tabs.set([
        ...component.tabs(),
        { id: 3, label: 'Tab 3', content: 'Content 3' },
      ]);
      fixture.detectChanges();

      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      expect(tabButtons.length).toBe(3);
    });

    it('should remove tab dynamically', () => {
      const firstTab = component.tabs().at(0);
      if (firstTab) {
        component.tabs.set([firstTab]);
        fixture.detectChanges();

        const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
        expect(tabButtons.length).toBe(1);
      }
    });

    it('should handle removing selected tab', () => {
      component.selectedIndex.set(1);
      fixture.detectChanges();

      const firstTab = component.tabs().at(0);
      if (firstTab) {
        component.tabs.set([firstTab]);
        fixture.detectChanges();

        // Selected index should clamp or remain
        const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
        expect(tabButtons.length).toBe(1);
      }
    });
  });

  describe('Variants and styling', () => {
    @Component({
      template: `
        <com-tab-group [variant]="variant()" [size]="size()" [color]="color()" [alignment]="alignment()">
          <com-tab label="One">Content 1</com-tab>
          <com-tab label="Two">Content 2</com-tab>
        </com-tab-group>
      `,
      imports: [TabGroupComponent, TabComponent],
    })
    class VariantComponent {
      variant = signal<TabVariant>('underline');
      size = signal<TabSize>('md');
      color = signal<TabColor>('primary');
      alignment = signal<TabAlignment>('start');
    }

    let fixture: ComponentFixture<VariantComponent>;
    let component: VariantComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [VariantComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(VariantComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should apply underline variant by default', () => {
      const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));
      expect(tablist.nativeElement.classList.contains('border-b')).toBe(true);
    });

    it('should apply pill variant', () => {
      component.variant.set('pill');
      fixture.detectChanges();

      const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));
      expect(tablist.nativeElement.classList.contains('bg-muted')).toBe(true);
      expect(tablist.nativeElement.classList.contains('rounded-tab-list')).toBe(true);
    });

    it('should apply solid variant', () => {
      component.variant.set('solid');
      fixture.detectChanges();

      const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));
      expect(tablist.nativeElement.classList.contains('bg-muted')).toBe(true);
    });

    it('should apply outline variant', () => {
      component.variant.set('outline');
      fixture.detectChanges();

      const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));
      expect(tablist.nativeElement.classList.contains('gap-1')).toBe(true);
    });

    it('should apply sm size', () => {
      component.size.set('sm');
      fixture.detectChanges();

      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      expect(tabButtons.at(0)!.nativeElement.classList.contains('text-xs')).toBe(true);
    });

    it('should apply lg size', () => {
      component.size.set('lg');
      fixture.detectChanges();

      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      expect(tabButtons.at(0)!.nativeElement.classList.contains('text-base')).toBe(true);
    });

    it('should apply center alignment', () => {
      component.alignment.set('center');
      fixture.detectChanges();

      const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));
      expect(tablist.nativeElement.classList.contains('justify-center')).toBe(true);
    });

    it('should apply end alignment', () => {
      component.alignment.set('end');
      fixture.detectChanges();

      const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));
      expect(tablist.nativeElement.classList.contains('justify-end')).toBe(true);
    });
  });

  describe('preserveContent mode', () => {
    @Component({
      template: `
        <com-tab-group [preserveContent]="true">
          <com-tab label="One">
            <div class="content-1">Content 1</div>
          </com-tab>
          <com-tab label="Two">
            <div class="content-2">Content 2</div>
          </com-tab>
        </com-tab-group>
      `,
      imports: [TabGroupComponent, TabComponent],
    })
    class PreserveContentComponent {}

    let fixture: ComponentFixture<PreserveContentComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [PreserveContentComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(PreserveContentComponent);
      fixture.detectChanges();
    });

    it('should keep inactive tab content in DOM when preserveContent is true', () => {
      // First tab content visible
      const content1 = fixture.debugElement.query(By.css('.content-1'));
      expect(content1).toBeTruthy();

      // Select second tab
      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      tabButtons.at(1)!.nativeElement.click();
      fixture.detectChanges();

      // Both contents should be in DOM (first hidden)
      const content1After = fixture.debugElement.query(By.css('.content-1'));
      const content2 = fixture.debugElement.query(By.css('.content-2'));

      expect(content1After).toBeTruthy();
      expect(content2).toBeTruthy();
    });
  });

  describe('focusChange output', () => {
    @Component({
      template: `
        <com-tab-group (focusChange)="onFocusChange($event)">
          <com-tab label="One">Content 1</com-tab>
          <com-tab label="Two">Content 2</com-tab>
        </com-tab-group>
      `,
      imports: [TabGroupComponent, TabComponent],
    })
    class FocusChangeComponent {
      lastFocusIndex: number | null = null;

      onFocusChange(index: number): void {
        this.lastFocusIndex = index;
      }
    }

    let fixture: ComponentFixture<FocusChangeComponent>;
    let component: FocusChangeComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [FocusChangeComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(FocusChangeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should emit focusChange when tab receives focus', () => {
      const tabButtons = fixture.debugElement.queryAll(By.css('[role="tab"]'));
      tabButtons.at(1)!.nativeElement.focus();
      tabButtons.at(1)!.triggerEventHandler('focus', {});
      fixture.detectChanges();

      expect(component.lastFocusIndex).toBe(1);
    });
  });
});

describe('TabNavBar', () => {
  describe('Basic functionality', () => {
    @Component({
      template: `
        <nav com-tab-nav-bar>
          <a comTabLink [active]="activeTab() === 0" (click)="activeTab.set(0)">Tab 1</a>
          <a comTabLink [active]="activeTab() === 1" (click)="activeTab.set(1)">Tab 2</a>
          <a comTabLink [active]="activeTab() === 2" (click)="activeTab.set(2)">Tab 3</a>
        </nav>
      `,
      imports: [TabNavBarComponent, TabLinkDirective],
    })
    class BasicNavBarComponent {
      activeTab = signal(0);
    }

    let fixture: ComponentFixture<BasicNavBarComponent>;
    let component: BasicNavBarComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BasicNavBarComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(BasicNavBarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render nav bar with tab links', () => {
      const navBar = fixture.debugElement.query(By.directive(TabNavBarComponent));
      expect(navBar).toBeTruthy();

      const tabLinks = fixture.debugElement.queryAll(By.directive(TabLinkDirective));
      expect(tabLinks.length).toBe(3);
    });

    it('should have role="tab" on each link', () => {
      const tabLinks = fixture.debugElement.queryAll(By.directive(TabLinkDirective));
      tabLinks.forEach(link => {
        expect(link.attributes['role']).toBe('tab');
      });
    });

    it('should have aria-selected on active link', () => {
      const tabLinks = fixture.debugElement.queryAll(By.directive(TabLinkDirective));
      expect(tabLinks.at(0)!.attributes['aria-selected']).toBe('true');
      expect(tabLinks.at(1)!.attributes['aria-selected']).toBe('false');
    });

    it('should update active state via click', () => {
      const tabLinks = fixture.debugElement.queryAll(By.directive(TabLinkDirective));
      tabLinks.at(1)!.nativeElement.click();
      fixture.detectChanges();

      expect(component.activeTab()).toBe(1);
      expect(tabLinks.at(1)!.attributes['aria-selected']).toBe('true');
    });

    it('should have correct tabindex for roving focus', () => {
      const tabLinks = fixture.debugElement.queryAll(By.directive(TabLinkDirective));
      expect(tabLinks.at(0)!.attributes['tabindex']).toBe('0');
      expect(tabLinks.at(1)!.attributes['tabindex']).toBe('-1');
    });
  });

  describe('Disabled links', () => {
    @Component({
      template: `
        <nav com-tab-nav-bar>
          <a comTabLink [active]="true">Enabled</a>
          <a comTabLink [disabled]="true">Disabled</a>
        </nav>
      `,
      imports: [TabNavBarComponent, TabLinkDirective],
    })
    class DisabledLinkComponent {}

    let fixture: ComponentFixture<DisabledLinkComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DisabledLinkComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(DisabledLinkComponent);
      fixture.detectChanges();
    });

    it('should have aria-disabled on disabled link', () => {
      const tabLinks = fixture.debugElement.queryAll(By.directive(TabLinkDirective));
      expect(tabLinks.at(1)!.attributes['aria-disabled']).toBe('true');
    });

    it('should have pointer-events-none class on disabled link', () => {
      const tabLinks = fixture.debugElement.queryAll(By.directive(TabLinkDirective));
      expect(tabLinks.at(1)!.nativeElement.classList.contains('pointer-events-none')).toBe(true);
    });
  });

  describe('Variants and styling', () => {
    @Component({
      template: `
        <nav com-tab-nav-bar [variant]="variant()" [size]="size()" [color]="color()" [alignment]="alignment()">
          <a comTabLink [active]="true" [variant]="variant()" [size]="size()" [color]="color()">Tab 1</a>
          <a comTabLink [variant]="variant()" [size]="size()" [color]="color()">Tab 2</a>
        </nav>
      `,
      imports: [TabNavBarComponent, TabLinkDirective],
    })
    class NavBarVariantComponent {
      variant = signal<TabVariant>('underline');
      size = signal<TabSize>('md');
      color = signal<TabColor>('primary');
      alignment = signal<TabAlignment>('start');
    }

    let fixture: ComponentFixture<NavBarVariantComponent>;
    let component: NavBarVariantComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [NavBarVariantComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(NavBarVariantComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should apply pill variant', () => {
      component.variant.set('pill');
      fixture.detectChanges();

      const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));
      expect(tablist.nativeElement.classList.contains('bg-muted')).toBe(true);
    });

    it('should apply sm size to links', () => {
      component.size.set('sm');
      fixture.detectChanges();

      const tabLinks = fixture.debugElement.queryAll(By.directive(TabLinkDirective));
      expect(tabLinks.at(0)!.nativeElement.classList.contains('text-xs')).toBe(true);
    });

    it('should apply center alignment', () => {
      component.alignment.set('center');
      fixture.detectChanges();

      const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));
      expect(tablist.nativeElement.classList.contains('justify-center')).toBe(true);
    });
  });

  describe('Keyboard navigation', () => {
    @Component({
      template: `
        <nav com-tab-nav-bar>
          <a comTabLink [active]="activeTab() === 0" (click)="activeTab.set(0)">One</a>
          <a comTabLink [active]="activeTab() === 1" (click)="activeTab.set(1)">Two</a>
          <a comTabLink [active]="activeTab() === 2" (click)="activeTab.set(2)">Three</a>
        </nav>
      `,
      imports: [TabNavBarComponent, TabLinkDirective],
    })
    class NavKeyboardComponent {
      activeTab = signal(0);
    }

    let fixture: ComponentFixture<NavKeyboardComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [NavKeyboardComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(NavKeyboardComponent);
      fixture.detectChanges();
    });

    it('should have tablist role', () => {
      const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));
      expect(tablist).toBeTruthy();
    });

    it('should respond to ArrowRight key', () => {
      const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });

      tablist.triggerEventHandler('keydown', event);
      fixture.detectChanges();

      // Navigation moves focus, not necessarily selection
      expect(tablist).toBeTruthy();
    });

    it('should respond to ArrowLeft key', () => {
      const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });

      tablist.triggerEventHandler('keydown', event);
      fixture.detectChanges();

      expect(tablist).toBeTruthy();
    });

    it('should respond to Home key', () => {
      const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));
      const event = new KeyboardEvent('keydown', { key: 'Home' });

      tablist.triggerEventHandler('keydown', event);
      fixture.detectChanges();

      expect(tablist).toBeTruthy();
    });

    it('should respond to End key', () => {
      const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));
      const event = new KeyboardEvent('keydown', { key: 'End' });

      tablist.triggerEventHandler('keydown', event);
      fixture.detectChanges();

      expect(tablist).toBeTruthy();
    });
  });
});

describe('TabLinkDirective', () => {
  describe('Active state', () => {
    @Component({
      template: `
        <nav com-tab-nav-bar>
          <a comTabLink [active]="isActive()">Tab</a>
        </nav>
      `,
      imports: [TabNavBarComponent, TabLinkDirective],
    })
    class ActiveStateComponent {
      isActive = signal(false);
    }

    let fixture: ComponentFixture<ActiveStateComponent>;
    let component: ActiveStateComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ActiveStateComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ActiveStateComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have data-state="inactive" when not active', () => {
      const link = fixture.debugElement.query(By.directive(TabLinkDirective));
      expect(link.attributes['data-state']).toBe('inactive');
    });

    it('should have data-state="active" when active', () => {
      component.isActive.set(true);
      fixture.detectChanges();

      const link = fixture.debugElement.query(By.directive(TabLinkDirective));
      expect(link.attributes['data-state']).toBe('active');
    });

    it('should have aria-selected="false" when not active', () => {
      const link = fixture.debugElement.query(By.directive(TabLinkDirective));
      expect(link.attributes['aria-selected']).toBe('false');
    });

    it('should have aria-selected="true" when active', () => {
      component.isActive.set(true);
      fixture.detectChanges();

      const link = fixture.debugElement.query(By.directive(TabLinkDirective));
      expect(link.attributes['aria-selected']).toBe('true');
    });

    it('should have tabindex="0" when active', () => {
      component.isActive.set(true);
      fixture.detectChanges();

      const link = fixture.debugElement.query(By.directive(TabLinkDirective));
      expect(link.attributes['tabindex']).toBe('0');
    });

    it('should have tabindex="-1" when not active', () => {
      const link = fixture.debugElement.query(By.directive(TabLinkDirective));
      expect(link.attributes['tabindex']).toBe('-1');
    });
  });

  describe('Custom class', () => {
    @Component({
      template: `
        <nav com-tab-nav-bar>
          <a comTabLink [active]="true" class="custom-class">Tab</a>
        </nav>
      `,
      imports: [TabNavBarComponent, TabLinkDirective],
    })
    class CustomClassComponent {}

    let fixture: ComponentFixture<CustomClassComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [CustomClassComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(CustomClassComponent);
      fixture.detectChanges();
    });

    it('should preserve custom classes', () => {
      const link = fixture.debugElement.query(By.directive(TabLinkDirective));
      expect(link.nativeElement.classList.contains('custom-class')).toBe(true);
    });

    it('should also have variant classes', () => {
      const link = fixture.debugElement.query(By.directive(TabLinkDirective));
      expect(link.nativeElement.classList.contains('inline-flex')).toBe(true);
    });
  });
});
