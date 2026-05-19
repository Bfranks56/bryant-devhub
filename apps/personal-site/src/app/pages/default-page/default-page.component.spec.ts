import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';

import { DefaultPageComponent } from './default-page.component';
import { ContentService } from '../../core/services/content.service';
import {
  PageContent,
  ProjectContent,
} from '../../shared/interfaces/pageContent/content.dto';

const mockProjectEntry: ProjectContent = {
  id: 'project-1',
  title: 'Test Project',
  description: 'A test project',
  technologies: ['Angular', 'TypeScript'],
  githubUrl: 'https://github.com/test',
  liveUrl: 'https://test.com',
  featured: true,
};

const mockSectionsContent: PageContent = {
  title: 'Bryant Franks',
  subtitle: 'Angular Engineer',
  description: '6 years of Angular.',
  stats: [
    { value: '6+', label: 'Years Angular' },
    { value: 'Angular', label: '+ Spring Boot' },
    { value: 'Ford', label: 'Motor Co. (Current)', spanFull: true },
  ],
  sections: [
    {
      id: 'home',
      heading: 'Welcome',
      content: [
        { type: 'paragraph', content: 'Hello world.' },
        { type: 'list', heading: 'Skills', content: ['Angular', 'TypeScript'] },
      ],
    },
    {
      id: 'projects',
      heading: 'My Projects',
      content: [
        { type: 'projects', heading: 'Featured', content: [mockProjectEntry] },
      ],
    },
  ],
};

const mockProjectContent: PageContent = {
  title: 'Projects',
  subtitle: 'My Work',
  sections: [
    {
      id: 'projects',
      heading: 'Featured Projects',
      content: [
        {
          type: 'projects',
          heading: 'Featured',
          content: [mockProjectEntry],
        },
      ],
    },
  ],
};

