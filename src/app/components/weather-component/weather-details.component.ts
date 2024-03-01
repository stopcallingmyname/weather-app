import { Component, Inject, OnInit } from '@angular/core';
import { DateComponent } from '../date-component/date.component';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { ILocation } from '../../types/location.interface';
import { GeoLocationService } from '../../services/geo-location.service';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-weather-details',
  standalone: true,
  imports: [DateComponent, MatIconModule, MatBottomSheetModule],
  providers: [DatePipe],
  templateUrl: './weather-details.component.html',
  styleUrl: './weather-details.component.css',
})
export class WeatherDetailsComponent implements OnInit {
  // location: ILocation;
  isLocationSaved: boolean = false;

  constructor(
    // private route: ActivatedRoute,
    private router: Router,
    private geoLocationService: GeoLocationService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { location: ILocation }
  ) {}

  ngOnInit(): void {
    // this.route.params.subscribe((params) => {
    //   const city = params['city'];
    //   const country = params['country'];
    //   const latParam = this.route.snapshot.queryParamMap.get('lat');
    //   const lonParam = this.route.snapshot.queryParamMap.get('lon');

    //   if (latParam && lonParam) {
    //     this.location = {
    //       city: city,
    //       country: country,
    //       lat: +latParam,
    //       lon: +lonParam,
    //     };
    //   }
    // });
    this.isLocationSaved = this.geoLocationService.isLocationSaved(
      this.data.location
    );
  }

  ngAfterViewInit(): void {}

  saveLocation(): void {
    if (this.data.location) {
      this.geoLocationService.saveLocation(this.data.location);
    } else {
      this.redirectToLocations();
    }
  }

  redirectToLocations() {
    this.router.navigate(['/locations']);
  }
}
