// import {
//   Component,
//   Input,
//   Output,
//   EventEmitter,
//   NgZone,
//   ViewChild,
// } from '@angular/core';
// import { MatIconModule } from '@angular/material/icon';
// import { ElementRef } from '@angular/core';
// import { ILocation } from '../../types/location.interface';
// import { GeoLocationService } from '../../services/geo-location.service';
// import {} from '@angular/google-maps';

// @Component({
//   standalone: true,
//   selector: 'app-address-input',
//   styleUrls: ['./address-input.component.css'],
//   templateUrl: './address-input.component.html',
//   imports: [MatIconModule],
// })
// export class AddressInputComponent {
//   @Input() inputValue: string | undefined;
//   @Input() placeholderText: string;
//   @Output() locationChanged: EventEmitter<ILocation> =
//     new EventEmitter<ILocation>();

//   @ViewChild('inputField', { static: true })
//   inputField: ElementRef<HTMLInputElement>;

//   autocomplete: google.maps.places.Autocomplete | undefined;

//   constructor(
//     private geoLocationService: GeoLocationService,
//     private ngZone: NgZone
//   ) {}

//   ngOnInit() {
//     this.clearInput();
//   }

//   ngAfterViewInit() {
//     this.autocomplete = new google.maps.places.Autocomplete(
//       this.inputField.nativeElement,
//       {
//         types: ['(cities)'],
//         fields: ['address_components', 'formatted_address', 'geometry', 'name'],
//       }
//     );

//     this.autocomplete.addListener('place_changed', () => {
//       this.ngZone.run(() => {
//         this.handlePlaceChanged();
//       });
//     });
//   }

//   handleInput(event: Event): void {
//     this.inputValue = (event.target as HTMLInputElement).value;
//   }

//   handlePlaceChanged(): void {
//     const place = this.autocomplete?.getPlace();

//     this.geoLocationService
//       .getLocationData(place)
//       .subscribe((result?: ILocation | null) => {
//         if (result) {
//           this.locationChanged.emit(result);
//         }
//       });
//     this.clearInput();
//   }

//   clearInput(): void {
//     this.inputValue = '';
//   }
// }

import {
  Component,
  Input,
  Output,
  EventEmitter,
  NgZone,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ILocation } from '../../types/location.interface';
import { GeoLocationService } from '../../services/geo-location.service';
import {} from '@angular/google-maps';

@Component({
  standalone: true,
  selector: 'app-address-input',
  styleUrls: ['./address-input.component.css'],
  templateUrl: './address-input.component.html',
  imports: [MatIconModule],
})
export class AddressInputComponent implements OnInit, AfterViewInit {
  @Input() inputValue: string | undefined;
  @Input() placeholderText: string;
  @Output() locationChanged: EventEmitter<ILocation> =
    new EventEmitter<ILocation>();

  @ViewChild('inputField', { static: true })
  inputFieldRef: ElementRef<HTMLInputElement>;

  autocomplete: google.maps.places.Autocomplete | undefined;

  constructor(
    private geoLocationService: GeoLocationService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.clearInput();
  }

  ngAfterViewInit(): void {
    this.initializeAutocomplete();
  }

  handleInput(event: Event): void {
    this.inputValue = (event.target as HTMLInputElement).value;
  }

  handlePlaceChanged(): void {
    const place = this.autocomplete?.getPlace();
    this.geoLocationService
      .getLocationData(place)
      .subscribe((result?: ILocation | null) => {
        if (result) {
          this.locationChanged.emit(result);
        }
      });
    this.clearInput();
  }

  clearInput(): void {
    this.inputValue = '';
  }

  private initializeAutocomplete(): void {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.inputFieldRef.nativeElement,
      {
        types: ['(cities)'],
        fields: ['address_components', 'formatted_address', 'geometry', 'name'],
      }
    );

    this.autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        this.handlePlaceChanged();
      });
    });
  }
}
