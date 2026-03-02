import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SortDirective, SortHeaderComponent, type SortDirection, type SortEvent } from './index';

describe('Sort', () => {
  describe('Basic functionality', () => {
    @Component({
      template: `
        <div
          comSort
          [(sortActive)]="activeColumn"
          [(sortDirection)]="direction"
          (sortChange)="onSortChange($event)"
          data-testid="sort-container"
        >
          <div comSortHeader="name" data-testid="header-name">Name</div>
          <div comSortHeader="age" data-testid="header-age">Age</div>
          <div comSortHeader="email" data-testid="header-email">Email</div>
        </div>
      `,
      imports: [SortDirective, SortHeaderComponent],
    })
    class BasicSortComponent {
      activeColumn = signal<string | undefined>(undefined);
      direction = signal<SortDirection>(undefined);
      sortEvents: SortEvent[] = [];

      onSortChange(event: SortEvent): void {
        this.sortEvents.push(event);
      }
    }

    let fixture: ComponentFixture<BasicSortComponent>;
    let component: BasicSortComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BasicSortComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(BasicSortComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render all sort headers', () => {
      const headers = fixture.debugElement.queryAll(By.directive(SortHeaderComponent));
      expect(headers.length).toBe(3);
    });

    it('should start with no active sort', () => {
      expect(component.activeColumn()).toBeUndefined();
      expect(component.direction()).toBeUndefined();
    });

    it('should set ascending direction on first click', () => {
      const nameHeader = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      nameHeader.nativeElement.click();
      fixture.detectChanges();

      expect(component.activeColumn()).toBe('name');
      expect(component.direction()).toBe('asc');
    });

    it('should set descending direction on second click', () => {
      const nameHeader = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      nameHeader.nativeElement.click();
      fixture.detectChanges();
      nameHeader.nativeElement.click();
      fixture.detectChanges();

      expect(component.activeColumn()).toBe('name');
      expect(component.direction()).toBe('desc');
    });

    it('should clear sort on third click (default cycle)', () => {
      const nameHeader = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      nameHeader.nativeElement.click();
      fixture.detectChanges();
      nameHeader.nativeElement.click();
      fixture.detectChanges();
      nameHeader.nativeElement.click();
      fixture.detectChanges();

      expect(component.activeColumn()).toBeUndefined();
      expect(component.direction()).toBeUndefined();
    });

    it('should switch to new column with ascending direction', () => {
      const nameHeader = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      const ageHeader = fixture.debugElement.query(By.css('[data-testid="header-age"]'));

      nameHeader.nativeElement.click();
      fixture.detectChanges();

      expect(component.activeColumn()).toBe('name');

      ageHeader.nativeElement.click();
      fixture.detectChanges();

      expect(component.activeColumn()).toBe('age');
      expect(component.direction()).toBe('asc');
    });

    it('should emit sortChange event', () => {
      const nameHeader = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      nameHeader.nativeElement.click();
      fixture.detectChanges();

      expect(component.sortEvents.length).toBe(1);
      expect(component.sortEvents[0]).toEqual({
        active: 'name',
        direction: 'asc',
      });
    });

    it('should emit sortChange event for full cycle', () => {
      const nameHeader = fixture.debugElement.query(By.css('[data-testid="header-name"]'));

      nameHeader.nativeElement.click();
      fixture.detectChanges();
      nameHeader.nativeElement.click();
      fixture.detectChanges();
      nameHeader.nativeElement.click();
      fixture.detectChanges();

      expect(component.sortEvents.length).toBe(3);
      expect(component.sortEvents[0]).toEqual({ active: 'name', direction: 'asc' });
      expect(component.sortEvents[1]).toEqual({ active: 'name', direction: 'desc' });
      expect(component.sortEvents[2]).toEqual({ active: undefined, direction: undefined });
    });
  });

  describe('Accessibility', () => {
    @Component({
      template: `
        <div comSort [(sortActive)]="activeColumn" [(sortDirection)]="direction">
          <div comSortHeader="name" data-testid="header-name">Name</div>
          <div comSortHeader="age" data-testid="header-age">Age</div>
        </div>
      `,
      imports: [SortDirective, SortHeaderComponent],
    })
    class AccessibilitySortComponent {
      activeColumn = signal<string | undefined>(undefined);
      direction = signal<SortDirection>(undefined);
    }

    let fixture: ComponentFixture<AccessibilitySortComponent>;
    let component: AccessibilitySortComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [AccessibilitySortComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(AccessibilitySortComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have role="columnheader" on sort headers', () => {
      const header = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      expect(header.attributes['role']).toBe('columnheader');
    });

    it('should have aria-sort="none" when not sorted', () => {
      const header = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      expect(header.attributes['aria-sort']).toBe('none');
    });

    it('should have aria-sort="ascending" when sorted ascending', () => {
      const header = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      header.nativeElement.click();
      fixture.detectChanges();

      expect(header.attributes['aria-sort']).toBe('ascending');
    });

    it('should have aria-sort="descending" when sorted descending', () => {
      const header = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      header.nativeElement.click();
      fixture.detectChanges();
      header.nativeElement.click();
      fixture.detectChanges();

      expect(header.attributes['aria-sort']).toBe('descending');
    });

    it('should have tabindex="0" when sortable', () => {
      const header = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      expect(header.attributes['tabindex']).toBe('0');
    });

    it('should toggle via Enter key', () => {
      const header = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      header.triggerEventHandler('keydown.enter', {});
      fixture.detectChanges();

      expect(component.activeColumn()).toBe('name');
      expect(component.direction()).toBe('asc');
    });

    it('should toggle via Space key', () => {
      const header = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      header.triggerEventHandler('keydown.space', { preventDefault: () => {} });
      fixture.detectChanges();

      expect(component.activeColumn()).toBe('name');
      expect(component.direction()).toBe('asc');
    });

    it('should update aria-sort on inactive header to none', () => {
      const nameHeader = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      const ageHeader = fixture.debugElement.query(By.css('[data-testid="header-age"]'));

      nameHeader.nativeElement.click();
      fixture.detectChanges();

      // Now click age header
      ageHeader.nativeElement.click();
      fixture.detectChanges();

      expect(nameHeader.attributes['aria-sort']).toBe('none');
      expect(ageHeader.attributes['aria-sort']).toBe('ascending');
    });
  });

  describe('Disabled state', () => {
    @Component({
      template: `
        <div comSort [sortDisabled]="sortDisabled()" [(sortActive)]="activeColumn">
          <div comSortHeader="name" data-testid="header-name">Name</div>
          <div comSortHeader="age" [sortHeaderDisabled]="headerDisabled()" data-testid="header-age">
            Age
          </div>
        </div>
      `,
      imports: [SortDirective, SortHeaderComponent],
    })
    class DisabledSortComponent {
      sortDisabled = signal(false);
      headerDisabled = signal(false);
      activeColumn = signal<string | undefined>(undefined);
    }

    let fixture: ComponentFixture<DisabledSortComponent>;
    let component: DisabledSortComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DisabledSortComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(DisabledSortComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should prevent sorting when parent is disabled', () => {
      component.sortDisabled.set(true);
      fixture.detectChanges();

      const header = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      header.nativeElement.click();
      fixture.detectChanges();

      expect(component.activeColumn()).toBeUndefined();
    });

    it('should have tabindex="-1" when parent is disabled', () => {
      component.sortDisabled.set(true);
      fixture.detectChanges();

      const header = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      expect(header.attributes['tabindex']).toBe('-1');
    });

    it('should have aria-disabled when parent is disabled', () => {
      component.sortDisabled.set(true);
      fixture.detectChanges();

      const header = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      expect(header.attributes['aria-disabled']).toBe('true');
    });

    it('should prevent sorting on individual disabled header', () => {
      component.headerDisabled.set(true);
      fixture.detectChanges();

      const ageHeader = fixture.debugElement.query(By.css('[data-testid="header-age"]'));
      ageHeader.nativeElement.click();
      fixture.detectChanges();

      expect(component.activeColumn()).toBeUndefined();
    });

    it('should allow sorting on enabled header when another is disabled', () => {
      component.headerDisabled.set(true);
      fixture.detectChanges();

      const nameHeader = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      nameHeader.nativeElement.click();
      fixture.detectChanges();

      expect(component.activeColumn()).toBe('name');
    });

    it('should have tabindex="-1" on individual disabled header', () => {
      component.headerDisabled.set(true);
      fixture.detectChanges();

      const ageHeader = fixture.debugElement.query(By.css('[data-testid="header-age"]'));
      expect(ageHeader.attributes['tabindex']).toBe('-1');
    });

    it('should apply disabled styling classes', () => {
      component.headerDisabled.set(true);
      fixture.detectChanges();

      const ageHeader = fixture.debugElement.query(By.css('[data-testid="header-age"]'));
      expect(ageHeader.nativeElement.classList.contains('text-disabled-foreground')).toBe(true);
      expect(ageHeader.nativeElement.classList.contains('cursor-not-allowed')).toBe(true);
    });
  });

  describe('Custom sort cycle', () => {
    @Component({
      template: `
        <div
          comSort
          [sortCycle]="sortCycle()"
          [(sortActive)]="activeColumn"
          [(sortDirection)]="direction"
        >
          <div comSortHeader="name" data-testid="header-name">Name</div>
        </div>
      `,
      imports: [SortDirective, SortHeaderComponent],
    })
    class CustomCycleSortComponent {
      sortCycle = signal<SortDirection[]>(['asc', 'desc']);
      activeColumn = signal<string | undefined>(undefined);
      direction = signal<SortDirection>(undefined);
    }

    let fixture: ComponentFixture<CustomCycleSortComponent>;
    let component: CustomCycleSortComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [CustomCycleSortComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(CustomCycleSortComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should use custom two-way cycle (asc -> desc -> asc)', () => {
      const header = fixture.debugElement.query(By.css('[data-testid="header-name"]'));

      header.nativeElement.click();
      fixture.detectChanges();
      expect(component.direction()).toBe('asc');

      header.nativeElement.click();
      fixture.detectChanges();
      expect(component.direction()).toBe('desc');

      header.nativeElement.click();
      fixture.detectChanges();
      expect(component.direction()).toBe('asc');
    });

    it('should handle desc-only cycle', () => {
      component.sortCycle.set(['desc']);
      fixture.detectChanges();

      const header = fixture.debugElement.query(By.css('[data-testid="header-name"]'));

      header.nativeElement.click();
      fixture.detectChanges();
      expect(component.direction()).toBe('desc');

      header.nativeElement.click();
      fixture.detectChanges();
      expect(component.direction()).toBe('desc');
    });

    it('should handle desc-first cycle', () => {
      component.sortCycle.set(['desc', 'asc', undefined]);
      fixture.detectChanges();

      const header = fixture.debugElement.query(By.css('[data-testid="header-name"]'));

      header.nativeElement.click();
      fixture.detectChanges();
      expect(component.direction()).toBe('desc');

      header.nativeElement.click();
      fixture.detectChanges();
      expect(component.direction()).toBe('asc');

      header.nativeElement.click();
      fixture.detectChanges();
      expect(component.direction()).toBeUndefined();
    });
  });

  describe('Show indicator', () => {
    @Component({
      template: `
        <div comSort [sortShowIndicator]="showIndicator()" [(sortActive)]="activeColumn">
          <div comSortHeader="name" data-testid="header-name">Name</div>
          <div
            comSortHeader="age"
            [sortHeaderShowIndicator]="headerShowIndicator()"
            data-testid="header-age"
          >
            Age
          </div>
        </div>
      `,
      imports: [SortDirective, SortHeaderComponent],
    })
    class ShowIndicatorSortComponent {
      showIndicator = signal(false);
      headerShowIndicator = signal<boolean | undefined>(undefined);
      activeColumn = signal<string | undefined>(undefined);
    }

    let fixture: ComponentFixture<ShowIndicatorSortComponent>;
    let component: ShowIndicatorSortComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ShowIndicatorSortComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ShowIndicatorSortComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should hide icon by default when not sorted', () => {
      const header = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      const icon = header.query(By.css('com-sort-icon span'));

      expect(icon.nativeElement.classList.contains('opacity-0')).toBe(true);
    });

    it('should show muted icon when sortShowIndicator is true', () => {
      component.showIndicator.set(true);
      fixture.detectChanges();

      const header = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      const icon = header.query(By.css('com-sort-icon span'));

      expect(icon.nativeElement.classList.contains('opacity-40')).toBe(true);
    });

    it('should override parent setting with header-level sortHeaderShowIndicator', () => {
      component.showIndicator.set(false);
      component.headerShowIndicator.set(true);
      fixture.detectChanges();

      const nameHeader = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      const ageHeader = fixture.debugElement.query(By.css('[data-testid="header-age"]'));

      const nameIcon = nameHeader.query(By.css('com-sort-icon span'));
      const ageIcon = ageHeader.query(By.css('com-sort-icon span'));

      expect(nameIcon.nativeElement.classList.contains('opacity-0')).toBe(true);
      expect(ageIcon.nativeElement.classList.contains('opacity-40')).toBe(true);
    });

    it('should show full opacity icon when sorted', () => {
      const header = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      header.nativeElement.click();
      fixture.detectChanges();

      const icon = header.query(By.css('com-sort-icon span'));
      expect(icon.nativeElement.classList.contains('opacity-100')).toBe(true);
    });
  });

  describe('Arrow position', () => {
    @Component({
      template: `
        <div comSort [(sortActive)]="activeColumn">
          <div comSortHeader="name" data-testid="header-name">Name</div>
          <div
            comSortHeader="age"
            comSortHeaderArrowPosition="before"
            data-testid="header-age"
          >
            Age
          </div>
        </div>
      `,
      imports: [SortDirective, SortHeaderComponent],
    })
    class ArrowPositionSortComponent {
      activeColumn = signal<string | undefined>(undefined);
    }

    let fixture: ComponentFixture<ArrowPositionSortComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ArrowPositionSortComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ArrowPositionSortComponent);
      fixture.detectChanges();
    });

    it('should render icon after content by default', () => {
      const header = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      const children = header.nativeElement.childNodes;

      // Text content should come before icon
      let foundText = false;
      let foundIcon = false;
      for (const child of children) {
        if (child.textContent?.trim() === 'Name') {
          foundText = true;
        }
        if (child.tagName === 'COM-SORT-ICON') {
          expect(foundText).toBe(true); // Icon should come after text
          foundIcon = true;
        }
      }
      expect(foundIcon).toBe(true);
    });

    it('should render icon before content when position is "before"', () => {
      const header = fixture.debugElement.query(By.css('[data-testid="header-age"]'));
      const children = header.nativeElement.childNodes;

      // Icon should come before text content
      let foundText = false;
      let foundIcon = false;
      for (const child of children) {
        if (child.tagName === 'COM-SORT-ICON') {
          expect(foundText).toBe(false); // Icon should come before text
          foundIcon = true;
        }
        if (child.textContent?.trim() === 'Age') {
          foundText = true;
        }
      }
      expect(foundIcon).toBe(true);
    });
  });

  describe('Icon direction', () => {
    @Component({
      template: `
        <div comSort [sortShowIndicator]="true" [(sortActive)]="activeColumn" [(sortDirection)]="direction">
          <div comSortHeader="name" data-testid="header-name">Name</div>
        </div>
      `,
      imports: [SortDirective, SortHeaderComponent],
    })
    class IconDirectionSortComponent {
      activeColumn = signal<string | undefined>(undefined);
      direction = signal<SortDirection>(undefined);
    }

    let fixture: ComponentFixture<IconDirectionSortComponent>;
    let component: IconDirectionSortComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [IconDirectionSortComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(IconDirectionSortComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have unsorted state when not sorted', () => {
      const header = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      const icon = header.query(By.css('com-sort-icon span'));

      expect(icon.nativeElement.classList.contains('opacity-40')).toBe(true);
      expect(icon.nativeElement.classList.contains('rotate-0')).toBe(true);
    });

    it('should have asc state (rotate-0) when sorted ascending', () => {
      const header = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      header.nativeElement.click();
      fixture.detectChanges();

      const icon = header.query(By.css('com-sort-icon span'));
      expect(icon.nativeElement.classList.contains('opacity-100')).toBe(true);
      expect(icon.nativeElement.classList.contains('rotate-0')).toBe(true);
    });

    it('should have desc state (rotate-180) when sorted descending', () => {
      const header = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      header.nativeElement.click();
      fixture.detectChanges();
      header.nativeElement.click();
      fixture.detectChanges();

      const icon = header.query(By.css('com-sort-icon span'));
      expect(icon.nativeElement.classList.contains('opacity-100')).toBe(true);
      expect(icon.nativeElement.classList.contains('rotate-180')).toBe(true);
    });
  });

  describe('Two-way binding', () => {
    @Component({
      template: `
        <div comSort [(sortActive)]="activeColumn" [(sortDirection)]="direction">
          <div comSortHeader="name" data-testid="header-name">Name</div>
          <div comSortHeader="age" data-testid="header-age">Age</div>
        </div>
      `,
      imports: [SortDirective, SortHeaderComponent],
    })
    class TwoWayBindingSortComponent {
      activeColumn = signal<string | undefined>(undefined);
      direction = signal<SortDirection>(undefined);
    }

    let fixture: ComponentFixture<TwoWayBindingSortComponent>;
    let component: TwoWayBindingSortComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TwoWayBindingSortComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TwoWayBindingSortComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should update view when model changes programmatically', () => {
      component.activeColumn.set('name');
      component.direction.set('desc');
      fixture.detectChanges();

      const header = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      expect(header.attributes['aria-sort']).toBe('descending');
    });

    it('should update model when view changes', () => {
      const header = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      header.nativeElement.click();
      fixture.detectChanges();

      expect(component.activeColumn()).toBe('name');
      expect(component.direction()).toBe('asc');
    });

    it('should reflect active column change in aria-sort', () => {
      component.activeColumn.set('name');
      component.direction.set('asc');
      fixture.detectChanges();

      const nameHeader = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      const ageHeader = fixture.debugElement.query(By.css('[data-testid="header-age"]'));

      expect(nameHeader.attributes['aria-sort']).toBe('ascending');
      expect(ageHeader.attributes['aria-sort']).toBe('none');

      component.activeColumn.set('age');
      fixture.detectChanges();

      expect(nameHeader.attributes['aria-sort']).toBe('none');
      expect(ageHeader.attributes['aria-sort']).toBe('ascending');
    });
  });

  describe('Programmatic sort via directive API', () => {
    @Component({
      template: `
        <div
          comSort
          #sortRef="comSort"
          [sortDisabled]="sortDisabled()"
          [(sortActive)]="activeColumn"
          [(sortDirection)]="direction"
        >
          <div comSortHeader="name" data-testid="header-name">Name</div>
          <div comSortHeader="age" data-testid="header-age">Age</div>
        </div>
        <button (click)="sortRef.sort('name')" data-testid="sort-name-btn">Sort Name</button>
        <button (click)="sortRef.sort('age')" data-testid="sort-age-btn">Sort Age</button>
      `,
      imports: [SortDirective, SortHeaderComponent],
    })
    class ProgrammaticSortComponent {
      activeColumn = signal<string | undefined>(undefined);
      direction = signal<SortDirection>(undefined);
      sortDisabled = signal(false);
    }

    let fixture: ComponentFixture<ProgrammaticSortComponent>;
    let component: ProgrammaticSortComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ProgrammaticSortComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ProgrammaticSortComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should sort programmatically via exportAs reference', () => {
      const sortBtn = fixture.debugElement.query(By.css('[data-testid="sort-name-btn"]'));
      sortBtn.nativeElement.click();
      fixture.detectChanges();

      expect(component.activeColumn()).toBe('name');
      expect(component.direction()).toBe('asc');
    });

    it('should cycle through directions programmatically', () => {
      const sortBtn = fixture.debugElement.query(By.css('[data-testid="sort-name-btn"]'));

      sortBtn.nativeElement.click();
      fixture.detectChanges();
      expect(component.direction()).toBe('asc');

      sortBtn.nativeElement.click();
      fixture.detectChanges();
      expect(component.direction()).toBe('desc');

      sortBtn.nativeElement.click();
      fixture.detectChanges();
      expect(component.direction()).toBeUndefined();
    });

    it('should switch columns programmatically', () => {
      const sortNameBtn = fixture.debugElement.query(By.css('[data-testid="sort-name-btn"]'));
      const sortAgeBtn = fixture.debugElement.query(By.css('[data-testid="sort-age-btn"]'));

      sortNameBtn.nativeElement.click();
      fixture.detectChanges();
      expect(component.activeColumn()).toBe('name');

      sortAgeBtn.nativeElement.click();
      fixture.detectChanges();
      expect(component.activeColumn()).toBe('age');
      expect(component.direction()).toBe('asc');
    });

    it('should not sort when disabled', () => {
      component.sortDisabled.set(true);
      fixture.detectChanges();

      const sortBtn = fixture.debugElement.query(By.css('[data-testid="sort-name-btn"]'));
      sortBtn.nativeElement.click();
      fixture.detectChanges();

      expect(component.activeColumn()).toBeUndefined();
    });
  });

  describe('getNextDirection API', () => {
    @Component({
      template: `
        <div
          comSort
          #sortRef="comSort"
          [(sortActive)]="activeColumn"
          [(sortDirection)]="direction"
        >
          <div comSortHeader="name" data-testid="header-name">Name</div>
        </div>
      `,
      imports: [SortDirective, SortHeaderComponent],
    })
    class NextDirectionComponent {
      activeColumn = signal<string | undefined>(undefined);
      direction = signal<SortDirection>(undefined);
    }

    let fixture: ComponentFixture<NextDirectionComponent>;
    let sortDirective: SortDirective;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [NextDirectionComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(NextDirectionComponent);
      fixture.detectChanges();

      sortDirective = fixture.debugElement.query(By.directive(SortDirective)).injector.get(
        SortDirective
      );
    });

    it('should return first direction in cycle for inactive column', () => {
      expect(sortDirective.getNextDirection('name')).toBe('asc');
    });

    it('should return next direction in cycle for active column', () => {
      sortDirective.sort('name');
      expect(sortDirective.getNextDirection('name')).toBe('desc');
    });

    it('should return undefined for last position in cycle', () => {
      sortDirective.sort('name');
      sortDirective.sort('name');
      expect(sortDirective.getNextDirection('name')).toBeUndefined();
    });

    it('should wrap around to first direction', () => {
      sortDirective.sort('name');
      sortDirective.sort('name');
      sortDirective.sort('name');
      expect(sortDirective.getNextDirection('name')).toBe('asc');
    });
  });

  describe('Styling variants', () => {
    @Component({
      template: `
        <div comSort [(sortActive)]="activeColumn" [(sortDirection)]="direction">
          <div comSortHeader="name" data-testid="header-name">Name</div>
        </div>
      `,
      imports: [SortDirective, SortHeaderComponent],
    })
    class StylingVariantsComponent {
      activeColumn = signal<string | undefined>(undefined);
      direction = signal<SortDirection>(undefined);
    }

    let fixture: ComponentFixture<StylingVariantsComponent>;
    let component: StylingVariantsComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [StylingVariantsComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(StylingVariantsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should apply sortable styling classes', () => {
      const header = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      expect(header.nativeElement.classList.contains('cursor-pointer')).toBe(true);
    });

    it('should apply inactive styling by default', () => {
      const header = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      expect(header.nativeElement.classList.contains('text-muted-foreground')).toBe(true);
    });

    it('should apply active styling when sorted', () => {
      const header = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      header.nativeElement.click();
      fixture.detectChanges();

      expect(header.nativeElement.classList.contains('text-foreground')).toBe(true);
    });

    it('should have inline-flex layout', () => {
      const header = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      expect(header.nativeElement.classList.contains('inline-flex')).toBe(true);
      expect(header.nativeElement.classList.contains('items-center')).toBe(true);
    });
  });

  describe('Error handling', () => {
    it('should throw error when SortHeaderComponent is used without SortDirective', () => {
      @Component({
        template: `<div comSortHeader="name">Name</div>`,
        imports: [SortHeaderComponent],
      })
      class OrphanHeaderComponent {}

      expect(() => {
        TestBed.configureTestingModule({
          imports: [OrphanHeaderComponent],
        }).compileComponents();

        const fixture = TestBed.createComponent(OrphanHeaderComponent);
        fixture.detectChanges();
      }).toThrow();
    });
  });

  describe('Header deregistration on destroy', () => {
    @Component({
      template: `
        <div comSort [(sortActive)]="activeColumn">
          <div comSortHeader="name" data-testid="header-name">Name</div>
          @if (showAge()) {
            <div comSortHeader="age" data-testid="header-age">Age</div>
          }
        </div>
      `,
      imports: [SortDirective, SortHeaderComponent],
    })
    class DeregistrationComponent {
      showAge = signal(true);
      activeColumn = signal<string | undefined>(undefined);
    }

    let fixture: ComponentFixture<DeregistrationComponent>;
    let component: DeregistrationComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DeregistrationComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(DeregistrationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have both headers initially', () => {
      const headers = fixture.debugElement.queryAll(By.directive(SortHeaderComponent));
      expect(headers.length).toBe(2);
    });

    it('should deregister header when destroyed', () => {
      component.showAge.set(false);
      fixture.detectChanges();

      const headers = fixture.debugElement.queryAll(By.directive(SortHeaderComponent));
      expect(headers.length).toBe(1);
    });

    it('should maintain sort state for remaining headers after deregistration', () => {
      const nameHeader = fixture.debugElement.query(By.css('[data-testid="header-name"]'));
      nameHeader.nativeElement.click();
      fixture.detectChanges();

      component.showAge.set(false);
      fixture.detectChanges();

      expect(component.activeColumn()).toBe('name');
    });
  });
});
