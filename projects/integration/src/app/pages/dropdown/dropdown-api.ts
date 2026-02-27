import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlock } from '../../shared/code-block';

interface ApiProperty {
  name: string;
  type: string;
  default?: string;
  description: string;
}

@Component({
  selector: 'int-dropdown-api',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CodeBlock, RouterLink],
  template: `
    <div class="mx-auto max-w-4xl px-6 py-12">
      <!-- Breadcrumb -->
      <nav class="mb-6 text-sm">
        <ol class="flex items-center gap-2 text-surface-500">
          <li><a routerLink="/" class="hover:text-primary-600">Home</a></li>
          <li>/</li>
          <li><a routerLink="/components/dropdown" class="hover:text-primary-600">Dropdown</a></li>
          <li>/</li>
          <li><span class="text-surface-900">API</span></li>
        </ol>
      </nav>

      <h1 class="mb-4 text-4xl font-bold text-surface-900">Dropdown API</h1>
      <p class="mb-8 text-lg text-surface-600">
        Complete API reference for the Dropdown component.
      </p>

      <!-- Import -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Import</h2>
        <int-code-block
          language="typescript"
          [code]="importCode"
        />
      </section>

      <!-- Selector -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Selector</h2>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <code class="font-mono text-primary-600">com-dropdown</code>
        </div>
      </section>

      <!-- Inputs -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Inputs</h2>
        <div class="overflow-x-auto rounded-lg border border-surface-200 bg-white">
          <table class="w-full text-sm">
            <thead class="bg-surface-50">
              <tr class="border-b border-surface-200 text-left">
                <th class="px-4 py-3 font-semibold text-surface-700">Name</th>
                <th class="px-4 py-3 font-semibold text-surface-700">Type</th>
                <th class="px-4 py-3 font-semibold text-surface-700">Default</th>
                <th class="px-4 py-3 font-semibold text-surface-700">Description</th>
              </tr>
            </thead>
            <tbody>
              @for (prop of inputs; track prop.name) {
                <tr class="border-b border-surface-100 last:border-0">
                  <td class="px-4 py-3">
                    <code class="font-mono text-primary-600">{{ prop.name }}</code>
                  </td>
                  <td class="px-4 py-3">
                    <code class="rounded bg-surface-100 px-1.5 py-0.5 font-mono text-xs text-surface-700">{{ prop.type }}</code>
                  </td>
                  <td class="px-4 py-3 text-surface-500">{{ prop.default || '—' }}</td>
                  <td class="px-4 py-3 text-surface-600">{{ prop.description }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>

      <!-- Outputs -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Outputs</h2>
        <div class="overflow-x-auto rounded-lg border border-surface-200 bg-white">
          <table class="w-full text-sm">
            <thead class="bg-surface-50">
              <tr class="border-b border-surface-200 text-left">
                <th class="px-4 py-3 font-semibold text-surface-700">Name</th>
                <th class="px-4 py-3 font-semibold text-surface-700">Type</th>
                <th class="px-4 py-3 font-semibold text-surface-700">Description</th>
              </tr>
            </thead>
            <tbody>
              @for (prop of outputs; track prop.name) {
                <tr class="border-b border-surface-100 last:border-0">
                  <td class="px-4 py-3">
                    <code class="font-mono text-primary-600">{{ prop.name }}</code>
                  </td>
                  <td class="px-4 py-3">
                    <code class="rounded bg-surface-100 px-1.5 py-0.5 font-mono text-xs text-surface-700">{{ prop.type }}</code>
                  </td>
                  <td class="px-4 py-3 text-surface-600">{{ prop.description }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>

      <!-- Template Directives -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Template Directives</h2>
        <p class="mb-4 text-surface-600">
          Use these directives to customize rendering of different parts of the dropdown:
        </p>
        <div class="space-y-4">
          @for (directive of templateDirectives; track directive.name) {
            <div class="rounded-lg border border-surface-200 bg-white p-4">
              <h3 class="mb-2 font-semibold text-surface-900">{{ directive.name }}</h3>
              <p class="mb-3 text-sm text-surface-600">{{ directive.description }}</p>
              <int-code-block language="html" [code]="directive.code" />
            </div>
          }
        </div>
      </section>

      <!-- Methods -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Methods</h2>
        <div class="overflow-x-auto rounded-lg border border-surface-200 bg-white">
          <table class="w-full text-sm">
            <thead class="bg-surface-50">
              <tr class="border-b border-surface-200 text-left">
                <th class="px-4 py-3 font-semibold text-surface-700">Name</th>
                <th class="px-4 py-3 font-semibold text-surface-700">Description</th>
              </tr>
            </thead>
            <tbody>
              @for (method of methods; track method.name) {
                <tr class="border-b border-surface-100 last:border-0">
                  <td class="px-4 py-3">
                    <code class="font-mono text-primary-600">{{ method.name }}</code>
                  </td>
                  <td class="px-4 py-3 text-surface-600">{{ method.description }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>

      <!-- Helper Functions -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Helper Functions</h2>
        <p class="mb-4 text-surface-600">
          Exported helper functions for common operations:
        </p>
        <int-code-block language="typescript" [code]="helperCode" />
      </section>

      <!-- Types -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Types</h2>
        <int-code-block language="typescript" [code]="typesCode" />
      </section>
    </div>
  `,
})
export class DropdownApi {
  protected readonly importCode = `import {
  ComDropdown,
  ComDropdownOption,
  ComDropdownPanel,
  ComDropdownSearch,
  ComDropdownTag,
  ComDropdownGroup,
  ComDropdownOptionTpl,
  ComDropdownSelectedTpl,
  ComDropdownEmptyTpl,
  ComDropdownGroupTpl,
  ComDropdownTagTpl,
} from 'ngx-com/components/dropdown';`;

