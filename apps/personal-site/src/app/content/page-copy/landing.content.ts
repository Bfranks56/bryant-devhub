import { HOME_CONTENT } from './home.content';
import { ABOUT_CONTENT } from './about.content';
import { PROJECTS_CONTENT } from './projects.content';
import { PageContent } from '../../shared/interfaces/pageContent/content.dto';

export const LANDING_CONTENT: PageContent = {
  title: 'Bryant Franks',
  subtitle: 'Full Stack Developer & Digital Creator',
  description: 'Building modern web applications with passion and precision',
  sections: [
    // Home Section
    {
      id: 'home',
      heading: 'Welcome',
      subtitle: 'Full Stack Developer',
      content: HOME_CONTENT.content || [],
    },
    // About Section
    {
      id: 'about',
      heading: 'About Me',
      content: ABOUT_CONTENT.content || [],
    },
    // Projects Section
    {
      id: 'projects',
      heading: 'My Projects',
      content: PROJECTS_CONTENT.content || [],
    },
  ],
};
