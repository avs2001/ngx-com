# ngx-com Component Inventory

> LLM-optimized reference for the ngx-com Angular component library.
> **23 components** | Prefix: `com` | Import pattern: `ngx-com/components/<name>`

---

## Library Overview

- **Prefix:** `com` — all selectors use this prefix (`com-avatar`, `[comButton]`, `[comMenuTrigger]`)
- **Import pattern:** `import { X } from 'ngx-com/components/<component-name>'`
- **All components are standalone** (Angular v20+ default — do NOT set `standalone: true`)
- **All components use `ChangeDetectionStrategy.OnPush`** (directives inherit default)
- **State:** Signals (`input()`, `output()`, `model()`, `computed()`)
- **Styling:** Tailwind CSS + semantic design tokens (no hardcoded colors in library code)
- **Overlays:** CDK Overlay (`@angular/cdk/overlay`) for dropdowns, menus, popovers, tooltips, datepickers, confirm
- **Forms:** `NgControl` injection pattern (no `NG_VALUE_ACCESSOR` provider needed)
- **Icons:** Lucide icons via `lucide-angular` + `provideComIcons()` registration
- **Utilities:** `import { mergeClasses, debounce, throttle, deepClone, deepEqual, groupBy, chunk, partition, pick, omit } from 'ngx-com/utils'`

---

## Quick Reference Table

| # | Component | Selector | Import Path | Type | CVA | FormFieldControl |
|---|-----------|----------|-------------|------|-----|-----------------|
| 1 | Avatar | `com-avatar` | `ngx-com/components/avatar` | Component | - | - |
| 2 | Badge | `[comBadge]` | `ngx-com/components/badge` | Directive | - | - |
| 3 | Button | `button[comButton]`, `a[comButton]` | `ngx-com/components/button` | Directive | - | - |
| 4 | Calendar | `com-calendar` | `ngx-com/components/calendar` | Component | - | - |
| 5 | Card | `com-card` | `ngx-com/components/card` | Component | - | - |
| 6 | Checkbox | `com-checkbox` | `ngx-com/components/checkbox` | Component | Yes | - |
| 7 | Collapsible | `[comCollapsible]` | `ngx-com/components/collapsible` | Directive | - | - |
| 8 | Confirm | `[comConfirm]` | `ngx-com/components/confirm` | Directive | - | - |
| 9 | Datepicker | `com-datepicker` | `ngx-com/components/calendar` | Component | Yes | Yes |
| 10 | Dropdown | `com-dropdown` | `ngx-com/components/dropdown` | Component | Yes | Yes |
| 11 | Empty State | `com-empty-state` | `ngx-com/components/empty-state` | Component | - | - |
| 12 | Form Field | `com-form-field` | `ngx-com/components/form-field` | Component | - | - |
| 13 | Icon | `com-icon` | `ngx-com/components/icon` | Component | - | - |
| 14 | Item | `com-item` | `ngx-com/components/item` | Component | - | - |
| 15 | Menu | `com-menu` | `ngx-com/components/menu` | Component | - | - |
| 16 | Paginator | `com-paginator` | `ngx-com/components/paginator` | Component | - | - |
| 17 | Popover | `[comPopoverTrigger]` | `ngx-com/components/popover` | Directive | - | - |
| 18 | Radio | `com-radio-group` + `com-radio` | `ngx-com/components/radio` | Component | Yes | - |
| 19 | Segmented Control | `com-segmented-control` | `ngx-com/components/segmented-control` | Component | - | - |
| 20 | Sort | `[comSort]` + `[comSortHeader]` | `ngx-com/components/sort` | Directive | - | - |
| 21 | Spinner | `com-spinner` | `ngx-com/components/spinner` | Component | - | - |
| 22 | Tabs | `com-tab-group` + `com-tab` | `ngx-com/components/tabs` | Component | - | - |
| 23 | Tooltip | `[comTooltip]` | `ngx-com/components/tooltip` | Directive | - | - |

---

## Component Entries

---

### 1. Avatar

```typescript
import { ComAvatar, ComAvatarCustom, ComAvatarGroup } from 'ngx-com/components/avatar';
```

**Selector:** `com-avatar` | **exportAs:** `comAvatar`

#### Inputs

| Input | Type | Default | Notes |
|-------|------|---------|-------|
| `src` | `string \| undefined` | `undefined` | Image URL |
| `alt` | `string \| undefined` | `undefined` | Alt text |
| `name` | `string \| undefined` | `undefined` | Used for initials fallback |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | |
| `color` | `'primary' \| 'accent' \| 'muted' \| 'warn' \| 'auto'` | `'auto'` | `auto` = deterministic hash from name |
| `shape` | `'circle' \| 'rounded'` | `'circle'` | |
| `variant` | `'soft' \| 'filled' \| 'outline'` | `'soft'` | |
| `interactive` | `boolean` | `false` | Adds button role + hover states |

#### Outputs

| Output | Type |
|--------|------|
| `imageError` | `void` |
| `imageLoaded` | `void` |

#### Sub-components

- **`ComAvatarGroup`** — Selector: `[comAvatarGroup]`, exportAs: `comAvatarGroup`
  - Inputs: `size` (same values), `max: number | undefined`, `reverse: boolean`
- **`ComAvatarCustom`** — Selector: `ng-template[comAvatarCustom]` — custom content inside avatar

#### Usage

```html
<!-- Basic with image + name fallback -->
<com-avatar src="/photo.jpg" name="Jane Doe" size="lg" />

<!-- Initials only -->
<com-avatar name="Jane Doe" color="primary" variant="filled" shape="rounded" />

<!-- Avatar group with overflow -->
<div comAvatarGroup size="md" [max]="3">
  <com-avatar src="/user1.jpg" name="Alice" variant="outline" />
  <com-avatar src="/user2.jpg" name="Bob" variant="outline" />
  <com-avatar src="/user3.jpg" name="Carol" variant="outline" />
  <com-avatar src="/user4.jpg" name="Dave" variant="outline" />
</div>

<!-- Custom content -->
<com-avatar name="Bot" color="accent" variant="filled">
  <ng-template comAvatarCustom>
    <span class="text-lg">🤖</span>
  </ng-template>
</com-avatar>
```

---

### 2. Badge

```typescript
import { ComBadge } from 'ngx-com/components/badge';
```

**Selector:** `[comBadge]` | **exportAs:** `comBadge`

#### Inputs

| Input | Type | Default |
|-------|------|---------|
| `variant` | `'primary' \| 'accent' \| 'warn' \| 'success' \| 'muted' \| 'outline'` | `'primary'` |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` |
| `pill` | `boolean` | `false` |

#### Usage

```html
<span comBadge>Default</span>
<span comBadge variant="success" pill>Online</span>
<span comBadge variant="warn" size="sm">3</span>
<a href="#" comBadge variant="accent">Clickable</a>

<!-- With avatar inside -->
<span comBadge variant="muted" pill class="gap-1.5 pl-0.5">
  <com-avatar name="Jane" size="xs" />
  Jane Doe
