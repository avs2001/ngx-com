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
          <com-card variant="elevated">
            <div comCardContent>
              <h3 comCardTitle>Elevated</h3>
              <p class="mt-2">Default variant with shadow.</p>
            </div>
          </com-card>

          <com-card variant="outlined">
            <div comCardContent>
              <h3 comCardTitle>Outlined</h3>
              <p class="mt-2">Border without shadow.</p>
            </div>
          </com-card>

          <com-card variant="filled">
            <div comCardContent>
              <h3 comCardTitle>Filled</h3>
              <p class="mt-2">Muted background.</p>
            </div>
          </com-card>

          <com-card variant="ghost">
            <div comCardContent>
              <h3 comCardTitle>Ghost</h3>
              <p class="mt-2">Transparent background.</p>
            </div>
          </com-card>
        </div>
      </div>
    </section>

    <!-- Header with Action -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Header with Trailing Action</h2>
      <div class="rounded-xl border border-surface-200 bg-surface-100 p-8">
        <com-card class="max-w-md">
          <div comCardHeader>
            <div>
              <h3 comCardTitle>Project Settings</h3>
              <p comCardSubtitle>Manage your project configuration</p>
            </div>
            <button comButton variant="ghost" size="icon" aria-label="More options">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="5" r="2"/>
                <circle cx="12" cy="12" r="2"/>
                <circle cx="12" cy="19" r="2"/>
              </svg>
            </button>
          </div>
          <div comCardContent>
            <p>Configure build settings, environment variables, and deployment options.</p>
          </div>
        </com-card>
      </div>
    </section>

    <!-- Footer Alignments -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Footer Alignments</h2>
      <div class="rounded-xl border border-surface-200 bg-surface-100 p-8">
        <div class="grid gap-6 md:grid-cols-2">
          <com-card>
            <div comCardContent>
              <h3 comCardTitle>End Aligned (default)</h3>
            </div>
            <div comCardFooter align="end">
              <span class="text-sm text-muted-foreground">Updated 3m ago</span>
            </div>
          </com-card>

          <com-card>
            <div comCardContent>
              <h3 comCardTitle>Space Between</h3>
            </div>
            <div comCardFooter align="between">
              <span class="text-sm text-muted-foreground">3 items</span>
              <button comButton variant="link" size="sm">View all</button>
            </div>
          </com-card>
        </div>
      </div>
    </section>

    <!-- Actions Direction -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Actions Direction</h2>
      <div class="rounded-xl border border-surface-200 bg-surface-100 p-8">
        <div class="grid gap-6 md:grid-cols-2">
          <com-card>
            <div comCardContent>
              <h3 comCardTitle>Row Layout</h3>
              <p class="mt-2">Horizontal button row.</p>
            </div>
            <div comCardActions direction="row">
              <button comButton variant="ghost" size="sm">Cancel</button>
              <button comButton size="sm">Save</button>
            </div>
          </com-card>

          <com-card>
            <div comCardContent>
              <h3 comCardTitle>Column Layout</h3>
              <p class="mt-2">Stacked full-width buttons.</p>
            </div>
            <div comCardActions direction="column" align="start">
              <button comButton [fullWidth]="true">Primary Action</button>
              <button comButton variant="outline" [fullWidth]="true">Secondary Action</button>
            </div>
          </com-card>
        </div>
      </div>
    </section>

    <!-- Media Positions -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Media Positions</h2>
      <div class="rounded-xl border border-surface-200 bg-surface-100 p-8">
        <div class="grid gap-6 md:grid-cols-3">
          <com-card>
            <img
              comCardMedia
              position="top"
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=150&fit=crop"
              alt="Circuit board"
            />
            <div comCardContent>
              <h3 comCardTitle>Top (default)</h3>
              <p class="mt-1 text-sm">Full bleed at top.</p>
            </div>
          </com-card>

          <com-card>
            <div comCardContent>
              <h3 comCardTitle>Bottom</h3>
              <p class="mt-1 text-sm">Full bleed at bottom.</p>
            </div>
            <img
              comCardMedia
              position="bottom"
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=150&fit=crop"
              alt="Circuit board"
            />
          </com-card>

          <com-card>
            <img
              comCardMedia
              position="inset"
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=150&fit=crop"
              alt="Circuit board"
            />
            <div comCardContent>
              <h3 comCardTitle>Inset</h3>
              <p class="mt-1 text-sm">Padded with rounded corners.</p>
            </div>
          </com-card>
        </div>
      </div>
    </section>

    <!-- Accent Strips -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Accent Strips</h2>
      <div class="rounded-xl border border-surface-200 bg-surface-100 p-8">
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <com-card variant="outlined">
            <div comCardAccent color="primary"></div>
            <div comCardContent>
              <h3 comCardTitle>Primary</h3>
              <p class="mt-1 text-sm">Top accent strip.</p>
            </div>
          </com-card>

          <com-card variant="outlined">
            <div comCardAccent color="success"></div>
            <div comCardContent>
              <h3 comCardTitle>Success</h3>
              <p class="mt-1 text-sm">Top accent strip.</p>
            </div>
          </com-card>

          <com-card variant="outlined">
            <div comCardAccent color="warn"></div>
            <div comCardContent>
              <h3 comCardTitle>Warning</h3>
              <p class="mt-1 text-sm">Top accent strip.</p>
            </div>
          </com-card>

          <com-card variant="filled" class="md:col-span-2 lg:col-span-3">
            <div comCardAccent color="accent" position="left"></div>
            <div comCardContent class="pl-5">
              <h3 comCardTitle>Left Accent</h3>
              <p class="mt-1 text-sm">Note: Add left padding to content when using left accent.</p>
            </div>
          </com-card>
        </div>
      </div>
    </section>

    <!-- Badges -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Badge Overlays</h2>
      <div class="rounded-xl border border-surface-200 bg-surface-100 p-8">
        <div class="grid gap-6 md:grid-cols-2">
          <com-card>
            <span comCardBadge position="top-right" color="primary">NEW</span>
            <div comCardContent class="pt-8">
              <h3 comCardTitle>Top Right</h3>
              <p class="mt-1 text-sm">Default badge position.</p>
            </div>
          </com-card>

          <com-card>
            <span comCardBadge position="top-left" color="warn">SALE</span>
            <div comCardContent class="pt-8">
              <h3 comCardTitle>Top Left</h3>
              <p class="mt-1 text-sm">Alternate position.</p>
            </div>
          </com-card>
        </div>
      </div>
    </section>

    <!-- Dividers -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Dividers</h2>
      <div class="rounded-xl border border-surface-200 bg-surface-100 p-8">
        <div class="grid gap-6 md:grid-cols-2">
          <com-card>
            <div comCardHeader>
              <h3 comCardTitle>Standard Divider</h3>
            </div>
            <hr comCardDivider />
            <div comCardContent>
              <p>Has horizontal margins.</p>
            </div>
            <hr comCardDivider />
            <div comCardContent>
              <p>Another section.</p>
            </div>
          </com-card>

          <com-card>
            <div comCardHeader>
              <h3 comCardTitle>Full-Width Divider</h3>
            </div>
            <hr comCardDivider [inset]="true" />
            <div comCardContent>
              <p>Edge to edge divider.</p>
            </div>
            <hr comCardDivider [inset]="true" />
            <div comCardContent>
              <p>Another section.</p>
            </div>
          </com-card>
        </div>
      </div>
    </section>

    <!-- Interactive Cards -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Interactive Cards</h2>
      <div class="rounded-xl border border-surface-200 bg-surface-100 p-8">
        <div class="grid gap-6 md:grid-cols-3">
          <com-card variant="elevated" [interactive]="true">
            <div comCardContent>
              <h3 comCardTitle>Elevated</h3>
              <p class="mt-1 text-sm">Hover for shadow effect.</p>
            </div>
          </com-card>

          <com-card variant="outlined" [interactive]="true">
            <div comCardContent>
              <h3 comCardTitle>Outlined</h3>
              <p class="mt-1 text-sm">Hover for border highlight.</p>
            </div>
          </com-card>

          <com-card variant="filled" [interactive]="true">
            <div comCardContent>
              <h3 comCardTitle>Filled</h3>
              <p class="mt-1 text-sm">Hover for color change.</p>
            </div>
          </com-card>
        </div>
      </div>
    </section>
  `,
})
export class CardExamples {}
