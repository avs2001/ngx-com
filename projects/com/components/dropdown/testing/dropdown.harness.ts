import {
  ComponentHarness,
  HarnessPredicate,
  TestKey,
  parallel,
} from '@angular/cdk/testing';
import type { BaseHarnessFilters } from '@angular/cdk/testing';

/** Harness filters for ComDropdownHarness. */
export interface ComDropdownHarnessFilters extends BaseHarnessFilters {
  /** Filter by the dropdown's placeholder text. */
  placeholder?: string | RegExp;
  /** Filter by whether the dropdown is disabled. */
  disabled?: boolean;
  /** Filter by whether the dropdown is open. */
  open?: boolean;
}

/** Harness filters for ComDropdownOptionHarness. */
export interface ComDropdownOptionHarnessFilters extends BaseHarnessFilters {
  /** Filter by the option's text. */
  text?: string | RegExp;
  /** Filter by whether the option is selected. */
  selected?: boolean;
  /** Filter by whether the option is disabled. */
  disabled?: boolean;
}

/**
 * Harness for interacting with a dropdown option in tests.
 */
export class ComDropdownOptionHarness extends ComponentHarness {
  static hostSelector = 'com-dropdown-option';

  private readonly optionElement = this.locatorFor('[role="option"]');

  /**
   * Gets a HarnessPredicate for matching dropdown options.
   * @param options Filter options.
   */
  static with(options: ComDropdownOptionHarnessFilters = {}): HarnessPredicate<ComDropdownOptionHarness> {
    return new HarnessPredicate(ComDropdownOptionHarness, options)
      .addOption('text', options.text, async (harness, text) => {
        const optionText = await harness.getText();
        return HarnessPredicate.stringMatches(optionText, text);
      })
      .addOption('selected', options.selected, async (harness, selected) => {
        return (await harness.isSelected()) === selected;
      })
      .addOption('disabled', options.disabled, async (harness, disabled) => {
        return (await harness.isDisabled()) === disabled;
      });
  }

  /** Gets the option's text content. */
  async getText(): Promise<string> {
    const el = await this.optionElement();
    return el.text();
  }

  /** Whether the option is currently selected. */
  async isSelected(): Promise<boolean> {
    const el = await this.optionElement();
    return (await el.getAttribute('aria-selected')) === 'true';
  }

  /** Whether the option is disabled. */
  async isDisabled(): Promise<boolean> {
    const el = await this.optionElement();
    return (await el.getAttribute('aria-disabled')) === 'true';
  }

  /** Whether the option is active (keyboard focused). */
  async isActive(): Promise<boolean> {
    const el = await this.optionElement();
    return (await el.getAttribute('data-active')) === 'true';
  }

  /** Clicks the option to select it. */
  async click(): Promise<void> {
    const el = await this.optionElement();
    return el.click();
  }

  /** Hovers over the option. */
  async hover(): Promise<void> {
    const el = await this.optionElement();
    return el.hover();
  }
}

/**
 * Harness for interacting with a ComDropdown in tests.
 */
export class ComDropdownHarness extends ComponentHarness {
  static hostSelector = 'com-dropdown';

  private readonly trigger = this.locatorFor('button[role="combobox"]');
  private readonly panel = this.locatorForOptional('[role="listbox"]');
  private readonly searchInput = this.locatorForOptional('com-dropdown-search input');
  private readonly clearButton = this.locatorForOptional('button[aria-label="Clear selection"]');

  /**
   * Gets a HarnessPredicate for matching dropdowns.
   * @param options Filter options.
   */
  static with(options: ComDropdownHarnessFilters = {}): HarnessPredicate<ComDropdownHarness> {
    return new HarnessPredicate(ComDropdownHarness, options)
      .addOption('placeholder', options.placeholder, async (harness, placeholder) => {
        const text = await harness.getTriggerText();
        return HarnessPredicate.stringMatches(text, placeholder);
      })
      .addOption('disabled', options.disabled, async (harness, disabled) => {
        return (await harness.isDisabled()) === disabled;
      })
      .addOption('open', options.open, async (harness, open) => {
        return (await harness.isOpen()) === open;
      });
  }

  /** Gets the dropdown's trigger button text. */
  async getTriggerText(): Promise<string> {
    const triggerEl = await this.trigger();
    return triggerEl.text();
  }

  /** Whether the dropdown is currently open. */
  async isOpen(): Promise<boolean> {
    const triggerEl = await this.trigger();
    return (await triggerEl.getAttribute('aria-expanded')) === 'true';
  }

  /** Whether the dropdown is disabled. */
  async isDisabled(): Promise<boolean> {
    const triggerEl = await this.trigger();
    const disabled = await triggerEl.getAttribute('disabled');
    return disabled !== null;
  }

