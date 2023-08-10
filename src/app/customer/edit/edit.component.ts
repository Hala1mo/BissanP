import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { MatSnackBar } from '@angular/material/snack-bar';
import {RegistrationService} from "../../registration.service";
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editForm!: FormGroup;
  _uuid: bigint = BigInt(0);

  constructor(private _snackBar: MatSnackBar,private route: ActivatedRoute,private fb: FormBuilder, private _registrationService: RegistrationService,) {}

  ngOnInit() {

    this.route.params.subscribe((params) => {
      const id = params['customer'];
      if (id) {
        this.populateEditForm(id);
      }
    }),
    this.editForm = this.fb.group({
      name: [''],
      address: this.fb.group({
        addressLine1: [''],
        addressLine2: [''],
        city: [''],
        zipcode: ['']
      }),

    });
  }

  populateEditForm(customer:any) {
    this.editForm.patchValue({
      name: customer.name,
      address: {
        addressLine1: customer.address.addressLine1,
        addressLine2: customer.address.addressLine2,
        city: customer.address.city,
        zipcode: customer.address.zipcode
      }
    });
    this._uuid=customer.uuid;
  }
  onUpdateCustomer(){
    if (this.editForm.valid){

      const editedCustomerData = this.editForm.value;
      this._registrationService.updateCustomerData(this._uuid, editedCustomerData).subscribe(
        (response) => {
          console.log('User data updated successfully:', response);

          //this.fetchUserData();

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
