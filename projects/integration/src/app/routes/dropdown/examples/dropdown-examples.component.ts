import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComDropdown, ComDropdownOptionTpl } from 'ngx-com/components/dropdown';
import { ComFormField, ComLabel, ComError, ComHint, ComPrefix, ComSuffix } from 'ngx-com/components/form-field';
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
  imports: [ComDropdown, ComDropdownOptionTpl, ComFormField, ComLabel, ComError, ComHint, ComPrefix, ComSuffix, ReactiveFormsModule, CodeBlock],
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
    <section class="mb-12">
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

    <!-- Form Field Integration -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Form Field Integration</h2>
      <p class="mb-4 text-surface-600">
        Use the <code class="rounded bg-surface-100 px-1.5 py-0.5 font-mono text-xs">naked</code> variant
        to integrate dropdown inside a form field with floating labels, hints, and error messages.
      </p>
      <div class="mb-4 rounded-xl border border-surface-200 bg-white p-8">
        <form [formGroup]="formFieldForm" class="flex flex-col items-center gap-8">
          <!-- Outline appearance (default) -->
          <div class="flex flex-col gap-2 w-full max-w-sm">
            <span class="text-xs font-medium text-surface-500">Outline Appearance</span>
            <com-form-field>
              <label comLabel>Category</label>
              <com-dropdown
                variant="naked"
                [options]="categories()"
                formControlName="category"
                placeholder="Select a category..."
              />
              <span comHint>Choose a product category</span>
              <span comError match="required">Category is required.</span>
            </com-form-field>
          </div>

          <!-- Fill appearance -->
          <div class="flex flex-col gap-2 w-full max-w-sm">
            <span class="text-xs font-medium text-surface-500">Fill Appearance</span>
            <com-form-field appearance="fill">
              <label comLabel>Status</label>
              <com-dropdown
                variant="naked"
                [options]="statuses()"
                formControlName="status"
                placeholder="Select status..."
              />
              <span comHint>Current item status</span>
              <span comError match="required">Status is required.</span>
            </com-form-field>
          </div>

          <!-- With prefix -->
          <div class="flex flex-col gap-2 w-full max-w-sm">
            <span class="text-xs font-medium text-surface-500">With Prefix</span>
            <com-form-field>
              <span comPrefix>
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <label comLabel>Assignee</label>
              <com-dropdown
                variant="naked"
                [options]="users()"
                [displayWith]="displayUser"
                [compareWith]="compareUsers"
                formControlName="assignee"
                placeholder="Select assignee..."
              />
            </com-form-field>
          </div>

          <!-- With suffix -->
          <div class="flex flex-col gap-2 w-full max-w-sm">
            <span class="text-xs font-medium text-surface-500">With Suffix</span>
            <com-form-field>
              <label comLabel>Country</label>
              <com-dropdown
                variant="naked"
                [options]="countries()"
                formControlName="country"
                placeholder="Select country..."
                [searchable]="true"
              />
              <span comSuffix>
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </span>
            </com-form-field>
          </div>

          <!-- With both prefix and suffix -->
          <div class="flex flex-col gap-2 w-full max-w-sm">
            <span class="text-xs font-medium text-surface-500">With Prefix & Suffix</span>
            <com-form-field appearance="fill">
              <span comPrefix>$</span>
              <label comLabel>Currency</label>
              <com-dropdown
                variant="naked"
                [options]="currencies()"
                formControlName="currency"
                placeholder="Select currency..."
              />
              <span comSuffix class="text-xs">.00</span>
            </com-form-field>
          </div>

          <div class="flex gap-4">
            <button
              type="button"
              class="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
              (click)="markFormFieldTouched()"
            >
              Mark All Touched
            </button>
            <button
              type="button"
              class="rounded-lg bg-surface-200 px-4 py-2 text-sm font-medium text-surface-700 hover:bg-surface-300"
              (click)="resetFormFieldForm()"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      <int-code-block language="typescript" [code]="formFieldCode" />
    </section>

    <!-- Reactive Forms Validation -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Reactive Forms Validation</h2>
      <p class="mb-4 text-surface-600">
        Standalone dropdown with automatic error state detection when used with reactive forms.
        The error styling applies automatically when the control is touched and invalid.
      </p>
      <div class="mb-4 rounded-xl border border-surface-200 bg-white p-8">
        <form [formGroup]="validationForm" class="flex flex-col items-center gap-6">
          <div class="flex flex-col gap-2 w-72">
            <label class="text-sm font-medium text-surface-700">Priority Level</label>
            <com-dropdown
              [options]="priorities()"
              formControlName="priority"
              placeholder="Select priority..."
            />
            @if (validationForm.get('priority')?.touched && validationForm.get('priority')?.hasError('required')) {
              <span class="text-xs text-warn">Priority is required.</span>
            }
          </div>

          <div class="flex gap-4">
            <button
              type="button"
              class="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
              (click)="markValidationTouched()"
            >
              Mark Touched
            </button>
            <button
              type="button"
              class="rounded-lg bg-surface-200 px-4 py-2 text-sm font-medium text-surface-700 hover:bg-surface-300"
              (click)="resetValidationForm()"
            >
              Reset
            </button>
          </div>

          @if (validationForm.get('priority')?.value) {
            <p class="text-sm text-surface-600">
              Selected: {{ validationForm.get('priority')?.value }}
            </p>
          }
        </form>
      </div>
      <int-code-block language="typescript" [code]="validationCode" />
    </section>

    <!-- Variants -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Variants</h2>
      <p class="mb-4 text-surface-600">
        Different visual variants for various contexts.
      </p>
      <div class="mb-4 rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-col items-center gap-6">
          <div class="flex flex-col gap-2">
            <span class="text-xs font-medium text-surface-500">Default</span>
            <com-dropdown
              [options]="fruits()"
              variant="default"
              placeholder="Default variant"
              class="w-56"
            />
          </div>
          <div class="flex flex-col gap-2">
            <span class="text-xs font-medium text-surface-500">Outline</span>
            <com-dropdown
              [options]="fruits()"
              variant="outline"
              placeholder="Outline variant"
              class="w-56"
            />
          </div>
          <div class="flex flex-col gap-2">
            <span class="text-xs font-medium text-surface-500">Ghost</span>
            <com-dropdown
              [options]="fruits()"
              variant="ghost"
              placeholder="Ghost variant"
              class="w-56"
            />
          </div>
          <div class="flex flex-col gap-2">
            <span class="text-xs font-medium text-surface-500">Filled</span>
            <com-dropdown
              [options]="fruits()"
              variant="filled"
              placeholder="Filled variant"
              class="w-56"
            />
          </div>
          <div class="flex flex-col gap-2">
            <span class="text-xs font-medium text-surface-500">Naked (for form-field)</span>
            <div class="rounded-lg border border-surface-300 p-3">
              <com-dropdown
                [options]="fruits()"
                variant="naked"
                placeholder="Naked variant"
                class="w-48"
              />
            </div>
          </div>
        </div>
      </div>
      <int-code-block language="html" [code]="variantsCode" />
    </section>
  `,
})
export class DropdownExamples {
  // Basic
  protected readonly fruits = signal(['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']);
  protected readonly selectedFruit = signal<string | null>(null);

  // Categories for form field example
  protected readonly categories = signal(['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Toys']);

  // Statuses for form field example
  protected readonly statuses = signal(['Draft', 'Pending', 'Active', 'Archived']);

  // Countries for form field example
  protected readonly countries = signal(['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Japan', 'Australia']);

  // Currencies for form field example
  protected readonly currencies = signal(['USD', 'EUR', 'GBP', 'CAD', 'JPY', 'AUD']);

  // Priorities for validation example
  protected readonly priorities = signal(['Low', 'Medium', 'High', 'Critical']);

  // Form field integration form
  protected readonly formFieldForm = new FormGroup({
    category: new FormControl<string | null>(null, Validators.required),
    status: new FormControl<string | null>(null, Validators.required),
    assignee: new FormControl<User | null>(null),
    country: new FormControl<string | null>(null),
    currency: new FormControl<string | null>(null),
  });

  // Reactive forms validation form
  protected readonly validationForm = new FormGroup({
    priority: new FormControl<string | null>(null, Validators.required),
  });

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

  protected markFormFieldTouched(): void {
    this.formFieldForm.markAllAsTouched();
  }

  protected resetFormFieldForm(): void {
    this.formFieldForm.reset();
  }

  protected markValidationTouched(): void {
    this.validationForm.get('priority')?.markAsTouched();
  }

  protected resetValidationForm(): void {
    this.validationForm.reset();
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

  protected readonly formFieldCode = `import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComDropdown } from 'ngx-com/components/dropdown';
