import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from '../shared/code-block';

@Component({
  selector: 'int-theming',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CodeBlock],
  template: `
    <div class="mx-auto max-w-4xl px-6 py-12">
      <h1 class="mb-4 text-4xl font-bold text-surface-900">Theming</h1>
      <p class="mb-8 text-lg text-surface-600">
        Customize the look and feel of ngx-com components using CSS custom properties.
      </p>

      <!-- Color Palette -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Color Palette</h2>
        <p class="mb-6 text-surface-600">
          The library uses a semantic color system with primary, accent, warn, and surface colors.
          Each color has 11 shades (50-950).
        </p>

        <div class="grid gap-6 md:grid-cols-2">
          <!-- Primary -->
          <div class="rounded-xl border border-surface-200 bg-white p-4">
            <h3 class="mb-3 font-semibold text-surface-900">Primary</h3>
            <div class="flex gap-1">
              @for (shade of shades; track shade) {
                <div
                  class="h-10 flex-1 rounded-md"
                  [class]="'bg-primary-' + shade"
                  [title]="'primary-' + shade"
                ></div>
              }
            </div>
          </div>

          <!-- Accent -->
          <div class="rounded-xl border border-surface-200 bg-white p-4">
            <h3 class="mb-3 font-semibold text-surface-900">Accent</h3>
            <div class="flex gap-1">
              @for (shade of shades; track shade) {
                <div
                  class="h-10 flex-1 rounded-md"
                  [class]="'bg-accent-' + shade"
                  [title]="'accent-' + shade"
                ></div>
              }
            </div>
          </div>

          <!-- Warn -->
          <div class="rounded-xl border border-surface-200 bg-white p-4">
            <h3 class="mb-3 font-semibold text-surface-900">Warn</h3>
            <div class="flex gap-1">
              @for (shade of shades; track shade) {
                <div
                  class="h-10 flex-1 rounded-md"
                  [class]="'bg-warn-' + shade"
                  [title]="'warn-' + shade"
                ></div>
              }
            </div>
          </div>

          <!-- Surface -->
          <div class="rounded-xl border border-surface-200 bg-white p-4">
            <h3 class="mb-3 font-semibold text-surface-900">Surface</h3>
            <div class="flex gap-1">
              @for (shade of shades; track shade) {
                <div
                  class="h-10 flex-1 rounded-md"
                  [class]="'bg-surface-' + shade"
                  [title]="'surface-' + shade"
                ></div>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- Customizing Colors -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Customizing Colors</h2>
        <p class="mb-4 text-surface-600">
          Override the default colors using Tailwind CSS v4's &#64;theme directive:
        </p>
        <int-code-block
          language="css"
          [code]="customColorCode"
        />
      </section>

      <!-- Typography -->
      <section class="mb-12">
        <h2 class="mb-4 text-2xl font-semibold text-surface-900">Typography</h2>
        <p class="mb-4 text-surface-600">
          The library uses three font families that you can customize:
        </p>
        <int-code-block
          language="css"
          [code]="typographyCode"
        />
      </section>
    </div>
  `,
})
export class Theming {
  protected readonly shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  protected readonly customColorCode = `@theme {
  /* Override primary color (green instead of blue) */
  --color-primary-50: oklch(0.97 0.02 145);
  --color-primary-100: oklch(0.93 0.05 145);
  --color-primary-200: oklch(0.86 0.09 145);
  --color-primary-300: oklch(0.76 0.15 145);
  --color-primary-400: oklch(0.66 0.20 145);
  --color-primary-500: oklch(0.55 0.22 145);
  --color-primary-600: oklch(0.48 0.20 145);
  --color-primary-700: oklch(0.40 0.17 145);
  --color-primary-800: oklch(0.33 0.14 145);
  --color-primary-900: oklch(0.27 0.10 145);
  --color-primary-950: oklch(0.20 0.07 145);
}`;

  protected readonly typographyCode = `@theme {
  --font-sans: 'Your Sans Font', sans-serif;
  --font-heading: 'Your Heading Font', sans-serif;
  --font-mono: 'Your Mono Font', monospace;
}`;
}
