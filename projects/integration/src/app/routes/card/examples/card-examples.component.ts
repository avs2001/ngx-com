import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
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
} from 'ngx-com/components/card';
import { UiButton } from 'ngx-com/components/button';

@Component({
  selector: 'int-card-examples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
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
    UiButton,
  ],
  template: `
    <!-- Variants -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Variants</h2>
      <div class="rounded-xl border border-surface-200 bg-surface-100 p-8">
        <div class="grid gap-6 md:grid-cols-2">
          <ui-card variant="elevated">
            <div uiCardContent>
              <h3 uiCardTitle>Elevated</h3>
              <p class="mt-2">Default variant with shadow.</p>
            </div>
          </ui-card>

          <ui-card variant="outlined">
            <div uiCardContent>
              <h3 uiCardTitle>Outlined</h3>
              <p class="mt-2">Border without shadow.</p>
            </div>
          </ui-card>

          <ui-card variant="filled">
            <div uiCardContent>
              <h3 uiCardTitle>Filled</h3>
              <p class="mt-2">Muted background.</p>
            </div>
          </ui-card>

          <ui-card variant="ghost">
            <div uiCardContent>
              <h3 uiCardTitle>Ghost</h3>
              <p class="mt-2">Transparent background.</p>
            </div>
          </ui-card>
        </div>
      </div>
    </section>

    <!-- Header with Action -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Header with Trailing Action</h2>
      <div class="rounded-xl border border-surface-200 bg-surface-100 p-8">
        <ui-card class="max-w-md">
          <div uiCardHeader>
            <div>
              <h3 uiCardTitle>Project Settings</h3>
              <p uiCardSubtitle>Manage your project configuration</p>
            </div>
            <button uiButton variant="ghost" size="icon" aria-label="More options">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="5" r="2"/>
                <circle cx="12" cy="12" r="2"/>
                <circle cx="12" cy="19" r="2"/>
              </svg>
            </button>
          </div>
          <div uiCardContent>
            <p>Configure build settings, environment variables, and deployment options.</p>
          </div>
        </ui-card>
      </div>
    </section>

    <!-- Footer Alignments -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Footer Alignments</h2>
      <div class="rounded-xl border border-surface-200 bg-surface-100 p-8">
        <div class="grid gap-6 md:grid-cols-2">
          <ui-card>
            <div uiCardContent>
              <h3 uiCardTitle>End Aligned (default)</h3>
            </div>
            <div uiCardFooter align="end">
              <span class="text-sm text-muted-foreground">Updated 3m ago</span>
            </div>
          </ui-card>

          <ui-card>
            <div uiCardContent>
              <h3 uiCardTitle>Space Between</h3>
            </div>
            <div uiCardFooter align="between">
              <span class="text-sm text-muted-foreground">3 items</span>
              <button uiButton variant="link" size="sm">View all</button>
            </div>
          </ui-card>
        </div>
      </div>
    </section>

    <!-- Actions Direction -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Actions Direction</h2>
      <div class="rounded-xl border border-surface-200 bg-surface-100 p-8">
        <div class="grid gap-6 md:grid-cols-2">
          <ui-card>
            <div uiCardContent>
              <h3 uiCardTitle>Row Layout</h3>
              <p class="mt-2">Horizontal button row.</p>
            </div>
            <div uiCardActions direction="row">
              <button uiButton variant="ghost" size="sm">Cancel</button>
              <button uiButton size="sm">Save</button>
            </div>
          </ui-card>

          <ui-card>
            <div uiCardContent>
              <h3 uiCardTitle>Column Layout</h3>
              <p class="mt-2">Stacked full-width buttons.</p>
            </div>
            <div uiCardActions direction="column" align="start">
              <button uiButton [fullWidth]="true">Primary Action</button>
              <button uiButton variant="outline" [fullWidth]="true">Secondary Action</button>
            </div>
          </ui-card>
        </div>
      </div>
    </section>

    <!-- Media Positions -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Media Positions</h2>
      <div class="rounded-xl border border-surface-200 bg-surface-100 p-8">
        <div class="grid gap-6 md:grid-cols-3">
          <ui-card>
            <img
              uiCardMedia
              position="top"
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=150&fit=crop"
              alt="Circuit board"
            />
            <div uiCardContent>
              <h3 uiCardTitle>Top (default)</h3>
              <p class="mt-1 text-sm">Full bleed at top.</p>
            </div>
          </ui-card>

          <ui-card>
            <div uiCardContent>
              <h3 uiCardTitle>Bottom</h3>
              <p class="mt-1 text-sm">Full bleed at bottom.</p>
            </div>
            <img
              uiCardMedia
              position="bottom"
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=150&fit=crop"
              alt="Circuit board"
            />
          </ui-card>

          <ui-card>
            <img
              uiCardMedia
              position="inset"
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=150&fit=crop"
              alt="Circuit board"
            />
            <div uiCardContent>
              <h3 uiCardTitle>Inset</h3>
              <p class="mt-1 text-sm">Padded with rounded corners.</p>
            </div>
          </ui-card>
        </div>
      </div>
    </section>

    <!-- Accent Strips -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Accent Strips</h2>
      <div class="rounded-xl border border-surface-200 bg-surface-100 p-8">
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ui-card variant="outlined">
            <div uiCardAccent color="primary"></div>
            <div uiCardContent>
              <h3 uiCardTitle>Primary</h3>
              <p class="mt-1 text-sm">Top accent strip.</p>
            </div>
          </ui-card>

          <ui-card variant="outlined">
            <div uiCardAccent color="success"></div>
            <div uiCardContent>
              <h3 uiCardTitle>Success</h3>
              <p class="mt-1 text-sm">Top accent strip.</p>
            </div>
          </ui-card>

          <ui-card variant="outlined">
            <div uiCardAccent color="warn"></div>
            <div uiCardContent>
              <h3 uiCardTitle>Warning</h3>
              <p class="mt-1 text-sm">Top accent strip.</p>
            </div>
          </ui-card>

          <ui-card variant="filled" class="md:col-span-2 lg:col-span-3">
            <div uiCardAccent color="accent" position="left"></div>
            <div uiCardContent class="pl-5">
              <h3 uiCardTitle>Left Accent</h3>
              <p class="mt-1 text-sm">Note: Add left padding to content when using left accent.</p>
            </div>
          </ui-card>
        </div>
      </div>
    </section>

    <!-- Badges -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Badge Overlays</h2>
      <div class="rounded-xl border border-surface-200 bg-surface-100 p-8">
        <div class="grid gap-6 md:grid-cols-2">
          <ui-card>
            <span uiCardBadge position="top-right" color="primary">NEW</span>
            <div uiCardContent class="pt-8">
              <h3 uiCardTitle>Top Right</h3>
              <p class="mt-1 text-sm">Default badge position.</p>
            </div>
          </ui-card>

          <ui-card>
            <span uiCardBadge position="top-left" color="warn">SALE</span>
            <div uiCardContent class="pt-8">
              <h3 uiCardTitle>Top Left</h3>
              <p class="mt-1 text-sm">Alternate position.</p>
            </div>
          </ui-card>
        </div>
      </div>
    </section>

    <!-- Dividers -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Dividers</h2>
      <div class="rounded-xl border border-surface-200 bg-surface-100 p-8">
        <div class="grid gap-6 md:grid-cols-2">
          <ui-card>
            <div uiCardHeader>
              <h3 uiCardTitle>Standard Divider</h3>
            </div>
            <hr uiCardDivider />
            <div uiCardContent>
              <p>Has horizontal margins.</p>
            </div>
            <hr uiCardDivider />
            <div uiCardContent>
              <p>Another section.</p>
            </div>
          </ui-card>

          <ui-card>
            <div uiCardHeader>
              <h3 uiCardTitle>Full-Width Divider</h3>
            </div>
            <hr uiCardDivider [inset]="true" />
            <div uiCardContent>
              <p>Edge to edge divider.</p>
            </div>
            <hr uiCardDivider [inset]="true" />
            <div uiCardContent>
              <p>Another section.</p>
            </div>
          </ui-card>
        </div>
      </div>
    </section>

    <!-- Interactive Cards -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Interactive Cards</h2>
      <div class="rounded-xl border border-surface-200 bg-surface-100 p-8">
        <div class="grid gap-6 md:grid-cols-3">
          <ui-card variant="elevated" [interactive]="true">
            <div uiCardContent>
              <h3 uiCardTitle>Elevated</h3>
              <p class="mt-1 text-sm">Hover for shadow effect.</p>
            </div>
          </ui-card>

          <ui-card variant="outlined" [interactive]="true">
            <div uiCardContent>
              <h3 uiCardTitle>Outlined</h3>
              <p class="mt-1 text-sm">Hover for border highlight.</p>
            </div>
          </ui-card>

          <ui-card variant="filled" [interactive]="true">
            <div uiCardContent>
              <h3 uiCardTitle>Filled</h3>
              <p class="mt-1 text-sm">Hover for color change.</p>
            </div>
          </ui-card>
        </div>
      </div>
    </section>
  `,
})
export class CardExamples {}
