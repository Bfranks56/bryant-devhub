import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private viewportScroller = inject(ViewportScroller);
  open = signal(false);

  constructor() {
    this.viewportScroller.setOffset([0, 68]);
  }

  scrollToSection(sectionId: string, event?: Event): void {
    if (event) event.preventDefault();
    this.viewportScroller.scrollToAnchor(sectionId);
    this.open.set(false);
  }

  scrollToTop(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.open.set(false);
  }
}
