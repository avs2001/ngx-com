import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'int-card-api',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- UiCard -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">UiCard</h2>
      <p class="mb-4 text-surface-600">
        Container component. Selector: <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">ui-card</code>
      </p>
      <div class="overflow-x-auto rounded-lg border border-surface-200">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-surface-200 bg-surface-50">
            <tr>
              <th class="px-4 py-3 font-semibold text-surface-900">Input</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Type</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Default</th>
              <th class="px-4 py-3 font-semibold text-surface-900">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-200 bg-white">
            <tr>
              <td class="px-4 py-3 font-mono text-sm">variant</td>
              <td class="px-4 py-3 font-mono text-sm">'elevated' | 'outlined' | 'filled' | 'ghost'</td>
              <td class="px-4 py-3 font-mono text-sm">'elevated'</td>
              <td class="px-4 py-3">Visual treatment of the card surface</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-sm">padding</td>
              <td class="px-4 py-3 font-mono text-sm">'none' | 'sm' | 'md' | 'lg'</td>
              <td class="px-4 py-3 font-mono text-sm">'none'</td>
              <td class="px-4 py-3">Inner spacing (sub-parts manage their own padding)</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-sm">radius</td>
              <td class="px-4 py-3 font-mono text-sm">'none' | 'sm' | 'md' | 'lg' | 'xl'</td>
              <td class="px-4 py-3 font-mono text-sm">'lg'</td>
              <td class="px-4 py-3">Border radius</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-mono text-sm">interactive</td>
              <td class="px-4 py-3 font-mono text-sm">boolean</td>
              <td class="px-4 py-3 font-mono text-sm">false</td>
              <td class="px-4 py-3">Adds hover/active states and cursor-pointer</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Sub-part Directives -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Sub-part Directives</h2>

      <!-- Simple directives -->
      <div class="mb-8">
        <h3 class="mb-3 text-lg font-semibold text-surface-900">Static Directives (no inputs)</h3>
        <div class="overflow-x-auto rounded-lg border border-surface-200">
          <table class="w-full text-left text-sm">
            <thead class="border-b border-surface-200 bg-surface-50">
              <tr>
                <th class="px-4 py-3 font-semibold text-surface-900">Directive</th>
                <th class="px-4 py-3 font-semibold text-surface-900">Selector</th>
                <th class="px-4 py-3 font-semibold text-surface-900">Description</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-200 bg-white">
              <tr>
                <td class="px-4 py-3 font-mono text-sm">UiCardHeader</td>
                <td class="px-4 py-3 font-mono text-sm">[uiCardHeader]</td>
                <td class="px-4 py-3">Top section with flex layout for title + trailing actions</td>
              </tr>
              <tr>
                <td class="px-4 py-3 font-mono text-sm">UiCardTitle</td>
                <td class="px-4 py-3 font-mono text-sm">[uiCardTitle]</td>
                <td class="px-4 py-3">Heading text styling (apply to h2, h3, etc.)</td>
              </tr>
              <tr>
                <td class="px-4 py-3 font-mono text-sm">UiCardSubtitle</td>
                <td class="px-4 py-3 font-mono text-sm">[uiCardSubtitle]</td>
                <td class="px-4 py-3">Secondary text styling</td>
              </tr>
              <tr>
                <td class="px-4 py-3 font-mono text-sm">UiCardContent</td>
                <td class="px-4 py-3 font-mono text-sm">[uiCardContent]</td>
                <td class="px-4 py-3">Main body area with consistent padding</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- UiCardFooter -->
      <div class="mb-8">
        <h3 class="mb-3 text-lg font-semibold text-surface-900">UiCardFooter</h3>
        <p class="mb-3 text-surface-600">
          Selector: <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[uiCardFooter]</code>
        </p>
        <div class="overflow-x-auto rounded-lg border border-surface-200">
          <table class="w-full text-left text-sm">
            <thead class="border-b border-surface-200 bg-surface-50">
              <tr>
                <th class="px-4 py-3 font-semibold text-surface-900">Input</th>
                <th class="px-4 py-3 font-semibold text-surface-900">Type</th>
                <th class="px-4 py-3 font-semibold text-surface-900">Default</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-200 bg-white">
              <tr>
                <td class="px-4 py-3 font-mono text-sm">align</td>
                <td class="px-4 py-3 font-mono text-sm">'start' | 'end' | 'center' | 'between'</td>
                <td class="px-4 py-3 font-mono text-sm">'end'</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- UiCardActions -->
      <div class="mb-8">
        <h3 class="mb-3 text-lg font-semibold text-surface-900">UiCardActions</h3>
        <p class="mb-3 text-surface-600">
          Selector: <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[uiCardActions]</code>
        </p>
        <div class="overflow-x-auto rounded-lg border border-surface-200">
          <table class="w-full text-left text-sm">
            <thead class="border-b border-surface-200 bg-surface-50">
              <tr>
                <th class="px-4 py-3 font-semibold text-surface-900">Input</th>
                <th class="px-4 py-3 font-semibold text-surface-900">Type</th>
                <th class="px-4 py-3 font-semibold text-surface-900">Default</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-200 bg-white">
              <tr>
                <td class="px-4 py-3 font-mono text-sm">align</td>
                <td class="px-4 py-3 font-mono text-sm">'start' | 'end' | 'center' | 'between'</td>
                <td class="px-4 py-3 font-mono text-sm">'end'</td>
              </tr>
              <tr>
                <td class="px-4 py-3 font-mono text-sm">direction</td>
                <td class="px-4 py-3 font-mono text-sm">'row' | 'column'</td>
                <td class="px-4 py-3 font-mono text-sm">'row'</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- UiCardMedia -->
      <div class="mb-8">
        <h3 class="mb-3 text-lg font-semibold text-surface-900">UiCardMedia</h3>
        <p class="mb-3 text-surface-600">
          Selector: <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[uiCardMedia]</code>
        </p>
        <div class="overflow-x-auto rounded-lg border border-surface-200">
          <table class="w-full text-left text-sm">
            <thead class="border-b border-surface-200 bg-surface-50">
              <tr>
                <th class="px-4 py-3 font-semibold text-surface-900">Input</th>
                <th class="px-4 py-3 font-semibold text-surface-900">Type</th>
                <th class="px-4 py-3 font-semibold text-surface-900">Default</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-200 bg-white">
              <tr>
                <td class="px-4 py-3 font-mono text-sm">position</td>
                <td class="px-4 py-3 font-mono text-sm">'top' | 'bottom' | 'inset'</td>
                <td class="px-4 py-3 font-mono text-sm">'top'</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- UiCardDivider -->
      <div class="mb-8">
        <h3 class="mb-3 text-lg font-semibold text-surface-900">UiCardDivider</h3>
        <p class="mb-3 text-surface-600">
          Selector: <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[uiCardDivider]</code>
        </p>
        <div class="overflow-x-auto rounded-lg border border-surface-200">
          <table class="w-full text-left text-sm">
            <thead class="border-b border-surface-200 bg-surface-50">
              <tr>
                <th class="px-4 py-3 font-semibold text-surface-900">Input</th>
                <th class="px-4 py-3 font-semibold text-surface-900">Type</th>
                <th class="px-4 py-3 font-semibold text-surface-900">Default</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-200 bg-white">
              <tr>
                <td class="px-4 py-3 font-mono text-sm">inset</td>
                <td class="px-4 py-3 font-mono text-sm">boolean</td>
                <td class="px-4 py-3 font-mono text-sm">false</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- UiCardAccent -->
      <div class="mb-8">
        <h3 class="mb-3 text-lg font-semibold text-surface-900">UiCardAccent</h3>
        <p class="mb-3 text-surface-600">
          Selector: <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[uiCardAccent]</code>
        </p>
        <div class="overflow-x-auto rounded-lg border border-surface-200">
          <table class="w-full text-left text-sm">
            <thead class="border-b border-surface-200 bg-surface-50">
              <tr>
                <th class="px-4 py-3 font-semibold text-surface-900">Input</th>
                <th class="px-4 py-3 font-semibold text-surface-900">Type</th>
                <th class="px-4 py-3 font-semibold text-surface-900">Default</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-200 bg-white">
              <tr>
                <td class="px-4 py-3 font-mono text-sm">color</td>
                <td class="px-4 py-3 font-mono text-sm">'primary' | 'accent' | 'warn' | 'success' | 'muted'</td>
                <td class="px-4 py-3 font-mono text-sm">'primary'</td>
              </tr>
              <tr>
                <td class="px-4 py-3 font-mono text-sm">position</td>
                <td class="px-4 py-3 font-mono text-sm">'top' | 'left'</td>
                <td class="px-4 py-3 font-mono text-sm">'top'</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- UiCardBadge -->
      <div>
        <h3 class="mb-3 text-lg font-semibold text-surface-900">UiCardBadge</h3>
        <p class="mb-3 text-surface-600">
          Selector: <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[uiCardBadge]</code>
        </p>
        <div class="overflow-x-auto rounded-lg border border-surface-200">
          <table class="w-full text-left text-sm">
            <thead class="border-b border-surface-200 bg-surface-50">
              <tr>
                <th class="px-4 py-3 font-semibold text-surface-900">Input</th>
                <th class="px-4 py-3 font-semibold text-surface-900">Type</th>
                <th class="px-4 py-3 font-semibold text-surface-900">Default</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-surface-200 bg-white">
              <tr>
                <td class="px-4 py-3 font-mono text-sm">position</td>
                <td class="px-4 py-3 font-mono text-sm">'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'</td>
                <td class="px-4 py-3 font-mono text-sm">'top-right'</td>
              </tr>
              <tr>
                <td class="px-4 py-3 font-mono text-sm">color</td>
                <td class="px-4 py-3 font-mono text-sm">'primary' | 'accent' | 'warn' | 'success' | 'muted'</td>
                <td class="px-4 py-3 font-mono text-sm">'primary'</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Import -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Import</h2>
      <div class="rounded-lg border border-surface-200 bg-surface-900 p-4">
        <pre class="text-sm text-surface-100"><code>import &#123;
  UiCard,
  UiCardHeader,
  UiCardTitle,
  UiCardSubtitle,
  UiCardContent,
  UiCardFooter,
  UiCardActions,
  UiCardMedia,
  UiCardDivider,
  UiCardAccent,
  UiCardBadge,
&#125; from 'ngx-com/components/card';</code></pre>
      </div>
    </section>
  `,
})
export class CardApi {}
