import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ComCard } from 'ngx-com/components/card';
import { ComRadio, ComRadioGroup } from 'ngx-com/components/radio';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-radio-examples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComRadio, ComRadioGroup, ComCard, CodeBlock, ReactiveFormsModule],
  template: `
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

    <!-- Error State -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Error State</h2>
      <com-card variant="outlined" class="p-8">
        <com-radio-group
          [(value)]="errorValue"
          [error]="true"
          errorMessage="Please select an option"
          aria-label="Radio group with error"
        >
          <com-radio value="a">Option A</com-radio>
          <com-radio value="b">Option B</com-radio>
          <com-radio value="c">Option C</com-radio>
        </com-radio-group>
      </com-card>
      <int-code-block language="html" [code]="errorCode" />
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
  protected readonly sizeSmall: WritableSignal<string | null> = signal('a');
  protected readonly sizeMedium: WritableSignal<string | null> = signal('a');
  protected readonly sizeLarge: WritableSignal<string | null> = signal('a');
  protected readonly variantPrimary: WritableSignal<string | null> = signal('a');
  protected readonly variantAccent: WritableSignal<string | null> = signal('a');
  protected readonly variantWarn: WritableSignal<string | null> = signal('a');
  protected readonly disabledGroup: WritableSignal<string | null> = signal('enabled1');
  protected readonly fullyDisabled: WritableSignal<string | null> = signal('a');
  protected readonly errorValue: WritableSignal<string | null> = signal(null);
  protected readonly horizontalValue: WritableSignal<string | null> = signal('center');

  protected readonly form = new FormGroup({
    plan: new FormControl('pro'),
  });

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

  protected readonly errorCode = `<com-radio-group
  [(value)]="selected"
  [error]="true"
  errorMessage="Please select an option"
>
  <com-radio value="a">Option A</com-radio>
  <com-radio value="b">Option B</com-radio>
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

  protected readonly horizontalCode = `<com-radio-group orientation="horizontal">
  <com-radio value="left">Left</com-radio>
  <com-radio value="center">Center</com-radio>
  <com-radio value="right">Right</com-radio>
</com-radio-group>`;
}
