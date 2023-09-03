import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../../../models/Customer";
import {City} from "../../../models/City";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {RegistrationService} from "../../../services/registration.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Location} from "../../../models/Location";
import {SharedService} from "../../../services/shared.service";

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
  preciseLocationCheck: boolean = false;
  selectedCustomer: any;

  cities: City[] = [];
  selectedCityLocations: Location[] | any = [];

  selectedCity: City | null = null;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private customerService: RegistrationService,
    private sharedService: SharedService,
    private fb: FormBuilder,
    public matDialogRef: MatDialogRef<CustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
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
  }


  ngOnInit() {
    if (this.editMode) {
      this.changeSelectedCity(this.cities.filter((city: City) => city.id == this.selectedCustomer.location.cityId)[0]);
      this.customerForm.patchValue({
        name: this.selectedCustomer.name,
        cityId: this.selectedCustomer.location.cityId,
        locationId: this.selectedCustomer.location.id,
        longitude: this.selectedCustomer.longitude,
        latitude: this.selectedCustomer.latitude,
      });
    }
  }

  get firstName() {
    return this.customerForm.get('name');
  }

  fetchCustomerData() {
    this.customerService.fetchCustomers().subscribe(
      data => {
        console.log('Fetched customer data:', data);
        this.customerData = data;
      },
      error => {
        console.error('Error fetching visit types:', error);
        if (error.message) {
          let errorMessage = error.message;
          console.log('Error message:', errorMessage);

          this.snackBar.open(errorMessage, '', {
            duration: 3000
          });
        }
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
        error: error => {
          if (error.error && error.error.message) { // Check if 'message' property exists
            const errorMessage = error.error.message;
            this.snackBar.open(errorMessage, '', {
              duration: 3000
            });
          }
        }
      }
    );
  }

  saveNewCustomer() {
    if (this.customerForm.valid) {
      console.log(this.customerForm.value);

      this.customerService.registerCustomer(this.customerForm.value).subscribe(
        (res) => {
          console.log('Registration successful:', res);
          this.customerForm.reset();
          this.fetchCustomerData();
          this.matDialogRef.close(res);

          this.router.navigate(['/customers']);

        },
        (error) => {
          console.error('Registration failed:', error);

          if (error.error && error.error.message) { // Check if 'message' property exists
            const errorMessage = error.error.message;
            console.log('Error message:', errorMessage);

            this.snackBar.open(errorMessage, '', {
              duration: 3000
            });
          } else {
            console.log('Unknown error occurred.');
          }
        }
      );
    }
  }

  togglePreciseLocation() {
    this.preciseLocationCheck = !this.preciseLocationCheck;
  }

  get latitudeControl() {
    return this.customerForm.get('address.latitude');
  }

  get longitudeControl() {
    return this.customerForm.get('address.longitude');
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

}
