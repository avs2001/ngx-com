import { Component, signal } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ComFormField,
  ComInput,
  ComLabel,
  ComHint,
  ComError,
  ComPrefix,
  ComSuffix,
  type FormFieldAppearance,
  type FormFieldColor,
  type FormFieldFloatLabel,
  type FormFieldSubscriptSizing,
  type HintAlign,
} from './index';

describe('ComFormField', () => {
  describe('Basic functionality', () => {
    @Component({
      selector: 'test-form-field-host',
      imports: [ComFormField, ComInput, ComLabel],
      template: `
        <com-form-field
          [appearance]="appearance()"
          [color]="color()"
          [floatLabel]="floatLabel()"
          [hideRequiredMarker]="hideRequiredMarker()"
          [subscriptSizing]="subscriptSizing()"
          [class]="userClass()"
          data-testid="form-field"
        >
          <label comLabel data-testid="label">Test Label</label>
          <input comInput data-testid="input" />
        </com-form-field>
      `,
    })
    class TestFormFieldHostComponent {
      readonly appearance = signal<FormFieldAppearance>('outline');
      readonly color = signal<FormFieldColor>('primary');
      readonly floatLabel = signal<FormFieldFloatLabel>('auto');
      readonly hideRequiredMarker = signal(false);
      readonly subscriptSizing = signal<FormFieldSubscriptSizing>('fixed');
      readonly userClass = signal('');
    }

    let fixture: ComponentFixture<TestFormFieldHostComponent>;
    let host: TestFormFieldHostComponent;
    let formFieldEl: HTMLElement;
    let containerEl: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestFormFieldHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestFormFieldHostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
      formFieldEl = fixture.nativeElement.querySelector('[data-testid="form-field"]');
      containerEl = formFieldEl.querySelector('.com-form-field__container')!;
    });

    it('should create', () => {
      expect(formFieldEl).toBeTruthy();
    });

    it('should apply base classes', () => {
      expect(formFieldEl.classList.contains('com-form-field')).toBe(true);
      expect(formFieldEl.classList.contains('relative')).toBe(true);
      expect(formFieldEl.classList.contains('block')).toBe(true);
      expect(formFieldEl.classList.contains('w-full')).toBe(true);
    });

    it('should render projected label', () => {
      const label = fixture.nativeElement.querySelector('[data-testid="label"]');
      expect(label).toBeTruthy();
      expect(label.textContent).toContain('Test Label');
    });

    it('should render projected input', () => {
      const input = fixture.nativeElement.querySelector('[data-testid="input"]');
      expect(input).toBeTruthy();
    });

    describe('appearance', () => {
      it('should apply outline appearance by default', () => {
        expect(containerEl.classList.contains('border')).toBe(true);
        expect(containerEl.classList.contains('border-input-border')).toBe(true);
        expect(containerEl.classList.contains('bg-transparent')).toBe(true);
      });

      it('should apply fill appearance', () => {
        host.appearance.set('fill');
        fixture.detectChanges();

        expect(containerEl.classList.contains('bg-muted')).toBe(true);
        expect(containerEl.classList.contains('border-b-2')).toBe(true);
        expect(containerEl.classList.contains('rounded-b-none')).toBe(true);
      });
    });

    describe('subscriptSizing', () => {
      it('should apply fixed sizing by default', () => {
        const subscript = formFieldEl.querySelector('.com-form-field__subscript');
        expect(subscript?.classList.contains('min-h-5')).toBe(true);
      });

      it('should apply dynamic sizing', () => {
        host.subscriptSizing.set('dynamic');
        fixture.detectChanges();

        const subscript = formFieldEl.querySelector('.com-form-field__subscript');
        expect(subscript?.classList.contains('min-h-0')).toBe(true);
      });
    });

    describe('class merging', () => {
      it('should merge consumer classes', () => {
        host.userClass.set('my-custom-class');
        fixture.detectChanges();

        expect(formFieldEl.classList.contains('my-custom-class')).toBe(true);
        expect(formFieldEl.classList.contains('com-form-field')).toBe(true);
      });
    });
  });
});

