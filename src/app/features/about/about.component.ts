import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-about',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule],
  standalone: true,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  constructor(private seoService: SeoService) { }

  ngOnInit(): void {
    this.seoService.updateTitle('About Nova Insurance - Our Mission and Values');
    this.seoService.updateMetaTags([
      { name: 'description', content: 'Learn about Nova Insurance\'s mission, history, and commitment to providing exceptional insurance services. Discover why thousands trust us with their coverage needs.' },
      { property: 'og:title', content: 'About Nova Insurance - Our Mission and Values' },
      { property: 'og:description', content: 'Learn about Nova Insurance\'s mission, history, and commitment to providing exceptional insurance services.' }
    ]);
    this.seoService.setCanonicalUrl('https://nova-insurance.vercel.app/about');
  }
}


