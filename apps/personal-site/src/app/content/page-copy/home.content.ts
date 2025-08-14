import { PageContent } from '../../shared/interfaces/pageContent/content.dto';

export const HOME_CONTENT: PageContent = {
  title: 'Bryant Franks',
  subtitle: 'Full Stack Developer',
  description:
    'Building modern web applications with Angular, Node.js, and cloud technologies.',
  content: [
    {
      type: 'paragraph',
      content:
        "Welcome to my digital space! I'm a passionate full-stack developer who loves creating efficient, scalable web applications.",
    },
    {
      type: 'paragraph',
      content:
        'With expertise in Angular, Node.js, and modern development practices, I enjoy tackling complex problems and turning ideas into reality.',
    },
    {
      type: 'list',
      heading: 'What I Do',
      content: [
        'Frontend Development with Angular & TypeScript',
        'Backend API development with Node.js',
        'Cloud deployment and DevOps',
        'UI/UX design and responsive development',
      ],
    },
  ],
};
