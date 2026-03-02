import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComCard } from 'ngx-com/components/card';
import { ComDropdown } from 'ngx-com/components/dropdown';
import { ComItem } from 'ngx-com/components/item';
import { CodeBlock } from '../../../shared/code-block';

interface User {
  id: number;
  name: string;
}

@Component({
  selector: 'int-dropdown-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComDropdown, ComCard, ComItem, CodeBlock],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <com-item
        title="Demo"
        description="Interactive dropdown with search and selection"
        icon="play"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-8">
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
            <p class="text-muted-foreground">
              Selected: <span class="font-medium text-foreground">{{ selectedUser()!.name }}</span>
            </p>
          }
        </div>
      </com-card>
    </section>

    <!-- Basic Usage -->
    <section class="mb-12">
      <com-item
        title="Basic Usage"
        description="Import and use the component in your templates"
        icon="code"
        size="lg"
        class="mb-4"
      />
      <int-code-block
        language="typescript"
        [code]="basicUsageCode"
      />
    </section>

    <!-- Features -->
    <section class="mb-12">
      <com-item
        title="Features"
        description="What makes com-dropdown powerful"
        icon="star"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-3">
        <div class="space-y-1">
          <com-item
            title="Search & Filter"
            description="Built-in search input with customizable filtering and debounce support"
            icon="search"
          />
          <com-item
            title="Multi-Select"
            description="Select multiple values with tag display and individual removal"
            icon="list-checks"
            iconColor="accent"
          />
          <com-item
            title="Grouping"
            description="Group options with custom groupBy function and collapsible headers"
            icon="folder"
          />
          <com-item
            title="Custom Templates"
            description="Full control over option, selected, empty, group, and tag rendering"
            icon="layout"
            iconColor="accent"
          />
          <com-item
            title="Forms Integration"
            description="ControlValueAccessor implementation for seamless Reactive Forms support"
            icon="file-code"
          />
          <com-item
            title="Accessibility"
            description="WCAG AA compliant with full keyboard navigation and ARIA support"
            icon="accessibility"
            iconColor="accent"
          />
        </div>
      </com-card>
    </section>

    <!-- Accessibility -->
    <section>
      <com-item
        title="Keyboard Navigation"
        description="Full keyboard support for accessible interaction"
        icon="keyboard"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-6">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border text-left">
              <th class="pb-2 font-medium text-muted-foreground">Key</th>
              <th class="pb-2 font-medium text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody class="text-foreground">
            <tr class="border-b border-border">
              <td class="py-2"><kbd class="rounded bg-muted px-2 py-0.5 font-mono text-xs">↑</kbd> <kbd class="rounded bg-muted px-2 py-0.5 font-mono text-xs">↓</kbd></td>
              <td class="py-2">Navigate options / Open dropdown</td>
            </tr>
            <tr class="border-b border-border">
              <td class="py-2"><kbd class="rounded bg-muted px-2 py-0.5 font-mono text-xs">Enter</kbd> <kbd class="rounded bg-muted px-2 py-0.5 font-mono text-xs">Space</kbd></td>
              <td class="py-2">Select option / Toggle dropdown</td>
            </tr>
            <tr class="border-b border-border">
              <td class="py-2"><kbd class="rounded bg-muted px-2 py-0.5 font-mono text-xs">Escape</kbd></td>
              <td class="py-2">Close dropdown</td>
            </tr>
            <tr class="border-b border-border">
              <td class="py-2"><kbd class="rounded bg-muted px-2 py-0.5 font-mono text-xs">Home</kbd></td>
              <td class="py-2">Jump to first option</td>
            </tr>
            <tr class="border-b border-border">
              <td class="py-2"><kbd class="rounded bg-muted px-2 py-0.5 font-mono text-xs">End</kbd></td>
              <td class="py-2">Jump to last option</td>
            </tr>
            <tr>
              <td class="py-2"><kbd class="rounded bg-muted px-2 py-0.5 font-mono text-xs">A-Z</kbd></td>
              <td class="py-2">Type-ahead search</td>
            </tr>
          </tbody>
        </table>
      </com-card>
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
