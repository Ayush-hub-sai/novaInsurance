import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SeoService } from './seo.service';

@Component({
  selector: 'app-about',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule],
  standalone: true,
  template: `
    <section class="page-section">
      <div class="container">
        <div class="section-header">
          <p class="section-kicker">About Nova</p>
          <h1 class="section-heading">Insurance guidance that feels personal and practical.</h1>
          <p class="section-copy">Since 2010, Nova Insurance has helped people compare coverage clearly and make confident protection decisions.</p>
        </div>

        <div class="content-grid">
          <mat-card class="content-card">
            <mat-card-content class="article-content">
              <h2>Our Mission</h2>
              <p>We provide comprehensive, affordable insurance solutions that protect what matters most without overwhelming customers with jargon.</p>

              <h2>Our History</h2>
              <p>Founded as a local agency, Nova has grown into a trusted provider through responsive service, thoughtful recommendations, and long-term customer relationships.</p>

              <h2>Our Values</h2>
              <ul>
                <li><strong>Integrity:</strong> We recommend coverage that fits your actual needs.</li>
                <li><strong>Clarity:</strong> We explain options in language that makes decisions easier.</li>
                <li><strong>Support:</strong> We stay available when policies, claims, and life change.</li>
                <li><strong>Value:</strong> We compare carriers to balance price and protection.</li>
              </ul>
            </mat-card-content>
          </mat-card>

          <div class="stack-grid">
            <mat-card class="feature-card">
              <mat-card-content>
                <span class="icon-tile"><mat-icon>support_agent</mat-icon></span>
                <mat-card-title>Talk with us</mat-card-title>
                <p>Have questions about coverage or claims?</p>
                <a mat-flat-button color="primary" routerLink="/contact">Contact Us</a>
              </mat-card-content>
            </mat-card>

            <mat-card class="feature-card">
              <mat-card-content>
                <span class="icon-tile"><mat-icon>request_quote</mat-icon></span>
                <mat-card-title>Start a quote</mat-card-title>
                <p>Find coverage that matches your budget.</p>
                <a mat-stroked-button color="primary" routerLink="/quote">Get Quote</a>
              </mat-card-content>
            </mat-card>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [``]
})
export class AboutComponent implements OnInit {
  constructor(private seoService: SeoService) { }

  ngOnInit(): void {
    this.seoService.updateTitle('About Nova Insurance - Our Mission and Values');
    this.seoService.updateMetaTags([
      { name: 'description', content: 'Learn about Nova Insurance\'s mission, history, and commitment to providing exceptional insurance services. Discover why thousands trust us with their coverage needs.' },
      { property: 'og:title', content: 'About Nova Insurance - Our Mission and Values' },
      { property: 'og:description', content: 'Learn about Nova Insurance\'s mission, history, and commitment to providing exceptional insurance services.' }
    ]);
    this.seoService.setCanonicalUrl('https://nova-insurance.vercel.app/about');
  }
}
