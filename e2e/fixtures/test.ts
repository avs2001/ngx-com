import { test as base } from '@playwright/test';
import { SelectExamplesPage } from '../pages/select-examples.page';

/**
 * Extended test fixture with page objects.
 */
type TestFixtures = {
  selectExamplesPage: SelectExamplesPage;
};

export const test = base.extend<TestFixtures>({
  selectExamplesPage: async ({ page }, use) => {
    const selectExamplesPage = new SelectExamplesPage(page);
    await use(selectExamplesPage);
  },
});

export { expect } from '@playwright/test';
