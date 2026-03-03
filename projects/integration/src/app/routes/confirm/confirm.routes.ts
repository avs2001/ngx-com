import type { Routes } from '@angular/router';
import { ConfirmPage } from './confirm-page.component';

export const CONFIRM_ROUTES: Routes = [
  {
    path: '',
    component: ConfirmPage,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'overview',
        loadComponent: () => import('./overview/confirm-overview.component').then(m => m.ConfirmOverview),
      },
      {
        path: 'examples',
        loadComponent: () => import('./examples/confirm-examples.component').then(m => m.ConfirmExamples),
      },
      {
        path: 'api',
        loadComponent: () => import('./api/confirm-api.component').then(m => m.ConfirmApi),
      },
    ],
  },
];
