import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { MatSnackBar } from '@angular/material/snack-bar';
import {RegistrationService} from "../../../services/registration.service";
import {nameValidator} from "../../../shared/Name.validators";
@Component({
  selector: 'app-edit',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  editForm!: FormGroup;
  _uuid: bigint = BigInt(0);

  constructor(private _snackBar: MatSnackBar,private route: ActivatedRoute,private fb: FormBuilder, private _registrationService: RegistrationService,) {}





  ngOnInit() {
    this.route.params.subscribe((params) => {
     // console.log("params", params);
      const id = params['id'];
      if (id) {
        this.fetchCustomerAddress(id);
      }
    });

    this.route.params.subscribe((params) => {
      const id = params['uuid'];
      if (id) {
        console.log("id", id);
      }
    });

    this.editForm = this.fb.group({
      name: ['',[Validators.required, nameValidator]],
      address: this.fb.group({
        addressLine1: [''],
        addressLine2: [''],
        city: ['',[Validators.required, nameValidator]],
        zipcode: ['']
      }),
    });
  }



  fetchCustomerAddress(uuid: bigint) {
    this._registrationService.fetchCustomerDetails(uuid).subscribe(
      (data) => {
        console.log('Fetched customer data:', data);

        const customer = data; // Assuming data is an object containing customer details
        const address = customer.address;

        this.editForm.patchValue({
          name: customer.name,
          address: {
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            city: address.city,
            zipcode: address.zipcode,
          },
        });

        this._uuid = customer.uuid;
      },
      (error) => {
        console.error('Error fetching customer data:', error);
      }
    );
  }

  onUpdateCustomer(){
    if (this.editForm.valid){

      const editedCustomerData = this.editForm.value;
      this._registrationService.updateCustomerData(this._uuid, editedCustomerData).subscribe(
        (response) => {
          console.log('User data updated successfully:', response);

          //this.fetchUserData();
          //TODO ADD ROUTING BACK TO DETAILED PAGE
        },
        (error) => {
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
      );
    }





  }
}
