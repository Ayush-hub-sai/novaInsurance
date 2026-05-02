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
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
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


