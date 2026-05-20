import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CtaButton, HeroStat } from '../../interfaces/pageContent/content.dto';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [SafeHtmlPipe, RouterLink],
  templateUrl: './hero-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
  title = input.required<string>();
  subtitle = input<string | undefined>();
  description = input<string | undefined>();
  stats = input<HeroStat[]>([]);
  ctas = input<CtaButton[]>([]);
}
