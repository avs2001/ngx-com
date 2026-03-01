import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComButton } from 'ngx-com/components/button';
import { ComCard } from 'ngx-com/components/card';
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
    MenuTriggerDirective,
    MenuComponent,
    MenuItemDirective,
    MenuDividerDirective,
    CodeBlock,
  ],
  template: `
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Introduction</h2>
      <p class="mb-4 text-surface-600">
        The Menu component provides a dropdown menu system with full keyboard navigation, nested
        submenus, and various item types. It builds on top of the CDK overlay and FocusKeyManager
        for accessibility.
      </p>
    </section>

    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Basic Usage</h2>
      <p class="mb-4 text-surface-600">
        Apply the <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">comMenuTrigger</code>
        directive to a button and provide a template containing the menu.
      </p>
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
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Features</h2>
      <ul class="list-inside list-disc space-y-2 text-surface-600">
        <li>Full keyboard navigation (Arrow keys, Home, End, type-ahead search)</li>
        <li>Nested submenus with hover and keyboard support</li>
        <li>Checkbox and radio menu items with two-way binding</li>
        <li>Section labels and dividers</li>
        <li>Destructive item styling</li>
        <li>Keyboard shortcut hints</li>
        <li>WAI-ARIA compliant roles and attributes</li>
        <li>Three size variants (sm, md, lg)</li>
      </ul>
    </section>

    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Import</h2>
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
