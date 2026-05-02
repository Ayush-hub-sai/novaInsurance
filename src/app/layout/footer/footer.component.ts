import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, CommonModule, MatIconModule],
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  constructor(private seoService: SeoService) { }

  ngOnInit(): void {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Nova Insurance",
      "url": "https://nova-insurance.vercel.app",
      "logo": "https://nova-insurance.vercel.app/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91 8658746040",
        "contactType": "customer service",
        "email": "info@novainsurance.com"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Haute Street, Corporate Park",
        "addressLocality": "Insurance City",
        "addressRegion": "IC",
        "postalCode": "700046",
        "addressCountry": "INDIA"
      }
    };
    this.seoService.addStructuredData(structuredData);
  }
}


