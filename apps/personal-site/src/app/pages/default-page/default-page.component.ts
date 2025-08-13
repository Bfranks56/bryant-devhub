import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PageContent } from '../../content/types/content.dto';

@Component({
  selector: 'app-default-page',
  imports: [CommonModule],
  templateUrl: './default-page.component.html',
  styleUrl: './default-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  pageContent!: PageContent;
  // constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.pageContent = this.route.snapshot.data['pageContent'];
  }
}