</span>
```

---

### 3. Button

```typescript
import { ComButton } from 'ngx-com/components/button';
```

**Selector:** `button[comButton]`, `a[comButton]` | **exportAs:** `comButton`

#### Inputs

| Input | Type | Default |
|-------|------|---------|
| `variant` | `'solid' \| 'outline' \| 'ghost' \| 'link'` | `'solid'` |
| `color` | `'primary' \| 'accent' \| 'warn' \| 'muted'` | `'primary'` |
| `size` | `'sm' \| 'md' \| 'lg' \| 'icon'` | `'md'` |
| `fullWidth` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |

#### Usage

```html
<button comButton>Primary Solid</button>
<button comButton variant="outline" color="accent" size="sm">Small Outline</button>
<button comButton variant="ghost" color="warn">Ghost Warn</button>
<button comButton size="icon" aria-label="Settings">
  <com-icon name="settings" size="sm" />
</button>
<a comButton variant="link" href="/docs">Documentation</a>
<button comButton fullWidth>Full Width</button>

<!-- Loading pattern -->
<button comButton [disabled]="saving()">
  @if (saving()) { <com-spinner size="xs" /> }
  {{ saving() ? 'Saving...' : 'Save' }}
</button>
```

---

### 4. Calendar

```typescript
import {
  ComCalendar,
  provideNativeDateAdapter,
  provideRangeSelectionStrategy,
  provideMultiSelectionStrategy,
  provideWeekSelectionStrategy,
} from 'ngx-com/components/calendar';
```

**Selector:** `com-calendar` | **Required provider:** `provideNativeDateAdapter()`

#### Inputs

| Input | Type | Default |
|-------|------|---------|
| `selected` | `D \| DateRange<D> \| null` | `null` |
| `activeDate` | `D \| undefined` | `undefined` |
| `minDate` | `D \| null` | `null` |
| `maxDate` | `D \| null` | `null` |
| `dateFilter` | `(date: D) => boolean \| null` | `null` |
| `dateClass` | `(date: D) => string \| null` | `null` |
| `bordered` | `boolean` | `true` |
| `startView` | `'month' \| 'year' \| 'multi-year'` | `'month'` |
| `firstDayOfWeek` | `number \| null` | `null` |
| `monthColumns` | `1 \| 2` | `1` |
| `cellTemplate` | `TemplateRef<{$implicit: CalendarCell<D>}> \| null` | `null` |

#### Outputs

| Output | Type |
|--------|------|
| `selectedChange` | `D` |
| `viewChanged` | `CalendarView` |
| `activeDateChange` | `D` |

#### Usage

```typescript
// In component providers:
providers: [provideNativeDateAdapter()]
// For range selection, add in a wrapper component:
providers: [provideNativeDateAdapter(), provideRangeSelectionStrategy()]
```

```html
<!-- Single date -->
<com-calendar [selected]="selectedDate()" (selectedChange)="selectedDate.set($event)" />

<!-- With constraints -->
<com-calendar [selected]="date()" [minDate]="minDate" [maxDate]="maxDate"
  [dateFilter]="weekdaysOnly" (selectedChange)="date.set($event)" />

<!-- Start at year view -->
<com-calendar startView="year" [selected]="date()" (selectedChange)="date.set($event)" />
```

---

### 5. Card

```typescript
import {
  ComCard, ComCardHeader, ComCardTitle, ComCardSubtitle,
  ComCardContent, ComCardFooter, ComCardActions,
  ComCardMedia, ComCardDivider, ComCardAccent, ComCardBadge,
} from 'ngx-com/components/card';
```

**Selector:** `com-card` | **exportAs:** `comCard`

#### Inputs

| Input | Type | Default |
|-------|------|---------|
| `variant` | `'elevated' \| 'outlined' \| 'filled' \| 'ghost'` | `'elevated'` |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'none'` |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` |
| `interactive` | `boolean` | `false` |

#### Sub-directives

| Directive | Selector | Key Inputs |
|-----------|----------|------------|
| `ComCardHeader` | `[comCardHeader]` | — |
| `ComCardTitle` | `[comCardTitle]` | — |
| `ComCardSubtitle` | `[comCardSubtitle]` | — |
| `ComCardContent` | `[comCardContent]` | — |
| `ComCardFooter` | `[comCardFooter]` | `align: 'start' \| 'end' \| 'center' \| 'between'` |
| `ComCardActions` | `[comCardActions]` | `direction: 'row' \| 'column'`, `align` |
| `ComCardMedia` | `[comCardMedia]` | `position: 'top' \| 'bottom' \| 'inset'` |
| `ComCardDivider` | `[comCardDivider]` | — |
| `ComCardAccent` | `[comCardAccent]` | `color: 'primary' \| 'accent' \| 'warn' \| 'success' \| 'muted'`, `position: 'top' \| 'left'` |
| `ComCardBadge` | `[comCardBadge]` | `position: 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'`, `color` |

#### Usage

```html
<com-card variant="outlined">
  <div comCardAccent color="primary" position="left"></div>
  <span comCardBadge position="top-right" color="warn">NEW</span>
  <img comCardMedia position="top" src="/image.jpg" alt="Cover" />
  <div comCardHeader>
    <h3 comCardTitle>Card Title</h3>
    <p comCardSubtitle>Subtitle text</p>
  </div>
  <div comCardContent>Body content here.</div>
  <hr comCardDivider />
  <div comCardFooter align="between">
    <span>Info</span>
    <button comButton size="sm">Action</button>
  </div>
</com-card>
```

---

### 6. Checkbox

```typescript
import { ComCheckbox } from 'ngx-com/components/checkbox';
import type { CheckboxChange } from 'ngx-com/components/checkbox';
```

**Selector:** `com-checkbox` | **exportAs:** `comCheckbox` | **CVA:** Yes

#### Inputs

| Input | Type | Default |
|-------|------|---------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `variant` | `'primary' \| 'accent' \| 'warn'` | `'primary'` |
| `checked` | `boolean` (model) | `false` |
| `indeterminate` | `boolean` (model) | `false` |
| `disabled` | `boolean` (model) | `false` |
| `value` | `string \| undefined` | `undefined` |
| `name` | `string \| undefined` | `undefined` |

#### Outputs

| Output | Type |
|--------|------|
| `changed` | `CheckboxChange` |

#### Public Methods

- `focus()` — focuses the checkbox
- `toggle()` — toggles checked state

#### Usage

```html
<!-- Basic -->
<com-checkbox [(checked)]="isEnabled">Enable feature</com-checkbox>

<!-- Indeterminate (select-all pattern) -->
<com-checkbox [indeterminate]="someSelected()" [checked]="allSelected()"
  (changed)="toggleAll($event)">
  Select all
</com-checkbox>

<!-- Reactive forms -->
<form [formGroup]="form">
  <com-checkbox formControlName="terms">Accept terms</com-checkbox>
  <com-checkbox formControlName="newsletter">Subscribe to newsletter</com-checkbox>
</form>
```

```typescript
form = new FormGroup({
  terms: new FormControl(false, Validators.requiredTrue),
  newsletter: new FormControl(false),
});
```

---

### 7. Collapsible

```typescript
import {
  ComCollapsible, ComCollapsibleTrigger, ComCollapsibleContent,
  ComCollapsibleTriggerTpl, ComCollapsibleContentTpl,
  ComCollapsibleIconTpl, ComCollapsibleLazy,
} from 'ngx-com/components/collapsible';
```

**Selector:** `[comCollapsible]` | **exportAs:** `comCollapsible`

#### Inputs (ComCollapsible)

| Input | Type | Default |
|-------|------|---------|
| `open` | `boolean` (model) | `false` |
| `disabled` | `boolean` | `false` |
| `variant` | `'card' \| 'bordered' \| 'flush' \| 'ghost' \| 'unstyled'` | `'ghost'` |

