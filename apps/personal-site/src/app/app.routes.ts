import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { DefaultPageComponent } from './pages/default-page/default-page.component';
import { ABOUT_CONTENT, HOME_CONTENT } from './content';

export const appRoutes: Route[] = [
  {
    path: '',
    component: DefaultPageComponent,
    data: { pageContent: HOME_CONTENT },
  },
  {
    path: 'about',
    component: DefaultPageComponent,
    data: { pageContent: ABOUT_CONTENT },
  },
  { path: 'contact', component: ContactComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: '**', redirectTo: '' },
];
