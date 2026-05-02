import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { InsuranceTypeBaseComponent } from '../insurance-type-base.component';

@Component({
  selector: 'app-auto',
  imports: [RouterLink, CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  standalone: true,
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.scss']
})
export class AutoComponent extends InsuranceTypeBaseComponent {
  override ngOnInit(): void {
    this.title = 'Auto Insurance';
    this.icon = 'directions_car';
    this.description = `
      <p>Drive with confidence knowing you are protected by Nova Insurance's comprehensive auto insurance. Whether you are commuting to work or taking a road trip, our coverage helps you prepare for the unexpected.</p>
      <h3>Coverage Options</h3>
      <ul>
        <li>Liability coverage for bodily injury and property damage</li>
        <li>Collision coverage for your vehicle</li>
        <li>Comprehensive coverage for theft and vandalism</li>
        <li>Uninsured and underinsured motorist protection</li>
        <li>Personal injury protection</li>
        <li>Rental reimbursement</li>
      </ul>
      <h3>Why Choose Our Auto Insurance?</h3>
      <p>Nova Insurance offers flexible coverage and discounts that fit your driving habits, budget, and vehicle needs.</p>
    `;
    this.benefits = [
      'Competitive rates',
      'Multiple coverage options',
      'Safe driver discounts',
      '24/7 roadside assistance',
      'Easy online policy management',
      'Quick claims processing'
    ];
    super.ngOnInit();
  }
}

