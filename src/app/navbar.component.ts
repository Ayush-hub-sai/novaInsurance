import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
  standalone: true,
  template: `
    <header class="app-toolbar">
      <div class="container toolbar-inner">
        <a routerLink="/" class="brand" aria-label="Nova Insurance home" (click)="closeMenu()">
          <span class="brand-mark"><mat-icon>verified_user</mat-icon></span>
          <span>Nova Insurance</span>
        </a>

        <nav class="desktop-nav" aria-label="Primary navigation">
          <a mat-button routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
          <button mat-button class="insurance-trigger" [matMenuTriggerFor]="insuranceMenu">
            Insurance <mat-icon>expand_more</mat-icon>
          </button>
          <a mat-button routerLink="/about" routerLinkActive="active">About</a>
          <a mat-button routerLink="/insights" routerLinkActive="active">Insights</a>
          <a mat-button routerLink="/contact" routerLinkActive="active">Contact</a>
          <button mat-icon-button [matMenuTriggerFor]="themeMenu" aria-label="Change theme">
            <mat-icon>{{ activeTheme.icon }}</mat-icon>
          </button>
          <a mat-flat-button color="primary" routerLink="/quote" routerLinkActive="active">Get Quote</a>
        </nav>

        <button mat-icon-button class="mobile-menu-button" type="button" aria-label="Toggle navigation" (click)="toggleMenu()">
          <mat-icon>{{ menuOpen ? 'close' : 'menu' }}</mat-icon>
        </button>
      </div>

      <div class="mobile-panel" [class.open]="menuOpen">
        <a mat-button routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" (click)="closeMenu()">Home</a>
        <button mat-button [matMenuTriggerFor]="insuranceMenu">Insurance <mat-icon>expand_more</mat-icon></button>
        <a mat-button routerLink="/about" routerLinkActive="active" (click)="closeMenu()">About</a>
        <a mat-button routerLink="/insights" routerLinkActive="active" (click)="closeMenu()">Insights</a>
        <a mat-button routerLink="/contact" routerLinkActive="active" (click)="closeMenu()">Contact</a>
        <button mat-button [matMenuTriggerFor]="themeMenu"><mat-icon>{{ activeTheme.icon }}</mat-icon>{{ activeTheme.label }} Theme</button>
        <a mat-flat-button color="primary" routerLink="/quote" routerLinkActive="active" (click)="closeMenu()">Get Quote</a>
      </div>
    </header>

    <mat-menu #insuranceMenu="matMenu" class="insurance-menu" [overlapTrigger]="false" xPosition="before">
      <a mat-menu-item routerLink="/health" (click)="closeMenu()"><mat-icon>health_and_safety</mat-icon>Health Insurance</a>
      <a mat-menu-item routerLink="/auto" (click)="closeMenu()"><mat-icon>directions_car</mat-icon>Auto Insurance</a>
      <a mat-menu-item routerLink="/life" (click)="closeMenu()"><mat-icon>favorite</mat-icon>Life Insurance</a>
      <a mat-menu-item routerLink="/home-insurance" (click)="closeMenu()"><mat-icon>home</mat-icon>Home Insurance</a>
      <a mat-menu-item routerLink="/travel" (click)="closeMenu()"><mat-icon>flight_takeoff</mat-icon>Travel Insurance</a>
      <a mat-menu-item routerLink="/business" (click)="closeMenu()"><mat-icon>business_center</mat-icon>Business Insurance</a>
    </mat-menu>

    <mat-menu #themeMenu="matMenu" class="insurance-menu theme-menu" [overlapTrigger]="false">
      <button mat-menu-item *ngFor="let theme of themes" type="button" (click)="setTheme(theme.name)">
        <mat-icon>{{ theme.icon }}</mat-icon>{{ theme.label }} Theme
      </button>
    </mat-menu>
  `,
  styles: [``]
})
export class NavbarComponent implements OnInit {
  menuOpen = false;
  currentTheme: ThemeName = 'light';
  themes: ThemeOption[] = [
    { name: 'light', label: 'Light', icon: 'light_mode' },
    { name: 'dark', label: 'Dark', icon: 'dark_mode' },
    { name: 'red', label: 'Red', icon: 'local_fire_department' }
  ];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  get activeTheme(): ThemeOption {
    return this.themes.find((theme) => theme.name === this.currentTheme) ?? this.themes[0];
  }

  ngOnInit(): void {
    const savedTheme = this.isBrowser() ? localStorage.getItem('nova-theme') as ThemeName | null : null;
    this.setTheme(savedTheme && this.themes.some((theme) => theme.name === savedTheme) ? savedTheme : 'light');
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  setTheme(theme: ThemeName): void {
    this.currentTheme = theme;
    const body = this.document.body;
    body.classList.remove('theme-dark', 'theme-red');

    if (theme !== 'light') {
      body.classList.add(`theme-${theme}`);
    }

    if (this.isBrowser()) {
      localStorage.setItem('nova-theme', theme);
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}

type ThemeName = 'light' | 'dark' | 'red';

interface ThemeOption {
  name: ThemeName;
  label: string;
  icon: string;
}
