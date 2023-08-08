import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { RegistrationService } from '../registration.service';
import { PasswordValidators} from "../shared/password.validators";

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


  constructor(private _registrationService: RegistrationService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.fetchUserData();

    this.registrationForm = this.fb.group({
      username: [''],
      firstName: [''],
      password: [''],
      confirmPassword:[''],
      lastName: [''],
      accessLevel:['0']
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
    console.log(this.registrationForm.value);

    this._registrationService.registerUser(this.registrationForm.value).subscribe(
      (res) => {

        console.log('Registration successful:', res);
        this.fetchUserData();

      },
      (error) => {
        console.error('Registration failed:', error);
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
    this.populateEditForm(user);
    this.editForm.get('accessLevel')?.setValue(user.accessLevel === 1);
  }

  onSubmitEdit() {
    // Handle edit form submission and update the user data
    // ...

    // Reset the selected user and toggle to add mode
    this.selectedUser = null;
    this.isEditMode = false;
  }
  cancelEdit() {
    this.isEditMode = false;
    this.selectedUser = null;
    this.editForm.reset();
  }



}
