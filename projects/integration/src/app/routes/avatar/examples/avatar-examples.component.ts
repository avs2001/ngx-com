import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComAvatar, ComAvatarCustom, ComAvatarGroup } from 'ngx-com/components/avatar';
import { ComCard } from 'ngx-com/components/card';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-avatar-examples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComAvatar, ComAvatarCustom, ComAvatarGroup, ComCard, CodeBlock],
  template: `
    <!-- Sizes -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Sizes</h2>
      <p class="mb-4 text-surface-600">
        Six sizes from badge-sized (xs) to profile header (2xl).
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-end justify-center gap-6">
          <div class="flex flex-col items-center gap-2">
            <com-avatar name="Jane Doe" size="xs" />
            <span class="text-xs text-surface-500">xs (20px)</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-avatar name="Jane Doe" size="sm" />
            <span class="text-xs text-surface-500">sm (28px)</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-avatar name="Jane Doe" size="md" />
            <span class="text-xs text-surface-500">md (36px)</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-avatar name="Jane Doe" size="lg" />
            <span class="text-xs text-surface-500">lg (48px)</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-avatar name="Jane Doe" size="xl" />
            <span class="text-xs text-surface-500">xl (64px)</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-avatar name="Jane Doe" size="2xl" />
            <span class="text-xs text-surface-500">2xl (96px)</span>
          </div>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="sizesCode" />
    </section>

    <!-- Colors -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Colors</h2>
      <p class="mb-4 text-surface-600">
        Five color variants. The <code class="rounded bg-surface-100 px-1 py-0.5 text-xs">auto</code> variant
        deterministically picks a color based on the name.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-6">
          <div class="flex flex-col items-center gap-2">
            <com-avatar name="Auto Color" color="auto" />
            <span class="text-xs text-surface-500">auto</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-avatar name="Primary" color="primary" />
            <span class="text-xs text-surface-500">primary</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-avatar name="Accent" color="accent" />
            <span class="text-xs text-surface-500">accent</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-avatar name="Muted" color="muted" />
            <span class="text-xs text-surface-500">muted</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-avatar name="Warn" color="warn" />
            <span class="text-xs text-surface-500">warn</span>
          </div>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="colorsCode" />
    </section>

    <!-- Variants -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Variants</h2>
      <p class="mb-4 text-surface-600">
        Three visual styles: soft (subtle), filled (bold), and outline (stackable).
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-8">
          <div class="flex flex-col items-center gap-2">
            <com-avatar name="Soft" color="primary" variant="soft" />
            <span class="text-xs text-surface-500">soft (default)</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-avatar name="Filled" color="primary" variant="filled" />
            <span class="text-xs text-surface-500">filled</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-avatar name="Outline" color="primary" variant="outline" />
            <span class="text-xs text-surface-500">outline</span>
          </div>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="variantsCode" />
    </section>

    <!-- Shapes -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Shapes</h2>
      <p class="mb-4 text-surface-600">
        Circle for users, rounded for organizations or projects.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-8">
          <div class="flex flex-col items-center gap-2">
            <com-avatar name="Circle" color="primary" shape="circle" />
            <span class="text-xs text-surface-500">circle (default)</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-avatar name="Rounded" color="accent" shape="rounded" />
            <span class="text-xs text-surface-500">rounded</span>
          </div>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="shapesCode" />
    </section>

    <!-- Image with Fallback -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Image with Fallback</h2>
      <p class="mb-4 text-surface-600">
        When an image fails to load, the avatar falls back to initials or the default icon.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-6">
          <div class="flex flex-col items-center gap-2">
            <com-avatar src="https://i.pravatar.cc/150?img=5" name="Valid Image" />
            <span class="text-xs text-surface-500">Image loads</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-avatar src="https://invalid-url.example/photo.jpg" name="Jane Doe" />
            <span class="text-xs text-surface-500">Falls back to initials</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-avatar src="https://invalid-url.example/photo.jpg" />
            <span class="text-xs text-surface-500">Falls back to icon</span>
          </div>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="fallbackCode" />
    </section>

    <!-- Avatar Group -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Avatar Group</h2>
      <p class="mb-4 text-surface-600">
        Stack avatars with automatic overlap and ring separation. Use <code class="rounded bg-surface-100 px-1 py-0.5 text-xs">variant="outline"</code> for best results.
      </p>
      <com-card variant="outlined" class="bg-surface-800 p-8">
        <div class="flex flex-wrap items-center justify-center gap-12">
          <div class="flex flex-col items-center gap-3">
            <div comAvatarGroup size="sm">
              <com-avatar src="https://i.pravatar.cc/150?img=1" name="A" size="sm" variant="outline" />
              <com-avatar src="https://i.pravatar.cc/150?img=2" name="B" size="sm" variant="outline" />
              <com-avatar src="https://i.pravatar.cc/150?img=3" name="C" size="sm" variant="outline" />
            </div>
            <span class="text-xs text-surface-400">Small</span>
          </div>
          <div class="flex flex-col items-center gap-3">
            <div comAvatarGroup size="md">
              <com-avatar src="https://i.pravatar.cc/150?img=4" name="D" size="md" variant="outline" />
              <com-avatar src="https://i.pravatar.cc/150?img=5" name="E" size="md" variant="outline" />
              <com-avatar src="https://i.pravatar.cc/150?img=6" name="F" size="md" variant="outline" />
            </div>
            <span class="text-xs text-surface-400">Medium</span>
          </div>
          <div class="flex flex-col items-center gap-3">
            <div comAvatarGroup size="lg">
              <com-avatar src="https://i.pravatar.cc/150?img=7" name="G" size="lg" variant="outline" />
              <com-avatar src="https://i.pravatar.cc/150?img=8" name="H" size="lg" variant="outline" />
              <com-avatar src="https://i.pravatar.cc/150?img=9" name="I" size="lg" variant="outline" />
            </div>
            <span class="text-xs text-surface-400">Large</span>
          </div>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="groupCode" />
    </section>

    <!-- Avatar Group with Max -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Avatar Group with Overflow</h2>
      <p class="mb-4 text-surface-600">
        Limit visible avatars with the <code class="rounded bg-surface-100 px-1 py-0.5 text-xs">max</code> input to show a "+N" indicator.
      </p>
      <com-card variant="outlined" class="bg-surface-800 p-8">
        <div class="flex items-center justify-center">
          <div comAvatarGroup size="md" [max]="3">
            <com-avatar src="https://i.pravatar.cc/150?img=10" name="User 1" size="md" variant="outline" />
            <com-avatar src="https://i.pravatar.cc/150?img=11" name="User 2" size="md" variant="outline" />
            <com-avatar src="https://i.pravatar.cc/150?img=12" name="User 3" size="md" variant="outline" />
            <com-avatar src="https://i.pravatar.cc/150?img=13" name="User 4" size="md" variant="outline" />
            <com-avatar src="https://i.pravatar.cc/150?img=14" name="User 5" size="md" variant="outline" />
          </div>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="groupMaxCode" />
    </section>

    <!-- Custom Template -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Custom Template</h2>
      <p class="mb-4 text-surface-600">
        Use <code class="rounded bg-surface-100 px-1 py-0.5 text-xs">comAvatarCustom</code> directive for full control over avatar content.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-6">
          <div class="flex flex-col items-center gap-2">
            <com-avatar name="Bot" color="accent" variant="filled">
              <ng-template comAvatarCustom>
                <span class="text-lg">🤖</span>
              </ng-template>
            </com-avatar>
            <span class="text-xs text-surface-500">Emoji</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-avatar name="Star" color="warn" variant="filled">
              <ng-template comAvatarCustom>
                <span class="text-lg">⭐</span>
              </ng-template>
            </com-avatar>
            <span class="text-xs text-surface-500">Icon</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <com-avatar name="Acme" color="primary" variant="soft" size="lg">
              <ng-template comAvatarCustom>
                <span class="text-2xl font-bold">A</span>
              </ng-template>
            </com-avatar>
            <span class="text-xs text-surface-500">Custom text</span>
          </div>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="customCode" />
    </section>

    <!-- Inline with Text -->
    <section class="mb-12">
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Inline with Text</h2>
      <p class="mb-4 text-surface-600">
        Small sizes work well inline with text.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="space-y-4">
          <p class="flex items-center gap-2 text-surface-700">
            <com-avatar name="Jane Doe" size="xs" />
            <span>Jane Doe commented on your post</span>
          </p>
          <p class="flex items-center gap-2 text-surface-700">
            <com-avatar src="https://i.pravatar.cc/150?img=15" name="John Smith" size="sm" />
            <span>John Smith liked your photo</span>
          </p>
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="inlineCode" />
    </section>

    <!-- Interactive -->
    <section>
      <h2 class="mb-4 text-2xl font-semibold text-surface-900">Interactive</h2>
      <p class="mb-4 text-surface-600">
        Enable button behavior with hover and focus states for clickable avatars.
      </p>
      <com-card variant="outlined" class="p-8">
        <div class="flex items-center justify-center gap-6">
          <com-avatar
            src="https://i.pravatar.cc/150?img=16"
            name="Click me"
            [interactive]="true"
          />
          <com-avatar
            name="Hover me"
            color="accent"
            [interactive]="true"
          />
        </div>
      </com-card>
      <int-code-block class="mt-4" language="html" [code]="interactiveCode" />
    </section>
  `,
})
export class AvatarExamples {
  protected readonly sizesCode = `<com-avatar name="Jane Doe" size="xs" />
<com-avatar name="Jane Doe" size="sm" />
<com-avatar name="Jane Doe" size="md" />  <!-- default -->
<com-avatar name="Jane Doe" size="lg" />
<com-avatar name="Jane Doe" size="xl" />
<com-avatar name="Jane Doe" size="2xl" />`;

