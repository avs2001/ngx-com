import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComButton } from 'ngx-com/components/button';
import {
  MenuTriggerDirective,
  MenuComponent,
  MenuItemDirective,
  MenuItemCheckboxComponent,
  MenuItemRadioComponent,
  MenuGroupDirective,
  MenuLabelDirective,
  MenuDividerDirective,
  MenuShortcutDirective,
  MenuSubIndicatorComponent,
  type MenuSize,
} from 'ngx-com/components/menu';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-menu-examples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ComButton,
    MenuTriggerDirective,
    MenuComponent,
    MenuItemDirective,
    MenuItemCheckboxComponent,
    MenuItemRadioComponent,
    MenuGroupDirective,
    MenuLabelDirective,
    MenuDividerDirective,
    MenuShortcutDirective,
    MenuSubIndicatorComponent,
    CodeBlock,
  ],
  template: `
    <!-- With Icons and Shortcuts -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Icons & Keyboard Shortcuts</h2>
      <p class="mb-4 text-surface-600">
        Add icons before content and keyboard shortcut hints at the end.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <button comButton variant="outline" [comMenuTrigger]="fileMenu">File</button>
        <ng-template #fileMenu>
          <com-menu>
            <button comMenuItem>
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
              New File
              <span comMenuShortcut>&#8984;N</span>
            </button>
            <button comMenuItem>
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
              Open...
              <span comMenuShortcut>&#8984;O</span>
            </button>
            <hr comMenuDivider />
            <button comMenuItem>
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              Save
              <span comMenuShortcut>&#8984;S</span>
            </button>
            <button comMenuItem>
              Save As...
              <span comMenuShortcut>&#8679;&#8984;S</span>
            </button>
          </com-menu>
        </ng-template>
      </div>
      <int-code-block class="mt-4" language="html" [code]="shortcutsCode" />
    </section>

    <!-- Section Labels -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Section Labels</h2>
      <p class="mb-4 text-surface-600">
        Use labels to group related menu items into sections.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <button comButton variant="outline" [comMenuTrigger]="orgMenu">Organization</button>
        <ng-template #orgMenu>
          <com-menu>
            <span comMenuLabel>Team</span>
            <button comMenuItem>View Members</button>
            <button comMenuItem>Invite People</button>
            <hr comMenuDivider />
            <span comMenuLabel>Settings</span>
            <button comMenuItem>Preferences</button>
            <button comMenuItem>Billing</button>
          </com-menu>
        </ng-template>
      </div>
      <int-code-block class="mt-4" language="html" [code]="labelsCode" />
    </section>

    <!-- Checkbox Items -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Checkbox Items</h2>
      <p class="mb-4 text-surface-600">
        Toggle options on/off with checkbox items. State: sidebar={{ showSidebar() }}, minimap={{
        showMinimap() }}, statusBar={{ showStatusBar() }}
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <button comButton variant="outline" [comMenuTrigger]="viewMenu">View</button>
        <ng-template #viewMenu>
          <com-menu>
            <span comMenuLabel>Show</span>
            <button comMenuItemCheckbox [(checked)]="showSidebar">Sidebar</button>
            <button comMenuItemCheckbox [(checked)]="showMinimap">Minimap</button>
            <button comMenuItemCheckbox [(checked)]="showStatusBar">Status Bar</button>
            <hr comMenuDivider />
            <button comMenuItemCheckbox [(checked)]="wordWrap">Word Wrap</button>
          </com-menu>
        </ng-template>
      </div>
      <int-code-block class="mt-4" language="html" [code]="checkboxCode" />
    </section>

    <!-- Radio Items -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Radio Items</h2>
      <p class="mb-4 text-surface-600">
        Single selection within a group. Sort by: {{ sortField() }}, order: {{ sortOrder() }}
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <button comButton variant="outline" [comMenuTrigger]="sortMenu">Sort By</button>
        <ng-template #sortMenu>
          <com-menu>
            <div comMenuGroup [(groupValue)]="sortField">
              <button comMenuItemRadio value="name">Name</button>
              <button comMenuItemRadio value="date">Date Modified</button>
              <button comMenuItemRadio value="size">Size</button>
              <button comMenuItemRadio value="type">Type</button>
            </div>
            <hr comMenuDivider />
            <div comMenuGroup [(groupValue)]="sortOrder">
              <button comMenuItemRadio value="asc">Ascending</button>
              <button comMenuItemRadio value="desc">Descending</button>
            </div>
          </com-menu>
        </ng-template>
      </div>
      <int-code-block class="mt-4" language="html" [code]="radioCode" />
    </section>

    <!-- Nested Submenus -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Nested Submenus</h2>
      <p class="mb-4 text-surface-600">
        Open nested menus on hover or with arrow keys. Use the same
        <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">comMenuTrigger</code> directive
        on a <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">comMenuItem</code>.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <button comButton variant="outline" [comMenuTrigger]="mainMenu">Actions</button>
        <ng-template #mainMenu>
          <com-menu>
            <button comMenuItem>New File</button>
            <button comMenuItem>Open Recent</button>
            <button comMenuItem [comMenuTrigger]="shareMenu">
              Share
              <com-menu-sub-indicator />
            </button>
            <hr comMenuDivider />
            <button comMenuItem>Settings</button>
          </com-menu>
        </ng-template>
        <ng-template #shareMenu>
          <com-menu>
            <button comMenuItem (menuItemSelect)="onShare('email')">Email</button>
            <button comMenuItem (menuItemSelect)="onShare('link')">Copy Link</button>
            <button comMenuItem [comMenuTrigger]="socialMenu">
              Social Media
              <com-menu-sub-indicator />
            </button>
          </com-menu>
        </ng-template>
        <ng-template #socialMenu>
          <com-menu>
            <button comMenuItem (menuItemSelect)="onShare('twitter')">Twitter</button>
            <button comMenuItem (menuItemSelect)="onShare('linkedin')">LinkedIn</button>
            <button comMenuItem (menuItemSelect)="onShare('facebook')">Facebook</button>
          </com-menu>
        </ng-template>
      </div>
      <int-code-block class="mt-4" language="html" [code]="submenuCode" />
    </section>

    <!-- Disabled Items -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Disabled Items</h2>
      <p class="mb-4 text-surface-600">
        Disable items that are not currently available.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <button comButton variant="outline" [comMenuTrigger]="editMenu">Edit</button>
        <ng-template #editMenu>
          <com-menu>
            <button comMenuItem>
              Cut
              <span comMenuShortcut>&#8984;X</span>
            </button>
            <button comMenuItem>
              Copy
              <span comMenuShortcut>&#8984;C</span>
            </button>
            <button comMenuItem [menuItemDisabled]="!hasClipboard">
              Paste
              <span comMenuShortcut>&#8984;V</span>
            </button>
          </com-menu>
        </ng-template>
        <button comButton variant="ghost" size="sm" class="ml-4" (click)="hasClipboard = !hasClipboard">
          Toggle Clipboard ({{ hasClipboard ? 'has content' : 'empty' }})
        </button>
      </div>
      <int-code-block class="mt-4" language="html" [code]="disabledCode" />
    </section>

    <!-- Size Variants -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Size Variants</h2>
      <p class="mb-4 text-surface-600">
        Three size options: small, medium (default), and large.
      </p>
      <div class="flex gap-4 rounded-xl border border-surface-200 bg-white p-8">
        @for (size of sizes; track size) {
          <button comButton variant="outline" size="sm" [comMenuTrigger]="sizeMenu">
            {{ size }}
          </button>
          <ng-template #sizeMenu>
            <com-menu [menuSize]="size">
              <button comMenuItem>Item One</button>
              <button comMenuItem>Item Two</button>
              <button comMenuItem>Item Three</button>
            </com-menu>
          </ng-template>
        }
      </div>
      <int-code-block class="mt-4" language="html" [code]="sizeCode" />
    </section>

    <!-- Position & Alignment -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Position & Alignment</h2>
      <p class="mb-4 text-surface-600">
        Control menu placement relative to the trigger.
      </p>
      <div class="flex flex-wrap gap-4 rounded-xl border border-surface-200 bg-white p-8">
        <button
          comButton
          variant="outline"
          [comMenuTrigger]="posMenu1"
          menuPosition="below"
          menuAlignment="start"
        >
          Below / Start
        </button>
        <ng-template #posMenu1>
          <com-menu>
            <button comMenuItem>Option A</button>
            <button comMenuItem>Option B</button>
          </com-menu>
        </ng-template>

        <button
          comButton
          variant="outline"
          [comMenuTrigger]="posMenu2"
          menuPosition="below"
          menuAlignment="end"
        >
          Below / End
        </button>
        <ng-template #posMenu2>
          <com-menu>
            <button comMenuItem>Option A</button>
            <button comMenuItem>Option B</button>
          </com-menu>
        </ng-template>

        <button
          comButton
          variant="outline"
          [comMenuTrigger]="posMenu3"
          menuPosition="above"
          menuAlignment="start"
        >
          Above / Start
        </button>
        <ng-template #posMenu3>
          <com-menu>
            <button comMenuItem>Option A</button>
            <button comMenuItem>Option B</button>
          </com-menu>
        </ng-template>
      </div>
      <int-code-block class="mt-4" language="html" [code]="positionCode" />
    </section>

    <!-- Programmatic Control -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Programmatic Control</h2>
      <p class="mb-4 text-surface-600">
        Use template reference to open/close/toggle the menu programmatically.
      </p>
      <div class="flex gap-4 rounded-xl border border-surface-200 bg-white p-8">
        <button
          comButton
          variant="outline"
          [comMenuTrigger]="ctrlMenu"
          #menuTrigger="comMenuTrigger"
        >
          Target
        </button>
        <ng-template #ctrlMenu>
          <com-menu>
            <button comMenuItem>Action One</button>
            <button comMenuItem>Action Two</button>
          </com-menu>
        </ng-template>
        <button comButton variant="ghost" size="sm" (click)="menuTrigger.open()">Open</button>
        <button comButton variant="ghost" size="sm" (click)="menuTrigger.close()">Close</button>
        <button comButton variant="ghost" size="sm" (click)="menuTrigger.toggle()">Toggle</button>
      </div>
      <int-code-block class="mt-4" language="html" [code]="programmaticCode" />
    </section>
  `,
})
export class MenuExamples {
  protected readonly sizes: MenuSize[] = ['sm', 'md', 'lg'];

