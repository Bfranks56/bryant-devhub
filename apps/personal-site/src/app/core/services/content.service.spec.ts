import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { isSignal } from '@angular/core';

import { ContentService } from './content.service';
import { HOME_SECTIONS } from '../../content/page-copy/home.content';
import { ABOUT_SECTIONS } from '../../content/page-copy/about.content';
import { PROJECTS_SECTIONS } from '../../content/page-copy/projects.content';
import { CONTACT_SECTIONS } from '../../content/page-copy/contact.content';
import {
  PageContent,
  PageSection,
} from '../../shared/interfaces/pageContent/content.dto';

describe('ContentService', () => {
  let service: ContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(ContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ─── Return type: Signal<PageContent> ────────────────────────────────────────

  describe('return types', () => {
    it('getHomeContent() returns a Signal', () => {
      expect(isSignal(service.getHomeContent())).toBe(true);
    });

    it('getAboutContent() returns a Signal', () => {
      expect(isSignal(service.getAboutContent())).toBe(true);
    });

    it('getProjectsContent() returns a Signal', () => {
      expect(isSignal(service.getProjectsContent())).toBe(true);
    });

    it('getContactContent() returns a Signal', () => {
      expect(isSignal(service.getContactContent())).toBe(true);
    });

    it('getLandingContent() returns a Signal', () => {
      expect(isSignal(service.getLandingContent())).toBe(true);
    });
  });

  // ─── Shape: required PageContent fields ──────────────────────────────────────

  describe('getHomeContent()', () => {
    let content: PageContent;

    beforeEach(() => {
      content = service.getHomeContent()();
    });

    it('has a non-empty title', () => {
      expect(content.title.length).toBeGreaterThan(0);
    });

    it('sections matches HOME_SECTIONS', () => {
      expect(content.sections).toBe(HOME_SECTIONS);
    });

    it('sections is a non-empty array', () => {
      expect(content.sections.length).toBeGreaterThan(0);
    });

    it('each section has id, heading, and non-empty content', () => {
      content.sections.forEach((section: PageSection) => {
        expect(section.id.length).toBeGreaterThan(0);
        expect(section.heading.length).toBeGreaterThan(0);
        expect(section.content.length).toBeGreaterThan(0);
      });
    });
  });

  describe('getAboutContent()', () => {
    let content: PageContent;

    beforeEach(() => {
      content = service.getAboutContent()();
    });

    it('has a non-empty title', () => {
      expect(content.title.length).toBeGreaterThan(0);
    });

    it('sections matches ABOUT_SECTIONS', () => {
      expect(content.sections).toBe(ABOUT_SECTIONS);
    });

    it('sections is a non-empty array', () => {
      expect(content.sections.length).toBeGreaterThan(0);
    });

    it('each section has id, heading, and non-empty content', () => {
      content.sections.forEach((section: PageSection) => {
        expect(section.id.length).toBeGreaterThan(0);
        expect(section.heading.length).toBeGreaterThan(0);
        expect(section.content.length).toBeGreaterThan(0);
      });
    });
  });

  describe('getProjectsContent()', () => {
    let content: PageContent;

    beforeEach(() => {
      content = service.getProjectsContent()();
    });

    it('has a non-empty title', () => {
      expect(content.title.length).toBeGreaterThan(0);
    });

    it('sections matches PROJECTS_SECTIONS', () => {
      expect(content.sections).toBe(PROJECTS_SECTIONS);
    });

    it('sections contains at least one projects-type content block', () => {
      const allBlocks = content.sections.flatMap(s => s.content);
      const projectsBlock = allBlocks.find(b => b.type === 'projects');
      expect(projectsBlock).toBeDefined();
    });

    it('projects block has at least one project entry', () => {
      const allBlocks = content.sections.flatMap(s => s.content);
      const projectsBlock = allBlocks.find(b => b.type === 'projects');
      if (projectsBlock?.type === 'projects') {
        expect(projectsBlock.content.length).toBeGreaterThan(0);
      }
    });
  });

  describe('getContactContent()', () => {
    let content: PageContent;

    beforeEach(() => {
      content = service.getContactContent()();
    });

    it('has a non-empty title', () => {
      expect(content.title.length).toBeGreaterThan(0);
    });

    it('sections matches CONTACT_SECTIONS', () => {
      expect(content.sections).toBe(CONTACT_SECTIONS);
    });

    it('sections is a non-empty array', () => {
      expect(content.sections.length).toBeGreaterThan(0);
    });
  });

  // ─── getLandingContent(): combined sections ───────────────────────────────────

  describe('getLandingContent()', () => {
    let content: PageContent;

    beforeEach(() => {
      content = service.getLandingContent()();
    });

    it('has a non-empty title', () => {
      expect(content.title.length).toBeGreaterThan(0);
    });

    it('sections includes all sections from all four content files', () => {
      const expectedCount =
        HOME_SECTIONS.length +
        ABOUT_SECTIONS.length +
        PROJECTS_SECTIONS.length +
        CONTACT_SECTIONS.length;
      expect(content.sections.length).toBe(expectedCount);
    });

    it('contains the home section', () => {
      const ids = content.sections.map(s => s.id);
      expect(ids).toContain(HOME_SECTIONS[0].id);
    });

    it('contains the about section', () => {
      const ids = content.sections.map(s => s.id);
      expect(ids).toContain(ABOUT_SECTIONS[0].id);
    });

    it('contains the projects section', () => {
      const ids = content.sections.map(s => s.id);
      expect(ids).toContain(PROJECTS_SECTIONS[0].id);
    });

    it('contains the contact section', () => {
      const ids = content.sections.map(s => s.id);
      expect(ids).toContain(CONTACT_SECTIONS[0].id);
    });
  });

  // ─── Each call returns a fresh independent signal ─────────────────────────────

  describe('signal independence', () => {
    it('getHomeContent() returns a new signal on each call', () => {
      const a = service.getHomeContent();
      const b = service.getHomeContent();
      expect(a).not.toBe(b);
    });

    it('getLandingContent() returns a new signal on each call', () => {
      const a = service.getLandingContent();
      const b = service.getLandingContent();
      expect(a).not.toBe(b);
    });
  });
});