  protected readonly colorsCode = `<com-avatar name="Auto Color" color="auto" />  <!-- default -->
<com-avatar name="Primary" color="primary" />
<com-avatar name="Accent" color="accent" />
<com-avatar name="Muted" color="muted" />
<com-avatar name="Warn" color="warn" />`;

  protected readonly variantsCode = `<com-avatar name="Soft" variant="soft" />  <!-- default -->
<com-avatar name="Filled" variant="filled" />
<com-avatar name="Outline" variant="outline" />`;

  protected readonly shapesCode = `<com-avatar name="User" shape="circle" />  <!-- default -->
<com-avatar name="Org" shape="rounded" />`;

  protected readonly fallbackCode = `<!-- Image loads successfully -->
<com-avatar src="/photos/jane.jpg" name="Jane Doe" />

<!-- Image fails → falls back to initials -->
<com-avatar src="/invalid.jpg" name="Jane Doe" />

<!-- No image, no name → falls back to icon -->
<com-avatar />`;

  protected readonly groupCode = `<div comAvatarGroup size="md">
  <com-avatar src="/photos/a.jpg" name="Alice" variant="outline" />
  <com-avatar src="/photos/b.jpg" name="Bob" variant="outline" />
  <com-avatar src="/photos/c.jpg" name="Carol" variant="outline" />
</div>`;

