import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  selector: 'int-form-field-examples',
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
    <!-- Label Modes -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Label Modes</h2>
      <p class="mb-4 text-surface-600">
        Two approaches: floating label (Material Design style) or simple placeholder.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="mx-auto max-w-md space-y-6">
          <com-form-field>
            <label comLabel>Floating Label</label>
            <input comInput />
            <span comHint>Label floats up on focus or when filled.</span>
          </com-form-field>

          <com-form-field>
            <input comInput placeholder="Simple placeholder (no label)" />
            <span comHint>Just a placeholder, no floating label.</span>
          </com-form-field>
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="labelModesCode" />
    </section>

    <!-- Appearances -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Appearances</h2>
      <p class="mb-4 text-surface-600">
        Two visual styles: outline (default) and fill.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="mx-auto max-w-md space-y-6">
          <com-form-field appearance="outline">
            <label comLabel>Outline</label>
            <input comInput />
          </com-form-field>

          <com-form-field appearance="fill">
            <label comLabel>Fill</label>
            <input comInput />
          </com-form-field>
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="appearancesCode" />
    </section>

    <!-- Colors -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Colors</h2>
      <p class="mb-4 text-surface-600">
        Three semantic colors for the focus state.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="mx-auto max-w-md space-y-6">
          <com-form-field color="primary">
            <label comLabel>Primary</label>
            <input comInput />
          </com-form-field>

          <com-form-field color="accent">
            <label comLabel>Accent</label>
            <input comInput />
          </com-form-field>

          <com-form-field color="warn">
            <label comLabel>Warn</label>
            <input comInput />
          </com-form-field>
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="colorsCode" />
    </section>

    <!-- Prefix & Suffix -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Prefix & Suffix</h2>
      <p class="mb-4 text-surface-600">
        Add content before or after the input using prefix and suffix slots.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="mx-auto max-w-md space-y-6">
          <com-form-field>
            <label comLabel>Price</label>
            <span comPrefix>$</span>
            <input comInput type="number" />
            <span comSuffix>.00</span>
          </com-form-field>

          <com-form-field>
            <label comLabel>Website</label>
            <span comPrefix>https://</span>
            <input comInput />
          </com-form-field>

          <com-form-field>
            <svg comPrefix class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input comInput placeholder="Search..." />
            <button comSuffix type="button" class="text-surface-400 hover:text-surface-600">
              <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </com-form-field>
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="prefixSuffixCode" />
    </section>

    <!-- Hints -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Hints</h2>
      <p class="mb-4 text-surface-600">
        Provide supplementary information with hints. Use align="end" for right-aligned hints.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="mx-auto max-w-md space-y-6">
          <com-form-field>
            <label comLabel>Username</label>
            <input comInput />
            <span comHint>Letters, numbers, and underscores only.</span>
          </com-form-field>

          <com-form-field>
            <label comLabel>Bio</label>
            <textarea comInput rows="3"></textarea>
            <span comHint>Keep it brief.</span>
            <span comHint align="end">{{ bioLength() }}/150</span>
          </com-form-field>
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="hintsCode" />
    </section>

    <!-- Validation & Errors -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Validation & Errors</h2>
      <p class="mb-4 text-surface-600">
        Errors replace hints when the control is invalid. Use <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">match</code>
        to show specific errors for different validation rules.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="mx-auto max-w-md space-y-6">
          <com-form-field>
            <label comLabel>Email</label>
            <input comInput [formControl]="emailControl" />
            <span comHint>Enter your email address.</span>
            <span comError match="required">Email is required.</span>
            <span comError match="email">Please enter a valid email address.</span>
          </com-form-field>

          <com-form-field>
            <label comLabel>Password</label>
            <input comInput [formControl]="passwordControl" type="password" />
            <span comHint>At least 8 characters.</span>
            <span comError match="required">Password is required.</span>
            <span comError match="minlength">Password must be at least 8 characters.</span>
          </com-form-field>

          <div class="pt-2 text-sm text-surface-500">
            Tip: Focus and blur the fields to trigger validation.
          </div>
        </div>
      </div>
      <int-code-block class="mt-4" language="typescript" [code]="validationCode" />
    </section>

    <!-- Float Label Options -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Float Label Options</h2>
      <p class="mb-4 text-surface-600">
        Control when the label floats: auto (default) or always.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="mx-auto max-w-md space-y-6">
          <com-form-field floatLabel="auto">
            <label comLabel>Auto (default)</label>
            <input comInput />
            <span comHint>Label floats on focus or when filled.</span>
          </com-form-field>

          <com-form-field floatLabel="always">
            <label comLabel>Always Floating</label>
            <input comInput />
            <span comHint>Label is always in floating position.</span>
          </com-form-field>
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="floatLabelCode" />
    </section>

    <!-- Textarea -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Textarea</h2>
      <p class="mb-4 text-surface-600">
        The comInput directive works with both input and textarea elements.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="mx-auto max-w-md space-y-6">
          <com-form-field>
            <label comLabel>Description</label>
            <textarea comInput rows="4"></textarea>
            <span comHint>Markdown is supported.</span>
          </com-form-field>

          <com-form-field appearance="fill">
            <label comLabel>Notes</label>
            <textarea comInput rows="3"></textarea>
          </com-form-field>
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="textareaCode" />
    </section>

    <!-- Reactive Forms -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Reactive Forms</h2>
      <p class="mb-4 text-surface-600">
        Full integration with Angular reactive forms.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <form [formGroup]="form" class="mx-auto max-w-md space-y-6">
          <com-form-field>
            <label comLabel>First Name</label>
            <input comInput formControlName="firstName" />
            <span comError match="required">First name is required.</span>
          </com-form-field>

          <com-form-field>
            <label comLabel>Last Name</label>
            <input comInput formControlName="lastName" />
            <span comError match="required">Last name is required.</span>
          </com-form-field>

          <com-form-field>
            <label comLabel>Email</label>
            <input comInput formControlName="email" type="email" />
            <span comError match="required">Email is required.</span>
            <span comError match="email">Invalid email format.</span>
          </com-form-field>

          <div class="flex items-center gap-4 pt-4">
            <button
              type="submit"
              class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
              [disabled]="form.invalid"
            >
              Submit
            </button>
            <span class="text-sm text-surface-500">
              Form {{ form.valid ? 'valid' : 'invalid' }}
            </span>
          </div>
        </form>
      </div>
      <int-code-block class="mt-4" language="typescript" [code]="reactiveFormsCode" />
    </section>

    <!-- Disabled State -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Disabled State</h2>
      <p class="mb-4 text-surface-600">
        Disabled inputs render with reduced opacity and no interaction.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="mx-auto max-w-md space-y-6">
          <com-form-field>
            <label comLabel>Disabled Field</label>
            <input comInput [formControl]="disabledControl" />
            <span comHint>This field cannot be edited.</span>
          </com-form-field>
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="disabledCode" />
    </section>
  `,
})
export class FormFieldExamples {
  // Signals for hints
  protected readonly bioLength = signal(0);

  // Form controls for validation demo
  protected readonly emailControl = new FormControl('', [Validators.required, Validators.email]);
  protected readonly passwordControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  protected readonly disabledControl = new FormControl({ value: 'Read only value', disabled: true });

  // Reactive form
  protected readonly form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  // Code examples
  protected readonly labelModesCode = `<!-- Floating label: label acts as placeholder, floats up on focus/fill -->