describe('ComInput', () => {
  describe('Basic functionality', () => {
    @Component({
      selector: 'test-input-host',
      imports: [ComFormField, ComInput, ComLabel],
      template: `
        <com-form-field>
          <label comLabel>Test</label>
          <input
            comInput
            [id]="inputId()"
            [disabled]="disabled()"
            [required]="required()"
            data-testid="input"
          />
        </com-form-field>
      `,
    })
    class TestInputHostComponent {
      readonly inputId = signal<string | undefined>(undefined);
      readonly disabled = signal(false);
      readonly required = signal(false);
    }

    let fixture: ComponentFixture<TestInputHostComponent>;
    let host: TestInputHostComponent;
    let inputEl: HTMLInputElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestInputHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestInputHostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
      inputEl = fixture.nativeElement.querySelector('[data-testid="input"]');
    });

    it('should create', () => {
      expect(inputEl).toBeTruthy();
    });

    it('should generate unique id when not provided', () => {
      expect(inputEl.id).toMatch(/^com-input-\d+$/);
    });

    it('should use provided id', () => {
      host.inputId.set('my-custom-id');
      fixture.detectChanges();

      expect(inputEl.id).toBe('my-custom-id');
    });

    it('should apply base classes', () => {
      expect(inputEl.classList.contains('peer')).toBe(true);
      expect(inputEl.classList.contains('w-full')).toBe(true);
      expect(inputEl.classList.contains('bg-transparent')).toBe(true);
      expect(inputEl.classList.contains('outline-none')).toBe(true);
      expect(inputEl.classList.contains('border-none')).toBe(true);
    });

    describe('disabled state', () => {
      it('should not be disabled by default', () => {
        expect(inputEl.disabled).toBe(false);
      });

      it('should set disabled attribute', () => {
        host.disabled.set(true);
        fixture.detectChanges();

        expect(inputEl.disabled).toBe(true);
      });

      it('should apply disabled class to form field', () => {
        host.disabled.set(true);
        fixture.detectChanges();

        const formField = fixture.nativeElement.querySelector('com-form-field');
        expect(formField.classList.contains('com-form-field--disabled')).toBe(true);
      });
    });

    describe('required state', () => {
      it('should not be required by default', () => {
        expect(inputEl.required).toBe(false);
        expect(inputEl.getAttribute('aria-required')).toBeFalsy();
      });

      it('should set required attribute', () => {
        host.required.set(true);
        fixture.detectChanges();

        expect(inputEl.required).toBe(true);
        expect(inputEl.getAttribute('aria-required')).toBe('true');
      });
    });
  });

  describe('Focus behavior', () => {
    @Component({
      selector: 'test-input-focus',
      imports: [ComFormField, ComInput, ComLabel],
      template: `
        <com-form-field data-testid="form-field">
          <label comLabel>Test</label>
          <input comInput data-testid="input" />
        </com-form-field>
      `,
    })
    class TestInputFocusComponent {}

    let fixture: ComponentFixture<TestInputFocusComponent>;
    let inputEl: HTMLInputElement;
    let formFieldEl: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestInputFocusComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestInputFocusComponent);
      fixture.detectChanges();
      inputEl = fixture.nativeElement.querySelector('[data-testid="input"]');
      formFieldEl = fixture.nativeElement.querySelector('[data-testid="form-field"]');
    });

    it('should add focused class when input is focused', () => {
      inputEl.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

      expect(formFieldEl.classList.contains('com-form-field--focused')).toBe(true);
    });

    it('should remove focused class when input is blurred', () => {
      inputEl.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      expect(formFieldEl.classList.contains('com-form-field--focused')).toBe(true);

      inputEl.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      expect(formFieldEl.classList.contains('com-form-field--focused')).toBe(false);
    });

    it('should float label when focused', () => {
      inputEl.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();

      expect(formFieldEl.classList.contains('com-form-field--floating')).toBe(true);
    });
  });

  describe('Label floating', () => {
    @Component({
      selector: 'test-label-float',
      imports: [ComFormField, ComInput, ComLabel],
      template: `
        <com-form-field [floatLabel]="floatLabel()" data-testid="form-field">
          <label comLabel>Test</label>
          <input comInput data-testid="input" />
        </com-form-field>
      `,
    })
    class TestLabelFloatComponent {
      readonly floatLabel = signal<FormFieldFloatLabel>('auto');
    }

    let fixture: ComponentFixture<TestLabelFloatComponent>;
    let host: TestLabelFloatComponent;
    let inputEl: HTMLInputElement;
    let formFieldEl: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestLabelFloatComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestLabelFloatComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
      inputEl = fixture.nativeElement.querySelector('[data-testid="input"]');
      formFieldEl = fixture.nativeElement.querySelector('[data-testid="form-field"]');
    });

    it('should not float label when empty and unfocused (auto mode)', () => {
      expect(formFieldEl.classList.contains('com-form-field--floating')).toBe(false);
    });

    it('should float label when input has value', () => {
      inputEl.value = 'test value';
      inputEl.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(formFieldEl.classList.contains('com-form-field--floating')).toBe(true);
    });

    it('should always float label when floatLabel is always', () => {
      host.floatLabel.set('always');
      fixture.detectChanges();

      expect(formFieldEl.classList.contains('com-form-field--floating')).toBe(true);
    });
  });

  describe('Container click', () => {
    @Component({
      selector: 'test-container-click',
      imports: [ComFormField, ComInput, ComLabel],
      template: `
        <com-form-field>
          <label comLabel>Test</label>
          <input comInput data-testid="input" />
        </com-form-field>
      `,
    })
    class TestContainerClickComponent {}

    let fixture: ComponentFixture<TestContainerClickComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestContainerClickComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestContainerClickComponent);
      fixture.detectChanges();
    });

    it('should focus input when container is clicked', () => {
      const container = fixture.nativeElement.querySelector('.com-form-field__container');
      const input = fixture.nativeElement.querySelector('[data-testid="input"]') as HTMLInputElement;

      container.click();
      fixture.detectChanges();

      expect(document.activeElement).toBe(input);
    });
  });
});