async function setup(
  pageContent: PageContent | undefined
): Promise<{ component: DefaultPageComponent; fixture: ComponentFixture<DefaultPageComponent> }> {
  TestBed.resetTestingModule();
  await TestBed.configureTestingModule({
    imports: [DefaultPageComponent],
    providers: [
      {
        provide: ContentService,
        useValue: {
          getLandingContent: () => signal(pageContent as PageContent | undefined),
        },
      },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(DefaultPageComponent);
  const component = fixture.componentInstance;
  fixture.detectChanges();
  return { component, fixture };
}

describe('DefaultPageComponent', () => {
  describe('Component creation', () => {
    it('should create', async () => {
      const { component } = await setup(mockSectionsContent);
      expect(component).toBeTruthy();
    });

    it('should load pageContent from ContentService', async () => {
      const { component } = await setup(mockSectionsContent);
      expect(component.pageContent()).toEqual(mockSectionsContent);
    });
  });

  describe('Hero section', () => {
    it('should display page title in h1', async () => {
      const { fixture } = await setup(mockSectionsContent);
      const h1 = fixture.debugElement.query(By.css('h1'));
      expect(h1.nativeElement.innerHTML).toBe('Bryant Franks');
    });

    it('should display subtitle in hero h2', async () => {
      const { fixture } = await setup(mockSectionsContent);
      const h2 = fixture.debugElement.query(By.css('h2.text-3xl'));
      expect(h2.nativeElement.innerHTML).toBe('Angular Engineer');
    });

    it('should not render hero subtitle element when subtitle is absent', async () => {
      const { fixture } = await setup({ ...mockSectionsContent, subtitle: undefined });
      const heroH2 = fixture.debugElement.query(By.css('h2.text-3xl'));
      expect(heroH2).toBeFalsy();
    });

    it('should render hero stats including a full-width item', async () => {
      const { fixture } = await setup(mockSectionsContent);
      const statValues = fixture.debugElement.queryAll(By.css('.grid .text-3xl'));
      expect(statValues.map(el => el.nativeElement.textContent.trim())).toEqual([
        '6+',
        'Angular',
        'Ford',
      ]);
      const fullWidthStat = fixture.debugElement.query(
        By.css('.col-span-2.lg\\:col-span-1')
      );
      expect(fullWidthStat).toBeTruthy();
    });
  });

  describe('Sections rendering', () => {
    it('should render a section for each PageSection', async () => {
      const { fixture } = await setup(mockSectionsContent);
      const sections = fixture.debugElement.queryAll(By.css('section[id]'));
      expect(sections.length).toBe(2);
    });

    it('should render section headings', async () => {
      const { fixture } = await setup(mockSectionsContent);
      const headings = fixture.debugElement.queryAll(By.css('section[id] h2.text-5xl'));
      const headingTexts = headings.map(el => el.nativeElement.textContent.trim());
      expect(headingTexts).toContain('Welcome');
      expect(headingTexts).toContain('My Projects');
    });

    it('should render paragraph content', async () => {
      const { fixture } = await setup(mockSectionsContent);
      const p = fixture.debugElement.query(By.css('p.text-xl.text-gray-700:not(.mb-12)'));
      expect(p.nativeElement.innerHTML).toBe('Hello world.');
    });

    it('should render list items', async () => {
      const { fixture } = await setup(mockSectionsContent);
      const items = fixture.debugElement.queryAll(By.css('span.text-lg.text-gray-700'));
      const texts = items.map(el => el.nativeElement.textContent.trim());
      expect(texts).toContain('Angular');
      expect(texts).toContain('TypeScript');
    });
  });

  describe('Project rendering', () => {
    it('should render project cards', async () => {
      const { fixture } = await setup(mockProjectContent);
      const cards = fixture.debugElement.queryAll(By.css('.rounded-2xl.border'));
      expect(cards.length).toBe(1);
    });

    it('should display project title and description', async () => {
      const { fixture } = await setup(mockProjectContent);
      const title = fixture.debugElement.query(By.css('h4'));
      const desc = fixture.debugElement.query(By.css('p.text-gray-600.mb-6'));
      expect(title.nativeElement.textContent.trim()).toBe('Test Project');
      expect(desc.nativeElement.innerHTML).toBe('A test project');
    });

    it('should render technology tags', async () => {
      const { fixture } = await setup(mockProjectContent);
      const tags = fixture.debugElement.queryAll(By.css('.bg-blue-50'));
      expect(tags.length).toBe(2);
    });

    it('should display GitHub and Live Demo links', async () => {
      const { fixture } = await setup(mockProjectContent);
      const links = fixture.debugElement.queryAll(By.css('a[target="_blank"]'));
      expect(links.length).toBe(2);
      const github = links.find(l => l.nativeElement.textContent.includes('GitHub'));
      const live = links.find(l => l.nativeElement.textContent.includes('Live Demo'));
      expect(github?.nativeElement.href).toMatch(/https:\/\/github\.com\/test\/?/);
      expect(live?.nativeElement.href).toMatch(/https:\/\/test\.com\/?/);
    });

    it('should show badge when no URLs provided', async () => {
      const noUrlContent: PageContent = {
        title: 'Projects',
        sections: [
          {
            id: 'projects',
            heading: 'Projects',
            content: [
              {
                type: 'projects',
                content: [
                  {
                    id: 'p2',
                    title: 'Private Project',
                    description: 'No links',
                    technologies: ['Python'],
                    featured: false,
                    badge: 'Private Repo',
                  },
                ] as ProjectContent[],
              },
            ],
          },
        ],
      };
      const { fixture } = await setup(noUrlContent);
      const badge = fixture.debugElement.query(By.css('.bg-amber-50'));
      expect(badge.nativeElement.textContent.trim()).toContain('Private Repo');
    });
  });

  describe('Fallback when no pageContent', () => {
    it('should show Content Unavailable in fallback section', async () => {
      const { fixture } = await setup(undefined);
      const fallbackH1 = fixture.debugElement.query(By.css('h1.mt-4'));
      expect(fallbackH1.nativeElement.textContent.trim()).toBe('Content Unavailable');
    });

    it('should display return home link', async () => {
      const { fixture } = await setup(undefined);
      const link = fixture.debugElement.query(By.css('a[href="/"]'));
      expect(link).toBeTruthy();
      expect(link.nativeElement.textContent.trim()).toBe('Return to Home');
    });
  });
});
