import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { InsuranceTypeBaseComponent } from './insurance-type-base.component';

@Component({
  selector: 'app-life',
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
export class LifeComponent extends InsuranceTypeBaseComponent {
  override ngOnInit(): void {
    this.title = 'Life Insurance';
    this.icon = 'favorite';
    this.description = `
      <p>Secure your family's financial future with life insurance from Nova Insurance. Our policies help protect loved ones from financial strain if the unexpected happens.</p>
      <h3>Types of Life Insurance</h3>
      <ul>
        <li>Term life insurance for affordable coverage over a specific period</li>
        <li>Whole life insurance with lifetime coverage and cash value</li>
        <li>Universal life insurance with flexible premiums and benefits</li>
        <li>Variable life insurance with market-linked potential</li>
      </ul>
      <h3>Why Choose Our Life Insurance?</h3>
      <p>Our advisors help you choose coverage that fits your family, debts, income, and long-term goals.</p>
    `;
    this.benefits = [
      'Flexible coverage amounts',
      'Competitive premiums',
      'Tax advantages',
      'Peace of mind for your family',
      'Professional guidance',
      'Easy application process'
    ];
    super.ngOnInit();
  }
}
