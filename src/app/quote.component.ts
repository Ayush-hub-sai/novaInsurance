import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { QuoteRequest, QuoteService } from './quote.service';
import { SeoService } from './seo.service';

@Component({
  selector: 'app-quote',
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule],
  standalone: true,
  template: `
    <section class="page-section">
      <div class="container">
        <div class="section-header">
          <p class="section-kicker">Free quote</p>
          <h1 class="section-heading">Find the right coverage without the guesswork.</h1>
          <p class="section-copy">Share a few details and our team will follow up with a personalized quote.</p>
        </div>

        <div class="marketing-strip">
          <div class="marketing-item">
            <mat-icon>price_check</mat-icon>
            <div>
              <strong>No-obligation quotes</strong>
              <span>Compare options before you commit.</span>
            </div>
          </div>
          <div class="marketing-item">
            <mat-icon>tune</mat-icon>
            <div>
              <strong>Personalized coverage</strong>
              <span>Plans shaped around your actual needs.</span>
            </div>
          </div>
          <div class="marketing-item">
            <mat-icon>lock</mat-icon>
            <div>
              <strong>Private and secure</strong>
              <span>Your details stay with our advisor team.</span>
            </div>
          </div>
        </div>

        <div class="quote-layout">
          <mat-card class="content-card">
            <mat-card-content>
              <span class="icon-tile"><mat-icon>request_quote</mat-icon></span>
              <h2>Start your quote</h2>
              <form [formGroup]="quoteForm" (ngSubmit)="onSubmit()" class="form-grid">
                <mat-form-field appearance="outline">
                  <mat-label>Name</mat-label>
                  <input matInput type="text" formControlName="name" autocomplete="name">
                  <mat-error *ngIf="quoteForm.get('name')?.hasError('required')">Name is required</mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Email</mat-label>
                  <input matInput type="email" formControlName="email" autocomplete="email">
                  <mat-error *ngIf="quoteForm.get('email')?.hasError('required')">Email is required</mat-error>
                  <mat-error *ngIf="quoteForm.get('email')?.hasError('email')">Enter a valid email</mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Phone</mat-label>
                  <input matInput type="tel" formControlName="phone" autocomplete="tel">
                  <mat-error *ngIf="quoteForm.get('phone')?.hasError('required')">Phone is required</mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Insurance Type</mat-label>
                  <mat-select formControlName="insuranceType">
                    <mat-option value="health">Health Insurance</mat-option>
                    <mat-option value="auto">Auto Insurance</mat-option>
                    <mat-option value="life">Life Insurance</mat-option>
                    <mat-option value="home">Home Insurance</mat-option>
                    <mat-option value="travel">Travel Insurance</mat-option>
                    <mat-option value="business">Business Insurance</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full">
                  <mat-label>Additional Details</mat-label>
                  <textarea matInput rows="5" formControlName="details" placeholder="Tell us more about your needs"></textarea>
                </mat-form-field>

                <div class="form-actions full">
                  <button mat-flat-button color="primary" type="submit" [disabled]="quoteForm.invalid || isSubmitting">
                    <mat-icon>{{ isSubmitting ? 'hourglass_top' : 'request_quote' }}</mat-icon>
                    {{ isSubmitting ? 'Submitting...' : 'Get Quote' }}
                  </button>
                </div>
              </form>
            </mat-card-content>
          </mat-card>

          <mat-card class="feature-card">
            <mat-card-content>
              <span class="icon-tile"><mat-icon>workspace_premium</mat-icon></span>
              <mat-card-title>What happens next?</mat-card-title>
              <ul class="check-list">
                <li>We review your coverage needs.</li>
                <li>An advisor compares practical options.</li>
                <li>You receive a clear quote within 24 hours.</li>
                <li>No pressure and no obligation.</li>
              </ul>

              <div class="quote-proof">
                <div class="quote-proof-item">
                  <mat-icon>stars</mat-icon>
                  <div>
                    <strong>50K+ customers helped</strong>
                    <span>Coverage guidance across every life stage.</span>
                  </div>
                </div>
                <div class="quote-proof-item">
                  <mat-icon>savings</mat-icon>
                  <div>
                    <strong>Bundle-friendly savings</strong>
                    <span>Find opportunities across home, auto, life, and more.</span>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </section>
  `,
  styles: [``]
})
export class QuoteComponent implements OnInit {
  quoteForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private quoteService: QuoteService,
    private seoService: SeoService
  ) {
    this.quoteForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      insuranceType: ['health', Validators.required],
      details: ['']
    });
  }

  ngOnInit(): void {
    this.seoService.updateTitle('Get Free Insurance Quote - Nova Insurance');
    this.seoService.updateMetaTags([
      { name: 'description', content: 'Get your free insurance quote from Nova Insurance. Compare rates for health, auto, life, home, travel, and business insurance.' },
      { property: 'og:title', content: 'Get Free Insurance Quote - Nova Insurance' },
      { property: 'og:description', content: 'Get your free insurance quote from Nova Insurance. Compare rates for health, auto, life, home, travel, and business insurance.' }
    ]);
    this.seoService.setCanonicalUrl('https://nova-insurance.vercel.app/quote');
  }

  onSubmit(): void {
    if (this.quoteForm.valid) {
      this.isSubmitting = true;
      const quote: QuoteRequest = this.quoteForm.value;
      this.quoteService.submitQuote(quote).subscribe({
        next: () => {
          alert('Quote submitted successfully! We will contact you soon.');
          this.quoteForm.reset({ insuranceType: 'health' });
          this.isSubmitting = false;
        },
        error: () => {
          alert('Error submitting quote. Please try again.');
          this.isSubmitting = false;
        }
      });
    }
  }
}
