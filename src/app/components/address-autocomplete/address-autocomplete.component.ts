import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScriptsStore } from 'src/app/services/scripts-store.service';
import { COUNTRIES, STATES } from 'src/app/utilities/data';

declare let google: any;
export interface GoogleMapsAutocompleteOptions {
  componentRestrictions: { country: any[] };
  fields: string[];
  types: string[];
}

@Component({
  selector: 'app-address-autocomplete',
  templateUrl: './address-autocomplete.component.html',
  styleUrls: ['./address-autocomplete.component.scss']
})
export class AddressAutocompleteComponent implements OnInit, AfterViewInit{
  @ViewChild('addressSearch') addressSearch!: ElementRef;
  @ViewChild('address2') address2!: ElementRef;
  @Input() options!: GoogleMapsAutocompleteOptions;
  @Input() checkoutMode: boolean = true;
  @Input() focusAddressField = true;
  @Output()formValue: EventEmitter<any> = new EventEmitter();
  autocomplete = google.maps.places.Autocomplete;
  shipTo!: FormGroup;
  states = STATES;
  countries = COUNTRIES;

  constructor(private fb: FormBuilder,
              private scripts: ScriptsStore){

  }

  ngOnInit(){
    this.addressForm();
    this.options = {
      componentRestrictions: { country: ['us', 'ca'] },
      fields: ['address_components', 'geometry'],
      types: ['address'],
    };

  }

  ngAfterViewInit(): void {
    this.scripts.load('google-maps-autocomplete').then(() => this.addressAutoComplete() );
  }

  addressForm(){
    this.shipTo = this.fb.group({
      first_name: [''],
      last_name: [''],
      address_1: [''],
      address_2:[''],
      city:[''],
      postcode:[''],
      state:[''],
      country:[''],
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          updateOn: 'blur',
        },
      ],
    });
  }

  addressAutoComplete(): void {
    console.log('Autocomplete starting...');
    const addressfield = this.addressSearch.nativeElement;
    this.autocomplete = new google.maps.places.Autocomplete(addressfield, this.options );
    if(!this.focusAddressField) {
    } else {
      addressfield.focus();
    }
    this.autocomplete.addListener('place_changed', this.fillInAddress);
  }

  fillInAddress(){
    // Get the place details from the autocomplete object.
    const place = this.autocomplete.getPlace();
    let address1 = '';
    let postcode = '';
    let state = '';
    let country = '';
    let city = '';
    const form: any = {};

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    // place.address_components are google.maps.GeocoderAddressComponent objects
    // which are documented at http://goo.gle/3l5i5Mr
    for (const component of place.address_components! ) {
      const componentType = component.types[0];

      switch (componentType) {
        case 'street_number': {
          address1 = `${component.long_name} ${address1}`;
          form.address_1 = address1;
          break;
        }

        case 'route': {
          address1 += component.short_name;
          form.address_1 = address1;
          break;
        }

        case 'postal_code': {
          postcode = `${component.long_name}${postcode}`;
          form.postcode = postcode;
          break;
        }

        case 'postal_code_suffix': {
          postcode = `${postcode}-${component.long_name}`;
          form.postcode = postcode;
          break;
        }
        case 'locality':
          city = component.long_name;
          form.city = city;
          break;
        case 'administrative_area_level_1': {
          state = component.short_name;
          form.state = state;
          break;
        }
        case 'country':
          country = component.long_name;
          form.country = country;
          break;
      }
    }

    this.shipTo.patchValue(form);
    //this.checkoutService.deliveryAddress.next(form);
    this.formValue.emit(form);

    // After filling the form with address components from the Autocomplete
    // prediction, set cursor focus on the second address line to encourage
    // entry of subpremise information such as apartment, unit, or floor number.
    if(this.checkoutMode){
      this.address2.nativeElement.focus();
    }
  }

  get firstName() {
    return this.shipTo.controls['first_name'];
  }
  get lastName() {
    return this.shipTo.controls['last_name'];
  }
  get email() {
    return this.shipTo.controls['email'];
  }
  get address() {
    return this.shipTo.controls['address_1'];
  }
  get city() {
    return this.shipTo.controls['city'];
  }
  get state() {
    return this.shipTo.controls['state'];
  }
  get postcode() {
    return this.shipTo.controls['postcode'];
  }
  get country() {
    return this.shipTo.controls['country'];
  }

}
