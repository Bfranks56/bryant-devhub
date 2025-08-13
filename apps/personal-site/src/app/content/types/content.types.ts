export interface PageContent {
  title: string;
  subtitle?: string;
  description: string;
  content: ContentSection[];
}

export type ContentSection =
  | ParagraphSection
  | ListSection
  | CodeSection
  | QuoteSection;

export interface ParagraphSection {
  type: 'paragraph';
  heading?: string;
  content: string;
}

// export interface HeadingSection {
//   type: 'heading';
//   heading?: string;
//   content: string;
//   level: number; // h1, h2, etc.
// }

export interface ListSection {
  type: 'list';
  heading?: string;
  content: string[];
}

export interface CodeSection {
  type: 'code';
  heading?: string;
  content: string;
  language?: string;
}

export interface QuoteSection {
  type: 'quote';
  heading?: string;
  content: string;
  author?: string;
}

export interface ProjectContent {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
}

export interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  location: string;
}