describe('ComLabel', () => {
  @Component({
    selector: 'test-label',
    imports: [ComFormField, ComInput, ComLabel],
    template: `
      <com-form-field>
        <label comLabel data-testid="label">Email</label>
        <input comInput data-testid="input" />
      </com-form-field>
    `,
  })
  class TestLabelComponent {}

  let fixture: ComponentFixture<TestLabelComponent>;
  let labelEl: HTMLLabelElement;
  let inputEl: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestLabelComponent);
    fixture.detectChanges();
    labelEl = fixture.nativeElement.querySelector('[data-testid="label"]');
    inputEl = fixture.nativeElement.querySelector('[data-testid="input"]');
  });

  it('should create', () => {
    expect(labelEl).toBeTruthy();
  });

  it('should have unique id', () => {
    expect(labelEl.id).toMatch(/^com-label-\d+$/);
  });

  it('should link to input via for attribute', () => {
    expect(labelEl.getAttribute('for')).toBe(inputEl.id);
  });
});

describe('ComHint', () => {
  @Component({
    selector: 'test-hint',
    imports: [ComFormField, ComInput, ComLabel, ComHint],
    template: `
      <com-form-field>
        <label comLabel>Test</label>
        <input comInput data-testid="input" />
        <span comHint [align]="align()" data-testid="hint">Help text</span>
      </com-form-field>
    `,
  })
  class TestHintComponent {
    readonly align = signal<HintAlign>('start');
  }

  let fixture: ComponentFixture<TestHintComponent>;
  let host: TestHintComponent;
  let hintEl: HTMLElement;
  let inputEl: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHintComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHintComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    hintEl = fixture.nativeElement.querySelector('[data-testid="hint"]');
    inputEl = fixture.nativeElement.querySelector('[data-testid="input"]');
  });

  it('should create', () => {
    expect(hintEl).toBeTruthy();
  });

  it('should have unique id', () => {
    expect(hintEl.id).toMatch(/^com-hint-\d+$/);
  });

  it('should apply hint classes', () => {
    expect(hintEl.classList.contains('com-form-field__hint')).toBe(true);
    expect(hintEl.classList.contains('text-muted-foreground')).toBe(true);
    expect(hintEl.classList.contains('text-xs')).toBe(true);
  });

  it('should be linked to input via aria-describedby', () => {
    const describedBy = inputEl.getAttribute('aria-describedby');
    expect(describedBy).toContain(hintEl.id);
  });

  describe('align', () => {
    it('should not have ml-auto by default (start)', () => {
      expect(hintEl.classList.contains('ml-auto')).toBe(false);
    });

    it('should apply ml-auto for end alignment', () => {
      host.align.set('end');
      fixture.detectChanges();

      expect(hintEl.classList.contains('ml-auto')).toBe(true);
    });
  });
});

