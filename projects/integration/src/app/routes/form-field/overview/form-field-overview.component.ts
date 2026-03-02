import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { ComCard } from 'ngx-com/components/card';
import { ComItem } from 'ngx-com/components/item';
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
    ComCard,
    ComItem,
    CodeBlock,
  ],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <com-item
        title="Demo"
        description="Form fields with floating labels, hints, and validation"
        icon="play"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-8">
        <div class="mx-auto max-w-md space-y-6">
          <com-form-field>
            <label comLabel>Email</label>
            <input comInput [formControl]="emailControl" />
            <span comHint>We'll never share your email.</span>
            <span comError match="required">Email is required.</span>
            <span comError match="email">Please enter a valid email.</span>
          </com-form-field>

          <com-form-field appearance="fill">
            <label comLabel>Username</label>
            <input comInput />
            <span comHint>Choose a unique username.</span>
          </com-form-field>

          <com-form-field>
            <label comLabel>Amount</label>
            <span comPrefix>$</span>
            <input comInput type="number" />
            <span comSuffix>USD</span>
          </com-form-field>
        </div>
      </com-card>
    </section>

    <!-- Basic Usage -->
    <section class="mb-12">
      <com-item
        title="Basic Usage"
        description="Import and compose form field primitives"
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
        description="What makes com-form-field powerful"
        icon="star"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-3">
        <div class="space-y-1">
          <com-item
            title="Floating Labels"
            description="Labels float above the input when focused or filled, with smooth CSS transitions"
            icon="type"
          />
          <com-item
            title="2 Appearances"
            description="Outline (default) and fill appearances for different design contexts"
            icon="layers"
            iconColor="accent"
          />
          <com-item
            title="Hints & Errors"
            description="Subscript area shows hints or errors with automatic aria-describedby wiring"
            icon="info"
          />
          <com-item
            title="Prefix & Suffix"
            description="Content slots for icons, currency symbols, or action buttons"
            icon="between-horizontal-start"
            iconColor="accent"
          />
          <com-item
            title="Reactive Forms"
            description="Works with Angular reactive forms via the comInput directive"
            icon="file-code"
          />
          <com-item
            title="Accessible"
            description="Automatic ARIA attributes, label association, and screen reader support"
            icon="accessibility"
            iconColor="accent"
          />
        </div>
      </com-card>
    </section>

    <!-- Architecture -->
    <section>
      <com-item
        title="Two-Primitive Architecture"
        description="How form field and input work together"
        icon="info"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-6">
        <ul class="list-inside list-disc space-y-2 text-foreground">
          <li>
            <strong>com-form-field:</strong> Visual wrapper providing label, border,
            hints/errors, and prefix/suffix slots
          </li>
          <li>
            <strong>comInput:</strong> Behavioral directive on native input/textarea
            that reports state to the form field
          </li>
        </ul>
        <p class="mt-4 text-foreground">
          The form field does NOT collect data. The input does NOT render UI.
          Together they form one cohesive unit.
        </p>
      </com-card>
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
