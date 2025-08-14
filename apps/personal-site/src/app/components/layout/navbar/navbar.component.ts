import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  open = false;

  scrollToSection(sectionId: string, event?: Event) {
    if (event) {
      event.preventDefault();
    }

    const element = document.getElementById(sectionId);
    if (element) {
      document.documentElement.scrollTo({
        top: element.offsetTop - 68, // Adjust for fixed header
        behavior: 'smooth',
      });
    }

    this.open = false;
  }

  scrollToTop() {
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
