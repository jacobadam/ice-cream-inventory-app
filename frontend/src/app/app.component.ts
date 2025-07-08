import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'ice-cream-inventory';
  isOpen = true;

  private breakpointObserver = inject(BreakpointObserver);

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(min-width: 1024px)'])
      .subscribe(({ matches }) => {
        this.isOpen = matches;
      });
  }

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }

  closeSidebar(): void {
    if (!this.breakpointObserver.isMatched('(min-width: 1024px)')) {
      this.isOpen = false;
    }
  }
}
