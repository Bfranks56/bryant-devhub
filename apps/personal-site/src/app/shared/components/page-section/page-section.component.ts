import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { PageSection } from '../../interfaces/pageContent/content.dto';
import { ContentBlockComponent } from './content-block/content-block.component';

@Component({
  selector: 'app-page-section',
  standalone: true,
  imports: [ContentBlockComponent],
  templateUrl: './page-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSectionComponent {
  section = input.required<PageSection>();
  index = input.required<number>();
}
