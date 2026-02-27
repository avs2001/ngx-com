import type { Routes } from '@angular/router';
import { Shell } from './layout/shell';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home').then(m => m.Home),
      },
      {
        path: 'getting-started/installation',
        loadComponent: () => import('./pages/installation').then(m => m.Installation),
      },
      {
        path: 'getting-started/theming',
        loadComponent: () => import('./pages/theming').then(m => m.Theming),
      },
      {
        path: 'components/calendar',
        loadComponent: () =>
          import('./pages/calendar/calendar-overview').then(m => m.CalendarOverview),
      },
      {
        path: 'components/calendar/examples',
        loadComponent: () =>
          import('./pages/calendar/calendar-examples').then(m => m.CalendarExamples),
      },
      {
        path: 'components/calendar/api',
        loadComponent: () => import('./pages/calendar/calendar-api').then(m => m.CalendarApi),
      }
    ],
  },
];