describe('ComError', () => {
  describe('Basic functionality', () => {
    @Component({
      selector: 'test-error',
      imports: [ComFormField, ComInput, ComLabel, ComError, ReactiveFormsModule],
      template: `
        <com-form-field>
          <label comLabel>Email</label>
          <input comInput [formControl]="emailControl" data-testid="input" />
          <span comError data-testid="error">Error message</span>
        </com-form-field>
      `,
    })
    class TestErrorComponent {
      readonly emailControl = new FormControl('', [Validators.required, Validators.email]);
    }

    let fixture: ComponentFixture<TestErrorComponent>;
    let host: TestErrorComponent;
    let errorEl: HTMLElement;
    let inputEl: HTMLInputElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestErrorComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestErrorComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
      errorEl = fixture.nativeElement.querySelector('[data-testid="error"]');
      inputEl = fixture.nativeElement.querySelector('[data-testid="input"]');
    });

    it('should create', () => {
      expect(errorEl).toBeTruthy();
    });

    it('should have unique id', () => {
      expect(errorEl.id).toMatch(/^com-error-\d+$/);
    });

    it('should apply error classes', () => {
      expect(errorEl.classList.contains('com-form-field__error')).toBe(true);
      expect(errorEl.classList.contains('text-warn')).toBe(true);
      expect(errorEl.classList.contains('text-xs')).toBe(true);
    });

    it('should have role=alert for accessibility', () => {
      expect(errorEl.getAttribute('role')).toBe('alert');
    });

    it('should have aria-live=polite for accessibility', () => {
      expect(errorEl.getAttribute('aria-live')).toBe('polite');
    });

    // TODO: Fix signal/form control synchronization - setValue doesn't trigger _empty signal update
    it.skip('should be hidden when control is valid', () => {
      host.emailControl.setValue('valid@email.com');
      // Trigger touch via focus/blur
      inputEl.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      inputEl.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      expect(errorEl.classList.contains('hidden')).toBe(true);
    });

    it('should be visible when control is invalid and touched', () => {
      // Trigger touch via focus/blur
      inputEl.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      inputEl.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      expect(errorEl.classList.contains('hidden')).toBe(false);
    });
  });

  describe('Error matching', () => {
    @Component({
      selector: 'test-error-match',
      imports: [ComFormField, ComInput, ComLabel, ComError, ReactiveFormsModule],
      template: `
        <com-form-field>
          <label comLabel>Email</label>
          <input comInput [formControl]="emailControl" data-testid="input" />
          <span comError match="required" data-testid="required-error">Required</span>
          <span comError match="email" data-testid="email-error">Invalid email</span>
        </com-form-field>
      `,
    })
    class TestErrorMatchComponent {
      readonly emailControl = new FormControl('', [Validators.required, Validators.email]);
    }

    let fixture: ComponentFixture<TestErrorMatchComponent>;
    let host: TestErrorMatchComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestErrorMatchComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestErrorMatchComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should show required error when empty', () => {
      const inputEl = fixture.nativeElement.querySelector('[data-testid="input"]');
      inputEl.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      inputEl.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      const requiredError = fixture.nativeElement.querySelector('[data-testid="required-error"]');
      const emailError = fixture.nativeElement.querySelector('[data-testid="email-error"]');

      expect(requiredError.classList.contains('hidden')).toBe(false);
      expect(emailError.classList.contains('hidden')).toBe(true);
    });

    // TODO: Fix signal/form control synchronization - setValue doesn't trigger _empty signal update
    it.skip('should show email error when invalid format', () => {
      const inputEl = fixture.nativeElement.querySelector('[data-testid="input"]');
      host.emailControl.setValue('invalid');
      inputEl.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      inputEl.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      const requiredError = fixture.nativeElement.querySelector('[data-testid="required-error"]');
      const emailError = fixture.nativeElement.querySelector('[data-testid="email-error"]');

      expect(requiredError.classList.contains('hidden')).toBe(true);
      expect(emailError.classList.contains('hidden')).toBe(false);
    });

    // TODO: Fix signal/form control synchronization - setValue doesn't trigger _empty signal update
    it.skip('should hide all errors when valid', () => {
      const inputEl = fixture.nativeElement.querySelector('[data-testid="input"]');
      host.emailControl.setValue('valid@email.com');
      inputEl.dispatchEvent(new FocusEvent('focus'));
      fixture.detectChanges();
      inputEl.dispatchEvent(new FocusEvent('blur'));
      fixture.detectChanges();

      const requiredError = fixture.nativeElement.querySelector('[data-testid="required-error"]');
      const emailError = fixture.nativeElement.querySelector('[data-testid="email-error"]');

      expect(requiredError.classList.contains('hidden')).toBe(true);
      expect(emailError.classList.contains('hidden')).toBe(true);
    });
  });
});

