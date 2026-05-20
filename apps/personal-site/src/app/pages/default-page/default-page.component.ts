import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';

import { ContentService } from '../../core/services/content.service';
import { PageContent } from '../../shared/interfaces/pageContent/content.dto';
import { HeroSectionComponent } from '../../shared/components/hero-section/hero-section.component';
import { PageSectionComponent } from '../../shared/components/page-section/page-section.component';

@Component({
  selector: 'app-default-page',
  standalone: true,
  imports: [HeroSectionComponent, PageSectionComponent],
  templateUrl: './default-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultPageComponent {
  private contentService = inject(ContentService);
  pageContent: Signal<PageContent> = this.contentService.getLandingContent();
}
