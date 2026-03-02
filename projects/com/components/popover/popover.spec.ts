import { Component, inject, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';

import { PopoverTriggerDirective } from './popover-trigger.directive';
import { PopoverCloseDirective } from './popover-close.directive';
import { PopoverTemplateDirective } from './popover-template.directive';
import { POPOVER_DATA, POPOVER_REF, type PopoverRef } from './popover-tokens';

describe('PopoverTriggerDirective', () => {
  describe('Basic functionality', () => {
    @Component({
      template: `
        <button
          data-testid="trigger"
          [comPopoverTrigger]="popoverContent"
        >
          Open Popover
        </button>
        <ng-template #popoverContent>
          <p data-testid="popover-text">Popover content</p>
        </ng-template>
      `,
      imports: [PopoverTriggerDirective],
    })
    class BasicPopoverComponent {}

    let fixture: ComponentFixture<BasicPopoverComponent>;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BasicPopoverComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(BasicPopoverComponent);
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should create', () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      expect(trigger).toBeTruthy();
    });

    it('should open popover on click', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeTruthy();

      const content = overlayContainerElement.querySelector('[data-testid="popover-text"]');
      expect(content?.textContent).toBe('Popover content');
    });

    it('should close popover on second click (toggle)', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));

      // Open
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      let panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeTruthy();

      // Close
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();
      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 150));
      fixture.detectChanges();

      panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeNull();
    });
  });

  describe('Accessibility', () => {
    @Component({
      template: `
        <button
          data-testid="trigger"
          [comPopoverTrigger]="content"
          [popoverAriaLabel]="'Help menu'"
        >
          Help
        </button>
        <ng-template #content>
          <p>Help content</p>
        </ng-template>
      `,
      imports: [PopoverTriggerDirective],
    })
    class AccessiblePopoverComponent {}

    let fixture: ComponentFixture<AccessiblePopoverComponent>;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [AccessiblePopoverComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(AccessiblePopoverComponent);
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should have aria-haspopup="dialog"', () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      expect(trigger.nativeElement.getAttribute('aria-haspopup')).toBe('dialog');
    });

    it('should have aria-expanded="false" when closed', () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      expect(trigger.nativeElement.getAttribute('aria-expanded')).toBe('false');
    });

    it('should have aria-expanded="true" when open', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(trigger.nativeElement.getAttribute('aria-expanded')).toBe('true');
    });

    it('should have aria-controls pointing to popover ID when open', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));

      // No aria-controls when closed
      expect(trigger.nativeElement.getAttribute('aria-controls')).toBeNull();

      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const ariaControls = trigger.nativeElement.getAttribute('aria-controls');
      expect(ariaControls).toBeTruthy();

      // Verify the ID matches the dialog
      const dialog = overlayContainerElement.querySelector(`#${ariaControls}`);
      expect(dialog).toBeTruthy();
      expect(dialog?.getAttribute('role')).toBe('dialog');
    });

    it('should apply aria-label to the dialog', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const dialog = overlayContainerElement.querySelector('[role="dialog"]');
      expect(dialog?.getAttribute('aria-label')).toBe('Help menu');
    });
  });

  describe('Escape key handling', () => {
    @Component({
      template: `
        <button
          data-testid="trigger"
          [comPopoverTrigger]="content"
          [popoverCloseOnEscape]="closeOnEscape()"
        >
          Open
        </button>
        <ng-template #content>
          <p>Content</p>
        </ng-template>
      `,
      imports: [PopoverTriggerDirective],
    })
    class EscapePopoverComponent {
      closeOnEscape = signal(true);
    }

    let fixture: ComponentFixture<EscapePopoverComponent>;
    let component: EscapePopoverComponent;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [EscapePopoverComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(EscapePopoverComponent);
      component = fixture.componentInstance;
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should close on Escape key press', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      let panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeTruthy();

      // Dispatch Escape key event on trigger
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      trigger.nativeElement.dispatchEvent(event);
      fixture.detectChanges();
      await fixture.whenStable();
      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 150));
      fixture.detectChanges();

      panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeNull();
    });

    it('should NOT close on Escape when popoverCloseOnEscape is false', async () => {
      component.closeOnEscape.set(false);
      fixture.detectChanges();

      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      let panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeTruthy();

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      trigger.nativeElement.dispatchEvent(event);
      fixture.detectChanges();
      await fixture.whenStable();
      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 150));
      fixture.detectChanges();

      panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeTruthy();
    });
  });

  describe('Backdrop and outside click', () => {
    @Component({
      template: `
        <button
          data-testid="trigger"
          [comPopoverTrigger]="content"
          [popoverBackdrop]="backdrop()"
          [popoverCloseOnOutside]="closeOnOutside()"
        >
          Open
        </button>
        <ng-template #content>
          <p>Content</p>
        </ng-template>
      `,
      imports: [PopoverTriggerDirective],
    })
    class BackdropPopoverComponent {
      backdrop = signal<'transparent' | 'dimmed' | 'none'>('transparent');
      closeOnOutside = signal(true);
    }

    let fixture: ComponentFixture<BackdropPopoverComponent>;
    let component: BackdropPopoverComponent;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BackdropPopoverComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(BackdropPopoverComponent);
      component = fixture.componentInstance;
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should close on backdrop click', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      let panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeTruthy();

      const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
      expect(backdrop).toBeTruthy();
      (backdrop as HTMLElement).click();
      fixture.detectChanges();
      await fixture.whenStable();
      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 150));
      fixture.detectChanges();

      panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeNull();
    });

    it('should NOT close on backdrop click when popoverCloseOnOutside is false', async () => {
      component.closeOnOutside.set(false);
      fixture.detectChanges();

      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      let panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeTruthy();

      const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
      (backdrop as HTMLElement).click();
      fixture.detectChanges();
      await fixture.whenStable();
      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 150));
      fixture.detectChanges();

      panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeTruthy();
    });

    it('should apply dimmed backdrop class', async () => {
      component.backdrop.set('dimmed');
      fixture.detectChanges();

      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const backdrop = overlayContainerElement.querySelector('.cdk-overlay-dark-backdrop');
      expect(backdrop).toBeTruthy();
    });

    it('should apply transparent backdrop class', async () => {
      component.backdrop.set('transparent');
      fixture.detectChanges();

      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const backdrop = overlayContainerElement.querySelector('.cdk-overlay-transparent-backdrop');
      expect(backdrop).toBeTruthy();
    });
  });

  describe('Disabled state', () => {
    @Component({
      template: `
        <button
          data-testid="trigger"
          [comPopoverTrigger]="content"
          [popoverDisabled]="disabled()"
        >
          Open
        </button>
        <ng-template #content>
          <p>Content</p>
        </ng-template>
      `,
      imports: [PopoverTriggerDirective],
    })
    class DisabledPopoverComponent {
      disabled = signal(true);
    }

    let fixture: ComponentFixture<DisabledPopoverComponent>;
    let component: DisabledPopoverComponent;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DisabledPopoverComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(DisabledPopoverComponent);
      component = fixture.componentInstance;
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should NOT open when disabled', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeNull();
    });

    it('should open when enabled', async () => {
      component.disabled.set(false);
      fixture.detectChanges();

      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeTruthy();
    });
  });

  describe('Programmatic control', () => {
    @Component({
      template: `
        <button
          data-testid="trigger"
          [comPopoverTrigger]="content"
          #popover="comPopoverTrigger"
        >
          Open
        </button>
        <button data-testid="open-btn" (click)="popover.open()">Open programmatically</button>
        <button data-testid="close-btn" (click)="popover.close()">Close programmatically</button>
        <button data-testid="toggle-btn" (click)="popover.toggle()">Toggle</button>
        <ng-template #content>
          <p>Content</p>
        </ng-template>
      `,
      imports: [PopoverTriggerDirective],
    })
    class ProgrammaticPopoverComponent {}

    let fixture: ComponentFixture<ProgrammaticPopoverComponent>;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ProgrammaticPopoverComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ProgrammaticPopoverComponent);
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should open programmatically', async () => {
      const openBtn = fixture.debugElement.query(By.css('[data-testid="open-btn"]'));
      openBtn.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeTruthy();
    });

    it('should close programmatically', async () => {
      const openBtn = fixture.debugElement.query(By.css('[data-testid="open-btn"]'));
      openBtn.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      let panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeTruthy();

      const closeBtn = fixture.debugElement.query(By.css('[data-testid="close-btn"]'));
      closeBtn.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();
      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 150));
      fixture.detectChanges();

      panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeNull();
    });

    it('should toggle programmatically', async () => {
      const toggleBtn = fixture.debugElement.query(By.css('[data-testid="toggle-btn"]'));

      // Toggle open
      toggleBtn.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      let panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeTruthy();

      // Toggle close
      toggleBtn.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();
      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 150));
      fixture.detectChanges();

      panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeNull();
    });
  });

  describe('Two-way binding with popoverOpen', () => {
    @Component({
      template: `
        <button
          data-testid="trigger"
          [comPopoverTrigger]="content"
          [(popoverOpen)]="isOpen"
        >
          Open
        </button>
        <ng-template #content>
          <p>Content</p>
        </ng-template>
      `,
      imports: [PopoverTriggerDirective],
    })
    class TwoWayBindingPopoverComponent {
      isOpen = signal(false);
    }

    let fixture: ComponentFixture<TwoWayBindingPopoverComponent>;
    let component: TwoWayBindingPopoverComponent;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TwoWayBindingPopoverComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TwoWayBindingPopoverComponent);
      component = fixture.componentInstance;
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should open when isOpen is set to true', async () => {
      component.isOpen.set(true);
      fixture.detectChanges();
      await fixture.whenStable();

      const panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeTruthy();
    });

    it('should close when isOpen is set to false', async () => {
      component.isOpen.set(true);
      fixture.detectChanges();
      await fixture.whenStable();

      let panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeTruthy();

      component.isOpen.set(false);
      fixture.detectChanges();
      await fixture.whenStable();
      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 150));
      fixture.detectChanges();

      panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeNull();
    });

    it('should update isOpen when popover is closed via backdrop click', async () => {
      component.isOpen.set(true);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.isOpen()).toBe(true);

      const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
      (backdrop as HTMLElement).click();
      fixture.detectChanges();
      await fixture.whenStable();
      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 150));
      fixture.detectChanges();

      expect(component.isOpen()).toBe(false);
    });
  });

  describe('Events', () => {
    @Component({
      template: `
        <button
          data-testid="trigger"
          [comPopoverTrigger]="content"
          (popoverOpened)="onOpened()"
          (popoverClosed)="onClosed()"
        >
          Open
        </button>
        <ng-template #content>
          <p>Content</p>
        </ng-template>
      `,
      imports: [PopoverTriggerDirective],
    })
    class EventsPopoverComponent {
      openedCount = 0;
      closedCount = 0;

      onOpened(): void {
        this.openedCount++;
      }

      onClosed(): void {
        this.closedCount++;
      }
    }

    let fixture: ComponentFixture<EventsPopoverComponent>;
    let component: EventsPopoverComponent;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [EventsPopoverComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(EventsPopoverComponent);
      component = fixture.componentInstance;
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should emit popoverOpened when opened', async () => {
      expect(component.openedCount).toBe(0);

      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.openedCount).toBe(1);
    });

    it('should emit popoverClosed when closed', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.closedCount).toBe(0);

      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();
      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 150));
      fixture.detectChanges();

      expect(component.closedCount).toBe(1);
    });
  });

  describe('Arrow display', () => {
    @Component({
      template: `
        <button
          data-testid="trigger"
          [comPopoverTrigger]="content"
          [popoverShowArrow]="showArrow()"
        >
          Open
        </button>
        <ng-template #content>
          <p>Content</p>
        </ng-template>
      `,
      imports: [PopoverTriggerDirective],
    })
    class ArrowPopoverComponent {
      showArrow = signal(true);
    }

    let fixture: ComponentFixture<ArrowPopoverComponent>;
    let component: ArrowPopoverComponent;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ArrowPopoverComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ArrowPopoverComponent);
      component = fixture.componentInstance;
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should show arrow by default', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const arrow = overlayContainerElement.querySelector('com-popover-arrow');
      expect(arrow).toBeTruthy();
    });

    it('should hide arrow when popoverShowArrow is false', async () => {
      component.showArrow.set(false);
      fixture.detectChanges();

      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const arrow = overlayContainerElement.querySelector('com-popover-arrow');
      expect(arrow).toBeNull();
    });
  });

  describe('Content projection', () => {
    @Component({
      template: `
        <button
          data-testid="trigger"
          [comPopoverTrigger]="content"
        >
          Open
        </button>
        <ng-template #content>
          <div data-testid="complex-content">
            <h3>Title</h3>
            <p>Paragraph</p>
            <button data-testid="action-btn">Action</button>
          </div>
        </ng-template>
      `,
      imports: [PopoverTriggerDirective],
    })
    class ContentProjectionPopoverComponent {}

    let fixture: ComponentFixture<ContentProjectionPopoverComponent>;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ContentProjectionPopoverComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ContentProjectionPopoverComponent);
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should project complex content', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const complexContent = overlayContainerElement.querySelector('[data-testid="complex-content"]');
      expect(complexContent).toBeTruthy();

      const title = overlayContainerElement.querySelector('h3');
      expect(title?.textContent).toBe('Title');

      const paragraph = overlayContainerElement.querySelector('p');
      expect(paragraph?.textContent).toBe('Paragraph');

      const actionBtn = overlayContainerElement.querySelector('[data-testid="action-btn"]');
      expect(actionBtn).toBeTruthy();
    });
  });

  describe('Template context', () => {
    @Component({
      template: `
        <button
          data-testid="trigger"
          [comPopoverTrigger]="content"
          [popoverData]="{ message: 'Hello from data' }"
        >
          Open
        </button>
        <ng-template #content let-data let-close="close">
          <p data-testid="data-message">{{ data.message }}</p>
          <button data-testid="close-from-template" (click)="close()">Close</button>
        </ng-template>
      `,
      imports: [PopoverTriggerDirective],
    })
    class TemplateContextPopoverComponent {}

    let fixture: ComponentFixture<TemplateContextPopoverComponent>;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TemplateContextPopoverComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TemplateContextPopoverComponent);
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should provide data in template context', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const dataMessage = overlayContainerElement.querySelector('[data-testid="data-message"]');
      expect(dataMessage?.textContent).toBe('Hello from data');
    });

    it('should provide close function in template context', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      let panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeTruthy();

      const closeBtn = overlayContainerElement.querySelector('[data-testid="close-from-template"]') as HTMLElement;
      closeBtn.click();
      fixture.detectChanges();
      await fixture.whenStable();
      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 150));
      fixture.detectChanges();

      panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeNull();
    });
  });

  describe('Component content with injection tokens', () => {
    @Component({
      selector: 'test-popover-content',
      template: `
        <p data-testid="injected-data">{{ data?.name }}</p>
        <button data-testid="close-via-ref" (click)="popoverRef?.close()">Close</button>
      `,
    })
    class TestPopoverContentComponent {
      data = inject<{ name: string } | null>(POPOVER_DATA, { optional: true });
      popoverRef = inject<PopoverRef | null>(POPOVER_REF, { optional: true });
    }

    @Component({
      template: `
        <button
          data-testid="trigger"
          [comPopoverTrigger]="contentComponent"
          [popoverData]="{ name: 'Test User' }"
        >
          Open
        </button>
      `,
      imports: [PopoverTriggerDirective],
    })
    class ComponentContentPopoverComponent {
      contentComponent = TestPopoverContentComponent;
    }

    let fixture: ComponentFixture<ComponentContentPopoverComponent>;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ComponentContentPopoverComponent, TestPopoverContentComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ComponentContentPopoverComponent);
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should inject POPOVER_DATA into component content', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const dataElement = overlayContainerElement.querySelector('[data-testid="injected-data"]');
      expect(dataElement?.textContent).toBe('Test User');
    });

    it('should inject POPOVER_REF into component content', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      let panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeTruthy();

      const closeBtn = overlayContainerElement.querySelector('[data-testid="close-via-ref"]') as HTMLElement;
      closeBtn.click();
      fixture.detectChanges();
      await fixture.whenStable();
      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 150));
      fixture.detectChanges();

      panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeNull();
    });
  });

  describe('Panel class', () => {
    @Component({
      template: `
        <button
          data-testid="trigger"
          [comPopoverTrigger]="content"
          [popoverPanelClass]="panelClass()"
        >
          Open
        </button>
        <ng-template #content>
          <p>Content</p>
        </ng-template>
      `,
      imports: [PopoverTriggerDirective],
    })
    class PanelClassPopoverComponent {
      panelClass = signal<string | string[]>('custom-panel-class');
    }

    let fixture: ComponentFixture<PanelClassPopoverComponent>;
    let component: PanelClassPopoverComponent;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [PanelClassPopoverComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(PanelClassPopoverComponent);
      component = fixture.componentInstance;
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should apply custom panel class (string)', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const panel = overlayContainerElement.querySelector('.com-popover-panel');
      expect(panel?.classList.contains('custom-panel-class')).toBe(true);
    });

    it('should apply custom panel classes (array)', async () => {
      component.panelClass.set(['class-one', 'class-two']);
      fixture.detectChanges();

      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const panel = overlayContainerElement.querySelector('.com-popover-panel');
      expect(panel?.classList.contains('class-one')).toBe(true);
      expect(panel?.classList.contains('class-two')).toBe(true);
    });
  });
});

