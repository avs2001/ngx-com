import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComCard } from 'ngx-com/components/card';
import { ComIcon } from 'ngx-com/components/icon';
import { ComRadio, ComRadioGroup } from 'ngx-com/components/radio';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-radio-examples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComRadio, ComRadioGroup, ComCard, ComIcon, CodeBlock, ReactiveFormsModule],
  styles: `
    .com-radio-card-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `,
  template: `
    <!-- Card Style -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Card Style</h2>
      <com-card variant="outlined" class="p-8">
        <com-radio-group
          [(value)]="cardValue"
          orientation="horizontal"
          aria-label="Select user role"
        >
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            @for (option of roleOptions; track option.value) {
              <label
                class="relative cursor-pointer rounded-xl border-2 p-6 text-center transition-colors"
                [class.border-primary]="cardValue() === option.value"
                [class.ring-2]="cardValue() === option.value"
                [class.ring-ring]="cardValue() === option.value"
                [class.border-border]="cardValue() !== option.value"
                [class.hover\:border-primary-hover]="cardValue() !== option.value"
                [class.has-\[\:focus-visible\]\:outline-2]="true"
                [class.has-\[\:focus-visible\]\:outline-offset-2]="true"
                [class.has-\[\:focus-visible\]\:outline-ring]="true"
              >
                <div class="flex flex-col items-center gap-3">
                  <div
                    class="inline-flex size-12 items-center justify-center rounded-full bg-muted"
                  >
                    <com-icon [name]="option.icon" size="lg" color="muted" />
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-foreground">
                      {{ option.label }}
                    </p>
                    <p class="mt-1 text-xs text-muted-foreground">
                      {{ option.description }}
                    </p>
                  </div>
                </div>
                <com-radio
                  [value]="option.value"
                  class="com-radio-card-hidden"
                />
              </label>
            }
          </div>
        </com-radio-group>
        <p class="mt-4 text-sm text-muted-foreground">
          Selected role: <span class="font-medium text-foreground">{{ cardValue() }}</span>
        </p>
      </com-card>
      <int-code-block language="html" [code]="cardStyleCode" />
    </section>

    <!-- Sizes -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Sizes</h2>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-start gap-12">
          <com-radio-group [(value)]="sizeSmall" size="sm" aria-label="Small radio group">
            <com-radio value="a">Small A</com-radio>
            <com-radio value="b">Small B</com-radio>
          </com-radio-group>

          <com-radio-group [(value)]="sizeMedium" size="md" aria-label="Medium radio group">
            <com-radio value="a">Medium A</com-radio>
            <com-radio value="b">Medium B</com-radio>
          </com-radio-group>

          <com-radio-group [(value)]="sizeLarge" size="lg" aria-label="Large radio group">
            <com-radio value="a">Large A</com-radio>
            <com-radio value="b">Large B</com-radio>
          </com-radio-group>
        </div>
      </com-card>
      <int-code-block language="html" [code]="sizesCode" />
    </section>

    <!-- Variants -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Variants</h2>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-start gap-12">
          <com-radio-group [(value)]="variantPrimary" variant="primary" aria-label="Primary variant">
            <com-radio value="a">Primary A</com-radio>
            <com-radio value="b">Primary B</com-radio>
          </com-radio-group>

          <com-radio-group [(value)]="variantAccent" variant="accent" aria-label="Accent variant">
            <com-radio value="a">Accent A</com-radio>
            <com-radio value="b">Accent B</com-radio>
          </com-radio-group>

          <com-radio-group [(value)]="variantWarn" variant="warn" aria-label="Warning variant">
            <com-radio value="a">Warning A</com-radio>
            <com-radio value="b">Warning B</com-radio>
          </com-radio-group>
        </div>
      </com-card>
      <int-code-block language="html" [code]="variantsCode" />
    </section>

    <!-- Disabled -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Disabled State</h2>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-start gap-12">
          <com-radio-group [(value)]="disabledGroup" aria-label="Group with disabled option">
            <com-radio value="enabled1">Enabled option</com-radio>
            <com-radio value="disabled" [disabled]="true">Disabled option</com-radio>
            <com-radio value="enabled2">Another enabled</com-radio>
          </com-radio-group>

          <com-radio-group [(value)]="fullyDisabled" [disabled]="true" aria-label="Fully disabled group">
            <com-radio value="a">Disabled A</com-radio>
            <com-radio value="b">Disabled B</com-radio>
          </com-radio-group>
        </div>
      </com-card>
      <int-code-block language="html" [code]="disabledCode" />
    </section>

    <!-- Reactive Forms -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Reactive Forms</h2>
      <com-card variant="outlined" class="p-8">
        <form [formGroup]="form" class="space-y-4">
          <com-radio-group formControlName="plan" aria-label="Select plan">
            <com-radio value="free">Free Plan</com-radio>
            <com-radio value="pro">Pro Plan</com-radio>
            <com-radio value="enterprise">Enterprise Plan</com-radio>
          </com-radio-group>
          <p class="text-sm text-surface-600">Selected: {{ form.value.plan }}</p>
        </form>
      </com-card>
      <int-code-block language="typescript" [code]="reactiveFormsCode" />
    </section>

    <!-- Form Validation -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Form Validation</h2>
      <com-card variant="outlined" class="p-8">
        <form [formGroup]="validationForm" class="space-y-4">
          <com-radio-group
            formControlName="priority"
            errorMessage="Please select a priority level"
            aria-label="Select priority"
          >
            <com-radio value="low">Low</com-radio>
            <com-radio value="medium">Medium</com-radio>
            <com-radio value="high">High</com-radio>
          </com-radio-group>
          <div class="flex gap-2">
            <button
              type="button"
              class="rounded bg-primary px-4 py-2 text-sm text-primary-foreground"
              (click)="markAsTouched()"
            >
              Mark as Touched
            </button>
            <button
              type="button"
              class="rounded bg-muted px-4 py-2 text-sm text-muted-foreground"
              (click)="resetValidationForm()"
            >
              Reset
            </button>
          </div>
          <p class="text-sm text-surface-600">
            Status: {{ validationForm.controls.priority.status }} |
            Touched: {{ validationForm.controls.priority.touched }}
          </p>
        </form>
      </com-card>
      <int-code-block language="typescript" [code]="validationCode" />
    </section>

    <!-- Horizontal Layout -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Horizontal Layout</h2>
      <com-card variant="outlined" class="p-8">
        <com-radio-group
          [(value)]="horizontalValue"
          orientation="horizontal"
          aria-label="Horizontal radio group"
        >
          <com-radio value="left">Left</com-radio>
          <com-radio value="center">Center</com-radio>
          <com-radio value="right">Right</com-radio>
          <com-radio value="justify">Justify</com-radio>
        </com-radio-group>
      </com-card>
      <int-code-block language="html" [code]="horizontalCode" />
    </section>
  `,
})
export class RadioExamples {
  protected readonly cardValue: WritableSignal<string | null> = signal('standard');

