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
        path: 'components/datepicker',
        loadChildren: () => import('./routes/datepicker/datepicker.routes').then(m => m.DATEPICKER_ROUTES),
      },
      {
        path: 'components/dropdown',
        loadChildren: () => import('./routes/dropdown/dropdown.routes').then(m => m.DROPDOWN_ROUTES),
      },
      {
        path: 'components/form-field',
        loadChildren: () => import('./routes/form-field/form-field.routes').then(m => m.FORM_FIELD_ROUTES),
      },
      {
        path: 'components/icon',
        loadChildren: () => import('./routes/icon/icon.routes').then(m => m.ICON_ROUTES),
      },
      {
        path: 'components/menu',
        loadChildren: () => import('./routes/menu/menu.routes').then(m => m.MENU_ROUTES),
      },
      {
        path: 'components/popover',
        loadChildren: () => import('./routes/popover/popover.routes').then(m => m.POPOVER_ROUTES),
      },
      {
        path: 'components/radio',
        loadChildren: () => import('./routes/radio/radio.routes').then(m => m.RADIO_ROUTES),
      },
      {
        path: 'components/sort',
        loadChildren: () => import('./routes/sort/sort.routes').then(m => m.SORT_ROUTES),
      },
      {
        path: 'components/tabs',
        loadChildren: () => import('./routes/tabs/tabs.routes').then(m => m.TABS_ROUTES),
      },
    ],
  },
];