describe('PopoverCloseDirective', () => {
  // Test PopoverCloseDirective with component content (where POPOVER_REF is properly injected)
  @Component({
    selector: 'test-close-content',
    template: `
      <div>
        <p>Are you sure?</p>
        <button data-testid="close-btn" comPopoverClose>Close</button>
      </div>
    `,
    imports: [PopoverCloseDirective],
  })
  class TestCloseContentComponent {}

  @Component({
    template: `
      <button
        data-testid="trigger"
        [comPopoverTrigger]="contentComponent"
      >
        Open
      </button>
    `,
    imports: [PopoverTriggerDirective],
  })
  class PopoverCloseWithComponentComponent {
    contentComponent = TestCloseContentComponent;
  }

  // Test the directive's type="button" attribute separately with template content
  @Component({
    template: `
      <button
        data-testid="trigger"
        [comPopoverTrigger]="content"
      >
        Open
      </button>
      <ng-template #content>
        <div>
          <p>Are you sure?</p>
          <button data-testid="close-btn" comPopoverClose>Close</button>
        </div>
      </ng-template>
    `,
    imports: [PopoverTriggerDirective, PopoverCloseDirective],
  })
  class PopoverCloseWithTemplateComponent {}

  describe('with component content', () => {
    let fixture: ComponentFixture<PopoverCloseWithComponentComponent>;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [PopoverCloseWithComponentComponent, TestCloseContentComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(PopoverCloseWithComponentComponent);
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should close popover when clicked', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      let panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeTruthy();

      const closeBtn = overlayContainerElement.querySelector('[data-testid="close-btn"]') as HTMLElement;
      closeBtn.click();
      fixture.detectChanges();
      await fixture.whenStable();
      // Wait for animation (100ms) plus buffer
      await new Promise(resolve => setTimeout(resolve, 200));
      fixture.detectChanges();
      await fixture.whenStable();

      panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeNull();
    });
  });

  describe('with template content', () => {
    let fixture: ComponentFixture<PopoverCloseWithTemplateComponent>;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [PopoverCloseWithTemplateComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(PopoverCloseWithTemplateComponent);
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should have type="button" attribute', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const closeBtn = overlayContainerElement.querySelector('[data-testid="close-btn"]');
      expect(closeBtn?.getAttribute('type')).toBe('button');
    });
  });
});