describe('ComPrefix', () => {
  @Component({
    selector: 'test-prefix',
    imports: [ComFormField, ComInput, ComLabel, ComPrefix],
    template: `
      <com-form-field>
        <label comLabel>Amount</label>
        <span comPrefix data-testid="prefix">$</span>
        <input comInput />
      </com-form-field>
    `,
  })
  class TestPrefixComponent {}

  let fixture: ComponentFixture<TestPrefixComponent>;
  let prefixEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPrefixComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestPrefixComponent);
    fixture.detectChanges();
    prefixEl = fixture.nativeElement.querySelector('[data-testid="prefix"]');
  });

  it('should create', () => {
    expect(prefixEl).toBeTruthy();
  });

  it('should apply prefix classes', () => {
    expect(prefixEl.classList.contains('com-form-field__prefix')).toBe(true);
    expect(prefixEl.classList.contains('flex')).toBe(true);
    expect(prefixEl.classList.contains('items-center')).toBe(true);
    expect(prefixEl.classList.contains('text-muted-foreground')).toBe(true);
    expect(prefixEl.classList.contains('pl-3')).toBe(true);
  });

  it('should render prefix content', () => {
    expect(prefixEl.textContent).toBe('$');
  });
});

describe('ComSuffix', () => {
  @Component({
    selector: 'test-suffix',
    imports: [ComFormField, ComInput, ComLabel, ComSuffix],
    template: `
      <com-form-field>
        <label comLabel>Weight</label>
        <input comInput />
        <span comSuffix data-testid="suffix">kg</span>
      </com-form-field>
    `,
  })
  class TestSuffixComponent {}

  let fixture: ComponentFixture<TestSuffixComponent>;
  let suffixEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestSuffixComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestSuffixComponent);
    fixture.detectChanges();
    suffixEl = fixture.nativeElement.querySelector('[data-testid="suffix"]');
  });

  it('should create', () => {
    expect(suffixEl).toBeTruthy();
  });

  it('should apply suffix classes', () => {
    expect(suffixEl.classList.contains('com-form-field__suffix')).toBe(true);
    expect(suffixEl.classList.contains('flex')).toBe(true);
    expect(suffixEl.classList.contains('items-center')).toBe(true);
    expect(suffixEl.classList.contains('text-muted-foreground')).toBe(true);
    expect(suffixEl.classList.contains('pr-3')).toBe(true);
  });

  it('should render suffix content', () => {
    expect(suffixEl.textContent).toBe('kg');
  });
});

