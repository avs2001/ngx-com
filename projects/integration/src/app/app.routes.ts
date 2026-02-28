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
        path: 'components/badge',
        loadChildren: () => import('./routes/badge/badge.routes').then(m => m.BADGE_ROUTES),
      },
      {
        path: 'components/button',
        loadChildren: () => import('./routes/button/button.routes').then(m => m.BUTTON_ROUTES),
      },
      {
        path: 'components/calendar',
        loadChildren: () => import('./routes/calendar/calendar.routes').then(m => m.CALENDAR_ROUTES),
      },
      {
        path: 'components/card',
        loadChildren: () => import('./routes/card/card.routes').then(m => m.CARD_ROUTES),
      },
      {
        path: 'components/checkbox',
        loadChildren: () => import('./routes/checkbox/checkbox.routes').then(m => m.CHECKBOX_ROUTES),
      },
      {
        path: 'components/collapsible',
        loadChildren: () => import('./routes/collapsible/collapsible.routes').then(m => m.COLLAPSIBLE_ROUTES),
      },
      {
        path: 'components/dropdown',
        loadChildren: () => import('./routes/dropdown/dropdown.routes').then(m => m.DROPDOWN_ROUTES),
      },
    ],
  },
];
