import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegistrationService} from '../../services/registration.service';
import {PasswordValidators} from "../../shared/password.validators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {nameValidator} from "../../shared/Name.validators";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  page = 1;
  pageSize = 10;

  isSearchLoading = false;

  registrationForm!: FormGroup;
  editForm!: FormGroup;
  userData: any[] = [];
  selectedUser: any | null = null; // To store the selected user for editing
  isEditMode = false; // Toggle between add and edit modes
  editingUsername: string | null = null;
  originalUserData: any[] = [];
  selectedSearchCriteria: string = "username";
  searchInput: string = "";

  onSelected(value: string): void {
    if (value == "First Name") {
      this.selectedSearchCriteria = "firstName";
    } else if (value == "Last Name") {
      this.selectedSearchCriteria = "lastName";
    } else
      this.selectedSearchCriteria = "username";
  }


  constructor(
    private _snackBar: MatSnackBar,
    private _registrationService: RegistrationService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.fetchUserData();

    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', [Validators.required, nameValidator]],
      password: ['', Validators.required],
      confirmPassword: [''],
      lastName: ['', [Validators.required, nameValidator]],
      accessLevel: ['']
    }, {validator: PasswordValidators});


    this.editForm = this.fb.group({
      firstName: ['', [Validators.required, nameValidator]],
      lastName: ['', [Validators.required, nameValidator]],
      accessLevel: ['']
    });
  }

  fetchUserData() {
    this._registrationService.fetchUserData().subscribe(
      data => {
        console.log('Fetched user data:', data);

        this.userData = data;
        this.originalUserData = data;
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
      accessLevel: user.accessLevel
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
    if (this.editForm.valid && this.editingUsername) {

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


  showEnables() {

    const enabledUsers = this.originalUserData.filter(user => user.enabled === 1);
    this.userData = enabledUsers;

  }

  showDisables() {

    const disabledUsers = this.originalUserData.filter(user => user.enabled === 0);
    this.userData = disabledUsers;

  }

  showAdmin() {

    const adminUsers = this.originalUserData.filter(user => user.accessLevel === 1);
    this.userData = adminUsers;

  }

  showEmployee() {

    const employeeUsers = this.originalUserData.filter(user => user.accessLevel === 0);
    this.userData = employeeUsers;

  }


  applySearchFilter() {
    if (this.searchInput === "") {
      this.userData = this.originalUserData;
    } else {
      this.searchUsers(this.searchInput.toLowerCase().trim());
    }

  }

  searchUsers(query: string) {
    this.isSearchLoading = true;
    this._registrationService.searchUsers(query).subscribe(
      data => {
        console.log('Data Fetched successfully:', data);

        this.userData = data;
        this.isSearchLoading = false;

      },
      (error) => {
        console.error('Error fetching customer data by city:', error);
        this.isSearchLoading = false;

      }
    )
  }

}
