import { ProjectContent } from '../types/content.dto';

export const PROJECTS_CONTENT: ProjectContent[] = [
  {
    id: 'personal-website',
    title: 'Personal Website',
    description:
      'A modern, responsive portfolio website built with Angular and Tailwind CSS. Features server-side rendering, comprehensive testing, and optimized performance.',
    technologies: [
      'Angular',
      'TypeScript',
      'Tailwind CSS',
      'Nx Workspace',
      'Jest',
    ],
    githubUrl: 'https://github.com/Bfranks56/bryant-devhub',
    liveUrl: 'https://bryant.dev',
    featured: true,
  },
  {
    id: 'task-manager',
    title: 'Task Management App',
    description:
      'Full-stack task management application with real-time updates, user authentication, and collaborative features.',
    technologies: ['Angular', 'Node.js', 'Express', 'PostgreSQL', 'Socket.io'],
    githubUrl: 'https://github.com/yourusername/task-manager',
    featured: true,
  },
  {
    id: 'weather-dashboard',
    title: 'Weather Dashboard',
    description:
      'Interactive weather dashboard with location-based forecasts, historical data, and responsive design.',
    technologies: ['Angular', 'TypeScript', 'Chart.js', 'Weather API'],
    githubUrl: 'https://github.com/yourusername/weather-dashboard',
    liveUrl: 'https://weather-dashboard-demo.com',
    featured: false,
  },
];
