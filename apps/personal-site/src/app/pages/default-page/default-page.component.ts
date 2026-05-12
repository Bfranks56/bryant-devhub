import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { PageContent } from '../../shared/interfaces/pageContent/content.dto';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';

@Component({
  selector: 'app-default-page',
  imports: [SafeHtmlPipe],
  templateUrl: './default-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultPageComponent {
  private route = inject(ActivatedRoute);

  pageContent = toSignal(
    this.route.data.pipe(map(data => data['pageContent'] as PageContent | undefined))
  );
}
