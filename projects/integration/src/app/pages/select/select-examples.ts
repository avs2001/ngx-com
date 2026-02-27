import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ComSelect, ComSelectOption } from 'ngx-com/components/select';
import { CodeBlock } from '../../shared/code-block';

interface Country {
  code: string;
  name: string;
}

@Component({
  selector: 'int-select-examples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComSelect, ComSelectOption, CodeBlock, RouterLink, ReactiveFormsModule, FormsModule, JsonPipe],
  template: `
    <div class="mx-auto max-w-4xl px-6 py-12">
      <!-- Breadcrumb -->
      <nav class="mb-6 text-sm">
        <ol class="flex items-center gap-2 text-surface-500">
          <li><a routerLink="/" class="hover:text-primary-600">Home</a></li>
          <li>/</li>
          <li><span class="text-surface-900">Select</span></li>
        </ol>
      </nav>

      <h1 class="mb-4 text-4xl font-bold text-surface-900">Select Component</h1>
      <p class="mb-8 text-lg text-surface-600">
        A customizable dropdown select component with keyboard navigation and form integration.
      </p>

      <!-- Basic Usage -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Basic Usage</h2>
        <p class="mb-4 text-surface-600">
          Simple select with string values.
        </p>
        <div class="mb-4 rounded-xl border border-surface-200 bg-white p-8">
          <div class="flex flex-col items-start gap-4">
            <com-select
              [(ngModel)]="basicValue"
              placeholder="Select a fruit"
              class="w-64"
            >
              <com-select-option [value]="'apple'">Apple</com-select-option>
              <com-select-option [value]="'banana'">Banana</com-select-option>
              <com-select-option [value]="'cherry'">Cherry</com-select-option>
              <com-select-option [value]="'date'">Date</com-select-option>
            </com-select>
            @if (basicValue()) {
              <p class="text-sm text-surface-600">
                Selected: {{ basicValue() }}
              </p>
            }
          </div>
        </div>
        <int-code-block language="html" [code]="basicCode" />
      </section>

      <!-- Reactive Forms -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Reactive Forms</h2>
        <p class="mb-4 text-surface-600">
          Integration with Angular reactive forms using formControlName.
        </p>
        <div class="mb-4 rounded-xl border border-surface-200 bg-white p-8">
          <form [formGroup]="form" class="flex flex-col items-start gap-4">
            <label class="text-sm font-medium text-surface-700">Country</label>
            <com-select formControlName="country" placeholder="Select a country" class="w-64">
              @for (country of countries; track country.code) {
                <com-select-option [value]="country.code">{{ country.name }}</com-select-option>
              }
            </com-select>
            <p class="text-sm text-surface-600">
              Form value: {{ form.value | json }}
            </p>
          </form>
        </div>
        <int-code-block language="typescript" [code]="reactiveCode" />
      </section>

      <!-- Object Values -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Object Values</h2>
        <p class="mb-4 text-surface-600">
          Use compareWith to compare object values by a specific property.
        </p>
        <div class="mb-4 rounded-xl border border-surface-200 bg-white p-8">
          <div class="flex flex-col items-start gap-4">
            <com-select
              [(ngModel)]="selectedCountry"
              [compareWith]="compareCountries"
              placeholder="Select a country"
              class="w-64"
            >
              @for (country of countries; track country.code) {
                <com-select-option [value]="country">{{ country.name }}</com-select-option>
              }
            </com-select>
            @if (selectedCountry()) {
              <p class="text-sm text-surface-600">
                Selected: {{ selectedCountry()?.name }} ({{ selectedCountry()?.code }})
              </p>
            }
          </div>
        </div>
        <int-code-block language="typescript" [code]="objectCode" />
      </section>

      <!-- Disabled Options -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Disabled Options</h2>
        <p class="mb-4 text-surface-600">
          Individual options can be disabled.
        </p>
        <div class="mb-4 rounded-xl border border-surface-200 bg-white p-8">
          <div class="flex flex-col items-start gap-4">
            <com-select [(ngModel)]="disabledValue" placeholder="Select an option" class="w-64">
              <com-select-option [value]="'available'">Available</com-select-option>
              <com-select-option [value]="'coming-soon'" [disabled]="true">Coming Soon</com-select-option>
              <com-select-option [value]="'premium'">Premium</com-select-option>
              <com-select-option [value]="'deprecated'" [disabled]="true">Deprecated</com-select-option>
            </com-select>
          </div>
        </div>
        <int-code-block language="html" [code]="disabledCode" />
      </section>

      <!-- Sizes -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Sizes</h2>
        <p class="mb-4 text-surface-600">
          Three size variants: sm, md (default), and lg.
        </p>
        <div class="mb-4 rounded-xl border border-surface-200 bg-white p-8">
          <div class="flex flex-col items-start gap-4">
            <div class="flex items-end gap-4">
              <div>
                <label class="mb-1 block text-xs text-surface-500">Small</label>
                <com-select size="sm" placeholder="Small" class="w-40">
                  <com-select-option [value]="'opt1'">Option 1</com-select-option>
                  <com-select-option [value]="'opt2'">Option 2</com-select-option>
                </com-select>
              </div>
              <div>
                <label class="mb-1 block text-xs text-surface-500">Medium</label>
                <com-select size="md" placeholder="Medium" class="w-40">
                  <com-select-option [value]="'opt1'">Option 1</com-select-option>
                  <com-select-option [value]="'opt2'">Option 2</com-select-option>
                </com-select>
              </div>
              <div>
                <label class="mb-1 block text-xs text-surface-500">Large</label>
                <com-select size="lg" placeholder="Large" class="w-40">
                  <com-select-option [value]="'opt1'">Option 1</com-select-option>
                  <com-select-option [value]="'opt2'">Option 2</com-select-option>
                </com-select>
              </div>
            </div>
          </div>
        </div>
        <int-code-block language="html" [code]="sizesCode" />
      </section>

      <!-- Variants -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Variants</h2>
        <p class="mb-4 text-surface-600">
          Visual variants: default, ghost, and bordered.
        </p>
        <div class="mb-4 rounded-xl border border-surface-200 bg-white p-8">
          <div class="flex flex-col items-start gap-4">
            <div class="flex items-end gap-4">
              <div>
                <label class="mb-1 block text-xs text-surface-500">Default</label>
                <com-select variant="default" placeholder="Default" class="w-40">
                  <com-select-option [value]="'opt1'">Option 1</com-select-option>
                  <com-select-option [value]="'opt2'">Option 2</com-select-option>
                </com-select>
              </div>
              <div>
                <label class="mb-1 block text-xs text-surface-500">Ghost</label>
                <com-select variant="ghost" placeholder="Ghost" class="w-40">
                  <com-select-option [value]="'opt1'">Option 1</com-select-option>
                  <com-select-option [value]="'opt2'">Option 2</com-select-option>
                </com-select>
              </div>
              <div>
                <label class="mb-1 block text-xs text-surface-500">Bordered</label>
                <com-select variant="bordered" placeholder="Bordered" class="w-40">
                  <com-select-option [value]="'opt1'">Option 1</com-select-option>
                  <com-select-option [value]="'opt2'">Option 2</com-select-option>
                </com-select>
              </div>
            </div>
          </div>
        </div>
        <int-code-block language="html" [code]="variantsCode" />
      </section>

      <!-- Disabled State -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Disabled State</h2>
        <p class="mb-4 text-surface-600">
          The entire select can be disabled.
        </p>
        <div class="mb-4 rounded-xl border border-surface-200 bg-white p-8">
          <div class="flex flex-col items-start gap-4">
            <com-select [disabled]="true" placeholder="Disabled select" class="w-64">
              <com-select-option [value]="'opt1'">Option 1</com-select-option>
              <com-select-option [value]="'opt2'">Option 2</com-select-option>
            </com-select>
          </div>
        </div>
        <int-code-block language="html" [code]="disabledSelectCode" />
      </section>

      <!-- Keyboard Navigation -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Keyboard Navigation</h2>
        <p class="mb-4 text-surface-600">
          Full keyboard support for accessibility.
        </p>
        <div class="mb-4 rounded-xl border border-surface-200 bg-white p-8">
          <div class="flex flex-col gap-4">
            <ul class="list-inside list-disc space-y-2 text-sm text-surface-600">
              <li><kbd class="rounded bg-surface-100 px-1.5 py-0.5 font-mono text-xs">Tab</kbd> - Focus/blur the select</li>
              <li><kbd class="rounded bg-surface-100 px-1.5 py-0.5 font-mono text-xs">Enter</kbd> / <kbd class="rounded bg-surface-100 px-1.5 py-0.5 font-mono text-xs">Space</kbd> - Open panel / Select option</li>
              <li><kbd class="rounded bg-surface-100 px-1.5 py-0.5 font-mono text-xs">Arrow Up/Down</kbd> - Navigate options</li>
              <li><kbd class="rounded bg-surface-100 px-1.5 py-0.5 font-mono text-xs">Home</kbd> / <kbd class="rounded bg-surface-100 px-1.5 py-0.5 font-mono text-xs">End</kbd> - Jump to first/last option</li>
              <li><kbd class="rounded bg-surface-100 px-1.5 py-0.5 font-mono text-xs">Escape</kbd> - Close panel</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class SelectExamples {
  // Basic usage
  protected readonly basicValue = signal<string | null>(null);

  // Reactive forms
  protected readonly form = new FormGroup({
    country: new FormControl<string | null>(null),
  });

  // Object values
  protected readonly selectedCountry = signal<Country | null>(null);
  protected readonly countries: Country[] = [
    { code: 'us', name: 'United States' },
    { code: 'uk', name: 'United Kingdom' },
    { code: 'ca', name: 'Canada' },
    { code: 'au', name: 'Australia' },
    { code: 'de', name: 'Germany' },
    { code: 'fr', name: 'France' },
  ];

  protected compareCountries = (a: Country, b: Country): boolean => a?.code === b?.code;

  // Disabled options
  protected readonly disabledValue = signal<string | null>(null);

  // Code examples
  protected readonly basicCode = `<com-select [(ngModel)]="selectedFruit" placeholder="Select a fruit">
  <com-select-option [value]="'apple'">Apple</com-select-option>
  <com-select-option [value]="'banana'">Banana</com-select-option>
  <com-select-option [value]="'cherry'">Cherry</com-select-option>
</com-select>`;

  protected readonly reactiveCode = `import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ComSelect, ComSelectOption } from 'ngx-com/components/select';

@Component({
  imports: [ComSelect, ComSelectOption, ReactiveFormsModule],
  template: \`
    <form [formGroup]="form">
      <com-select formControlName="country" placeholder="Select a country">
        @for (country of countries; track country.code) {
          <com-select-option [value]="country.code">
            {{ country.name }}
          </com-select-option>
        }
      </com-select>
    </form>
  \`,
})
export class MyComponent {
  form = new FormGroup({
    country: new FormControl<string | null>(null),
  });

  countries = [
    { code: 'us', name: 'United States' },
    { code: 'uk', name: 'United Kingdom' },
  ];
}`;

  protected readonly objectCode = `// Use compareWith for object comparison
<com-select
  [(ngModel)]="selectedCountry"
  [compareWith]="compareCountries"
  placeholder="Select a country"
>
  @for (country of countries; track country.code) {
    <com-select-option [value]="country">
      {{ country.name }}
    </com-select-option>
  }
</com-select>

// In component:
compareCountries = (a: Country, b: Country) => a?.code === b?.code;`;

  protected readonly disabledCode = `<com-select placeholder="Select an option">
  <com-select-option [value]="'available'">Available</com-select-option>
  <com-select-option [value]="'coming-soon'" [disabled]="true">
    Coming Soon
  </com-select-option>
</com-select>`;

  protected readonly sizesCode = `<com-select size="sm" placeholder="Small">...</com-select>
<com-select size="md" placeholder="Medium">...</com-select>
<com-select size="lg" placeholder="Large">...</com-select>`;

  protected readonly variantsCode = `<com-select variant="default" placeholder="Default">...</com-select>
<com-select variant="ghost" placeholder="Ghost">...</com-select>
<com-select variant="bordered" placeholder="Bordered">...</com-select>`;

  protected readonly disabledSelectCode = `<com-select [disabled]="true" placeholder="Disabled select">
  <com-select-option [value]="'opt1'">Option 1</com-select-option>
</com-select>`;
}
