import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { InsuranceTypeBaseComponent } from '../insurance-type-base.component';

@Component({
  selector: 'app-home-insurance',
  imports: [RouterLink, CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  standalone: true,
  templateUrl: './home-insurance.component.html',
  styleUrls: ['./home-insurance.component.scss']
})
export class HomeInsuranceComponent extends InsuranceTypeBaseComponent {
  override ngOnInit(): void {
    this.title = 'Home Insurance';
    this.icon = 'home';
    this.description = `
      <p>Protect your home and belongings with comprehensive home insurance from Nova Insurance. Our policies can cover fire, theft, natural disasters, liability, and temporary living costs.</p>
      <h3>Coverage Options</h3>
      <ul>
        <li>Dwelling coverage for your home structure</li>
        <li>Personal property protection</li>
        <li>Liability coverage for injuries or property damage</li>
        <li>Additional living expenses if your home cannot be occupied</li>
        <li>Optional flood and earthquake coverage</li>
        <li>Jewelry and valuable item coverage</li>
      </ul>
      <h3>Why Choose Our Home Insurance?</h3>
      <p>Whether you own or rent, we help you shape coverage around your property, belongings, and comfort level.</p>
    `;
    this.benefits = [
      'Comprehensive coverage',
      'Flexible deductibles',
      'Bundle discounts available',
      '24/7 claims support',
      'Home safety discounts',
      'Easy online management'
    ];
    super.ngOnInit();
  }
}