  // Checkbox state
  protected readonly showSidebar = signal(true);
  protected readonly showMinimap = signal(false);
  protected readonly showStatusBar = signal(true);
  protected readonly wordWrap = signal(false);

  // Radio state
  protected readonly sortField = signal<string>('name');
  protected readonly sortOrder = signal<string>('asc');

  // Disabled state
  protected hasClipboard = false;

  protected onShare(platform: string): void {
    console.log('Share via:', platform);
  }

  protected readonly shortcutsCode = `<button comButton [comMenuTrigger]="menu">File</button>
<ng-template #menu>
  <com-menu>
    <button comMenuItem>
      <svg><!-- icon --></svg>
      New File
      <span comMenuShortcut>\u2318N</span>
    </button>
    <button comMenuItem>
      Save
      <span comMenuShortcut>\u2318S</span>
    </button>
  </com-menu>
</ng-template>`;

  protected readonly labelsCode = `<com-menu>
  <span comMenuLabel>Team</span>
  <button comMenuItem>View Members</button>
  <button comMenuItem>Invite People</button>
  <hr comMenuDivider />
  <span comMenuLabel>Settings</span>
  <button comMenuItem>Preferences</button>
</com-menu>`;

  protected readonly checkboxCode = `<com-menu>
  <button comMenuItemCheckbox [(checked)]="showSidebar">Sidebar</button>
  <button comMenuItemCheckbox [(checked)]="showMinimap">Minimap</button>
</com-menu>`;

