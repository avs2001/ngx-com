import { test as base } from '@playwright/test';

/**
 * Extended test fixture with page objects.
 */
type TestFixtures = Record<string, never>;

export const test = base.extend<TestFixtures>({});

export { expect } from '@playwright/test';