  protected readonly roleOptions: { value: string; label: string; description: string; icon: string }[] = [
    {
      value: 'admin',
      label: 'Admin User',
      description: 'Full access to manage the organization',
      icon: 'shield',
    },
    {
      value: 'standard',
      label: 'Standard User',
      description: 'End-user who views their devices and data',
      icon: 'user',
    },
    {
      value: 'viewer',
      label: 'Data Viewer',
      description: 'Read-only access to anonymized data',
      icon: 'eye',
    },
  ];

  protected readonly sizeSmall: WritableSignal<string | null> = signal('a');
  protected readonly sizeMedium: WritableSignal<string | null> = signal('a');
  protected readonly sizeLarge: WritableSignal<string | null> = signal('a');
  protected readonly variantPrimary: WritableSignal<string | null> = signal('a');
  protected readonly variantAccent: WritableSignal<string | null> = signal('a');
  protected readonly variantWarn: WritableSignal<string | null> = signal('a');
  protected readonly disabledGroup: WritableSignal<string | null> = signal('enabled1');
  protected readonly fullyDisabled: WritableSignal<string | null> = signal('a');
  protected readonly horizontalValue: WritableSignal<string | null> = signal('center');

  protected readonly form = new FormGroup({
    plan: new FormControl('pro'),
  });

