import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SeoService } from './seo.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, CommonModule, MatIconModule],
  standalone: true,
  template: `
    <footer class="footer" itemscope itemtype="https://schema.org/Organization">
      <div class="container footer-grid">
        <div>
          <a routerLink="/" class="brand" itemprop="name">
            <span class="brand-mark"><mat-icon>verified_user</mat-icon></span>
            <span>Nova Insurance</span>
          </a>
          <p>Your trusted partner for simple, comprehensive insurance coverage across every stage of life.</p>
          <meta itemprop="url" content="https://nova-insurance.vercel.app">
          <meta itemprop="logo" content="https://nova-insurance.vercel.app/logo.png">
        </div>

        <div>
          <h4>Insurance</h4>
          <ul>
            <li><a routerLink="/health">Health Insurance</a></li>
            <li><a routerLink="/auto">Auto Insurance</a></li>
            <li><a routerLink="/life">Life Insurance</a></li>
            <li><a routerLink="/home-insurance">Home Insurance</a></li>
            <li><a routerLink="/travel">Travel Insurance</a></li>
            <li><a routerLink="/business">Business Insurance</a></li>
          </ul>
        </div>

        <div>
          <h4>Company</h4>
          <ul>
            <li><a routerLink="/about">About Us</a></li>
            <li><a routerLink="/insights">Insights</a></li>
            <li><a routerLink="/contact">Contact Us</a></li>
            <li><a routerLink="/quote">Get Quote</a></li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <div itemscope itemtype="https://schema.org/ContactPoint">
            <p><strong>Phone:</strong><br><span itemprop="telephone">(555) 123-4567</span></p>
            <p><strong>Email:</strong><br><a href="mailto:info@novainsurance.com" itemprop="email">info@novainsurance.com</a></p>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="container">
          <span>&copy; 2026 Nova Insurance. All rights reserved.</span>
          <span>Privacy Policy · Terms · Sitemap</span>
        </div>
      </div>
    </footer>
  `,
  styles: [``]
})
export class FooterComponent implements OnInit {
  constructor(private seoService: SeoService) { }

  ngOnInit(): void {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Nova Insurance",
      "url": "https://nova-insurance.vercel.app",
      "logo": "https://nova-insurance.vercel.app/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-555-123-4567",
        "contactType": "customer service",
        "email": "info@novainsurance.com"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Insurance St",
        "addressLocality": "Insurance City",
        "addressRegion": "IC",
        "postalCode": "12345",
        "addressCountry": "US"
      }
    };
    this.seoService.addStructuredData(structuredData);
  }
}
