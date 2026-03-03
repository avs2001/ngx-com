import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComConfirm } from 'ngx-com/components/confirm';
import { ComButton } from 'ngx-com/components/button';
import { ComCard } from 'ngx-com/components/card';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-confirm-examples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComConfirm, ComButton, ComCard, CodeBlock, FormsModule],
  template: `
    <!-- Basic -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Basic Confirmation</h2>
      <p class="mb-4 text-surface-600">
        Simple confirmation with default message.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <button
            comButton
            (comConfirm)="onBasic($event)"
            confirmMessage="Are you sure you want to proceed?"
          >
            Confirm
          </button>
          <span class="text-sm text-muted-foreground">Result: {{ basicResult() ?? 'Not clicked' }}</span>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="basicCode" />
    </section>

    <!-- With Title -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">With Title</h2>
      <p class="mb-4 text-surface-600">
        Add a title for more context.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <button
            comButton
            variant="outline"
            (comConfirm)="onWithTitle($event)"
            confirmTitle="Submit Form"
            confirmMessage="Your data will be sent to the server."
          >
            Submit
          </button>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="withTitleCode" />
    </section>

    <!-- Destructive Action -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Destructive Action</h2>
      <p class="mb-4 text-surface-600">
        Use warn color for destructive actions.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <button
            comButton
            color="warn"
            (comConfirm)="onDelete($event)"
            confirmTitle="Permanent Deletion"
            confirmMessage="This action cannot be undone. All associated data will be permanently removed."
            confirmLabel="Delete Forever"
            confirmColor="warn"
          >
            Delete Permanently
          </button>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="destructiveCode" />
    </section>

    <!-- With Backdrop -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">With Backdrop</h2>
      <p class="mb-4 text-surface-600">
        Enable backdrop for modal-like behavior.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <button
            comButton
            variant="outline"
            (comConfirm)="onWithBackdrop($event)"
            confirmMessage="This dialog has a backdrop behind it."
            [confirmBackdrop]="true"
          >
            With Backdrop
          </button>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="backdropCode" />
    </section>

    <!-- Custom Labels -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Custom Labels</h2>
      <p class="mb-4 text-surface-600">
        Customize button labels for better context.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <button
            comButton
            variant="outline"
            (comConfirm)="onCustomLabels($event)"
            confirmTitle="Discard Changes"
            confirmMessage="You have unsaved changes. Do you want to discard them?"
            confirmLabel="Discard"
            cancelLabel="Keep Editing"
            confirmColor="warn"
          >
            Close Without Saving
          </button>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="customLabelsCode" />
    </section>

    <!-- Custom Template -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Custom Template</h2>
      <p class="mb-4 text-surface-600">
        Use ng-template for custom confirmation UI.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <button
            comButton
            variant="outline"
            (comConfirm)="onCustomTemplate($event)"
            [confirmTpl]="customTpl"
            confirmMessage="Please confirm your action"
          >
            Custom Confirmation
          </button>
        </div>

        <ng-template #customTpl let-message let-title="title" let-confirm="confirm" let-cancel="cancel">
          <div class="flex flex-col gap-4">
            <p class="text-sm text-muted-foreground">{{ message }}</p>
            <label class="flex items-center gap-2 text-sm">
              <input type="checkbox" [(ngModel)]="agreed" class="h-4 w-4 rounded border-border" />
              I understand the consequences
            </label>
            <div class="flex justify-end gap-2">
              <button comButton variant="ghost" (click)="cancel()">Cancel</button>
              <button comButton [disabled]="!agreed" (click)="confirm()">I Agree</button>
            </div>
          </div>
        </ng-template>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="customTemplateCode" />
    </section>

    <!-- Disabled -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Disabled State</h2>
      <p class="mb-4 text-surface-600">
        When disabled, clicks pass through without confirmation.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <button
            comButton
            variant="outline"
            (comConfirm)="onDisabled($event)"
            confirmMessage="This should not show"
            [confirmDisabled]="true"
            (click)="onDirectClick()"
          >
            Confirmation Disabled
          </button>
          <span class="text-sm text-muted-foreground">Direct clicks: {{ directClicks() }}</span>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="disabledCode" />
    </section>

    <!-- Programmatic Control -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Programmatic Control</h2>
      <p class="mb-4 text-surface-600">
        Use template reference for programmatic open/close.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <button
            #confirmRef="comConfirm"
            comButton
            variant="outline"
            (comConfirm)="onProgrammatic($event)"
            confirmMessage="Opened programmatically"
          >
            Trigger
          </button>
          <button comButton variant="ghost" size="sm" (click)="confirmRef.open()">Open</button>
          <button comButton variant="ghost" size="sm" (click)="confirmRef.close()">Close</button>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="programmaticCode" />
    </section>
  `,
})
export class ConfirmExamples {
  protected basicResult = signal<string | null>(null);
  protected directClicks = signal(0);
  protected agreed = false;

