import { Route } from '@angular/router';
import { ABOUT_CONTENT, HOME_CONTENT } from './content';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/default-page/default-page.component').then(
        c => c.DefaultPageComponent
      ),
    data: { pageContent: HOME_CONTENT },
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/default-page/default-page.component').then(
        c => c.DefaultPageComponent
      ),
    data: { pageContent: ABOUT_CONTENT },
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(c => c.ContactComponent),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects/projects.component').then(
        c => c.ProjectsComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
