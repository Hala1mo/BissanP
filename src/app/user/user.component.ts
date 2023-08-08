import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { RegistrationService } from '../registration.service';
import { PasswordValidators} from "../shared/password.validators";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  registrationForm!: FormGroup;
  editForm!: FormGroup;
  userData: any[] = [];
  selectedUser: any | null = null; // To store the selected user for editing
  isEditMode = false; // Toggle between add and edit modes
  editingUsername: string | null = null;


  constructor(
    private _snackBar: MatSnackBar,
    private _registrationService: RegistrationService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.fetchUserData();

    this.registrationForm = this.fb.group({
      username: [''],
      firstName: [''],
      password: [''],
      confirmPassword:[''],
      lastName: [''],
      accessLevel:['']
    },{validator: PasswordValidators});


    this.editForm = this.fb.group({
     firstName:[''],
      lastName:[''],
      accessLevel:['']
    });
  }

  fetchUserData() {
    this._registrationService.fetchUserData().subscribe(
      data => {
        console.log('Fetched user data:', data);

        this.userData = data;
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  onSubmit() {
    const registrationFormValue = this.registrationForm.value;
    registrationFormValue.accessLevel = registrationFormValue.accessLevel ? 1 : 0;

    console.log(this.registrationForm.value);

    this._registrationService.registerUser(this.registrationForm.value).subscribe(
      (res) => {
        console.log('Registration successful:', res);
        this.registrationForm.reset();
        this.fetchUserData();
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


  updateEnabled(username: string) {

    this._registrationService.updateEnabledStatus(username).subscribe(
      (res: any) => {
        console.log('Enabled status updated successfully:', res);

        this.fetchUserData();

      },
      (error) => {
        console.error('Error updating enabled status:', error);

      }
    );
  }
  populateEditForm(user: any) {
    this.editForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      accessLevel:user.accessLevel
    });
  }
  onEditUser(user: any) {
    this.selectedUser = user;
    this.isEditMode = true;
    this.editingUsername = user.username;
    this.populateEditForm(user);
    this.editForm.get('accessLevel')?.setValue(user.accessLevel === 1);
  }



  onSubmitEdit() {
    if (this.editForm.valid && this.editingUsername){

      const editedUserData = this.editForm.value;

      editedUserData.accessLevel = editedUserData.accessLevel ? 1 : 0;
      this._registrationService.updateUserData(this.editingUsername, editedUserData).subscribe(
        (response) => {
          console.log('User data updated successfully:', response);

          const editedUserIndex = this.userData.findIndex(user => user.username === editedUserData.username);
          if (editedUserIndex !== -1) {
            this.userData[editedUserIndex] = editedUserData;
          }

          // Reset the form and exit edit mode
          this.editForm.reset();
          this.isEditMode = false;
          this.fetchUserData();

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
    this.selectedUser = null;
    this.editForm.reset();
  }

}
