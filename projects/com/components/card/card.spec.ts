import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import {
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
} from './index';
import type {
  CardVariant,
  CardPadding,
  CardRadius,
  CardAlign,
  CardActionsDirection,
  CardMediaPosition,
  CardAccentColor,
  CardAccentPosition,
  CardBadgeColor,
  CardBadgePosition,
} from './card.variants';

describe('ComCard', () => {
  describe('Basic functionality', () => {
    @Component({
      selector: 'test-card-host',
      imports: [ComCard],
      template: `
        <com-card
          [variant]="variant()"
          [padding]="padding()"
          [radius]="radius()"
          [interactive]="interactive()"
          [class]="userClass()"
        >
          Content
        </com-card>
      `,
    })
    class TestCardHostComponent {
      readonly variant = signal<CardVariant>('elevated');
      readonly padding = signal<CardPadding>('none');
      readonly radius = signal<CardRadius>('lg');
      readonly interactive = signal(false);
      readonly userClass = signal('');
    }

    let fixture: ComponentFixture<TestCardHostComponent>;
    let host: TestCardHostComponent;
    let cardEl: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestCardHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestCardHostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
      cardEl = fixture.nativeElement.querySelector('com-card');
    });

    it('should create', () => {
      expect(cardEl).toBeTruthy();
    });

    it('should apply base classes', () => {
      expect(cardEl.classList.contains('relative')).toBe(true);
      expect(cardEl.classList.contains('flex')).toBe(true);
      expect(cardEl.classList.contains('flex-col')).toBe(true);
      expect(cardEl.classList.contains('overflow-hidden')).toBe(true);
    });

    it('should render projected content', () => {
      expect(cardEl.textContent?.trim()).toBe('Content');
    });

    describe('variants', () => {
      it('should apply elevated variant classes (default)', () => {
        expect(cardEl.classList.contains('bg-popover')).toBe(true);
        expect(cardEl.classList.contains('text-popover-foreground')).toBe(true);
        expect(cardEl.classList.contains('shadow-md')).toBe(true);
      });

      it('should apply outlined variant classes', () => {
        host.variant.set('outlined');
        fixture.detectChanges();

        expect(cardEl.classList.contains('bg-popover')).toBe(true);
        expect(cardEl.classList.contains('border')).toBe(true);
        expect(cardEl.classList.contains('border-border')).toBe(true);
      });

      it('should apply filled variant classes', () => {
        host.variant.set('filled');
        fixture.detectChanges();

        expect(cardEl.classList.contains('bg-muted')).toBe(true);
        expect(cardEl.classList.contains('text-foreground')).toBe(true);
      });

      it('should apply ghost variant classes', () => {
        host.variant.set('ghost');
        fixture.detectChanges();

        expect(cardEl.classList.contains('bg-transparent')).toBe(true);
        expect(cardEl.classList.contains('text-foreground')).toBe(true);
      });
    });

    describe('padding', () => {
      it('should apply no padding by default', () => {
        expect(cardEl.classList.contains('p-3')).toBe(false);
        expect(cardEl.classList.contains('p-5')).toBe(false);
        expect(cardEl.classList.contains('p-7')).toBe(false);
      });

      it('should apply sm padding', () => {
        host.padding.set('sm');
        fixture.detectChanges();

        expect(cardEl.classList.contains('p-3')).toBe(true);
      });

      it('should apply md padding', () => {
        host.padding.set('md');
        fixture.detectChanges();

        expect(cardEl.classList.contains('p-5')).toBe(true);
      });

      it('should apply lg padding', () => {
        host.padding.set('lg');
        fixture.detectChanges();

        expect(cardEl.classList.contains('p-7')).toBe(true);
      });
    });

    describe('radius', () => {
      it('should apply lg radius by default', () => {
        expect(cardEl.classList.contains('rounded-card')).toBe(true);
      });

      it('should apply none radius', () => {
        host.radius.set('none');
        fixture.detectChanges();

        expect(cardEl.classList.contains('rounded-none')).toBe(true);
      });

      it('should apply sm radius', () => {
        host.radius.set('sm');
        fixture.detectChanges();

        expect(cardEl.classList.contains('rounded-[var(--radius-sm)]')).toBe(true);
      });

      it('should apply md radius', () => {
        host.radius.set('md');
        fixture.detectChanges();

        expect(cardEl.classList.contains('rounded-[var(--radius-md)]')).toBe(true);
      });

      it('should apply xl radius', () => {
        host.radius.set('xl');
        fixture.detectChanges();

        expect(cardEl.classList.contains('rounded-[var(--radius-xl)]')).toBe(true);
      });
    });

    describe('interactive', () => {
      it('should not apply interactive classes by default', () => {
        expect(cardEl.classList.contains('cursor-pointer')).toBe(false);
      });

      it('should apply interactive classes when true', () => {
        host.interactive.set(true);
        fixture.detectChanges();

        expect(cardEl.classList.contains('cursor-pointer')).toBe(true);
      });

      it('should apply hover effects for elevated interactive card', () => {
        host.variant.set('elevated');
        host.interactive.set(true);
        fixture.detectChanges();

        expect(cardEl.classList.contains('hover:shadow-lg')).toBe(true);
      });

      it('should apply hover effects for outlined interactive card', () => {
        host.variant.set('outlined');
        host.interactive.set(true);
        fixture.detectChanges();

        expect(cardEl.classList.contains('hover:border-primary')).toBe(true);
      });

      it('should apply hover effects for filled interactive card', () => {
        host.variant.set('filled');
        host.interactive.set(true);
        fixture.detectChanges();

        expect(cardEl.classList.contains('hover:bg-muted-hover')).toBe(true);
      });

      it('should apply hover effects for ghost interactive card', () => {
        host.variant.set('ghost');
        host.interactive.set(true);
        fixture.detectChanges();

        expect(cardEl.classList.contains('hover:bg-muted')).toBe(true);
      });
    });

    describe('class merging', () => {
      it('should merge consumer classes', () => {
        host.userClass.set('my-custom-class');
        fixture.detectChanges();

        expect(cardEl.classList.contains('my-custom-class')).toBe(true);
        expect(cardEl.classList.contains('relative')).toBe(true);
      });
    });
  });
});

