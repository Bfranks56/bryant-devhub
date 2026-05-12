import { PageContent } from '../../shared/interfaces/pageContent/content.dto';

export const HOME_CONTENT: PageContent = {
  title: 'Bryant Franks',
  subtitle: 'Angular Engineer & Full-Stack Developer',
  description: '6 years of Angular. Growing full-stack with Spring Boot and Java.',
  content: [
    {
      type: 'paragraph',
      content:
        "I'm a software engineer with 6 years of Angular and growing full-stack experience in Spring Boot and Java. I care about understanding systems, not just shipping features.",
    },
    {
      type: 'paragraph',
      content:
        'Currently contracting at a major automotive company, working on Angular 18 with Signals and Java/Spring Boot on GCP.',
    },
    {
      type: 'list',
      heading: 'What I Work With',
      content: [
        'Angular, TypeScript, RxJS',
        'Spring Boot, Java',
        'PostgreSQL',
        'GCP (exposure)',
        'Tailwind CSS, Angular Material',
        'Nx monorepo',
      ],
    },
  ],
};
