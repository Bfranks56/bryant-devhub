import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private viewportScroller = inject(ViewportScroller);
  private router = inject(Router);
  open = signal(false);

  constructor() {
    this.viewportScroller.setOffset([0, 68]);
  }

  goHome(): void {
    this.router.navigate(['/']);
    this.viewportScroller.scrollToPosition([0, 0]);
    this.open.set(false);
  }

  closeMenu(): void {
    this.open.set(false);
  }
}
