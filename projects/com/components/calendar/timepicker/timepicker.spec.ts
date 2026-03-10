import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ComTimePicker } from './timepicker.component';
import type { ComTimeValue } from './timepicker.types';
import { compareTime, createTimeValue } from './timepicker.types';

// ─── Helpers ───────────────────────────────────────────────────────────

function getHoursInput(fixture: ComponentFixture<unknown>): HTMLInputElement {
  return fixture.debugElement.query(By.css('[aria-label="Hours"]')).nativeElement;
}

function getMinutesInput(fixture: ComponentFixture<unknown>): HTMLInputElement {
  return fixture.debugElement.query(By.css('[aria-label="Minutes"]')).nativeElement;
}

function getSecondsInput(fixture: ComponentFixture<unknown>): HTMLInputElement | null {
  const el = fixture.debugElement.query(By.css('[aria-label="Seconds"]'));
  return el ? el.nativeElement : null;
}

function getPeriodButton(fixture: ComponentFixture<unknown>): HTMLButtonElement | null {
  const el = fixture.debugElement.query(By.css('[aria-label^="Toggle AM/PM"]'));
  return el ? el.nativeElement : null;
}

function dispatchKeydown(el: HTMLElement, key: string): void {
  el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
}

// ─── Types helper tests ────────────────────────────────────────────────

describe('timepicker types', () => {
  describe('createTimeValue', () => {
    it('should create with defaults', () => {
      const t = createTimeValue();
      expect(t).toEqual({ hours: 0, minutes: 0, seconds: 0 });
    });

    it('should create with provided values', () => {
      const t = createTimeValue(14, 30, 45);
      expect(t).toEqual({ hours: 14, minutes: 30, seconds: 45 });
    });
  });

  describe('compareTime', () => {
    it('should return 0 for equal times', () => {
      expect(compareTime({ hours: 10, minutes: 30, seconds: 0 }, { hours: 10, minutes: 30, seconds: 0 })).toBe(0);
    });

    it('should return negative when a < b', () => {
      expect(compareTime({ hours: 9, minutes: 0, seconds: 0 }, { hours: 10, minutes: 0, seconds: 0 })).toBeLessThan(0);
    });

    it('should return positive when a > b', () => {
      expect(compareTime({ hours: 10, minutes: 0, seconds: 0 }, { hours: 9, minutes: 0, seconds: 0 })).toBeGreaterThan(0);
    });

    it('should compare minutes when hours are equal', () => {
      expect(compareTime({ hours: 10, minutes: 30, seconds: 0 }, { hours: 10, minutes: 20, seconds: 0 })).toBeGreaterThan(0);
    });

    it('should compare seconds when hours and minutes are equal', () => {
      expect(compareTime({ hours: 10, minutes: 30, seconds: 45 }, { hours: 10, minutes: 30, seconds: 30 })).toBeGreaterThan(0);
    });
  });
});

// ─── ComTimePicker ─────────────────────────────────────────────────────

