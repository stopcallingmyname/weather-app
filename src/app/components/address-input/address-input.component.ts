import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {} from '@angular/google-maps';
import { ILocation } from '../../types/location.interface';
import { GeoLocationService } from '../../services/geo-location.service';

@Component({
  selector: 'app-address-input',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './address-input.component.html',
  styleUrl: './address-input.component.css',
})
export class AddressInputComponent implements OnInit, AfterViewInit {
  @ViewChild('inputField', { static: true })
  inputRef: ElementRef<HTMLInputElement>;
  @Input() value: string | undefined;
  @Input() placeholder: string;
  @Output() locationChanged: EventEmitter<ILocation> =
    new EventEmitter<ILocation>();

  autocomplete: google.maps.places.Autocomplete | undefined;

  constructor(private geoLocationService: GeoLocationService) {}

  ngOnInit() {
    this.ClearInput();
    this.autocomplete = new google.maps.places.Autocomplete(
      this.inputRef.nativeElement,
      {
        types: ['(cities)'],
        fields: ['address_components', 'formatted_address', 'geometry', 'name'],
      }
    );
  }

  ngAfterViewInit() {
    if (this.autocomplete) {
      this.autocomplete.addListener('place_changed', () => {
        const place = this.autocomplete?.getPlace();

        this.geoLocationService
          .getLocationData(place)
          .subscribe((result?: ILocation | null) => {
            if (result) {
              this.locationChanged.emit(result);
              // this.value = result.city;
            }
          });
        this.ClearInput();
      });
    }
  }

  onChange(event: any) {
    this.ClearInput();
    if (this.autocomplete) this.autocomplete.set('place', null);
  }

  ClearInput(): void {
    this.value = '';
    this.inputRef.nativeElement.value = '';
  }
}
