import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SeoService } from './seo.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatSnackBarModule],
  standalone: true,
  template: `
    <section class="page-section">
      <div class="container">
        <div class="section-header">
          <p class="section-kicker">Contact us</p>
          <h1 class="section-heading">A real advisor is ready to help.</h1>
          <p class="section-copy">Ask about quotes, claims, coverage changes, or anything that needs a clearer answer.</p>
        </div>

        <div class="marketing-strip">
          <div class="marketing-item">
            <mat-icon>schedule</mat-icon>
            <div>
              <strong>Fast response</strong>
              <span>Most messages receive a same-day reply.</span>
            </div>
          </div>
          <div class="marketing-item">
            <mat-icon>verified</mat-icon>
            <div>
              <strong>Licensed guidance</strong>
              <span>Talk through coverage with a practical advisor.</span>
            </div>
          </div>
          <div class="marketing-item">
            <mat-icon>support_agent</mat-icon>
            <div>
              <strong>Claims support</strong>
              <span>Help is available when timing matters.</span>
            </div>
          </div>
        </div>

        <div class="contact-layout">
          <mat-card class="contact-card">
            <mat-card-content>
              <span class="icon-tile"><mat-icon>support_agent</mat-icon></span>
              <h2>Get in touch</h2>
              <p>Choose the route that works best. Our team can help with quotes, claims, policy reviews, and coverage changes.</p>

              <div class="contact-detail-list">
                <div class="contact-detail" itemscope itemtype="https://schema.org/ContactPoint">
                  <mat-icon>call</mat-icon>
                  <div>
                    <strong>Phone</strong>
                    <a href="tel:+155570004667" itemprop="telephone">+91 8658746040</a>
                  </div>
                </div>

                <div class="contact-detail" itemscope itemtype="https://schema.org/ContactPoint">
                  <mat-icon>mail</mat-icon>
                  <div>
                    <strong>Email</strong>
                    <a href="mailto:info@novainsurance.com" itemprop="email">info@novainsurance.com</a>
                  </div>
                </div>

                <div class="contact-detail" itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
                  <mat-icon>location_on</mat-icon>
                  <div>
                    <strong>Office</strong>
                    <span itemprop="streetAddress">Haute Street, Corporate Park</span><br>
                    <span itemprop="addressLocality">Insurance City</span>, <span itemprop="addressRegion">IC</span> <span itemprop="postalCode">700046</span>
                  </div>
                </div>

                <div class="contact-detail">
                  <mat-icon>event_available</mat-icon>
                  <div>
                    <strong>Business hours</strong>
                    Monday - Friday: 9:00 AM - 6:00 PM<br>
                    Saturday: 10:00 AM - 4:00 PM
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card class="content-card">
            <mat-card-content>
              <span class="icon-tile"><mat-icon>chat</mat-icon></span>
              <h2>Send a message</h2>
              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="form-grid">
                <mat-form-field appearance="outline">
                  <mat-label>Name</mat-label>
                  <input matInput type="text" formControlName="name" autocomplete="name">
                  <mat-error *ngIf="contactForm.get('name')?.hasError('required')">Name is required</mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Email</mat-label>
                  <input matInput type="email" formControlName="email" autocomplete="email">
                  <mat-error *ngIf="contactForm.get('email')?.hasError('required')">Email is required</mat-error>
                  <mat-error *ngIf="contactForm.get('email')?.hasError('email')">Enter a valid email</mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Phone</mat-label>
                  <input matInput type="tel" formControlName="phone" autocomplete="tel">
                  <mat-error *ngIf="contactForm.get('phone')?.hasError('required')">Phone is required</mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Subject</mat-label>
                  <mat-select formControlName="subject">
                    <mat-option value="general">General Inquiry</mat-option>
                    <mat-option value="quote">Request Quote</mat-option>
                    <mat-option value="claim">File a Claim</mat-option>
                    <mat-option value="support">Customer Support</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full">
                  <mat-label>Message</mat-label>
                  <textarea matInput rows="5" formControlName="message"></textarea>
                  <mat-error *ngIf="contactForm.get('message')?.hasError('required')">Message is required</mat-error>
                </mat-form-field>

                <div class="form-actions full">
                  <button mat-flat-button color="primary" type="submit" [disabled]="contactForm.invalid || isSubmitting">
                    <mat-icon>{{ isSubmitting ? 'hourglass_top' : 'send' }}</mat-icon>
                    {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                  </button>
                </div>
              </form>
            </mat-card-content>
          </mat-card>
        </div>

        <mat-card class="content-card map-card">
          <mat-card-content>
            <span class="icon-tile"><mat-icon>map</mat-icon></span>
            <h2>Visit our office</h2>
            <p class="section-copy">Use the map for directions, nearby parking, and travel time before your appointment.</p>
            <div class="map-toolbar">
              <div class="map-address">
                <mat-icon>place</mat-icon>
                <div>
                  <strong>Nova Insurance office</strong>
                  <span>{{ officeAddress }}</span>
                </div>
              </div>
              <div class="map-actions">
                <button mat-stroked-button color="primary" type="button" (click)="useCurrentLocation()">
                  <mat-icon>my_location</mat-icon>
                  {{ isLocating ? 'Locating...' : 'Use my location' }}
                </button>
                <a mat-flat-button color="primary" [href]="mapsLink" target="_blank" rel="noopener">
                  <mat-icon>directions</mat-icon>
                  Open Maps
                </a>
              </div>
            </div>
            <p class="map-status" *ngIf="locationStatus">{{ locationStatus }}</p>
          </mat-card-content>
          <div class="map-shell">
            <iframe
              class="map-frame"
              title="Nova Insurance office location on Google Maps"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              [src]="mapUrl">
            </iframe>
            <div class="map-marker-card">
              <mat-icon>location_on</mat-icon>
              <div>
                <strong>Marked destination</strong>
                <span>{{ officeAddress }}</span>
              </div>
            </div>
          </div>
        </mat-card>
      </div>
    </section>
  `,
  styles: [``]
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;
  isLocating = false;
  locationStatus = '';
  officeAddress = 'Haute Street, Corporate Park, Insurance City, IC 700046';
  mapsLink = 'https://www.google.com/maps/search/?api=1&query=123%20Insurance%20St%2C%20Insurance%20City%2C%20IC%20700046';
  mapUrl: SafeResourceUrl;

  constructor(
    private fb: FormBuilder,
    private seoService: SeoService,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      subject: ['general', Validators.required],
      message: ['', Validators.required]
    });
    this.mapUrl = this.buildMapUrl('https://www.google.com/maps?q=123%20Insurance%20St%2C%20Insurance%20City%2C%20IC%20700046&output=embed');
  }

  ngOnInit(): void {
    this.seoService.updateTitle('Contact Nova Insurance - Get in Touch Today');
    this.seoService.updateMetaTags([
      { name: 'description', content: 'Contact Nova Insurance for all your insurance needs. Get quotes, file claims, or ask questions. Our team is here to help you find the right coverage.' },
      { property: 'og:title', content: 'Contact Nova Insurance - Get in Touch Today' },
      { property: 'og:description', content: 'Contact Nova Insurance for all your insurance needs. Get quotes, file claims, or ask questions.' }
    ]);
    this.seoService.setCanonicalUrl('https://nova-insurance.vercel.app/contact');

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "mainEntity": {
        "@type": "Organization",
        "name": "Nova Insurance",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91 8658746040",
          "contactType": "customer service",
          "email": "info@novainsurance.com"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Haute Street, Corporate Park",
          "addressLocality": "Insurance City",
          "addressRegion": "IC",
          "postalCode": "700046",
          "addressCountry": "INDIA"
        }
      }
    };
    this.seoService.addStructuredData(structuredData);
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      setTimeout(() => {
        this.snackBar.open('Message sent successfully! We will get back to you soon.', 'Close', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['snackbar-success']
        });
        this.contactForm.reset({ subject: 'general' });
        this.isSubmitting = false;
      }, 1000);
    }
  }

  useCurrentLocation(): void {
    if (!navigator.geolocation) {
      this.locationStatus = 'Location is not available in this browser. You can still open directions in Google Maps.';
      return;
    }

    this.isLocating = true;
    this.locationStatus = 'Finding your current location for directions...';

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const origin = `${position.coords.latitude},${position.coords.longitude}`;
        const destination = encodeURIComponent(this.officeAddress);
        this.mapUrl = this.buildMapUrl(`https://www.google.com/maps?saddr=${origin}&daddr=${destination}&output=embed`);
        this.mapsLink = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
        this.locationStatus = 'Your current location is now used as the route starting point.';
        this.isLocating = false;
      },
      () => {
        this.locationStatus = 'We could not access your current location. Please allow location access or open Google Maps.';
        this.isLocating = false;
      },
      {
        enableHighAccuracy: true,
        timeout: 9000,
        maximumAge: 60000
      }
    );
  }

  private buildMapUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
