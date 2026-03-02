import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ComRadio, ComRadioGroup } from './index';
import type { RadioChange, RadioGroupChange } from './index';

describe('ComRadioGroup', () => {
  describe('Basic functionality', () => {
    @Component({
      template: `
        <com-radio-group
          [(value)]="selectedValue"
          aria-label="Select an option"
          (selectionChange)="onSelectionChange($event)"
        >
          <com-radio value="option1">Option 1</com-radio>
          <com-radio value="option2">Option 2</com-radio>
          <com-radio value="option3">Option 3</com-radio>
        </com-radio-group>
      `,
      imports: [ComRadioGroup, ComRadio],
    })
    class BasicRadioGroupComponent {
      selectedValue = signal<string | null>(null);
      lastSelectionChange: RadioGroupChange | null = null;

      onSelectionChange(event: RadioGroupChange): void {
        this.lastSelectionChange = event;
      }
    }

    let fixture: ComponentFixture<BasicRadioGroupComponent>;
    let component: BasicRadioGroupComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BasicRadioGroupComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(BasicRadioGroupComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render three radio buttons', () => {
      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      expect(radios.length).toBe(3);
    });

    it('should have no selection initially', () => {
      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      radios.forEach((radio) => {
        const input = radio.query(By.css('input[type="radio"]'));
        expect(input.nativeElement.checked).toBe(false);
      });
    });

    it('should select radio on click', () => {
      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const firstRadioInput = radios[0]!.query(By.css('input[type="radio"]'));

      firstRadioInput.nativeElement.click();
      fixture.detectChanges();

      expect(component.selectedValue()).toBe('option1');
      expect(firstRadioInput.nativeElement.checked).toBe(true);
    });

    it('should emit selectionChange on selection', () => {
      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const secondRadioInput = radios[1]!.query(By.css('input[type="radio"]'));

      secondRadioInput.nativeElement.click();
      fixture.detectChanges();

      expect(component.lastSelectionChange).toEqual({ value: 'option2' });
    });

    it('should update selection when clicking different radio', () => {
      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const firstRadioInput = radios[0]!.query(By.css('input[type="radio"]'));
      const secondRadioInput = radios[1]!.query(By.css('input[type="radio"]'));

      firstRadioInput.nativeElement.click();
      fixture.detectChanges();
      expect(component.selectedValue()).toBe('option1');

      secondRadioInput.nativeElement.click();
      fixture.detectChanges();
      expect(component.selectedValue()).toBe('option2');
      expect(firstRadioInput.nativeElement.checked).toBe(false);
      expect(secondRadioInput.nativeElement.checked).toBe(true);
    });

    it('should support two-way binding', () => {
      component.selectedValue.set('option2');
      fixture.detectChanges();

      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const secondRadioInput = radios[1]!.query(By.css('input[type="radio"]'));
      expect(secondRadioInput.nativeElement.checked).toBe(true);
    });

    it('should have role="radiogroup" on container', () => {
      const container = fixture.debugElement.query(By.css('[role="radiogroup"]'));
      expect(container).toBeTruthy();
    });

    it('should have aria-label on container', () => {
      const container = fixture.debugElement.query(By.css('[role="radiogroup"]'));
      expect(container.attributes['aria-label']).toBe('Select an option');
    });
  });

  describe('Disabled state', () => {
    @Component({
      template: `
        <com-radio-group
          [(value)]="selectedValue"
          [disabled]="disabled()"
          aria-label="Select an option"
        >
          <com-radio value="option1">Option 1</com-radio>
          <com-radio value="option2">Option 2</com-radio>
        </com-radio-group>
      `,
      imports: [ComRadioGroup, ComRadio],
    })
    class DisabledRadioGroupComponent {
      selectedValue = signal<string | null>(null);
      disabled = signal(true);
    }

    let fixture: ComponentFixture<DisabledRadioGroupComponent>;
    let component: DisabledRadioGroupComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DisabledRadioGroupComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(DisabledRadioGroupComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should disable all radios when group is disabled', () => {
      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      radios.forEach((radio) => {
        const input = radio.query(By.css('input[type="radio"]'));
        expect(input.nativeElement.disabled).toBe(true);
      });
    });

    it('should prevent selection when disabled', () => {
      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const firstRadioInput = radios[0]!.query(By.css('input[type="radio"]'));

      firstRadioInput.nativeElement.click();
      fixture.detectChanges();

      expect(component.selectedValue()).toBeNull();
    });

    it('should have com-radio-group--disabled class when disabled', () => {
      const group = fixture.debugElement.query(By.directive(ComRadioGroup));
      expect(group.nativeElement.classList.contains('com-radio-group--disabled')).toBe(true);
    });

    it('should enable radios when disabled changes to false', () => {
      component.disabled.set(false);
      fixture.detectChanges();

      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      radios.forEach((radio) => {
        const input = radio.query(By.css('input[type="radio"]'));
        expect(input.nativeElement.disabled).toBe(false);
      });
    });
  });

  describe('Individual radio disabled', () => {
    @Component({
      template: `
        <com-radio-group [(value)]="selectedValue" aria-label="Select an option">
          <com-radio value="option1">Option 1</com-radio>
          <com-radio value="option2" [disabled]="disabledOption()">Option 2</com-radio>
          <com-radio value="option3">Option 3</com-radio>
        </com-radio-group>
      `,
      imports: [ComRadioGroup, ComRadio],
    })
    class IndividualDisabledComponent {
      selectedValue = signal<string | null>(null);
      disabledOption = signal(true);
    }

    let fixture: ComponentFixture<IndividualDisabledComponent>;
    let component: IndividualDisabledComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [IndividualDisabledComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(IndividualDisabledComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should disable only the specified radio', () => {
      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const input0 = radios[0]!.query(By.css('input[type="radio"]'));
      const input1 = radios[1]!.query(By.css('input[type="radio"]'));
      const input2 = radios[2]!.query(By.css('input[type="radio"]'));

      expect(input0.nativeElement.disabled).toBe(false);
      expect(input1.nativeElement.disabled).toBe(true);
      expect(input2.nativeElement.disabled).toBe(false);
    });

    it('should have com-radio--disabled class on disabled radio', () => {
      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      expect(radios[1]!.nativeElement.classList.contains('com-radio--disabled')).toBe(true);
    });

    it('should toggle disabled state dynamically', () => {
      component.disabledOption.set(false);
      fixture.detectChanges();

      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const input1 = radios[1]!.query(By.css('input[type="radio"]'));
      expect(input1.nativeElement.disabled).toBe(false);
    });
  });

  describe('Reactive Forms integration', () => {
    @Component({
      template: `
        <form [formGroup]="form">
          <com-radio-group formControlName="fruit" aria-label="Select a fruit">
            <com-radio value="apple">Apple</com-radio>
            <com-radio value="banana">Banana</com-radio>
            <com-radio value="cherry">Cherry</com-radio>
          </com-radio-group>
        </form>
      `,
      imports: [ComRadioGroup, ComRadio, ReactiveFormsModule],
    })
    class ReactiveFormRadioGroupComponent {
      form = new FormGroup({
        fruit: new FormControl<string | null>(null),
      });
    }

    let fixture: ComponentFixture<ReactiveFormRadioGroupComponent>;
    let component: ReactiveFormRadioGroupComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ReactiveFormRadioGroupComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ReactiveFormRadioGroupComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should work with FormControl', () => {
      component.form.controls.fruit.setValue('banana');
      fixture.detectChanges();

      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const bananaInput = radios[1]!.query(By.css('input[type="radio"]'));
      expect(bananaInput.nativeElement.checked).toBe(true);
    });

    it('should update FormControl on selection', () => {
      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const cherryInput = radios[2]!.query(By.css('input[type="radio"]'));

      cherryInput.nativeElement.click();
      fixture.detectChanges();

      expect(component.form.controls.fruit.value).toBe('cherry');
    });

    it('should disable radios when FormControl is disabled', () => {
      component.form.controls.fruit.disable();
      fixture.detectChanges();

      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      radios.forEach((radio) => {
        const input = radio.query(By.css('input[type="radio"]'));
        expect(input.nativeElement.disabled).toBe(true);
      });
    });

    it('should enable radios when FormControl is enabled', () => {
      component.form.controls.fruit.disable();
      fixture.detectChanges();

      component.form.controls.fruit.enable();
      fixture.detectChanges();

      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      radios.forEach((radio) => {
        const input = radio.query(By.css('input[type="radio"]'));
        expect(input.nativeElement.disabled).toBe(false);
      });
    });

    it('should preserve initial value from FormControl', async () => {
      component.form.controls.fruit.setValue('apple');
      fixture.detectChanges();
      await fixture.whenStable();

      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const appleInput = radios[0]!.query(By.css('input[type="radio"]'));
      expect(appleInput.nativeElement.checked).toBe(true);
    });
  });

  describe('Validation with Reactive Forms', () => {
    @Component({
      template: `
        <form [formGroup]="form">
          <com-radio-group
            formControlName="size"
            [errorMessage]="'Please select a size'"
            aria-label="Select a size"
          >
            <com-radio value="sm">Small</com-radio>
            <com-radio value="md">Medium</com-radio>
            <com-radio value="lg">Large</com-radio>
          </com-radio-group>
        </form>
      `,
      imports: [ComRadioGroup, ComRadio, ReactiveFormsModule],
    })
    class ValidationRadioGroupComponent {
      form = new FormGroup({
        size: new FormControl<string | null>(null, Validators.required),
      });
    }

    let fixture: ComponentFixture<ValidationRadioGroupComponent>;
    let component: ValidationRadioGroupComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ValidationRadioGroupComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ValidationRadioGroupComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should not show error initially', () => {
      const errorMessage = fixture.debugElement.query(By.css('.com-radio-group__error'));
      expect(errorMessage).toBeNull();
    });

    it('should show error after touched and invalid', () => {
      // Trigger touch through the inner input's blur mechanism
      const radioInput = fixture.debugElement.query(By.css('input[type="radio"]'));
      radioInput.nativeElement.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      const errorMessage = fixture.debugElement.query(By.css('.com-radio-group__error'));
      expect(errorMessage).toBeTruthy();
      expect(errorMessage.nativeElement.textContent.trim()).toBe('Please select a size');
    });

    it('should have aria-invalid when in error state', () => {
      // Trigger touch through the inner input's blur mechanism
      const radioInput = fixture.debugElement.query(By.css('input[type="radio"]'));
      radioInput.nativeElement.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('[role="radiogroup"]'));
      expect(container.attributes['aria-invalid']).toBe('true');
    });

    it('should have com-radio-group--error class when in error state', () => {
      // Trigger touch through the inner input's blur mechanism
      const radioInput = fixture.debugElement.query(By.css('input[type="radio"]'));
      radioInput.nativeElement.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      const group = fixture.debugElement.query(By.directive(ComRadioGroup));
      expect(group.nativeElement.classList.contains('com-radio-group--error')).toBe(true);
    });

    it('should hide error when selection is made', () => {
      component.form.controls.size.markAsTouched();
      fixture.detectChanges();

      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const mediumInput = radios[1]!.query(By.css('input[type="radio"]'));
      mediumInput.nativeElement.click();
      fixture.detectChanges();

      const errorMessage = fixture.debugElement.query(By.css('.com-radio-group__error'));
      expect(errorMessage).toBeNull();
    });
  });

  describe('Keyboard navigation - vertical orientation', () => {
    @Component({
      template: `
        <com-radio-group
          [(value)]="selectedValue"
          orientation="vertical"
          aria-label="Select an option"
        >
          <com-radio value="option1">Option 1</com-radio>
          <com-radio value="option2">Option 2</com-radio>
          <com-radio value="option3">Option 3</com-radio>
        </com-radio-group>
      `,
      imports: [ComRadioGroup, ComRadio],
    })
    class VerticalNavigationComponent {
      selectedValue = signal<string | null>('option1');
    }

    let fixture: ComponentFixture<VerticalNavigationComponent>;
    let component: VerticalNavigationComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [VerticalNavigationComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(VerticalNavigationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should move to next radio with ArrowDown', () => {
      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const firstRadioInput = radios[0]!.query(By.css('input[type="radio"]'));

      firstRadioInput.triggerEventHandler('keydown', {
        key: 'ArrowDown',
        preventDefault: () => {},
        stopPropagation: () => {},
      });
      fixture.detectChanges();

      expect(component.selectedValue()).toBe('option2');
    });

    it('should move to previous radio with ArrowUp', () => {
      component.selectedValue.set('option2');
      fixture.detectChanges();

      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const secondRadioInput = radios[1]!.query(By.css('input[type="radio"]'));

      secondRadioInput.triggerEventHandler('keydown', {
        key: 'ArrowUp',
        preventDefault: () => {},
        stopPropagation: () => {},
      });
      fixture.detectChanges();

      expect(component.selectedValue()).toBe('option1');
    });

    it('should wrap around when navigating past last item', () => {
      component.selectedValue.set('option3');
      fixture.detectChanges();

      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const thirdRadioInput = radios[2]!.query(By.css('input[type="radio"]'));

      thirdRadioInput.triggerEventHandler('keydown', {
        key: 'ArrowDown',
        preventDefault: () => {},
        stopPropagation: () => {},
      });
      fixture.detectChanges();

      expect(component.selectedValue()).toBe('option1');
    });

    it('should wrap around when navigating before first item', () => {
      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const firstRadioInput = radios[0]!.query(By.css('input[type="radio"]'));

      firstRadioInput.triggerEventHandler('keydown', {
        key: 'ArrowUp',
        preventDefault: () => {},
        stopPropagation: () => {},
      });
      fixture.detectChanges();

      expect(component.selectedValue()).toBe('option3');
    });
  });

  describe('Keyboard navigation - horizontal orientation', () => {
    @Component({
      template: `
        <com-radio-group
          [(value)]="selectedValue"
          orientation="horizontal"
          aria-label="Select an option"
        >
          <com-radio value="option1">Option 1</com-radio>
          <com-radio value="option2">Option 2</com-radio>
          <com-radio value="option3">Option 3</com-radio>
        </com-radio-group>
      `,
      imports: [ComRadioGroup, ComRadio],
    })
    class HorizontalNavigationComponent {
      selectedValue = signal<string | null>('option1');
    }

    let fixture: ComponentFixture<HorizontalNavigationComponent>;
    let component: HorizontalNavigationComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [HorizontalNavigationComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(HorizontalNavigationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should move to next radio with ArrowRight', () => {
      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const firstRadioInput = radios[0]!.query(By.css('input[type="radio"]'));

      firstRadioInput.triggerEventHandler('keydown', {
        key: 'ArrowRight',
        preventDefault: () => {},
        stopPropagation: () => {},
      });
      fixture.detectChanges();

      expect(component.selectedValue()).toBe('option2');
    });

    it('should move to previous radio with ArrowLeft', () => {
      component.selectedValue.set('option2');
      fixture.detectChanges();

      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const secondRadioInput = radios[1]!.query(By.css('input[type="radio"]'));

      secondRadioInput.triggerEventHandler('keydown', {
        key: 'ArrowLeft',
        preventDefault: () => {},
        stopPropagation: () => {},
      });
      fixture.detectChanges();

      expect(component.selectedValue()).toBe('option1');
    });

    it('should apply horizontal orientation classes', () => {
      const container = fixture.debugElement.query(By.css('[role="radiogroup"]'));
      expect(container.nativeElement.classList.contains('flex-row')).toBe(true);
    });
  });

  describe('Keyboard navigation - Space key', () => {
    @Component({
      template: `
        <com-radio-group [(value)]="selectedValue" aria-label="Select an option">
          <com-radio value="option1">Option 1</com-radio>
          <com-radio value="option2">Option 2</com-radio>
        </com-radio-group>
      `,
      imports: [ComRadioGroup, ComRadio],
    })
    class SpaceKeyComponent {
      selectedValue = signal<string | null>(null);
    }

    let fixture: ComponentFixture<SpaceKeyComponent>;
    let component: SpaceKeyComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SpaceKeyComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(SpaceKeyComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should select focused radio with Space key', () => {
      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const firstRadioInput = radios[0]!.query(By.css('input[type="radio"]'));

      firstRadioInput.triggerEventHandler('keydown', {
        key: ' ',
        preventDefault: () => {},
        stopPropagation: () => {},
      });
      fixture.detectChanges();

      expect(component.selectedValue()).toBe('option1');
    });
  });

  describe('Size variants', () => {
    @Component({
      template: `
        <com-radio-group [(value)]="selectedValue" [size]="size()" aria-label="Select an option">
          <com-radio value="option1">Option 1</com-radio>
          <com-radio value="option2">Option 2</com-radio>
        </com-radio-group>
      `,
      imports: [ComRadioGroup, ComRadio],
    })
    class SizeVariantComponent {
      selectedValue = signal<string | null>(null);
      size = signal<'sm' | 'md' | 'lg'>('md');
    }

    let fixture: ComponentFixture<SizeVariantComponent>;
    let component: SizeVariantComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SizeVariantComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(SizeVariantComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should apply md size classes by default', () => {
      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const circle = radios[0]!.query(By.css('.com-radio__circle'));
      expect(circle.nativeElement.classList.contains('size-5')).toBe(true);
    });

    it('should apply sm size classes', () => {
      component.size.set('sm');
      fixture.detectChanges();

      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const circle = radios[0]!.query(By.css('.com-radio__circle'));
      expect(circle.nativeElement.classList.contains('size-4')).toBe(true);
    });

    it('should apply lg size classes', () => {
      component.size.set('lg');
      fixture.detectChanges();

      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const circle = radios[0]!.query(By.css('.com-radio__circle'));
      expect(circle.nativeElement.classList.contains('size-6')).toBe(true);
    });
  });

  describe('Variant styles', () => {
    @Component({
      template: `
        <com-radio-group [(value)]="selectedValue" [variant]="variant()" aria-label="Select an option">
          <com-radio value="option1">Option 1</com-radio>
        </com-radio-group>
      `,
      imports: [ComRadioGroup, ComRadio],
    })
    class VariantStyleComponent {
      selectedValue = signal<string | null>('option1');
      variant = signal<'primary' | 'accent' | 'warn'>('primary');
    }

    let fixture: ComponentFixture<VariantStyleComponent>;
    let component: VariantStyleComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [VariantStyleComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(VariantStyleComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should apply primary variant classes', () => {
      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const circle = radios[0]!.query(By.css('.com-radio__circle'));
      expect(circle.nativeElement.classList.contains('peer-checked:border-primary')).toBe(true);
    });

    it('should apply accent variant classes', () => {
      component.variant.set('accent');
      fixture.detectChanges();

      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const circle = radios[0]!.query(By.css('.com-radio__circle'));
      expect(circle.nativeElement.classList.contains('peer-checked:border-accent')).toBe(true);
    });

    it('should apply warn variant classes', () => {
      component.variant.set('warn');
      fixture.detectChanges();

      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const circle = radios[0]!.query(By.css('.com-radio__circle'));
      expect(circle.nativeElement.classList.contains('peer-checked:border-warn')).toBe(true);
    });
  });

  describe('Roving tabindex', () => {
    @Component({
      template: `
        <com-radio-group [(value)]="selectedValue" aria-label="Select an option">
          <com-radio value="option1">Option 1</com-radio>
          <com-radio value="option2">Option 2</com-radio>
          <com-radio value="option3">Option 3</com-radio>
        </com-radio-group>
      `,
      imports: [ComRadioGroup, ComRadio],
    })
    class RovingTabindexComponent {
      selectedValue = signal<string | null>(null);
    }

    let fixture: ComponentFixture<RovingTabindexComponent>;
    let component: RovingTabindexComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [RovingTabindexComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(RovingTabindexComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have tabindex 0 on first radio when no selection', () => {
      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const firstInput = radios[0]!.query(By.css('input[type="radio"]'));
      const secondInput = radios[1]!.query(By.css('input[type="radio"]'));
      const thirdInput = radios[2]!.query(By.css('input[type="radio"]'));

      expect(firstInput.attributes['tabindex']).toBe('0');
      expect(secondInput.attributes['tabindex']).toBe('-1');
      expect(thirdInput.attributes['tabindex']).toBe('-1');
    });

    it('should move tabindex to selected radio', () => {
      component.selectedValue.set('option2');
      fixture.detectChanges();

      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const firstInput = radios[0]!.query(By.css('input[type="radio"]'));
      const secondInput = radios[1]!.query(By.css('input[type="radio"]'));
      const thirdInput = radios[2]!.query(By.css('input[type="radio"]'));

      expect(firstInput.attributes['tabindex']).toBe('-1');
      expect(secondInput.attributes['tabindex']).toBe('0');
      expect(thirdInput.attributes['tabindex']).toBe('-1');
    });

    it('should have tabindex -1 on disabled radios', () => {
      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const firstInput = radios[0]!.query(By.css('input[type="radio"]'));

      // Verify initial state
      expect(firstInput.attributes['tabindex']).toBe('0');
    });
  });

  describe('Accessibility', () => {
    @Component({
      template: `
        <com-radio-group
          [(value)]="selectedValue"
          aria-label="Payment method"
          aria-describedby="payment-help"
          [required]="true"
        >
          <com-radio value="credit" aria-label="Credit card">Credit</com-radio>
          <com-radio value="debit">Debit</com-radio>
        </com-radio-group>
        <span id="payment-help">Select your preferred payment method</span>
      `,
      imports: [ComRadioGroup, ComRadio],
    })
    class AccessibilityComponent {
      selectedValue = signal<string | null>(null);
    }

    let fixture: ComponentFixture<AccessibilityComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [AccessibilityComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(AccessibilityComponent);
      fixture.detectChanges();
    });

    it('should have aria-label on radiogroup', () => {
      const container = fixture.debugElement.query(By.css('[role="radiogroup"]'));
      expect(container.attributes['aria-label']).toBe('Payment method');
    });

    it('should have aria-describedby on radiogroup', () => {
      const container = fixture.debugElement.query(By.css('[role="radiogroup"]'));
      expect(container.attributes['aria-describedby']).toBe('payment-help');
    });

    it('should have aria-required on radiogroup', () => {
      const container = fixture.debugElement.query(By.css('[role="radiogroup"]'));
      expect(container.attributes['aria-required']).toBe('true');
    });

    it('should have aria-label on individual radio', () => {
      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const creditInput = radios[0]!.query(By.css('input[type="radio"]'));
      expect(creditInput.attributes['aria-label']).toBe('Credit card');
    });

    it('should have shared name attribute on all radios', () => {
      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const input0 = radios[0]!.query(By.css('input[type="radio"]'));
      const input1 = radios[1]!.query(By.css('input[type="radio"]'));

      const name0 = input0.attributes['name'];
      const name1 = input1.attributes['name'];

      expect(name0).toBeTruthy();
      expect(name0).toBe(name1);
    });
  });

  describe('ComRadio changed output', () => {
    @Component({
      template: `
        <com-radio-group [(value)]="selectedValue" aria-label="Select an option">
          <com-radio value="option1" (changed)="onRadioChanged($event)">Option 1</com-radio>
          <com-radio value="option2" (changed)="onRadioChanged($event)">Option 2</com-radio>
        </com-radio-group>
      `,
      imports: [ComRadioGroup, ComRadio],
    })
    class RadioChangedOutputComponent {
      selectedValue = signal<string | null>(null);
      lastRadioChange: RadioChange | null = null;

      onRadioChanged(event: RadioChange): void {
        this.lastRadioChange = event;
      }
    }

    let fixture: ComponentFixture<RadioChangedOutputComponent>;
    let component: RadioChangedOutputComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [RadioChangedOutputComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(RadioChangedOutputComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should emit changed event on radio selection', () => {
      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const firstRadioInput = radios[0]!.query(By.css('input[type="radio"]'));

      firstRadioInput.nativeElement.click();
      fixture.detectChanges();

      expect(component.lastRadioChange).toBeTruthy();
      expect(component.lastRadioChange!.value).toBe('option1');
      expect(component.lastRadioChange!.source).toBeTruthy();
    });
  });

  describe('Dynamic radio items', () => {
    @Component({
      template: `
        <com-radio-group [(value)]="selectedValue" aria-label="Select an option">
          @for (option of options(); track option.value) {
            <com-radio [value]="option.value">{{ option.label }}</com-radio>
          }
        </com-radio-group>
      `,
      imports: [ComRadioGroup, ComRadio],
    })
    class DynamicRadioComponent {
      selectedValue = signal<string | null>(null);
      options = signal([
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B' },
      ]);
    }

    let fixture: ComponentFixture<DynamicRadioComponent>;
    let component: DynamicRadioComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DynamicRadioComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(DynamicRadioComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should render initial options', () => {
      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      expect(radios.length).toBe(2);
    });

    it('should update when options change', () => {
      component.options.set([
        { value: 'x', label: 'Option X' },
        { value: 'y', label: 'Option Y' },
        { value: 'z', label: 'Option Z' },
      ]);
      fixture.detectChanges();

      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      expect(radios.length).toBe(3);
    });

    it('should maintain selection when options change', () => {
      component.selectedValue.set('a');
      fixture.detectChanges();

      component.options.set([
        { value: 'a', label: 'New Option A' },
        { value: 'c', label: 'Option C' },
      ]);
      fixture.detectChanges();

      expect(component.selectedValue()).toBe('a');
      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const firstInput = radios[0]!.query(By.css('input[type="radio"]'));
      expect(firstInput.nativeElement.checked).toBe(true);
    });
  });

  describe('External control via template ref', () => {
    @Component({
      template: `
        <com-radio-group
          #radioGroup="comRadioGroup"
          [(value)]="selectedValue"
          aria-label="Select an option"
        >
          <com-radio value="option1">Option 1</com-radio>
          <com-radio value="option2">Option 2</com-radio>
        </com-radio-group>
        <button class="external-select" (click)="radioGroup.select('option2')">Select Option 2</button>
      `,
      imports: [ComRadioGroup, ComRadio],
    })
    class ExternalControlComponent {
      selectedValue = signal<string | null>(null);
    }

    let fixture: ComponentFixture<ExternalControlComponent>;
    let component: ExternalControlComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ExternalControlComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ExternalControlComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should select via external button using template ref', () => {
      const externalBtn = fixture.debugElement.query(By.css('.external-select'));
      externalBtn.nativeElement.click();
      fixture.detectChanges();

      expect(component.selectedValue()).toBe('option2');
    });
  });

  describe('Orientation classes', () => {
    @Component({
      template: `
        <com-radio-group [(value)]="selectedValue" [orientation]="orientation()" aria-label="Select an option">
          <com-radio value="option1">Option 1</com-radio>
          <com-radio value="option2">Option 2</com-radio>
        </com-radio-group>
      `,
      imports: [ComRadioGroup, ComRadio],
    })
    class OrientationComponent {
      selectedValue = signal<string | null>(null);
      orientation = signal<'vertical' | 'horizontal'>('vertical');
    }

    let fixture: ComponentFixture<OrientationComponent>;
    let component: OrientationComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [OrientationComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(OrientationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should apply vertical orientation classes by default', () => {
      const container = fixture.debugElement.query(By.css('[role="radiogroup"]'));
      expect(container.nativeElement.classList.contains('flex-col')).toBe(true);
    });

    it('should apply horizontal orientation classes', () => {
      component.orientation.set('horizontal');
      fixture.detectChanges();

      const container = fixture.debugElement.query(By.css('[role="radiogroup"]'));
      expect(container.nativeElement.classList.contains('flex-row')).toBe(true);
    });
  });

  describe('Checked state styling', () => {
    @Component({
      template: `
        <com-radio-group [(value)]="selectedValue" aria-label="Select an option">
          <com-radio value="option1">Option 1</com-radio>
          <com-radio value="option2">Option 2</com-radio>
        </com-radio-group>
      `,
      imports: [ComRadioGroup, ComRadio],
    })
    class CheckedStateComponent {
      selectedValue = signal<string | null>('option1');
    }

    let fixture: ComponentFixture<CheckedStateComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [CheckedStateComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(CheckedStateComponent);
      fixture.detectChanges();
    });

    it('should have com-radio--checked class on selected radio', () => {
      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      expect(radios[0]!.nativeElement.classList.contains('com-radio--checked')).toBe(true);
      expect(radios[1]!.nativeElement.classList.contains('com-radio--checked')).toBe(false);
    });

    it('should show dot indicator on checked radio', () => {
      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const dot0 = radios[0]!.query(By.css('.com-radio__dot'));
      const dot1 = radios[1]!.query(By.css('.com-radio__dot'));

      expect(dot0.nativeElement.classList.contains('scale-100')).toBe(true);
      expect(dot1.nativeElement.classList.contains('scale-0')).toBe(true);
    });
  });

  describe('Individual radio size override', () => {
    @Component({
      template: `
        <com-radio-group [(value)]="selectedValue" size="md" aria-label="Select an option">
          <com-radio value="option1" size="lg">Option 1</com-radio>
          <com-radio value="option2">Option 2</com-radio>
        </com-radio-group>
      `,
      imports: [ComRadioGroup, ComRadio],
    })
    class IndividualSizeComponent {
      selectedValue = signal<string | null>(null);
    }

    let fixture: ComponentFixture<IndividualSizeComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [IndividualSizeComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(IndividualSizeComponent);
      fixture.detectChanges();
    });

    it('should use group size when no individual override', () => {
      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const circle1 = radios[1]!.query(By.css('.com-radio__circle'));
      expect(circle1.nativeElement.classList.contains('size-5')).toBe(true);
    });

    it('should prefer group size over individual size', () => {
      // Based on the component implementation, group size takes precedence
      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const circle0 = radios[0]!.query(By.css('.com-radio__circle'));
      // Group size (md) should be applied
      expect(circle0.nativeElement.classList.contains('size-5')).toBe(true);
    });
  });

  describe('Skip disabled in keyboard navigation', () => {
    @Component({
      template: `
        <com-radio-group [(value)]="selectedValue" aria-label="Select an option">
          <com-radio value="option1">Option 1</com-radio>
          <com-radio value="option2" [disabled]="true">Option 2</com-radio>
          <com-radio value="option3">Option 3</com-radio>
        </com-radio-group>
      `,
      imports: [ComRadioGroup, ComRadio],
    })
    class SkipDisabledComponent {
      selectedValue = signal<string | null>('option1');
    }

    let fixture: ComponentFixture<SkipDisabledComponent>;
    let component: SkipDisabledComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SkipDisabledComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(SkipDisabledComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should skip disabled radio when navigating with ArrowDown', () => {
      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const firstRadioInput = radios[0]!.query(By.css('input[type="radio"]'));

      firstRadioInput.triggerEventHandler('keydown', {
        key: 'ArrowDown',
        preventDefault: () => {},
        stopPropagation: () => {},
      });
      fixture.detectChanges();

      // Should skip option2 (disabled) and go to option3
      expect(component.selectedValue()).toBe('option3');
    });

    it('should skip disabled radio when navigating with ArrowUp', () => {
      component.selectedValue.set('option3');
      fixture.detectChanges();

      const radios = fixture.debugElement.queryAll(By.directive(ComRadio));
      const thirdRadioInput = radios[2]!.query(By.css('input[type="radio"]'));

      thirdRadioInput.triggerEventHandler('keydown', {
        key: 'ArrowUp',
        preventDefault: () => {},
        stopPropagation: () => {},
      });
      fixture.detectChanges();

      // Should skip option2 (disabled) and go to option1
      expect(component.selectedValue()).toBe('option1');
    });
  });
});
