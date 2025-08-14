import { Route } from '@angular/router';
import { ABOUT_CONTENT, HOME_CONTENT, PROJECTS_CONTENT } from './content';
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
  // {
  //   path: 'about',
  //   loadComponent: () =>
  //     import('./pages/default-page/default-page.component').then(
  //       c => c.DefaultPageComponent
  //     ),
  //   data: { pageContent: ABOUT_CONTENT },
  // },
  // {
  //   path: 'contact',
  //   loadComponent: () =>
  //     import('./pages/contact/contact.component').then(c => c.ContactComponent),
  // },
  // {
  //   path: 'projects',
  //   loadComponent: () =>
  //     import('./pages/default-page/default-page.component').then(
  //       c => c.DefaultPageComponent
  //     ),
  //   data: { pageContent: PROJECTS_CONTENT },
  // },
  { path: '**', redirectTo: '' },
];