#### Sub-components

- **`ComCollapsibleTrigger`** — `[comCollapsibleTrigger]`
  - Inputs: `variant: 'ghost' \| 'filled' \| 'header' \| 'unstyled'`, `size: 'sm' \| 'default' \| 'lg'`, `showIcon: boolean`
- **`ComCollapsibleContent`** — `com-collapsible-content`
  - Inputs: `duration: number` (animation ms, default 200)
- **Template directives:** `comCollapsibleTriggerTpl`, `comCollapsibleContentTpl`, `comCollapsibleIcon`, `comCollapsibleLazy`

#### Programmatic Control

```typescript
// Via exportAs
@ViewChild('section') section!: ComCollapsible;
// section.toggle(), section.expand(), section.collapse(), section.isOpen()
```

#### Usage

```html
<div comCollapsible variant="card" [(open)]="isOpen">
  <button comCollapsibleTrigger variant="filled" size="lg">Section Title</button>
  <com-collapsible-content>
    <div class="border-t p-4">Content here</div>
  </com-collapsible-content>
</div>

<!-- External control -->
<div comCollapsible #section="comCollapsible">
  <button comCollapsibleTrigger>Details</button>
  <com-collapsible-content>Content</com-collapsible-content>
</div>
<button (click)="section.toggle()">Toggle</button>

<!-- Lazy content -->
<div comCollapsible>
  <button comCollapsibleTrigger>Heavy Content</button>
  <com-collapsible-content>
    <ng-template comCollapsibleLazy>
      <app-heavy-component />
    </ng-template>
  </com-collapsible-content>
</div>

<!-- Custom icon -->
<div comCollapsible>
  <button comCollapsibleTrigger>
    Custom Icon
    <ng-template comCollapsibleIcon let-open="open">
      <com-icon [name]="open ? 'chevron-up' : 'chevron-down'" size="sm" />
    </ng-template>
  </button>
  <com-collapsible-content>Content</com-collapsible-content>
</div>
```

---

### 8. Confirm

```typescript
import { ComConfirm } from 'ngx-com/components/confirm';
```

**Selector:** `[comConfirm]` | **exportAs:** `comConfirm`

#### Inputs

| Input | Type | Default |
|-------|------|---------|
| `confirmMessage` | `string` | `'Are you sure?'` |
| `confirmTitle` | `string \| undefined` | `undefined` |
| `confirmLabel` | `string` | `'Confirm'` |
| `cancelLabel` | `string` | `'Cancel'` |
| `confirmColor` | `'primary' \| 'accent' \| 'warn' \| 'muted'` | `'primary'` |
| `confirmDisabled` | `boolean` | `false` |
| `confirmBackdrop` | `boolean` | `false` |
| `confirmTpl` | `TemplateRef<ConfirmTemplateContext> \| undefined` | `undefined` |

#### Outputs

| Output | Type | Notes |
|--------|------|-------|
| `comConfirm` | `boolean` | `true` = confirmed, `false` = cancelled |

#### Programmatic Control

- `open()` — opens the confirm dialog
- `close()` — closes it

#### Usage

```html
<!-- Basic destructive action -->
<button comButton color="warn"
  (comConfirm)="onDelete($event)"
  confirmTitle="Delete Item"
  confirmMessage="This action cannot be undone."
  confirmLabel="Delete Forever"
  confirmColor="warn">
  Delete
</button>

<!-- Custom template -->
<button (comConfirm)="onAction($event)" [confirmTpl]="customTpl">Action</button>
<ng-template #customTpl let-message let-confirm="confirm" let-cancel="cancel">
  <div class="p-4">
    <p>{{ message }}</p>
    <button comButton (click)="confirm()">Yes</button>
    <button comButton variant="ghost" (click)="cancel()">No</button>
  </div>
</ng-template>

<!-- Programmatic -->
<button #ref="comConfirm" (comConfirm)="handler($event)" confirmMessage="Sure?">Trigger</button>
<button (click)="ref.open()">Open Programmatically</button>
```

---

### 9. Datepicker

```typescript
import {
  ComDatepicker, ComDateRangePicker,
  provideNativeDateAdapter,
} from 'ngx-com/components/calendar';
import type { DateRangeValue } from 'ngx-com/components/calendar';
```

**Selector:** `com-datepicker` | **exportAs:** `comDatepicker` | **CVA:** Yes | **FormFieldControl:** Yes
**Required provider:** `provideNativeDateAdapter()`

#### Inputs (ComDatepicker)

| Input | Type | Default |
|-------|------|---------|
| `value` | `D \| null` | `null` |
| `min` | `D \| null` | `null` |
| `max` | `D \| null` | `null` |
| `dateFilter` | `(date: D) => boolean \| null` | `null` |
| `placeholder` | `string` | `'Select date...'` |
| `disabled` | `boolean` | `false` |
| `required` | `boolean` | `false` |
| `dateFormat` | `'short' \| 'medium' \| 'long' \| 'full'` | `'medium'` |
| `showClearButton` | `boolean` | `false` |
| `showTodayButton` | `boolean` | `false` |
| `variant` | `'default' \| 'outline' \| 'ghost' \| 'filled'` | `'default'` |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` |
| `state` | `'default' \| 'error' \| 'success'` | `'default'` |
| `startView` | `'month' \| 'year' \| 'multi-year'` | `'month'` |
| `keepOpen` | `boolean` | `false` |
| `allowManualInput` | `boolean` | `true` |
| `panelWidth` | `'auto' \| 'trigger' \| string` | `'auto'` |

#### Outputs

| Output | Type |
|--------|------|
| `dateChange` | `D \| null` |
| `opened` | `void` |
| `closed` | `void` |

#### Public Methods

- `open()`, `close()`, `toggle()`, `clear()`, `selectToday()`

#### Validation Errors

- `{ required: true }`, `{ minDate: { min, actual } }`, `{ maxDate: { max, actual } }`, `{ dateFilter: true }`

#### Usage

```typescript
// Component providers
providers: [provideNativeDateAdapter()]
```

```html
<!-- Reactive forms -->
<com-datepicker [formControl]="dateControl" placeholder="Select date..."
  [showClearButton]="true" [showTodayButton]="true" />

<!-- With constraints -->
<com-datepicker [formControl]="dateControl" [min]="minDate" [max]="maxDate" />

<!-- Range picker -->
<com-date-range-picker [formControl]="rangeControl"
  startPlaceholder="Start" endPlaceholder="End" [showClearButton]="true" />