describe('PopoverTemplateDirective', () => {
  @Component({
    template: `
      <button
        data-testid="trigger"
        [comPopoverTrigger]="helpTemplate.templateRef"
      >
        Help
      </button>
      <ng-template comPopoverTemplate #helpTemplate="comPopoverTemplate">
        <p data-testid="template-content">Help content via directive</p>
      </ng-template>
    `,
    imports: [PopoverTriggerDirective, PopoverTemplateDirective],
  })
  class PopoverTemplateComponent {
    readonly helpTemplate = viewChild.required<PopoverTemplateDirective>('helpTemplate');
  }

  let fixture: ComponentFixture<PopoverTemplateComponent>;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverTemplateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverTemplateComponent);
    overlayContainer = TestBed.inject(OverlayContainer);
    overlayContainerElement = overlayContainer.getContainerElement();
    fixture.detectChanges();
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should render content from template directive', async () => {
    const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
    trigger.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const content = overlayContainerElement.querySelector('[data-testid="template-content"]');
    expect(content?.textContent).toBe('Help content via directive');
  });

  it('should expose templateRef via exportAs', () => {
    const directive = fixture.componentInstance.helpTemplate();
    expect(directive).toBeTruthy();
    expect(directive.templateRef).toBeTruthy();
  });
});

