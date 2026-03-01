import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'int-menu-api',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">MenuTriggerDirective</h2>
      <p class="mb-4 text-surface-600">
        Selector: <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[comMenuTrigger]</code>
      </p>
      <div class="overflow-x-auto rounded-lg border border-surface-200">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-surface-200 bg-surface-50">
            <tr>
              <th class="px-4 py-3 font-medium text-surface-900">Input</th>
              <th class="px-4 py-3 font-medium text-surface-900">Type</th>
              <th class="px-4 py-3 font-medium text-surface-900">Default</th>
              <th class="px-4 py-3 font-medium text-surface-900">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-200">
            <tr>
              <td class="px-4 py-3 font-mono text-xs">comMenuTrigger</td>
              <td class="px-4 py-3 font-mono text-xs">TemplateRef</td>
              <td class="px-4 py-3 text-surface-500">required</td>
              <td class="px-4 py-3 text-surface-600">Template containing the menu</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">menuPosition</td>
              <td class="px-4 py-3 font-mono text-xs">'above' | 'below' | 'left' | 'right'</td>
              <td class="px-4 py-3 font-mono text-xs">'below'</td>
              <td class="px-4 py-3 text-surface-600">Preferred position direction</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">menuAlignment</td>
              <td class="px-4 py-3 font-mono text-xs">'start' | 'center' | 'end'</td>
              <td class="px-4 py-3 font-mono text-xs">'start'</td>
              <td class="px-4 py-3 text-surface-600">Alignment along cross-axis</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">menuOffset</td>
              <td class="px-4 py-3 font-mono text-xs">number</td>
              <td class="px-4 py-3 font-mono text-xs">4</td>
              <td class="px-4 py-3 text-surface-600">Gap in px between trigger and menu</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">menuDisabled</td>
              <td class="px-4 py-3 font-mono text-xs">boolean</td>
              <td class="px-4 py-3 font-mono text-xs">false</td>
              <td class="px-4 py-3 text-surface-600">Prevents opening</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">menuOpen</td>
              <td class="px-4 py-3 font-mono text-xs">boolean</td>
              <td class="px-4 py-3 font-mono text-xs">false</td>
              <td class="px-4 py-3 text-surface-600">Two-way bindable open state</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">menuCloseOnSelect</td>
              <td class="px-4 py-3 font-mono text-xs">boolean</td>
              <td class="px-4 py-3 font-mono text-xs">true</td>
              <td class="px-4 py-3 text-surface-600">Close menu when an item is selected</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="mb-3 mt-6 text-lg font-medium text-surface-900">Outputs</h3>
      <div class="overflow-x-auto rounded-lg border border-surface-200">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-surface-200 bg-surface-50">
            <tr>
              <th class="px-4 py-3 font-medium text-surface-900">Output</th>
              <th class="px-4 py-3 font-medium text-surface-900">Type</th>
              <th class="px-4 py-3 font-medium text-surface-900">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-200">
            <tr>
              <td class="px-4 py-3 font-mono text-xs">menuOpened</td>
              <td class="px-4 py-3 font-mono text-xs">void</td>
              <td class="px-4 py-3 text-surface-600">Emitted after menu opens</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">menuClosed</td>
              <td class="px-4 py-3 font-mono text-xs">void</td>
              <td class="px-4 py-3 text-surface-600">Emitted after menu closes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="mb-3 mt-6 text-lg font-medium text-surface-900">Methods</h3>
      <div class="overflow-x-auto rounded-lg border border-surface-200">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-surface-200 bg-surface-50">
            <tr>
              <th class="px-4 py-3 font-medium text-surface-900">Method</th>
              <th class="px-4 py-3 font-medium text-surface-900">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-200">
            <tr>
              <td class="px-4 py-3 font-mono text-xs">open()</td>
              <td class="px-4 py-3 text-surface-600">Programmatically open the menu</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">close()</td>
              <td class="px-4 py-3 text-surface-600">Programmatically close the menu</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">toggle()</td>
              <td class="px-4 py-3 text-surface-600">Toggle the menu open/close state</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">MenuComponent</h2>
      <p class="mb-4 text-surface-600">
        Selector: <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">com-menu</code>
      </p>
      <div class="overflow-x-auto rounded-lg border border-surface-200">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-surface-200 bg-surface-50">
            <tr>
              <th class="px-4 py-3 font-medium text-surface-900">Input</th>
              <th class="px-4 py-3 font-medium text-surface-900">Type</th>
              <th class="px-4 py-3 font-medium text-surface-900">Default</th>
              <th class="px-4 py-3 font-medium text-surface-900">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-200">
            <tr>
              <td class="px-4 py-3 font-mono text-xs">menuSize</td>
              <td class="px-4 py-3 font-mono text-xs">'sm' | 'md' | 'lg'</td>
              <td class="px-4 py-3 font-mono text-xs">'md'</td>
              <td class="px-4 py-3 text-surface-600">Size variant for items</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">menuVariant</td>
              <td class="px-4 py-3 font-mono text-xs">'default' | 'compact'</td>
              <td class="px-4 py-3 font-mono text-xs">'default'</td>
              <td class="px-4 py-3 text-surface-600">Spacing density</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">ariaLabel</td>
              <td class="px-4 py-3 font-mono text-xs">string | null</td>
              <td class="px-4 py-3 font-mono text-xs">null</td>
              <td class="px-4 py-3 text-surface-600">Accessible label</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">MenuItemDirective</h2>
      <p class="mb-4 text-surface-600">
        Selector: <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[comMenuItem]</code>
      </p>
      <div class="overflow-x-auto rounded-lg border border-surface-200">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-surface-200 bg-surface-50">
            <tr>
              <th class="px-4 py-3 font-medium text-surface-900">Input</th>
              <th class="px-4 py-3 font-medium text-surface-900">Type</th>
              <th class="px-4 py-3 font-medium text-surface-900">Default</th>
              <th class="px-4 py-3 font-medium text-surface-900">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-200">
            <tr>
              <td class="px-4 py-3 font-mono text-xs">menuItemDisabled</td>
              <td class="px-4 py-3 font-mono text-xs">boolean</td>
              <td class="px-4 py-3 font-mono text-xs">false</td>
              <td class="px-4 py-3 text-surface-600">Disables the item</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">destructive</td>
              <td class="px-4 py-3 font-mono text-xs">boolean</td>
              <td class="px-4 py-3 font-mono text-xs">false</td>
              <td class="px-4 py-3 text-surface-600">Marks as destructive action</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="mb-3 mt-6 text-lg font-medium text-surface-900">Outputs</h3>
      <div class="overflow-x-auto rounded-lg border border-surface-200">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-surface-200 bg-surface-50">
            <tr>
              <th class="px-4 py-3 font-medium text-surface-900">Output</th>
              <th class="px-4 py-3 font-medium text-surface-900">Type</th>
              <th class="px-4 py-3 font-medium text-surface-900">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-200">
            <tr>
              <td class="px-4 py-3 font-mono text-xs">menuItemSelect</td>
              <td class="px-4 py-3 font-mono text-xs">void</td>
              <td class="px-4 py-3 text-surface-600">Emitted when item is activated</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">MenuItemCheckboxComponent</h2>
      <p class="mb-4 text-surface-600">
        Selector:
        <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[comMenuItemCheckbox]</code>
      </p>
      <div class="overflow-x-auto rounded-lg border border-surface-200">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-surface-200 bg-surface-50">
            <tr>
              <th class="px-4 py-3 font-medium text-surface-900">Input</th>
              <th class="px-4 py-3 font-medium text-surface-900">Type</th>
              <th class="px-4 py-3 font-medium text-surface-900">Default</th>
              <th class="px-4 py-3 font-medium text-surface-900">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-200">
            <tr>
              <td class="px-4 py-3 font-mono text-xs">menuItemDisabled</td>
              <td class="px-4 py-3 font-mono text-xs">boolean</td>
              <td class="px-4 py-3 font-mono text-xs">false</td>
              <td class="px-4 py-3 text-surface-600">Disables the item</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">checked</td>
              <td class="px-4 py-3 font-mono text-xs">boolean</td>
              <td class="px-4 py-3 font-mono text-xs">false</td>
              <td class="px-4 py-3 text-surface-600">Two-way bindable checked state</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">MenuItemRadioComponent</h2>
      <p class="mb-4 text-surface-600">
        Selector:
        <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[comMenuItemRadio]</code>
      </p>
      <div class="overflow-x-auto rounded-lg border border-surface-200">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-surface-200 bg-surface-50">
            <tr>
              <th class="px-4 py-3 font-medium text-surface-900">Input</th>
              <th class="px-4 py-3 font-medium text-surface-900">Type</th>
              <th class="px-4 py-3 font-medium text-surface-900">Default</th>
              <th class="px-4 py-3 font-medium text-surface-900">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-200">
            <tr>
              <td class="px-4 py-3 font-mono text-xs">value</td>
              <td class="px-4 py-3 font-mono text-xs">unknown</td>
              <td class="px-4 py-3 text-surface-500">required</td>
              <td class="px-4 py-3 text-surface-600">The value this item represents</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">menuItemDisabled</td>
              <td class="px-4 py-3 font-mono text-xs">boolean</td>
              <td class="px-4 py-3 font-mono text-xs">false</td>
              <td class="px-4 py-3 text-surface-600">Disables the item</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">MenuGroupDirective</h2>
      <p class="mb-4 text-surface-600">
        Selector: <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[comMenuGroup]</code>
      </p>
      <div class="overflow-x-auto rounded-lg border border-surface-200">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-surface-200 bg-surface-50">
            <tr>
              <th class="px-4 py-3 font-medium text-surface-900">Input</th>
              <th class="px-4 py-3 font-medium text-surface-900">Type</th>
              <th class="px-4 py-3 font-medium text-surface-900">Default</th>
              <th class="px-4 py-3 font-medium text-surface-900">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-200">
            <tr>
              <td class="px-4 py-3 font-mono text-xs">groupValue</td>
              <td class="px-4 py-3 font-mono text-xs">unknown</td>
              <td class="px-4 py-3 font-mono text-xs">undefined</td>
              <td class="px-4 py-3 text-surface-600">Two-way bindable selected value for radio groups</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">ariaLabel</td>
              <td class="px-4 py-3 font-mono text-xs">string | null</td>
              <td class="px-4 py-3 font-mono text-xs">null</td>
              <td class="px-4 py-3 text-surface-600">Accessible label for the group</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Other Directives</h2>

      <h3 class="mb-3 mt-6 text-lg font-medium text-surface-900">MenuLabelDirective</h3>
      <p class="mb-2 text-surface-600">
        Selector: <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[comMenuLabel]</code>
        — Non-interactive section header
      </p>

      <h3 class="mb-3 mt-6 text-lg font-medium text-surface-900">MenuDividerDirective</h3>
      <p class="mb-2 text-surface-600">
        Selector: <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[comMenuDivider]</code>
        — Visual separator between sections
      </p>

      <h3 class="mb-3 mt-6 text-lg font-medium text-surface-900">MenuShortcutDirective</h3>
      <p class="mb-2 text-surface-600">
        Selector: <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[comMenuShortcut]</code>
        — Keyboard shortcut hint
      </p>

      <h3 class="mb-3 mt-6 text-lg font-medium text-surface-900">MenuSubTriggerComponent</h3>
      <p class="mb-2 text-surface-600">
        Selector:
        <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[comMenuSubTrigger]</code>
        — Item that opens a nested submenu
      </p>
      <div class="mt-4 overflow-x-auto rounded-lg border border-surface-200">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-surface-200 bg-surface-50">
            <tr>
              <th class="px-4 py-3 font-medium text-surface-900">Input</th>
              <th class="px-4 py-3 font-medium text-surface-900">Type</th>
              <th class="px-4 py-3 font-medium text-surface-900">Default</th>
              <th class="px-4 py-3 font-medium text-surface-900">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-200">
            <tr>
              <td class="px-4 py-3 font-mono text-xs">comMenuSubTrigger</td>
              <td class="px-4 py-3 font-mono text-xs">TemplateRef</td>
              <td class="px-4 py-3 text-surface-500">required</td>
              <td class="px-4 py-3 text-surface-600">Template containing the submenu</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">subMenuOpenDelay</td>
              <td class="px-4 py-3 font-mono text-xs">number</td>
              <td class="px-4 py-3 font-mono text-xs">200</td>
              <td class="px-4 py-3 text-surface-600">Hover delay before submenu opens (ms)</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">subMenuCloseDelay</td>
              <td class="px-4 py-3 font-mono text-xs">number</td>
              <td class="px-4 py-3 font-mono text-xs">150</td>
              <td class="px-4 py-3 text-surface-600">Hover delay before submenu closes (ms)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Keyboard Navigation</h2>
      <div class="overflow-x-auto rounded-lg border border-surface-200">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-surface-200 bg-surface-50">
            <tr>
              <th class="px-4 py-3 font-medium text-surface-900">Key</th>
              <th class="px-4 py-3 font-medium text-surface-900">Behavior</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-200">
            <tr>
              <td class="px-4 py-3 font-mono text-xs">ArrowDown</td>
              <td class="px-4 py-3 text-surface-600">Move focus to next item (wraps)</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">ArrowUp</td>
              <td class="px-4 py-3 text-surface-600">Move focus to previous item (wraps)</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">Home</td>
              <td class="px-4 py-3 text-surface-600">Move focus to first item</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">End</td>
              <td class="px-4 py-3 text-surface-600">Move focus to last item</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">Enter / Space</td>
              <td class="px-4 py-3 text-surface-600">Activate focused item</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">ArrowRight</td>
              <td class="px-4 py-3 text-surface-600">Open submenu (if present)</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">ArrowLeft</td>
              <td class="px-4 py-3 text-surface-600">Close submenu, return to parent</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">Escape</td>
              <td class="px-4 py-3 text-surface-600">Close current menu level</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-xs">Type-ahead</td>
              <td class="px-4 py-3 text-surface-600">Jump to item starting with typed character</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
})
export class MenuApi {}
