import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComCard } from 'ngx-com/components/card';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-confirm-api',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComCard, CodeBlock],
  template: `
    <!-- Import -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Import</h2>
      <int-code-block language="typescript" [code]="importCode" />
    </section>

    <!-- Selector -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Selector</h2>
      <com-card variant="outlined" class="p-6">
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">[comConfirm]</code>
        <p class="mt-3 text-surface-600">
          Attribute selector applied to the trigger element. Uses output binding syntax.
        </p>
      </com-card>
    </section>

    <!-- Export As -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Export As</h2>
      <com-card variant="outlined" class="p-6">
        <code class="rounded bg-surface-100 px-2 py-1 font-mono text-sm">comConfirm</code>
        <p class="mt-3 text-surface-600">
          Template reference name for programmatic open/close control.
        </p>
        <int-code-block class="mt-4" language="html" [code]="exportAsCode" />
      </com-card>
    </section>

    <!-- Inputs -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Inputs</h2>
      <com-card variant="outlined" class="overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-surface-200 bg-surface-50 text-left">
              <th class="px-4 py-3 font-semibold text-surface-900">Name</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Type</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Default</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-100">
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">confirmMessage</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">string</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'Are you sure?'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">The confirmation message to display</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">confirmTitle</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">string | undefined</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">undefined</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Optional dialog title</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">confirmLabel</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">string</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'Confirm'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Label for the confirm button</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">cancelLabel</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">string</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'Cancel'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Label for the cancel button</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">confirmColor</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'primary' | 'warn'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">'primary'</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Color variant for the confirm button</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">confirmDisabled</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">boolean</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">false</code>
              </td>
              <td class="px-4 py-3 text-surface-600">When true, clicks pass through without confirmation</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">confirmBackdrop</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">boolean</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">false</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Whether to show a backdrop behind the panel</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">confirmTpl</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">TemplateRef&lt;ConfirmTemplateContext&gt;</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">undefined</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Custom template for the panel content</td>
            </tr>
          </tbody>
        </table>
      </com-card>
    </section>

    <!-- Outputs -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Outputs</h2>
      <com-card variant="outlined" class="overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-surface-200 bg-surface-50 text-left">
              <th class="px-4 py-3 font-semibold text-surface-900">Name</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Type</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-100">
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">comConfirm</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                <code class="text-xs">boolean</code>
              </td>
              <td class="px-4 py-3 text-surface-600">
                Emits <code class="text-xs">true</code> on confirm, <code class="text-xs">false</code> on cancel/Escape/navigation
              </td>
            </tr>
          </tbody>
        </table>
      </com-card>
    </section>

    <!-- Dismissal Behavior -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Dismissal Behavior</h2>
      <com-card variant="outlined" class="overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-surface-200 bg-surface-50 text-left">
              <th class="px-4 py-3 font-semibold text-surface-900">Action</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Result</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-100">
            <tr>
              <td class="px-4 py-3 text-surface-700">Confirm button</td>
              <td class="px-4 py-3 text-surface-600">Emits <code class="text-xs">true</code></td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">Cancel button</td>
              <td class="px-4 py-3 text-surface-600">Emits <code class="text-xs">false</code></td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">Escape key</td>
              <td class="px-4 py-3 text-surface-600">Emits <code class="text-xs">false</code></td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">Navigation away</td>
              <td class="px-4 py-3 text-surface-600">Emits <code class="text-xs">false</code></td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">Clicking outside</td>
              <td class="px-4 py-3 text-surface-600">No dismiss (user must explicitly confirm or cancel)</td>
            </tr>
          </tbody>
        </table>
      </com-card>
    </section>

    <!-- Methods -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Methods</h2>
      <com-card variant="outlined" class="overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-surface-200 bg-surface-50 text-left">
              <th class="px-4 py-3 font-semibold text-surface-900">Name</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-100">
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">open()</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Programmatically open the confirmation dialog</td>
            </tr>
            <tr>
              <td class="px-4 py-3">
                <code class="rounded bg-surface-100 px-1.5 py-0.5 text-xs">close()</code>
              </td>
              <td class="px-4 py-3 text-surface-600">Programmatically close the dialog (emits <code class="text-xs">false</code>)</td>
            </tr>
          </tbody>
        </table>
      </com-card>
    </section>

    <!-- Template Context -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Template Context</h2>
      <p class="mb-4 text-surface-600">
        When using <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">confirmTpl</code>, the template receives:
      </p>
      <int-code-block language="typescript" [code]="templateContextCode" />
    </section>

    <!-- CSS Tokens -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">CSS Tokens</h2>
      <p class="mb-4 text-surface-600">
        The confirm directive requires the following CSS custom properties:
      </p>
      <com-card variant="outlined" class="overflow-hidden">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-surface-200 bg-surface-50 text-left">
              <th class="px-4 py-3 font-semibold text-surface-900">Token</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Used By</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-100 font-mono text-xs">
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-popover, --color-popover-foreground</td>
              <td class="px-4 py-3 text-surface-600">Panel background and text</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-foreground</td>
              <td class="px-4 py-3 text-surface-600">Dialog title</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-muted-foreground</td>
              <td class="px-4 py-3 text-surface-600">Dialog message</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-border</td>
              <td class="px-4 py-3 text-surface-600">Panel border</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--color-background</td>
              <td class="px-4 py-3 text-surface-600">Backdrop (when enabled)</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--shadow-lg</td>
              <td class="px-4 py-3 text-surface-600">Panel shadow</td>
            </tr>
            <tr>
              <td class="px-4 py-3 text-surface-700">--radius-popover</td>
              <td class="px-4 py-3 text-surface-600">Panel border radius</td>
            </tr>
          </tbody>
        </table>
      </com-card>
    </section>

    <!-- Types -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Types</h2>
      <int-code-block language="typescript" [code]="typesCode" />
    </section>

    <!-- Accessibility -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Accessibility</h2>
      <com-card variant="outlined" class="p-6">
        <ul class="list-inside list-disc space-y-2 text-surface-600">
          <li>Uses <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">role="alertdialog"</code> for the panel</li>
          <li>Sets <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">aria-modal="true"</code></li>
          <li>Uses <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">aria-labelledby</code> for the title (when provided)</li>
          <li>Uses <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">aria-describedby</code> for the message</li>
          <li>Focus trap keeps focus within the dialog</li>
          <li>Focus starts on cancel button (safer default)</li>
          <li>Returns focus to trigger on close</li>
          <li>Escape key closes the dialog</li>
        </ul>
      </com-card>
    </section>
  `,
})
export class ConfirmApi {
  protected readonly importCode = `import { ComConfirm } from 'ngx-com/components/confirm';

// Optional: Import types for TypeScript
import type { ConfirmTemplateContext, ConfirmColor } from 'ngx-com/components/confirm';`;

