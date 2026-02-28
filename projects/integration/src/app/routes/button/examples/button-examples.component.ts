import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { UiButton } from 'ngx-com/components/button';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-button-examples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UiButton, CodeBlock],
  template: `
    <!-- Variants -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Variants</h2>
      <p class="mb-4 text-surface-600">
        Four visual treatments for different contexts and emphasis levels.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <button uiButton>Solid</button>
          <button uiButton variant="outline">Outline</button>
          <button uiButton variant="ghost">Ghost</button>
          <a uiButton variant="link" href="#">Link</a>
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="variantsCode" />
    </section>

    <!-- Colors -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Colors</h2>
      <p class="mb-4 text-surface-600">
        Four semantic colors that work with all variants.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="space-y-4">
          <!-- Solid row -->
          <div class="flex flex-wrap items-center justify-center gap-4">
            <button uiButton color="primary">Primary</button>
            <button uiButton color="accent">Accent</button>
            <button uiButton color="warn">Warn</button>
            <button uiButton color="muted">Muted</button>
          </div>
          <!-- Outline row -->
          <div class="flex flex-wrap items-center justify-center gap-4">
            <button uiButton variant="outline" color="primary">Primary</button>
            <button uiButton variant="outline" color="accent">Accent</button>
            <button uiButton variant="outline" color="warn">Warn</button>
            <button uiButton variant="outline" color="muted">Muted</button>
          </div>
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="colorsCode" />
    </section>

    <!-- Sizes -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Sizes</h2>
      <p class="mb-4 text-surface-600">
        Four sizes with proportional padding and typography.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <button uiButton size="sm">Small</button>
          <button uiButton size="md">Medium</button>
          <button uiButton size="lg">Large</button>
          <button uiButton size="icon" aria-label="Settings">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="sizesCode" />
    </section>

    <!-- Icon Buttons -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Icon Buttons</h2>
      <p class="mb-4 text-surface-600">
        Use <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">size="icon"</code> for square icon-only buttons.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <button uiButton size="icon" aria-label="Edit">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button uiButton variant="outline" size="icon" aria-label="Copy">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          </button>
          <button uiButton variant="ghost" size="icon" aria-label="More options">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="1"/>
              <circle cx="19" cy="12" r="1"/>
              <circle cx="5" cy="12" r="1"/>
            </svg>
          </button>
          <button uiButton variant="ghost" color="warn" size="icon" aria-label="Delete">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="iconButtonsCode" />
    </section>

    <!-- With Icons -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">With Icons</h2>
      <p class="mb-4 text-surface-600">
        Combine text with icons. The gap between elements is handled by the button styles.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <button uiButton>
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
              <polyline points="17 21 17 13 7 13 7 21"/>
              <polyline points="7 3 7 8 15 8"/>
            </svg>
            Save
          </button>
          <button uiButton variant="outline">
            Download
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </button>
          <button uiButton variant="ghost" color="accent">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            Favorite
          </button>
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="withIconsCode" />
    </section>

    <!-- As Links -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">As Links</h2>
      <p class="mb-4 text-surface-600">
        Apply to anchor elements for navigation. Native attributes like
        <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">routerLink</code>,
        <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">href</code>, and
        <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">target</code> work naturally.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <a uiButton href="#">Button Link</a>
          <a uiButton variant="outline" href="#">Outline Link</a>
          <a uiButton variant="ghost" href="#">Ghost Link</a>
          <a uiButton variant="link" href="#">Text Link</a>
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="asLinksCode" />
    </section>

    <!-- Full Width -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Full Width</h2>
      <p class="mb-4 text-surface-600">
        Use <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">fullWidth</code> for block-level buttons.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex max-w-sm flex-col gap-4">
          <button uiButton fullWidth>Submit Application</button>
          <button uiButton variant="outline" fullWidth>Cancel</button>
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="fullWidthCode" />
    </section>

    <!-- Disabled State -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Disabled State</h2>
      <p class="mb-4 text-surface-600">
        Native <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">disabled</code> attribute for buttons,
        <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[disabled]</code> input for anchors.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <button uiButton disabled>Disabled Button</button>
          <button uiButton variant="outline" disabled>Disabled Outline</button>
          <a uiButton [disabled]="true" href="#">Disabled Link</a>
        </div>
      </div>
      <int-code-block class="mt-4" language="html" [code]="disabledCode" />
    </section>

    <!-- Loading State -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Loading State</h2>
      <p class="mb-4 text-surface-600">
        Combine disabled state with a spinner for loading feedback.
      </p>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <button uiButton disabled>
            <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
            Processing...
          </button>
          <button uiButton variant="outline" [disabled]="isLoading()" (click)="simulateLoading()">
            @if (isLoading()) {
              <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
              Saving...
            } @else {
              Save
            }
          </button>
        </div>
      </div>
      <int-code-block class="mt-4" language="typescript" [code]="loadingCode" />
    </section>

    <!-- Use Cases -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Common Use Cases</h2>
      <div class="rounded-xl border border-surface-200 bg-white p-8">
        <div class="space-y-6">
          <!-- Form actions -->
          <div class="border-b border-surface-100 pb-6">
            <h3 class="mb-4 font-medium text-surface-900">Form Actions</h3>
            <div class="flex gap-3">
              <button uiButton>Submit</button>
              <button uiButton variant="outline" color="muted">Cancel</button>
            </div>
          </div>

          <!-- Destructive action -->
          <div class="border-b border-surface-100 pb-6">
            <h3 class="mb-4 font-medium text-surface-900">Destructive Action</h3>
            <div class="flex gap-3">
              <button uiButton color="warn">Delete Account</button>
              <button uiButton variant="ghost" color="muted">Cancel</button>
            </div>
          </div>

          <!-- Card footer -->
          <div class="border-b border-surface-100 pb-6">
            <h3 class="mb-4 font-medium text-surface-900">Card Footer</h3>
            <div class="flex justify-end gap-3">
              <button uiButton variant="ghost" color="muted">Learn More</button>
              <button uiButton>Get Started</button>
            </div>
          </div>

          <!-- Toolbar -->
          <div>
            <h3 class="mb-4 font-medium text-surface-900">Toolbar</h3>
            <div class="flex gap-1">
              <button uiButton variant="ghost" size="icon" aria-label="Bold">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
                  <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
                </svg>
              </button>
              <button uiButton variant="ghost" size="icon" aria-label="Italic">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="19" y1="4" x2="10" y2="4"/>
                  <line x1="14" y1="20" x2="5" y2="20"/>
                  <line x1="15" y1="4" x2="9" y2="20"/>
                </svg>
              </button>
              <button uiButton variant="ghost" size="icon" aria-label="Underline">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/>
                  <line x1="4" y1="21" x2="20" y2="21"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ButtonExamples {
  protected readonly isLoading = signal(false);

  protected simulateLoading(): void {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 2000);
  }

  protected readonly variantsCode = `<button uiButton>Solid</button>
