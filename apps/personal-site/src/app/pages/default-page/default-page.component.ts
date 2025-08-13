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
  hasError = false;

  ngOnInit(): void {
    const routeData = this.route.snapshot.data?.['pageContent'];

    if (!routeData) {
      console.error('No pageContent found in route data');
      this.hasError = true;
      this.setFallbackContent();
      return;
    }

    this.pageContent = routeData;
  }

  private setFallbackContent(): void {
    this.pageContent = {
      title: 'Page Not Found',
      subtitle: 'Content Missing',
      description: 'The requested page content could not be loaded.',
      content: [
        {
          type: 'paragraph',
          heading: 'What happened?',
          content:
            'This page is missing its content configuration. Please check the route setup or contact the site administrator.',
        },
        {
          type: 'paragraph',
          content:
            'You can try navigating back to the <a href="/" class="text-blue-600 hover:underline">home page</a> or use the navigation menu above.',
        },
      ],
    };
  }
}
