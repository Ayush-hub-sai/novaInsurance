import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-insights',
  imports: [CommonModule, RouterLink, MatButtonModule, MatCardModule, MatIconModule],
  standalone: true,
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss']
})
export class InsightsComponent implements OnInit {
  stats = [
    { value: 'AI', label: 'Faster quoting and claims triage' },
    { value: 'Cyber', label: 'Digital risk coverage for families and businesses' },
    { value: 'Climate', label: 'Property coverage with resilience planning' }
  ];

  trends = [
    { icon: 'psychology', title: 'AI-assisted service', copy: 'Customers expect faster answers, cleaner document intake, and smarter recommendations with advisor oversight.', tag: 'High demand' },
    { icon: 'shield_lock', title: 'Cyber protection', copy: 'Ransomware, identity theft, payment fraud, and business interruption are pushing cyber coverage into mainstream planning.', tag: 'Fast growing' },
    { icon: 'thunderstorm', title: 'Climate-aware property cover', copy: 'Weather volatility is making homeowners ask about deductibles, flood gaps, roof age, and resilient rebuilding options.', tag: 'Risk priority' },
    { icon: 'hub', title: 'Embedded and bundled coverage', copy: 'Consumers want policies connected to big life moments such as buying a car, house, trip, or business asset.', tag: 'Convenience' },
    { icon: 'speed', title: 'Parametric-style payouts', copy: 'Trigger-based products are gaining attention because they can deliver faster recovery support after specific events.', tag: 'Innovation' },
    { icon: 'favorite', title: 'Wellness and prevention', copy: 'Health and life buyers increasingly value preventive programs, telehealth access, and personalized guidance.', tag: 'Retention' }
  ];

  features = [
    { icon: 'chat', title: 'Expert chat support', copy: 'A quick path to compare products, understand claims, and choose the next step.' },
    { icon: 'receipt_long', title: 'Coverage gap checks', copy: 'Review home, auto, life, health, and business policies for missing protection.' },
    { icon: 'notifications_active', title: 'Renewal reminders', copy: 'Timely prompts before rates, deductibles, or life changes create surprises.' },
    { icon: 'analytics', title: 'Savings snapshots', copy: 'Clear bundle and deductible comparisons instead of confusing policy math.' }
  ];

  constructor(private seoService: SeoService) { }

  ngOnInit(): void {
    this.seoService.updateTitle('Insurance Trends and Insights - Nova Insurance');
    this.seoService.updateMetaTags([
      { name: 'description', content: 'Explore modern insurance trends including AI-assisted service, cyber coverage, climate-aware property protection, embedded insurance, and faster claims experiences.' },
      { property: 'og:title', content: 'Insurance Trends and Insights - Nova Insurance' },
      { property: 'og:description', content: 'See what modern insurance buyers expect from coverage, service, claims, and digital tools.' }
    ]);
    this.seoService.setCanonicalUrl('https://nova-insurance.vercel.app/insights');
  }
}


