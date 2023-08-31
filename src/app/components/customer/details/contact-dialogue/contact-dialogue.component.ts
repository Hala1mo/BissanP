import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {RegistrationService} from "../../../../services/registration.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {nameValidator} from "../../../../shared/Name.validators";
import {DefinitionService} from "../../../../services/definition.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-contact-dialogue',
  templateUrl: './contact-dialogue.component.html',
  styleUrls: ['./contact-dialogue.component.css']
})
export class ContactDialogueComponent implements OnInit {

  selectedContact: any;
  customerId!: bigint;
  contactForm!: FormGroup;
  editMode: boolean;

  typesData: any[] = [];

  constructor(private _snackBar: MatSnackBar,
              private router: Router,
              private _registrationService: RegistrationService,
              private fb: FormBuilder,
              private VisitServices: DefinitionService,
              public matDialogRef: MatDialogRef<ContactDialogueComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.editMode = data.mode === 1;
    this.typesData = data.typesData;
    this.selectedContact = data.contact;
    this.customerId = data.customerId;


    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, nameValidator]],
      lastName: ['', [Validators.required, nameValidator]],
      phoneNumber: ['', [Validators.required, Validators.pattern("[0-9]*"), Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      visitTypes: []
      // }),
    });
  }

  ngOnInit() {
    console.log("this.registrationForm", this.contactForm);

    if (this.editMode) {
      this.populateEditForm(this.selectedContact);
    }

  }


  getNameErrorMessage() {
    let nameControl = this.contactForm.controls['firstName'];
    if (nameControl.hasError('required'))
      return 'Name is required';
    if (nameControl.hasError('maxLength'))
      return 'Name is too long';
    if (nameControl.hasError('minLength'))
      return 'Name is too short';


    return '';
  }

  getLastNameErrorMessage() {
    let nameControl = this.contactForm.controls['lastName'];
    if (nameControl.hasError('required'))
      return 'Name is required';
    if (nameControl.hasError('maxLength'))
      return 'Name is too long';
    if (nameControl.hasError('minLength'))
      return 'Name is too short';


    return '';
  }

  getPhoneErrorMessage() {
    let phoneControl = this.contactForm.controls['phoneNumber'];
    if (phoneControl.hasError('required'))
      return 'Phone Number is required';
    if (phoneControl.hasError('pattern'))
      return 'Phone Number must contain only numbers ';
    if (phoneControl.hasError('minlength') || phoneControl.hasError('maxlength')) {
      return 'Phone Number must be exactly 10 digits';
    }

    return '';
  }


  getEmailErrorMessage() {
    let nameControl = this.contactForm.controls['email'];
    if (nameControl.hasError('required'))
      return 'Email is required';
    if (nameControl.hasError('email')) {
      return 'Invalid email format';
    }


    return '';
  }

  onSubmitContact() {
    if (this.editMode) {
      this.onSubmitEdit();
    } else {
      this.addContact(this.customerId);
    }
  }

  addContact(id: bigint) {
    const formData = this.contactForm.value;

    this._registrationService.addNewContact(id, formData).subscribe(
      (res) => {
        console.log('Registration successful:', res);
        this.matDialogRef.close(res);

      },
      (error) => {
        console.error('Registration failed:', error);

        if (error.error && error.error.message) { // Check if 'message' property exists
          const errorMessage = error.error.message;
          console.log('Error message:', errorMessage);

          this._snackBar.open(errorMessage, '', {
            duration: 3000
          });
        } else {
          console.log('Unknown error occurred.');
        }
      }
    );
  }

  populateEditForm(contact: any) {
    const checkedTypes: bigint[] = [];
    for (let visitType of contact.visitTypes) {
      checkedTypes.push(visitType.id);
    }


    this.contactForm.patchValue({
      firstName: contact.firstName,
      lastName: contact.lastName,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
      visitTypes: checkedTypes,
    });
  }


  onSubmitEdit() {
    console.log(this.contactForm.value)
    if (this.contactForm.valid) {
      const editedUserData = this.contactForm.value;

      this._registrationService.updateContactData(this.selectedContact.id, editedUserData).subscribe({
          next: response => {
            this.matDialogRef.close(response);
            console.log('User data updated successfully:', response);

          },
          error: error => {
            console.error('Error updating user data:', error);

            if (error.error && error.error.message) { // Check if 'message' property exists
              const errorMessage = error.error.message;
              console.log('Error message:', errorMessage);

              this._snackBar.open(errorMessage, '', {
                duration: 3000
              });
            } else {
              console.log('Unknown error occurred.');
            }
          }
        }
      );
    }
  }

}