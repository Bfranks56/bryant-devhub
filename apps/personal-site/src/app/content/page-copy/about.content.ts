import { PageSection } from '../../shared/interfaces/pageContent/content.dto';

export const ABOUT_SECTIONS: PageSection[] = [
  {
    id: 'about',
    heading: 'About Me',
    content: [
      {
        type: 'paragraph',
        content:
          "I've always been more interested in understanding systems than just using them.",
      },
      {
        type: 'paragraph',
        content:
          "That mindset led me from design work into software engineering, where I've spent the last several years building modern web applications with Angular while expanding deeper into backend development, APIs, and cloud infrastructure.",
      },
      {
        type: 'paragraph',
        content:
          'I like software that feels thoughtful \u2014 clean UI, strong architecture, maintainable code, and tools that solve practical problems without overcomplicating things.',
      },
      {
        type: 'paragraph',
        content:
          "Outside of tech, I'm probably talking about Gundam, collecting sneakers, playing TCGs, or building side projects inspired by all three.",
      },
      {
        type: 'list',
        heading: 'Skills',
        content: [
          'Angular, TypeScript, RxJS',
          'Spring Boot, Java',
          'Python',
          'PostgreSQL',
          'GCP, Vertex AI',
          'Gemini (LLM)',
          'AI agents & sub-agents',
          'Tailwind CSS, Angular Material',
          'Nx monorepo',
          'JWT / Spring Security',
          'Git, GitHub',
        ],
      },
    ],
  },
];
