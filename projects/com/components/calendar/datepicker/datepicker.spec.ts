import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ArrowRight, Calendar, X } from 'lucide-angular';

import { ComDatepicker } from './datepicker.component';
import { ComDateRangePicker } from './date-range-picker.component';
import { provideNativeDateAdapter } from '../providers';
import { provideComIcons } from 'ngx-com/components/icon';
import type { DateRangeValue } from './datepicker.types';

/** Icons used by datepicker components. */
const DATEPICKER_TEST_ICONS = { ArrowRight, Calendar, X };

describe('ComDatepicker', () => {
  describe('Basic functionality', () => {
    @Component({
      template: `
        <com-datepicker
          [value]="selectedDate()"
          [placeholder]="placeholder()"
          (dateChange)="onDateChange($event)"
        />
      `,
      imports: [ComDatepicker],
      providers: [provideNativeDateAdapter()],
    })
    class BasicDatepickerComponent {
      selectedDate = signal<Date | null>(null);
      placeholder = signal('Select date');
      lastEmittedDate: Date | null = null;

      onDateChange(date: Date | null): void {
        this.lastEmittedDate = date;
      }
    }

    let fixture: ComponentFixture<BasicDatepickerComponent>;
    let component: BasicDatepickerComponent;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BasicDatepickerComponent],
        providers: [provideComIcons(DATEPICKER_TEST_ICONS)],
      }).compileComponents();

      fixture = TestBed.createComponent(BasicDatepickerComponent);
      component = fixture.componentInstance;
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render trigger with placeholder', () => {
      const input = fixture.debugElement.query(By.css('input'));
      expect(input.nativeElement.placeholder).toBe('Select date');
    });

    it('should open overlay on trigger click', async () => {
      const trigger = fixture.debugElement.query(By.css('.com-datepicker-host > div'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeTruthy();
    });

    it('should display formatted date when value is set', () => {
      component.selectedDate.set(new Date(2024, 0, 15)); // Jan 15, 2024
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('input'));
      expect(input.nativeElement.value).toContain('2024');
    });
  });

  describe('Disabled state', () => {
    @Component({
      template: `
        <com-datepicker [disabled]="disabled()" />
      `,
      imports: [ComDatepicker],
      providers: [provideNativeDateAdapter()],
    })
    class DisabledDatepickerComponent {
      disabled = signal(true);
    }

    let fixture: ComponentFixture<DisabledDatepickerComponent>;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DisabledDatepickerComponent],
        providers: [provideComIcons(DATEPICKER_TEST_ICONS)],
      }).compileComponents();

      fixture = TestBed.createComponent(DisabledDatepickerComponent);
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should not open when disabled', async () => {
      const trigger = fixture.debugElement.query(By.css('.com-datepicker-host > div'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeNull();
    });

    it('should have aria-disabled attribute', () => {
      const trigger = fixture.debugElement.query(By.css('.com-datepicker-host > div'));
      expect(trigger.attributes['aria-disabled']).toBe('true');
    });

    it('should have disabled class on host', () => {
      const host = fixture.debugElement.query(By.css('.com-datepicker-host'));
      expect(host.nativeElement.classList.contains('com-datepicker-disabled')).toBe(true);
    });
  });

  describe('Reactive Forms integration', () => {
    @Component({
      template: `
        <form [formGroup]="form">
          <com-datepicker formControlName="date" />
        </form>
      `,
      imports: [ComDatepicker, ReactiveFormsModule],
      providers: [provideNativeDateAdapter()],
    })
    class ReactiveFormDatepickerComponent {
      form = new FormGroup({
        date: new FormControl<Date | null>(null),
      });
    }

    let fixture: ComponentFixture<ReactiveFormDatepickerComponent>;
    let component: ReactiveFormDatepickerComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ReactiveFormDatepickerComponent],
        providers: [provideComIcons(DATEPICKER_TEST_ICONS)],
      }).compileComponents();

      fixture = TestBed.createComponent(ReactiveFormDatepickerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should work with FormControl', () => {
      const testDate = new Date(2024, 5, 15);
      component.form.controls.date.setValue(testDate);
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('input'));
      expect(input.nativeElement.value).toContain('2024');
    });
  });

  describe('Clear button', () => {
    @Component({
      template: `
        <com-datepicker
          [value]="selectedDate()"
          [showClearButton]="true"
          (dateChange)="onDateChange($event)"
        />
      `,
      imports: [ComDatepicker],
      providers: [provideNativeDateAdapter()],
    })
    class ClearButtonDatepickerComponent {
      selectedDate = signal<Date | null>(new Date(2024, 0, 15));
      lastEmittedDate: Date | null = new Date();

      onDateChange(date: Date | null): void {
        this.lastEmittedDate = date;
      }
    }

    let fixture: ComponentFixture<ClearButtonDatepickerComponent>;
    let component: ClearButtonDatepickerComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ClearButtonDatepickerComponent],
        providers: [provideComIcons(DATEPICKER_TEST_ICONS)],
      }).compileComponents();

      fixture = TestBed.createComponent(ClearButtonDatepickerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should show clear button when value exists', () => {
      const clearButton = fixture.debugElement.query(By.css('[aria-label="Clear date"]'));
      expect(clearButton).toBeTruthy();
    });

    it('should clear value on clear button click', () => {
      const clearButton = fixture.debugElement.query(By.css('[aria-label="Clear date"]'));
      clearButton.nativeElement.click();
      fixture.detectChanges();

      expect(component.lastEmittedDate).toBeNull();
    });

    it('should hide clear button when value is null', () => {
      component.selectedDate.set(null);
      fixture.detectChanges();

      const clearButton = fixture.debugElement.query(By.css('[aria-label="Clear date"]'));
      expect(clearButton).toBeNull();
    });
  });

  describe('Size variants', () => {
    @Component({
      template: `
        <com-datepicker [size]="size()" />
      `,
      imports: [ComDatepicker],
      providers: [provideNativeDateAdapter()],
    })
    class SizedDatepickerComponent {
      size = signal<'sm' | 'default' | 'lg'>('default');
    }

    let fixture: ComponentFixture<SizedDatepickerComponent>;
    let component: SizedDatepickerComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SizedDatepickerComponent],
        providers: [provideComIcons(DATEPICKER_TEST_ICONS)],
      }).compileComponents();

      fixture = TestBed.createComponent(SizedDatepickerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should apply default size classes', () => {
      const trigger = fixture.debugElement.query(By.css('.com-datepicker-host > div'));
      expect(trigger.nativeElement.classList.contains('h-10')).toBe(true);
    });

    it('should apply sm size classes', () => {
      component.size.set('sm');
      fixture.detectChanges();

      const trigger = fixture.debugElement.query(By.css('.com-datepicker-host > div'));
      expect(trigger.nativeElement.classList.contains('h-8')).toBe(true);
    });

    it('should apply lg size classes', () => {
      component.size.set('lg');
      fixture.detectChanges();

      const trigger = fixture.debugElement.query(By.css('.com-datepicker-host > div'));
      expect(trigger.nativeElement.classList.contains('h-12')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    @Component({
      template: `
        <com-datepicker
          [ariaLabel]="'Birth date'"
          [ariaDescribedBy]="'help-text'"
          [required]="true"
        />
        <span id="help-text">Enter your birth date</span>
      `,
      imports: [ComDatepicker],
      providers: [provideNativeDateAdapter()],
    })
    class AccessibleDatepickerComponent {}

    let fixture: ComponentFixture<AccessibleDatepickerComponent>;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [AccessibleDatepickerComponent],
        providers: [provideComIcons(DATEPICKER_TEST_ICONS)],
      }).compileComponents();

      fixture = TestBed.createComponent(AccessibleDatepickerComponent);
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should have aria-label on input', () => {
      const input = fixture.debugElement.query(By.css('input'));
      expect(input.attributes['aria-label']).toBe('Birth date');
    });

    it('should have aria-describedby on input', () => {
      const input = fixture.debugElement.query(By.css('input'));
      expect(input.attributes['aria-describedby']).toBe('help-text');
    });

    it('should have aria-required on input', () => {
      const input = fixture.debugElement.query(By.css('input'));
      expect(input.attributes['aria-required']).toBe('true');
    });

    it('should have aria-haspopup on trigger', () => {
      const trigger = fixture.debugElement.query(By.css('.com-datepicker-host > div'));
      expect(trigger.attributes['aria-haspopup']).toBe('dialog');
    });

    it('should have aria-expanded on trigger', () => {
      const trigger = fixture.debugElement.query(By.css('.com-datepicker-host > div'));
      expect(trigger.attributes['aria-expanded']).toBe('false');
    });

    it('should update aria-expanded when open', async () => {
      const trigger = fixture.debugElement.query(By.css('.com-datepicker-host > div'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(trigger.attributes['aria-expanded']).toBe('true');
    });
  });
});