describe('ComCardHeader', () => {
  @Component({
    imports: [ComCard, ComCardHeader],
    template: `
      <com-card>
        <div comCardHeader data-testid="header">Header Content</div>
      </com-card>
    `,
  })
  class TestCardHeaderComponent {}

  let fixture: ComponentFixture<TestCardHeaderComponent>;
  let headerEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCardHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestCardHeaderComponent);
    fixture.detectChanges();
    headerEl = fixture.nativeElement.querySelector('[data-testid="header"]');
  });

  it('should apply header classes', () => {
    expect(headerEl.classList.contains('flex')).toBe(true);
    expect(headerEl.classList.contains('items-start')).toBe(true);
    expect(headerEl.classList.contains('justify-between')).toBe(true);
    expect(headerEl.classList.contains('gap-3')).toBe(true);
    expect(headerEl.classList.contains('px-5')).toBe(true);
    expect(headerEl.classList.contains('pt-5')).toBe(true);
    expect(headerEl.classList.contains('pb-0')).toBe(true);
  });
});

describe('ComCardTitle', () => {
  @Component({
    imports: [ComCard, ComCardHeader, ComCardTitle],
    template: `
      <com-card>
        <div comCardHeader>
          <h3 comCardTitle data-testid="title">Card Title</h3>
        </div>
      </com-card>
    `,
  })
  class TestCardTitleComponent {}

  let fixture: ComponentFixture<TestCardTitleComponent>;
  let titleEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCardTitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestCardTitleComponent);
    fixture.detectChanges();
    titleEl = fixture.nativeElement.querySelector('[data-testid="title"]');
  });

  it('should apply title classes', () => {
    expect(titleEl.classList.contains('font-heading')).toBe(true);
    expect(titleEl.classList.contains('text-lg')).toBe(true);
    expect(titleEl.classList.contains('font-semibold')).toBe(true);
    expect(titleEl.classList.contains('tracking-tight')).toBe(true);
    expect(titleEl.classList.contains('text-foreground')).toBe(true);
  });
});

describe('ComCardSubtitle', () => {
  @Component({
    imports: [ComCard, ComCardHeader, ComCardSubtitle],
    template: `
      <com-card>
        <div comCardHeader>
          <p comCardSubtitle data-testid="subtitle">Subtitle text</p>
        </div>
      </com-card>
    `,
  })
  class TestCardSubtitleComponent {}

  let fixture: ComponentFixture<TestCardSubtitleComponent>;
  let subtitleEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCardSubtitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestCardSubtitleComponent);
    fixture.detectChanges();
    subtitleEl = fixture.nativeElement.querySelector('[data-testid="subtitle"]');
  });

  it('should apply subtitle classes', () => {
    expect(subtitleEl.classList.contains('text-sm')).toBe(true);
    expect(subtitleEl.classList.contains('text-muted-foreground')).toBe(true);
  });
});

