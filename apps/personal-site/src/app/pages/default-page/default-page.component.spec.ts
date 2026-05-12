/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { DefaultPageComponent } from './default-page.component';
import {
  PageContent,
  ProjectContent,
} from '../../shared/interfaces/pageContent/content.dto';

const mockSectionsContent: PageContent = {
  title: 'Test Page',
  subtitle: 'Test Subtitle',
  description: 'Test description',
  sections: [
    {
      id: 'test-section',
      heading: 'Test Section',
      content: [
        {
          type: 'paragraph',
          heading: 'Test Paragraph Heading',
          content: 'This is a test paragraph content.',
        },
        {
          type: 'list',
          heading: 'Test List',
          content: ['Item 1', 'Item 2', 'Item 3'],
        },
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
          content: [
            {
              id: 'project-1',
              title: 'Test Project',
              description: 'A test project',
              technologies: ['Angular', 'TypeScript'],
              githubUrl: 'https://github.com/test',
              liveUrl: 'https://test.com',
              featured: true,
            },
          ] as ProjectContent[],
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
      { provide: ActivatedRoute, useValue: { data: of({ pageContent }) } },
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

    it('should load pageContent from route observable', async () => {
      const { component } = await setup(mockSectionsContent);
      expect(component.pageContent()).toEqual(mockSectionsContent);
    });
  });

  describe('Hero section', () => {
    it('should display page title in h1', async () => {
      const { fixture } = await setup(mockSectionsContent);
      const h1 = fixture.debugElement.query(By.css('h1'));
      expect(h1.nativeElement.innerHTML).toBe('Test Page');
    });

    it('should display subtitle in hero h2', async () => {
      const { fixture } = await setup(mockSectionsContent);
      const h2 = fixture.debugElement.query(By.css('h2.text-3xl'));
      expect(h2.nativeElement.innerHTML).toBe('Test Subtitle');
    });

    it('should not render hero subtitle element when subtitle is absent', async () => {
      const { fixture } = await setup({ ...mockSectionsContent, subtitle: undefined });
      const heroH2 = fixture.debugElement.query(By.css('h2.text-3xl'));
      expect(heroH2).toBeFalsy();
    });
  });

  describe('Sections rendering', () => {
    it('should render section heading', async () => {
      const { fixture } = await setup(mockSectionsContent);
      const h2 = fixture.debugElement.query(By.css('h2.text-5xl'));
      expect(h2.nativeElement.textContent.trim()).toBe('Test Section');
    });

    it('should render paragraph content', async () => {
      const { fixture } = await setup(mockSectionsContent);
      // Hero <p> has mb-12; section paragraphs do not
      const p = fixture.debugElement.query(By.css('p.text-xl.text-gray-700:not(.mb-12)'));
      expect(p.nativeElement.innerHTML).toBe('This is a test paragraph content.');
    });

    it('should render list items', async () => {
      const { fixture } = await setup(mockSectionsContent);
      const items = fixture.debugElement.queryAll(By.css('span.text-lg.text-gray-700'));
      expect(items.length).toBe(3);
      expect(items[0].nativeElement.innerHTML).toBe('Item 1');
      expect(items[1].nativeElement.innerHTML).toBe('Item 2');
      expect(items[2].nativeElement.innerHTML).toBe('Item 3');
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
      expect(github?.nativeElement.href).toBe('https://github.com/test');
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
      // Hero h1 is always present; fallback h1 has class mt-4
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
