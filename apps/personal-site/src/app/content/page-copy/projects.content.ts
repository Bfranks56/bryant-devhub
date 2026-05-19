import {
  PageSection,
  ProjectContent,
} from '../../shared/interfaces/pageContent/content.dto';

export const PROJECTS_DATA: ProjectContent[] = [
  {
    id: 'sneaker-inventory',
    title: 'Sneaker Inventory App',
    description:
      "I built this project because I couldn't find a clean way to manage a large sneaker collection without relying on spreadsheets or generic inventory apps.<br><br>The app uses an Angular frontend backed by a Spring Boot REST API and PostgreSQL database, with JWT authentication for protected actions.<br><br>A key design decision was splitting public and private access: collection browsing is publicly accessible, inventory management is restricted to authenticated users.<br><br>The production database currently contains 102 real sneakers from my personal collection, which made the project a good exercise in building software around an actual long-term use case instead of a tutorial app.",
    technologies: [
      'Java 21',
      'Spring Boot 3',
      'PostgreSQL 15',
      'Angular 20',
      'JWT',
      'Railway',
      'Vercel',
    ],
    githubUrl: 'https://github.com/Bfranks56/sneaker-inventory',
    liveUrl: 'https://sneakers.bryantfranks.com',
    featured: true,
  },
  {
    id: 'portfolio-site',
    title: 'This Portfolio Site',
    description:
      'The site is built with Angular inside an Nx monorepo and uses static site generation for performance and deployment simplicity. Content is driven through typed route configuration instead of hardcoded page components.<br><br>One of the core architectural decisions was building a reusable DefaultPageComponent capable of rendering nearly every page on the site from structured route data. That reduced page-level code by roughly 90% compared to maintaining individual components for each section.<br><br>The project also uses OnPush change detection throughout to reinforce predictable rendering behavior and performance-focused design patterns.',
    technologies: [
      'Angular 20',
      'Nx',
      'Tailwind CSS',
      'Angular Material',
      'TypeScript',
      'SSG',
    ],
    githubUrl: 'https://github.com/Bfranks56/bryant-devhub',
    featured: true,
  },
  {
    id: 'ai-assistant',
    title: 'AI Story Bible Assistant',
    description:
      "I built this because I was losing context in long conversations with ChatGPT about a complex sci-fi story bible. Characters were getting contradicted, details were drifting, and there was no way to anchor the AI to what I'd already established.<br><br>The system uses FAISS for vector storage and OpenAI embeddings to semantically search 313 indexed sections across the full story bible. Queries that reference outside material trigger a hybrid retrieval path that pulls from both the local index and live web search via DuckDuckGo.<br><br>A couple of decisions worth calling out: a similarity threshold filter prevents the LLM from inventing lore when no relevant canon exists, and content expansion requests route to a staging area instead of writing directly to canon files — keeping AI suggestions separated from locked story content.<br><br>The story bible itself stays out of the public repo, but the architecture is the same pattern you'd apply to any domain-specific knowledge base.",
    technologies: [
      'Python',
      'FAISS',
      'OpenAI Embeddings',
      'DuckDuckGo Search',
      'Angular',
      'RAG',
    ],
    badge: 'Private Repo',
    featured: true,
  },
];

export const PROJECTS_SECTIONS: PageSection[] = [
  {
    id: 'projects',
    heading: 'My Projects',
    subtitle: "What I've been working on",
    content: [
      {
        type: 'projects',
        heading: 'Featured Projects',
        content: PROJECTS_DATA,
      },
    ],
  },
];
