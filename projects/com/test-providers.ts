import type { EnvironmentProviders, Provider } from '@angular/core';
import { provideZonelessChangeDetection } from '@angular/core';

/**
 * Global test providers for the com library.
 * These providers are automatically injected into all tests.
 *
 * @see https://angular.dev/guide/testing#global-test-setup-and-providers
 */
const testProviders: (Provider | EnvironmentProviders)[] = [
  // Enable zoneless change detection for better performance with signals
  provideZonelessChangeDetection(),
];

export default testProviders;
