import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ParagraphSection } from '../../../../interfaces/pageContent/content.dto';
import { SafeHtmlPipe } from '../../../../pipes/safe-html.pipe';

@Component({
  selector: 'app-paragraph-block',
  standalone: true,
  imports: [SafeHtmlPipe],
  templateUrl: './paragraph-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParagraphBlockComponent {
  section = input.required<ParagraphSection>();
}
