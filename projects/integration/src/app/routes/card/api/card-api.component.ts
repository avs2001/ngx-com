import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'int-card-api',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- ComCard -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">ComCard</h2>
      <p class="mb-4 text-surface-600">
        Container component. Selector: <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">com-card</code>
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
                <td class="px-4 py-3 font-mono text-sm">ComCardHeader</td>
                <td class="px-4 py-3 font-mono text-sm">[comCardHeader]</td>
                <td class="px-4 py-3">Top section with flex layout for title + trailing actions</td>
              </tr>
              <tr>
                <td class="px-4 py-3 font-mono text-sm">ComCardTitle</td>
                <td class="px-4 py-3 font-mono text-sm">[comCardTitle]</td>
                <td class="px-4 py-3">Heading text styling (apply to h2, h3, etc.)</td>
              </tr>
              <tr>
                <td class="px-4 py-3 font-mono text-sm">ComCardSubtitle</td>
                <td class="px-4 py-3 font-mono text-sm">[comCardSubtitle]</td>
                <td class="px-4 py-3">Secondary text styling</td>
              </tr>
              <tr>
                <td class="px-4 py-3 font-mono text-sm">ComCardContent</td>
                <td class="px-4 py-3 font-mono text-sm">[comCardContent]</td>
                <td class="px-4 py-3">Main body area with consistent padding</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ComCardFooter -->
      <div class="mb-8">
        <h3 class="mb-3 text-lg font-semibold text-surface-900">ComCardFooter</h3>
        <p class="mb-3 text-surface-600">
          Selector: <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[comCardFooter]</code>
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

      <!-- ComCardActions -->
      <div class="mb-8">
        <h3 class="mb-3 text-lg font-semibold text-surface-900">ComCardActions</h3>
        <p class="mb-3 text-surface-600">
          Selector: <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[comCardActions]</code>
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

      <!-- ComCardMedia -->
      <div class="mb-8">
        <h3 class="mb-3 text-lg font-semibold text-surface-900">ComCardMedia</h3>
        <p class="mb-3 text-surface-600">
          Selector: <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[comCardMedia]</code>
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

      <!-- ComCardDivider -->
      <div class="mb-8">
        <h3 class="mb-3 text-lg font-semibold text-surface-900">ComCardDivider</h3>
        <p class="mb-3 text-surface-600">
          Selector: <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[comCardDivider]</code>
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

      <!-- ComCardAccent -->
      <div class="mb-8">
        <h3 class="mb-3 text-lg font-semibold text-surface-900">ComCardAccent</h3>
        <p class="mb-3 text-surface-600">
          Selector: <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[comCardAccent]</code>
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

      <!-- ComCardBadge -->
      <div>
        <h3 class="mb-3 text-lg font-semibold text-surface-900">ComCardBadge</h3>
        <p class="mb-3 text-surface-600">
          Selector: <code class="rounded bg-surface-100 px-1.5 py-0.5 text-sm">[comCardBadge]</code>
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
  ComCard,
  ComCardHeader,
  ComCardTitle,
  ComCardSubtitle,
  ComCardContent,
  ComCardFooter,
  ComCardActions,
  ComCardMedia,
  ComCardDivider,
  ComCardAccent,
  ComCardBadge,
&#125; from 'ngx-com/components/card';</code></pre>
      </div>
    </section>
  `,
})
export class CardApi {}
