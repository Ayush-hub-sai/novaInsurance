import { Routes } from '@angular/router';
import { HealthComponent } from './health/health.component';
import { AutoComponent } from './auto/auto.component';
import { LifeComponent } from './life/life.component';
import { HomeInsuranceComponent } from './home-insurance/home-insurance.component';
import { TravelComponent } from './travel/travel.component';
import { BusinessComponent } from './business/business.component';

export const INSURANCE_ROUTES: Routes = [
  { path: 'health', component: HealthComponent, data: { title: 'Health Insurance - Nova Insurance' } },
  { path: 'auto', component: AutoComponent, data: { title: 'Auto Insurance - Nova Insurance' } },
  { path: 'life', component: LifeComponent, data: { title: 'Life Insurance - Nova Insurance' } },
  { path: 'home-insurance', component: HomeInsuranceComponent, data: { title: 'Home Insurance - Nova Insurance' } },
  { path: 'travel', component: TravelComponent, data: { title: 'Travel Insurance - Nova Insurance' } },
  { path: 'business', component: BusinessComponent, data: { title: 'Business Insurance - Nova Insurance' } },
  { path: '', redirectTo: 'health', pathMatch: 'full' }
];
