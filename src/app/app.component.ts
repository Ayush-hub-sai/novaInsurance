import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, NgZone, OnDestroy, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { NavbarComponent } from './navbar.component';
import { FooterComponent } from './footer.component';
import { ExpertAssistantComponent } from './expert-assistant.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ExpertAssistantComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'novaInsurance';
  private intersectionObserver?: IntersectionObserver;
  private mutationObserver?: MutationObserver;
  private routerSubscription?: Subscription;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object,
    private ngZone: NgZone,
    private router: Router
  ) {
    if (this.isBrowser()) {
      this.routerSubscription = this.router.events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe(() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
          window.setTimeout(() => this.prepareRevealTargets(), 0);
        });
    }
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser()) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.intersectionObserver?.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.12
      });

      this.mutationObserver = new MutationObserver(() => this.prepareRevealTargets());
      this.mutationObserver.observe(this.document.body, { childList: true, subtree: true });
      this.prepareRevealTargets();
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    this.intersectionObserver?.disconnect();
    this.mutationObserver?.disconnect();
  }

  private prepareRevealTargets(): void {
    const selectors = [
      '.page-section',
      '.hero-card',
      '.service-card',
      '.feature-card',
      '.content-card',
      '.contact-card',
      '.trust-item',
      '.marketing-item',
      '.contact-detail',
      '.quote-proof-item',
      '.trend-card',
      '.experience-item',
      '.cta-band'
    ].join(',');

    this.document.querySelectorAll<HTMLElement>(selectors).forEach((element) => {
      if (element.classList.contains('is-visible')) {
        return;
      }

      element.classList.add('reveal-on-scroll');
      this.intersectionObserver?.observe(element);
    });
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