describe('PopoverArrowComponent', () => {
  @Component({
    template: `
      <button
        data-testid="trigger"
        [comPopoverTrigger]="content"
        [popoverShowArrow]="true"
        [popoverPosition]="position()"
      >
        Open
      </button>
      <ng-template #content>
        <p>Content</p>
      </ng-template>
    `,
    imports: [PopoverTriggerDirective],
  })
  class ArrowPositionComponent {
    position = signal<'above' | 'below' | 'left' | 'right'>('below');
  }

  let fixture: ComponentFixture<ArrowPositionComponent>;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrowPositionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArrowPositionComponent);
    overlayContainer = TestBed.inject(OverlayContainer);
    overlayContainerElement = overlayContainer.getContainerElement();
    fixture.detectChanges();
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should render arrow component', async () => {
    const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
    trigger.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const arrow = overlayContainerElement.querySelector('com-popover-arrow');
    expect(arrow).toBeTruthy();
  });

  it('should have aria-hidden on arrow SVG', async () => {
    const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
    trigger.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const svg = overlayContainerElement.querySelector('com-popover-arrow svg');
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should have pointer-events-none class on arrow host', async () => {
    const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
    trigger.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const arrow = overlayContainerElement.querySelector('com-popover-arrow');
    expect(arrow?.classList.contains('pointer-events-none')).toBe(true);
  });
});

