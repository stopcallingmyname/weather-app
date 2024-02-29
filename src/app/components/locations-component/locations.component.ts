import { Component, OnInit } from '@angular/core';
import { AddressInputComponent } from '../address-input/address-input.component';
import { WeatherCardComponent } from '../weather-card/weather-card.component';
import { ILocation } from '../../types/location.interface';
import { GeoLocationService } from '../../services/geo-location.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [AddressInputComponent, WeatherCardComponent],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css',
})
export class LocationsComponent implements OnInit {
  location: ILocation | undefined;
  savedLocations: ILocation[] = [];
  private readonly SAVED_LOCATIONS: string = 'saved_locations';

  constructor(
    private geoLocationService: GeoLocationService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    const locationsFromStorage = this.storeService.getStoredData(
      this.SAVED_LOCATIONS
    );
    if (locationsFromStorage) {
      this.savedLocations = locationsFromStorage;
    }

    this.fetchGeolocation();
  }

  onPlaceChanged(event: ILocation): void {
    this.location = event;
    this.saveLocation(this.savedLocations, this.location);
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

        this.saveLocation(this.savedLocations, this.location);
      });
  }

  saveLocation(savedLocations: ILocation[], location: ILocation): void {
    const locationsFromStorage: ILocation[] = this.storeService.getStoredData(
      this.SAVED_LOCATIONS
    ) as ILocation[];

    if (
      locationsFromStorage &&
      locationsFromStorage.some(
        (storedLocation) =>
          storedLocation.city == this.location?.city &&
          storedLocation.country == this.location?.country
      )
    ) {
      console.log('Retrieving saved location(s) from storage..');
      savedLocations = locationsFromStorage;
    } else {
      console.log('Saving location to storage..');
      savedLocations.push(location);
      this.storeService.storeData(this.SAVED_LOCATIONS, savedLocations);
    }
  }
}