  protected readonly inputs: ApiProperty[] = [
    {
      name: 'options',
      type: 'T[]',
      default: '[]',
      description: 'Array of options to display in the dropdown.',
    },
    {
      name: 'value',
      type: 'T | T[] | null',
      default: 'null',
      description: 'Current value (single or array for multiple mode).',
    },
    {
      name: 'placeholder',
      type: 'string',
      default: "'Select...'",
      description: 'Placeholder text when no value is selected.',
    },
    {
      name: 'multiple',
      type: 'boolean',
      default: 'false',
      description: 'Enable multi-select mode.',
    },
    {
      name: 'searchable',
      type: 'boolean',
      default: 'false',
      description: 'Enable search/filter input.',
    },
    {
      name: 'searchPlaceholder',
      type: 'string',
      default: "'Search...'",
      description: 'Placeholder for the search input.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disable the dropdown.',
    },
    {
      name: 'required',
      type: 'boolean',
      default: 'false',
      description: 'Mark as required for forms.',
    },
    {
      name: 'clearable',
      type: 'boolean',
      default: 'false',
      description: 'Show a clear button to reset selection.',
    },
    {
      name: 'compareWith',
      type: '(a: T, b: T) => boolean',
      default: '(a, b) => a === b',
      description: 'Function to compare values for equality.',
    },
    {
      name: 'displayWith',
      type: '(value: T) => string',
      default: 'String(value)',
      description: 'Function to get display text from a value.',
    },
    {
      name: 'filterWith',
      type: '(option: T, query: string) => boolean',
      default: 'null',
      description: 'Custom filter function for search.',
    },
    {
      name: 'groupBy',
      type: '(option: T) => string',
      default: 'null',
      description: 'Function to group options by a key.',
    },
    {
      name: 'variant',
      type: "'default' | 'filled'",
      default: "'default'",
      description: 'Visual variant for the trigger button.',
    },
    {
      name: 'size',
      type: "'sm' | 'default' | 'lg'",
      default: "'default'",
      description: 'Size of the dropdown.',
    },
    {
      name: 'state',
      type: "'default' | 'error' | 'success'",
      default: "'default'",
      description: 'Validation state styling.',
    },
    {
      name: 'maxHeight',
      type: 'string',
      default: "'256px'",
      description: 'Maximum height of the dropdown panel.',
    },
    {
      name: 'panelWidth',
      type: "'trigger' | 'auto' | string",
      default: "'trigger'",
      description: 'Panel width strategy. Use trigger width, auto, or fixed.',
    },
    {
      name: 'searchDebounceMs',
      type: 'number',
      default: '300',
      description: 'Debounce time for search input in milliseconds.',
    },
  ];

