/**
 * Vitest base configuration for the com library.
 * Learn more: https://vitest.dev/config/
 *
 * @note The Angular CLI will override certain properties (test.projects, test.include)
 * to ensure proper integration.
 */

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Enable global test APIs (describe, it, expect, etc.)
    globals: true,
    // Reporters for test output
    reporters: ['default'],
    // Pool options for test isolation
    pool: 'vmThreads',
    // Timeout for individual tests (ms)
    testTimeout: 10000,
    // Timeout for hooks (beforeEach, afterEach, etc.)
    hookTimeout: 10000,
  },
});
