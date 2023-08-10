import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { RegistrationService } from '../../registration.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Customer } from '../../models/Customer';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  customerDetails: Customer | null = null;
  registrationForm!: FormGroup;
  selectedContact: any ;// To store the selected user for editing
  isEditMode = false; // Toggle between add and edit modes

  editForm!: FormGroup;

  constructor(
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute, // Use ActivatedRoute here
    private _registrationService: RegistrationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.fetchCustomerDetails(id);
      }

    });



    this.registrationForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      phoneNumber:[''],
      email:['']
    });

    this.editForm = this.fb.group({
      firstName:[''],
      lastName:[''],
      phoneNumber:[''],
      email:['']
    });
  }

  fetchCustomerDetails(id: bigint) {
    this._registrationService.fetchCustomerDetails(id).subscribe(
      (data) => {
        console.log('Fetched details data:', data);
        this.customerDetails = new Customer(data); // Create a new Customer object
      },
      (error) => {
        console.error('Error fetching customer data:', error);
      }
    );
  }
  onSubmit(uuid: any) {
    console.log(this.registrationForm.value);
    this._registrationService.AddnewContact(uuid,this.registrationForm.value).subscribe(
      (res) => {
        console.log('Registration successful:', res);
        this.registrationForm.reset();
        this.fetchCustomerDetails(uuid);

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


  populateEditForm(contact: any) {
    this.editForm.patchValue({
      firstName: contact.firstName,
      lastName: contact.lastName,
      phoneNumber:contact.phoneNumber,
      email:contact.email
    });
  }
  onEditContact(contact: any) {
    this.selectedContact = contact;
    this.isEditMode = true;
    this.populateEditForm(contact);

  }

  onSubmitEdit(cusId: any) {
    if (this.editForm.valid ){

      const editedUserData = this.editForm.value;
      this._registrationService.updateContactData(this.selectedContact.uuid, editedUserData).subscribe(
        (response) => {
          console.log('User data updated successfully:', response);


          // Reset the form and exit edit mode
          this.editForm.reset();
          this.isEditMode = false;
          this.fetchCustomerDetails(cusId);

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

  cancelEdit() {
    this.isEditMode = false;
    this.selectedContact = null;
    this.editForm.reset();
  }

  updateEnabled(cusId:any,contId:any) {

    this._registrationService.updateEnabledStatusContact(contId).subscribe(
      (res: any) => {
        console.log('Enabled status updated successfully:', res);

        this.fetchCustomerDetails(cusId);

      },
      (error) => {
        console.error('Error updating enabled status:', error);

      }
    );
  }
}
