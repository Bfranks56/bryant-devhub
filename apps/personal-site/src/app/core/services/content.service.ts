import { Injectable, signal, Signal } from '@angular/core';

import { ABOUT_SECTIONS } from '../../content/page-copy/about.content';
import { CONTACT_SECTIONS } from '../../content/page-copy/contact.content';
import { HOME_SECTIONS } from '../../content/page-copy/home.content';
import { PROJECTS_SECTIONS } from '../../content/page-copy/projects.content';
import { PageContent } from '../../shared/interfaces/pageContent/content.dto';

@Injectable({ providedIn: 'root' })
export class ContentService {
  /** Single scrollable page — fragment routing replaces separate route components (Issue #1). */
  getLandingContent(): Signal<PageContent> {
    return signal({
      title: 'Bryant Franks',
      subtitle: 'Angular Engineer & Full-Stack Developer.',
      description:
        '6 years of Angular. Growing full-stack with Spring Boot and Java. Pretty good at Street Fighter.',
      stats: [
        { value: '6+', label: 'Years Angular' },
        { value: 'Angular', label: '+ Spring Boot' },
        { value: 'Ford', label: 'Motor Co. (Current)', spanFull: true },
      ],
      ctas: [
        { label: 'See My Work', fragment: 'projects', variant: 'primary' },
        { label: 'Get In Touch', fragment: 'contact', variant: 'secondary' },
      ],
      sections: [
        ...HOME_SECTIONS,
        ...ABOUT_SECTIONS,
        ...PROJECTS_SECTIONS,
        ...CONTACT_SECTIONS,
      ],
    });
  }
}
