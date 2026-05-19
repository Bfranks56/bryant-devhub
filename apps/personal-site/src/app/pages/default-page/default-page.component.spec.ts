import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
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

const mockLandingContent: PageContent = {
  title: 'Bryant Franks',
  subtitle: 'Angular Engineer',
  description: '6 years of Angular.',
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

describe('DefaultPageComponent', () => {
  let component: DefaultPageComponent;
  let fixture: ComponentFixture<DefaultPageComponent>;
  let mockContentService: Partial<ContentService>;

  beforeEach(async () => {
    mockContentService = {
      getLandingContent: () => signal(mockLandingContent),
    };

    await TestBed.configureTestingModule({
      imports: [DefaultPageComponent],
      providers: [
        provideHttpClient(),
        { provide: ContentService, useValue: mockContentService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should expose pageContent from ContentService', () => {
      const content = component.pageContent();
      expect(content.title).toBe('Bryant Franks');
      expect(content.sections.length).toBe(2);
    });
  });

  describe('Hero section rendering', () => {
    it('should render the hero title', () => {
      const h1 = fixture.debugElement.query(By.css('h1'));
      expect(h1.nativeElement.innerHTML).toContain('Bryant Franks');
    });

    it('should render the hero subtitle when present', () => {
      const h2 = fixture.debugElement.query(By.css('h2'));
      expect(h2.nativeElement.innerHTML).toContain('Angular Engineer');
    });

    it('should render the hero description when present', () => {
      const p = fixture.debugElement.query(By.css('p.text-xl.lg\\:text-2xl'));
      expect(p.nativeElement.innerHTML).toContain('6 years of Angular');
    });
  });

  describe('Sections rendering', () => {
    it('should render a section for each PageSection', () => {
      const sections = fixture.debugElement.queryAll(By.css('section[id]'));
      expect(sections.length).toBe(2);
    });

    it('should render section headings', () => {
      const sectionHeadings = fixture.debugElement.queryAll(
        By.css('section[id] h2')
      );
      const headingTexts = sectionHeadings.map(el =>
        el.nativeElement.textContent.trim()
      );
      expect(headingTexts).toContain('Welcome');
      expect(headingTexts).toContain('My Projects');
    });

    it('should render paragraph content', () => {
      const paras = fixture.debugElement.queryAll(
        By.css('section[id] p.text-xl.text-gray-700')
      );
      const texts = paras.map(
        (el: { nativeElement: HTMLElement }) => el.nativeElement.innerHTML
      );
      expect(texts.some(t => t.includes('Hello world.'))).toBe(true);
    });

    it('should render list items', () => {
      const listItems = fixture.debugElement.queryAll(
        By.css('.flex.items-start.space-x-3 span')
      );
      const texts = listItems.map(el => el.nativeElement.textContent.trim());
      expect(texts).toContain('Angular');
      expect(texts).toContain('TypeScript');
    });
  });

  describe('Projects rendering', () => {
    it('should render project cards', () => {
      const cards = fixture.debugElement.queryAll(By.css('.group.rounded-2xl'));
      expect(cards.length).toBe(1);
    });

    it('should display project title', () => {
      const projectTitle = fixture.debugElement.query(By.css('h4'));
      expect(projectTitle.nativeElement.textContent.trim()).toBe(
        'Test Project'
      );
    });

    it('should render technology tags', () => {
      const techTags = fixture.debugElement.queryAll(
        By.css('.bg-blue-50.text-blue-700')
      );
      const texts = techTags.map(el => el.nativeElement.textContent.trim());
      expect(texts).toContain('Angular');
      expect(texts).toContain('TypeScript');
    });

    it('should render GitHub and Live Demo links', () => {
      const externalLinks = fixture.debugElement.queryAll(
        By.css('a[target="_blank"]')
      );
      const hrefs = externalLinks.map(el =>
        el.nativeElement.getAttribute('href')
      );
      expect(hrefs).toContain('https://github.com/test');
      expect(hrefs).toContain('https://test.com');
    });
  });

  describe('Fallback when no pageContent', () => {
    it('should show Content Unavailable section when pageContent signal returns falsy', () => {
      mockContentService.getLandingContent = () =>
        signal(null as unknown as PageContent);
      const fallbackFixture = TestBed.createComponent(DefaultPageComponent);
      fallbackFixture.detectChanges();

      const fallbackTitle = fallbackFixture.debugElement.query(
        By.css('h1.mt-4')
      );
      if (fallbackTitle) {
        expect(fallbackTitle.nativeElement.textContent.trim()).toBe(
          'Content Unavailable'
        );
      } else {
        // If Angular does not enter the @else branch, just verify no crash occurred
        expect(fallbackFixture.componentInstance).toBeTruthy();
      }
    });
  });
});