  protected readonly basicCode = `<button
  comButton
  (comConfirm)="onAction($event)"
  confirmMessage="Are you sure you want to proceed?"
>
  Confirm
</button>`;

  protected readonly withTitleCode = `<button
  comButton
  (comConfirm)="onSubmit($event)"
  confirmTitle="Submit Form"
  confirmMessage="Your data will be sent to the server."
>
  Submit
</button>`;

  protected readonly destructiveCode = `<button
  comButton
  color="warn"
  (comConfirm)="onDelete($event)"
  confirmTitle="Permanent Deletion"
  confirmMessage="This action cannot be undone."
  confirmLabel="Delete Forever"
  confirmColor="warn"
>
  Delete Permanently
</button>`;

  protected readonly backdropCode = `<button
  comButton
  (comConfirm)="onAction($event)"
  confirmMessage="This dialog has a backdrop behind it."
  [confirmBackdrop]="true"
>
  With Backdrop
</button>`;

  protected readonly customLabelsCode = `<button
  comButton
  (comConfirm)="onDiscard($event)"
  confirmTitle="Discard Changes"
  confirmMessage="You have unsaved changes. Do you want to discard them?"
  confirmLabel="Discard"
  cancelLabel="Keep Editing"
  confirmColor="warn"
>
  Close Without Saving
</button>`;

  protected readonly customTemplateCode = `<button
  comButton
  (comConfirm)="onAction($event)"
  [confirmTpl]="customTpl"
  confirmMessage="Please confirm your action"
>
  Custom Confirmation
</button>

<ng-template #customTpl let-message let-confirm="confirm" let-cancel="cancel">
  <div class="flex flex-col gap-4">
    <p>{{ message }}</p>
    <label class="flex items-center gap-2">
      <input type="checkbox" [(ngModel)]="agreed" />
      I understand the consequences
    </label>
    <div class="flex justify-end gap-2">
      <button comButton variant="ghost" (click)="cancel()">Cancel</button>
      <button comButton [disabled]="!agreed" (click)="confirm()">I Agree</button>
    </div>
  </div>
</ng-template>`;

  protected readonly disabledCode = `<button
  comButton
  (comConfirm)="onAction($event)"
  confirmMessage="This should not show"
  [confirmDisabled]="true"
  (click)="onDirectClick()"
>
  Confirmation Disabled
</button>`;

  protected readonly programmaticCode = `<button
  #confirmRef="comConfirm"
  comButton
  (comConfirm)="onAction($event)"
  confirmMessage="Opened programmatically"
>
  Trigger
</button>
<button (click)="confirmRef.open()">Open</button>
<button (click)="confirmRef.close()">Close</button>`;

  protected onBasic(confirmed: boolean): void {
    this.basicResult.set(confirmed ? 'Confirmed' : 'Cancelled');
  }

  protected onWithTitle(confirmed: boolean): void {
    console.log('With title:', confirmed);
  }

  protected onDelete(confirmed: boolean): void {
    console.log('Delete:', confirmed);
  }

  protected onWithBackdrop(confirmed: boolean): void {
    console.log('With backdrop:', confirmed);
  }

  protected onCustomLabels(confirmed: boolean): void {
    console.log('Custom labels:', confirmed);
  }

  protected onCustomTemplate(confirmed: boolean): void {
    console.log('Custom template:', confirmed);
    this.agreed = false;
  }

  protected onDisabled(confirmed: boolean): void {
    console.log('Disabled (should not fire):', confirmed);
  }

  protected onDirectClick(): void {
    this.directClicks.update(c => c + 1);
  }

  protected onProgrammatic(confirmed: boolean): void {
    console.log('Programmatic:', confirmed);
  }
}
