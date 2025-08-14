import { PageContent } from '../../shared/interfaces/pageContent/content.dto';

export const ABOUT_CONTENT: PageContent = {
  title: 'About Me',
  description:
    'Learn more about my journey as a developer, my skills, and what drives me.',
  content: [
    {
      type: 'paragraph',
      content:
        "I'm a software engineer with a passion for creating clean, efficient code and solving complex problems. My journey in tech started with curiosity and has grown into a career focused on building impactful web applications.",
    },
    {
      type: 'paragraph',
      heading: 'My Background',
      content:
        'With several years of experience in full-stack development, I specialize in modern web technologies including Angular, Node.js, and cloud platforms. I believe in writing maintainable code and following best practices.',
    },
    {
      type: 'list',
      heading: 'Technical Skills',
      content: [
        'Frontend: Angular, TypeScript, HTML5, CSS3, Tailwind CSS',
        'Backend: Node.js, Express, REST APIs',
        'Databases: PostgreSQL, MongoDB',
        'Tools: Git, Docker, Nx Workspaces',
        'Cloud: AWS, Azure',
      ],
    },
    {
      type: 'paragraph',
      heading: "When I'm Not Coding",
      content:
        'I enjoy staying up-to-date with the latest tech trends, contributing to open-source projects, and mentoring other developers. I believe in continuous learning and sharing knowledge with the community.',
    },
  ],
};