describe('PopoverContentComponent', () => {
  @Component({
    template: `
      <button
        data-testid="trigger"
        [comPopoverTrigger]="content"
        [popoverVariant]="variant()"
      >
        Open
      </button>
      <ng-template #content>
        <p>Content</p>
      </ng-template>
    `,
    imports: [PopoverTriggerDirective],
  })
  class VariantPopoverComponent {
    variant = signal<'default' | 'compact' | 'wide' | 'flush'>('default');
  }

  let fixture: ComponentFixture<VariantPopoverComponent>;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariantPopoverComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VariantPopoverComponent);
    overlayContainer = TestBed.inject(OverlayContainer);
    overlayContainerElement = overlayContainer.getContainerElement();
    fixture.detectChanges();
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should render popover content component', async () => {
    const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
    trigger.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const content = overlayContainerElement.querySelector('com-popover-content');
    expect(content).toBeTruthy();
  });

  it('should have role="dialog" on content panel', async () => {
    const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
    trigger.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const dialog = overlayContainerElement.querySelector('[role="dialog"]');
    expect(dialog).toBeTruthy();
  });

  it('should apply data-state attribute for animation', async () => {
    const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
    trigger.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const stateElement = overlayContainerElement.querySelector('[data-state]');
    expect(stateElement?.getAttribute('data-state')).toBe('open');
  });

  it('should apply data-side attribute for positioning', async () => {
    const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
    trigger.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const sideElement = overlayContainerElement.querySelector('[data-side]');
    expect(sideElement).toBeTruthy();
    // The side depends on available space, so just verify the attribute exists
    expect(['top', 'bottom', 'left', 'right']).toContain(sideElement?.getAttribute('data-side'));
  });
});