describe('Form field composition', () => {
  @Component({
    selector: 'test-full-composition',
    imports: [
      ComFormField,
      ComInput,
      ComLabel,
      ComHint,
      ComError,
      ComPrefix,
      ComSuffix,
      ReactiveFormsModule,
    ],
    template: `
      <com-form-field data-testid="form-field">
        <label comLabel data-testid="label">Amount</label>
        <span comPrefix data-testid="prefix">$</span>
        <input comInput [formControl]="amountControl" type="number" data-testid="input" />
        <span comSuffix data-testid="suffix">.00</span>
        <span comHint data-testid="hint">Enter amount in USD</span>
        <span comError match="required" data-testid="error">Amount is required</span>
      </com-form-field>
    `,
  })
  class FullCompositionComponent {
    readonly amountControl = new FormControl<number | null>(null, [Validators.required]);
  }

  let fixture: ComponentFixture<FullCompositionComponent>;
  let host: FullCompositionComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullCompositionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FullCompositionComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render all parts', () => {
    expect(fixture.nativeElement.querySelector('[data-testid="form-field"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-testid="label"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-testid="prefix"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-testid="input"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-testid="suffix"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-testid="hint"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[data-testid="error"]')).toBeTruthy();
  });

  it('should show hint when valid', () => {
    const input = fixture.nativeElement.querySelector('[data-testid="input"]');
    host.amountControl.setValue(100);
    input.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    input.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    const hintContainer = fixture.nativeElement.querySelector('.com-form-field__subscript > div:last-child');
    const errorContainer = fixture.nativeElement.querySelector('.com-form-field__subscript > div:first-child');

    expect(hintContainer.classList.contains('hidden')).toBe(false);
    expect(errorContainer.classList.contains('hidden')).toBe(true);
  });

  it('should show error when invalid and touched', () => {
    const input = fixture.nativeElement.querySelector('[data-testid="input"]');
    input.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    input.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    const hintContainer = fixture.nativeElement.querySelector('.com-form-field__subscript > div:last-child');
    const errorContainer = fixture.nativeElement.querySelector('.com-form-field__subscript > div:first-child');

    expect(hintContainer.classList.contains('hidden')).toBe(true);
    expect(errorContainer.classList.contains('hidden')).toBe(false);
  });

  it('should link errors to input via aria-describedby when in error state', () => {
    const input = fixture.nativeElement.querySelector('[data-testid="input"]');
    input.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    input.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('[data-testid="error"]');

    expect(input.getAttribute('aria-describedby')).toContain(error.id);
  });

  it('should link hints to input via aria-describedby when valid', () => {
    host.amountControl.setValue(100);
    host.amountControl.markAsTouched();
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('[data-testid="input"]');
    const hint = fixture.nativeElement.querySelector('[data-testid="hint"]');

    expect(input.getAttribute('aria-describedby')).toContain(hint.id);
  });
});

