import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../../../models/Customer";
import {City} from "../../../models/City";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {RegistrationService} from "../../../services/registration.service";
import {nameValidator} from "../../../shared/Name.validators";
import {MatSelectChange} from "@angular/material/select";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-customer-dialogue',
  templateUrl: './customer-dialogue.component.html',
  styleUrls: ['./customer-dialogue.component.css']
})
export class CustomerDialogueComponent {
  registrationForm!: FormGroup;
  editMode:boolean;
  customerData: Customer[] = [];
  cityData: City[] = [];
  preciseLocationCheck: boolean = false;
  selectedCityid: string | null = null; // Initialize to null
  selectedCustomer: Customer;
  constructor(private _snackBar: MatSnackBar,
              private router: Router,
              private _registrationService: RegistrationService,
              private fb: FormBuilder,
              public matDialogRef: MatDialogRef<CustomerDialogueComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.editMode=data.mode===1;
    this.cityData=data.cityData;
    this.selectedCustomer=data.customer;

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

  }

  ngOnInit() {

    this.registrationForm.get('address.city')?.valueChanges.subscribe((value) => {
      this.selectedCityid = value; // Update selectedCityid with the selected city id
    });

    console.log("this.registrationForm", this.registrationForm);

    if(this.editMode){
      this.registrationForm.patchValue({

        name: this.selectedCustomer.name,
        address: {
          addressLine1: this.selectedCustomer.address.addressLine1,
          addressLine2: this.selectedCustomer.address.addressLine2,
          longitude:this.selectedCustomer.address.longitude,
          latitude:this.selectedCustomer.address.latitude,
          precise: this.selectedCustomer.address.precise,
          city: this.selectedCustomer.address.city,
          zipcode: this.selectedCustomer.address.zipcode,
        },
      });
    }

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
  onSubmitCustomer() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      this._registrationService.registerCustomer(this.registrationForm.value).subscribe(
        (res) => {
          console.log('Registration successful:', res);
          this.registrationForm.reset();
          this.fetchCustomerData();
          this.matDialogRef.close(res);

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

  getNameErrorMessage() {
    let nameControl = this.registrationForm.controls['name'];
    if (nameControl.hasError('required'))
      return 'Name is required';
    if (nameControl.hasError('maxLength'))
      return 'Name is too long';
    if (nameControl.hasError('minLength'))
      return 'Name is too short';


    return '';
  }

  getAddressErrorMessage() {
    let addressControl = this.registrationForm.get('address.addressLine1');
    if (addressControl?.hasError('required'))
      return 'Address is required';
    if (addressControl?.hasError('maxLength'))
      return 'Address is too long';
    if (addressControl?.hasError('minLength'))
      return 'Address is too short';

    return '';
  }

  getAddress2ErrorMessage() {
    let addressControl = this.registrationForm.get('address.addressLine2');

    if (addressControl?.hasError('maxLength'))
      return 'Address is too long';
    if (addressControl?.hasError('minLength'))
      return 'Address is too short';

    return '';
  }

  getZipCodeErrorMessage() {
    let zipCodeControl = this.registrationForm.get('address.zipcode');
    if (zipCodeControl?.hasError('required'))
      return 'Zip Code is required';
    if (zipCodeControl?.hasError('maxLength'))
      return 'Zip Code is too long';

    return '';
  }


  showCity(event: MatSelectChange) {
    const selectedCityid = event.value;
    const selectedCity = this.cityData.find(city => city.id === selectedCityid);
    this.registrationForm.get('address.city')?.setValue(selectedCityid);
  }

}