<button uiButton variant="outline">Outline</button>
<button uiButton variant="ghost">Ghost</button>
<a uiButton variant="link" href="#">Link</a>`;

  protected readonly colorsCode = `<!-- Solid -->
<button uiButton color="primary">Primary</button>
<button uiButton color="accent">Accent</button>
<button uiButton color="warn">Warn</button>
<button uiButton color="muted">Muted</button>

<!-- Outline -->
<button uiButton variant="outline" color="primary">Primary</button>
<button uiButton variant="outline" color="accent">Accent</button>`;

  protected readonly sizesCode = `<button uiButton size="sm">Small</button>
<button uiButton size="md">Medium</button>
<button uiButton size="lg">Large</button>
<button uiButton size="icon" aria-label="Settings">
  <svg>...</svg>
</button>`;

  protected readonly iconButtonsCode = `<button uiButton size="icon" aria-label="Edit">
  <svg class="h-5 w-5">...</svg>
</button>
<button uiButton variant="outline" size="icon" aria-label="Copy">
  <svg class="h-5 w-5">...</svg>
</button>
<button uiButton variant="ghost" size="icon" aria-label="More">
  <svg class="h-5 w-5">...</svg>
</button>`;

  protected readonly withIconsCode = `<button uiButton>
  <svg class="h-4 w-4">...</svg>
  Save
</button>
<button uiButton variant="outline">
  Download
  <svg class="h-4 w-4">...</svg>
</button>`;

  protected readonly asLinksCode = `<a uiButton href="/dashboard">Dashboard</a>
<a uiButton variant="outline" routerLink="/settings">Settings</a>
<a uiButton variant="link" href="/docs" target="_blank">Docs</a>`;

  protected readonly fullWidthCode = `<button uiButton fullWidth>Submit Application</button>
<button uiButton variant="outline" fullWidth>Cancel</button>`;

  protected readonly disabledCode = `<!-- Native disabled for buttons -->
<button uiButton disabled>Disabled</button>

<!-- Input binding for anchors -->
<a uiButton [disabled]="true" href="#">Disabled Link</a>`;

  protected readonly loadingCode = `@Component({
  template: \`
    <button uiButton [disabled]="isLoading()" (click)="save()">
      @if (isLoading()) {
        <svg class="h-4 w-4 animate-spin">...</svg>
        Saving...
      } @else {
        Save
      }
    </button>
  \`,
})
export class Example {
  isLoading = signal(false);

  save() {
    this.isLoading.set(true);
    // ...
  }
}`;
}
