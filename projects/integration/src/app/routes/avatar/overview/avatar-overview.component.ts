import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComAvatar, ComAvatarGroup } from 'ngx-com/components/avatar';
import { ComCard } from 'ngx-com/components/card';
import { ComItem } from 'ngx-com/components/item';
import { CodeBlock } from '../../../shared/code-block';

@Component({
  selector: 'int-avatar-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ComAvatar, ComAvatarGroup, ComCard, ComItem, CodeBlock],
  template: `
    <!-- Demo -->
    <section class="mb-12">
      <com-item
        title="Demo"
        description="Avatars with images, initials, and fallbacks"
        icon="play"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-8">
        <div class="flex flex-wrap items-center justify-center gap-6">
          <com-avatar src="https://i.pravatar.cc/150?img=1" name="Jane Doe" />
          <com-avatar name="John Smith" color="primary" />
          <com-avatar name="Alice Wang" color="accent" />
          <com-avatar name="Bob Wilson" color="warn" />
          <com-avatar />
        </div>
      </com-card>
    </section>

    <!-- Avatar Group Demo -->
    <section class="mb-12">
      <com-item
        title="Avatar Group"
        description="Stack multiple avatars with automatic overlap"
        icon="users"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="bg-muted p-8">
        <div class="flex items-center justify-center">
          <div comAvatarGroup size="md">
            <com-avatar src="https://i.pravatar.cc/150?img=1" name="Jane" variant="outline" />
            <com-avatar src="https://i.pravatar.cc/150?img=2" name="John" variant="outline" />
            <com-avatar src="https://i.pravatar.cc/150?img=3" name="Alice" variant="outline" />
            <com-avatar src="https://i.pravatar.cc/150?img=4" name="Bob" variant="outline" />
          </div>
        </div>
      </com-card>
    </section>

    <!-- Basic Usage -->
    <section class="mb-12">
      <com-item
        title="Basic Usage"
        description="Import and use the component in your templates"
        icon="code"
        size="lg"
        class="mb-4"
      />
      <int-code-block
        language="typescript"
        [code]="basicUsageCode"
      />
    </section>

    <!-- Features -->
    <section class="mb-12">
      <com-item
        title="Features"
        description="What makes com-avatar powerful"
        icon="star"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-3">
        <div class="space-y-1">
          <com-item
            title="Graceful Fallback Chain"
            description="Custom template → Image → Initials → Icon. Always displays something meaningful"
            icon="layers"
          />
          <com-item
            title="Auto Color"
            description="Deterministic color generation from names ensures the same person always gets the same color"
            icon="palette"
            iconColor="accent"
          />
          <com-item
            title="6 Sizes"
            description="From xs (20px) for badges to 2xl (96px) for profile headers. Perfect for any context"
            icon="maximize"
          />
          <com-item
            title="3 Variants"
            description="Soft (subtle), Filled (bold), and Outline (stackable). Choose the right emphasis"
            icon="box"
            iconColor="accent"
          />
          <com-item
            title="Avatar Groups"
            description="Stack avatars with automatic overlap, ring separation, and overflow indicators"
            icon="users"
          />
          <com-item
            title="Interactive Mode"
            description="Enable button behavior with hover effects for profile menus and clickable avatars"
            icon="mouse-pointer-click"
            iconColor="accent"
          />
        </div>
      </com-card>
    </section>

    <!-- Design Decisions -->
    <section>
      <com-item
        title="Design Decisions"
        description="Why com-avatar is built this way"
        icon="info"
        size="lg"
        class="mb-4"
      />
      <com-card variant="outlined" class="p-6">
        <ul class="list-inside list-disc space-y-2 text-foreground">
          <li>
            <strong>Image fade-in:</strong> Images load behind the fallback
            and fade in on load — no layout shift, no flash of empty space.
          </li>
          <li>
            <strong>Border-radius inheritance:</strong> The image inherits
            border-radius from the container, ensuring consistent clipping for circle and rounded shapes.
          </li>
          <li>
            <strong>Semantic tokens only:</strong> All colors use semantic
            tokens, ensuring proper appearance across all themes.
          </li>
          <li>
            <strong>Accessible by default:</strong> Proper ARIA attributes,
            screen reader text, and keyboard support for interactive mode.
          </li>
        </ul>
      </com-card>
    </section>
  `,
})
export class AvatarOverview {
  protected readonly basicUsageCode = `import { Component } from '@angular/core';
import { ComAvatar, ComAvatarGroup } from 'ngx-com/components/avatar';

@Component({
  selector: 'app-example',
  imports: [ComAvatar, ComAvatarGroup],
  template: \`
    <!-- Simple image avatar -->
    <com-avatar src="/photos/jane.jpg" name="Jane Doe" />

    <!-- Initials fallback (no image) -->
    <com-avatar name="Jane Doe" />

    <!-- Avatar group (stacked) -->
    <div comAvatarGroup>
      <com-avatar src="/photos/a.jpg" name="Alice" variant="outline" />
      <com-avatar src="/photos/b.jpg" name="Bob" variant="outline" />
      <com-avatar src="/photos/c.jpg" name="Carol" variant="outline" />
    </div>
  \`,
})
export class Example {}`;
}
