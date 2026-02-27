import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'int-code-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="group relative rounded-lg border border-surface-200 bg-surface-900">
      <!-- Header -->
      @if (language()) {
        <div class="flex items-center justify-between border-b border-surface-700 px-4 py-2">
          <span class="text-xs font-medium uppercase tracking-wider text-surface-400">
            {{ language() }}
          </span>
          <button
            type="button"
            class="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-surface-400 transition hover:bg-surface-800 hover:text-surface-200"
            (click)="copyCode()"
          >
            @if (copied()) {
              <svg class="h-4 w-4 text-success-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              <span class="text-success-500">Copied!</span>
            } @else {
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2"/>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
              </svg>
              <span>Copy</span>
            }
          </button>
        </div>
      }

      <!-- Code -->
      <pre class="overflow-x-auto p-4"><code class="text-sm text-surface-100">{{ code() }}</code></pre>
    </div>
  `,
})
export class CodeBlock {
  private readonly document = inject(DOCUMENT);

  readonly code = input.required<string>();
  readonly language = input<string>();

  protected readonly copied = signal(false);

  protected copyCode(): void {
    const navigator = this.document.defaultView?.navigator;
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(this.code()).then(() => {
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2000);
      });
    }
  }
}