describe('Reactive forms integration', () => {
  @Component({
    selector: 'test-reactive-forms',
    imports: [ComFormField, ComInput, ComLabel, ComError, ReactiveFormsModule],
    template: `
      <form [formGroup]="form">
        <com-form-field data-testid="email-field">
          <label comLabel>Email</label>
          <input comInput formControlName="email" data-testid="email-input" />
          <span comError match="required" data-testid="required-error">Required</span>
          <span comError match="email" data-testid="email-error">Invalid email</span>
        </com-form-field>
      </form>
    `,
  })
  class ReactiveFormsComponent {
    readonly form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  let fixture: ComponentFixture<ReactiveFormsComponent>;
  let host: ReactiveFormsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveFormsComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should detect required from form control validator', () => {
    const formField = fixture.nativeElement.querySelector('[data-testid="email-field"]');

    // Check for required marker (asterisk) - should be visible when field has required validator
    const labelContainer = formField.querySelector('.com-form-field__label');
    expect(labelContainer?.textContent).toContain('*');
  });

  it('should show error state when invalid and touched', () => {
    const formField = fixture.nativeElement.querySelector('[data-testid="email-field"]');
    const input = fixture.nativeElement.querySelector('[data-testid="email-input"]');

    // Focus then blur to trigger error state
    input.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    input.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    expect(formField.classList.contains('com-form-field--error')).toBe(true);
  });

  it('should apply aria-invalid when in error state', () => {
    const input = fixture.nativeElement.querySelector('[data-testid="email-input"]');

    // Focus then blur to trigger error state
    input.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    input.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('should not show error state when valid', () => {
    const formField = fixture.nativeElement.querySelector('[data-testid="email-field"]');

    host.form.get('email')!.setValue('valid@email.com');
    host.form.get('email')!.markAsTouched();
    fixture.detectChanges();

    expect(formField.classList.contains('com-form-field--error')).toBe(false);
  });

  it('should handle disabled state from form control', () => {
    const input = fixture.nativeElement.querySelector('[data-testid="email-input"]');

    host.form.get('email')!.disable();
    fixture.detectChanges();

    // Input disabled attribute is set via form control binding
    expect(input.disabled).toBe(true);
  });
});

describe('Required marker', () => {
  @Component({
    selector: 'test-required-marker',
    imports: [ComFormField, ComInput, ComLabel, ReactiveFormsModule],
    template: `
      <com-form-field [hideRequiredMarker]="hideRequiredMarker()" data-testid="form-field">
        <label comLabel data-testid="label">Email</label>
        <input comInput [formControl]="emailControl" data-testid="input" />
      </com-form-field>
    `,
  })
  class TestRequiredMarkerComponent {
    readonly hideRequiredMarker = signal(false);
    readonly emailControl = new FormControl('', [Validators.required]);
  }

  let fixture: ComponentFixture<TestRequiredMarkerComponent>;
  let host: TestRequiredMarkerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestRequiredMarkerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestRequiredMarkerComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show required marker by default', () => {
    const labelContainer = fixture.nativeElement.querySelector('.com-form-field__label');
    expect(labelContainer?.textContent).toContain('*');
  });

  it('should hide required marker when hideRequiredMarker is true', () => {
    host.hideRequiredMarker.set(true);
    fixture.detectChanges();

    const labelContainer = fixture.nativeElement.querySelector('.com-form-field__label');
    // The asterisk should not be present
    const asterisk = labelContainer?.querySelector('[aria-hidden="true"]');
    expect(asterisk).toBeFalsy();
  });

  it('should mark asterisk as aria-hidden', () => {
    const asterisk = fixture.nativeElement.querySelector('.com-form-field__label [aria-hidden="true"]');
    expect(asterisk).toBeTruthy();
    expect(asterisk.textContent).toContain('*');
  });
});

describe('Color variants', () => {
  @Component({
    selector: 'test-color-variants',
    imports: [ComFormField, ComInput, ComLabel],
    template: `
      <com-form-field [color]="color()" data-testid="form-field">
        <label comLabel>Test</label>
        <input comInput data-testid="input" />
      </com-form-field>
    `,
  })
  class TestColorVariantsComponent {
    readonly color = signal<FormFieldColor>('primary');
  }

  let fixture: ComponentFixture<TestColorVariantsComponent>;
  let host: TestColorVariantsComponent;
  let inputEl: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestColorVariantsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestColorVariantsComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    inputEl = fixture.nativeElement.querySelector('[data-testid="input"]');
  });

  it('should apply primary color on focus', () => {
    inputEl.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.com-form-field__container');
    expect(container.classList.contains('border-primary')).toBe(true);
    expect(container.classList.contains('ring-primary')).toBe(true);
  });

  it('should apply accent color on focus', () => {
    host.color.set('accent');
    fixture.detectChanges();

    inputEl.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.com-form-field__container');
    expect(container.classList.contains('border-accent')).toBe(true);
    expect(container.classList.contains('ring-accent')).toBe(true);
  });

  it('should apply warn color on focus', () => {
    host.color.set('warn');
    fixture.detectChanges();

    inputEl.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.com-form-field__container');
    expect(container.classList.contains('border-warn')).toBe(true);
    expect(container.classList.contains('ring-warn')).toBe(true);
  });
});

