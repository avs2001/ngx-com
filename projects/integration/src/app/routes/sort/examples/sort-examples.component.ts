import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SortDirective, SortHeaderComponent, type SortDirection } from 'ngx-com/components/sort';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-sort-examples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SortDirective, SortHeaderComponent, CodeBlock],
  template: `
    <!-- Pre-sorted Column -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Pre-sorted Column</h2>
      <p class="mb-4 text-surface-600">
        Initialize with a default sort using two-way binding.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="overflow-hidden rounded-lg border border-surface-200">
          <table class="w-full text-sm">
            <thead>
              <tr
                comSort
                [(sortActive)]="preSortActive"
                [(sortDirection)]="preSortDirection"
                class="border-b border-surface-200 bg-surface-50"
              >
                <th comSortHeader="date" class="px-4 py-3 text-left font-semibold text-surface-900">
                  Date
                </th>
                <th comSortHeader="amount" class="px-4 py-3 text-left font-semibold text-surface-900">
                  Amount
                </th>
                <th comSortHeader="status" class="px-4 py-3 text-left font-semibold text-surface-900">
                  Status
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-100">
              <tr class="hover:bg-surface-50">
                <td class="px-4 py-3 text-surface-900">2024-01-15</td>
                <td class="px-4 py-3 text-surface-600">$1,250.00</td>
                <td class="px-4 py-3 text-surface-600">Completed</td>
              </tr>
              <tr class="hover:bg-surface-50">
                <td class="px-4 py-3 text-surface-900">2024-01-20</td>
                <td class="px-4 py-3 text-surface-600">$890.00</td>
                <td class="px-4 py-3 text-surface-600">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mt-4 text-sm text-surface-500">
          Pre-sorted by: {{ preSortActive() }} ({{ preSortDirection() }})
        </p>
      </div>
      <int-code-block class="mt-4" language="html" [code]="preSortCode" />
    </section>

    <!-- Custom Sort Cycle -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Custom Sort Cycle</h2>
      <p class="mb-4 text-surface-600">
        Configure the sort cycle to skip the unsorted state.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="overflow-hidden rounded-lg border border-surface-200">
          <table class="w-full text-sm">
            <thead>
              <tr
                comSort
                [sortCycle]="['asc', 'desc']"
                class="border-b border-surface-200 bg-surface-50"
              >
                <th comSortHeader="rank" class="px-4 py-3 text-left font-semibold text-surface-900">
                  Rank
                </th>
                <th comSortHeader="player" class="px-4 py-3 text-left font-semibold text-surface-900">
                  Player
                </th>
                <th comSortHeader="score" class="px-4 py-3 text-left font-semibold text-surface-900">
                  Score
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-100">
              <tr class="hover:bg-surface-50">
                <td class="px-4 py-3 text-surface-900">1</td>
                <td class="px-4 py-3 text-surface-600">Alice</td>
                <td class="px-4 py-3 text-surface-600">9,500</td>
              </tr>
              <tr class="hover:bg-surface-50">
                <td class="px-4 py-3 text-surface-900">2</td>
                <td class="px-4 py-3 text-surface-600">Bob</td>
                <td class="px-4 py-3 text-surface-600">8,200</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mt-4 text-sm text-surface-500">
          This table only cycles between ascending and descending (no unsorted state).
        </p>
      </div>
      <int-code-block class="mt-4" language="html" [code]="cycleCode" />
    </section>

    <!-- Disabled Sorting -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Disabled Sorting</h2>
      <p class="mb-4 text-surface-600">
        Disable sorting globally or for specific columns.
      </p>
      <div class="space-y-6 rounded-xl border border-surface-200 bg-white p-8">
        <!-- Globally disabled -->
        <div>
          <p class="mb-3 text-sm font-medium text-surface-600">All columns disabled</p>
          <div class="overflow-hidden rounded-lg border border-surface-200">
            <table class="w-full text-sm">
              <thead>
                <tr comSort [sortDisabled]="true" class="border-b border-surface-200 bg-surface-50">
                  <th comSortHeader="name" class="px-4 py-3 text-left font-semibold text-surface-900">
                    Name
                  </th>
                  <th comSortHeader="value" class="px-4 py-3 text-left font-semibold text-surface-900">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="hover:bg-surface-50">
                  <td class="px-4 py-3 text-surface-900">Item A</td>
                  <td class="px-4 py-3 text-surface-600">100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Single column disabled -->
        <div>
          <p class="mb-3 text-sm font-medium text-surface-600">ID column disabled, others sortable</p>
          <div class="overflow-hidden rounded-lg border border-surface-200">
            <table class="w-full text-sm">
              <thead>
                <tr comSort class="border-b border-surface-200 bg-surface-50">
                  <th
                    comSortHeader="id"
                    [sortHeaderDisabled]="true"
                    class="px-4 py-3 text-left font-semibold text-surface-900"
                  >
                    ID (fixed)
                  </th>
                  <th comSortHeader="name" class="px-4 py-3 text-left font-semibold text-surface-900">
                    Name
                  </th>
                  <th comSortHeader="status" class="px-4 py-3 text-left font-semibold text-surface-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="hover:bg-surface-50">
                  <td class="px-4 py-3 text-surface-400">001</td>
                  <td class="px-4 py-3 text-surface-900">Widget</td>
                  <td class="px-4 py-3 text-surface-600">Active</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="disabledCode" />
    </section>

    <!-- Arrow Position -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Arrow Position</h2>
      <p class="mb-4 text-surface-600">
        Place the sort arrow before or after the header content.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="overflow-hidden rounded-lg border border-surface-200">
          <table class="w-full text-sm">
            <thead>
              <tr comSort [sortShowIndicator]="true" class="border-b border-surface-200 bg-surface-50">
                <th
                  comSortHeader="name"
                  comSortHeaderArrowPosition="before"
                  class="px-4 py-3 text-left font-semibold text-surface-900"
                >
                  Name (arrow before)
                </th>
                <th comSortHeader="value" class="px-4 py-3 text-left font-semibold text-surface-900">
                  Value (arrow after)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover:bg-surface-50">
                <td class="px-4 py-3 text-surface-900">Example</td>
                <td class="px-4 py-3 text-surface-600">42</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="arrowPositionCode" />
    </section>

    <!-- Programmatic Sorting -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Programmatic Sorting</h2>
      <p class="mb-4 text-surface-600">
        Use template ref to control sorting programmatically.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="mb-4 flex gap-2">
          <button
            class="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary-hover"
            (click)="sorter.sort('name')"
          >
            Sort by Name
          </button>
          <button
            class="rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground hover:bg-muted"
            (click)="sorter.sort('date')"
          >
            Sort by Date
          </button>
          <button
            class="rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground hover:bg-muted"
            (click)="sorter.sort('priority')"
          >
            Sort by Priority
          </button>
        </div>
        <div class="overflow-hidden rounded-lg border border-surface-200">
          <table class="w-full text-sm">
            <thead>
              <tr #sorter="comSort" comSort class="border-b border-surface-200 bg-surface-50">
                <th comSortHeader="name" class="px-4 py-3 text-left font-semibold text-surface-900">
                  Name
                </th>
                <th comSortHeader="date" class="px-4 py-3 text-left font-semibold text-surface-900">
                  Date
                </th>
                <th comSortHeader="priority" class="px-4 py-3 text-left font-semibold text-surface-900">
                  Priority
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover:bg-surface-50">
                <td class="px-4 py-3 text-surface-900">Task A</td>
                <td class="px-4 py-3 text-surface-600">2024-01-15</td>
                <td class="px-4 py-3 text-surface-600">High</td>
              </tr>
              <tr class="hover:bg-surface-50">
                <td class="px-4 py-3 text-surface-900">Task B</td>
                <td class="px-4 py-3 text-surface-600">2024-01-20</td>
                <td class="px-4 py-3 text-surface-600">Low</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="programmaticCode" />
    </section>

    <!-- External Control -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">External Control</h2>
      <p class="mb-4 text-surface-600">
        Two-way binding allows external components to control and monitor sort state.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="mb-4 flex items-center gap-4">
          <div class="flex gap-2">
            <button
              class="rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground hover:bg-muted"
              (click)="externalActive.set('name'); externalDirection.set('asc')"
            >
              Name Asc
            </button>
            <button
              class="rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground hover:bg-muted"
              (click)="externalActive.set('value'); externalDirection.set('desc')"
            >
              Value Desc
            </button>
            <button
              class="rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground hover:bg-muted"
              (click)="externalActive.set(undefined); externalDirection.set(undefined)"
            >
              Clear
            </button>
          </div>
          <span class="text-sm text-surface-500">
            State: {{ externalActive() || 'none' }} / {{ externalDirection() || 'unsorted' }}
          </span>
        </div>
        <div class="overflow-hidden rounded-lg border border-surface-200">
          <table class="w-full text-sm">
            <thead>
              <tr
                comSort
                [(sortActive)]="externalActive"
                [(sortDirection)]="externalDirection"
                class="border-b border-surface-200 bg-surface-50"
              >
                <th comSortHeader="name" class="px-4 py-3 text-left font-semibold text-surface-900">
                  Name
                </th>
                <th comSortHeader="value" class="px-4 py-3 text-left font-semibold text-surface-900">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover:bg-surface-50">
                <td class="px-4 py-3 text-surface-900">Item</td>
                <td class="px-4 py-3 text-surface-600">123</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="externalCode" />
    </section>
  `,
})
export class SortExamples {
  protected readonly preSortActive = signal<string | undefined>('date');
  protected readonly preSortDirection = signal<SortDirection>('desc');