  /** Whether the dropdown has a value selected. */
  async hasValue(): Promise<boolean> {
    const clearBtn = await this.clearButton();
    return clearBtn !== null;
  }

  /** Opens the dropdown if it's closed. */
  async open(): Promise<void> {
    if (!(await this.isOpen())) {
      await this.click();
    }
  }

  /** Closes the dropdown if it's open. */
  async close(): Promise<void> {
    if (await this.isOpen()) {
      await this.sendKeys(TestKey.ESCAPE);
    }
  }

  /** Clicks the dropdown trigger. */
  async click(): Promise<void> {
    const triggerEl = await this.trigger();
    return triggerEl.click();
  }

  /** Clears the current selection. */
  async clear(): Promise<void> {
    const clearBtn = await this.clearButton();
    if (clearBtn) {
      return clearBtn.click();
    }
    throw new Error('Dropdown does not have a clearable selection');
  }

  /** Sends keyboard input to the dropdown. */
  async sendKeys(...keys: (string | TestKey)[]): Promise<void> {
    const triggerEl = await this.trigger();
    return triggerEl.sendKeys(...keys);
  }

  /** Gets all options in the dropdown. */
  async getOptions(filters: ComDropdownOptionHarnessFilters = {}): Promise<ComDropdownOptionHarness[]> {
    await this.open();
    return this.locatorForAll(ComDropdownOptionHarness.with(filters))();
  }

  /** Gets an option by its text. */
  async getOption(text: string | RegExp): Promise<ComDropdownOptionHarness | null> {
    await this.open();
    const options = await this.getOptions({ text });
    return options[0] ?? null;
  }

  /** Selects an option by its text. */
  async selectOption(text: string | RegExp): Promise<void> {
    const option = await this.getOption(text);
    if (!option) {
      throw new Error(`Could not find option with text: ${text}`);
    }
    return option.click();
  }

  /** Gets the currently selected option(s). */
  async getSelectedOptions(): Promise<ComDropdownOptionHarness[]> {
    await this.open();
    return this.getOptions({ selected: true });
  }

  /** Whether the dropdown has a search input. */
  async isSearchable(): Promise<boolean> {
    await this.open();
    const input = await this.searchInput();
    return input !== null;
  }

  /** Gets the current search query. */
  async getSearchQuery(): Promise<string> {
    await this.open();
    const input = await this.searchInput();
    if (!input) {
      throw new Error('Dropdown is not searchable');
    }
    return input.getProperty<string>('value');
  }

  /** Types in the search input. */
  async search(query: string): Promise<void> {
    await this.open();
    const input = await this.searchInput();
    if (!input) {
      throw new Error('Dropdown is not searchable');
    }
    await input.clear();
    return input.sendKeys(query);
  }

  /** Clears the search input. */
  async clearSearch(): Promise<void> {
    await this.open();
    const input = await this.searchInput();
    if (!input) {
      throw new Error('Dropdown is not searchable');
    }
    return input.clear();
  }

  /** Gets the number of visible options. */
  async getOptionsCount(): Promise<number> {
    const options = await this.getOptions();
    return options.length;
  }

  /** Gets all option texts. */
  async getOptionTexts(): Promise<string[]> {
    const options = await this.getOptions();
    return parallel(() => options.map((opt) => opt.getText()));
  }

  /** Navigates to an option using keyboard. */
  async navigateToOption(direction: 'up' | 'down', times = 1): Promise<void> {
    await this.open();
    const key = direction === 'down' ? TestKey.DOWN_ARROW : TestKey.UP_ARROW;
    for (let i = 0; i < times; i++) {
      await this.sendKeys(key);
    }
  }

  /** Selects the currently active option. */
  async selectActiveOption(): Promise<void> {
    await this.sendKeys(TestKey.ENTER);
  }

  /** Gets the ID of the active descendant. */
  async getActiveDescendantId(): Promise<string | null> {
    await this.open();
    const triggerEl = await this.trigger();
    return triggerEl.getAttribute('aria-activedescendant');
  }

  /** Gets the panel ID. */
  async getPanelId(): Promise<string | null> {
    await this.open();
    const panelEl = await this.panel();
    return panelEl ? panelEl.getAttribute('id') : null;
  }

  /** Gets the aria-controls value from the trigger. */
  async getAriaControls(): Promise<string | null> {
    const triggerEl = await this.trigger();
    return triggerEl.getAttribute('aria-controls');
  }

  /** Focuses the dropdown trigger. */
  async focus(): Promise<void> {
    const triggerEl = await this.trigger();
    return triggerEl.focus();
  }

  /** Blurs the dropdown trigger. */
  async blur(): Promise<void> {
    const triggerEl = await this.trigger();
    return triggerEl.blur();
  }

  /** Whether the dropdown trigger is focused. */
  async isFocused(): Promise<boolean> {
    const triggerEl = await this.trigger();
    return triggerEl.isFocused();
  }
}
