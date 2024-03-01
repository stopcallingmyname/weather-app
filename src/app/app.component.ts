import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherDetailsComponent } from './components/weather-component/weather-details.component';
import { DatePipe } from '@angular/common';
import { LocationsComponent } from './components/locations-component/locations.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LocationsComponent, WeatherDetailsComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [DatePipe],
})
export class AppComponent {
  title = 'Weather App';
}