describe('Popover trigger modes', () => {
  describe('Focus trigger', () => {
    @Component({
      template: `
        <button
          data-testid="trigger"
          [comPopoverTrigger]="content"
          popoverTriggerOn="focus"
        >
          Focus me
        </button>
        <ng-template #content>
          <p>Focus content</p>
        </ng-template>
      `,
      imports: [PopoverTriggerDirective],
    })
    class FocusTriggerComponent {}

    let fixture: ComponentFixture<FocusTriggerComponent>;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [FocusTriggerComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(FocusTriggerComponent);
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should open on focus', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      await fixture.whenStable();

      const panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeTruthy();
    });

    it('should NOT open on click when triggerOn is focus', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeNull();
    });
  });

  describe('Manual trigger', () => {
    @Component({
      template: `
        <button
          data-testid="trigger"
          [comPopoverTrigger]="content"
          popoverTriggerOn="manual"
          [(popoverOpen)]="isOpen"
        >
          Controlled
        </button>
        <button data-testid="external-toggle" (click)="isOpen.set(!isOpen())">Toggle</button>
        <ng-template #content>
          <p>Manual content</p>
        </ng-template>
      `,
      imports: [PopoverTriggerDirective],
    })
    class ManualTriggerComponent {
      isOpen = signal(false);
    }

    let fixture: ComponentFixture<ManualTriggerComponent>;
    let component: ManualTriggerComponent;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ManualTriggerComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ManualTriggerComponent);
      component = fixture.componentInstance;
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should NOT open on trigger click when triggerOn is manual', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeNull();
    });

    it('should only respond to external control', async () => {
      const toggleBtn = fixture.debugElement.query(By.css('[data-testid="external-toggle"]'));

      // Open via external control
      toggleBtn.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      let panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeTruthy();

      // Close via external control
      toggleBtn.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();
      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 150));
      fixture.detectChanges();

      panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeNull();
    });
  });
});
