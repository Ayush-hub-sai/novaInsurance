import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SeoService } from './seo.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  standalone: true,
  template: `
    <section class="page-section">
      <div class="container not-found">
        <span class="icon-tile"><mat-icon>travel_explore</mat-icon></span>
        <h1>404</h1>
        <h2>Page not found</h2>
        <p>The page you are looking for may have moved, but we can get you back to coverage.</p>
        <div class="hero-actions">
          <a mat-flat-button color="primary" routerLink="/">Go Home</a>
          <a mat-stroked-button color="primary" routerLink="/contact">Contact Us</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .not-found {
      align-items: center;
      display: flex;
      flex-direction: column;
      min-height: 50vh;
      justify-content: center;
      text-align: center;
    }

    h1 {
      color: var(--primary);
      font-size: clamp(5rem, 16vw, 10rem);
      line-height: 1;
      margin: 0;
    }

    h2 {
      color: var(--ink);
      font-size: clamp(2rem, 5vw, 3.2rem);
      margin: 0 0 12px;
    }

    p {
      color: var(--muted);
      font-size: 1.1rem;
      margin: 0 0 24px;
      max-width: 520px;
    }
  `]
})
export class NotFoundComponent implements OnInit {
  constructor(private seoService: SeoService) { }

  ngOnInit(): void {
    this.seoService.updateTitle('Page Not Found - Nova Insurance');
    this.seoService.updateMetaTags([
      { name: 'description', content: 'The page you are looking for cannot be found. Return to Nova Insurance homepage or contact us for assistance.' },
      { name: 'robots', content: 'noindex, nofollow' }
    ]);
  }
}