  protected readonly radioCode = `<com-menu>
  <div comMenuGroup [(groupValue)]="sortField">
    <button comMenuItemRadio value="name">Name</button>
    <button comMenuItemRadio value="date">Date</button>
    <button comMenuItemRadio value="size">Size</button>
  </div>
</com-menu>`;

  protected readonly submenuCode = `<button comButton [comMenuTrigger]="mainMenu">Actions</button>
<ng-template #mainMenu>
  <com-menu>
    <button comMenuItem>New File</button>
    <button comMenuItem [comMenuTrigger]="shareMenu">
      Share
      <com-menu-sub-indicator />
    </button>
  </com-menu>
</ng-template>
<ng-template #shareMenu>
  <com-menu>
    <button comMenuItem>Email</button>
    <button comMenuItem>Copy Link</button>
  </com-menu>
</ng-template>`;

  protected readonly disabledCode = `<button comMenuItem [menuItemDisabled]="!hasClipboard">
  Paste
  <span comMenuShortcut>\u2318V</span>
</button>`;

  protected readonly sizeCode = `<com-menu menuSize="sm">...</com-menu>
<com-menu menuSize="md">...</com-menu>
<com-menu menuSize="lg">...</com-menu>`;

  protected readonly positionCode = `<button
  [comMenuTrigger]="menu"
  menuPosition="below"
  menuAlignment="end"
>
  Options
</button>`;

  protected readonly programmaticCode = `<button
  [comMenuTrigger]="menu"
  #menuTrigger="comMenuTrigger"
>
  Target
</button>

<button (click)="menuTrigger.open()">Open</button>
<button (click)="menuTrigger.close()">Close</button>
<button (click)="menuTrigger.toggle()">Toggle</button>`;
}
