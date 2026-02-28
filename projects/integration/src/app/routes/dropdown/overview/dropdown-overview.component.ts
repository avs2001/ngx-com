import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComDropdown } from 'ngx-com/components/dropdown';
import { CodeBlock } from '../../../shared/code-block';

interface User {
  id: number;
  name: string;
}

@Component({
  selector: 'int-dropdown-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComDropdown, CodeBlock],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Demo</h2>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-col items-center gap-6">
          <com-dropdown
            [options]="users()"
            [value]="selectedUser()"
            [displayWith]="displayUser"
            [compareWith]="compareUsers"
            placeholder="Select a user..."
            class="w-64"
            (valueChange)="onUserSelected($event)"
          />
          @if (selectedUser()) {
            <p class="text-surface-600">
              Selected: <span class="font-medium text-surface-900">{{ selectedUser()!.name }}</span>
            </p>
          }
        </div>
      </div>
    </section>

    <!-- Basic Usage -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Basic Usage</h2>
      <int-code-block
        language="typescript"
        [code]="basicUsageCode"
      />
    </section>

    <!-- Features -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Features</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Search & Filter</h3>
          <p class="text-sm text-surface-600">
            Built-in search input with customizable filtering and debounce support.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Multi-Select</h3>
          <p class="text-sm text-surface-600">
            Select multiple values with tag display and individual removal.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Grouping</h3>
          <p class="text-sm text-surface-600">
            Group options with custom groupBy function and collapsible headers.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Custom Templates</h3>
          <p class="text-sm text-surface-600">
            Full control over option, selected, empty, group, and tag rendering.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Forms Integration</h3>
          <p class="text-sm text-surface-600">
            ControlValueAccessor implementation for seamless Reactive Forms support.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Accessibility</h3>
          <p class="text-sm text-surface-600">
            WCAG AA compliant with full keyboard navigation and ARIA support.
          </p>
        </div>
      </div>
    </section>

    <!-- Accessibility -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Accessibility</h2>
      <div class="rounded-lg border border-surface-200 bg-white p-6">
        <h3 class="mb-3 font-semibold text-surface-900">Keyboard Navigation</h3>
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-surface-200 text-left">
              <th class="pb-2 font-medium text-surface-700">Key</th>
              <th class="pb-2 font-medium text-surface-700">Action</th>
            </tr>
          </thead>
          <tbody class="text-surface-600">
            <tr class="border-b border-surface-100">
              <td class="py-2"><kbd class="rounded bg-surface-100 px-2 py-0.5 font-mono text-xs">↑</kbd> <kbd class="rounded bg-surface-100 px-2 py-0.5 font-mono text-xs">↓</kbd></td>
              <td class="py-2">Navigate options / Open dropdown</td>
            </tr>
            <tr class="border-b border-surface-100">
              <td class="py-2"><kbd class="rounded bg-surface-100 px-2 py-0.5 font-mono text-xs">Enter</kbd> <kbd class="rounded bg-surface-100 px-2 py-0.5 font-mono text-xs">Space</kbd></td>
              <td class="py-2">Select option / Toggle dropdown</td>
            </tr>
            <tr class="border-b border-surface-100">
              <td class="py-2"><kbd class="rounded bg-surface-100 px-2 py-0.5 font-mono text-xs">Escape</kbd></td>
              <td class="py-2">Close dropdown</td>
            </tr>
            <tr class="border-b border-surface-100">
              <td class="py-2"><kbd class="rounded bg-surface-100 px-2 py-0.5 font-mono text-xs">Home</kbd></td>
              <td class="py-2">Jump to first option</td>
            </tr>
            <tr class="border-b border-surface-100">
              <td class="py-2"><kbd class="rounded bg-surface-100 px-2 py-0.5 font-mono text-xs">End</kbd></td>
              <td class="py-2">Jump to last option</td>
            </tr>
            <tr>
              <td class="py-2"><kbd class="rounded bg-surface-100 px-2 py-0.5 font-mono text-xs">A-Z</kbd></td>
              <td class="py-2">Type-ahead search</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
})
export class DropdownOverview {
  protected readonly users = signal<User[]>([
    { id: 1, name: 'Alice Johnson' },
    { id: 2, name: 'Bob Smith' },
    { id: 3, name: 'Carol Williams' },
    { id: 4, name: 'David Brown' },
    { id: 5, name: 'Emma Davis' },
  ]);

  protected readonly selectedUser = signal<User | null>(null);

  protected readonly displayUser = (user: User): string => user.name;

  protected readonly compareUsers = (a: User, b: User): boolean => a.id === b.id;

  protected readonly basicUsageCode = `import { Component, signal } from '@angular/core';
import { ComDropdown } from 'ngx-com/components/dropdown';

interface User {
  id: number;
  name: string;
}

@Component({
  selector: 'app-example',
  imports: [ComDropdown],
  template: \`
    <com-dropdown
      [options]="users()"
      [value]="selectedUser()"
      [displayWith]="displayUser"
      [compareWith]="compareUsers"
      placeholder="Select a user..."
      (valueChange)="selectedUser.set($event)"
    />
  \`,
})
export class Example {
  users = signal<User[]>([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ]);

  selectedUser = signal<User | null>(null);
  displayUser = (user: User) => user.name;
  compareUsers = (a: User, b: User) => a.id === b.id;
}`;

  protected onUserSelected(user: User | User[] | null): void {
    this.selectedUser.set(user as User | null);
  }
}
