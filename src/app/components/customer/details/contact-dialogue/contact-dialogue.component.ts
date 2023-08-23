import {Component, Inject, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {RegistrationService} from "../../../../services/registration.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {nameValidator} from "../../../../shared/Name.validators";
import {DefinitionService} from "../../../../services/definition.service";

@Component({
  selector: 'app-contact-dialogue',
  templateUrl: './contact-dialogue.component.html',
  styleUrls: ['./contact-dialogue.component.css']
})
export class ContactDialogueComponent implements OnInit {

  selectedContact: any;
  customerId!: bigint;
  registrationForm!: FormGroup;
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


    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, nameValidator]],
      lastName: ['', [Validators.required, nameValidator]],
      phoneNumber: ['', [Validators.required, Validators.pattern("[0-9]*")]],
      email: ['', [Validators.required, Validators.email]],
      // visitTypes: this.fb.group({ // Update the field name to visitType
      types: []
      // }),
    });
  }

  ngOnInit() {
    console.log("this.registrationForm", this.registrationForm);

    if (this.editMode) {
      this.populateEditForm(this.selectedContact);
    }

  }


  getNameErrorMessage() {
    let nameControl = this.registrationForm.controls['firstName'];
    if (nameControl.hasError('required'))
      return 'Name is required';
    if (nameControl.hasError('maxLength'))
      return 'Name is too long';
    if (nameControl.hasError('minLength'))
      return 'Name is too short';


    return '';
  }

  getLastNameErrorMessage() {
    let nameControl = this.registrationForm.controls['lastName'];
    if (nameControl.hasError('required'))
      return 'Name is required';
    if (nameControl.hasError('maxLength'))
      return 'Name is too long';
    if (nameControl.hasError('minLength'))
      return 'Name is too short';


    return '';
  }

  getPhoneErrorMessage() {
    let nameControl = this.registrationForm.controls['phoneNumber'];
    if (nameControl.hasError('required'))
      return 'Phone Number is required';
    if (nameControl.hasError('pattern'))
      return 'Phone Number must contain only numbers ';

    return '';
  }


  onSubmitContact() {
    if (this.editMode) {
      this.onSubmitEdit();
    } else {
      this.addContact(this.customerId);
      console.log("customer Id" + this.customerId)
    }
  }

  addContact(id: bigint) {

    const formData = this.registrationForm.value;
    console.log(formData);

    this._registrationService.AddnewContact(id, formData).subscribe(
      (res) => {
        console.log('Registration successful:', res);
        this.matDialogRef.close(res);
        // this.fetchCustomerDetails(id);

      },
      (error) => {
        console.error('Registration failed:', error);
        if (error.error && error.error.errors && error.error.errors.length > 0) {
          const errorMessage = error.error.errors[0];
          console.log('Error message:', errorMessage);
          this._snackBar.open(errorMessage, '', {
            duration: 3000
          });
        }
      }
    );
  }

  populateEditForm(contact: any) {
    console.log("jmdcksdcksdc", contact.visitTypes);
    const checkedTypes: bigint[] = [];
    for (let visitType of contact.visitTypes) {
      checkedTypes.push(visitType.id);
    }

    this.registrationForm.patchValue({
      firstName: contact.firstName,
      lastName: contact.lastName,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
      types: checkedTypes,
    });
    console.log(">>>>", contact);
    console.log(contact.types);
  }


  onSubmitEdit() {
    if (this.registrationForm.valid) {

      const editedUserData = this.registrationForm.value;
      editedUserData.Types = this.typesData.filter(type => editedUserData.Types[type.id]);
      this._registrationService.updateContactData(this.selectedContact.id, editedUserData).subscribe(
        (response) => {
          console.log('User data updated successfully:', response);
          this.registrationForm.reset();
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
