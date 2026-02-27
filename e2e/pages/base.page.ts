import { type Page, type Locator } from '@playwright/test';

/**
 * Base page object with common utilities for all page objects.
 */
export class BasePage {
  constructor(readonly page: Page) {}

  /** Navigate to a path relative to the base URL */
  async goto(path: string): Promise<void> {
    await this.page.goto(path);
  }

  /** Wait for the page to be fully loaded */
  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /** Get a section element by its heading text (exact match) */
  getSection(headingText: string): Locator {
    return this.page.locator('section', { has: this.page.locator(`h2:text-is("${headingText}")`) });
  }

  /** Get the demo container within a section */
  getSectionDemo(headingText: string): Locator {
    return this.getSection(headingText).locator('.rounded-xl.border');
  }

  /** Take a screenshot with a descriptive name */
  async screenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `test-results/${name}.png` });
  }
}
