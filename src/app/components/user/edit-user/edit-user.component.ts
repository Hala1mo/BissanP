import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/User";

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
    editUserForm: FormGroup;

    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
        public matDialogRef: MatDialogRef<EditUserComponent>,
        @Inject(MAT_DIALOG_DATA) public selectedUser: User
    ) {
        this.editUserForm = this.formBuilder.group({
            firstName: ['', [Validators.required,
                Validators.minLength(3),
                Validators.maxLength(30),
                Validators.pattern('[a-zA-Z ]*')]],

            lastName: ['', [Validators.required,
                Validators.minLength(3),
                Validators.maxLength(30),
                Validators.pattern('[a-zA-Z ]*')]],

            accessLevel: ['', [Validators.required]]
        })
    }

    ngOnInit(): void {
        this.editUserForm.patchValue({
            firstName: this.selectedUser.firstName,
            lastName: this.selectedUser.lastName,
            accessLevel: this.selectedUser.accessLevel
        });
    }


    submitEditUser() {
        const updatedUserJson = this.editUserForm.value;
        console.log(updatedUserJson);

        if (this.editUserForm.invalid) return;

        this.userService.updateUser(this.selectedUser.username, this.editUserForm.value).subscribe(
            {
                next: response => {
                    this.matDialogRef.close(response);
                },
                error: error => {
                    console.log(error)
                    if (error.error && error.error.message) { // Check if 'message' property exists
                        const errorMessage = error.error.message;
                        this.snackBar.open(errorMessage, '', {
                            duration: 3000
                        });
                    }
                }
            }
        )
    }

    getFirstNameErrorMessage() {
        let firstNameControl = this.editUserForm.controls['firstName'];
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
        let lastNameControl = this.editUserForm.controls['lastName'];
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

    getAccessLevelErrorMessage() {
        let lastNameControl = this.editUserForm.controls['accessLevel'];
        if (lastNameControl.hasError('required'))
            return 'Access Level is required';
        return ''
    }


}
