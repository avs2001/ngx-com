import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComCheckbox } from 'ngx-com/components/checkbox';
import type { CheckboxChange } from 'ngx-com/components/checkbox';
import { CodeBlock } from '../../../shared/code-block';

interface Task {
  id: number;
  label: string;
  completed: boolean;
}

@Component({
  selector: 'int-checkbox-examples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComCheckbox, CodeBlock, ReactiveFormsModule],
  template: `
    <!-- Variants -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Variants</h2>
      <p class="mb-4 text-surface-600">
        Three semantic variants for different use cases.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-wrap items-center justify-center gap-6">
          <com-checkbox>Primary</com-checkbox>
          <com-checkbox variant="accent">Accent</com-checkbox>
          <com-checkbox variant="warn">Warning</com-checkbox>
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="variantsCode" />
    </section>

    <!-- Sizes -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Sizes</h2>
      <p class="mb-4 text-surface-600">
        Three sizes with proportional checkbox box, checkmark, and label sizing.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-wrap items-center justify-center gap-6">
          <com-checkbox size="sm">Small</com-checkbox>
          <com-checkbox size="md">Medium</com-checkbox>
          <com-checkbox size="lg">Large</com-checkbox>
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="sizesCode" />
    </section>

    <!-- States -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">States</h2>
      <p class="mb-4 text-surface-600">
        Checked, unchecked, indeterminate, and disabled states.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-wrap items-center justify-center gap-6">
          <com-checkbox>Unchecked</com-checkbox>
          <com-checkbox [checked]="true">Checked</com-checkbox>
          <com-checkbox [indeterminate]="true">Indeterminate</com-checkbox>
          <com-checkbox [disabled]="true">Disabled</com-checkbox>
          <com-checkbox [checked]="true" [disabled]="true">Checked & Disabled</com-checkbox>
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="statesCode" />
    </section>

    <!-- Two-way Binding -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Two-way Binding</h2>
      <p class="mb-4 text-surface-600">
        Use <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[(checked)]</code> for simple two-way binding.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-col items-center gap-4">
          <com-checkbox [(checked)]="isEnabled">
            Feature is {{ isEnabled() ? 'enabled' : 'disabled' }}
          </com-checkbox>
          <button
            type="button"
            class="rounded-lg border border-surface-200 px-3 py-1.5 text-sm transition hover:bg-surface-100"
            (click)="isEnabled.set(!isEnabled())"
          >
            Toggle externally
          </button>
        </div>
      </div>
      <int-code-block class="mt-4" language="typescript" [code]="twoWayCode" />
    </section>

    <!-- Indeterminate / Select All -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Indeterminate / Select All</h2>
      <p class="mb-4 text-surface-600">
        The indeterminate state is useful for "select all" patterns. It clears automatically on user click.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="space-y-4">
          <com-checkbox
            [checked]="allSelected()"
            [indeterminate]="someSelected()"
            (changed)="toggleAll($event)"
          >
            <span class="font-medium">Select all tasks</span>
          </com-checkbox>
          <div class="ml-6 space-y-2 border-l-2 border-surface-200 pl-4">
            @for (task of tasks(); track task.id) {
              <com-checkbox
                [checked]="task.completed"
                (changed)="toggleTask(task.id, $event)"
              >
                {{ task.label }}
              </com-checkbox>
            }
          </div>
        </div>
      </div>
      <int-code-block class="mt-4" language="typescript" [code]="indeterminateCode" />
    </section>

    <!-- Reactive Forms -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Reactive Forms</h2>
      <p class="mb-4 text-surface-600">
        Full integration with Angular reactive forms via ControlValueAccessor.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <form [formGroup]="form" class="space-y-4">
          <com-checkbox formControlName="newsletter">
            Subscribe to newsletter
          </com-checkbox>
          <com-checkbox formControlName="terms">
            I accept the <a href="#" class="text-primary-600 hover:underline">terms and conditions</a>
          </com-checkbox>
          <div class="pt-4">
            <button
              type="submit"
              class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
              [disabled]="form.invalid"
            >
              Submit
            </button>
            <span class="ml-4 text-sm text-surface-500">
              Form {{ form.valid ? 'valid' : 'invalid' }}
              @if (form.controls.terms.errors?.['required']) {
                — Terms required
              }
            </span>
          </div>
        </form>
      </div>
      <int-code-block class="mt-4" language="typescript" [code]="reactiveFormsCode" />
    </section>

    <!-- Rich Label Content -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Rich Label Content</h2>
      <p class="mb-4 text-surface-600">
        Labels are projected via ng-content, allowing any content including icons, links, and formatted text.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="space-y-4">
          <com-checkbox>
            <span class="flex items-center gap-2">
              <svg class="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              Enable notifications
            </span>
          </com-checkbox>
          <com-checkbox variant="accent">
            <span>
              I agree to the <a href="#" class="text-accent hover:underline">privacy policy</a>
              and <a href="#" class="text-accent hover:underline">cookie policy</a>
            </span>
          </com-checkbox>
          <com-checkbox>
            <span class="flex flex-col">
              <span class="font-medium">Marketing emails</span>
              <span class="text-sm text-surface-500">Receive updates about new features</span>
            </span>
          </com-checkbox>
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="richLabelCode" />
    </section>

    <!-- Custom Classes -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Custom Classes</h2>
      <p class="mb-4 text-surface-600">
        Add custom classes to the container for additional styling.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-wrap items-center justify-center gap-6">
          <com-checkbox class="rounded-lg border border-surface-200 bg-surface-50 p-4">
            With card styling
          </com-checkbox>
          <com-checkbox class="font-semibold text-primary">
            Bold primary text
          </com-checkbox>
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="customClassesCode" />
    </section>
  `,
})
export class CheckboxExamples {
  // Two-way binding
  protected readonly isEnabled = signal(false);

