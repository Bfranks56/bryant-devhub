import { ChangeDetectionStrategy, Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private platformId = inject(PLATFORM_ID);
  open = signal(false);

  scrollToSection(sectionId: string, event?: Event) {
    if (event) {
      event.preventDefault();
    }

    if (!isPlatformBrowser(this.platformId)) return;

    const element = document.getElementById(sectionId);
    if (element) {
      document.documentElement.scrollTo({
        top: element.offsetTop - 68,
        behavior: 'smooth',
      });
    }

    this.open.set(false);
  }

  scrollToTop() {
    if (!isPlatformBrowser(this.platformId)) return;

    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    this.open.set(false);
  }
}