<!-- Sizes and states -->
<com-datepicker size="sm" state="error" [disabled]="true" />
```

```typescript
dateControl = new FormControl<Date | null>(null);
rangeControl = new FormControl<DateRangeValue<Date> | null>(null);
```

---

### 10. Dropdown

```typescript
import { ComDropdown, ComDropdownOptionTpl } from 'ngx-com/components/dropdown';
```

**Selector:** `com-dropdown` | **exportAs:** `comDropdown` | **CVA:** Yes | **FormFieldControl:** Yes

#### Inputs

| Input | Type | Default |
|-------|------|---------|
| `options` | `T[]` | `[]` |
| `value` | `T \| T[] \| null` | `null` |
| `placeholder` | `string` | `'Select...'` |
| `multiple` | `boolean` | `false` |
| `searchable` | `boolean` | `false` |
| `searchPlaceholder` | `string` | `'Search...'` |
| `disabled` | `boolean` | `false` |
| `required` | `boolean` | `false` |
| `clearable` | `boolean` | `false` |
| `compareWith` | `(a: T, b: T) => boolean` | strict equality |
| `displayWith` | `(value: T) => string` | `String()` |
| `filterWith` | `(option: T, query: string) => boolean \| null` | `null` |
| `groupBy` | `(option: T) => string \| null` | `null` |
| `variant` | `'default' \| 'outline' \| 'ghost' \| 'filled' \| 'naked'` | `'default'` |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` |
| `state` | `'default' \| 'error' \| 'success'` | `'default'` |
| `maxHeight` | `string` | `'256px'` |
| `panelWidth` | `'trigger' \| 'auto' \| string` | `'trigger'` |
| `maxVisibleTags` | `number \| null` | `2` |
| `virtualScrollThreshold` | `number` | `50` |

#### Outputs

| Output | Type |
|--------|------|
| `valueChange` | `T \| T[] \| null` |
| `searchChange` | `string` |
| `opened` | `void` |
| `closed` | `void` |

#### Public Methods

- `open()`, `close()`, `toggle()`, `clear()`

#### Template Directives

| Directive | Selector | Context |
|-----------|----------|---------|
| `ComDropdownOptionTpl` | `ng-template[comDropdownOption]` | `$implicit: T`, `selected: boolean` |
| `ComDropdownSelectedTpl` | `ng-template[comDropdownSelected]` | `$implicit: T` |
| `ComDropdownEmptyTpl` | `ng-template[comDropdownEmpty]` | `$implicit: string` (search query) |
| `ComDropdownGroupTpl` | `ng-template[comDropdownGroup]` | `$implicit: string` (group name) |
| `ComDropdownTagTpl` | `ng-template[comDropdownTag]` | `$implicit: T` |

#### Usage

```html
<!-- Basic string options -->
<com-dropdown [options]="fruits()" [value]="selected()" placeholder="Pick a fruit"
  (valueChange)="selected.set($event)" />

<!-- Object options with display/compare -->
<com-dropdown [options]="users()" [value]="selectedUser()"
  [displayWith]="displayUser" [compareWith]="compareUsers"
  [searchable]="true" searchPlaceholder="Search users..."
  (valueChange)="selectedUser.set($event)" />

<!-- Multi-select with groups -->
<com-dropdown [options]="users()" [multiple]="true" [clearable]="true"
  [groupBy]="groupByDept" [maxVisibleTags]="3" />

<!-- Custom option template -->
<com-dropdown [options]="users()" [value]="selected()">
  <ng-template comDropdownOption let-user let-selected="selected">
    <div class="flex items-center gap-3">
      <com-avatar [name]="user.name" size="xs" />
      <span>{{ user.name }}</span>
    </div>
  </ng-template>
</com-dropdown>

<!-- Inside form-field (use variant="naked") -->
<com-form-field>
  <label comLabel>Category</label>
  <com-dropdown variant="naked" [options]="categories()" formControlName="category" />
  <span comHint>Choose a category</span>
  <span comError match="required">Required.</span>
</com-form-field>
```

---

### 11. Empty State

```typescript
import {
  ComEmptyState, ComEmptyStateIcon, ComEmptyStateTitle,
  ComEmptyStateDescription, ComEmptyStateActions,
} from 'ngx-com/components/empty-state';
```

**Selector:** `com-empty-state` | **exportAs:** `comEmptyState`

#### Inputs

| Input | Type | Default |
|-------|------|---------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `align` | `'start' \| 'center'` | `'center'` |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` |

#### Sub-directives (content projection, no inputs)

- `[comEmptyStateIcon]`, `[comEmptyStateTitle]`, `[comEmptyStateDescription]`, `[comEmptyStateActions]`

#### Usage

```html
<com-empty-state size="lg">
  <div comEmptyStateIcon>
    <com-icon name="inbox" size="2xl" />
  </div>
  <h2 comEmptyStateTitle>No messages</h2>
  <p comEmptyStateDescription>Your inbox is empty. New messages will appear here.</p>
  <div comEmptyStateActions>
    <button comButton variant="outline">Refresh</button>
    <button comButton>Compose</button>
  </div>
</com-empty-state>

<!-- Horizontal compact -->
<com-empty-state orientation="horizontal" align="start" size="sm">
  <div comEmptyStateIcon><com-icon name="bell-off" size="lg" /></div>
  <h4 comEmptyStateTitle>No notifications</h4>
  <p comEmptyStateDescription>You're all caught up!</p>
</com-empty-state>
```

---

### 12. Form Field

```typescript
import {
  ComFormField, ComInput, ComLabel, ComHint, ComError, ComPrefix, ComSuffix,
} from 'ngx-com/components/form-field';
```

**Selector:** `com-form-field` | **exportAs:** `comFormField`

#### Inputs (ComFormField)

| Input | Type | Default |
|-------|------|---------|
| `appearance` | `'fill' \| 'outline'` | `'outline'` |
| `color` | `'primary' \| 'accent' \| 'warn'` | `'primary'` |
| `floatLabel` | `'auto' \| 'always'` | `'auto'` |
| `hideRequiredMarker` | `boolean` | `false` |
| `subscriptSizing` | `'fixed' \| 'dynamic'` | `'fixed'` |

#### Sub-directives

| Directive | Selector | Key Inputs |
|-----------|----------|------------|
| `ComInput` | `input[comInput]`, `textarea[comInput]` | Provides `FormFieldControl` |
| `ComLabel` | `[comLabel]` | — (auto-wires `for` attribute) |
| `ComHint` | `[comHint]` | `align: 'start' \| 'end'` |
| `ComError` | `[comError]` | `match: string` (error key to show for) |
| `ComPrefix` | `[comPrefix]` | — |
| `ComSuffix` | `[comSuffix]` | — |

#### Usage

```html
<!-- Standard text input -->
<com-form-field appearance="outline" color="primary">
  <label comLabel>Email</label>
  <input comInput [formControl]="emailControl" type="email" />
  <span comHint>We'll never share your email.</span>
  <span comError match="required">Email is required.</span>
  <span comError match="email">Invalid email format.</span>
</com-form-field>

<!-- With prefix/suffix icons -->
<com-form-field>
  <com-icon comPrefix [img]="SearchIcon" size="sm" />
  <input comInput [formControl]="searchControl" placeholder="Search..." />
  <button comSuffix type="button" (click)="clearSearch($event)">
    <com-icon [img]="XIcon" size="sm" />
  </button>
</com-form-field>

<!-- Text prefix/suffix -->
<com-form-field>
  <label comLabel>Price</label>
  <span comPrefix>$</span>
  <input comInput type="number" />
  <span comSuffix>.00</span>
</com-form-field>

<!-- Textarea with character count -->
<com-form-field>
  <label comLabel>Bio</label>
  <textarea comInput rows="3" [formControl]="bioControl"></textarea>
  <span comHint>Tell us about yourself.</span>
  <span comHint align="end">{{ bioLength() }}/500</span>
  <span comError match="maxlength">Must be under 500 characters.</span>
</com-form-field>

<!-- Fill appearance -->
<com-form-field appearance="fill" color="accent">
  <label comLabel>Name</label>
  <input comInput formControlName="name" />
