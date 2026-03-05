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
import { ComDropdown } from 'ngx-com/components/dropdown';
import { ComCheckbox } from 'ngx-com/components/checkbox';
import { ComRadioGroup, ComRadio } from 'ngx-com/components/radio';
import { ComIcon } from 'ngx-com/components/icon';
import { Search, Shuffle, X, Save, RotateCcw } from 'lucide-angular';
import { CodeBlock } from '../../../shared/code-block';

/** User profile interface for the edit form example */
interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  department: string;
  role: string;
  notifications: boolean;
  newsletter: boolean;
}

/** Department option interface */
interface DepartmentOption {
  id: string;
  name: string;
  description: string;
}

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
    ComDropdown,
    ComCheckbox,
    ComRadioGroup,
    ComRadio,
    ComIcon,
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
            <com-icon comPrefix [img]="SearchIcon" size="sm" />
            <input comInput [formControl]="searchControl" placeholder="Search..." />
            <button comSuffix type="button" class="text-surface-400 hover:text-surface-600" (click)="onClearSearch($event)">
              <com-icon [img]="XIcon" size="sm" />
            </button>
          </com-form-field>

          <com-form-field>
            <label comLabel>Token</label>
            <input comInput [formControl]="tokenControl" />
            <button comSuffix type="button" class="text-surface-400 hover:text-surface-600" (click)="onGenerateToken($event)">
              <com-icon [img]="ShuffleIcon" size="sm" />
            </button>
            <span comHint>Click shuffle to generate a random token.</span>
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

    <!-- Complete Edit Form -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Complete Edit Form</h2>
      <p class="mb-4 text-surface-600">
        A comprehensive reactive form demonstrating edit capabilities with all supported form controls:
        inputs, textarea, dropdown, checkbox, and radio buttons.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <form [formGroup]="editForm" (ngSubmit)="onEditFormSubmit()" class="mx-auto max-w-2xl space-y-6">
          <!-- Personal Information Section -->
          <fieldset class="space-y-4">
            <legend class="mb-4 text-lg font-medium text-surface-800">Personal Information</legend>

            <div class="grid gap-4 sm:grid-cols-2">
              <com-form-field>
                <label comLabel>First Name</label>
                <input comInput formControlName="firstName" />
                <span comHint>Your given name.</span>
                <span comError match="required">First name is required.</span>
                <span comError match="minlength">At least 2 characters.</span>
              </com-form-field>

              <com-form-field>
                <label comLabel>Last Name</label>
                <input comInput formControlName="lastName" />
                <span comHint>Your family name.</span>
                <span comError match="required">Last name is required.</span>
                <span comError match="minlength">At least 2 characters.</span>
              </com-form-field>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <com-form-field>
                <label comLabel>Email</label>
                <input comInput formControlName="email" type="email" />
                <span comHint>We'll never share your email.</span>
                <span comError match="required">Email is required.</span>
                <span comError match="email">Please enter a valid email.</span>
              </com-form-field>

              <com-form-field>
                <label comLabel>Phone</label>
                <span comPrefix>+1</span>
                <input comInput formControlName="phone" type="tel" />
                <span comHint>Optional contact number.</span>
                <span comError match="pattern">Enter a valid phone number.</span>
              </com-form-field>
            </div>

            <com-form-field>
              <label comLabel>Bio</label>
              <textarea comInput formControlName="bio" rows="3" (input)="onBioInput($event)"></textarea>
              <span comHint>Tell us about yourself.</span>
              <span comHint align="end">{{ editFormBioLength() }}/500</span>
              <span comError match="maxlength">Bio must be under 500 characters.</span>
            </com-form-field>
          </fieldset>

          <!-- Work Information Section -->
          <fieldset class="space-y-4">
            <legend class="mb-4 text-lg font-medium text-surface-800">Work Information</legend>

            <com-form-field>
              <label comLabel>Department</label>
              <com-dropdown
                formControlName="department"
                [options]="departments"
                [displayWith]="displayDepartment"
                [compareWith]="compareDepartment"
                placeholder="Select department..."
                [searchable]="true"
                searchPlaceholder="Search departments..."
                [clearable]="true"
                variant="naked"
              />
              <span comHint>Select your primary department.</span>
              <span comError match="required">Please select a department.</span>
            </com-form-field>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-surface-700">Role</label>
              <com-radio-group
                formControlName="role"
                orientation="horizontal"
                aria-label="Select your role"
              >
                <com-radio value="individual">Individual Contributor</com-radio>
                <com-radio value="lead">Team Lead</com-radio>
                <com-radio value="manager">Manager</com-radio>
                <com-radio value="director">Director</com-radio>
              </com-radio-group>
              @if (editForm.get('role')?.invalid && editForm.get('role')?.touched) {
                <p class="text-sm text-warn">Please select a role.</p>
              }
            </div>
          </fieldset>

          <!-- Preferences Section -->
          <fieldset class="space-y-4">
            <legend class="mb-4 text-lg font-medium text-surface-800">Preferences</legend>

            <div class="flex flex-col gap-3">
              <com-checkbox formControlName="notifications">
                Enable push notifications
              </com-checkbox>
              <com-checkbox formControlName="newsletter">
                Subscribe to newsletter
              </com-checkbox>
            </div>
          </fieldset>

          <!-- Form Actions -->
          <div class="flex items-center gap-4 border-t border-surface-200 pt-6">
            <button
              type="submit"
              class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-disabled disabled:text-disabled-foreground"
              [disabled]="editForm.invalid || !editForm.dirty"
            >
              <com-icon [img]="SaveIcon" size="sm" />
              Save Changes
            </button>
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-lg border border-surface-300 bg-white px-4 py-2 text-sm font-medium text-surface-700 transition hover:bg-surface-50 disabled:cursor-not-allowed disabled:bg-disabled disabled:text-disabled-foreground"
              [disabled]="!editForm.dirty"
              (click)="onResetEditForm()"
            >
              <com-icon [img]="ResetIcon" size="sm" />
              Reset
            </button>
            <span class="ml-auto text-sm text-surface-500">
              @if (editForm.dirty) {
                <span class="text-warn">Unsaved changes</span>
              } @else {
                No changes
              }
            </span>
          </div>

          <!-- Form Debug Info -->
          <div class="rounded-lg bg-surface-50 p-4 text-sm">
            <p class="font-medium text-surface-700">Form State:</p>
            <div class="mt-2 grid grid-cols-2 gap-2 text-surface-600 sm:grid-cols-4">
              <span>Valid: {{ editForm.valid }}</span>
              <span>Dirty: {{ editForm.dirty }}</span>
              <span>Touched: {{ editForm.touched }}</span>
              <span>Pending: {{ editForm.pending }}</span>
            </div>
          </div>
        </form>
      </div>
      <int-code-block class="mt-4" language="typescript" [code]="completeEditFormCode" />
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
  // Icons
  protected readonly SearchIcon = Search;
  protected readonly ShuffleIcon = Shuffle;
  protected readonly XIcon = X;
  protected readonly SaveIcon = Save;
  protected readonly ResetIcon = RotateCcw;

  // Signals for hints
  protected readonly bioLength = signal(0);

  // Form controls for validation demo
  protected readonly emailControl = new FormControl('', [Validators.required, Validators.email]);
  protected readonly passwordControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  protected readonly disabledControl = new FormControl({ value: 'Read only value', disabled: true });
  protected readonly searchControl = new FormControl('');
  protected readonly tokenControl = new FormControl('');

  // Reactive form
  protected readonly form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  // Department options for dropdown
  protected readonly departments: DepartmentOption[] = [
    { id: 'eng', name: 'Engineering', description: 'Software development and infrastructure' },
    { id: 'design', name: 'Design', description: 'Product and visual design' },
    { id: 'product', name: 'Product', description: 'Product management and strategy' },
    { id: 'marketing', name: 'Marketing', description: 'Marketing and communications' },
    { id: 'sales', name: 'Sales', description: 'Sales and business development' },
    { id: 'hr', name: 'Human Resources', description: 'People operations and culture' },
    { id: 'finance', name: 'Finance', description: 'Financial planning and accounting' },
    { id: 'legal', name: 'Legal', description: 'Legal and compliance' },
  ];

  // Initial data for edit form (simulating existing user profile)
  private readonly initialProfileData: UserProfile = {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '555-123-4567',
    bio: 'Senior software engineer with 8 years of experience in full-stack development. Passionate about clean code and user experience.',
    department: 'eng',
    role: 'lead',
    notifications: true,
    newsletter: false,
  };

  // Complete edit form with all field types
  protected readonly editForm = new FormGroup({
    firstName: new FormControl(this.initialProfileData.firstName, [
      Validators.required,
      Validators.minLength(2),
    ]),
    lastName: new FormControl(this.initialProfileData.lastName, [
      Validators.required,
      Validators.minLength(2),
    ]),
    email: new FormControl(this.initialProfileData.email, [
      Validators.required,
      Validators.email,
    ]),
    phone: new FormControl(this.initialProfileData.phone, [
      Validators.pattern(/^\d{3}-?\d{3}-?\d{4}$/),
    ]),
    bio: new FormControl(this.initialProfileData.bio, [
      Validators.maxLength(500),
    ]),
    department: new FormControl<DepartmentOption | null>(
      this.departments.find(d => d.id === this.initialProfileData.department) ?? null,
      [Validators.required]
    ),
    role: new FormControl(this.initialProfileData.role, [Validators.required]),
    notifications: new FormControl(this.initialProfileData.notifications),
    newsletter: new FormControl(this.initialProfileData.newsletter),
  });

  // Bio character count for edit form
  protected readonly editFormBioLength = signal(this.initialProfileData.bio.length);

  // Display function for department dropdown
  protected readonly displayDepartment = (dept: DepartmentOption): string => dept?.name ?? '';

  // Compare function for department dropdown
  protected readonly compareDepartment = (a: DepartmentOption, b: DepartmentOption): boolean =>
    a?.id === b?.id;

  protected onClearSearch(event: MouseEvent): void {
    event.stopPropagation();
    this.searchControl.reset();
  }

  protected onGenerateToken(event: MouseEvent): void {
    event.stopPropagation();
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 16; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.tokenControl.setValue(token);
  }

  protected onEditFormSubmit(): void {
    if (this.editForm.valid) {
      console.log('Form submitted:', this.editForm.value);
      // Mark form as pristine after successful save
      this.editForm.markAsPristine();
    }
  }

  protected onResetEditForm(): void {
    const dept = this.departments.find(d => d.id === this.initialProfileData.department) ?? null;
    this.editForm.reset({
      firstName: this.initialProfileData.firstName,
      lastName: this.initialProfileData.lastName,
      email: this.initialProfileData.email,
      phone: this.initialProfileData.phone,
      bio: this.initialProfileData.bio,
      department: dept,
      role: this.initialProfileData.role,
      notifications: this.initialProfileData.notifications,
      newsletter: this.initialProfileData.newsletter,
    });
    this.editFormBioLength.set(this.initialProfileData.bio.length);
  }

  protected onBioInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.editFormBioLength.set(target.value.length);
  }

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

