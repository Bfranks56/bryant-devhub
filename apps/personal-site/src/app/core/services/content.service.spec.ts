import { TestBed } from '@angular/core/testing';
import { isSignal } from '@angular/core';

import { ContentService } from './content.service';
import { HOME_SECTIONS } from '../../content/page-copy/home.content';
import { ABOUT_SECTIONS } from '../../content/page-copy/about.content';
import { PROJECTS_SECTIONS } from '../../content/page-copy/projects.content';
import { CONTACT_SECTIONS } from '../../content/page-copy/contact.content';
import { PageContent } from '../../shared/interfaces/pageContent/content.dto';

describe('ContentService', () => {
  let service: ContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ─── Return type: Signal<PageContent> ────────────────────────────────────────

  describe('return types', () => {
    it('getLandingContent() returns a Signal', () => {
      expect(isSignal(service.getLandingContent())).toBe(true);
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
    it('getLandingContent() returns a new signal on each call', () => {
      const a = service.getLandingContent();
      const b = service.getLandingContent();
      expect(a).not.toBe(b);
    });
  });
});
