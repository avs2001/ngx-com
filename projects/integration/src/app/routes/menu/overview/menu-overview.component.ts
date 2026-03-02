import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComButton } from 'ngx-com/components/button';
import { ComCard } from 'ngx-com/components/card';
import { ComItem } from 'ngx-com/components/item';
import {
  MenuTriggerDirective,
  MenuComponent,
  MenuItemDirective,
  MenuDividerDirective,
} from 'ngx-com/components/menu';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-menu-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ComButton,
    ComCard,
    ComItem,
    MenuTriggerDirective,
    MenuComponent,
    MenuItemDirective,
    MenuDividerDirective,
    CodeBlock,
  ],
  template: `
    <section class="mb-12">
      <com-item
        title="Introduction"
        description="A dropdown menu system with full accessibility support"
        icon="info"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-6">
        <p class="text-foreground">
          The Menu component provides a dropdown menu system with full keyboard navigation, nested
          submenus, and various item types. It builds on top of the CDK overlay and FocusKeyManager
          for accessibility.
        </p>
      </com-card>
    </section>

    <section class="mb-12">
      <com-item
        title="Basic Usage"
        description="Apply comMenuTrigger to a button and provide a menu template"
        icon="code"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="flex gap-4 p-8">
        <button comButton variant="outline" [comMenuTrigger]="basicMenu">Options</button>
        <ng-template #basicMenu>
          <com-menu>
            <button comMenuItem (menuItemSelect)="onAction('Edit')">Edit</button>
            <button comMenuItem (menuItemSelect)="onAction('Duplicate')">Duplicate</button>
            <button comMenuItem (menuItemSelect)="onAction('Archive')">Archive</button>
            <hr comMenuDivider />
            <button comMenuItem destructive (menuItemSelect)="onAction('Delete')">Delete</button>
          </com-menu>
        </ng-template>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="basicCode" />
    </section>

    <section class="mb-12">
      <com-item
        title="Features"
        description="What makes com-menu powerful"
        icon="star"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-3">
        <div class="space-y-1">
          <com-item
            title="Full Keyboard Navigation"
            description="Arrow keys, Home, End, type-ahead search"
            icon="keyboard"
          />
          <com-item
            title="Nested Submenus"
            description="Hover and keyboard support for nested menus"
            icon="git-branch"
            iconColor="accent"
          />
          <com-item
            title="Checkbox & Radio Items"
            description="Two-way binding for checkbox and radio menu items"
            icon="check-square"
          />
          <com-item
            title="Section Labels & Dividers"
            description="Organize menu items with labels and visual separators"
            icon="layout"
            iconColor="accent"
          />
          <com-item
            title="Destructive Styling"
            description="Special styling for dangerous actions like delete"
            icon="alert-triangle"
            iconColor="warn"
          />
          <com-item
            title="Keyboard Shortcuts"
            description="Display keyboard shortcut hints in menu items"
            icon="command"
          />
          <com-item
            title="WAI-ARIA Compliant"
            description="Proper roles and attributes for accessibility"
            icon="accessibility"
            iconColor="accent"
          />
          <com-item
            title="3 Size Variants"
            description="Small, medium, and large sizes for different contexts"
            icon="maximize"
          />
        </div>
      </com-card>
    </section>

    <section>
      <com-item
        title="Import"
        description="How to import menu components"
        icon="package"
        size="lg"
        class="mb-4"
      />
      <int-code-block language="typescript" [code]="importCode" />
    </section>
  `,
})
export class MenuOverview {
  protected onAction(action: string): void {
    console.log('Action:', action);
  }

  protected readonly basicCode = `<button comButton [comMenuTrigger]="menu">Options</button>
<ng-template #menu>
  <com-menu>
    <button comMenuItem (menuItemSelect)="onEdit()">Edit</button>
    <button comMenuItem (menuItemSelect)="onDuplicate()">Duplicate</button>
    <hr comMenuDivider />
    <button comMenuItem destructive>Delete</button>
  </com-menu>
</ng-template>`;

  protected readonly importCode = `import {
  MenuTriggerDirective,
  MenuComponent,
  MenuItemDirective,
  MenuItemCheckboxComponent,
  MenuItemRadioComponent,
  MenuGroupDirective,
  MenuLabelDirective,
  MenuDividerDirective,
  MenuShortcutDirective,
  MenuSubTriggerComponent,
} from 'ngx-com/components/menu';`;
}