describe('ComCardContent', () => {
  @Component({
    imports: [ComCard, ComCardContent],
    template: `
      <com-card>
        <div comCardContent data-testid="content">Body content</div>
      </com-card>
    `,
  })
  class TestCardContentComponent {}

  let fixture: ComponentFixture<TestCardContentComponent>;
  let contentEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCardContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestCardContentComponent);
    fixture.detectChanges();
    contentEl = fixture.nativeElement.querySelector('[data-testid="content"]');
  });

  it('should apply content classes', () => {
    expect(contentEl.classList.contains('flex-1')).toBe(true);
    expect(contentEl.classList.contains('px-5')).toBe(true);
    expect(contentEl.classList.contains('py-4')).toBe(true);
    expect(contentEl.classList.contains('text-sm')).toBe(true);
  });
});

describe('ComCardFooter', () => {
  @Component({
    selector: 'test-card-footer-host',
    imports: [ComCard, ComCardFooter],
    template: `
      <com-card>
        <div comCardFooter [align]="align()" data-testid="footer">Footer</div>
      </com-card>
    `,
  })
  class TestCardFooterHostComponent {
    readonly align = signal<CardAlign>('end');
  }

  let fixture: ComponentFixture<TestCardFooterHostComponent>;
  let host: TestCardFooterHostComponent;
  let footerEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCardFooterHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestCardFooterHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    footerEl = fixture.nativeElement.querySelector('[data-testid="footer"]');
  });

  it('should apply footer base classes', () => {
    expect(footerEl.classList.contains('flex')).toBe(true);
    expect(footerEl.classList.contains('items-center')).toBe(true);
    expect(footerEl.classList.contains('gap-2')).toBe(true);
    expect(footerEl.classList.contains('px-5')).toBe(true);
    expect(footerEl.classList.contains('pb-5')).toBe(true);
  });

  it('should apply end alignment by default', () => {
    expect(footerEl.classList.contains('justify-end')).toBe(true);
  });

  it('should apply start alignment', () => {
    host.align.set('start');
    fixture.detectChanges();

    expect(footerEl.classList.contains('justify-start')).toBe(true);
  });

  it('should apply center alignment', () => {
    host.align.set('center');
    fixture.detectChanges();

    expect(footerEl.classList.contains('justify-center')).toBe(true);
  });

  it('should apply between alignment', () => {
    host.align.set('between');
    fixture.detectChanges();

    expect(footerEl.classList.contains('justify-between')).toBe(true);
  });
});

describe('ComCardActions', () => {
  @Component({
    selector: 'test-card-actions-host',
    imports: [ComCard, ComCardActions],
    template: `
      <com-card>
        <div comCardActions [align]="align()" [direction]="direction()" data-testid="actions">
          Actions
        </div>
      </com-card>
    `,
  })
  class TestCardActionsHostComponent {
    readonly align = signal<CardAlign>('end');
    readonly direction = signal<CardActionsDirection>('row');
  }

  let fixture: ComponentFixture<TestCardActionsHostComponent>;
  let host: TestCardActionsHostComponent;
  let actionsEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCardActionsHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestCardActionsHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    actionsEl = fixture.nativeElement.querySelector('[data-testid="actions"]');
  });

  it('should apply actions base classes', () => {
    expect(actionsEl.classList.contains('flex')).toBe(true);
    expect(actionsEl.classList.contains('gap-2')).toBe(true);
    expect(actionsEl.classList.contains('px-5')).toBe(true);
    expect(actionsEl.classList.contains('py-3')).toBe(true);
  });

  it('should apply row direction by default', () => {
    expect(actionsEl.classList.contains('flex-row')).toBe(true);
    expect(actionsEl.classList.contains('items-center')).toBe(true);
  });

  it('should apply column direction', () => {
    host.direction.set('column');
    fixture.detectChanges();

    expect(actionsEl.classList.contains('flex-col')).toBe(true);
    expect(actionsEl.classList.contains('items-stretch')).toBe(true);
  });

  it('should apply alignment', () => {
    host.align.set('start');
    fixture.detectChanges();

    expect(actionsEl.classList.contains('justify-start')).toBe(true);
  });
});

