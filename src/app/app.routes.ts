import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { InsightsComponent } from './features/insights/insights.component';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home - Nova Insurance' } },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { 
    path: 'quote', 
    loadComponent: () => import('./features/quote/quote.component').then(m => m.QuoteComponent),
    data: { title: 'Get Quote - Nova Insurance' }
  },
  { 
    path: 'contact', 
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent),
    data: { title: 'Contact - Nova Insurance' }
  },
  { path: 'about', component: AboutComponent, data: { title: 'About - Nova Insurance' } },
  { path: 'insights', component: InsightsComponent, data: { title: 'Insights - Nova Insurance' } },
  {
    path: 'insurance',
    loadChildren: () => import('./insurance/insurance.routes').then(m => m.INSURANCE_ROUTES),
    data: { title: 'Insurance Products - Nova Insurance' }
  },
  { path: '**', component: NotFoundComponent, data: { title: '404 - Not Found' } }
];

