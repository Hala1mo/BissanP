import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../../../models/Customer";
import {City} from "../../../models/City";
import {RegistrationService} from "../../../services/registration.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Location} from "../../../models/Location";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.css']
})
export class CustomerDialogComponent implements OnInit {
  isSaving: boolean = false;

  customerForm: FormGroup;
  editMode: boolean;
  customerData: Customer[] = [];
  selectedCustomer: any;

  cities: City[] = [];
  selectedCityLocations: Location[] | any = [];

  selectedCity: City | null = null;

  apiLoaded: boolean = false;

  // GOOGLE MAPS
  initialCenter: google.maps.LatLngLiteral = {lat: 31.90232873931861, lng: 35.20345069995768};
  initialZoom: number = 10;

  latLngLiteral: google.maps.LatLngLiteral = this.initialCenter;
  markerPosition: google.maps.LatLngLiteral = this.initialCenter;
  markerOptions: google.maps.MarkerOptions = {
    optimized: true,
  };

  constructor(
    private customerService: RegistrationService,
    private fb: FormBuilder,
    public matDialogRef: MatDialogRef<CustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    httpClient: HttpClient,
  ) {
    this.editMode = data.mode === 1;
    this.cities = data.cityData;
    this.selectedCustomer = data.customer;

    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      cityId: [null, [Validators.required]],
      locationId: [null, [Validators.required]],
      latitude: [0, [Validators.min(-90), Validators.max(90)]],
      longitude: [0, [Validators.min(-180), Validators.max(180)]],
      precise: [false, Validators.required],
    });

    httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyC1rCFrBqu32lHImkYyDBSyfmaxp5YCPao', 'callback')
      .pipe()
      .subscribe({
        next: () => {
          this.apiLoaded = true;
        },
        error: error => {
          console.error(error);
        }
      });
  }


  ngOnInit() {
    if (this.editMode) {
      console.log(this.selectedCustomer);

      this.changeSelectedCity(this.cities.filter((city: City) => city.id == this.selectedCustomer.location.cityId)[0]);
      this.customerForm.patchValue({
        name: this.selectedCustomer.name,
        cityId: this.selectedCustomer.location.cityId,
        locationId: this.selectedCustomer.location.id,
        longitude: this.selectedCustomer.longitude,
        latitude: this.selectedCustomer.latitude,
      });

      let newCenter: google.maps.LatLngLiteral = {
        lat: this.selectedCustomer.latitude,
        lng: this.selectedCustomer.longitude,
      }
      this.initialCenter = newCenter;
      this.markerPosition = newCenter;
      this.initialZoom = 15;
    }
  }

  get firstName() {
    return this.customerForm.get('name');
  }

  fetchCustomerData() {
    this.customerService.fetchCustomers().subscribe(
      data => {
        this.customerData = data;
      }
    );
  }

  onSubmitCustomer() {
    if (this.customerForm.invalid) return;
    if (this.isSaving) return;

    this.isSaving = true;
    if (this.editMode) {
      this.onUpdateCustomer();
    } else
      this.saveNewCustomer();
  }

  onUpdateCustomer() {
    const editedCustomerData = this.customerForm.value;
    console.log(this.customerForm.value);
    this.customerService.updateCustomerData(this.selectedCustomer.id, editedCustomerData).subscribe({
        next: response => {
          this.matDialogRef.close(response);
        },
        error: () => {
          this.isSaving = false;
        }
      }
    );
  }

  saveNewCustomer() {
    if (this.customerForm.valid) {
      this.customerService.registerCustomer(this.customerForm.value).subscribe({
          next: response => {
            this.customerForm.reset();
            this.fetchCustomerData();
            this.matDialogRef.close(response);
          },
          error: () => {
            this.isSaving = false
          }
        }
      );
    }
  }

  getNameErrorMessage() {
    let nameControl = this.customerForm.controls['name'];
    if (nameControl.hasError('required'))
      return 'Name is required';
    if (nameControl.hasError('maxLength'))
      return 'Name is too long';
    if (nameControl.hasError('minLength'))
      return 'Name is too short';


    return '';
  }

  changeSelectedCity(city: City) {
    this.selectedCity = city;
    this.selectedCityLocations = [...this.selectedCity.locations];
  }

  move(event: google.maps.MapMouseEvent) {
    if (!event.latLng) return;

    this.latLngLiteral = event.latLng.toJSON();
  }

  moveMarker(event: google.maps.MapMouseEvent) {
    if (!event.latLng) return;

    let selectedLocation = event.latLng;

    this.customerForm.patchValue({
      latitude: selectedLocation.lat(),
      longitude: selectedLocation.lng(),
    })

    console.log(this.customerForm.value);

    this.markerPosition = selectedLocation.toJSON();

  }

  changeSelectedLocation(location: Location) {
    if (!location.longitude || !location.latitude) return;

    let newCenter: google.maps.LatLngLiteral = {
      lat: location.latitude,
      lng: location.longitude,
    }

    this.initialCenter = newCenter;
    this.markerPosition = newCenter;
    this.initialZoom = 12.5;
  }
}
