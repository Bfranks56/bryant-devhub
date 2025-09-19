import {
  PageContent,
  ProjectContent,
} from '../../shared/interfaces/pageContent/content.dto';

export const PROJECTS_DATA: ProjectContent[] = [
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    description:
      'Modern, responsive portfolio website built with Angular 20 and Tailwind CSS. Features server-side rendering, type-safe content management, and optimized performance with Nx monorepo architecture.',
    technologies: [
      'Angular 20',
      'TypeScript',
      'Tailwind CSS',
      'Nx Workspace',
      'Angular Material',
      'SSR',
    ],
    githubUrl: 'https://github.com/Bfranks56/bryant-devhub',
    liveUrl: 'https://bryant.dev',
    featured: true,
  },
  {
    id: 'enterprise-dashboard',
    title: 'Enterprise Analytics Dashboard',
    description:
      'Comprehensive data visualization platform built for enterprise clients. Features real-time analytics, custom reporting, role-based access control, and seamless API integration.',
    technologies: ['Angular', 'TypeScript', 'D3.js', 'Node.js', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/Bfranks56/enterprise-dashboard',
    featured: true,
  },
  {
    id: 'cloud-microservices',
    title: 'Cloud Microservices Platform',
    description:
      'Scalable microservices architecture deployed on AWS with automated CI/CD pipelines. Handles high-traffic applications with load balancing, monitoring, and fault tolerance.',
    technologies: ['Node.js', 'Express', 'AWS', 'Docker', 'Kubernetes', 'Redis', 'MongoDB'],
    githubUrl: 'https://github.com/Bfranks56/cloud-microservices',
    featured: true,
  },
  {
    id: 'api-gateway',
    title: 'RESTful API Gateway',
    description:
      'High-performance API gateway with authentication, rate limiting, request routing, and comprehensive logging. Built to handle thousands of concurrent requests.',
    technologies: ['Node.js', 'Express', 'JWT', 'Redis', 'PostgreSQL', 'Swagger'],
    githubUrl: 'https://github.com/Bfranks56/api-gateway',
    featured: false,
  },
];

export const PROJECTS_CONTENT: PageContent = {
  title: 'My Projects',
  subtitle: "What I've been working on",
  description: 'A showcase of my recent work and side projects',
  content: [
    {
      type: 'projects',
      heading: 'Featured Projects',
      content: PROJECTS_DATA,
    },
  ],
};