</com-form-field>
```

#### Form Field with Other Controls

Dropdown and Datepicker integrate as `FormFieldControl` providers:

```html
<!-- Dropdown inside form-field -->
<com-form-field>
  <label comLabel>Category</label>
  <com-dropdown variant="naked" [options]="categories()" formControlName="category" />
  <span comError match="required">Required.</span>
</com-form-field>
```

---

### 13. Icon

```typescript
import { ComIcon, provideComIcons } from 'ngx-com/components/icon';
```

**Selector:** `com-icon`
**Required provider:** `provideComIcons({ iconName: IconData, ... })` at app level for name-based lookup

#### Inputs

| Input | Type | Default |
|-------|------|---------|
| `name` | `string \| undefined` | `undefined` |
| `img` | `LucideIconData \| undefined` | `undefined` |
| `color` | `'current' \| 'primary' \| 'accent' \| 'warn' \| 'success' \| 'muted' \| 'disabled'` | `'current'` |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'lg'` |
| `strokeWidth` | `number` | `2` |
| `absoluteStrokeWidth` | `boolean` | `false` |
| `ariaLabel` | `string \| undefined` | `undefined` |

Size mapping: `xs=12px, sm=16px, md=20px, lg=24px, xl=32px, 2xl=40px`

#### Usage

```html
<!-- By registered name -->
<com-icon name="star" color="primary" size="lg" />

<!-- By direct import -->
<com-icon [img]="SearchIcon" size="sm" />

<!-- Accessible -->
<com-icon name="check-circle" color="success" ariaLabel="Success" />

<!-- Inside other components -->
<button comButton size="icon" aria-label="Search">
  <com-icon name="search" size="sm" />
</button>
```

```typescript
import { Search } from 'lucide-angular';
SearchIcon = Search;
```

---

### 14. Item

```typescript
import {
  ComItem, ComItemLeading, ComItemSuffix,
  ComItemDescription, ComItemTrailing,
} from 'ngx-com/components/item';
```

**Selector:** `com-item` | **exportAs:** `comItem`

#### Inputs

| Input | Type | Default |
|-------|------|---------|
| `title` | `string \| undefined` | `undefined` |
| `description` | `string \| undefined` | `undefined` |
| `icon` | `string \| undefined` | `undefined` |
| `iconColor` | `'primary' \| 'accent' \| 'muted' \| 'warn'` | `'primary'` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `density` | `'compact' \| 'default' \| 'comfortable'` | `'default'` |
| `interactive` | `boolean` | `false` |
| `active` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `truncate` | `boolean` | `true` |

#### Template Slots (ng-template directives)

- `comItemLeading` — replaces default icon/avatar
- `comItemTitle` — custom title content
- `comItemSuffix` — inline after title
- `comItemDescription` — custom description
- `comItemTrailing` — far-right content

#### Usage

```html
<!-- Simple with icon -->
<com-item title="Dashboard" icon="layout-dashboard" iconColor="primary"
  [interactive]="true" [active]="isActive" (click)="navigate()" />

<!-- With avatar leading -->
<com-item title="Jane Doe" description="jane@example.com">
  <ng-template comItemLeading>
    <com-avatar src="/jane.jpg" name="Jane Doe" size="sm" />
  </ng-template>
</com-item>

<!-- With suffix and trailing -->
<com-item title="API Endpoint" icon="server">
  <ng-template comItemSuffix>
    <span comBadge variant="success" size="sm">Online</span>
  </ng-template>
  <ng-template comItemTrailing>
    <com-icon name="chevron-right" size="sm" color="muted" />
  </ng-template>
</com-item>
```

---

### 15. Menu

```typescript
import {
  MenuTriggerDirective, MenuComponent, MenuItemDirective,
  MenuItemCheckboxComponent, MenuItemRadioComponent,
  MenuGroupDirective, MenuLabelDirective, MenuDividerDirective,
  MenuShortcutDirective, MenuSubIndicatorComponent,
} from 'ngx-com/components/menu';
```

**Trigger selector:** `[comMenuTrigger]` | **exportAs:** `comMenuTrigger`
**Menu selector:** `com-menu`

#### Trigger Inputs

| Input | Type | Default |
|-------|------|---------|
| `comMenuTrigger` | `TemplateRef<unknown>` | **required** |
| `menuPosition` | `'above' \| 'below'` | `'below'` |
| `menuAlignment` | `'start' \| 'end'` | `'start'` |
| `menuOffset` | `number` | `4` |
| `menuDisabled` | `boolean` | `false` |
| `menuOpen` | `boolean` (model) | `false` |
| `menuCloseOnSelect` | `boolean` | `true` |

#### Trigger Outputs

| Output | Type |
|--------|------|
| `menuOpened` | `void` |
| `menuClosed` | `void` |

#### Menu Inputs

| Input | Type | Default |
|-------|------|---------|
| `menuSize` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `menuVariant` | `'default' \| 'compact'` | `'default'` |

#### Menu Item Directives

| Directive | Selector | Key Inputs | Key Outputs |
|-----------|----------|------------|-------------|
| `MenuItemDirective` | `[comMenuItem]` | `menuItemDisabled`, `destructive` | `menuItemSelect` |
| `MenuItemCheckboxComponent` | `[comMenuItemCheckbox]` | `checked` (model), `menuItemDisabled` | — |
| `MenuItemRadioComponent` | `[comMenuItemRadio]` | `value`, `menuItemDisabled` | — |
| `MenuGroupDirective` | `[comMenuGroup]` | — | — |
| `MenuLabelDirective` | `[comMenuLabel]` | — | — |
| `MenuDividerDirective` | `[comMenuDivider]` | — | — |
| `MenuShortcutDirective` | `[comMenuShortcut]` | — | — |
| `MenuSubIndicatorComponent` | `com-menu-sub-indicator` | — | — |

#### Programmatic Control

- `open()`, `close()`, `toggle()` on `comMenuTrigger`

#### Usage

```html
<button comButton [comMenuTrigger]="fileMenu">File</button>
<ng-template #fileMenu>
  <com-menu [menuSize]="'md'">
    <span comMenuLabel>Actions</span>
    <button comMenuItem (menuItemSelect)="newFile()">
      New File <span comMenuShortcut>⌘N</span>
    </button>
    <button comMenuItem (menuItemSelect)="save()">
      Save <span comMenuShortcut>⌘S</span>
    </button>
    <hr comMenuDivider />
    <button comMenuItemCheckbox [(checked)]="showSidebar">Show Sidebar</button>
    <hr comMenuDivider />
    <span comMenuLabel>Sort By</span>
    <div comMenuGroup>
      <button comMenuItemRadio value="name">Name</button>
      <button comMenuItemRadio value="date">Date</button>
    </div>
    <hr comMenuDivider />
    <button comMenuItem [destructive]="true" (menuItemSelect)="delete()">Delete</button>
  </com-menu>
</ng-template>

<!-- Nested submenu -->
<button comMenuItem [comMenuTrigger]="shareMenu">
  Share <com-menu-sub-indicator />
</button>
<ng-template #shareMenu>
  <com-menu>
    <button comMenuItem>Copy Link</button>
    <button comMenuItem>Email</button>
  </com-menu>
</ng-template>
```

---

### 16. Paginator

```typescript
import { ComPaginator } from 'ngx-com/components/paginator';
import type { PageEvent, RangeLabelFn } from 'ngx-com/components/paginator';
```

