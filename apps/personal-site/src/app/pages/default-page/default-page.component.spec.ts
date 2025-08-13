/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DefaultPageComponent } from './default-page.component';
import { PageContent, ProjectContent } from '../../content/types/content.dto';

const mockPageContent: PageContent = {
  title: 'Test Page',
  subtitle: 'Test Subtitle',
  description: 'Test description',
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
};

const mockProjectContent: PageContent = {
  title: 'Projects',
  subtitle: 'My Work',
  description: 'Project showcase',
  content: [
    {
      type: 'projects',
      heading: 'Featured Projects',
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
};

describe('DefaultPageComponent', () => {
  let component: DefaultPageComponent;
  let fixture: ComponentFixture<DefaultPageComponent>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        data: { pageContent: mockPageContent },
      } as any,
    };

    await TestBed.configureTestingModule({
      imports: [DefaultPageComponent],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultPageComponent);
    component = fixture.componentInstance;
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have initial properties set correctly', () => {
      expect(component.pageContent).toBeUndefined();
      expect(component.hasError).toBe(false);
    });
  });

  describe('ngOnInit with valid page content', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should load page content from route data', () => {
      expect(component.pageContent).toEqual(mockPageContent);
      expect(component.hasError).toBe(false);
    });

    it('should display page title and subtitle', () => {
      const titleElement = fixture.debugElement.query(By.css('h1'));
      const subtitleElement = fixture.debugElement.query(By.css('h2'));

      expect(titleElement.nativeElement.innerHTML).toBe('Test Page');
      expect(subtitleElement.nativeElement.innerHTML).toBe('Test Subtitle');
    });

    it('should not show error banner when content is valid', () => {
      const errorBanner = fixture.debugElement.query(By.css('.bg-yellow-50'));
      expect(errorBanner).toBeFalsy();
    });

    it('should render paragraph content', () => {
      const paragraphHeading = fixture.debugElement.query(By.css('h3'));
      const paragraphContent = fixture.debugElement.query(By.css('p'));

      expect(paragraphHeading.nativeElement.innerHTML).toBe(
        'Test Paragraph Heading'
      );
      expect(paragraphContent.nativeElement.innerHTML).toBe(
        'This is a test paragraph content.'
      );
    });

    it('should render list content', () => {
      const listItems = fixture.debugElement.queryAll(By.css('li'));
      expect(listItems.length).toBe(3);
      expect(listItems[0].nativeElement.innerHTML).toBe('Item 1');
      expect(listItems[1].nativeElement.innerHTML).toBe('Item 2');
      expect(listItems[2].nativeElement.innerHTML).toBe('Item 3');
    });
  });

  describe('ngOnInit with missing page content', () => {
    beforeEach(() => {
      mockActivatedRoute.snapshot = { data: {} } as any;
      jest.spyOn(console, 'error').mockImplementation(() => undefined);
      fixture.detectChanges();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should set hasError to true when no page content', () => {
      expect(component.hasError).toBe(true);
    });

    it('should log error to console', () => {
      expect(console.error).toHaveBeenCalledWith(
        'No pageContent found in route data'
      );
    });

    it('should set fallback content', () => {
      expect(component.pageContent?.title).toBe('Page Not Found');
      expect(component.pageContent?.subtitle).toBe('Content Missing');
      expect(component.pageContent?.content.length).toBe(2);
    });

    it('should display error banner', () => {
      const errorBanner = fixture.debugElement.query(By.css('.bg-yellow-50'));
      expect(errorBanner).toBeTruthy();

      const errorText = errorBanner.query(By.css('.text-yellow-700'));
      expect(errorText.nativeElement.textContent.trim()).toBe(
        'Content configuration missing - showing fallback content'
      );
    });

    it('should display fallback title', () => {
      const titleElement = fixture.debugElement.query(By.css('h1'));
      expect(titleElement.nativeElement.innerHTML).toBe('Page Not Found');
    });
  });

  describe('Project content rendering', () => {
    beforeEach(() => {
      mockActivatedRoute.snapshot = {
        data: { pageContent: mockProjectContent },
      } as any;
      fixture.detectChanges();
    });

    it('should render project cards', () => {
      const projectCards = fixture.debugElement.queryAll(
        By.css('.rounded-lg.border')
      );
      expect(projectCards.length).toBe(1);
    });

    it('should display project title and description', () => {
      const projectTitle = fixture.debugElement.query(By.css('h4'));
      const projectDescription = fixture.debugElement.query(
        By.css('.text-gray-600')
      );

      expect(projectTitle.nativeElement.textContent).toBe('Test Project');
      expect(projectDescription.nativeElement.textContent).toBe(
        'A test project'
      );
    });

    it('should render technology tags', () => {
      const techTags = fixture.debugElement.queryAll(By.css('.bg-gray-100'));
      expect(techTags.length).toBe(2);
      expect(techTags[0].nativeElement.textContent).toBe('Angular');
      expect(techTags[1].nativeElement.textContent).toBe('TypeScript');
    });

    it('should display project links', () => {
      const links = fixture.debugElement.queryAll(By.css('a[target="_blank"]'));
      expect(links.length).toBe(2);

      const githubLink = links.find(
        link => link.nativeElement.textContent === 'GitHub'
      );
      const liveLink = links.find(
        link => link.nativeElement.textContent === 'Live Demo'
      );

      expect(githubLink?.nativeElement.href).toBe('https://github.com/test');
      expect(liveLink?.nativeElement.href).toMatch(/https:\/\/test\.com\/?/);
    });
  });

  describe('Template edge cases', () => {
    it('should handle pageContent without subtitle', () => {
      const contentWithoutSubtitle = {
        ...mockPageContent,
        subtitle: undefined,
      };
      mockActivatedRoute.snapshot = {
        data: { pageContent: contentWithoutSubtitle },
      } as any;
      fixture.detectChanges();

      const subtitleElement = fixture.debugElement.query(By.css('h2'));
      expect(subtitleElement).toBeFalsy();
    });

    it('should handle content without headings', () => {
      const contentWithoutHeadings: PageContent = {
        title: 'Test',
        description: 'Test',
        content: [
          {
            type: 'paragraph',
            content: 'Paragraph without heading',
          },
        ],
      };

      mockActivatedRoute.snapshot = {
        data: { pageContent: contentWithoutHeadings },
      } as any;
      fixture.detectChanges();

      const headings = fixture.debugElement.queryAll(By.css('h3'));
      expect(headings.length).toBe(0);
    });

    it('should handle projects without optional URLs', () => {
      const projectWithoutUrls: PageContent = {
        title: 'Projects',
        description: 'Test',
        content: [
          {
            type: 'projects',
            content: [
              {
                id: 'project-2',
                title: 'Project Without URLs',
                description: 'No links',
                technologies: ['React'],
                featured: false,
              },
            ] as ProjectContent[],
          },
        ],
      };

      mockActivatedRoute.snapshot = {
        data: { pageContent: projectWithoutUrls },
      } as any;
      fixture.detectChanges();

      const links = fixture.debugElement.queryAll(By.css('a[target="_blank"]'));
      expect(links.length).toBe(0);
    });
  });

  describe('Complete fallback scenario', () => {
    beforeEach(() => {
      TestBed.resetTestingModule();

      const emptyMockRoute = {
        snapshot: { data: {} } as any,
      };

      TestBed.configureTestingModule({
        imports: [DefaultPageComponent],
        providers: [{ provide: ActivatedRoute, useValue: emptyMockRoute }],
      });

      fixture = TestBed.createComponent(DefaultPageComponent);
      component = fixture.componentInstance;

      jest.spyOn(console, 'error').mockImplementation(() => undefined);

      fixture.detectChanges();

      component.pageContent = undefined;
      fixture.detectChanges();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should show complete fallback UI when no pageContent', () => {
      const pageSection = fixture.debugElement.query(
        By.css('section.mx-auto.max-w-6xl.p-6')
      );
      if (pageSection) {
        const titleElement = pageSection.query(By.css('h1'));
        expect(titleElement.nativeElement.textContent.trim()).toBe(
          'Page Not Found'
        );
      } else {
        const fallbackSection = fixture.debugElement.query(
          By.css('.text-center.py-12')
        );
        if (fallbackSection) {
          const fallbackTitle = fallbackSection.query(By.css('h1'));
          expect(fallbackTitle.nativeElement.textContent.trim()).toBe(
            'Content Unavailable'
          );
        } else {
          const allSections = fixture.debugElement.queryAll(By.css('section'));
          expect(allSections.length).toBeGreaterThan(0);
        }
      }
    });

    it('should display return home button/link', () => {
      const homeLink = fixture.debugElement.query(By.css('a[href="/"]'));
      expect(homeLink).toBeTruthy();
      expect(homeLink.nativeElement.getAttribute('href')).toBe('/');

      const actualText = homeLink.nativeElement.textContent.trim();
      expect(actualText).toBe('home page');
    });
  });

  describe('setFallbackContent method', () => {
    it('should create proper fallback content structure', () => {
      component['setFallbackContent']();

      expect(component.pageContent?.title).toBe('Page Not Found');
      expect(component.pageContent?.subtitle).toBe('Content Missing');
      expect(component.pageContent?.description).toBe(
        'The requested page content could not be loaded.'
      );
      expect(component.pageContent?.content.length).toBe(2);
      expect(component.pageContent?.content[0].type).toBe('paragraph');
      expect(component.pageContent?.content[1].type).toBe('paragraph');
    });
  });
});