describe('ComDateRangePicker', () => {
  describe('Basic functionality', () => {
    @Component({
      template: `
        <com-date-range-picker
          [value]="selectedRange()"
          [startPlaceholder]="'Start'"
          [endPlaceholder]="'End'"
          (rangeChange)="onRangeChange($event)"
        />
      `,
      imports: [ComDateRangePicker],
      providers: [provideNativeDateAdapter()],
    })
    class BasicDateRangePickerComponent {
      selectedRange = signal<DateRangeValue<Date> | null>(null);
      lastEmittedRange: DateRangeValue<Date> | null = null;

      onRangeChange(range: DateRangeValue<Date> | null): void {
        this.lastEmittedRange = range;
      }
    }

    let fixture: ComponentFixture<BasicDateRangePickerComponent>;
    let component: BasicDateRangePickerComponent;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BasicDateRangePickerComponent],
        providers: [provideComIcons(DATEPICKER_TEST_ICONS)],
      }).compileComponents();

      fixture = TestBed.createComponent(BasicDateRangePickerComponent);
      component = fixture.componentInstance;
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render two input fields', () => {
      const inputs = fixture.debugElement.queryAll(By.css('input'));
      expect(inputs.length).toBe(2);
    });

    it('should render start and end placeholders', () => {
      const inputs = fixture.debugElement.queryAll(By.css('input'));
      expect(inputs[0]!.nativeElement.placeholder).toBe('Start');
      expect(inputs[1]!.nativeElement.placeholder).toBe('End');
    });

    it('should open overlay on trigger click', async () => {
      const trigger = fixture.debugElement.query(By.css('.com-date-range-picker-host > div'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeTruthy();
    });

    it('should display formatted dates when value is set', () => {
      component.selectedRange.set({
        start: new Date(2024, 0, 15),
        end: new Date(2024, 0, 20),
      });
      fixture.detectChanges();

      const inputs = fixture.debugElement.queryAll(By.css('input'));
      expect(inputs[0]!.nativeElement.value).toContain('2024');
      expect(inputs[1]!.nativeElement.value).toContain('2024');
    });
  });

  describe('Reactive Forms integration', () => {
    @Component({
      template: `
        <form [formGroup]="form">
          <com-date-range-picker formControlName="dateRange" />
        </form>
      `,
      imports: [ComDateRangePicker, ReactiveFormsModule],
      providers: [provideNativeDateAdapter()],
    })
    class ReactiveFormDateRangePickerComponent {
      form = new FormGroup({
        dateRange: new FormControl<DateRangeValue<Date> | null>(null),
      });
    }

    let fixture: ComponentFixture<ReactiveFormDateRangePickerComponent>;
    let component: ReactiveFormDateRangePickerComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ReactiveFormDateRangePickerComponent],
        providers: [provideComIcons(DATEPICKER_TEST_ICONS)],
      }).compileComponents();

      fixture = TestBed.createComponent(ReactiveFormDateRangePickerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should work with FormControl', () => {
      const testRange: DateRangeValue<Date> = {
        start: new Date(2024, 0, 15),
        end: new Date(2024, 0, 20),
      };
      component.form.controls.dateRange.setValue(testRange);
      fixture.detectChanges();

      const inputs = fixture.debugElement.queryAll(By.css('input'));
      expect(inputs[0]!.nativeElement.value).toContain('2024');
      expect(inputs[1]!.nativeElement.value).toContain('2024');
    });
  });

  describe('Clear button', () => {
    @Component({
      template: `
        <com-date-range-picker
          [value]="selectedRange()"
          [showClearButton]="true"
          (rangeChange)="onRangeChange($event)"
        />
      `,
      imports: [ComDateRangePicker],
      providers: [provideNativeDateAdapter()],
    })
    class ClearButtonDateRangePickerComponent {
      selectedRange = signal<DateRangeValue<Date> | null>({
        start: new Date(2024, 0, 15),
        end: new Date(2024, 0, 20),
      });
      lastEmittedRange: DateRangeValue<Date> | null = { start: new Date(), end: new Date() };

      onRangeChange(range: DateRangeValue<Date> | null): void {
        this.lastEmittedRange = range;
      }
    }

    let fixture: ComponentFixture<ClearButtonDateRangePickerComponent>;
    let component: ClearButtonDateRangePickerComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ClearButtonDateRangePickerComponent],
        providers: [provideComIcons(DATEPICKER_TEST_ICONS)],
      }).compileComponents();

      fixture = TestBed.createComponent(ClearButtonDateRangePickerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should show clear button when value exists', () => {
      const clearButton = fixture.debugElement.query(By.css('[aria-label="Clear date range"]'));
      expect(clearButton).toBeTruthy();
    });

    it('should clear value on clear button click', () => {
      const clearButton = fixture.debugElement.query(By.css('[aria-label="Clear date range"]'));
      clearButton.nativeElement.click();
      fixture.detectChanges();

      expect(component.lastEmittedRange).toBeNull();
    });
  });

  describe('Disabled state', () => {
    @Component({
      template: `
        <com-date-range-picker [disabled]="disabled()" />
      `,
      imports: [ComDateRangePicker],
      providers: [provideNativeDateAdapter()],
    })
    class DisabledDateRangePickerComponent {
      disabled = signal(true);
    }

    let fixture: ComponentFixture<DisabledDateRangePickerComponent>;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DisabledDateRangePickerComponent],
        providers: [provideComIcons(DATEPICKER_TEST_ICONS)],
      }).compileComponents();

      fixture = TestBed.createComponent(DisabledDateRangePickerComponent);
      overlayContainer = TestBed.inject(OverlayContainer);
      overlayContainerElement = overlayContainer.getContainerElement();
      fixture.detectChanges();
    });

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('should not open when disabled', async () => {
      const trigger = fixture.debugElement.query(By.css('.com-date-range-picker-host > div'));
      trigger.nativeElement.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const panel = overlayContainerElement.querySelector('[role="dialog"]');
      expect(panel).toBeNull();
    });

    it('should have disabled class on host', () => {
      const host = fixture.debugElement.query(By.css('.com-date-range-picker-host'));
      expect(host.nativeElement.classList.contains('com-date-range-picker-disabled')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    @Component({
      template: `
        <com-date-range-picker
          [startAriaLabel]="'Check-in date'"
          [endAriaLabel]="'Check-out date'"
        />
      `,
      imports: [ComDateRangePicker],
      providers: [provideNativeDateAdapter()],
    })
    class AccessibleDateRangePickerComponent {}

    let fixture: ComponentFixture<AccessibleDateRangePickerComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [AccessibleDateRangePickerComponent],
        providers: [provideComIcons(DATEPICKER_TEST_ICONS)],
      }).compileComponents();

      fixture = TestBed.createComponent(AccessibleDateRangePickerComponent);
      fixture.detectChanges();
    });

    it('should have aria-label on start input', () => {
      const inputs = fixture.debugElement.queryAll(By.css('input'));
      expect(inputs[0]!.attributes['aria-label']).toBe('Check-in date');
    });

    it('should have aria-label on end input', () => {
      const inputs = fixture.debugElement.queryAll(By.css('input'));
      expect(inputs[1]!.attributes['aria-label']).toBe('Check-out date');
    });

    it('should have aria-haspopup on trigger', () => {
      const trigger = fixture.debugElement.query(By.css('.com-date-range-picker-host > div'));
      expect(trigger.attributes['aria-haspopup']).toBe('dialog');
    });
  });

  describe('Size variants', () => {
    @Component({
      template: `
        <com-date-range-picker [size]="size()" />
      `,
      imports: [ComDateRangePicker],
      providers: [provideNativeDateAdapter()],
    })
    class SizedDateRangePickerComponent {
      size = signal<'sm' | 'default' | 'lg'>('default');
    }

    let fixture: ComponentFixture<SizedDateRangePickerComponent>;
    let component: SizedDateRangePickerComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SizedDateRangePickerComponent],
        providers: [provideComIcons(DATEPICKER_TEST_ICONS)],
      }).compileComponents();

      fixture = TestBed.createComponent(SizedDateRangePickerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should apply default size classes', () => {
      const trigger = fixture.debugElement.query(By.css('.com-date-range-picker-host > div'));
      expect(trigger.nativeElement.classList.contains('h-10')).toBe(true);
    });

    it('should apply sm size classes', () => {
      component.size.set('sm');
      fixture.detectChanges();

      const trigger = fixture.debugElement.query(By.css('.com-date-range-picker-host > div'));
      expect(trigger.nativeElement.classList.contains('h-8')).toBe(true);
    });

    it('should apply lg size classes', () => {
      component.size.set('lg');
      fixture.detectChanges();

      const trigger = fixture.debugElement.query(By.css('.com-date-range-picker-host > div'));
      expect(trigger.nativeElement.classList.contains('h-12')).toBe(true);
    });
  });
});
