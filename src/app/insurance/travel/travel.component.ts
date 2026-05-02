import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { InsuranceTypeBaseComponent } from '../insurance-type-base.component';

@Component({
  selector: 'app-travel',
  imports: [RouterLink, CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  standalone: true,
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.scss']
})
export class TravelComponent extends InsuranceTypeBaseComponent {
  override ngOnInit(): void {
    this.title = 'Travel Insurance';
    this.icon = 'flight_takeoff';
    this.description = `
      <p>Travel with confidence with Nova Insurance's comprehensive travel insurance. Whether you are planning a family vacation or a business trip, our coverage helps protect against events that could disrupt your journey.</p>
      <h3>Coverage Options</h3>
      <ul>
        <li>Trip cancellation and interruption</li>
        <li>Medical emergencies and evacuation</li>
        <li>Lost or delayed baggage</li>
        <li>Travel delays and missed connections</li>
        <li>Rental car damage coverage</li>
        <li>Emergency assistance services</li>
      </ul>
      <h3>Why Choose Our Travel Insurance?</h3>
      <p>Nova travel coverage includes worldwide support so you can focus on the trip, not the paperwork.</p>
    `;
    this.benefits = [
      'Worldwide coverage',
      '24/7 emergency assistance',
      'Flexible cancellation policies',
      'Medical evacuation coverage',
      'Baggage loss protection',
      'Trip delay compensation'
    ];
    super.ngOnInit();
  }
}

