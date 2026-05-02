import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { QuoteRequest, QuoteService } from '../../core/services/quote.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-quote',
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatSnackBarModule],
  standalone: true,
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {
  quoteForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private quoteService: QuoteService,
    private seoService: SeoService,
    private snackBar: MatSnackBar
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
          this.snackBar.open('Quote submitted successfully! We will contact you soon.', 'Close', {
            duration: 5000,
            verticalPosition: 'bottom',
            panelClass: ['snackbar-success']
          });
          this.quoteForm.reset({ insuranceType: 'health' });
          this.isSubmitting = false;
        },
        error: () => {
          this.snackBar.open('Error submitting quote. Please try again.', 'Close', {
            duration: 5000,
            verticalPosition: 'bottom',
            panelClass: ['snackbar-error']
          });
          this.isSubmitting = false;
        }
      });
    }
  }
}