describe('ComTimePicker', () => {
  describe('Basic rendering (24h)', () => {
    @Component({
      template: `
        <com-time-picker
          [value]="time()"
          [use12HourFormat]="false"
          (timeChange)="onTimeChange($event)"
        />
      `,
      imports: [ComTimePicker],
    })
    class Basic24hComponent {
      time = signal<ComTimeValue | null>(null);
      lastEmitted: ComTimeValue | null = null;

      onTimeChange(t: ComTimeValue | null): void {
        this.lastEmitted = t;
      }
    }

    let fixture: ComponentFixture<Basic24hComponent>;
    let component: Basic24hComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [Basic24hComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(Basic24hComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render hours and minutes inputs', () => {
      expect(getHoursInput(fixture)).toBeTruthy();
      expect(getMinutesInput(fixture)).toBeTruthy();
    });

    it('should not render seconds by default', () => {
      expect(getSecondsInput(fixture)).toBeNull();
    });

    it('should not render AM/PM button in 24h mode', () => {
      expect(getPeriodButton(fixture)).toBeNull();
    });

    it('should show empty strings when value is null', () => {
      expect(getHoursInput(fixture).value).toBe('');
      expect(getMinutesInput(fixture).value).toBe('');
    });

    it('should display formatted time when value is set', () => {
      component.time.set({ hours: 14, minutes: 5, seconds: 0 });
      fixture.detectChanges();

      expect(getHoursInput(fixture).value).toBe('14');
      expect(getMinutesInput(fixture).value).toBe('05');
    });

    it('should have group role on host', () => {
      const host = fixture.debugElement.query(By.css('.com-time-picker-host'));
      expect(host.attributes['role']).toBe('group');
    });

    it('should have default aria-label', () => {
      const host = fixture.debugElement.query(By.css('.com-time-picker-host'));
      expect(host.attributes['aria-label']).toBe('Time picker');
    });

    it('should set spinbutton role on inputs', () => {
      expect(getHoursInput(fixture).getAttribute('role')).toBe('spinbutton');
      expect(getMinutesInput(fixture).getAttribute('role')).toBe('spinbutton');
    });

    it('should set aria-valuemin/max on hours (24h)', () => {
      const hours = getHoursInput(fixture);
      expect(hours.getAttribute('aria-valuemin')).toBe('0');
      expect(hours.getAttribute('aria-valuemax')).toBe('23');
    });

    it('should set aria-valuemin/max on minutes', () => {
      const minutes = getMinutesInput(fixture);
      expect(minutes.getAttribute('aria-valuemin')).toBe('0');
      expect(minutes.getAttribute('aria-valuemax')).toBe('59');
    });
  });

  describe('12-hour format', () => {
    @Component({
      template: `
        <com-time-picker
          [value]="time()"
          [use12HourFormat]="true"
          (timeChange)="onTimeChange($event)"
        />
      `,
      imports: [ComTimePicker],
    })
    class TwelveHourComponent {
      time = signal<ComTimeValue | null>(null);
      lastEmitted: ComTimeValue | null = null;

      onTimeChange(t: ComTimeValue | null): void {
        this.lastEmitted = t;
      }
    }

    let fixture: ComponentFixture<TwelveHourComponent>;
    let component: TwelveHourComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TwelveHourComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TwelveHourComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render AM/PM button', () => {
      expect(getPeriodButton(fixture)).toBeTruthy();
    });

    it('should show AM for morning hours', () => {
      component.time.set({ hours: 9, minutes: 30, seconds: 0 });
      fixture.detectChanges();

      expect(getPeriodButton(fixture)!.textContent!.trim()).toBe('AM');
    });

    it('should show PM for afternoon hours', () => {
      component.time.set({ hours: 14, minutes: 30, seconds: 0 });
      fixture.detectChanges();

      expect(getPeriodButton(fixture)!.textContent!.trim()).toBe('PM');
    });

    it('should display 12h hours (e.g. 14:00 → 02)', () => {
      component.time.set({ hours: 14, minutes: 0, seconds: 0 });
      fixture.detectChanges();

      expect(getHoursInput(fixture).value).toBe('02');
    });

    it('should display 12 for midnight (0 → 12 AM)', () => {
      component.time.set({ hours: 0, minutes: 0, seconds: 0 });
      fixture.detectChanges();

      expect(getHoursInput(fixture).value).toBe('12');
      expect(getPeriodButton(fixture)!.textContent!.trim()).toBe('AM');
    });

    it('should display 12 for noon (12 → 12 PM)', () => {
      component.time.set({ hours: 12, minutes: 0, seconds: 0 });
      fixture.detectChanges();

      expect(getHoursInput(fixture).value).toBe('12');
      expect(getPeriodButton(fixture)!.textContent!.trim()).toBe('PM');
    });

    it('should set aria-valuemin/max for 12h hours', () => {
      const hours = getHoursInput(fixture);
      expect(hours.getAttribute('aria-valuemin')).toBe('1');
      expect(hours.getAttribute('aria-valuemax')).toBe('12');
    });

    it('should toggle period on button click', () => {
      component.time.set({ hours: 9, minutes: 0, seconds: 0 });
      fixture.detectChanges();

      getPeriodButton(fixture)!.click();
      fixture.detectChanges();

      expect(component.lastEmitted!.hours).toBe(21);
      expect(getPeriodButton(fixture)!.textContent!.trim()).toBe('PM');
    });

    it('should toggle PM → AM', () => {
      component.time.set({ hours: 14, minutes: 0, seconds: 0 });
      fixture.detectChanges();

      getPeriodButton(fixture)!.click();
      fixture.detectChanges();

      expect(component.lastEmitted!.hours).toBe(2);
      expect(getPeriodButton(fixture)!.textContent!.trim()).toBe('AM');
    });
  });

  describe('Show seconds', () => {
    @Component({
      template: `
        <com-time-picker
          [value]="time()"
          [use12HourFormat]="false"
          [showSeconds]="true"
          (timeChange)="onTimeChange($event)"
        />
      `,
      imports: [ComTimePicker],
    })
    class SecondsComponent {
      time = signal<ComTimeValue | null>({ hours: 10, minutes: 30, seconds: 45 });
      lastEmitted: ComTimeValue | null = null;

      onTimeChange(t: ComTimeValue | null): void {
        this.lastEmitted = t;
      }
    }

    let fixture: ComponentFixture<SecondsComponent>;
    let component: SecondsComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SecondsComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(SecondsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render seconds input', () => {
      expect(getSecondsInput(fixture)).toBeTruthy();
    });

    it('should display formatted seconds', () => {
      expect(getSecondsInput(fixture)!.value).toBe('45');
    });

    it('should have spinbutton role on seconds', () => {
      expect(getSecondsInput(fixture)!.getAttribute('role')).toBe('spinbutton');
    });

    it('should set aria-valuemin/max on seconds', () => {
      const seconds = getSecondsInput(fixture)!;
      expect(seconds.getAttribute('aria-valuemin')).toBe('0');
      expect(seconds.getAttribute('aria-valuemax')).toBe('59');
    });
  });

  describe('Keyboard navigation', () => {
    @Component({
      template: `
        <com-time-picker
          [value]="time()"
          [use12HourFormat]="false"
          [showSeconds]="true"
          (timeChange)="onTimeChange($event)"
        />
      `,
      imports: [ComTimePicker],
    })
    class KeyboardComponent {
      time = signal<ComTimeValue | null>({ hours: 10, minutes: 30, seconds: 0 });
      lastEmitted: ComTimeValue | null = null;

      onTimeChange(t: ComTimeValue | null): void {
        this.lastEmitted = t;
      }
    }

    let fixture: ComponentFixture<KeyboardComponent>;
    let component: KeyboardComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [KeyboardComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(KeyboardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should increment hours on ArrowUp', () => {
      const hours = getHoursInput(fixture);
      hours.focus();
      dispatchKeydown(hours, 'ArrowUp');
      fixture.detectChanges();

      expect(component.lastEmitted!.hours).toBe(11);
    });

    it('should decrement hours on ArrowDown', () => {
      const hours = getHoursInput(fixture);
      hours.focus();
      dispatchKeydown(hours, 'ArrowDown');
      fixture.detectChanges();

      expect(component.lastEmitted!.hours).toBe(9);
    });

    it('should wrap hours from 23 to 0 on ArrowUp', () => {
      component.time.set({ hours: 23, minutes: 0, seconds: 0 });
      fixture.detectChanges();

      const hours = getHoursInput(fixture);
      hours.focus();
      dispatchKeydown(hours, 'ArrowUp');
      fixture.detectChanges();

      expect(component.lastEmitted!.hours).toBe(0);
    });

    it('should wrap hours from 0 to 23 on ArrowDown', () => {
      component.time.set({ hours: 0, minutes: 0, seconds: 0 });
      fixture.detectChanges();

      const hours = getHoursInput(fixture);
      hours.focus();
      dispatchKeydown(hours, 'ArrowDown');
      fixture.detectChanges();

      expect(component.lastEmitted!.hours).toBe(23);
    });

    it('should increment minutes on ArrowUp', () => {
      const minutes = getMinutesInput(fixture);
      minutes.focus();
      dispatchKeydown(minutes, 'ArrowUp');
      fixture.detectChanges();

      expect(component.lastEmitted!.minutes).toBe(31);
    });

    it('should decrement minutes on ArrowDown', () => {
      const minutes = getMinutesInput(fixture);
      minutes.focus();
      dispatchKeydown(minutes, 'ArrowDown');
      fixture.detectChanges();

      expect(component.lastEmitted!.minutes).toBe(29);
    });

    it('should wrap minutes from 59 to 0', () => {
      component.time.set({ hours: 10, minutes: 59, seconds: 0 });
      fixture.detectChanges();

      const minutes = getMinutesInput(fixture);
      minutes.focus();
      dispatchKeydown(minutes, 'ArrowUp');
      fixture.detectChanges();

      expect(component.lastEmitted!.minutes).toBe(0);
    });

    it('should wrap minutes from 0 to 59', () => {
      component.time.set({ hours: 10, minutes: 0, seconds: 0 });
      fixture.detectChanges();

      const minutes = getMinutesInput(fixture);
      minutes.focus();
      dispatchKeydown(minutes, 'ArrowDown');
      fixture.detectChanges();

      expect(component.lastEmitted!.minutes).toBe(59);
    });

    it('should increment seconds on ArrowUp', () => {
      const seconds = getSecondsInput(fixture)!;
      seconds.focus();
      dispatchKeydown(seconds, 'ArrowUp');
      fixture.detectChanges();

      expect(component.lastEmitted!.seconds).toBe(1);
    });

    it('should set hours to min (0) on Home key', () => {
      const hours = getHoursInput(fixture);
      hours.focus();
      dispatchKeydown(hours, 'Home');
      fixture.detectChanges();

      expect(component.lastEmitted!.hours).toBe(0);
    });

    it('should set hours to max (23) on End key', () => {
      const hours = getHoursInput(fixture);
      hours.focus();
      dispatchKeydown(hours, 'End');
      fixture.detectChanges();

      expect(component.lastEmitted!.hours).toBe(23);
    });

    it('should set minutes to 0 on Home key', () => {
      const minutes = getMinutesInput(fixture);
      minutes.focus();
      dispatchKeydown(minutes, 'Home');
      fixture.detectChanges();

      expect(component.lastEmitted!.minutes).toBe(0);
    });

    it('should set minutes to 59 on End key', () => {
      const minutes = getMinutesInput(fixture);
      minutes.focus();
      dispatchKeydown(minutes, 'End');
      fixture.detectChanges();

      expect(component.lastEmitted!.minutes).toBe(59);
    });
  });

  describe('Digit input', () => {
    @Component({
      template: `
        <com-time-picker
          [value]="time()"
          [use12HourFormat]="false"
          (timeChange)="onTimeChange($event)"
        />
      `,
      imports: [ComTimePicker],
    })
    class DigitInputComponent {
      time = signal<ComTimeValue | null>({ hours: 0, minutes: 0, seconds: 0 });
      lastEmitted: ComTimeValue | null = null;

      onTimeChange(t: ComTimeValue | null): void {
        this.lastEmitted = t;
      }
    }

    let fixture: ComponentFixture<DigitInputComponent>;
    let component: DigitInputComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DigitInputComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(DigitInputComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should set hours from single digit', () => {
      const hours = getHoursInput(fixture);
      hours.focus();
      hours.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

      dispatchKeydown(hours, '1');
      fixture.detectChanges();

      expect(component.lastEmitted!.hours).toBe(1);
    });

    it('should set hours from two digits and auto-advance', () => {
      const hours = getHoursInput(fixture);
      hours.focus();
      hours.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

      dispatchKeydown(hours, '1');
      fixture.detectChanges();

      dispatchKeydown(hours, '4');
      fixture.detectChanges();

      expect(component.lastEmitted!.hours).toBe(14);
    });

    it('should set minutes from two digits', () => {
      const minutes = getMinutesInput(fixture);
      minutes.focus();
      minutes.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

      dispatchKeydown(minutes, '3');
      fixture.detectChanges();

      dispatchKeydown(minutes, '0');
      fixture.detectChanges();

      expect(component.lastEmitted!.minutes).toBe(30);
    });

    it('should reset pending digits when value exceeds max', () => {
      const hours = getHoursInput(fixture);
      hours.focus();
      hours.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

      // Type "3" — valid first digit
      dispatchKeydown(hours, '3');
      fixture.detectChanges();

      // Type "5" — "35" > 23, so should reset to just "5"
      dispatchKeydown(hours, '5');
      fixture.detectChanges();

      expect(component.lastEmitted!.hours).toBe(5);
    });
  });

  describe('Minute step', () => {
    @Component({
      template: `
        <com-time-picker
          [value]="time()"
          [use12HourFormat]="false"
          [minuteStep]="15"
          (timeChange)="onTimeChange($event)"
        />
      `,
      imports: [ComTimePicker],
    })
    class MinuteStepComponent {
      time = signal<ComTimeValue | null>({ hours: 10, minutes: 0, seconds: 0 });
      lastEmitted: ComTimeValue | null = null;

      onTimeChange(t: ComTimeValue | null): void {
        this.lastEmitted = t;
      }
    }

    let fixture: ComponentFixture<MinuteStepComponent>;
    let component: MinuteStepComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [MinuteStepComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(MinuteStepComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should increment by step on ArrowUp', () => {
      const minutes = getMinutesInput(fixture);
      minutes.focus();
      dispatchKeydown(minutes, 'ArrowUp');
      fixture.detectChanges();

      expect(component.lastEmitted!.minutes).toBe(15);
    });

    it('should decrement by step on ArrowDown from 15', () => {
      component.time.set({ hours: 10, minutes: 15, seconds: 0 });
      fixture.detectChanges();

      const minutes = getMinutesInput(fixture);
      minutes.focus();
      dispatchKeydown(minutes, 'ArrowDown');
      fixture.detectChanges();

      expect(component.lastEmitted!.minutes).toBe(0);
    });
  });

  describe('Disabled state', () => {
    @Component({
      template: `
        <com-time-picker
          [value]="time()"
          [disabled]="true"
          [use12HourFormat]="true"
        />
      `,
      imports: [ComTimePicker],
    })
    class DisabledComponent {
      time = signal<ComTimeValue | null>({ hours: 9, minutes: 0, seconds: 0 });
    }

    let fixture: ComponentFixture<DisabledComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DisabledComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(DisabledComponent);
      fixture.detectChanges();
    });

    it('should have disabled class on host', () => {
      const host = fixture.debugElement.query(By.css('.com-time-picker-host'));
      expect(host.nativeElement.classList.contains('com-time-picker-disabled')).toBe(true);
    });

    it('should set disabled on hours input', () => {
      expect(getHoursInput(fixture).disabled).toBe(true);
    });

    it('should set disabled on minutes input', () => {
      expect(getMinutesInput(fixture).disabled).toBe(true);
    });

    it('should set disabled on period button', () => {
      expect(getPeriodButton(fixture)!.disabled).toBe(true);
    });

    it('should have aria-disabled on host', () => {
      const host = fixture.debugElement.query(By.css('.com-time-picker-host'));
      expect(host.attributes['aria-disabled']).toBe('true');
    });
  });

  describe('Reactive Forms integration', () => {
    @Component({
      template: `
        <form [formGroup]="form">
          <com-time-picker formControlName="time" [use12HourFormat]="false" />
        </form>
      `,
      imports: [ComTimePicker, ReactiveFormsModule],
    })
    class ReactiveFormComponent {
      form = new FormGroup({
        time: new FormControl<ComTimeValue | null>(null),
      });
    }

    let fixture: ComponentFixture<ReactiveFormComponent>;
    let component: ReactiveFormComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ReactiveFormComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ReactiveFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should work with FormControl', () => {
      component.form.controls.time.setValue({ hours: 14, minutes: 30, seconds: 0 });
      fixture.detectChanges();

      expect(getHoursInput(fixture).value).toBe('14');
      expect(getMinutesInput(fixture).value).toBe('30');
    });

    it('should update FormControl when time changes via keyboard', () => {
      component.form.controls.time.setValue({ hours: 10, minutes: 0, seconds: 0 });
      fixture.detectChanges();

      const hours = getHoursInput(fixture);
      hours.focus();
      dispatchKeydown(hours, 'ArrowUp');
      fixture.detectChanges();

      expect(component.form.controls.time.value!.hours).toBe(11);
    });

    it('should clear display when FormControl is set to null', () => {
      component.form.controls.time.setValue({ hours: 14, minutes: 30, seconds: 0 });
      fixture.detectChanges();

      component.form.controls.time.setValue(null);
      fixture.detectChanges();

      expect(getHoursInput(fixture).value).toBe('');
      expect(getMinutesInput(fixture).value).toBe('');
    });
  });

  describe('Validation', () => {
    @Component({
      template: `
        <com-time-picker
          #picker
          [value]="time()"
          [required]="required()"
          [minTime]="minTime()"
          [maxTime]="maxTime()"
          [use12HourFormat]="false"
          (timeChange)="onTimeChange($event)"
        />
      `,
      imports: [ComTimePicker],
    })
    class ValidationComponent {
      time = signal<ComTimeValue | null>(null);
      required = signal(true);
      minTime = signal<ComTimeValue | null>({ hours: 9, minutes: 0, seconds: 0 });
      maxTime = signal<ComTimeValue | null>({ hours: 17, minutes: 0, seconds: 0 });

      onTimeChange(t: ComTimeValue | null): void {
        this.time.set(t);
      }
    }

    let fixture: ComponentFixture<ValidationComponent>;
    let component: ValidationComponent;
    let picker: ComTimePicker;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ValidationComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ValidationComponent);
      component = fixture.componentInstance;
      picker = fixture.debugElement.query(By.directive(ComTimePicker)).componentInstance;
      fixture.detectChanges();
    });

    it('should return required error when required and null', () => {
      expect(picker.validate()).toEqual({ required: true });
    });

    it('should return null when value is within range', () => {
      component.time.set({ hours: 12, minutes: 0, seconds: 0 });
      fixture.detectChanges();

      expect(picker.validate()).toBeNull();
    });

    it('should return minTime error when value is below minTime', () => {
      component.time.set({ hours: 8, minutes: 0, seconds: 0 });
      fixture.detectChanges();

      const errors = picker.validate();
      expect(errors).toBeTruthy();
      expect(errors!['minTime']).toBeTruthy();
    });

    it('should return maxTime error when value is above maxTime', () => {
      component.time.set({ hours: 18, minutes: 0, seconds: 0 });
      fixture.detectChanges();

      const errors = picker.validate();
      expect(errors).toBeTruthy();
      expect(errors!['maxTime']).toBeTruthy();
    });

    it('should return null when not required and null', () => {
      component.required.set(false);
      fixture.detectChanges();

      expect(picker.validate()).toBeNull();
    });
  });

  describe('Size variants', () => {
    @Component({
      template: `
        <com-time-picker [size]="size()" [use12HourFormat]="false" />
      `,
      imports: [ComTimePicker],
    })
    class SizeVariantsComponent {
      size = signal<'sm' | 'default' | 'lg'>('default');
    }

    let fixture: ComponentFixture<SizeVariantsComponent>;
    let component: SizeVariantsComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SizeVariantsComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(SizeVariantsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should apply default size to container', () => {
      const container = fixture.debugElement.query(By.css('.com-time-picker-host > div'));
      expect(container.nativeElement.classList.contains('h-10')).toBe(true);
    });

    it('should apply sm size to container', () => {
      component.size.set('sm');
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.com-time-picker-host > div'));
      expect(container.nativeElement.classList.contains('h-8')).toBe(true);
    });

    it('should apply lg size to container', () => {
      component.size.set('lg');
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.com-time-picker-host > div'));
      expect(container.nativeElement.classList.contains('h-12')).toBe(true);
    });
  });

  describe('Variant classes', () => {
    @Component({
      template: `
        <com-time-picker [variant]="variant()" [use12HourFormat]="false" />
      `,
      imports: [ComTimePicker],
    })
    class VariantComponent {
      variant = signal<'standalone' | 'embedded'>('standalone');
    }

    let fixture: ComponentFixture<VariantComponent>;
    let component: VariantComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [VariantComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(VariantComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should apply standalone variant classes (border)', () => {
      const container = fixture.debugElement.query(By.css('.com-time-picker-host > div'));
      expect(container.nativeElement.classList.contains('border')).toBe(true);
    });

    it('should apply embedded variant (transparent border)', () => {
      component.variant.set('embedded');
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.com-time-picker-host > div'));
      expect(container.nativeElement.classList.contains('border-transparent')).toBe(true);
    });
  });

  describe('State variants', () => {
    @Component({
      template: `
        <com-time-picker [state]="state()" [use12HourFormat]="false" />
      `,
      imports: [ComTimePicker],
    })
    class StateComponent {
      state = signal<'default' | 'error' | 'success'>('default');
    }

    let fixture: ComponentFixture<StateComponent>;
    let component: StateComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [StateComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(StateComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should apply error state classes', () => {
      component.state.set('error');
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.com-time-picker-host > div'));
      expect(container.nativeElement.classList.contains('border-warn')).toBe(true);
    });

    it('should apply success state classes', () => {
      component.state.set('success');
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('.com-time-picker-host > div'));
      expect(container.nativeElement.classList.contains('border-success')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    @Component({
      template: `
        <com-time-picker
          [ariaLabel]="'Meeting time'"
          [use12HourFormat]="false"
        />
      `,
      imports: [ComTimePicker],
    })
    class A11yComponent {}

    let fixture: ComponentFixture<A11yComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [A11yComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(A11yComponent);
      fixture.detectChanges();
    });

    it('should have custom aria-label on host', () => {
      const host = fixture.debugElement.query(By.css('.com-time-picker-host'));
      expect(host.attributes['aria-label']).toBe('Meeting time');
    });

    it('should have aria-label on hours input', () => {
      expect(getHoursInput(fixture).getAttribute('aria-label')).toBe('Hours');
    });

    it('should have aria-label on minutes input', () => {
      expect(getMinutesInput(fixture).getAttribute('aria-label')).toBe('Minutes');
    });

    it('should have live region for announcements', () => {
      const liveRegion = fixture.debugElement.query(By.css('[aria-live="polite"]'));
      expect(liveRegion).toBeTruthy();
    });
  });

  describe('Period keyboard interaction', () => {
    @Component({
      template: `
        <com-time-picker
          [value]="time()"
          [use12HourFormat]="true"
          (timeChange)="onTimeChange($event)"
        />
      `,
      imports: [ComTimePicker],
    })
    class PeriodKeyboardComponent {
      time = signal<ComTimeValue | null>({ hours: 9, minutes: 0, seconds: 0 });
      lastEmitted: ComTimeValue | null = null;

      onTimeChange(t: ComTimeValue | null): void {
        this.lastEmitted = t;
      }
    }

    let fixture: ComponentFixture<PeriodKeyboardComponent>;
    let component: PeriodKeyboardComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [PeriodKeyboardComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(PeriodKeyboardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should toggle period on ArrowUp', () => {
      const btn = getPeriodButton(fixture)!;
      btn.focus();
      dispatchKeydown(btn, 'ArrowUp');
      fixture.detectChanges();

      expect(component.lastEmitted!.hours).toBe(21);
    });

    it('should toggle period on ArrowDown', () => {
      const btn = getPeriodButton(fixture)!;
      btn.focus();
      dispatchKeydown(btn, 'ArrowDown');
      fixture.detectChanges();

      expect(component.lastEmitted!.hours).toBe(21);
    });

    it('should set AM on A key', () => {
      component.time.set({ hours: 14, minutes: 0, seconds: 0 }); // PM
      fixture.detectChanges();

      const btn = getPeriodButton(fixture)!;
      btn.focus();
      dispatchKeydown(btn, 'a');
      fixture.detectChanges();

      expect(component.lastEmitted!.hours).toBe(2);
    });

    it('should set PM on P key', () => {
      const btn = getPeriodButton(fixture)!;
      btn.focus();
      dispatchKeydown(btn, 'p');
      fixture.detectChanges();

      expect(component.lastEmitted!.hours).toBe(21);
    });

    it('should not change when pressing A while already AM', () => {
      const btn = getPeriodButton(fixture)!;
      btn.focus();
      dispatchKeydown(btn, 'a');
      fixture.detectChanges();

      // Should remain unchanged (9 AM)
      expect(component.lastEmitted).toBeNull();
    });
  });

  describe('Focus navigation', () => {
    @Component({
      template: `
        <com-time-picker
          [value]="time()"
          [use12HourFormat]="true"
          [showSeconds]="true"
          (timeChange)="onTimeChange($event)"
        />
      `,
      imports: [ComTimePicker],
    })
    class FocusNavComponent {
      time = signal<ComTimeValue | null>({ hours: 10, minutes: 30, seconds: 0 });
      lastEmitted: ComTimeValue | null = null;

      onTimeChange(t: ComTimeValue | null): void {
        this.lastEmitted = t;
      }
    }

    let fixture: ComponentFixture<FocusNavComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [FocusNavComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(FocusNavComponent);
      fixture.detectChanges();
    });

    it('should move focus from hours to minutes on ArrowRight', () => {
      const hours = getHoursInput(fixture);
      hours.focus();
      dispatchKeydown(hours, 'ArrowRight');
      fixture.detectChanges();

      const activeEl = fixture.debugElement.query(By.css(':focus'));
      expect(activeEl?.nativeElement).toBe(getMinutesInput(fixture));
    });

    it('should move focus from minutes to seconds on ArrowRight', () => {
      const minutes = getMinutesInput(fixture);
      minutes.focus();
      dispatchKeydown(minutes, 'ArrowRight');
      fixture.detectChanges();

      const activeEl = fixture.debugElement.query(By.css(':focus'));
      expect(activeEl?.nativeElement).toBe(getSecondsInput(fixture));
    });

    it('should move focus from seconds to period on ArrowRight', () => {
      const seconds = getSecondsInput(fixture)!;
      seconds.focus();
      dispatchKeydown(seconds, 'ArrowRight');
      fixture.detectChanges();

      const activeEl = fixture.debugElement.query(By.css(':focus'));
      expect(activeEl?.nativeElement).toBe(getPeriodButton(fixture));
    });

    it('should move focus from minutes to hours on ArrowLeft', () => {
      const minutes = getMinutesInput(fixture);
      minutes.focus();
      dispatchKeydown(minutes, 'ArrowLeft');
      fixture.detectChanges();

      const activeEl = fixture.debugElement.query(By.css(':focus'));
      expect(activeEl?.nativeElement).toBe(getHoursInput(fixture));
    });

    it('should move focus from period to seconds on ArrowLeft', () => {
      const btn = getPeriodButton(fixture)!;
      btn.focus();
      dispatchKeydown(btn, 'ArrowLeft');
      fixture.detectChanges();

      const activeEl = fixture.debugElement.query(By.css(':focus'));
      expect(activeEl?.nativeElement).toBe(getSecondsInput(fixture));
    });
  });

  describe('Null value interactions', () => {
    @Component({
      template: `
        <com-time-picker
          [value]="time()"
          [use12HourFormat]="false"
          (timeChange)="onTimeChange($event)"
        />
      `,
      imports: [ComTimePicker],
    })
    class NullValueComponent {
      time = signal<ComTimeValue | null>(null);
      lastEmitted: ComTimeValue | null = null;

      onTimeChange(t: ComTimeValue | null): void {
        this.lastEmitted = t;
      }
    }

    let fixture: ComponentFixture<NullValueComponent>;
    let component: NullValueComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [NullValueComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(NullValueComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should initialize value from 0:0:0 on ArrowUp with null value', () => {
      const hours = getHoursInput(fixture);
      hours.focus();
      dispatchKeydown(hours, 'ArrowUp');
      fixture.detectChanges();

      expect(component.lastEmitted).toEqual({ hours: 1, minutes: 0, seconds: 0 });
    });

    it('should initialize value from digit input with null value', () => {
      const hours = getHoursInput(fixture);
      hours.focus();
      hours.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

      dispatchKeydown(hours, '9');
      fixture.detectChanges();

      expect(component.lastEmitted!.hours).toBe(9);
    });
  });

  describe('Placeholder', () => {
    @Component({
      template: `
        <com-time-picker
          [placeholder]="'hh'"
          [use12HourFormat]="false"
        />
      `,
      imports: [ComTimePicker],
    })
    class PlaceholderComponent {}

    let fixture: ComponentFixture<PlaceholderComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [PlaceholderComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(PlaceholderComponent);
      fixture.detectChanges();
    });

    it('should use custom placeholder on inputs', () => {
      expect(getHoursInput(fixture).placeholder).toBe('hh');
      expect(getMinutesInput(fixture).placeholder).toBe('hh');
    });
  });
});
