import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Optional,
} from '@angular/core';
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
import { WeatherChartComponent } from '../weather-chart/weather-chart.component';

@Component({
  selector: 'app-weather-details',
  standalone: true,
  imports: [
    DateComponent,
    MatIconModule,
    MatBottomSheetModule,
    WeatherChartComponent,
  ],
  providers: [DatePipe],
  templateUrl: './weather-details.component.html',
  styleUrl: './weather-details.component.css',
})
export class WeatherDetailsComponent implements OnInit {
  location: ILocation;
  isLocationSaved: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private geoLocationService: GeoLocationService,
    @Optional()
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public dataFromBottomSheet: { location: ILocation },
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.dataFromBottomSheet && this.dataFromBottomSheet.location) {
      this.location = this.dataFromBottomSheet.location;
    } else {
      this.route.params.subscribe((params) => {
        const city = params['city'];
        const country = params['country'];

        if (city && country) {
          this.route.queryParams.subscribe((queryParams) => {
            const latParam = queryParams['lat'];
            const lonParam = queryParams['lon'];

            if (latParam && lonParam) {
              this.location = {
                city: city,
                country: country,
                lat: +latParam,
                lon: +lonParam,
              };
            }
          });
        }
      });
    }
    this.updateIsLocationSaved();
  }

  updateIsLocationSaved(): void {
    this.isLocationSaved = this.geoLocationService.isLocationSaved(
      this.location
    );
    this.changeDetectorRef.detectChanges();
  }

  saveLocation(): void {
    if (this.location) {
      this.geoLocationService.saveLocation(this.location);
      this.updateIsLocationSaved();
    } else {
      this.redirectToLocations();
    }
  }

  redirectToLocations() {
    this.router.navigate(['/locations']);
  }
}
