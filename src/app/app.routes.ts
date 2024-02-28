import { Routes } from '@angular/router';
import { WeatherDetailsComponent } from './components/weather-component/weather-details.component';
import { LocationsComponent } from './components/locations-component/locations.component';

export const routes: Routes = [
  { path: '', redirectTo: 'locations', pathMatch: 'full' },
  { path: 'locations', component: LocationsComponent },
  { path: '**', component: WeatherDetailsComponent },
];
