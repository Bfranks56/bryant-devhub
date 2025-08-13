import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { PageContent } from '../../content/types/content.dto';

@Component({
  selector: 'app-default-page',
  imports: [],
  templateUrl: './default-page.component.html',
  styleUrl: './default-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  pageContent?: PageContent;

  ngOnInit(): void {
    this.pageContent = this.route.snapshot.data?.['pageContent'];
  }
}
