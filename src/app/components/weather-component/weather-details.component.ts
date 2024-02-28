import { Component } from '@angular/core';
import { DateComponent } from '../date-component/date.component';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather-details',
  standalone: true,
  imports: [DateComponent, MatIconModule],
  templateUrl: './weather-details.component.html',
  styleUrl: './weather-details.component.css',
})
export class WeatherDetailsComponent {
  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    console.log(this.router.lastSuccessfulNavigation?.extractedUrl);
  }

  redirectToLocations() {
    this.router.navigate(['/locations']);
  }
}