**Selector:** `com-paginator` | **exportAs:** `comPaginator`

#### Inputs

| Input | Type | Default |
|-------|------|---------|
| `length` | `number` | `0` |
| `pageSize` | `number` | `10` |
| `pageIndex` | `number` | `0` |
| `pageSizeOptions` | `number[]` | `[]` |
| `showFirstLastButtons` | `boolean` | `false` |
| `showPageNumbers` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `hidePageSize` | `boolean` | `false` |
| `size` | `'sm' \| 'md'` | `'md'` |
| `layout` | `'compact' \| 'spread'` | `'compact'` |
| `siblingCount` | `number` | `1` |
| `boundaryCount` | `number` | `1` |
| `rangeLabel` | `RangeLabelFn` | `defaultRangeLabel` |

#### Outputs

| Output | Type |
|--------|------|
| `page` | `PageEvent` (`{ pageIndex, pageSize, length, previousPageIndex? }`) |

#### Public Methods

- `firstPage()`, `previousPage()`, `nextPage()`, `lastPage()`, `goToPage(index)`

#### Usage

```html
<!-- Basic -->
<com-paginator [length]="totalItems()" [pageSize]="pageSize()" [pageIndex]="pageIndex()"
  [pageSizeOptions]="[10, 25, 50, 100]" [showFirstLastButtons]="true"
  (page)="onPageChange($event)" />

<!-- Spread layout with page numbers -->
<com-paginator [length]="97" [pageSize]="10" [pageIndex]="page()"
  [showPageNumbers]="true" layout="spread"
  [rangeLabel]="showingResultsLabel" (page)="page.set($event.pageIndex)" />
```

```typescript
showingResultsLabel: RangeLabelFn = (page, pageSize, length) => {
  const start = page * pageSize + 1;
  const end = Math.min((page + 1) * pageSize, length);
  return `Showing ${start} to ${end} of ${length}`;
};
```

---

### 17. Popover

```typescript
import {
  PopoverTriggerDirective, PopoverCloseDirective,
  POPOVER_DATA, POPOVER_REF,
} from 'ngx-com/components/popover';
import type { PopoverRef } from 'ngx-com/components/popover';
```

**Selector:** `[comPopoverTrigger]` | **exportAs:** `comPopoverTrigger`

#### Inputs

| Input | Type | Default |
|-------|------|---------|
| `comPopoverTrigger` | `TemplateRef<unknown> \| Type<unknown>` | **required** |
| `popoverPosition` | `'auto' \| 'above' \| 'below' \| 'left' \| 'right'` | `'auto'` |
| `popoverAlignment` | `'start' \| 'center' \| 'end'` | `'center'` |
| `popoverTriggerOn` | `'click' \| 'focus'` | `'click'` |
| `popoverOffset` | `number` | `8` |
| `popoverShowArrow` | `boolean` | `true` |
| `popoverVariant` | `'default' \| 'compact' \| 'wide' \| 'flush'` | `'default'` |
| `popoverBackdrop` | `'transparent' \| 'dimmed' \| 'none'` | `'transparent'` |
| `popoverCloseOnOutside` | `boolean` | `true` |
| `popoverCloseOnEscape` | `boolean` | `true` |
| `popoverCloseOnScroll` | `boolean` | `false` |
| `popoverDisabled` | `boolean` | `false` |
| `popoverOpen` | `boolean` (model) | `false` |
| `popoverData` | `unknown` | `undefined` |
| `popoverTrapFocus` | `boolean` | `false` |

#### Outputs

| Output | Type |
|--------|------|
| `popoverOpened` | `void` |
| `popoverClosed` | `void` |

#### Public Methods

- `open()`, `close()`, `toggle()`, `reposition()`

#### Usage

```html
<!-- Template content -->
<button comButton [comPopoverTrigger]="popContent" popoverPosition="below"
  popoverAlignment="end" popoverVariant="wide">
  Options
</button>
<ng-template #popContent let-data let-close="close">
  <div class="p-4">
    <h4>Settings</h4>
    <p>Configure options here.</p>
    <button comButton (click)="close()">Done</button>
  </div>
</ng-template>

<!-- Component content with data injection -->
<button [comPopoverTrigger]="UserCardComponent" [popoverData]="userData">
  Show User
</button>

<!-- Focus trigger (for input helpers) -->
<input [comPopoverTrigger]="helpTpl" popoverTriggerOn="focus"
  popoverPosition="right" popoverVariant="compact" />
```

**Component content injection pattern:**

```typescript
@Component({ ... })
export class UserCardComponent {
  data = inject<{ name: string }>(POPOVER_DATA);
  popoverRef = inject<PopoverRef>(POPOVER_REF);
  close() { this.popoverRef.close(); }
}
```

---

### 18. Radio

```typescript
import { ComRadio, ComRadioGroup } from 'ngx-com/components/radio';
```

**Group selector:** `com-radio-group` | **exportAs:** `comRadioGroup` | **CVA:** Yes
**Radio selector:** `com-radio` | **exportAs:** `comRadio`

#### Radio Group Inputs

| Input | Type | Default |
|-------|------|---------|
| `name` | `string` | auto-generated |
| `value` | `string \| null` (model) | `null` |
| `disabled` | `boolean` (model) | `false` |
| `required` | `boolean` | `false` |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `variant` | `'primary' \| 'accent' \| 'warn'` | `'primary'` |
| `errorMessage` | `string` | `''` |

#### Radio Group Outputs

| Output | Type |
|--------|------|
| `selectionChange` | `RadioGroupChange` |

#### Radio Inputs

| Input | Type | Default |
|-------|------|---------|
| `value` | `string` | **required** |
| `disabled` | `boolean` (model) | `false` |

#### Usage

```html
<!-- Two-way binding -->
<com-radio-group [(value)]="selectedPlan" orientation="horizontal" size="md">
  <com-radio value="free">Free</com-radio>
  <com-radio value="pro">Pro</com-radio>
  <com-radio value="enterprise" [disabled]="true">Enterprise</com-radio>
</com-radio-group>

<!-- Reactive forms -->
<form [formGroup]="form">
  <com-radio-group formControlName="priority" aria-label="Priority"
    errorMessage="Please select a priority">
    <com-radio value="low">Low</com-radio>
    <com-radio value="medium">Medium</com-radio>
    <com-radio value="high">High</com-radio>
  </com-radio-group>
</form>
```

```typescript
form = new FormGroup({
  priority: new FormControl<string | null>(null, Validators.required),
});
```

---

### 19. Segmented Control

```typescript
import { ComSegmentedControl, ComSegmentDef } from 'ngx-com/components/segmented-control';
import type { SegmentOption } from 'ngx-com/components/segmented-control';
```

**Selector:** `com-segmented-control` | **exportAs:** `comSegmentedControl`

#### Inputs

| Input | Type | Default |
|-------|------|---------|
| `options` | `SegmentOption<T>[]` | **required** |
| `value` | `T \| undefined` (model) | `undefined` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `color` | `'primary' \| 'accent' \| 'muted'` | `'primary'` |
| `variant` | `'filled' \| 'outline'` | `'filled'` |
| `fullWidth` | `boolean` | `false` |

`SegmentOption<T> = { value: T; label: string; disabled?: boolean }`

#### Template Directive

- `ComSegmentDef<T>` — `ng-template[comSegmentDef]` — Context: `{ $implicit: option, active, disabled, index }`

