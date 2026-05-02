import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SeoService } from '../../core/services/seo.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink, CommonModule, MatButtonModule, MatCardModule, MatIconModule
  ],
  standalone: true,
  template: `
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <p class="section-kicker">Trusted coverage, simpler choices</p>
          <h1>Protect what matters with insurance that feels clear.</h1>
          <p>Compare coverage for your family, vehicle, home, trips, and business with guidance from advisors who keep the fine print human.</p>
          <div class="hero-actions">
            <a mat-flat-button color="primary" routerLink="/quote">Get a Free Quote</a>
            <a mat-stroked-button routerLink="/about">Why Nova</a>
          </div>
        </div>

        <div class="hero-card">
          <h2>Coverage at a glance</h2>
          <p>Fast quotes, practical options, and support when life changes.</p>
          <div class="trust-grid">
            <div class="trust-item" *ngFor="let stat of stats">
              <span class="trust-number">{{ stat.value }}</span>
              <span class="trust-label">{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="page-section soft-band">
      <div class="container">
        <div class="section-header">
          <p class="section-kicker">Insurance products</p>
          <h2 class="section-heading">Choose coverage for every chapter.</h2>
          <p class="section-copy">Start with the policy you need today, then bundle and refine as your life changes.</p>
        </div>

        <!-- Services Carousel -->
        <div class="carousel-container">

          <button class="carousel-btn left" (click)="scrollLeft()">
            <mat-icon>chevron_left</mat-icon>
          </button>

          <div class="carousel" #carousel>
            <mat-card class="service-card" *ngFor="let service of services">
              <mat-card-content>
                <span class="icon-tile">
                  <mat-icon>{{ service.icon }}</mat-icon>
                </span>
                <mat-card-title>{{ service.name }}</mat-card-title>
                <p>{{ service.description }}</p>
              </mat-card-content>

              <mat-card-actions>
                <a mat-button color="primary" [routerLink]="service.link">
                  Learn more <mat-icon>arrow_forward</mat-icon>
                </a>
              </mat-card-actions>
            </mat-card>
          </div>

          <button class="carousel-btn right" (click)="scrollRight()">
            <mat-icon>chevron_right</mat-icon>
          </button>

        </div>
      </div>
    </section>

    <!-- Insurance Video Section -->
    <!-- <section class="video-section">
      <div class="container">
        <div class="video-content">
          <div class="video-text">
            <h2 class="video-title">Why Choose Nova Insurance?</h2>
            <p class="video-description">
              Discover how Nova Insurance provides comprehensive coverage with personalized service.
              Our expert advisors work with you to find the perfect insurance solution for your needs.
            </p>
            <div class="video-features">
              <div class="feature-item">
                <mat-icon>check_circle</mat-icon>
                <span>Expert guidance</span>
              </div>
              <div class="feature-item">
                <mat-icon>check_circle</mat-icon>
                <span>Fast claims processing</span>
              </div>
             <div class="feature-item">
                <mat-icon>check_circle</mat-icon>
                <span>24/7 customer support</span>
              </div>
            </div>
          </div>
          <div class="video-player">
            <div class="video-wrapper">
              <iframe
                width="560"
                height="315"
                [src]="videoUrl"
                title="Nova Insurance - Why Choose Us"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <section class="page-section">
      <div class="container">
        <div class="section-header">
          <p class="section-kicker">Why customers stay</p>
          <h2 class="section-heading">Built for confidence, not confusion.</h2>
        </div>

        <div class="benefits-grid">
          <mat-card class="feature-card" *ngFor="let benefit of benefits">
            <mat-card-content>
              <span class="icon-tile"><mat-icon>{{ benefit.icon }}</mat-icon></span>
              <mat-card-title>{{ benefit.title }}</mat-card-title>
              <p>{{ benefit.text }}</p>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </section>

    <section class="page-section soft-band">
      <div class="container">
        <div class="section-header">
          <p class="section-kicker">Market trends</p>
          <h2 class="section-heading">Coverage that keeps up with modern risks.</h2>
          <p class="section-copy">Insurance buyers are asking for faster service, stronger digital protection, and flexible policies that adapt as life changes.</p>
        </div>

        <div class="trend-grid">
          <mat-card class="feature-card trend-card" *ngFor="let trend of trends">
            <mat-card-content>
              <span class="icon-tile"><mat-icon>{{ trend.icon }}</mat-icon></span>
              <mat-card-title>{{ trend.title }}</mat-card-title>
              <p>{{ trend.text }}</p>
              <span class="trend-tag">{{ trend.tag }}</span>
            </mat-card-content>
          </mat-card>
        </div>

        <div class="section-actions">
          <a mat-flat-button color="primary" routerLink="/insights">Explore Insights</a>
        </div>
      </div>
    </section>

    <section class="cta-band">
      <div class="container">
        <h2>Ready to get protected?</h2>
        <p>Tell us what you need and we will shape a quote around your budget, risks, and priorities.</p>
        <div class="cta-actions">
          <a mat-flat-button color="primary" routerLink="/quote">Start My Quote</a>
          <a mat-stroked-button routerLink="/contact">Talk to an Advisor</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .carousel-container {
      position: relative;
      overflow: hidden;
      border-radius: 12px;
      margin: 2rem 0;
    }

    .carousel-wrapper {
      overflow: hidden;
      border-radius: 12px;
    }

    .carousel-track {
      display: flex;
      transition: transform 0.5s ease-in-out;
      width: 200%; /* 2 slides */
    }

    .carousel-slide {
      flex: 0 0 100%;
      width: 100%;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      padding: 2rem;
    }

    .service-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border-radius: 12px;
      overflow: hidden;
    }

    .service-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .icon-tile {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      border-radius: 50%;
      margin-bottom: 1rem;
    }

    .icon-tile mat-icon {
      color: white;
      font-size: 24px;
    }

    /* Video Section Styles */
    .video-section {
      background: linear-gradient(135deg, var(--surface) 0%, var(--card-bg) 100%);
      padding: 4rem 0;
      margin: 4rem 0;
    }

    .video-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: center;
    }

    .video-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }

    .video-description {
      font-size: 1.1rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .video-features {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .feature-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--text-primary);
      font-weight: 500;
    }

    .feature-item mat-icon {
      color: var(--success);
    }

    .video-player {
      display: flex;
      justify-content: center;
    }

    .video-wrapper {
      position: relative;
      width: 100%;
      max-width: 560px;
      aspect-ratio: 16/9;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    }

    .video-wrapper iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 12px;
    }

    @media (max-width: 768px) {
      .video-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .video-title {
        font-size: 2rem;
      }

      .services-grid {
        grid-template-columns: 1fr;
        padding: 1rem;
      }
    }
  `]
})
export class HomeComponent implements OnInit,
  AfterViewInit {
  @ViewChild('carouselWrapper') carouselWrapper !: ElementRef;
  videoUrl !: SafeResourceUrl;
  currentSlide = 0;

  stats = [
    {
      value: '50K+',
      label: 'Customers helped'
    }, {
      value: '15+',
      label: 'Years experience'
    }, {
      value: '6',
      label: 'Coverage categories'
    }, {
      value: '24/7',
      label: 'Claims support'
    }
  ];

  services = [
    {
      icon: 'health_and_safety',
      name: 'Health Insurance',
      description: 'Medical, dental, vision, and preventive care options for families and individu' +
        'als.',
      link: '/health'
    }, {
      icon: 'directions_car',
      name: 'Auto Insurance',
      description: 'Collision, liability, comprehensive, and roadside protection for your vehicle.',
      link: '/auto'
    }, {
      icon: 'favorite',
      name: 'Life Insurance',
      description: 'Term and permanent life coverage designed to support the people who count on y' +
        'ou.',
      link: '/life'
    }, {
      icon: 'home',
      name: 'Home Insurance',
      description: 'Protection for your home, belongings, liability, and additional living expense' +
        's.',
      link: '/home-insurance'
    }, {
      icon: 'flight_takeoff',
      name: 'Travel Insurance',
      description: 'Trip cancellation, emergency medical, baggage, and delay coverage wherever you' +
        ' go.',
      link: '/travel'
    }, {
      icon: 'business_center',
      name: 'Business Insurance',
      description: 'Liability, property, workers compensation, and risk support for growing compan' +
        'ies.',
      link: '/business'
    }
  ];

  // Group services into slides of 3
  serviceSlides = this.chunkArray(this.services, 3);

  benefits = [
    {
      icon: 'savings',
      title: 'Competitive Rates',
      text: 'Compare practical options without giving up the coverage that matters.'
    }, {
      icon: 'support_agent',
      title: 'Expert Advisors',
      text: 'Get help from people who can explain your options in plain language.'
    }, {
      icon: 'bolt',
      title: 'Quick Claims',
      text: 'Responsive support keeps claims moving when timing matters most.'
    }, {
      icon: 'tune',
      title: 'Flexible Plans',
      text: 'Adjust coverage as your family, assets, and goals change.'
    }
  ];

  trends = [
    {
      icon: 'psychology',
      title: 'AI-assisted service',
      text: 'Faster quote guidance, smarter document intake, and cleaner claims triage with' +
        ' advisor oversight.',
      tag: 'Service upgrade'
    }, {
      icon: 'shield_lock',
      title: 'Cyber protection',
      text: 'More families and businesses are reviewing fraud, ransomware, identity theft, ' +
        'and data exposure coverage.',
      tag: 'Digital risk'
    }, {
      icon: 'thunderstorm',
      title: 'Climate-aware coverage',
      text: 'Weather volatility is pushing homeowners to review deductibles, flood gaps, an' +
        'd resilient repair options.',
      tag: 'Property focus'
    }
  ];

  constructor(private seoService: SeoService, private sanitizer: DomSanitizer) {
    // this.videoUrl = this
    //     .sanitizer
    //     .bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/P6jQI790MrM');
  }

  ngOnInit(): void {
    this
      .seoService
      .updateTitle('Nova Insurance - Comprehensive Insurance Solutions');
    this
      .seoService
      .updateMetaTags([
        {
          name: 'description',
          content: 'Protect your future with Nova Insurance. Comprehensive insurance solutions for' +
            ' health, auto, life, home, travel, and business. Get your free quote today.'
        }, {
          property: 'og:title',
          content: 'Nova Insurance - Comprehensive Insurance Solutions'
        }, {
          property: 'og:description',
          content: 'Protect your future with Nova Insurance. Comprehensive insurance solutions for' +
            ' health, auto, life, home, travel, and business.'
        }, {
          property: 'og:type',
          content: 'website'
        }
      ]);
    this
      .seoService
      .setCanonicalUrl('https://nova-insurance.vercel.app/');
  }

  ngAfterViewInit(): void {
    // Auto-play carousel every 5 seconds
    // setInterval(() => {
    //     if (this.currentSlide < this.serviceSlides.length - 1) {
    //         this.nextSlide();
    //     } else {
    //         this.goToSlide(0);
    //     }
    // }, 5000);
  }

  chunkArray(array: any[], size: number): any[][] {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  @ViewChild('carousel', { static: false }) carousel!: ElementRef;

  scrollLeft() {
    this.carousel.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.carousel.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  }
}


