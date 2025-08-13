import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HOME_CONTENT } from '../../content';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  pageContent = HOME_CONTENT;
}
