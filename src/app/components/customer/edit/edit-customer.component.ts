import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router'; // Import ActivatedRoute
import {MatSnackBar} from '@angular/material/snack-bar';
import {RegistrationService} from "../../../services/registration.service";
import {nameValidator} from "../../../shared/Name.validators";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../models/User";
import {Customer} from "../../../models/Customer";
import {City} from "../../../models/City";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-edit',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  editForm!: FormGroup;
  cityData: City[] = [];
  _id: bigint = BigInt(0);

  constructor(private _snackBar: MatSnackBar, private route: ActivatedRoute, private fb: FormBuilder, private _registrationService: RegistrationService,
              public matDialogRef: MatDialogRef<EditCustomerComponent>,
              @Inject(MAT_DIALOG_DATA) public selectedCustomer: Customer) {

    this.editForm = this.fb.group({
      name: ['', [Validators.required, nameValidator]],
      address: this.fb.group({
        addressLine1: [''],
        addressLine2: [''],
        city: ['', [Validators.required, nameValidator]],
        zipcode: ['']
      }),
    });
  }

  ngOnInit() {
    this.fetchCityData();
    this._id = this.selectedCustomer.id;
    this.editForm.patchValue({
      name: this.selectedCustomer.name,
      address: {
        addressLine1: this.selectedCustomer.address.addressLine1,
        addressLine2: this.selectedCustomer.address.addressLine2,
        city: this.selectedCustomer.address.city,
        zipcode: this.selectedCustomer.address.zipcode,
      },
    });
  }

  onUpdateCustomer() {
    if (this.editForm.valid) {

      const editedCustomerData = this.editForm.value;
      this._registrationService.updateCustomerData(this._id, editedCustomerData).subscribe({
          next: response => {
            console.log('User data updated successfully:', response);
            console.log("Updated User: ", response)
            this.matDialogRef.close(response);
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


  }


  getNameErrorMessage() {
    let NameControl = this.editForm.controls['name'];
    if (NameControl.hasError('required'))
      return 'First Name is required';
    if (NameControl.hasError('pattern'))
      return 'First Name is Invalid';
    if (NameControl.hasError('maxLength'))
      return 'First Name is too long';
    if (NameControl.hasError('minLength'))
      return 'First Name is too short';

    return '';
  }

  getAddressErrorMessage() {
    let addressControl = this.editForm.get('address.addressLine1');
    if (addressControl?.hasError('required'))
      return 'Address is required';
    if (addressControl?.hasError('maxLength'))
      return 'Address is too long';
    if (addressControl?.hasError('minLength'))
      return 'Address is too short';

    return '';
  }

  getAddress2ErrorMessage() {
    let addressControl = this.editForm.get('address.addressLine2');

    if (addressControl?.hasError('maxLength'))
      return 'Address is too long';
    if (addressControl?.hasError('minLength'))
      return 'Address is too short';

    return '';
  }

  getZipCodeErrorMessage() {
    let zipCodeControl = this.editForm.get('address.zipcode');
    if (zipCodeControl?.hasError('required'))
      return 'Zip Code is required';
    if (zipCodeControl?.hasError('maxLength'))
      return 'Zip Code is too long';

    return '';
  }

  fetchCityData() {
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

  showCity(event: MatSelectChange) {
    const selectedCityid = event.value;
    const selectedCity = this.cityData.find(city => city.id === selectedCityid);
    this.editForm.get('address.city')?.setValue(selectedCityid);
  }
}