  protected readonly validationForm = new FormGroup({
    priority: new FormControl<string | null>(null, Validators.required),
  });

  protected markAsTouched(): void {
    this.validationForm.controls.priority.markAsTouched();
  }

  protected resetValidationForm(): void {
    this.validationForm.reset();
  }

  protected readonly sizesCode = `<com-radio-group size="sm">
  <com-radio value="a">Small A</com-radio>
  <com-radio value="b">Small B</com-radio>
</com-radio-group>

<com-radio-group size="lg">
  <com-radio value="a">Large A</com-radio>
  <com-radio value="b">Large B</com-radio>
</com-radio-group>`;

  protected readonly variantsCode = `<com-radio-group variant="primary">...</com-radio-group>
<com-radio-group variant="accent">...</com-radio-group>
<com-radio-group variant="warn">...</com-radio-group>`;

  protected readonly disabledCode = `<!-- Individual option disabled -->
<com-radio-group>
  <com-radio value="enabled">Enabled</com-radio>
  <com-radio value="disabled" [disabled]="true">Disabled</com-radio>
</com-radio-group>

<!-- Entire group disabled -->
<com-radio-group [disabled]="true">
  <com-radio value="a">All disabled</com-radio>
  <com-radio value="b">All disabled</com-radio>
</com-radio-group>`;

  protected readonly reactiveFormsCode = `import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ComRadio, ComRadioGroup } from 'ngx-com/components/radio';

@Component({
  imports: [ReactiveFormsModule, ComRadio, ComRadioGroup],
  template: \`
    <form [formGroup]="form">
      <com-radio-group formControlName="plan" aria-label="Select plan">
        <com-radio value="free">Free Plan</com-radio>
        <com-radio value="pro">Pro Plan</com-radio>
        <com-radio value="enterprise">Enterprise Plan</com-radio>
      </com-radio-group>
    </form>
  \`,
})
export class Example {
  form = new FormGroup({
    plan: new FormControl('pro'),
  });
}`;

  protected readonly validationCode = `import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComRadio, ComRadioGroup } from 'ngx-com/components/radio';

@Component({
  imports: [ReactiveFormsModule, ComRadio, ComRadioGroup],
  template: \`
    <form [formGroup]="form">
      <com-radio-group
        formControlName="priority"
        errorMessage="Please select a priority level"
      >
        <com-radio value="low">Low</com-radio>
        <com-radio value="medium">Medium</com-radio>
        <com-radio value="high">High</com-radio>
      </com-radio-group>
    </form>
  \`,
})
export class Example {
  form = new FormGroup({
    priority: new FormControl<string | null>(null, Validators.required),
  });
}`;

  protected readonly horizontalCode = `<com-radio-group orientation="horizontal">
  <com-radio value="left">Left</com-radio>
  <com-radio value="center">Center</com-radio>
  <com-radio value="right">Right</com-radio>
</com-radio-group>`;

  protected readonly cardStyleCode = `<com-radio-group [(value)]="cardValue" orientation="horizontal" aria-label="Select user role">
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
    @for (option of roleOptions; track option.value) {
      <label
        class="relative cursor-pointer rounded-xl border-2 p-6 text-center transition-colors"
        [class.border-primary]="cardValue() === option.value"
        [class.ring-2]="cardValue() === option.value"
        [class.ring-ring]="cardValue() === option.value"
        [class.border-border]="cardValue() !== option.value"
      >
        <div class="flex flex-col items-center gap-3">
          <div class="inline-flex size-12 items-center justify-center rounded-full bg-muted">
            <com-icon [name]="option.icon" size="lg" color="muted" />
          </div>
          <div>
            <p class="text-sm font-semibold text-foreground">{{ option.label }}</p>
            <p class="mt-1 text-xs text-muted-foreground">{{ option.description }}</p>
          </div>
        </div>
        <com-radio [value]="option.value" class="sr-only" />
      </label>
    }
  </div>
</com-radio-group>`;
}