import {
  ComFormField, ComLabel, ComError, ComHint, ComPrefix, ComSuffix
} from 'ngx-com/components/form-field';

@Component({
  imports: [
    ComDropdown, ComFormField, ComLabel, ComError, ComHint,
    ComPrefix, ComSuffix, ReactiveFormsModule
  ],
  template: \`
    <!-- Outline appearance (default) -->
    <com-form-field>
      <label comLabel>Category</label>
      <com-dropdown
        variant="naked"
        [options]="categories()"
        formControlName="category"
        placeholder="Select..."
      />
      <span comError match="required">Required</span>
    </com-form-field>

    <!-- Fill appearance -->
    <com-form-field appearance="fill">
      <label comLabel>Status</label>
      <com-dropdown
        variant="naked"
        [options]="statuses()"
        formControlName="status"
      />
    </com-form-field>

    <!-- With prefix -->
    <com-form-field>
      <span comPrefix>@</span>
      <label comLabel>Username</label>
      <com-dropdown variant="naked" [options]="users()" />
    </com-form-field>

    <!-- With suffix -->
    <com-form-field>
      <label comLabel>Country</label>
      <com-dropdown variant="naked" [options]="countries()" />
      <span comSuffix>🌍</span>
    </com-form-field>

    <!-- With both prefix and suffix -->
    <com-form-field appearance="fill">
      <span comPrefix>$</span>
      <label comLabel>Currency</label>
      <com-dropdown variant="naked" [options]="currencies()" />
      <span comSuffix>.00</span>
    </com-form-field>
  \`,
})
export class FormFieldExample {
  categories = signal(['Electronics', 'Clothing']);
  statuses = signal(['Draft', 'Active']);
  users = signal(['alice', 'bob']);
  countries = signal(['USA', 'Canada']);
  currencies = signal(['USD', 'EUR']);
}`;

  protected readonly validationCode = `import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComDropdown } from 'ngx-com/components/dropdown';

@Component({
  imports: [ComDropdown, ReactiveFormsModule],
  template: \`
    <form [formGroup]="form">
      <!-- Dropdown auto-detects error state from reactive form -->
      <com-dropdown
        [options]="priorities()"
        formControlName="priority"
        placeholder="Select priority..."
      />
      @if (form.get('priority')?.touched && form.get('priority')?.hasError('required')) {
        <span class="error">Priority is required.</span>
      }
    </form>
  \`,
})
export class ValidationExample {
  priorities = signal(['Low', 'Medium', 'High', 'Critical']);
  form = new FormGroup({
    priority: new FormControl<string | null>(null, Validators.required),
  });
}`;

  protected readonly variantsCode = `<!-- Default -->
<com-dropdown [options]="options()" variant="default" />

<!-- Outline -->
<com-dropdown [options]="options()" variant="outline" />

<!-- Ghost -->
<com-dropdown [options]="options()" variant="ghost" />

<!-- Filled -->
<com-dropdown [options]="options()" variant="filled" />

<!-- Naked (for use inside com-form-field) -->
<com-form-field>
  <label comLabel>Category</label>
  <com-dropdown variant="naked" [options]="options()" />
</com-form-field>`;
}
