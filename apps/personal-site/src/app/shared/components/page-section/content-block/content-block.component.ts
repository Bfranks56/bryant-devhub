import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import {
  ContactSection,
  ContentSection,
  ListSection,
  ParagraphSection,
  ProjectSection,
} from '../../../interfaces/pageContent/content.dto';
import { ContactBlockComponent } from './contact-block/contact-block.component';
import { ListBlockComponent } from './list-block/list-block.component';
import { ParagraphBlockComponent } from './paragraph-block/paragraph-block.component';
import { ProjectsBlockComponent } from './projects-block/projects-block.component';

@Component({
  selector: 'app-content-block',
  standalone: true,
  imports: [
    ParagraphBlockComponent,
    ListBlockComponent,
    ProjectsBlockComponent,
    ContactBlockComponent,
  ],
  template: `
    @switch (content().type) { @case ('paragraph') {
    <app-paragraph-block [section]="asParagraph()" />
    } @case ('list') {
    <app-list-block [section]="asList()" />
    } @case ('projects') {
    <app-projects-block [section]="asProjects()" />
    } @case ('contact') {
    <app-contact-block [section]="asContact()" />
    } }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentBlockComponent {
  content = input.required<ContentSection>();

  asParagraph(): ParagraphSection {
    return this.content() as ParagraphSection;
  }

  asList(): ListSection {
    return this.content() as ListSection;
  }

  asProjects(): ProjectSection {
    return this.content() as ProjectSection;
  }

  asContact(): ContactSection {
    return this.content() as ContactSection;
  }
}
