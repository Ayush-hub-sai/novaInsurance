import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { InsuranceTypeBaseComponent } from './insurance-type-base.component';

@Component({
  selector: 'app-health',
  imports: [RouterLink, CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  standalone: true,
  template: `
    <section class="page-section">
      <div class="container content-grid">
        <mat-card class="content-card">
          <mat-card-content class="article-content">
            <div class="insurance-title-row">
              <span class="icon-tile"><mat-icon>{{ icon }}</mat-icon></span>
              <div class="insurance-title-copy">
                <p class="section-kicker">Nova Insurance</p>
                <h1 class="section-heading">{{ title }}</h1>
              </div>
            </div>
            <div [innerHTML]="description"></div>
            <a mat-flat-button color="primary" routerLink="/quote">Get Quote</a>
          </mat-card-content>
        </mat-card>

        <mat-card class="feature-card">
          <mat-card-content>
            <div class="feature-title-row">
              <span class="icon-tile"><mat-icon>task_alt</mat-icon></span>
              <mat-card-title>Why choose us?</mat-card-title>
            </div>
            <ul class="check-list">
              <li *ngFor="let benefit of benefits">{{ benefit }}</li>
            </ul>
          </mat-card-content>
        </mat-card>
      </div>
    </section>
  `,
  styles: [``]
})
export class HealthComponent extends InsuranceTypeBaseComponent {
  override ngOnInit(): void {
    this.title = 'Health Insurance';
    this.icon = 'health_and_safety';
    this.description = `
      <p>Protect your health and well-being with comprehensive health insurance coverage from Nova Insurance. Our plans provide medical, dental, and vision options so you and your family can access quality care when you need it most.</p>
      <h3>Coverage Options</h3>
      <ul>
        <li>Hospitalization and emergency care</li>
        <li>Doctor visits and specialist consultations</li>
        <li>Prescription medications</li>
        <li>Preventive care services</li>
        <li>Maternity and newborn care</li>
        <li>Mental health and substance abuse treatment</li>
      </ul>
      <h3>Why Choose Our Health Insurance?</h3>
      <p>With Nova Insurance, you get more than coverage. You get guidance, affordable choices, and support when medical decisions feel urgent.</p>
    `;
    this.benefits = [
      'Low deductibles and co-pays',
      'Wide network of healthcare providers',
      '24/7 telemedicine access',
      'Preventive care options',
      'Flexible payment options',
      'Easy claims process'
    ];
    super.ngOnInit();
  }
}
