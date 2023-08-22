import {Component, OnInit} from '@angular/core';
import {RegistrationService} from "../../../services/registration.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../../../models/Customer";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {nameValidator} from "../../../shared/Name.validators";
import {City} from "../../../models/City";

@Component({
  selector: 'app-add',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  registrationForm!: FormGroup;
  customerData: Customer[] = [];
  cityData:City[]=[];
  customerDetails: Customer | null = null;
  preciseLocationCheck: boolean = false;
  selectedCityUuid: string | null = null; // Initialize to null

  constructor(private _snackBar: MatSnackBar, private router: Router,

              private _registrationService: RegistrationService, private fb: FormBuilder) {



  }

  ngOnInit() {
    this.fetchCityData();
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      address: this.fb.group({
        addressLine1: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        addressLine2: [''],
        latitude: [null, [Validators.min(-90), Validators.max(90)]],
        longitude: [null, [Validators.min(-180), Validators.max(180)]],
        precise: [false],
        zipcode: ['', [Validators.required, Validators.maxLength(5)]],
        city: [null, [Validators.required, nameValidator]],
      }),
    });

    // Listen for value changes in the city dropdown
    this.registrationForm.get('address.city')?.valueChanges.subscribe((value) => {
      this.selectedCityUuid = value; // Update selectedCityUuid with the selected city UUID
    });

    console.log("this.registrationForm", this.registrationForm);

  }
  get firstName() {
    return this.registrationForm.get('name');
  }

  fetchCustomerData() {
    this._registrationService.fetchCustomerData().subscribe(
      data => {
        console.log('Fetched customer data:', data);

        this.customerData = data;
      },
      error => {
        console.error('Error fetching visit types:', error);
        if (error.message) {
          let errorMessage = error.message;
          console.log('Error message:', errorMessage);

          this._snackBar.open(errorMessage, '', {
            duration: 3000
          });
        }
      }
    );
  }




  fetchCityData(){
    this._registrationService.fetchCityData().subscribe(
      data => {
        console.log('Fetched city data:', data);

        this.cityData = data;
      },
      error => {
        console.error('Error fetching city data:', error);
      }
    );

  }
  fetchCustomerDetails(id: bigint) {
    this._registrationService.fetchCustomerDetails(id).subscribe(
      data => {
        console.log('Fetched details data:', data);
        this.customerDetails = new Customer(data); // Create a new Customer object

      },
      error => {
        console.error('Error fetching customer data:', error);
      }
    );
  }


  onSubmitCustomer() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      this._registrationService.registerCustomer(this.registrationForm.value).subscribe(
        (res) => {
          console.log('Registration successful:', res);
          this.registrationForm.reset();
          this.fetchCustomerData();

          this.router.navigate(['/customers']);

        },
        (error) => {
          console.error('Registration failed:', error);
          if (error.error && error.error.errors && error.error.errors.length > 0) {
            const errorMessage = error.error.errors[0];
            console.log('Error message:', errorMessage);
            // this.toastService.show('Error', errorMessage);
            this._snackBar.open(errorMessage, '', {
              duration: 3000
            });

          }
        }
      );
    }
  }
  togglePreciseLocation() {
    this.preciseLocationCheck = !this.preciseLocationCheck;
  }
  get latitudeControl() {
    return this.registrationForm.get('address.latitude');
  }

  get longitudeControl() {
    return this.registrationForm.get('address.longitude');
  }

  getNameErrorMessage(){
    let nameControl=this.registrationForm.controls['name'];
    if (nameControl.hasError('required'))
      return 'Name is required';
    if (nameControl.hasError('maxLength'))
      return 'Name is too long';
    if (nameControl.hasError('minLength'))
      return 'Name is too short';


    return '';
  }

  getAddressErrorMessage(){
   let addressControl=this.registrationForm.get('address.addressLine1');
    if (addressControl?.hasError('required'))
      return 'Address is required';
    if (addressControl?.hasError('maxLength'))
      return 'Address is too long';
    if (addressControl?.hasError('minLength'))
      return 'Address is too short';

    return'';
  }

  getZipCodeErrorMessage(){
    let zipCodeControl=this.registrationForm.get('address.zipcode');
    if (zipCodeControl?.hasError('required'))
      return 'Zip Code is required';
    if (zipCodeControl?.hasError('maxLength'))
      return 'Zip Code is too long';

    return '';
  }


  // getAddressErrorMessage() {
  //   const addressLine1Control = this.registrationForm.get('address.addressLine1');
  //
  //   if (addressControl.hasError('required'))
  //     return 'Address is required';
  //   if (addressControl.hasError('maxLength'))
  //     return 'Address is too long';
  //   if (addressControl.hasError('minLength'))
  //     return 'Address is too short';
  //
  //   return ''; // Return an empty string if no error is found
  // }
}
