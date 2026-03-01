import type { Routes } from '@angular/router';
import { DatepickerPage } from './datepicker-page.component';

export const DATEPICKER_ROUTES: Routes = [
  {
    path: '',
    component: DatepickerPage,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'overview',
        loadComponent: () => import('./overview/datepicker-overview.component').then(m => m.DatepickerOverview),
      },
      {
        path: 'examples',
        loadComponent: () => import('./examples/datepicker-examples.component').then(m => m.DatepickerExamples),
      },
      {
        path: 'api',
        loadComponent: () => import('./api/datepicker-api.component').then(m => m.DatepickerApi),
      },
    ],
  },
];
