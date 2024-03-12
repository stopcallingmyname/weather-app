import {
  AfterViewInit,
  Component,
  NgZone,
  OnInit,
  Optional,
} from '@angular/core';
import { AddressInputComponent } from '../address-input/address-input.component';
import { WeatherCardComponent } from '../weather-card/weather-card.component';
import { ILocation } from '../../types/location.interface';
import { GeoLocationService } from '../../services/geo-location.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { WeatherDetailsComponent } from '../weather-component/weather-details.component';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [AddressInputComponent, MatBottomSheetModule, WeatherCardComponent],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css',
})
export class LocationsComponent implements OnInit, AfterViewInit {
  location: ILocation | undefined;
  savedLocations: ILocation[] = [];
  bottomSheetRef: MatBottomSheetRef;

  constructor(
    private geoLocationService: GeoLocationService,
    private router: Router,
    private ngZone: NgZone,
    private bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    this.savedLocations = this.geoLocationService.getSavedLocations();
    this.fetchGeolocation();
  }

  ngAfterViewInit(): void {
    this.savedLocations = this.geoLocationService.getSavedLocations();
  }

  onPlaceChanged(event: ILocation): void {
    this.location = event;
    this.openLocationWeatherDetails(this.location);
  }

  fetchGeolocation(): void {
    this.geoLocationService
      .getCurrentGeolocation()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // return this.errorService.errorHandler(error);
          return throwError(() => error.message);
        })
      )
      .subscribe((coordinates) => {
        this.fetchPlaceByGeoLocation(
          coordinates.latitude,
          coordinates.longitude
        );
      });
  }

  fetchPlaceByGeoLocation(lat: number, lon: number): void {
    this.geoLocationService
      .reverseGeocode(lat, lon)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // return this.errorService.errorHandler(error);
          return throwError(() => error.message);
        })
      )
      .subscribe((address: ILocation) => {
        const result: ILocation = {
          city: address.city,
          country: address.country,
          lat: address.lat,
          lon: address.lon,
        };
        this.location = result;

        if (!this.geoLocationService.isLocationSaved(this.location)) {
          this.openLocationWeatherDetails(this.location);
        }
      });
  }

  redirectToWeatherDetails(location: ILocation) {
    if (this.location) {
      this.ngZone.run(() => {
        this.router.navigate(
          ['/weather-details', location.country, location.city],
          {
            queryParams: {
              lat: location.lat,
              lon: location.lon,
            },
          }
        );
      });
    }
  }

  openLocationWeatherDetails(location: ILocation): void {
    this.bottomSheetRef = this.bottomSheet.open(WeatherDetailsComponent, {
      data: { location: location },
    });
    console.log('opened');
  }
}
