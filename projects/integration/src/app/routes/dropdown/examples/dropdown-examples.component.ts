import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComDropdown, ComDropdownOptionTpl } from 'ngx-com/components/dropdown';
import { CodeBlock } from '../../../shared/code-block';

interface User {
  id: number;
  name: string;
  email: string;
  department: string;
  avatar?: string;
}

@Component({
  selector: 'int-dropdown-examples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComDropdown, ComDropdownOptionTpl, CodeBlock],
  template: `
    <!-- Basic -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Basic Selection</h2>
      <p class="mb-4 text-surface-600">
        Simple dropdown with string options.
      </p>
      <div class="mb-4 rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-col items-center gap-4">
          <com-dropdown
            [options]="fruits()"
            [value]="selectedFruit()"
            placeholder="Select a fruit..."
            class="w-64"
            (valueChange)="onFruitChange($event)"
          />
          @if (selectedFruit()) {
            <p class="text-sm text-surface-600">
              Selected: {{ selectedFruit() }}
            </p>
          }
        </div>
      </div>
      <int-code-block language="typescript" [code]="basicCode" />
    </section>

    <!-- Searchable -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Searchable</h2>
      <p class="mb-4 text-surface-600">
        Enable search to filter options in large lists.
      </p>
      <div class="mb-4 rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-col items-center gap-4">
          <com-dropdown
            [options]="users()"
            [value]="searchableUser()"
            [displayWith]="displayUser"
            [compareWith]="compareUsers"
            [searchable]="true"
            searchPlaceholder="Search users..."
            placeholder="Select a user..."
            class="w-64"
            (valueChange)="onSearchableUserChange($event)"
          />
          @if (searchableUser()) {
            <p class="text-sm text-surface-600">
              Selected: {{ searchableUser()!.name }} ({{ searchableUser()!.email }})
            </p>
          }
        </div>
      </div>
      <int-code-block language="typescript" [code]="searchableCode" />
    </section>

    <!-- Multi-Select -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Multi-Select</h2>
      <p class="mb-4 text-surface-600">
        Select multiple values with tag display.
      </p>
      <div class="mb-4 rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-col items-center gap-4">
          <com-dropdown
            [options]="users()"
            [value]="multiUsers()"
            [displayWith]="displayUser"
            [compareWith]="compareUsers"
            [multiple]="true"
            [searchable]="true"
            placeholder="Select users..."
            class="w-80"
            (valueChange)="onMultiUsersChange($event)"
          />
          @if (multiUsers().length > 0) {
            <p class="text-sm text-surface-600">
              Selected {{ multiUsers().length }} user(s)
            </p>
          }
        </div>
      </div>
      <int-code-block language="typescript" [code]="multiSelectCode" />
    </section>

    <!-- Grouped -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Grouped Options</h2>
      <p class="mb-4 text-surface-600">
        Group options by category using a groupBy function.
      </p>
      <div class="mb-4 rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-col items-center gap-4">
          <com-dropdown
            [options]="users()"
            [value]="groupedUser()"
            [displayWith]="displayUser"
            [compareWith]="compareUsers"
            [groupBy]="groupByDepartment"
            placeholder="Select by department..."
            class="w-64"
            (valueChange)="onGroupedUserChange($event)"
          />
          @if (groupedUser()) {
            <p class="text-sm text-surface-600">
              Selected: {{ groupedUser()!.name }} from {{ groupedUser()!.department }}
            </p>
          }
        </div>
      </div>
      <int-code-block language="typescript" [code]="groupedCode" />
    </section>

    <!-- Custom Template -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Custom Template</h2>
      <p class="mb-4 text-surface-600">
        Use templates for custom option rendering.
      </p>
      <div class="mb-4 rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-col items-center gap-4">
          <com-dropdown
            [options]="users()"
            [value]="templateUser()"
            [displayWith]="displayUser"
            [compareWith]="compareUsers"
            placeholder="Select a user..."
            class="w-72"
            (valueChange)="onTemplateUserChange($event)"
          >
            <ng-template comDropdownOption let-user let-selected="selected">
              <div class="flex items-center gap-3">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-700">
                  {{ user.name.charAt(0) }}
                </div>
                <div class="flex flex-col">
                  <span class="font-medium">{{ user.name }}</span>
                  <span class="text-xs text-surface-500">{{ user.email }}</span>
                </div>
              </div>
            </ng-template>
          </com-dropdown>
          @if (templateUser()) {
            <p class="text-sm text-surface-600">
              Selected: {{ templateUser()!.name }}
            </p>
          }
        </div>
      </div>
      <int-code-block language="typescript" [code]="templateCode" />
    </section>

    <!-- Clearable -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Clearable</h2>
      <p class="mb-4 text-surface-600">
        Show a clear button to reset the selection.
      </p>
      <div class="mb-4 rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-col items-center gap-4">
          <com-dropdown
            [options]="fruits()"
            [value]="clearableFruit()"
            [clearable]="true"
            placeholder="Select a fruit..."
            class="w-64"
            (valueChange)="onClearableFruitChange($event)"
          />
          <p class="text-sm text-surface-500">
            {{ clearableFruit() ? 'Click the X to clear' : 'No selection' }}
          </p>
        </div>
      </div>
      <int-code-block language="html" [code]="clearableCode" />
    </section>

    <!-- Sizes -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Sizes</h2>
      <p class="mb-4 text-surface-600">
        Different size variants for various contexts.
      </p>
      <div class="mb-4 rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-col items-center gap-6">
          <div class="flex flex-col gap-2">
            <span class="text-xs font-medium text-surface-500">Small</span>
            <com-dropdown
              [options]="fruits()"
              size="sm"
              placeholder="Small dropdown"
              class="w-48"
            />
          </div>
          <div class="flex flex-col gap-2">
            <span class="text-xs font-medium text-surface-500">Default</span>
            <com-dropdown
              [options]="fruits()"
              size="default"
              placeholder="Default dropdown"
              class="w-48"
            />
          </div>
          <div class="flex flex-col gap-2">
            <span class="text-xs font-medium text-surface-500">Large</span>
            <com-dropdown
              [options]="fruits()"
              size="lg"
              placeholder="Large dropdown"
              class="w-48"
            />
          </div>
        </div>
      </div>
      <int-code-block language="html" [code]="sizesCode" />
    </section>
  `,
})
export class DropdownExamples {
  // Basic
  protected readonly fruits = signal(['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']);
  protected readonly selectedFruit = signal<string | null>(null);