  protected readonly outputs: ApiProperty[] = [
    {
      name: 'valueChange',
      type: 'T | T[] | null',
      description: 'Emitted when the value changes.',
    },
    {
      name: 'searchChange',
      type: 'string',
      description: 'Emitted when the search query changes.',
    },
    {
      name: 'opened',
      type: 'void',
      description: 'Emitted when the dropdown panel opens.',
    },
    {
      name: 'closed',
      type: 'void',
      description: 'Emitted when the dropdown panel closes.',
    },
  ];

  protected readonly templateDirectives = [
    {
      name: 'comDropdownOption',
      description: 'Custom template for rendering each option.',
      code: `<ng-template comDropdownOption let-item let-selected="selected">
  <span [class.font-bold]="selected">{{ item.name }}</span>
</ng-template>`,
    },
    {
      name: 'comDropdownSelected',
      description: 'Custom template for displaying the selected value in the trigger.',
      code: `<ng-template comDropdownSelected let-value let-placeholder="placeholder">
  @if (value) {
    <span class="flex items-center gap-2">
      <img [src]="value.avatar" class="h-5 w-5 rounded-full" />
      {{ value.name }}
    </span>
  } @else {
    {{ placeholder }}
  }
</ng-template>`,
    },
    {
      name: 'comDropdownEmpty',
      description: 'Custom template for the empty state.',
      code: `<ng-template comDropdownEmpty let-query>
  <div class="text-center py-4">
    @if (query) {
      No results for "{{ query }}"
    } @else {
      No options available
    }
  </div>
</ng-template>`,
    },
    {
      name: 'comDropdownGroup',
      description: 'Custom template for group headers.',
      code: `<ng-template comDropdownGroup let-label let-count="count">
  <div class="flex justify-between px-3 py-2 bg-surface-100">
    <span>{{ label }}</span>
    <span class="text-xs">({{ count }})</span>
  </div>
</ng-template>`,
    },
    {
      name: 'comDropdownTag',
      description: 'Custom template for tags in multi-select mode.',
      code: `<ng-template comDropdownTag let-value let-remove="remove">
  <span class="inline-flex items-center gap-1 bg-primary-100 px-2 py-0.5 rounded">
    {{ value.name }}
    <button (click)="remove()">×</button>
  </span>
</ng-template>`,
    },
  ];

  protected readonly methods = [
    { name: 'open()', description: 'Opens the dropdown panel.' },
    { name: 'close()', description: 'Closes the dropdown panel.' },
    { name: 'toggle()', description: 'Toggles the dropdown panel open/closed.' },
    { name: 'clear()', description: 'Clears the current selection.' },
    { name: 'isSelected(value: T)', description: 'Returns true if the value is selected.' },
  ];

  protected readonly helperCode = `import {
  defaultCompareWith,
  defaultDisplayWith,
  defaultFilterWith,
  generateDropdownId,
} from 'ngx-com/components/dropdown';

// Default comparison (strict equality)
defaultCompareWith(a, b); // a === b

// Default display (converts to string)
defaultDisplayWith(value); // String(value)

// Default filter (case-insensitive match)
defaultFilterWith(option, query, displayWith);

// Generate unique ID
const id = generateDropdownId(); // 'com-dropdown-1'`;

  protected readonly typesCode = `// Position type
type ComDropdownPosition = 'bottom' | 'top';

// Panel width strategy
type ComDropdownPanelWidth = 'trigger' | 'auto' | string;

// Visual variants
type ComDropdownVariant = 'default' | 'filled';
type ComDropdownSize = 'sm' | 'default' | 'lg';
type ComDropdownState = 'default' | 'error' | 'success';

// Processed option (internal)
interface ComDropdownProcessedOption<T> {
  value: T;
  displayText: string;
  disabled: boolean;
  id: string;
}

// Group structure
interface ComDropdownGroup<T> {
  key: string;
  options: T[];
  expanded: boolean;
}

// Template contexts
interface ComDropdownOptionContext<T> {
  $implicit: T;
  selected: boolean;
  active: boolean;
  index: number;
}

interface ComDropdownSelectedContext<T> {
  $implicit: T | T[] | null;
  placeholder: string;
  multiple: boolean;
}

interface ComDropdownEmptyContext {
  $implicit: string; // search query
}

interface ComDropdownGroupContext {
  $implicit: string; // group label
  count: number;
  expanded: boolean;
}

interface ComDropdownTagContext<T> {
  $implicit: T;
  index: number;
  remove: () => void;
}`;
}
