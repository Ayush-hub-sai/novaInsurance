import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { QuoteComponent } from './quote.component';
import { HealthComponent } from './health.component';
import { AutoComponent } from './auto.component';
import { LifeComponent } from './life.component';
import { HomeInsuranceComponent } from './home-insurance.component';
import { TravelComponent } from './travel.component';
import { BusinessComponent } from './business.component';
import { AboutComponent } from './about.component';
import { ContactComponent } from './contact.component';
import { InsightsComponent } from './insights.component';
import { NotFoundComponent } from './not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'quote', component: QuoteComponent },
  { path: 'health', component: HealthComponent },
  { path: 'auto', component: AutoComponent },
  { path: 'life', component: LifeComponent },
  { path: 'home-insurance', component: HomeInsuranceComponent },
  { path: 'travel', component: TravelComponent },
  { path: 'business', component: BusinessComponent },
  { path: 'about', component: AboutComponent },
  { path: 'insights', component: InsightsComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: NotFoundComponent }
];
