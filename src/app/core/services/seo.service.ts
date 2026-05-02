import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private title: Title, private meta: Meta, @Inject(PLATFORM_ID) private platformId: Object) { }

  updateTitle(title: string): void {
    this.title.setTitle(title);
  }

  updateMetaTags(tags: { name?: string; property?: string; content: string }[]): void {
    tags.forEach(tag => {
      if (tag.name) {
        this.meta.updateTag({ name: tag.name, content: tag.content });
      } else if (tag.property) {
        this.meta.updateTag({ property: tag.property, content: tag.content });
      }
    });
  }

  setCanonicalUrl(url: string): void {
    this.meta.updateTag({ rel: 'canonical', href: url });
  }

  addStructuredData(data: object): void {
    if (isPlatformBrowser(this.platformId)) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
    }
  }

  removeStructuredData(): void {
    if (isPlatformBrowser(this.platformId)) {
      const scripts = document.head.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => script.remove());
    }
  }
}