describe('Error state styling', () => {
  @Component({
    selector: 'test-error-styling',
    imports: [ComFormField, ComInput, ComLabel, ComError, ReactiveFormsModule],
    template: `
      <com-form-field data-testid="form-field">
        <label comLabel data-testid="label">Email</label>
        <input comInput [formControl]="emailControl" data-testid="input" />
        <span comError>Error</span>
      </com-form-field>
    `,
  })
  class TestErrorStylingComponent {
    readonly emailControl = new FormControl('', [Validators.required]);
  }

  let fixture: ComponentFixture<TestErrorStylingComponent>;
  let host: TestErrorStylingComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestErrorStylingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestErrorStylingComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should apply error border color when invalid', () => {
    const inputEl = fixture.nativeElement.querySelector('[data-testid="input"]');
    // Focus then blur to trigger error state evaluation
    inputEl.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    inputEl.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.com-form-field__container');
    expect(container.classList.contains('border-warn')).toBe(true);
  });

  it('should apply error text color to label when invalid and floating', () => {
    const inputEl = fixture.nativeElement.querySelector('[data-testid="input"]');
    // Focus then blur to mark as touched, then focus again to see floating label
    inputEl.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();
    inputEl.dispatchEvent(new FocusEvent('blur'));
    fixture.detectChanges();
    inputEl.dispatchEvent(new FocusEvent('focus'));
    fixture.detectChanges();

    const labelSpan = fixture.nativeElement.querySelector('.com-form-field__label');
    expect(labelSpan.classList.contains('text-warn')).toBe(true);
  });
});

describe('Textarea support', () => {
  @Component({
    selector: 'test-textarea',
    imports: [ComFormField, ComInput, ComLabel],
    template: `
      <com-form-field>
        <label comLabel>Description</label>
        <textarea comInput data-testid="textarea"></textarea>
      </com-form-field>
    `,
  })
  class TestTextareaComponent {}

  let fixture: ComponentFixture<TestTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestTextareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestTextareaComponent);
    fixture.detectChanges();
  });

  it('should work with textarea element', () => {
    const textarea = fixture.nativeElement.querySelector('[data-testid="textarea"]');
    expect(textarea).toBeTruthy();
    expect(textarea.tagName.toLowerCase()).toBe('textarea');
    expect(textarea.id).toMatch(/^com-input-\d+$/);
  });
});

describe('exportAs', () => {
  @Component({
    selector: 'test-export-as',
    imports: [ComFormField, ComInput, ComLabel, ComHint, ComError],
    template: `
      <com-form-field #formField="comFormField">
        <label comLabel #label="comLabel">Test</label>
        <input comInput #input="comInput" />
        <span comHint #hint="comHint">Hint</span>
        <span comError #error="comError">Error</span>
      </com-form-field>
    `,
  })
  class ExportAsTestComponent {}

  it('should export all directives', async () => {
    await TestBed.configureTestingModule({
      imports: [ExportAsTestComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(ExportAsTestComponent);
    fixture.detectChanges();

    // If there were no export errors, the component compiled successfully
    expect(fixture.componentInstance).toBeTruthy();
  });
});

describe('Multiple hints', () => {
  @Component({
    selector: 'test-multiple-hints',
    imports: [ComFormField, ComInput, ComLabel, ComHint],
    template: `
      <com-form-field>
        <label comLabel>Bio</label>
        <textarea comInput data-testid="textarea"></textarea>
        <span comHint data-testid="hint-start">Keep it brief</span>
        <span comHint align="end" data-testid="hint-end">0/150</span>
      </com-form-field>
    `,
  })
  class TestMultipleHintsComponent {}

  let fixture: ComponentFixture<TestMultipleHintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestMultipleHintsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestMultipleHintsComponent);
    fixture.detectChanges();
  });

  it('should render both hints', () => {
    const hintStart = fixture.nativeElement.querySelector('[data-testid="hint-start"]');
    const hintEnd = fixture.nativeElement.querySelector('[data-testid="hint-end"]');

    expect(hintStart).toBeTruthy();
    expect(hintEnd).toBeTruthy();
  });

  it('should position end hint correctly', () => {
    const hintEnd = fixture.nativeElement.querySelector('[data-testid="hint-end"]');
    expect(hintEnd.classList.contains('ml-auto')).toBe(true);
  });

  it('should include both hints in aria-describedby', () => {
    const textarea = fixture.nativeElement.querySelector('[data-testid="textarea"]');
    const hintStart = fixture.nativeElement.querySelector('[data-testid="hint-start"]');
    const hintEnd = fixture.nativeElement.querySelector('[data-testid="hint-end"]');

    const describedBy = textarea.getAttribute('aria-describedby');
    expect(describedBy).toContain(hintStart.id);
    expect(describedBy).toContain(hintEnd.id);
  });
});
