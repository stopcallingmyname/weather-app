import { Component, OnInit } from '@angular/core';
import { AddressInputComponent } from '../address-input/address-input.component';
import { WeatherCardComponent } from '../weather-card/weather-card.component';
import { ILocation } from '../../types/location.interface';
import { GeoLocationService } from '../../services/geo-location.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [AddressInputComponent, WeatherCardComponent],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css',
})
export class LocationsComponent implements OnInit {
  address: ILocation;
  savedLocations: ILocation[] = [];

  constructor(private geoLocationService: GeoLocationService) {}

  ngOnInit(): void {
    this.fetchGeolocation();
  }

  onPlaceChanged(): void {
    this.geoLocationService
      .getCityCoordinates(this.address.city)
      .subscribe((data) => {
        console.log('address: ' + this.address.city);
        this.fetchCityNameByLocation(data.lat, data.lng);
      });
  }

  fetchGeolocation(): void {
    this.geoLocationService
      .getGeolocation()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // return this.errorService.errorHandler(error);
          return throwError(() => error.message);
        })
      )
      .subscribe((coordinates) => {
        this.fetchCityNameByLocation(
          coordinates.latitude,
          coordinates.longitude
        );
      });
  }

  fetchCityNameByLocation(lat: number, lon: number): void {
    this.geoLocationService
      .reverseGeocode(lat, lon)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // return this.errorService.errorHandler(error);
          return throwError(() => error.message);
        })
      )
      .subscribe((address: ILocation) => {
        this.address = address;
        this.savedLocations.push({ ...this.address });
      });
  }
}
