import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ListSection } from '../../../../interfaces/pageContent/content.dto';
import { SafeHtmlPipe } from '../../../../pipes/safe-html.pipe';

@Component({
  selector: 'app-list-block',
  standalone: true,
  imports: [SafeHtmlPipe],
  templateUrl: './list-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListBlockComponent {
  section = input.required<ListSection>();
}