describe('ComCardMedia', () => {
  @Component({
    selector: 'test-card-media-host',
    imports: [ComCard, ComCardMedia],
    template: `
      <com-card>
        <img comCardMedia [position]="position()" src="/test.jpg" data-testid="media" />
      </com-card>
    `,
  })
  class TestCardMediaHostComponent {
    readonly position = signal<CardMediaPosition>('top');
  }

  let fixture: ComponentFixture<TestCardMediaHostComponent>;
  let host: TestCardMediaHostComponent;
  let mediaEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCardMediaHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestCardMediaHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    mediaEl = fixture.nativeElement.querySelector('[data-testid="media"]');
  });

  it('should apply media base classes', () => {
    expect(mediaEl.classList.contains('block')).toBe(true);
    expect(mediaEl.classList.contains('w-full')).toBe(true);
    expect(mediaEl.classList.contains('overflow-hidden')).toBe(true);
    expect(mediaEl.classList.contains('object-cover')).toBe(true);
  });

  it('should apply inset position classes', () => {
    host.position.set('inset');
    fixture.detectChanges();

    expect(mediaEl.classList.contains('mx-5')).toBe(true);
    expect(mediaEl.classList.contains('mt-5')).toBe(true);
    expect(mediaEl.classList.contains('rounded-media')).toBe(true);
  });
});

describe('ComCardDivider', () => {
  @Component({
    imports: [ComCard, ComCardDivider],
    template: `
      <com-card>
        <hr comCardDivider data-testid="divider" />
      </com-card>
    `,
  })
  class TestCardDividerComponent {}

  let fixture: ComponentFixture<TestCardDividerComponent>;
  let dividerEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCardDividerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestCardDividerComponent);
    fixture.detectChanges();
    dividerEl = fixture.nativeElement.querySelector('[data-testid="divider"]');
  });

  it('should apply divider classes', () => {
    expect(dividerEl.classList.contains('block')).toBe(true);
    expect(dividerEl.classList.contains('border-t')).toBe(true);
    expect(dividerEl.classList.contains('border-border')).toBe(true);
    expect(dividerEl.classList.contains('mx-5')).toBe(true);
  });
});

describe('ComCardAccent', () => {
  @Component({
    selector: 'test-card-accent-host',
    imports: [ComCard, ComCardAccent],
    template: `
      <com-card>
        <div comCardAccent [color]="color()" [position]="position()" data-testid="accent"></div>
      </com-card>
    `,
  })
  class TestCardAccentHostComponent {
    readonly color = signal<CardAccentColor>('primary');
    readonly position = signal<CardAccentPosition>('top');
  }

  let fixture: ComponentFixture<TestCardAccentHostComponent>;
  let host: TestCardAccentHostComponent;
  let accentEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCardAccentHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestCardAccentHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    accentEl = fixture.nativeElement.querySelector('[data-testid="accent"]');
  });

  it('should apply accent base classes', () => {
    expect(accentEl.classList.contains('block')).toBe(true);
    expect(accentEl.classList.contains('shrink-0')).toBe(true);
  });

  it('should apply primary color by default', () => {
    expect(accentEl.classList.contains('bg-primary')).toBe(true);
  });

  it('should apply top position by default', () => {
    expect(accentEl.classList.contains('h-1')).toBe(true);
    expect(accentEl.classList.contains('w-full')).toBe(true);
  });

  it('should apply accent color', () => {
    host.color.set('accent');
    fixture.detectChanges();

    expect(accentEl.classList.contains('bg-accent')).toBe(true);
  });

  it('should apply warn color', () => {
    host.color.set('warn');
    fixture.detectChanges();

    expect(accentEl.classList.contains('bg-warn')).toBe(true);
  });

  it('should apply success color', () => {
    host.color.set('success');
    fixture.detectChanges();

    expect(accentEl.classList.contains('bg-success')).toBe(true);
  });

  it('should apply muted color', () => {
    host.color.set('muted');
    fixture.detectChanges();

    expect(accentEl.classList.contains('bg-muted')).toBe(true);
  });

  it('should apply left position', () => {
    host.position.set('left');
    fixture.detectChanges();

    expect(accentEl.classList.contains('w-1')).toBe(true);
    expect(accentEl.classList.contains('h-full')).toBe(true);
    expect(accentEl.classList.contains('absolute')).toBe(true);
    expect(accentEl.classList.contains('left-0')).toBe(true);
    expect(accentEl.classList.contains('top-0')).toBe(true);
  });
});

