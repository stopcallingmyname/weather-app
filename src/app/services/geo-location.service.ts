import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { ILocation } from '../types/location.interface';
import { environment } from '../../config';
import { CacheService } from './cache.service';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class GeoLocationService {
  private readonly CURRENT_LOCATION_CACHE_KEY: string = 'curr_location_data';
  private readonly SAVED_LOCATIONS: string = 'saved_locations';

  constructor(
    private http: HttpClient,
    private cacheService: CacheService,
    private storeService: StoreService
  ) {}

  getCurrentGeolocation(): Observable<GeolocationCoordinates> {
    return new Observable<GeolocationCoordinates>((observer) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position.coords);
            observer.complete();
          },
          (error) => {
            observer.error(error.message);
          }
        );
      } else {
        observer.error(
          new Error('Geolocation is not supported by this browser.')
        );
      }
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        // return this.errorService.errorHandler(error);
        return throwError(() => error.message);
      })
    );
  }

  // Used for address input to fetch location data
  getLocationData(
    place: google.maps.places.PlaceResult | undefined
  ): Observable<ILocation | null> {
    if (place && place.address_components && place.geometry) {
      const country = place.address_components.find((component: any) =>
        component.types.includes('country')
      );

      const result: ILocation = {
        city: place.name,
        country: country?.long_name,
        lat: place?.geometry?.location?.lat(),
        lon: place?.geometry?.location?.lng(),
      };

      return of(result);
    }
    return of(null);
  }

  reverseGeocode(lat: number, lon: number): Observable<ILocation> {
    const cachedData = this.cacheService.getCachedData(
      this.CURRENT_LOCATION_CACHE_KEY,
      { lat, lon }
    );

    // && !this.cacheService.isDataExpired(timestamp)
    if (cachedData) {
      return of(cachedData);
    }

    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString())
      .set('format', 'json')
      .set('accept-language', 'en');

    return this.http.get<any>(environment.OPENSTREETMAP_URL, { params }).pipe(
      map((response) => {
        if (response && response.address) {
          const data = { ...response.address, lat, lon };

          this.cacheService.cacheData(this.CURRENT_LOCATION_CACHE_KEY, data);

          return data;
        } else {
          throw new Error('Invalid response format');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // return this.errorService.errorHandler(error);
        return throwError(() => error.message);
      })
    );
  }

  saveLocation(location: ILocation): void {
    if (!this.isLocationSaved(location)) {
      let savedLocations: ILocation[] = this.getSavedLocations();
      savedLocations.push(location);
      this.storeService.storeData(this.SAVED_LOCATIONS, savedLocations);
    } else {
      return;
    }
  }

  isLocationSaved(location: ILocation): boolean {
    const savedLocations: ILocation[] =
      this.storeService.getStoredData(this.SAVED_LOCATIONS) || [];
    return savedLocations.some(
      (savedLocation) =>
        savedLocation.city === location.city &&
        savedLocation.country === location.country
    );
  }

  getSavedLocations(): ILocation[] {
    return this.storeService.getStoredData(this.SAVED_LOCATIONS) || [];
  }
}