  protected readonly externalActive = signal<string | undefined>(undefined);
  protected readonly externalDirection = signal<SortDirection>(undefined);

  protected readonly preSortCode = `<tr comSort [(sortActive)]="activeSort" [(sortDirection)]="sortDir">
  <th comSortHeader="date">Date</th>
  <th comSortHeader="amount">Amount</th>
</tr>

// In component:
activeSort = signal('date');
sortDir = signal<SortDirection>('desc');`;

  protected readonly cycleCode = `<!-- Skip unsorted state -->
<tr comSort [sortCycle]="['asc', 'desc']">
  <th comSortHeader="rank">Rank</th>
  <th comSortHeader="score">Score</th>
</tr>

<!-- Descending first -->
<tr comSort [sortCycle]="['desc', 'asc', undefined]">
  ...
</tr>`;

  protected readonly disabledCode = `<!-- All columns disabled -->
<tr comSort [sortDisabled]="isReadonly">
  <th comSortHeader="name">Name</th>
  <th comSortHeader="value">Value</th>
</tr>

<!-- Single column disabled -->
<tr comSort>
  <th comSortHeader="id" [sortHeaderDisabled]="true">ID</th>
  <th comSortHeader="name">Name</th>
</tr>`;

  protected readonly arrowPositionCode = `<tr comSort>
  <th comSortHeader="name" comSortHeaderArrowPosition="before">
    Name (arrow before)
  </th>
  <th comSortHeader="value">
    Value (arrow after, default)
  </th>
</tr>`;

  protected readonly programmaticCode = `<tr #sorter="comSort" comSort>
  <th comSortHeader="name">Name</th>
  <th comSortHeader="date">Date</th>
</tr>

<button (click)="sorter.sort('date')">Sort by Date</button>`;

  protected readonly externalCode = `<tr comSort [(sortActive)]="currentColumn" [(sortDirection)]="currentDirection">
  <th comSortHeader="name">Name</th>
  <th comSortHeader="value">Value</th>
</tr>

<button (click)="currentColumn.set('name'); currentDirection.set('asc')">
  Name Asc
</button>

<p>Sorting by: {{ currentColumn() }} {{ currentDirection() }}</p>`;
}
