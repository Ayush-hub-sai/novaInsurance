import { Directive, OnInit } from '@angular/core';
import { SeoService } from './seo.service';

@Directive()
export class InsuranceTypeBaseComponent implements OnInit {
  title = '';
  icon = 'verified_user';
  description = '';
  benefits: string[] = [];

  constructor(protected seoService: SeoService) { }

  ngOnInit(): void {
    this.seoService.updateTitle(`${this.title} - Nova Insurance`);
    this.seoService.updateMetaTags([
      { name: 'description', content: `Learn about ${this.title.toLowerCase()} from Nova Insurance. ${this.description.replace(/<[^>]*>/g, '').substring(0, 150)}...` },
      { property: 'og:title', content: `${this.title} - Nova Insurance` },
      { property: 'og:description', content: `Learn about ${this.title.toLowerCase()} from Nova Insurance.` }
    ]);
    this.seoService.setCanonicalUrl(`https://nova-insurance.vercel.app/${this.getSlug()}`);
  }

  private getSlug(): string {
    return this.title.toLowerCase().replace(/\s+/g, '-');
  }
}
