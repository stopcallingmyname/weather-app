import { Component } from '@angular/core';
import { DateComponent } from '../date-component/date.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ILocation } from '../../types/location.interface';

@Component({
  selector: 'app-weather-details',
  standalone: true,
  imports: [DateComponent, MatIconModule],
  templateUrl: './weather-details.component.html',
  styleUrl: './weather-details.component.css',
})
export class WeatherDetailsComponent {
  location: ILocation;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    console.log(this.router.lastSuccessfulNavigation?.extractedUrl);
    // this.location = {
    //   city:
    // }
  }

  saveLocation(): void {
    
    this.redirectToLocations();
  }

  redirectToLocations() {
    this.router.navigate(['/locations']);
  }
}