<!-- Search with clickable clear button -->
<com-form-field>
  <com-icon comPrefix [img]="SearchIcon" size="sm" />
  <input comInput [formControl]="searchControl" placeholder="Search..." />
  <button comSuffix type="button" (click)="onClear($event)">
    <com-icon [img]="XIcon" size="sm" />
  </button>
</com-form-field>

// Shuffle button to generate random token
<com-form-field>
  <label comLabel>Token</label>
  <input comInput [formControl]="tokenControl" />
  <button comSuffix type="button" (click)="onGenerateToken($event)">
    <com-icon [img]="ShuffleIcon" size="sm" />
  </button>
  <span comHint>Click shuffle to generate a random token.</span>
</com-form-field>

tokenControl = new FormControl('');

onGenerateToken(event: MouseEvent): void {
  event.stopPropagation();
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 16; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  this.tokenControl.setValue(token);
}`;

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

  protected readonly completeEditFormCode = `import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ComDropdown } from 'ngx-com/components/dropdown';
import { ComCheckbox } from 'ngx-com/components/checkbox';
import { ComRadioGroup, ComRadio } from 'ngx-com/components/radio';

interface DepartmentOption {
  id: string;
  name: string;
  description: string;
}

// Department options
departments: DepartmentOption[] = [
  { id: 'eng', name: 'Engineering', description: 'Software development' },
  { id: 'design', name: 'Design', description: 'Product design' },
  { id: 'product', name: 'Product', description: 'Product management' },
];