describe('ComCardBadge', () => {
  @Component({
    selector: 'test-card-badge-host',
    imports: [ComCard, ComCardBadge],
    template: `
      <com-card>
        <span comCardBadge [color]="color()" [position]="position()" data-testid="badge">
          New
        </span>
      </com-card>
    `,
  })
  class TestCardBadgeHostComponent {
    readonly color = signal<CardBadgeColor>('primary');
    readonly position = signal<CardBadgePosition>('top-right');
  }

  let fixture: ComponentFixture<TestCardBadgeHostComponent>;
  let host: TestCardBadgeHostComponent;
  let badgeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCardBadgeHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestCardBadgeHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    badgeEl = fixture.nativeElement.querySelector('[data-testid="badge"]');
  });

  it('should apply badge base classes', () => {
    expect(badgeEl.classList.contains('absolute')).toBe(true);
    expect(badgeEl.classList.contains('z-10')).toBe(true);
    expect(badgeEl.classList.contains('inline-flex')).toBe(true);
    expect(badgeEl.classList.contains('items-center')).toBe(true);
    expect(badgeEl.classList.contains('rounded-pill')).toBe(true);
    expect(badgeEl.classList.contains('px-2.5')).toBe(true);
    expect(badgeEl.classList.contains('text-xs')).toBe(true);
    expect(badgeEl.classList.contains('font-semibold')).toBe(true);
  });

  it('should apply primary color by default', () => {
    expect(badgeEl.classList.contains('bg-primary')).toBe(true);
    expect(badgeEl.classList.contains('text-primary-foreground')).toBe(true);
  });

  it('should apply top-right position by default', () => {
    expect(badgeEl.classList.contains('top-3')).toBe(true);
    expect(badgeEl.classList.contains('right-3')).toBe(true);
  });

  it('should apply accent color', () => {
    host.color.set('accent');
    fixture.detectChanges();

    expect(badgeEl.classList.contains('bg-accent')).toBe(true);
    expect(badgeEl.classList.contains('text-accent-foreground')).toBe(true);
  });

  it('should apply warn color', () => {
    host.color.set('warn');
    fixture.detectChanges();

    expect(badgeEl.classList.contains('bg-warn')).toBe(true);
  });

  it('should apply top-left position', () => {
    host.position.set('top-left');
    fixture.detectChanges();

    expect(badgeEl.classList.contains('top-3')).toBe(true);
    expect(badgeEl.classList.contains('left-3')).toBe(true);
  });

  it('should apply bottom-left position', () => {
    host.position.set('bottom-left');
    fixture.detectChanges();

    expect(badgeEl.classList.contains('bottom-3')).toBe(true);
    expect(badgeEl.classList.contains('left-3')).toBe(true);
  });

  it('should apply bottom-right position', () => {
    host.position.set('bottom-right');
    fixture.detectChanges();

    expect(badgeEl.classList.contains('bottom-3')).toBe(true);
    expect(badgeEl.classList.contains('right-3')).toBe(true);
  });
});

describe('Card composition', () => {
  @Component({
    imports: [
      ComCard,
      ComCardHeader,
      ComCardTitle,
      ComCardSubtitle,
      ComCardContent,
      ComCardFooter,
      ComCardDivider,
    ],
    template: `
      <com-card data-testid="card">
        <div comCardHeader>
          <div>
            <h3 comCardTitle data-testid="title">Title</h3>
            <p comCardSubtitle data-testid="subtitle">Subtitle</p>
          </div>
        </div>
        <hr comCardDivider />
        <div comCardContent data-testid="content">Content</div>
        <div comCardFooter data-testid="footer">Footer</div>
      </com-card>
    `,
  })
  class FullCardComponent {}

  let fixture: ComponentFixture<FullCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FullCardComponent);
    fixture.detectChanges();
  });

  it('should render all card parts', () => {
    expect(fixture.nativeElement.querySelector('[data-testid="card"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-testid="title"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-testid="subtitle"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-testid="content"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-testid="footer"]')).toBeTruthy();
  });
});

describe('exportAs', () => {
  @Component({
    imports: [ComCard],
    template: `<com-card #card="comCard">Test</com-card>`,
  })
  class ExportAsTestComponent {}

  it('should export as comCard', async () => {
    await TestBed.configureTestingModule({
      imports: [ExportAsTestComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(ExportAsTestComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });
});
