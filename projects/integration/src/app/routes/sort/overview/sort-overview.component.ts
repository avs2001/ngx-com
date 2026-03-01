import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ComCard } from 'ngx-com/components/card';
import { SortDirective, SortHeaderComponent, type SortEvent } from 'ngx-com/components/sort';
import { CodeBlock } from '../../../shared/code-block';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: string;
}

@Component({
  selector: 'int-sort-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SortDirective, SortHeaderComponent, ComCard, CodeBlock],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Demo</h2>
      <com-card variant="outlined" class="p-8">
        <div class="mb-4 text-sm text-surface-600">
          Click on column headers to sort. Click again to reverse. Click a third time to clear.
        </div>

        <div class="overflow-hidden rounded-lg border border-surface-200">
          <table class="w-full text-sm">
            <thead>
              <tr
                comSort
                [(sortActive)]="sortActive"
                [(sortDirection)]="sortDirection"
                (sortChange)="onSortChange($event)"
                class="border-b border-surface-200 bg-surface-50"
              >
                <th comSortHeader="name" class="px-4 py-3 text-left font-semibold text-surface-900">
                  Name
                </th>
                <th comSortHeader="email" class="px-4 py-3 text-left font-semibold text-surface-900">
                  Email
                </th>
                <th comSortHeader="age" class="px-4 py-3 text-left font-semibold text-surface-900">
                  Age
                </th>
                <th comSortHeader="role" class="px-4 py-3 text-left font-semibold text-surface-900">
                  Role
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-100">
              @for (user of sortedUsers(); track user.id) {
                <tr class="hover:bg-surface-50">
                  <td class="px-4 py-3 text-surface-900">{{ user.name }}</td>
                  <td class="px-4 py-3 text-surface-600">{{ user.email }}</td>
                  <td class="px-4 py-3 text-surface-600">{{ user.age }}</td>
                  <td class="px-4 py-3">
                    <span
                      class="rounded-full px-2 py-0.5 text-xs font-medium"
                      [class]="getRoleBadgeClass(user.role)"
                    >
                      {{ user.role }}
                    </span>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <div class="mt-4 text-sm text-surface-500">
          Current: {{ sortActive() || 'none' }} ({{ sortDirection() || 'unsorted' }})
        </div>
      </com-card>
    </section>

    <!-- Basic Usage -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Basic Usage</h2>
      <int-code-block language="typescript" [code]="basicUsageCode" />
    </section>

    <!-- Features -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Features</h2>
      <div class="grid gap-4 md:grid-cols-2">
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Three-State Cycle</h3>
          <p class="text-sm text-surface-600">
            Click cycles through ascending, descending, and unsorted states.
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Two-Way Binding</h3>
          <p class="text-sm text-surface-600">
            Use [(sortActive)] and [(sortDirection)] for external state control.
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Customizable Cycle</h3>
          <p class="text-sm text-surface-600">
            Configure [sortCycle] to skip unsorted state or change order.
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Keyboard Navigation</h3>
          <p class="text-sm text-surface-600">
            Full accessibility with Enter/Space activation and proper ARIA.
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Disabled Support</h3>
          <p class="text-sm text-surface-600">
            Disable all sorting or individual columns with boolean inputs.
          </p>
        </com-card>
        <com-card variant="outlined" class="p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Visual Indicators</h3>
          <p class="text-sm text-surface-600">
            Animated arrow icons show sort direction with smooth transitions.
          </p>
        </com-card>
      </div>
    </section>

    <!-- Show Indicator Demo -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Show Indicators</h2>
      <p class="mb-4 text-surface-600">
        Use [sortShowIndicator]="true" to show muted arrows on unsorted columns.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="overflow-hidden rounded-lg border border-surface-200">
          <table class="w-full text-sm">
            <thead>
              <tr comSort [sortShowIndicator]="true" class="border-b border-surface-200 bg-surface-50">
                <th comSortHeader="name" class="px-4 py-3 text-left font-semibold text-surface-900">
                  Name
                </th>
                <th comSortHeader="status" class="px-4 py-3 text-left font-semibold text-surface-900">
                  Status
                </th>
                <th comSortHeader="date" class="px-4 py-3 text-left font-semibold text-surface-900">
                  Date
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-100">
              <tr class="hover:bg-surface-50">
                <td class="px-4 py-3 text-surface-900">Project Alpha</td>
                <td class="px-4 py-3 text-surface-600">Active</td>
                <td class="px-4 py-3 text-surface-600">2024-01-15</td>
              </tr>
              <tr class="hover:bg-surface-50">
                <td class="px-4 py-3 text-surface-900">Project Beta</td>
                <td class="px-4 py-3 text-surface-600">Pending</td>
                <td class="px-4 py-3 text-surface-600">2024-02-20</td>
              </tr>
            </tbody>
          </table>
        </div>
      </com-card>
    </section>

    <!-- Non-Table Usage -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Non-Table Usage</h2>
      <p class="mb-4 text-surface-600">
        The sort directive works with any container, not just tables.
      </p>
      <com-card variant="outlined" class="p-8">
        <div comSort class="mb-4 flex gap-2">
          <button
            comSortHeader="name"
            class="rounded-md border border-surface-200 bg-surface-50 px-4 py-2 text-sm font-medium"
          >
            Name
          </button>
          <button
            comSortHeader="date"
            class="rounded-md border border-surface-200 bg-surface-50 px-4 py-2 text-sm font-medium"
          >
            Date
          </button>
          <button
            comSortHeader="size"
            class="rounded-md border border-surface-200 bg-surface-50 px-4 py-2 text-sm font-medium"
          >
            Size
          </button>
        </div>
        <p class="text-sm text-surface-500">Click buttons above to sort.</p>
      </com-card>
    </section>
  `,
})
export class SortOverview {
  protected readonly sortActive = signal<string | undefined>(undefined);
  protected readonly sortDirection = signal<'asc' | 'desc' | undefined>(undefined);

  private readonly users: User[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', age: 28, role: 'Admin' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', age: 34, role: 'User' },
    { id: 3, name: 'Carol White', email: 'carol@example.com', age: 25, role: 'Editor' },
    { id: 4, name: 'David Brown', email: 'david@example.com', age: 42, role: 'User' },
    { id: 5, name: 'Eve Davis', email: 'eve@example.com', age: 31, role: 'Admin' },
  ];

  protected readonly sortedUsers = computed(() => {
    const active = this.sortActive();
    const direction = this.sortDirection();

    if (!active || !direction) {
      return this.users;
    }

    return [...this.users].sort((a, b) => {
      const aVal = a[active as keyof User];
      const bVal = b[active as keyof User];
      const cmp = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      return direction === 'asc' ? cmp : -cmp;
    });
  });

  protected onSortChange(event: SortEvent): void {
    console.log('Sort changed:', event);
  }

  protected getRoleBadgeClass(role: string): string {
    switch (role) {
      case 'Admin':
        return 'bg-primary-subtle text-primary-subtle-foreground';
      case 'Editor':
        return 'bg-accent-subtle text-accent-subtle-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  }

  protected readonly basicUsageCode = `import { Component, signal, computed } from '@angular/core';
import { SortDirective, SortHeaderComponent } from 'ngx-com/components/sort';

@Component({
  selector: 'app-example',
  imports: [SortDirective, SortHeaderComponent],
  template: \`
    <table>
      <thead>
        <tr comSort (sortChange)="onSort($event)">
          <th comSortHeader="name">Name</th>
          <th comSortHeader="age">Age</th>
          <th comSortHeader="email">Email</th>
        </tr>
      </thead>
      <tbody>
        @for (row of sortedData(); track row.id) {
          <tr>
            <td>{{ row.name }}</td>
            <td>{{ row.age }}</td>
            <td>{{ row.email }}</td>
          </tr>
        }
      </tbody>
    </table>
  \`,
})
export class Example {
  sortActive = signal<string | undefined>(undefined);
  sortDirection = signal<'asc' | 'desc' | undefined>(undefined);

  data = signal([...]);

  sortedData = computed(() => {
    const col = this.sortActive();
    const dir = this.sortDirection();
    if (!col || !dir) return this.data();
    return [...this.data()].sort((a, b) => {
      const cmp = a[col] > b[col] ? 1 : -1;
      return dir === 'asc' ? cmp : -cmp;
    });
  });
}`;
}
