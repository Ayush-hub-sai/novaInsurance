import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { InsuranceTypeBaseComponent } from './insurance-type-base.component';

@Component({
  selector: 'app-business',
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
export class BusinessComponent extends InsuranceTypeBaseComponent {
  override ngOnInit(): void {
    this.title = 'Business Insurance';
    this.icon = 'business_center';
    this.description = `
      <p>Protect your business with comprehensive business insurance from Nova Insurance. Our policies are designed to safeguard operations, assets, and employees from risks that could interrupt your growth.</p>
      <h3>Coverage Options</h3>
      <ul>
        <li>General liability insurance</li>
        <li>Property insurance for business assets</li>
        <li>Workers compensation</li>
        <li>Business interruption insurance</li>
        <li>Cyber liability coverage</li>
        <li>Commercial auto insurance</li>
      </ul>
      <h3>Why Choose Our Business Insurance?</h3>
      <p>Our team works with you to create a customized insurance package based on your industry, contracts, employees, and risk profile.</p>
    `;
    this.benefits = [
      'Tailored coverage for your industry',
      'Risk management consultation',
      'Claims advocacy support',
      'Business continuity planning',
      'Employee safety programs',
      'Scalable coverage as you grow'
    ];
    super.ngOnInit();
  }
}