  protected readonly groupMaxCode = `<!-- Shows 3 avatars + "+2" indicator -->
<div comAvatarGroup size="md" [max]="3">
  <com-avatar src="/photos/1.jpg" name="User 1" variant="outline" />
  <com-avatar src="/photos/2.jpg" name="User 2" variant="outline" />
  <com-avatar src="/photos/3.jpg" name="User 3" variant="outline" />
  <com-avatar src="/photos/4.jpg" name="User 4" variant="outline" />
  <com-avatar src="/photos/5.jpg" name="User 5" variant="outline" />
</div>`;

  protected readonly customCode = `<!-- Emoji avatar -->
<com-avatar name="Bot" color="accent" variant="filled">
  <ng-template comAvatarCustom>
    <span class="text-lg">🤖</span>
  </ng-template>
</com-avatar>

<!-- Custom text -->
<com-avatar name="Acme" color="primary" size="lg">
  <ng-template comAvatarCustom>
    <span class="text-2xl font-bold">A</span>
  </ng-template>
</com-avatar>`;

  protected readonly inlineCode = `<p class="flex items-center gap-2">
  <com-avatar name="Jane Doe" size="xs" />
  <span>Jane Doe commented on your post</span>
</p>`;

  protected readonly interactiveCode = `<com-avatar
  src="/photos/me.jpg"
  name="My Profile"
  [interactive]="true"
  (click)="openProfileMenu()"
/>`;
}
