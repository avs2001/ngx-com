import type { ApplicationConfig } from '@angular/core';
import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideComIcons } from 'ngx-com/components/icon';
import {
  Star,
  Heart,
  CheckCircle,
  AlertTriangle,
  Info,
  XCircle,
  Plus,
  Settings,
  Trash2,
  Clock,
  Sparkles,
} from 'lucide-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideComIcons({
      Star,
      Heart,
      CheckCircle,
      AlertTriangle,
      Info,
      XCircle,
      Plus,
      Settings,
      Trash2,
      Clock,
      Sparkles,
    }),
  ],
};
