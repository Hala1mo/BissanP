import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordValidators} from "../../../shared/password.validators";
import {UserService} from "../../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addNewUserForm: FormGroup;

  hidePassword: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    public matDialogRef: MatDialogRef<AddUserComponent>,
  ) {
    this.hidePassword = true;

    this.addNewUserForm = this.formBuilder.group({
      username: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)]],

      firstName: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z ]*')]],

      lastName: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z ]*')]],

      password: ['', [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)]],

      confirmPassword: ['', [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)]],

      accessLevel: ['', [Validators.required]]
    }, {validator: PasswordValidators});

  }

  ngOnInit(): void {

  }

  submitNewUser() {
    const newUserJson = this.addNewUserForm.value;
    console.log(newUserJson);

    if (this.addNewUserForm.invalid) return;

    this.userService.saveNewUser(this.addNewUserForm.value).subscribe(
      {
        next: response => {
          console.log("Saved new User: ", response)
          this.matDialogRef.close();
        },
        error: error => {
          if (error.error && error.error.errors && error.error.errors.length > 0) {
            const errorMessage = error.error.errors[0];
            console.log('Error message:', errorMessage);

            this.snackBar.open(errorMessage, '', {
              duration: 3000
            });
          }
        }
      }
    )
  }

  getUsernameErrorMessage() {
    let usernameControl = this.addNewUserForm.controls['username'];
    if (usernameControl.hasError('required'))
      return 'Username is required';
    if (usernameControl.hasError('maxLength'))
      return 'Username is too long';
    if (usernameControl.hasError('minLength'))
      return 'Username is too short';


    return '';
  }

  getFirstNameErrorMessage() {
    let firstNameControl = this.addNewUserForm.controls['firstName'];
    if (firstNameControl.hasError('required'))
      return 'First Name is required';
    if (firstNameControl.hasError('pattern'))
      return 'First Name is Invalid';
    if (firstNameControl.hasError('maxLength'))
      return 'First Name is too long';
    if (firstNameControl.hasError('minLength'))
      return 'First Name is too short';

    return '';
  }

  getLastNameErrorMessage() {
    let lastNameControl = this.addNewUserForm.controls['lastName'];
    if (lastNameControl.hasError('required'))
      return 'Last Name is required';
    if (lastNameControl.hasError('pattern'))
      return 'Last Name is Invalid';
    if (lastNameControl.hasError('maxLength'))
      return 'Last Name is too long';
    if (lastNameControl.hasError('minLength'))
      return 'Last Name is too short';

    return '';
  }

  getPasswordErrorMessage() {
    let passwordControl = this.addNewUserForm.controls['password'];
    if (passwordControl.hasError('required'))
      return 'Password is required';
    if (passwordControl.hasError('maxLength'))
      return 'Password is too long';
    if (passwordControl.hasError('minLength'))
      return 'Password is too short';

    if (this.addNewUserForm.hasError('misMatch'))
      return 'Passwords do not match';
    return ''
  }

  getConfirmPasswordErrorMessage() {
    let confirmPasswordControl = this.addNewUserForm.controls['confirmPassword'];
    if (confirmPasswordControl.hasError('required'))
      return 'Confirm Password is required';
    if (confirmPasswordControl.hasError('maxLength'))
      return 'Password is too long';
    if (confirmPasswordControl.hasError('minLength'))
      return 'Password is too short';
    if (this.addNewUserForm.hasError('misMatch'))
      return 'Passwords do not match';
    return ''
  }

  getAccessLevelErrorMessage() {
    let lastNameControl = this.addNewUserForm.controls['accessLevel'];
    if (lastNameControl.hasError('required'))
      return 'Access Level is required';
    return ''
  }


}
