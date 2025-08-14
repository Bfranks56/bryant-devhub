import { Route } from '@angular/router';
import { LANDING_CONTENT } from './content/page-copy/landing.content';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/default-page/default-page.component').then(
        c => c.DefaultPageComponent
      ),
    data: { pageContent: LANDING_CONTENT },
  },
  { path: '**', redirectTo: '' },
];
