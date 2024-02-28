import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ILocation } from '../../types/location.interface';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.css',
})
export class WeatherCardComponent {
  @Input() location: ILocation;

  constructor(private router: Router) {}

  redirectToWeatherDetails() {
    this.router.navigate(['/weather-details', this.location.city], {
      queryParams: { lat: this.location.lat, lon: this.location.lon },
    });
  }
}