#### Usage

```html
<!-- Basic -->
<com-segmented-control [options]="viewOptions" [(value)]="viewMode"
  size="sm" color="accent" variant="filled" />

<!-- Full width -->
<com-segmented-control [options]="periodOptions" [(value)]="period" [fullWidth]="true" />

<!-- Custom template with icons -->
<com-segmented-control [options]="viewOptions" [(value)]="viewMode" size="sm">
  <ng-template comSegmentDef let-option let-active="active">
    <com-icon [name]="option.value === 'grid' ? 'grid' : 'list'" size="sm" />
  </ng-template>
</com-segmented-control>

<!-- With count badges -->
<com-segmented-control [options]="statusOptions" [(value)]="status" color="accent">
  <ng-template comSegmentDef let-option let-active="active">
    <span>{{ option.label }}</span>
    <span [class]="active ? 'bg-accent-foreground/20' : 'bg-muted'" class="rounded-full px-2 text-xs">
      {{ getCounts(option.value) }}
    </span>
  </ng-template>
</com-segmented-control>
```

```typescript
viewOptions: SegmentOption<string>[] = [
  { value: 'grid', label: 'Grid' },
  { value: 'list', label: 'List' },
];
```

---

### 20. Sort

```typescript
import { SortDirective, SortHeaderComponent } from 'ngx-com/components/sort';
import type { SortDirection, SortEvent } from 'ngx-com/components/sort';
```

**Sort selector:** `[comSort]` | **exportAs:** `comSort`
**Header selector:** `[comSortHeader]`

#### Sort Directive Inputs

| Input | Type | Default |
|-------|------|---------|
| `sortActive` | `string \| undefined` (model) | `undefined` |
| `sortDirection` | `SortDirection` (model) | `undefined` |
| `sortDisabled` | `boolean` | `false` |
| `sortCycle` | `SortCycle` | `['asc', 'desc', undefined]` |
| `sortShowIndicator` | `boolean` | `false` |

`SortDirection = 'asc' | 'desc' | undefined`

#### Sort Directive Outputs

| Output | Type |
|--------|------|
| `sortChange` | `SortEvent` (`{ active: string, direction: SortDirection }`) |

#### Sort Header Inputs

| Input | Type | Default |
|-------|------|---------|
| `comSortHeader` (alias: `id`) | `string` | **required** |
| `sortHeaderDisabled` | `boolean` | `false` |
| `comSortHeaderArrowPosition` | `'before' \| 'after'` | `'after'` |

#### Programmatic Control

- `sort(id)` — triggers sort on column
- `getNextDirection(id)` — returns next direction without triggering

#### Usage

```html
<table>
  <thead>
    <tr comSort [(sortActive)]="sortColumn" [(sortDirection)]="sortDir"
      [sortCycle]="['asc', 'desc']" (sortChange)="onSort($event)">
      <th comSortHeader="name">Name</th>
      <th comSortHeader="email">Email</th>
      <th comSortHeader="date" comSortHeaderArrowPosition="before">Date</th>
      <th comSortHeader="id" [sortHeaderDisabled]="true">ID</th>
    </tr>
  </thead>
  <tbody>
    @for (row of sortedData(); track row.id) {
      <tr><td>{{ row.name }}</td><td>{{ row.email }}</td>...</tr>
    }
  </tbody>
</table>

<!-- Programmatic -->
<tr comSort #sorter="comSort">...</tr>
<button (click)="sorter.sort('date')">Sort by Date</button>
```

---

### 21. Spinner

```typescript
import { ComSpinner } from 'ngx-com/components/spinner';
```

**Selector:** `com-spinner` | **exportAs:** `comSpinner`

#### Inputs

| Input | Type | Default |
|-------|------|---------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| `color` | `'current' \| 'primary' \| 'accent' \| 'warn' \| 'success' \| 'muted'` | `'current'` |
| `label` | `string \| undefined` | `undefined` |
| `labelPosition` | `'right' \| 'bottom'` | `'right'` |

Host: `role="status"`

#### Usage

```html
<!-- Basic sizes -->
<com-spinner size="xs" />
<com-spinner size="lg" color="primary" />

<!-- With label -->
<com-spinner size="md" label="Loading content..." labelPosition="bottom" />

<!-- Inline in button -->
<button comButton [disabled]="saving()">
  @if (saving()) { <com-spinner size="xs" /> }
  {{ saving() ? 'Saving...' : 'Save' }}
</button>

<!-- Color inheritance -->
<div class="text-accent">
  <com-spinner size="sm" />  <!-- Inherits accent color -->
</div>
```

---

### 22. Tabs

```typescript
import {
  TabGroupComponent, TabComponent, TabLabelDirective, TabContentDirective,
  TabNavBarComponent, TabLinkDirective,
} from 'ngx-com/components/tabs';
```

**Group selector:** `com-tab-group` | **Tab selector:** `com-tab`
**Nav bar selector:** `com-tab-nav-bar` | **Nav link selector:** `[comTabLink]`

#### Tab Group Inputs

| Input | Type | Default |
|-------|------|---------|
| `variant` | `'underline' \| 'pill' \| 'outline' \| 'solid'` | `'underline'` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `color` | `'primary' \| 'accent' \| 'muted'` | `'primary'` |
| `alignment` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'start'` |
| `selectedIndex` | `number` (model) | `0` |
| `animationEnabled` | `boolean` | `true` |
| `preserveContent` | `boolean` | `false` |

#### Tab Group Outputs

| Output | Type |
|--------|------|
| `selectedTabChange` | `TabChangeEvent` |
| `focusChange` | `number` |

#### Tab Inputs

| Input | Type | Default |
|-------|------|---------|
| `label` | `string` | `''` |
| `disabled` | `boolean` | `false` |
| `closable` | `boolean` | `false` |

#### Tab Outputs

| Output | Type |
|--------|------|
| `closed` | `void` |

#### Template Directives

- `comTabLabel` — `ng-template[comTabLabel]` — rich tab header content
- `comTabContent` — `ng-template[comTabContent]` — lazy-loaded tab body

#### Usage

```html
<!-- Standard tabs -->
<com-tab-group variant="pill" color="primary" size="md">
  <com-tab label="Overview">Overview content</com-tab>
  <com-tab label="Settings">Settings content</com-tab>
  <com-tab label="Disabled" [disabled]="true">Hidden</com-tab>
</com-tab-group>

<!-- Closable tabs -->
<com-tab-group>
  @for (tab of tabs(); track tab.id) {
    <com-tab [label]="tab.name" [closable]="true" (closed)="removeTab(tab.id)">
      {{ tab.content }}
    </com-tab>
  }
</com-tab-group>

<!-- Rich label with badge -->
<com-tab>
  <ng-template comTabLabel>
    <com-icon name="bell" size="sm" />
    <span>Events</span>
    <span comBadge variant="accent" size="sm" pill>3</span>
  </ng-template>
  Events content
</com-tab>

<!-- Lazy content -->
<com-tab label="Analytics">
  <ng-template comTabContent>
    <app-analytics-dashboard />
  </ng-template>
</com-tab>

<!-- Nav tabs (router-driven) -->
<nav com-tab-nav-bar variant="underline" color="primary">
  <a comTabLink routerLink="overview" routerLinkActive #rla="routerLinkActive"
    [active]="rla.isActive">Overview</a>
  <a comTabLink routerLink="settings" routerLinkActive #rla2="routerLinkActive"
    [active]="rla2.isActive">Settings</a>
