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
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatSnackBarModule],
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
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


