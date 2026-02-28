import type { Routes } from '@angular/router';
import { DropdownPage } from './dropdown-page.component';

export const DROPDOWN_ROUTES: Routes = [
  {
    path: '',
    component: DropdownPage,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'overview',
        loadComponent: () => import('./overview/dropdown-overview.component').then(m => m.DropdownOverview),
      },
      {
        path: 'examples',
        loadComponent: () => import('./examples/dropdown-examples.component').then(m => m.DropdownExamples),
      },
      {
        path: 'api',
        loadComponent: () => import('./api/dropdown-api.component').then(m => m.DropdownApi),
      },
    ],
  },
];