// Initial data for editing
initialData = {
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane@example.com',
  department: 'eng',
  role: 'lead',
  notifications: true,
};

// Form with all control types
editForm = new FormGroup({
  firstName: new FormControl(this.initialData.firstName, [
    Validators.required,
    Validators.minLength(2),
  ]),
  lastName: new FormControl(this.initialData.lastName, [
    Validators.required,
    Validators.minLength(2),
  ]),
  email: new FormControl(this.initialData.email, [
    Validators.required,
    Validators.email,
  ]),
  department: new FormControl<DepartmentOption | null>(
    this.departments.find(d => d.id === this.initialData.department) ?? null,
    [Validators.required]
  ),
  role: new FormControl(this.initialData.role, [Validators.required]),
  notifications: new FormControl(this.initialData.notifications),
});

displayDepartment = (dept: DepartmentOption): string => dept?.name ?? '';
compareDepartment = (a: DepartmentOption, b: DepartmentOption): boolean =>
  a?.id === b?.id;

// Template:
<form [formGroup]="editForm" (ngSubmit)="onSubmit()">
  <!-- Input fields -->
  <com-form-field>
    <label comLabel>First Name</label>
    <input comInput formControlName="firstName" />
    <span comError match="required">Required.</span>
    <span comError match="minlength">At least 2 characters.</span>
  </com-form-field>

  <!-- Dropdown with objects (naked variant for form-field integration) -->
  <com-form-field>
    <label comLabel>Department</label>
    <com-dropdown
      formControlName="department"
      [options]="departments"
      [displayWith]="displayDepartment"
      [compareWith]="compareDepartment"
      placeholder="Select department..."
      [searchable]="true"
      [clearable]="true"
      variant="naked"
    />
    <span comError match="required">Please select a department.</span>
  </com-form-field>

  <!-- Radio group (outside form-field) -->
  <com-radio-group formControlName="role" orientation="horizontal">
    <com-radio value="individual">Individual</com-radio>
    <com-radio value="lead">Lead</com-radio>
    <com-radio value="manager">Manager</com-radio>
  </com-radio-group>

  <!-- Checkbox -->
  <com-checkbox formControlName="notifications">
    Enable notifications
  </com-checkbox>

  <button type="submit" [disabled]="editForm.invalid || !editForm.dirty">
    Save Changes
  </button>
</form>`;
}
