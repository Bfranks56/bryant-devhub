import { HOME_CONTENT } from './home.content';
import { ABOUT_CONTENT } from './about.content';
import { PROJECTS_CONTENT } from './projects.content';
import { CONTACT_CONTENT } from './contact.content';
import { PageContent } from '../../shared/interfaces/pageContent/content.dto';

export const LANDING_CONTENT: PageContent = {
  title: 'Bryant Franks',
  subtitle: 'Angular Engineer & Full-Stack Developer.',
  description: '6 years of Angular. Growing full-stack with Spring Boot and Java. Pretty good at Street Fighter.',
  stats: [
    { value: '6+', label: 'Years Angular' },
    { value: 'Angular', label: '+ Spring Boot' },
    { value: 'Ford', label: 'Motor Co. (Current)', spanFull: true },
  ],
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
    // Contact Section
    {
      id: 'contact',
      heading: 'Get In Touch',
      subtitle: "Let's work together",
      content: CONTACT_CONTENT.content || [],
    },
  ],
};
