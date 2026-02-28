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
      },
      {
        path: 'components/dropdown',
        loadComponent: () =>
          import('./pages/dropdown/dropdown-overview').then(m => m.DropdownOverview),
      },
      {
        path: 'components/dropdown/examples',
        loadComponent: () =>
          import('./pages/dropdown/dropdown-examples').then(m => m.DropdownExamples),
      },
      {
        path: 'components/dropdown/api',
        loadComponent: () => import('./pages/dropdown/dropdown-api').then(m => m.DropdownApi),
      },
      {
        path: 'components/badge',
        loadComponent: () => import('./pages/badge/badge-overview').then(m => m.BadgeOverview),
      },
      {
        path: 'components/badge/examples',
        loadComponent: () => import('./pages/badge/badge-examples').then(m => m.BadgeExamples),
      },
      {
        path: 'components/badge/api',
        loadComponent: () => import('./pages/badge/badge-api').then(m => m.BadgeApi),
      },
      {
        path: 'components/collapsible',
        loadComponent: () =>
          import('./pages/collapsible/collapsible-overview').then(m => m.CollapsibleOverview),
      },
      {
        path: 'components/collapsible/examples',
        loadComponent: () =>
          import('./pages/collapsible/collapsible-examples').then(m => m.CollapsibleExamples),
      },
      {
        path: 'components/collapsible/api',
        loadComponent: () =>
          import('./pages/collapsible/collapsible-api').then(m => m.CollapsibleApi),
      },
    ],
  },
];