<com-form-field>
  <label comLabel>Floating Label</label>
  <input comInput />
</com-form-field>

<!-- Simple placeholder: no floating label, just placeholder text -->
<com-form-field>
  <input comInput placeholder="Simple placeholder" />
</com-form-field>`;

  protected readonly appearancesCode = `<com-form-field appearance="outline">
  <label comLabel>Outline</label>
  <input comInput />
</com-form-field>

<com-form-field appearance="fill">
  <label comLabel>Fill</label>
  <input comInput />
</com-form-field>`;

  protected readonly colorsCode = `<com-form-field color="primary">
  <label comLabel>Primary</label>
  <input comInput />
</com-form-field>

<com-form-field color="accent">
  <label comLabel>Accent</label>
  <input comInput />
</com-form-field>

<com-form-field color="warn">
  <label comLabel>Warn</label>
  <input comInput />
</com-form-field>`;

  protected readonly prefixSuffixCode = `<com-form-field>
  <label comLabel>Price</label>
  <span comPrefix>$</span>
  <input comInput type="number" />
  <span comSuffix>.00</span>
</com-form-field>

<com-form-field>
  <label comLabel>Website</label>
  <span comPrefix>https://</span>
  <input comInput placeholder="example.com" />
</com-form-field>

<com-form-field>
  <label comLabel>Search</label>
  <svg comPrefix><!-- search icon --></svg>
  <input comInput />
  <button comSuffix><!-- clear button --></button>
</com-form-field>`;

  protected readonly hintsCode = `<com-form-field>
  <label comLabel>Username</label>
  <input comInput />
  <span comHint>Letters, numbers, and underscores only.</span>
</com-form-field>

<com-form-field>
  <label comLabel>Bio</label>
  <textarea comInput></textarea>
  <span comHint>Keep it brief.</span>
  <span comHint align="end">{{ length }}/150</span>
</com-form-field>`;

  protected readonly validationCode = `import { FormControl, Validators } from '@angular/forms';

email = new FormControl('', [Validators.required, Validators.email]);
password = new FormControl('', [Validators.required, Validators.minLength(8)]);

// Template:
<com-form-field>
  <label comLabel>Email</label>
  <input comInput [formControl]="email" />
  <span comHint>Enter your email address.</span>
  <span comError match="required">Email is required.</span>
  <span comError match="email">Please enter a valid email.</span>
</com-form-field>`;

  protected readonly floatLabelCode = `<com-form-field floatLabel="auto">
  <label comLabel>Auto (default)</label>
  <input comInput />
</com-form-field>

<com-form-field floatLabel="always">
  <label comLabel>Always</label>
  <input comInput />
</com-form-field>`;

  protected readonly textareaCode = `<com-form-field>
  <label comLabel>Description</label>
  <textarea comInput rows="4"></textarea>
  <span comHint>Markdown is supported.</span>
</com-form-field>`;

  protected readonly reactiveFormsCode = `import { FormGroup, FormControl, Validators } from '@angular/forms';

form = new FormGroup({
  firstName: new FormControl('', Validators.required),
  lastName: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
});

// Template:
<form [formGroup]="form">
  <com-form-field>
    <label comLabel>First Name</label>
    <input comInput formControlName="firstName" />
    <span comError match="required">First name is required.</span>
  </com-form-field>

  <com-form-field>
    <label comLabel>Email</label>
    <input comInput formControlName="email" type="email" />
    <span comError match="required">Email is required.</span>
    <span comError match="email">Invalid email format.</span>
  </com-form-field>

  <button [disabled]="form.invalid">Submit</button>
</form>`;

  protected readonly disabledCode = `// Create a disabled form control
disabledControl = new FormControl({ value: 'Read only', disabled: true });

<com-form-field>
  <label comLabel>Disabled Field</label>
  <input comInput [formControl]="disabledControl" />
</com-form-field>`;
}
