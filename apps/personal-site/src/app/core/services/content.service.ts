import { inject, Injectable, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ABOUT_SECTIONS } from '../../content/page-copy/about.content';
import { CONTACT_SECTIONS } from '../../content/page-copy/contact.content';
import { HOME_SECTIONS } from '../../content/page-copy/home.content';
import { PROJECTS_SECTIONS } from '../../content/page-copy/projects.content';
import { PageContent } from '../../shared/interfaces/pageContent/content.dto';

@Injectable({ providedIn: 'root' })
export class ContentService {
  // Injected for future CMS migration: toSignal(this.http.get<PageContent>('/api/content/...'))
  private http = inject(HttpClient);

  getHomeContent(): Signal<PageContent> {
    return signal({
      title: 'Bryant Franks',
      subtitle: 'Angular Engineer & Full-Stack Developer',
      description:
        '6 years of Angular. Growing full-stack with Spring Boot and Java.',
      sections: HOME_SECTIONS,
    });
  }

  getAboutContent(): Signal<PageContent> {
    return signal({
      title: 'About Me',
      sections: ABOUT_SECTIONS,
    });
  }

  getProjectsContent(): Signal<PageContent> {
    return signal({
      title: 'My Projects',
      subtitle: "What I've been working on",
      sections: PROJECTS_SECTIONS,
    });
  }

  getContactContent(): Signal<PageContent> {
    return signal({
      title: 'Get In Touch',
      sections: CONTACT_SECTIONS,
    });
  }

  /** Temporary: combined single-page view used by DefaultPageComponent until
   *  Issue #1 (routing) replaces this with per-page route components. */
  getLandingContent(): Signal<PageContent> {
    return signal({
      title: 'Bryant Franks',
      subtitle: 'Angular Engineer & Full-Stack Developer.',
      description:
        '6 years of Angular. Growing full-stack with Spring Boot and Java. Pretty good at Street Fighter.',
      sections: [
        ...HOME_SECTIONS,
        ...ABOUT_SECTIONS,
        ...PROJECTS_SECTIONS,
        ...CONTACT_SECTIONS,
      ],
    });
  }
}
