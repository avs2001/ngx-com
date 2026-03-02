import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ComCard } from 'ngx-com/components/card';
import { ComItem } from 'ngx-com/components/item';
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
  imports: [SortDirective, SortHeaderComponent, ComCard, ComItem, CodeBlock],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <com-item
        title="Demo"
        description="Sortable table with clickable column headers"
        icon="play"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-8">
        <div class="mb-4 text-sm text-muted-foreground">
          Click on column headers to sort. Click again to reverse. Click a third time to clear.
        </div>

        <div class="overflow-hidden rounded-lg border border-border">
          <table class="w-full text-sm">
            <thead>
              <tr
                comSort
                [(sortActive)]="sortActive"
                [(sortDirection)]="sortDirection"
                (sortChange)="onSortChange($event)"
                class="border-b border-border bg-muted"
              >
                <th comSortHeader="name" class="px-4 py-3 text-left font-semibold text-foreground">
                  Name
                </th>
                <th comSortHeader="email" class="px-4 py-3 text-left font-semibold text-foreground">
                  Email
                </th>
                <th comSortHeader="age" class="px-4 py-3 text-left font-semibold text-foreground">
                  Age
                </th>
                <th comSortHeader="role" class="px-4 py-3 text-left font-semibold text-foreground">
                  Role
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              @for (user of sortedUsers(); track user.id) {
                <tr class="hover:bg-muted/50">
                  <td class="px-4 py-3 text-foreground">{{ user.name }}</td>
                  <td class="px-4 py-3 text-muted-foreground">{{ user.email }}</td>
                  <td class="px-4 py-3 text-muted-foreground">{{ user.age }}</td>
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

        <div class="mt-4 text-sm text-muted-foreground">
          Current: {{ sortActive() || 'none' }} ({{ sortDirection() || 'unsorted' }})
        </div>
      </com-card>
    </section>

    <!-- Basic Usage -->
    <section class="mb-12">
      <com-item
        title="Basic Usage"
        description="Import and apply sort directives to any container"
        icon="code"
        size="lg"
        class="mb-4"
      />
      <int-code-block language="typescript" [code]="basicUsageCode" />
    </section>

    <!-- Features -->
    <section class="mb-12">
      <com-item
        title="Features"
        description="What makes comSort powerful"
        icon="star"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-3">
        <div class="space-y-1">
          <com-item
            title="Three-State Cycle"
            description="Click cycles through ascending, descending, and unsorted states"
            icon="refresh-cw"
          />
          <com-item
            title="Two-Way Binding"
            description="Use [(sortActive)] and [(sortDirection)] for external state control"
            icon="link"
            iconColor="accent"
          />
          <com-item
            title="Customizable Cycle"
            description="Configure [sortCycle] to skip unsorted state or change order"
            icon="settings"
          />
          <com-item
            title="Keyboard Navigation"
            description="Full accessibility with Enter/Space activation and proper ARIA"
            icon="keyboard"
            iconColor="accent"
          />
          <com-item
            title="Disabled Support"
            description="Disable all sorting or individual columns with boolean inputs"
            icon="ban"
          />
          <com-item
            title="Visual Indicators"
            description="Animated arrow icons show sort direction with smooth transitions"
            icon="arrow-up-down"
            iconColor="accent"
          />
        </div>
      </com-card>
    </section>

    <!-- Show Indicator Demo -->
    <section class="mb-12">
      <com-item
        title="Show Indicators"
        description="Display muted arrows on unsorted columns"
        icon="eye"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-8">
        <div class="overflow-hidden rounded-lg border border-border">
          <table class="w-full text-sm">
            <thead>
              <tr comSort [sortShowIndicator]="true" class="border-b border-border bg-muted">
                <th comSortHeader="name" class="px-4 py-3 text-left font-semibold text-foreground">
                  Name
                </th>
                <th comSortHeader="status" class="px-4 py-3 text-left font-semibold text-foreground">
                  Status
                </th>
                <th comSortHeader="date" class="px-4 py-3 text-left font-semibold text-foreground">
                  Date
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr class="hover:bg-muted/50">
                <td class="px-4 py-3 text-foreground">Project Alpha</td>
                <td class="px-4 py-3 text-muted-foreground">Active</td>
                <td class="px-4 py-3 text-muted-foreground">2024-01-15</td>
              </tr>
              <tr class="hover:bg-muted/50">
                <td class="px-4 py-3 text-foreground">Project Beta</td>
                <td class="px-4 py-3 text-muted-foreground">Pending</td>
                <td class="px-4 py-3 text-muted-foreground">2024-02-20</td>
              </tr>
            </tbody>
          </table>
        </div>
      </com-card>
    </section>

    <!-- Non-Table Usage -->
    <section>
      <com-item
        title="Non-Table Usage"
        description="Sort directive works with any container, not just tables"
        icon="layout"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-8">
        <div comSort class="mb-4 flex gap-2">
          <button
            comSortHeader="name"
            class="rounded-md border border-border bg-muted px-4 py-2 text-sm font-medium"
          >
            Name
          </button>
          <button
            comSortHeader="date"
            class="rounded-md border border-border bg-muted px-4 py-2 text-sm font-medium"
          >
            Date
          </button>
          <button
            comSortHeader="size"
            class="rounded-md border border-border bg-muted px-4 py-2 text-sm font-medium"
          >
            Size
          </button>
        </div>
        <p class="text-sm text-muted-foreground">Click buttons above to sort.</p>
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
