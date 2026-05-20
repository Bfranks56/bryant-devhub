import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ProjectSection } from '../../../../interfaces/pageContent/content.dto';
import { SafeHtmlPipe } from '../../../../pipes/safe-html.pipe';

@Component({
  selector: 'app-projects-block',
  standalone: true,
  imports: [SafeHtmlPipe],
  templateUrl: './projects-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsBlockComponent {
  section = input.required<ProjectSection>();
}
