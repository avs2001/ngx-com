import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { MenuComponent } from './menu.component';
import { MenuTriggerDirective } from './menu-trigger.directive';
import { MenuItemDirective } from './menu-item.directive';
import { MenuItemCheckboxComponent } from './menu-item-checkbox.component';
import { MenuItemRadioComponent } from './menu-item-radio.component';
import { MenuGroupDirective } from './menu-group.directive';
import { MenuLabelDirective } from './menu-label.directive';
import { MenuDividerDirective } from './menu-divider.directive';
import { MenuSubIndicatorComponent } from './menu-sub-indicator.component';
import { MenuShortcutDirective } from './menu-shortcut.directive';

describe('Menu Components', () => {
  describe('Basic Menu', () => {
    @Component({
      template: `
        <button
          data-testid="trigger"
          [comMenuTrigger]="menuTemplate"
          [menuDisabled]="disabled()"
        >
          Open Menu
        </button>
        <ng-template #menuTemplate>
          <com-menu [ariaLabel]="'Test Menu'">
            <button data-testid="item-1" comMenuItem (menuItemSelect)="onSelect('item1')">Item 1</button>
            <button data-testid="item-2" comMenuItem (menuItemSelect)="onSelect('item2')">Item 2</button>
            <button data-testid="item-3" comMenuItem [menuItemDisabled]="true">Disabled Item</button>
          </com-menu>
        </ng-template>
      `,
      imports: [
        MenuComponent,
        MenuTriggerDirective,
        MenuItemDirective,
      ],
    })
    class BasicMenuComponent {
      disabled = signal(false);
      selectedItem: string | null = null;

      onSelect(item: string): void {
        this.selectedItem = item;
      }
    }

    let fixture: ComponentFixture<BasicMenuComponent>;
    let component: BasicMenuComponent;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BasicMenuComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(BasicMenuComponent);
      component = fixture.componentInstance;
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should create the menu trigger', () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      expect(trigger).toBeTruthy();
    });

    it('should have aria-haspopup on trigger', () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      expect(trigger.attributes['aria-haspopup']).toBe('menu');
    });

    it('should have aria-expanded false initially', () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      expect(trigger.attributes['aria-expanded']).toBe('false');
    });

    it('should open menu on click', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const menu = overlayContainerElement.querySelector('[role="menu"]');
      expect(menu).toBeTruthy();
    });

    it('should update aria-expanded when menu is open', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(trigger.attributes['aria-expanded']).toBe('true');
    });

    it('should have aria-label on menu', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const menu = overlayContainerElement.querySelector('[role="menu"]');
      expect(menu?.getAttribute('aria-label')).toBe('Test Menu');
    });

    it('should render menu items with role=menuitem', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const items = overlayContainerElement.querySelectorAll('[role="menuitem"]');
      expect(items.length).toBe(3);
    });

    it('should close menu on backdrop click', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop') as HTMLElement;
      backdrop?.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const menu = overlayContainerElement.querySelector('[role="menu"]');
      expect(menu).toBeNull();
    });

    it('should emit menuItemSelect on item click', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const item1 = overlayContainerElement.querySelector('[data-testid="item-1"]') as HTMLElement;
      item1.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.selectedItem).toBe('item1');
    });

    it('should close menu after item selection by default', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const item1 = overlayContainerElement.querySelector('[data-testid="item-1"]') as HTMLElement;
      item1.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const menu = overlayContainerElement.querySelector('[role="menu"]');
      expect(menu).toBeNull();
    });

    it('should not open when disabled', async () => {
      component.disabled.set(true);
      fixture.detectChanges();

      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const menu = overlayContainerElement.querySelector('[role="menu"]');
      expect(menu).toBeNull();
    });

    it('should have aria-disabled on disabled items', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const disabledItem = overlayContainerElement.querySelector('[data-testid="item-3"]');
      expect(disabledItem?.getAttribute('aria-disabled')).toBe('true');
    });

    it('should not emit menuItemSelect on disabled item click', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const disabledItem = overlayContainerElement.querySelector('[data-testid="item-3"]') as HTMLElement;
      disabledItem.click();
      fixture.detectChanges();

      expect(component.selectedItem).toBeNull();
    });
  });

  describe('Keyboard Navigation', () => {
    @Component({
      template: `
        <button data-testid="trigger" [comMenuTrigger]="menuTemplate">Open Menu</button>
        <ng-template #menuTemplate>
          <com-menu>
            <button data-testid="item-1" comMenuItem>Item 1</button>
            <button data-testid="item-2" comMenuItem>Item 2</button>
            <button data-testid="item-3" comMenuItem>Item 3</button>
          </com-menu>
        </ng-template>
      `,
      imports: [MenuComponent, MenuTriggerDirective, MenuItemDirective],
    })
    class KeyboardMenuComponent {}

    let fixture: ComponentFixture<KeyboardMenuComponent>;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [KeyboardMenuComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(KeyboardMenuComponent);
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should open menu and focus first item on ArrowDown', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      // Wait for deferred focus
      await new Promise(resolve => setTimeout(resolve, 10));

      const menu = overlayContainerElement.querySelector('[role="menu"]');
      expect(menu).toBeTruthy();
    });

    it('should open menu and focus last item on ArrowUp', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      const menu = overlayContainerElement.querySelector('[role="menu"]');
      expect(menu).toBeTruthy();
    });

    it('should close menu on Escape', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const menu = overlayContainerElement.querySelector('[role="menu"]') as HTMLElement;
      menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      expect(overlayContainerElement.querySelector('[role="menu"]')).toBeNull();
    });

    it('should open menu on Enter', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      const menu = overlayContainerElement.querySelector('[role="menu"]');
      expect(menu).toBeTruthy();
    });

    it('should open menu on Space', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      const menu = overlayContainerElement.querySelector('[role="menu"]');
      expect(menu).toBeTruthy();
    });
  });

  describe('Checkbox Menu Items', () => {
    @Component({
      template: `
        <button data-testid="trigger" [comMenuTrigger]="menuTemplate" [menuCloseOnSelect]="false">
          Options
        </button>
        <ng-template #menuTemplate>
          <com-menu>
            <button data-testid="checkbox-1" comMenuItemCheckbox [(checked)]="option1">Option 1</button>
            <button data-testid="checkbox-2" comMenuItemCheckbox [(checked)]="option2">Option 2</button>
            <button data-testid="checkbox-disabled" comMenuItemCheckbox [menuItemDisabled]="true" [(checked)]="option3">
              Disabled
            </button>
          </com-menu>
        </ng-template>
      `,
      imports: [MenuComponent, MenuTriggerDirective, MenuItemCheckboxComponent],
    })
    class CheckboxMenuComponent {
      option1 = signal(false);
      option2 = signal(true);
      option3 = signal(false);
    }

    let fixture: ComponentFixture<CheckboxMenuComponent>;
    let component: CheckboxMenuComponent;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [CheckboxMenuComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(CheckboxMenuComponent);
      component = fixture.componentInstance;
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should render checkbox items with role=menuitemcheckbox', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const checkboxItems = overlayContainerElement.querySelectorAll('[role="menuitemcheckbox"]');
      expect(checkboxItems.length).toBe(3);
    });

    it('should have aria-checked=false for unchecked items', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const checkbox1 = overlayContainerElement.querySelector('[data-testid="checkbox-1"]');
      expect(checkbox1?.getAttribute('aria-checked')).toBe('false');
    });

    it('should have aria-checked=true for checked items', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const checkbox2 = overlayContainerElement.querySelector('[data-testid="checkbox-2"]');
      expect(checkbox2?.getAttribute('aria-checked')).toBe('true');
    });

    it('should toggle checked state on click', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const checkbox1 = overlayContainerElement.querySelector('[data-testid="checkbox-1"]') as HTMLElement;
      checkbox1.click();
      fixture.detectChanges();

      expect(component.option1()).toBe(true);
      expect(checkbox1.getAttribute('aria-checked')).toBe('true');
    });

    it('should not toggle disabled checkbox', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const disabledCheckbox = overlayContainerElement.querySelector('[data-testid="checkbox-disabled"]') as HTMLElement;
      disabledCheckbox.click();
      fixture.detectChanges();

      expect(component.option3()).toBe(false);
    });

    it('should show checkmark when checked', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const checkbox2 = overlayContainerElement.querySelector('[data-testid="checkbox-2"]');
      const checkmark = checkbox2?.querySelector('svg');
      expect(checkmark).toBeTruthy();
    });

    it('should not show checkmark when unchecked', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const checkbox1 = overlayContainerElement.querySelector('[data-testid="checkbox-1"]');
      const checkmark = checkbox1?.querySelector('svg');
      expect(checkmark).toBeNull();
    });

    it('should toggle on Enter key', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const checkbox1 = overlayContainerElement.querySelector('[data-testid="checkbox-1"]') as HTMLElement;
      checkbox1.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      fixture.detectChanges();

      expect(component.option1()).toBe(true);
    });

    it('should toggle on Space key', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const checkbox1 = overlayContainerElement.querySelector('[data-testid="checkbox-1"]') as HTMLElement;
      checkbox1.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      fixture.detectChanges();

      expect(component.option1()).toBe(true);
    });
  });

  describe('Radio Menu Items', () => {
    @Component({
      template: `
        <button data-testid="trigger" [comMenuTrigger]="menuTemplate" [menuCloseOnSelect]="false">
          Sort
        </button>
        <ng-template #menuTemplate>
          <com-menu>
            <div comMenuGroup [(groupValue)]="sortField">
              <button data-testid="radio-name" comMenuItemRadio [value]="'name'">Name</button>
              <button data-testid="radio-date" comMenuItemRadio [value]="'date'">Date</button>
              <button data-testid="radio-size" comMenuItemRadio [value]="'size'">Size</button>
              <button data-testid="radio-disabled" comMenuItemRadio [value]="'disabled'" [menuItemDisabled]="true">
                Disabled
              </button>
            </div>
          </com-menu>
        </ng-template>
      `,
      imports: [
        MenuComponent,
        MenuTriggerDirective,
        MenuItemRadioComponent,
        MenuGroupDirective,
      ],
    })
    class RadioMenuComponent {
      sortField = signal<string>('name');
    }

    let fixture: ComponentFixture<RadioMenuComponent>;
    let component: RadioMenuComponent;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [RadioMenuComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(RadioMenuComponent);
      component = fixture.componentInstance;
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should render radio items with role=menuitemradio', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const radioItems = overlayContainerElement.querySelectorAll('[role="menuitemradio"]');
      expect(radioItems.length).toBe(4);
    });

    it('should render group with role=group', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const group = overlayContainerElement.querySelector('[role="group"]');
      expect(group).toBeTruthy();
    });

    it('should have aria-checked=true for selected item', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const radioName = overlayContainerElement.querySelector('[data-testid="radio-name"]');
      expect(radioName?.getAttribute('aria-checked')).toBe('true');
    });

    it('should have aria-checked=false for unselected items', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const radioDate = overlayContainerElement.querySelector('[data-testid="radio-date"]');
      expect(radioDate?.getAttribute('aria-checked')).toBe('false');
    });

    it('should select item on click', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const radioDate = overlayContainerElement.querySelector('[data-testid="radio-date"]') as HTMLElement;
      radioDate.click();
      fixture.detectChanges();

      expect(component.sortField()).toBe('date');
    });

    it('should update aria-checked after selection', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const radioDate = overlayContainerElement.querySelector('[data-testid="radio-date"]') as HTMLElement;
      radioDate.click();
      fixture.detectChanges();

      const radioName = overlayContainerElement.querySelector('[data-testid="radio-name"]');
      expect(radioName?.getAttribute('aria-checked')).toBe('false');
      expect(radioDate.getAttribute('aria-checked')).toBe('true');
    });

    it('should not select disabled item', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const radioDisabled = overlayContainerElement.querySelector('[data-testid="radio-disabled"]') as HTMLElement;
      radioDisabled.click();
      fixture.detectChanges();

      expect(component.sortField()).toBe('name');
    });

    it('should show indicator when selected', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const radioName = overlayContainerElement.querySelector('[data-testid="radio-name"]');
      const indicator = radioName?.querySelector('svg');
      expect(indicator).toBeTruthy();
    });

    it('should not show indicator when not selected', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const radioDate = overlayContainerElement.querySelector('[data-testid="radio-date"]');
      const indicator = radioDate?.querySelector('svg');
      expect(indicator).toBeNull();
    });
  });

  describe('Menu with Labels and Dividers', () => {
    @Component({
      template: `
        <button data-testid="trigger" [comMenuTrigger]="menuTemplate">Open</button>
        <ng-template #menuTemplate>
          <com-menu>
            <span data-testid="label-1" comMenuLabel>Section 1</span>
            <button comMenuItem>Item 1</button>
            <hr data-testid="divider" comMenuDivider />
            <span data-testid="label-2" comMenuLabel>Section 2</span>
            <button comMenuItem>Item 2</button>
          </com-menu>
        </ng-template>
      `,
      imports: [
        MenuComponent,
        MenuTriggerDirective,
        MenuItemDirective,
        MenuLabelDirective,
        MenuDividerDirective,
      ],
    })
    class LabelDividerMenuComponent {}

    let fixture: ComponentFixture<LabelDividerMenuComponent>;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [LabelDividerMenuComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(LabelDividerMenuComponent);
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should render labels with role=presentation', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const label = overlayContainerElement.querySelector('[data-testid="label-1"]');
      expect(label?.getAttribute('role')).toBe('presentation');
    });

    it('should render dividers with role=separator', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const divider = overlayContainerElement.querySelector('[data-testid="divider"]');
      expect(divider?.getAttribute('role')).toBe('separator');
    });

    it('should generate unique IDs for labels', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const label1 = overlayContainerElement.querySelector('[data-testid="label-1"]');
      const label2 = overlayContainerElement.querySelector('[data-testid="label-2"]');

      expect(label1?.id).toBeTruthy();
      expect(label2?.id).toBeTruthy();
      expect(label1?.id).not.toBe(label2?.id);
    });
  });

  describe('Menu Shortcut', () => {
    @Component({
      template: `
        <button data-testid="trigger" [comMenuTrigger]="menuTemplate">Open</button>
        <ng-template #menuTemplate>
          <com-menu>
            <button comMenuItem>
              Save
              <span data-testid="shortcut" comMenuShortcut>Ctrl+S</span>
            </button>
          </com-menu>
        </ng-template>
      `,
      imports: [
        MenuComponent,
        MenuTriggerDirective,
        MenuItemDirective,
        MenuShortcutDirective,
      ],
    })
    class ShortcutMenuComponent {}

    let fixture: ComponentFixture<ShortcutMenuComponent>;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ShortcutMenuComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ShortcutMenuComponent);
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should render shortcut text', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const shortcut = overlayContainerElement.querySelector('[data-testid="shortcut"]');
      expect(shortcut?.textContent).toBe('Ctrl+S');
    });
  });

  describe('Destructive Menu Item', () => {
    @Component({
      template: `
        <button data-testid="trigger" [comMenuTrigger]="menuTemplate">Open</button>
        <ng-template #menuTemplate>
          <com-menu>
            <button data-testid="destructive" comMenuItem destructive (menuItemSelect)="onDelete()">
              Delete
            </button>
          </com-menu>
        </ng-template>
      `,
      imports: [MenuComponent, MenuTriggerDirective, MenuItemDirective],
    })
    class DestructiveMenuComponent {
      deleted = false;

      onDelete(): void {
        this.deleted = true;
      }
    }

    let fixture: ComponentFixture<DestructiveMenuComponent>;
    let component: DestructiveMenuComponent;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DestructiveMenuComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(DestructiveMenuComponent);
      component = fixture.componentInstance;
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should render destructive item', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const destructiveItem = overlayContainerElement.querySelector('[data-testid="destructive"]');
      expect(destructiveItem).toBeTruthy();
    });

    it('should emit menuItemSelect on click', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const destructiveItem = overlayContainerElement.querySelector('[data-testid="destructive"]') as HTMLElement;
      destructiveItem.click();
      fixture.detectChanges();

      expect(component.deleted).toBe(true);
    });
  });

  describe('Submenu', () => {
    @Component({
      template: `
        <button data-testid="trigger" [comMenuTrigger]="mainMenu">Open</button>
        <ng-template #mainMenu>
          <com-menu>
            <button data-testid="item-1" comMenuItem>Item 1</button>
            <button data-testid="submenu-trigger" comMenuItem [comMenuTrigger]="subMenu" side="right">
              More Options
              <com-menu-sub-indicator />
            </button>
          </com-menu>
        </ng-template>
        <ng-template #subMenu>
          <com-menu>
            <button data-testid="sub-item-1" comMenuItem (menuItemSelect)="onSubSelect('sub1')">Sub Item 1</button>
            <button data-testid="sub-item-2" comMenuItem (menuItemSelect)="onSubSelect('sub2')">Sub Item 2</button>
          </com-menu>
        </ng-template>
      `,
      imports: [
        MenuComponent,
        MenuTriggerDirective,
        MenuItemDirective,
        MenuSubIndicatorComponent,
      ],
    })
    class SubmenuComponent {
      selectedSubItem: string | null = null;

      onSubSelect(item: string): void {
        this.selectedSubItem = item;
      }
    }

    let fixture: ComponentFixture<SubmenuComponent>;
    let component: SubmenuComponent;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SubmenuComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(SubmenuComponent);
      component = fixture.componentInstance;
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should render submenu trigger with sub-indicator', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const submenuTrigger = overlayContainerElement.querySelector('[data-testid="submenu-trigger"]');
      const indicator = submenuTrigger?.querySelector('com-menu-sub-indicator');
      expect(indicator).toBeTruthy();
    });

    it('should open submenu on hover', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const submenuTrigger = overlayContainerElement.querySelector('[data-testid="submenu-trigger"]') as HTMLElement;
      submenuTrigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      fixture.detectChanges();

      // Wait for hover delay (200ms default)
      await new Promise(resolve => setTimeout(resolve, 250));
      fixture.detectChanges();
      await fixture.whenStable();

      const subItems = overlayContainerElement.querySelectorAll('[data-testid^="sub-item"]');
      expect(subItems.length).toBe(2);
    });

    it('should open submenu on ArrowRight', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const submenuTrigger = overlayContainerElement.querySelector('[data-testid="submenu-trigger"]') as HTMLElement;
      submenuTrigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      fixture.detectChanges();
      await fixture.whenStable();

      // Wait for deferred focus
      await new Promise(resolve => setTimeout(resolve, 10));
      fixture.detectChanges();

      const subItems = overlayContainerElement.querySelectorAll('[data-testid^="sub-item"]');
      expect(subItems.length).toBe(2);
    });

    it('should emit selection from submenu item', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const submenuTrigger = overlayContainerElement.querySelector('[data-testid="submenu-trigger"]') as HTMLElement;
      submenuTrigger.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      await new Promise(resolve => setTimeout(resolve, 250));
      fixture.detectChanges();
      await fixture.whenStable();

      const subItem1 = overlayContainerElement.querySelector('[data-testid="sub-item-1"]') as HTMLElement;
      subItem1.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.selectedSubItem).toBe('sub1');
    });
  });

  describe('Menu Positioning', () => {
    @Component({
      template: `
        <button
          data-testid="trigger"
          [comMenuTrigger]="menuTemplate"
          [menuPosition]="position()"
          [menuAlignment]="alignment()"
        >
          Open
        </button>
        <ng-template #menuTemplate>
          <com-menu>
            <button comMenuItem>Item</button>
          </com-menu>
        </ng-template>
      `,
      imports: [MenuComponent, MenuTriggerDirective, MenuItemDirective],
    })
    class PositionMenuComponent {
      position = signal<'above' | 'below'>('below');
      alignment = signal<'start' | 'center' | 'end'>('start');
    }

    let fixture: ComponentFixture<PositionMenuComponent>;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [PositionMenuComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(PositionMenuComponent);
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should open menu with default position', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const menu = overlayContainerElement.querySelector('[role="menu"]');
      expect(menu).toBeTruthy();
    });
  });

  describe('Menu Size Variants', () => {
    @Component({
      template: `
        <button data-testid="trigger" [comMenuTrigger]="menuTemplate">Open</button>
        <ng-template #menuTemplate>
          <com-menu [menuSize]="size()">
            <button data-testid="item" comMenuItem>Item</button>
          </com-menu>
        </ng-template>
      `,
      imports: [MenuComponent, MenuTriggerDirective, MenuItemDirective],
    })
    class SizeMenuComponent {
      size = signal<'sm' | 'md' | 'lg'>('md');
    }

    let fixture: ComponentFixture<SizeMenuComponent>;
    let component: SizeMenuComponent;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SizeMenuComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(SizeMenuComponent);
      component = fixture.componentInstance;
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should apply sm size', async () => {
      component.size.set('sm');
      fixture.detectChanges();

      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const menu = overlayContainerElement.querySelector('[role="menu"]');
      expect(menu).toBeTruthy();
    });

    it('should apply md size', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const menu = overlayContainerElement.querySelector('[role="menu"]');
      expect(menu).toBeTruthy();
    });

    it('should apply lg size', async () => {
      component.size.set('lg');
      fixture.detectChanges();

      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const menu = overlayContainerElement.querySelector('[role="menu"]');
      expect(menu).toBeTruthy();
    });
  });

  describe('Menu Close On Select', () => {
    @Component({
      template: `
        <button data-testid="trigger" [comMenuTrigger]="menuTemplate" [menuCloseOnSelect]="false">
          Open
        </button>
        <ng-template #menuTemplate>
          <com-menu>
            <button data-testid="item" comMenuItem (menuItemSelect)="count = count + 1">Item</button>
          </com-menu>
        </ng-template>
      `,
      imports: [MenuComponent, MenuTriggerDirective, MenuItemDirective],
    })
    class NoCloseMenuComponent {
      count = 0;
    }

    let fixture: ComponentFixture<NoCloseMenuComponent>;
    let component: NoCloseMenuComponent;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [NoCloseMenuComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(NoCloseMenuComponent);
      component = fixture.componentInstance;
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should not close menu on selection when menuCloseOnSelect is false', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const item = overlayContainerElement.querySelector('[data-testid="item"]') as HTMLElement;
      item.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.count).toBe(1);

      const menu = overlayContainerElement.querySelector('[role="menu"]');
      expect(menu).toBeTruthy();
    });
  });

  describe('Menu Programmatic Control', () => {
    @Component({
      template: `
        <button data-testid="trigger" [comMenuTrigger]="menuTemplate" #menuTrigger="comMenuTrigger">
          Open
        </button>
        <button data-testid="open-btn" (click)="menuTrigger.open()">Open Programmatically</button>
        <button data-testid="close-btn" (click)="menuTrigger.close()">Close Programmatically</button>
        <button data-testid="toggle-btn" (click)="menuTrigger.toggle()">Toggle</button>
        <ng-template #menuTemplate>
          <com-menu>
            <button comMenuItem>Item</button>
          </com-menu>
        </ng-template>
      `,
      imports: [MenuComponent, MenuTriggerDirective, MenuItemDirective],
    })
    class ProgrammaticMenuComponent {}

    let fixture: ComponentFixture<ProgrammaticMenuComponent>;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ProgrammaticMenuComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ProgrammaticMenuComponent);
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should open menu programmatically', async () => {
      const openBtn = fixture.debugElement.query(By.css('[data-testid="open-btn"]'));
      openBtn.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const menu = overlayContainerElement.querySelector('[role="menu"]');
      expect(menu).toBeTruthy();
    });

    it('should close menu programmatically', async () => {
      const openBtn = fixture.debugElement.query(By.css('[data-testid="open-btn"]'));
      openBtn.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const closeBtn = fixture.debugElement.query(By.css('[data-testid="close-btn"]'));
      closeBtn.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const menu = overlayContainerElement.querySelector('[role="menu"]');
      expect(menu).toBeNull();
    });

    it('should toggle menu', async () => {
      const toggleBtn = fixture.debugElement.query(By.css('[data-testid="toggle-btn"]'));

      // Toggle open
      toggleBtn.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(overlayContainerElement.querySelector('[role="menu"]')).toBeTruthy();

      // Toggle close
      toggleBtn.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(overlayContainerElement.querySelector('[role="menu"]')).toBeNull();
    });
  });

  describe('Menu Events', () => {
    @Component({
      template: `
        <button
          data-testid="trigger"
          [comMenuTrigger]="menuTemplate"
          (menuOpened)="onOpened()"
          (menuClosed)="onClosed()"
        >
          Open
        </button>
        <ng-template #menuTemplate>
          <com-menu>
            <button comMenuItem>Item</button>
          </com-menu>
        </ng-template>
      `,
      imports: [MenuComponent, MenuTriggerDirective, MenuItemDirective],
    })
    class EventsMenuComponent {
      openedCount = 0;
      closedCount = 0;

      onOpened(): void {
        this.openedCount++;
      }

      onClosed(): void {
        this.closedCount++;
      }
    }

    let fixture: ComponentFixture<EventsMenuComponent>;
    let component: EventsMenuComponent;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [EventsMenuComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(EventsMenuComponent);
      component = fixture.componentInstance;
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should emit menuOpened when menu opens', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.openedCount).toBe(1);
    });

    it('should emit menuClosed when menu closes', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop') as HTMLElement;
      backdrop?.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.closedCount).toBe(1);
    });
  });

  describe('Menu Two-Way Binding', () => {
    @Component({
      template: `
        <button data-testid="trigger" [comMenuTrigger]="menuTemplate" [(menuOpen)]="isOpen">
          Open
        </button>
        <ng-template #menuTemplate>
          <com-menu>
            <button comMenuItem>Item</button>
          </com-menu>
        </ng-template>
      `,
      imports: [MenuComponent, MenuTriggerDirective, MenuItemDirective],
    })
    class TwoWayMenuComponent {
      isOpen = signal(false);
    }

    let fixture: ComponentFixture<TwoWayMenuComponent>;
    let component: TwoWayMenuComponent;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TwoWayMenuComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TwoWayMenuComponent);
      component = fixture.componentInstance;
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should update bound property when menu opens', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.isOpen()).toBe(true);
    });

    it('should update bound property when menu closes', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop') as HTMLElement;
      backdrop?.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.isOpen()).toBe(false);
    });
  });

  describe('Menu Focus Management', () => {
    @Component({
      template: `
        <button data-testid="trigger" [comMenuTrigger]="menuTemplate">Open</button>
        <ng-template #menuTemplate>
          <com-menu>
            <button data-testid="item-1" comMenuItem>Item 1</button>
            <button data-testid="item-2" comMenuItem [menuItemDisabled]="true">Disabled</button>
            <button data-testid="item-3" comMenuItem>Item 3</button>
          </com-menu>
        </ng-template>
      `,
      imports: [MenuComponent, MenuTriggerDirective, MenuItemDirective],
    })
    class FocusMenuComponent {}

    let fixture: ComponentFixture<FocusMenuComponent>;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [FocusMenuComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(FocusMenuComponent);
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should focus item on mouseenter', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const item1 = overlayContainerElement.querySelector('[data-testid="item-1"]') as HTMLElement;
      item1.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      fixture.detectChanges();

      expect(document.activeElement).toBe(item1);
    });

    it('should not focus disabled item on mouseenter', async () => {
      const trigger = fixture.debugElement.query(By.css('[data-testid="trigger"]'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const disabledItem = overlayContainerElement.querySelector('[data-testid="item-2"]') as HTMLElement;
      disabledItem.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      fixture.detectChanges();

      expect(document.activeElement).not.toBe(disabledItem);
    });
  });
});