  // Indeterminate / Select All
  protected readonly tasks = signal<Task[]>([
    { id: 1, label: 'Review pull request', completed: true },
    { id: 2, label: 'Write documentation', completed: false },
    { id: 3, label: 'Fix unit tests', completed: false },
  ]);

  protected readonly allSelected = computed(() =>
    this.tasks().every(t => t.completed)
  );

  protected readonly someSelected = computed(() => {
    const tasks = this.tasks();
    const completed = tasks.filter(t => t.completed).length;
    return completed > 0 && completed < tasks.length;
  });

  protected toggleAll(event: CheckboxChange): void {
    this.tasks.update(tasks =>
      tasks.map(t => ({ ...t, completed: event.checked }))
    );
  }

  protected toggleTask(id: number, event: CheckboxChange): void {
    this.tasks.update(tasks =>
      tasks.map(t => t.id === id ? { ...t, completed: event.checked } : t)
    );
  }

  // Reactive Forms
  protected readonly form = new FormGroup({
    newsletter: new FormControl(false),
    terms: new FormControl(false, Validators.requiredTrue),
  });

  // Code examples
  protected readonly variantsCode = `<com-checkbox>Primary</com-checkbox>
<com-checkbox variant="accent">Accent</com-checkbox>
<com-checkbox variant="warn">Warning</com-checkbox>`;

  protected readonly sizesCode = `<com-checkbox size="sm">Small</com-checkbox>
<com-checkbox size="md">Medium</com-checkbox>
<com-checkbox size="lg">Large</com-checkbox>`;

  protected readonly statesCode = `<com-checkbox>Unchecked</com-checkbox>
<com-checkbox [checked]="true">Checked</com-checkbox>
<com-checkbox [indeterminate]="true">Indeterminate</com-checkbox>
<com-checkbox [disabled]="true">Disabled</com-checkbox>`;

  protected readonly twoWayCode = `import { Component, signal } from '@angular/core';
import { ComCheckbox } from 'ngx-com/components/checkbox';

@Component({
  imports: [ComCheckbox],
  template: \`
    <com-checkbox [(checked)]="isEnabled">
      Feature is {{ isEnabled() ? 'enabled' : 'disabled' }}
    </com-checkbox>
  \`,
})
export class Example {
  isEnabled = signal(false);
}`;

  protected readonly indeterminateCode = `import { Component, computed, signal } from '@angular/core';
import { ComCheckbox, CheckboxChange } from 'ngx-com/components/checkbox';

@Component({
  imports: [ComCheckbox],
  template: \`
    <com-checkbox
      [checked]="allSelected()"
      [indeterminate]="someSelected()"
      (changed)="toggleAll($event)"
    >
      Select all
    </com-checkbox>

    @for (task of tasks(); track task.id) {
      <com-checkbox
        [checked]="task.completed"
        (changed)="toggleTask(task.id, $event)"
      >
        {{ task.label }}
      </com-checkbox>
    }
  \`,
})
export class Example {
  tasks = signal([
    { id: 1, label: 'Task 1', completed: true },
    { id: 2, label: 'Task 2', completed: false },
  ]);

  allSelected = computed(() =>
    this.tasks().every(t => t.completed)
  );

  someSelected = computed(() => {
    const tasks = this.tasks();
    const completed = tasks.filter(t => t.completed).length;
    return completed > 0 && completed < tasks.length;
  });

  toggleAll(event: CheckboxChange) {
    this.tasks.update(tasks =>
      tasks.map(t => ({ ...t, completed: event.checked }))
    );
  }

  toggleTask(id: number, event: CheckboxChange) {
    this.tasks.update(tasks =>
      tasks.map(t => t.id === id ? { ...t, completed: event.checked } : t)
    );
  }
}`;

  protected readonly reactiveFormsCode = `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComCheckbox } from 'ngx-com/components/checkbox';

@Component({
  imports: [ComCheckbox, ReactiveFormsModule],
  template: \`
    <form [formGroup]="form">
      <com-checkbox formControlName="newsletter">
        Subscribe to newsletter
      </com-checkbox>
      <com-checkbox formControlName="terms">
        I accept the terms
      </com-checkbox>
      <button [disabled]="form.invalid">Submit</button>
    </form>
  \`,
})
export class Example {
  form = new FormGroup({
    newsletter: new FormControl(false),
    terms: new FormControl(false, Validators.requiredTrue),
  });
}`;

  protected readonly richLabelCode = `<com-checkbox>
  <span class="flex items-center gap-2">
    <svg><!-- icon --></svg>
    Enable notifications
  </span>
</com-checkbox>

<com-checkbox>
  I agree to the <a href="/privacy">privacy policy</a>
</com-checkbox>

<com-checkbox>
  <span class="flex flex-col">
    <span class="font-medium">Marketing emails</span>
    <span class="text-sm text-surface-500">Receive updates</span>
  </span>
</com-checkbox>`;

  protected readonly customClassesCode = `<com-checkbox class="rounded-lg border bg-surface-50 p-4">
  With card styling
</com-checkbox>

<com-checkbox class="font-semibold text-primary">
  Bold primary text
</com-checkbox>`;
}
