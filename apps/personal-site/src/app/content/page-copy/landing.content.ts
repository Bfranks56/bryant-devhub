import { HOME_CONTENT } from './home.content';
import { ABOUT_CONTENT } from './about.content';
import { PROJECTS_CONTENT } from './projects.content';
import { PageContent } from '../../shared/interfaces/pageContent/content.dto';

export const LANDING_CONTENT: PageContent = {
  title: 'Bryant Franks',
  subtitle: 'Full Stack Developer & Digital Creator',
  description: 'Building modern web applications with passion and precision',
  content: [
    // Home Section
    {
      type: 'section-header',
      heading: 'Welcome',
      id: 'home',
      subtitle: 'Full Stack Developer',
    },
    ...HOME_CONTENT.content,

    // About Section
    {
      type: 'section-header',
      heading: 'About Me',
      id: 'about',
    },
    ...ABOUT_CONTENT.content,

    // Projects Section
    {
      type: 'section-header',
      heading: 'My Projects',
      id: 'projects',
    },
    ...PROJECTS_CONTENT.content,
  ],
};
