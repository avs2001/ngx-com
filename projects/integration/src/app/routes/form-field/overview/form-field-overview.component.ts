import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import {
  ComFormField,
  ComInput,
  ComLabel,
  ComHint,
  ComError,
  ComPrefix,
  ComSuffix,
} from 'ngx-com/components/form-field';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-form-field-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    ComFormField,
    ComInput,
    ComLabel,
    ComHint,
    ComError,
    ComPrefix,
    ComSuffix,
    CodeBlock,
  ],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Demo</h2>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="mx-auto max-w-md space-y-6">
          <com-form-field>
            <label comLabel>Email</label>
            <input comInput [formControl]="emailControl" placeholder="you@example.com" />
            <span comHint>We'll never share your email.</span>
            <span comError match="required">Email is required.</span>
            <span comError match="email">Please enter a valid email.</span>
          </com-form-field>

          <com-form-field appearance="fill">
            <label comLabel>Username</label>
            <input comInput placeholder="johndoe" />
            <span comHint>Choose a unique username.</span>
          </com-form-field>

          <com-form-field>
            <label comLabel>Amount</label>
            <span comPrefix>$</span>
            <input comInput type="number" placeholder="0.00" />
            <span comSuffix>USD</span>
          </com-form-field>
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
          <h3 class="mb-2 font-semibold text-surface-900">Floating Labels</h3>
          <p class="text-sm text-surface-600">
            Labels float above the input when focused or filled, with smooth CSS transitions.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">2 Appearances</h3>
          <p class="text-sm text-surface-600">
            Outline (default) and fill appearances for different design contexts.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Hints & Errors</h3>
          <p class="text-sm text-surface-600">
            Subscript area shows hints or errors with automatic aria-describedby wiring.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Prefix & Suffix</h3>
          <p class="text-sm text-surface-600">
            Content slots for icons, currency symbols, or action buttons.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Reactive Forms</h3>
          <p class="text-sm text-surface-600">
            Works with Angular reactive forms via the comInput directive.
          </p>
        </div>
        <div class="rounded-lg border border-surface-200 bg-white p-4">
          <h3 class="mb-2 font-semibold text-surface-900">Accessible</h3>
          <p class="text-sm text-surface-600">
            Automatic ARIA attributes, label association, and screen reader support.
          </p>
        </div>
      </div>
    </section>

    <!-- Architecture -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Two-Primitive Architecture</h2>
      <div class="rounded-lg border border-surface-200 bg-white p-6">
        <p class="mb-4 text-surface-600">
          The form field system uses two distinct primitives that compose together:
        </p>
        <ul class="list-inside list-disc space-y-2 text-surface-600">
          <li>
            <strong class="text-surface-900">com-form-field:</strong> Visual wrapper providing label, border,
            hints/errors, and prefix/suffix slots
          </li>
          <li>
            <strong class="text-surface-900">comInput:</strong> Behavioral directive on native input/textarea
            that reports state to the form field
          </li>
        </ul>
        <p class="mt-4 text-surface-600">
          The form field does NOT collect data. The input does NOT render UI.
          Together they form one cohesive unit.
        </p>
      </div>
    </section>
  `,
})
export class FormFieldOverview {
  protected readonly emailControl = new FormControl('', [Validators.required, Validators.email]);

  protected readonly basicUsageCode = `import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import {
  ComFormField,
  ComInput,
  ComLabel,
  ComHint,
  ComError,
} from 'ngx-com/components/form-field';

@Component({
  selector: 'app-example',
  imports: [
    ReactiveFormsModule,
    ComFormField,
    ComInput,
    ComLabel,
    ComHint,
    ComError,
  ],
  template: \`
    <com-form-field>
      <label comLabel>Email</label>
      <input comInput [formControl]="email" placeholder="you@example.com" />
      <span comHint>We'll never share your email.</span>
      <span comError match="required">Email is required.</span>
      <span comError match="email">Please enter a valid email.</span>
    </com-form-field>
  \`,
})
export class Example {
  email = new FormControl('', [Validators.required, Validators.email]);
}`;
}