  protected readonly exportAsCode = `<button
  #confirmRef="comConfirm"
  (comConfirm)="onAction($event)"
  confirmMessage="Confirm this action?"
>
  Action
</button>

<button (click)="confirmRef.open()">Open</button>
<button (click)="confirmRef.close()">Close</button>`;

  protected readonly templateContextCode = `interface ConfirmTemplateContext {
  /** The confirmation message (bound to $implicit) */
  $implicit: string;
  /** The dialog title, if provided */
  title: string | undefined;
  /** Function to confirm the action */
  confirm: () => void;
  /** Function to cancel the action */
  cancel: () => void;
  /** Whether an async operation is in progress */
  loading: boolean;
  /** Function to set the loading state */
  setLoading: (value: boolean) => void;
}

// Usage in template
<ng-template #customTpl let-message let-title="title" let-confirm="confirm" let-cancel="cancel" let-loading="loading" let-setLoading="setLoading">
  @if (title) {
    <h2>{{ title }}</h2>
  }
  <p>{{ message }}</p>
  <button (click)="cancel()">Cancel</button>
  <button (click)="confirm()" [disabled]="loading">
    @if (loading) { Saving... } @else { Confirm }
  </button>
</ng-template>`;

  protected readonly typesCode = `// Color variant type
type ConfirmColor = 'primary' | 'warn';

// Template context interface
interface ConfirmTemplateContext {
  $implicit: string;
  title: string | undefined;
  confirm: () => void;
  cancel: () => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
}`;
}