</nav>
```

---

### 23. Tooltip

```typescript
import { ComTooltip } from 'ngx-com/components/tooltip';
```

**Selector:** `[comTooltip]` | **exportAs:** `comTooltip`

#### Inputs

| Input | Type | Default |
|-------|------|---------|
| `comTooltip` | `string` | **required** |
| `comTooltipTpl` | `TemplateRef \| null` | `null` |
| `comTooltipPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` |
| `comTooltipColor` | `'default' \| 'primary' \| 'accent' \| 'warn' \| 'invert'` | `'default'` |
| `comTooltipSize` | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `comTooltipHasArrow` | `boolean` | `true` |
| `comTooltipShowDelay` | `number` | `200` |
| `comTooltipHideDelay` | `number` | `100` |
| `comTooltipDisabled` | `boolean` | `false` |

#### Outputs

| Output | Type |
|--------|------|
| `comTooltipShown` | `void` |
| `comTooltipHidden` | `void` |

#### Public Methods

- `show()`, `hide()`

#### Usage

```html
<!-- Basic -->
<button comTooltip="Save changes" comTooltipPosition="bottom">Save</button>

<!-- Styled -->
<button comTooltip="Warning!" comTooltipColor="warn" comTooltipSize="lg"
  [comTooltipHasArrow]="false">Hover me</button>

<!-- Rich template -->
<button comTooltip="Shortcuts" [comTooltipTpl]="shortcutsTpl" comTooltipSize="lg">
  Keyboard Shortcuts
</button>
<ng-template #shortcutsTpl>
  <div class="flex flex-col gap-1.5">
    <span class="font-semibold text-xs">Shortcuts</span>
    <div class="flex justify-between gap-4 text-xs">
      <span>Save</span><kbd>Ctrl+S</kbd>
    </div>
    <div class="flex justify-between gap-4 text-xs">
      <span>Undo</span><kbd>Ctrl+Z</kbd>
    </div>
  </div>
</ng-template>

<!-- Programmatic -->
<input #tip="comTooltip" comTooltip="Validation info" [comTooltipDisabled]="true" />
<button (click)="tip.show()">Show Tooltip</button>
```

---

## Cross-cutting Patterns

### Form Integration

Components implementing `ControlValueAccessor` (all use `NgControl` injection — no `NG_VALUE_ACCESSOR` provider needed):

| Component | Works with `formControlName` | Works with `[formControl]` | Works with `[(ngModel)]` |
|-----------|-----|-----|-----|
| `com-checkbox` | Yes | Yes | Yes |
| `com-radio-group` | Yes | Yes | Yes |
| `com-dropdown` | Yes | Yes | Yes |
| `com-datepicker` | Yes | Yes | Yes |
| `com-date-range-picker` | Yes | Yes | Yes |
| `input[comInput]` / `textarea[comInput]` | Native | Native | Native |

**FormFieldControl providers** (integrate with `com-form-field` for label floating, error display):
- `ComInput` — provides `FormFieldControl` automatically
- `ComDropdown` — provides `FormFieldControl` automatically (use `variant="naked"` inside form-field)

### Overlay Components

These components use CDK Overlay for floating panels:
- **Dropdown** — panel attached to trigger, configurable width/height
- **Menu** — positioned panel with keyboard navigation, supports nesting
- **Popover** — flexible panel with arrow, backdrop, focus trap
- **Tooltip** — lightweight overlay, auto-positioned
- **Datepicker** — calendar panel attached to input
- **Confirm** — globally centered dialog overlay

### Two-way Signal Binding

Components using `model()` support `[()]` syntax:

```html
<com-checkbox [(checked)]="isChecked" />
<com-collapsible [(open)]="isOpen" />
<com-radio-group [(value)]="selectedValue" />
<com-segmented-control [(value)]="activeSegment" />
<com-tab-group [(selectedIndex)]="activeTab" />
```

Menu and Popover also support two-way `open`:
```html
<button [comMenuTrigger]="ref" [(menuOpen)]="isMenuOpen">Menu</button>
<button [comPopoverTrigger]="ref" [(popoverOpen)]="isPopOpen">Pop</button>
```

### Template Customization

Many components support `ng-template` directives for custom rendering:

| Component | Template Directive | Context Variables |
|-----------|--------------------|-------------------|
| Avatar | `comAvatarCustom` | — |
| Collapsible | `comCollapsibleTriggerTpl` | `$implicit: open`, `disabled` |
| Collapsible | `comCollapsibleContentTpl` | `open` |
| Collapsible | `comCollapsibleIcon` | `open` |
| Collapsible | `comCollapsibleLazy` | — (lazy render) |
| Confirm | `confirmTpl` (input) | `$implicit: message`, `confirm`, `cancel` |
| Dropdown | `comDropdownOption` | `$implicit: T`, `selected` |
| Dropdown | `comDropdownSelected` | `$implicit: T` |
| Dropdown | `comDropdownEmpty` | `$implicit: string` |
| Dropdown | `comDropdownGroup` | `$implicit: string` |
| Dropdown | `comDropdownTag` | `$implicit: T` |
| Item | `comItemLeading/Title/Suffix/Description/Trailing` | — |
| Segmented Control | `comSegmentDef` | `$implicit: option`, `active`, `disabled`, `index` |
| Tabs | `comTabLabel` | — |
| Tabs | `comTabContent` | — (lazy) |
| Tooltip | `comTooltipTpl` (input) | — |

### Required Application Providers

| Provider | Required By |
|----------|-------------|
| `provideNativeDateAdapter()` | `ComCalendar`, `ComDatepicker`, `ComDateRangePicker` |
| `provideComIcons({ ... })` | `ComIcon` (for name-based lookup) |
| `provideRangeSelectionStrategy()` | `ComCalendar` (range mode only — scope to wrapper component) |
| `provideMultiSelectionStrategy()` | `ComCalendar` (multi mode) |
| `provideWeekSelectionStrategy()` | `ComCalendar` (week mode) |

### Theme Tokens

Library components use **semantic tokens only** (never scale tokens like `primary-500`).

**Key token pairs:**

| Background | Foreground | Hover |
|------------|------------|-------|
| `bg-primary` | `text-primary-foreground` | `hover:bg-primary-hover` |
| `bg-accent` | `text-accent-foreground` | `hover:bg-accent-hover` |
| `bg-warn` | `text-warn-foreground` | `hover:bg-warn-hover` |
| `bg-success` | `text-success-foreground` | `hover:bg-success-hover` |
| `bg-muted` | `text-muted-foreground` | `hover:bg-muted-hover` |
| `bg-popover` | `text-popover-foreground` | — |
| `bg-disabled` | `text-disabled-foreground` | — |

**Borders:** `border-border` (structural), `border-border-subtle` (light)
**Focus:** `ring-ring`
**Inputs:** `border-input-border`, `bg-input-background`, `text-input-foreground`, `placeholder:text-input-placeholder`

**Forbidden in library code:**
- Scale tokens (`bg-primary-500`)
- Hardcoded colors (`bg-blue-500`, `#hex`, `oklch()`)
- Opacity hover hacks (`hover:bg-primary/90`) — use `hover:bg-primary-hover`
- Opacity disabled (`opacity-50`) — use `bg-disabled text-disabled-foreground`
