import { PageContent } from '../../shared/interfaces/pageContent/content.dto';

export const HOME_CONTENT: PageContent = {
  title: 'Bryant Franks',
  subtitle: 'Full Stack Developer & Software Engineer',
  description:
    'Building modern web applications with Angular, Node.js, and cloud technologies.',
  content: [
    {
      type: 'paragraph',
      content:
        "I'm a passionate full-stack developer with 5+ years of experience creating efficient, scalable web applications that solve real-world problems.",
    },
    {
      type: 'paragraph',
      content:
        'Specializing in Angular, Node.js, and modern development practices, I transform complex requirements into elegant, performant solutions.',
    },
    {
      type: 'list',
      heading: 'Core Expertise',
      content: [
        'Frontend Development with Angular, TypeScript & Modern Frameworks',
        'Backend API Development with Node.js, Express & Database Design',
        'Cloud Architecture with AWS, Docker & DevOps Automation',
        'Full-Stack Integration & Performance Optimization',
      ],
    },
  ],
};
