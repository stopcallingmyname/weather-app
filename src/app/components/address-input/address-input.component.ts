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
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';

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
  @Input() value: string;
  @Input() placeholder: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  autocomplete: google.maps.places.Autocomplete | undefined;

  ngOnInit() {}

  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.inputRef.nativeElement
    );

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace();

      if (place && place.address_components && place.geometry) {
        const city = place.address_components.find((component) =>
          component.types.includes('locality')
        );
        if (city) {
          this.value = city.long_name;
          this.valueChange.emit(this.value);
        }
      }
    });
  }

  // @HostListener('click', ['$event.target']) onClick(target: HTMLElement) {
  //   if (target.classList.contains('input-wrapper')) {
  //     this.inputField.nativeElement.focus();
  //   }
  // }
}
