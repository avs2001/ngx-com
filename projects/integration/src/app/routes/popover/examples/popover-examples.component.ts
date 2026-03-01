import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { ComButton } from 'ngx-com/components/button';
import {
  PopoverTriggerDirective,
  PopoverCloseDirective,
  POPOVER_DATA,
  POPOVER_REF,
  type PopoverRef,
  type PopoverPosition,
  type PopoverAlignment,
  type PopoverVariant,
} from 'ngx-com/components/popover';
import { CodeBlock } from '../../../shared/code-block';

// Example component to render inside popover
@Component({
  selector: 'int-user-card',
  template: `
    <div class="flex items-center gap-3">
      <div
        class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
      >
        {{ initials }}
      </div>
      <div>
        <p class="font-medium text-popover-foreground">{{ data.name }}</p>
        <p class="text-xs text-muted-foreground">{{ data.email }}</p>
      </div>
    </div>
    <div class="mt-3 flex gap-2">
      <button
        class="flex-1 rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary-hover"
        (click)="viewProfile()"
      >
        View Profile
      </button>
      <button
        class="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted"
        (click)="popoverRef.close()"
      >
        Close
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  readonly data = inject<{ name: string; email: string }>(POPOVER_DATA);
  readonly popoverRef = inject<PopoverRef>(POPOVER_REF);

  get initials(): string {
    return this.data.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }

  viewProfile(): void {
    console.log('View profile:', this.data);
    this.popoverRef.close();
  }
}

@Component({
  selector: 'int-popover-examples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ComButton,
    PopoverTriggerDirective,
    PopoverCloseDirective,
    CodeBlock,
    TitleCasePipe,
  ],
  template: `
    <!-- Variants -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Variants</h2>
      <p class="mb-4 text-surface-600">Four size/padding presets for different content types.</p>
      <div class="space-y-4 rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-wrap gap-4">
          @for (variant of variants; track variant) {
            <button
              comButton
              variant="outline"
              [comPopoverTrigger]="variantContent"
              [popoverVariant]="variant"
            >
              {{ variant | titlecase }}
            </button>
            <ng-template #variantContent>
              <p class="text-sm">This is the {{ variant }} variant.</p>
              @if (variant === 'wide') {
                <p class="mt-2 text-sm text-muted-foreground">
                  Wide popovers are good for forms or larger content areas.
                </p>
              }
            </ng-template>
          }
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="variantsCode" />
    </section>

    <!-- Positions -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Positions</h2>
      <p class="mb-4 text-surface-600">
        Control placement with position and alignment. The popover flips automatically when space is
        limited.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="grid grid-cols-3 gap-4">
          @for (pos of positions; track pos) {
            @for (align of alignments; track align) {
              <button
                comButton
                variant="ghost"
                size="sm"
                [comPopoverTrigger]="posAlignContent"
                [popoverPosition]="pos"
                [popoverAlignment]="align"
              >
                {{ pos }}-{{ align }}
              </button>
              <ng-template #posAlignContent>
                <p class="text-sm">{{ pos | titlecase }} / {{ align }}</p>
              </ng-template>
            }
          }
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="positionsCode" />
    </section>

    <!-- Arrow Control -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Arrow Control</h2>
      <p class="mb-4 text-surface-600">
        The arrow points toward the trigger. Hide it for menu-like popovers.
      </p>
      <div class="flex gap-4 rounded-xl border border-surface-200 bg-white p-8">
        <button comButton [comPopoverTrigger]="arrowContent" [popoverShowArrow]="true">
          With Arrow
        </button>
        <ng-template #arrowContent>
          <p class="text-sm">Arrow visible</p>
        </ng-template>

        <button
          comButton
          variant="outline"
          [comPopoverTrigger]="noArrowContent"
          [popoverShowArrow]="false"
        >
          No Arrow
        </button>
        <ng-template #noArrowContent>
          <p class="text-sm">Arrow hidden</p>
        </ng-template>
      </div>
      <int-code-block class="mt-4" language="html" [code]="arrowCode" />
    </section>

    <!-- Focus Trigger -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Focus Trigger</h2>
      <p class="mb-4 text-surface-600">
        Open on focus for input helpers. Closes when focus leaves.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <label class="block">
          <span class="mb-1 block text-sm font-medium text-surface-700">Amount</span>
          <input
            type="text"
            class="w-full max-w-xs rounded-md border border-input-border bg-input-background px-3 py-2 text-input-foreground placeholder:text-input-placeholder focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Enter amount..."
            [comPopoverTrigger]="focusHelp"
            popoverTriggerOn="focus"
            popoverPosition="right"
            popoverVariant="compact"
          />
        </label>
        <ng-template #focusHelp>
          <p class="text-xs text-muted-foreground">Enter a value between $1 and $10,000.</p>
        </ng-template>
      </div>
      <int-code-block class="mt-4" language="html" [code]="focusCode" />
    </section>

    <!-- Component Content -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Component Content</h2>
      <p class="mb-4 text-surface-600">
        Pass a Component class and data instead of a template.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <button
          comButton
          [comPopoverTrigger]="UserCardComponent"
          [popoverData]="userData"
          popoverVariant="wide"
        >
          Show User Card
        </button>
      </div>
      <int-code-block class="mt-4" language="typescript" [code]="componentCode" />
    </section>

    <!-- Template Context -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Template Context</h2>
      <p class="mb-4 text-surface-600">
        Access data and a close function in the template context.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <button
          comButton
          variant="outline"
          [comPopoverTrigger]="contextContent"
          [popoverData]="{ title: 'Settings', count: 5 }"
        >
          With Context
        </button>
        <ng-template #contextContent let-data let-close="close">
          <h4 class="font-medium">{{ data.title }}</h4>
          <p class="text-sm text-muted-foreground">You have {{ data.count }} items.</p>
          <button
            class="mt-3 w-full rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary-hover"
            (click)="close()"
          >
            Done
          </button>
        </ng-template>
      </div>
      <int-code-block class="mt-4" language="html" [code]="contextCode" />
    </section>

    <!-- Backdrop Options -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Backdrop Options</h2>
      <p class="mb-4 text-surface-600">
        Control backdrop behavior: transparent (default), dimmed, or none.
      </p>
      <div class="flex gap-4 rounded-xl border border-surface-200 bg-white p-8">
        <button comButton [comPopoverTrigger]="transpContent" popoverBackdrop="transparent">
          Transparent
        </button>
        <ng-template #transpContent>
          <p class="text-sm">Click outside to close.</p>
        </ng-template>

        <button
          comButton
          variant="outline"
          [comPopoverTrigger]="dimmedContent"
          popoverBackdrop="dimmed"
        >
          Dimmed
        </button>
        <ng-template #dimmedContent>
          <p class="text-sm">Background is dimmed for focus.</p>
        </ng-template>

        <button
          comButton
          variant="ghost"
          [comPopoverTrigger]="noneContent"
          popoverBackdrop="none"
          [popoverCloseOnOutside]="false"
        >
          No Backdrop
        </button>
        <ng-template #noneContent>
          <p class="text-sm">No backdrop. Click trigger or use close button.</p>
          <button comButton size="sm" class="mt-2 w-full" comPopoverClose>Close</button>
        </ng-template>
      </div>
      <int-code-block class="mt-4" language="html" [code]="backdropCode" />
    </section>

    <!-- Focus Trap -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Focus Trap</h2>
      <p class="mb-4 text-surface-600">
        Trap focus inside the popover for form-like content.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <button
          comButton
          [comPopoverTrigger]="formContent"
          [popoverTrapFocus]="true"
          popoverVariant="wide"
        >
          Quick Edit
        </button>
        <ng-template #formContent let-close="close">
          <form (ngSubmit)="close()" class="space-y-3">
            <div>
              <label class="mb-1 block text-xs font-medium text-muted-foreground">Name</label>
              <input
                class="w-full rounded-md border border-input-border bg-input-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter name..."
              />
            </div>
            <div>
              <label class="mb-1 block text-xs font-medium text-muted-foreground">Email</label>
              <input
                type="email"
                class="w-full rounded-md border border-input-border bg-input-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter email..."
              />
            </div>
            <div class="flex justify-end gap-2 pt-1">
              <button type="button" comButton variant="ghost" size="sm" comPopoverClose>Cancel</button>
              <button type="submit" comButton size="sm">Save</button>
            </div>
          </form>
        </ng-template>
      </div>
      <int-code-block class="mt-4" language="html" [code]="focusTrapCode" />
    </section>

    <!-- Menu-like Usage -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Menu-like Usage</h2>
      <p class="mb-4 text-surface-600">
        Use flush variant with no arrow for dropdown menu appearance.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <button
          comButton
          variant="outline"
          [comPopoverTrigger]="menuContent"
          [popoverShowArrow]="false"
          popoverVariant="flush"
          popoverPosition="below"
          popoverAlignment="end"
        >
          Options ▾
        </button>
        <ng-template #menuContent>
          <div class="py-1">
            <button
              class="w-full px-4 py-2 text-left text-sm hover:bg-muted"
              comPopoverClose
            >
              Edit
            </button>
            <button
              class="w-full px-4 py-2 text-left text-sm hover:bg-muted"
              comPopoverClose
            >
              Duplicate
            </button>
            <hr class="my-1 border-border" />
            <button
              class="w-full px-4 py-2 text-left text-sm text-warn hover:bg-warn-subtle"
              comPopoverClose
            >
              Delete
            </button>
          </div>
        </ng-template>
      </div>
      <int-code-block class="mt-4" language="html" [code]="menuCode" />
    </section>
  `,
})
export class PopoverExamples {
  protected readonly UserCardComponent = UserCardComponent;
  protected readonly userData = { name: 'Alice Smith', email: 'alice@example.com' };

  protected readonly variants: PopoverVariant[] = ['default', 'compact', 'wide', 'flush'];
  protected readonly positions: PopoverPosition[] = ['above', 'below', 'left', 'right'];
  protected readonly alignments: PopoverAlignment[] = ['start', 'center', 'end'];

  protected readonly variantsCode = `<button [comPopoverTrigger]="content" popoverVariant="default">Default</button>
<button [comPopoverTrigger]="content" popoverVariant="compact">Compact</button>
<button [comPopoverTrigger]="content" popoverVariant="wide">Wide</button>
<button [comPopoverTrigger]="content" popoverVariant="flush">Flush</button>`;

  protected readonly positionsCode = `<button
  [comPopoverTrigger]="content"
  popoverPosition="above"
  popoverAlignment="center"
>
  Above Center
</button>`;

  protected readonly arrowCode = `<button [comPopoverTrigger]="content" [popoverShowArrow]="true">With Arrow</button>
<button [comPopoverTrigger]="content" [popoverShowArrow]="false">No Arrow</button>`;

  protected readonly focusCode = `<input
  type="text"
  [comPopoverTrigger]="helpContent"
  popoverTriggerOn="focus"
  popoverPosition="right"
  popoverVariant="compact"
/>
<ng-template #helpContent>
  <p>Helper text appears on focus.</p>
</ng-template>`;

  protected readonly componentCode = `// Define a component to render in the popover
@Component({
  selector: 'app-user-card',
  template: \`
    <div>{{ data.name }}</div>
    <button (click)="popoverRef.close()">Close</button>
  \`,
})
export class UserCardComponent {
  data = inject(POPOVER_DATA);
  popoverRef = inject(POPOVER_REF);
}

// Use it
<button
  [comPopoverTrigger]="UserCardComponent"
  [popoverData]="{ name: 'Alice' }"
>
  Show User
</button>`;

  protected readonly contextCode = `<button
  [comPopoverTrigger]="content"
  [popoverData]="{ title: 'Settings', count: 5 }"
>
  Open
</button>

<ng-template #content let-data let-close="close">
  <h4>{{ data.title }}</h4>
  <p>You have {{ data.count }} items.</p>
  <button (click)="close()">Done</button>
</ng-template>`;

  protected readonly backdropCode = `<button [comPopoverTrigger]="content" popoverBackdrop="transparent">Transparent</button>
<button [comPopoverTrigger]="content" popoverBackdrop="dimmed">Dimmed</button>
<button [comPopoverTrigger]="content" popoverBackdrop="none">None</button>`;

  protected readonly focusTrapCode = `<button
  [comPopoverTrigger]="formContent"
  [popoverTrapFocus]="true"
>
  Edit Form
</button>

<ng-template #formContent let-close="close">
  <form (ngSubmit)="save(); close()">
    <input placeholder="Name" />
    <button type="submit">Save</button>
  </form>
</ng-template>`;

  protected readonly menuCode = `<button
  [comPopoverTrigger]="menuContent"
  [popoverShowArrow]="false"
  popoverVariant="flush"
  popoverPosition="below"
  popoverAlignment="end"
>
  Options ▾
</button>

<ng-template #menuContent>
  <div class="py-1">
    <button class="menu-item" comPopoverClose>Edit</button>
    <button class="menu-item" comPopoverClose>Duplicate</button>
    <hr />
    <button class="menu-item text-warn" comPopoverClose>Delete</button>
  </div>
</ng-template>`;
}
