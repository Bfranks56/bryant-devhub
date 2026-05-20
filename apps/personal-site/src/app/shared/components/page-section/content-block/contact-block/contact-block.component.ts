import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { ContactSection } from '../../../../interfaces/pageContent/content.dto';

@Component({
  selector: 'app-contact-block',
  standalone: true,
  imports: [],
  templateUrl: './contact-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactBlockComponent {
  section = input.required<ContactSection>();

  githubDisplay = computed(() =>
    this.section().info.github.replace('https://', '')
  );
}
