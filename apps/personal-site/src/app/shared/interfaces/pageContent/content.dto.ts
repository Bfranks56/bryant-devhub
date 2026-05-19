export interface HeroStat {
  label: string;
  value: string;
}

export interface PageContent {
  title: string;
  subtitle?: string;
  description?: string;
  stats?: HeroStat[];
  sections: PageSection[];
}

export interface PageSection {
  id: string;
  heading: string;
  subtitle?: string;
  content: ContentSection[];
}

export type ContentSection =
  | ParagraphSection
  | ListSection
  | CodeSection
  | QuoteSection
  | ProjectSection
  | ContactSection
  | SectionHeaderSection;
export interface ParagraphSection {
  type: 'paragraph';
  heading?: string;
  content: string;
}

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

export interface ProjectSection {
  type: 'projects';
  heading?: string;
  content: ProjectContent[];
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
  badge?: string;
}

export interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  location: string;
}

export interface ContactSection {
  type: 'contact';
  info: ContactInfo;
}

export interface SectionHeaderSection {
  type: 'section-header';
  heading: string;
  id: string;
  subtitle?: string;
}
