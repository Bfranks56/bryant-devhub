import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';

import { ContentService } from '../../core/services/content.service';
import { PageContent } from '../../shared/interfaces/pageContent/content.dto';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';

@Component({
  selector: 'app-default-page',
  imports: [SafeHtmlPipe],
  templateUrl: './default-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultPageComponent {
  private contentService = inject(ContentService);
  pageContent: Signal<PageContent> = this.contentService.getLandingContent();
}
