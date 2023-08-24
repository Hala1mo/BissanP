import {Component, Inject,OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../../../models/Customer";
import {City} from "../../../models/City";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {RegistrationService} from "../../../services/registration.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


interface RegistrationFormData {
  name: string;
  addressLine1: string;
  addressLine2: string;
  latitude: number;
  longitude: number;
  precise: boolean;
  zipcode: string;
  cityId: number | null;
}


@Component({
  selector: 'app-customer-dialogue',
  templateUrl: './customer-dialogue.component.html',
  styleUrls: ['./customer-dialogue.component.css']
})
export class CustomerDialogueComponent implements OnInit{
  registrationForm!: FormGroup;
  editMode: boolean;
  customerData: Customer[] = [];
  cityData: City[] = [];
  preciseLocationCheck: boolean = false;
  selectedCustomer: any;

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private _registrationService: RegistrationService,
    private fb: FormBuilder,
    public matDialogRef: MatDialogRef<CustomerDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editMode = data.mode === 1;
    this.cityData = data.cityData;
    this.selectedCustomer = data.customer;

    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      addressLine1: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      addressLine2: [''],
      latitude: [0, [Validators.min(-90), Validators.max(90)]],
      longitude: [0, [Validators.min(-180), Validators.max(180)]],
      precise: [false, Validators.required],
      zipcode: ['', [Validators.required, Validators.maxLength(5)]],
      cityId: [null],
    });
  }


  ngOnInit() {
    console.log("this.registrationForm", this.registrationForm);

    if (this.editMode) {
      this.registrationForm.patchValue({
        name: this.selectedCustomer.name,
          addressLine1: this.selectedCustomer.address.addressLine1,
          addressLine2: this.selectedCustomer.address.addressLine2,
          longitude: this.selectedCustomer.address.longitude,
          latitude: this.selectedCustomer.address.latitude,
          precise: this.selectedCustomer.address.precise,
          cityId: this.selectedCustomer.address.cityId,
          zipcode: this.selectedCustomer.address.zipcode,
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
    if (this.editMode) {
      this.onUpdateCustomer();
    } else
      this.saveNewCustomer();
  }


  onUpdateCustomer() {
    const editedCustomerData = this.registrationForm.value;
    console.log(this.registrationForm.value);
    this._registrationService.updateCustomerData(this.selectedCustomer.id, editedCustomerData).subscribe({
        next: response => {
          this.matDialogRef.close(response);
          console.log('User data updated successfully:', response);

        },
        error: error => {
          console.error('Error updating user data:', error);
          if (error.error && error.error.errors && error.error.errors.length > 0) {
            const errorMessage = error.error.errors[0];
            console.log('Error message:', errorMessage);
            // this.toastService.show('Error', errorMessage);
            this._snackBar.open(errorMessage, '', {
              duration: 3000
            });

          }
        }
      }
    );
  }

  saveNewCustomer() {
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


}