  // Users data
  protected readonly users = signal<User[]>([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', department: 'Engineering' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', department: 'Design' },
    { id: 3, name: 'Carol Williams', email: 'carol@example.com', department: 'Engineering' },
    { id: 4, name: 'David Brown', email: 'david@example.com', department: 'Marketing' },
    { id: 5, name: 'Emma Davis', email: 'emma@example.com', department: 'Design' },
    { id: 6, name: 'Frank Miller', email: 'frank@example.com', department: 'Engineering' },
    { id: 7, name: 'Grace Lee', email: 'grace@example.com', department: 'Marketing' },
  ]);

  // Searchable
  protected readonly searchableUser = signal<User | null>(null);

  // Multi-select
  protected readonly multiUsers = signal<User[]>([]);

  // Grouped
  protected readonly groupedUser = signal<User | null>(null);

  // Template
  protected readonly templateUser = signal<User | null>(null);

  // Clearable
  protected readonly clearableFruit = signal<string | null>(null);

  // Helper functions
  protected readonly displayUser = (user: User): string => user.name;
  protected readonly compareUsers = (a: User, b: User): boolean => a.id === b.id;
  protected readonly groupByDepartment = (user: User): string => user.department;

  protected onSearchableUserChange(value: User | User[] | null): void {
    this.searchableUser.set(value as User | null);
  }

  protected onMultiUsersChange(value: User | User[] | null): void {
    this.multiUsers.set(Array.isArray(value) ? value : []);
  }

  protected onGroupedUserChange(value: User | User[] | null): void {
    this.groupedUser.set(value as User | null);
  }

  protected onTemplateUserChange(value: User | User[] | null): void {
    this.templateUser.set(value as User | null);
  }

  protected onFruitChange(value: string | string[] | null): void {
    this.selectedFruit.set(value as string | null);
  }

  protected onClearableFruitChange(value: string | string[] | null): void {
    this.clearableFruit.set(value as string | null);
  }

  protected readonly basicCode = `import { Component, signal } from '@angular/core';
import { ComDropdown } from 'ngx-com/components/dropdown';

@Component({
  imports: [ComDropdown],
  template: \`
    <com-dropdown
      [options]="fruits()"
      [value]="selected()"
      placeholder="Select a fruit..."
      (valueChange)="selected.set($event)"
    />
  \`,
})
export class BasicExample {
  fruits = signal(['Apple', 'Banana', 'Cherry']);
  selected = signal<string | null>(null);
}`;

  protected readonly searchableCode = `import { Component, signal } from '@angular/core';
import { ComDropdown } from 'ngx-com/components/dropdown';

@Component({
  imports: [ComDropdown],
  template: \`
    <com-dropdown
      [options]="users()"
      [value]="selected()"
      [displayWith]="displayUser"
      [searchable]="true"
      searchPlaceholder="Search..."
      (valueChange)="selected.set($event)"
    />
  \`,
})
export class SearchableExample {
  users = signal([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
  selected = signal(null);
  displayUser = (user) => user.name;
}`;

  protected readonly multiSelectCode = `import { Component, signal } from '@angular/core';
import { ComDropdown } from 'ngx-com/components/dropdown';

@Component({
  imports: [ComDropdown],
  template: \`
    <com-dropdown
      [options]="users()"
      [value]="selected()"
      [displayWith]="displayUser"
      [multiple]="true"
      [searchable]="true"
      (valueChange)="selected.set($event)"
    />
  \`,
})
export class MultiSelectExample {
  users = signal([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
  selected = signal<User[]>([]);
  displayUser = (user) => user.name;
}`;

  protected readonly groupedCode = `import { Component, signal } from '@angular/core';
import { ComDropdown } from 'ngx-com/components/dropdown';

@Component({
  imports: [ComDropdown],
  template: \`
    <com-dropdown
      [options]="users()"
      [value]="selected()"
      [displayWith]="displayUser"
      [groupBy]="groupByDept"
      (valueChange)="selected.set($event)"
    />
  \`,
})
export class GroupedExample {
  users = signal([
    { id: 1, name: 'Alice', department: 'Engineering' },
    { id: 2, name: 'Bob', department: 'Design' },
  ]);
  selected = signal(null);
  displayUser = (user) => user.name;
  groupByDept = (user) => user.department;
}`;

  protected readonly templateCode = `import { Component, signal } from '@angular/core';
import { ComDropdown, ComDropdownOptionTpl } from 'ngx-com/components/dropdown';

@Component({
  imports: [ComDropdown, ComDropdownOptionTpl],
  template: \`
    <com-dropdown [options]="users()" [value]="selected()">
      <ng-template comDropdownOption let-user let-selected="selected">
        <div class="flex items-center gap-3">
          <div class="avatar">{{ user.name.charAt(0) }}</div>
          <div>
            <span class="font-medium">{{ user.name }}</span>
            <span class="text-xs">{{ user.email }}</span>
          </div>
        </div>
      </ng-template>
    </com-dropdown>
  \`,
})
export class TemplateExample {
  users = signal([{ id: 1, name: 'Alice', email: 'alice@example.com' }]);
  selected = signal(null);
}`;

  protected readonly clearableCode = `<com-dropdown
  [options]="options()"
  [value]="selected()"
  [clearable]="true"
  placeholder="Select..."
  (valueChange)="selected.set($event)"
/>`;

  protected readonly sizesCode = `<!-- Small -->
<com-dropdown [options]="options()" size="sm" />

<!-- Default -->
<com-dropdown [options]="options()" size="default" />

<!-- Large -->
<com-dropdown [options]="options()" size="lg" />`;
}
