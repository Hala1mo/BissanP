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
export class AddUserComponent {
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
    }, {validator: PasswordValidators('password', 'confirmPassword')})

  }

  submitNewUser() {
    const newUserJson = this.addNewUserForm.value;
    this.userService.saveNewUser(this.addNewUserForm.value).subscribe(
      {
        next: response => {
          this.matDialogRef.close(response);
        },
        error: error => {
          if (error.error && error.error.message) {
            this.snackBar.open(error.error.message, '', {
              duration: 3000
            });
          } else {
            this.snackBar.open(error.message, '', {
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
    if (passwordControl.hasError('maxlength'))
      return 'Password is too long';
    if (passwordControl.hasError('minlength'))
      return 'Password must be at least 8 characters long';
    if (this.addNewUserForm.hasError('misMatch'))
      return 'Passwords do not match';

    return '';
  }

  getConfirmPasswordErrorMessage() {
    let confirmPasswordControl = this.addNewUserForm.controls['confirmPassword'];
    if (confirmPasswordControl.hasError('required'))
      return 'Confirm Password is required';
    if (this.addNewUserForm.hasError('misMatch')) {
      return 'Passwords do not match';
    }
    return '';
  }

  getAccessLevelErrorMessage() {
    let lastNameControl = this.addNewUserForm.controls['accessLevel'];
    if (lastNameControl.hasError('required'))
      return 'Access Level is required';
    return ''
  }

}
