import {Component, Inject, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {RegistrationService} from "../../../../services/registration.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {nameValidator} from "../../../../shared/Name.validators";
import {VisitType} from "../../../../models/VisitType";

@Component({
  selector: 'app-contact-dialogue',
  templateUrl: './contact-dialogue.component.html',
  styleUrls: ['./contact-dialogue.component.css']
})
export class ContactDialogueComponent implements OnInit {

  selectedContact: any;
  customerId: bigint;
  assignmentId: bigint;
  contactForm: FormGroup;
  mode: number;
  editMode: boolean;

  visitTypesData: VisitType[] = [];
  checkedTypeId: bigint[];
  isSaving: boolean = false;

  constructor(private _snackBar: MatSnackBar,
              private customerService: RegistrationService,
              private fb: FormBuilder,
              public matDialogRef: MatDialogRef<ContactDialogueComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.editMode = data.mode === 1;
    this.mode = data.mode;

    this.visitTypesData = data.typesData;
    this.checkedTypeId = data.checkedTypes;
    this.selectedContact = data.contact;
    this.customerId = data.customerId;

    this.assignmentId = data.assignmentId;

    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, nameValidator]],
      lastName: ['', [Validators.required, nameValidator]],
      phoneNumber: ['', [Validators.required, Validators.pattern("[0-9]*"), Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.email]],
      visitTypes: []
    });
  }

  ngOnInit() {
    console.log("this.registrationForm", this.contactForm);

    if (this.mode === 1) {
      this.populateEditForm(this.selectedContact);
    }
    if (this.mode === 2) {
      this.contactForm.patchValue({
        visitTypes: this.checkedTypeId,
      });
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
    if (nameControl.hasError('email')) {
      return 'Invalid email format';
    }

    return '';
  }

  onSubmitContact() {
    if (this.contactForm.invalid) return;
    if (this.isSaving) return;

    this.isSaving = true;
    if (this.mode === 1) {
      this.updateContact();
      return;
    }
    if (this.mode === 2) {
      this.saveContactAndAddToAssignment(this.customerId, this.assignmentId);
      return;
    }

    this.addContactToCustomer(this.customerId);

  }

  addContactToCustomer(id: bigint) {
    const formData = this.contactForm.value;
    this.customerService.addNewContact(id, formData).subscribe(
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

  updateContact() {
    if (this.contactForm.valid) {
      const editedUserData = this.contactForm.value;
      this.customerService.updateContactData(this.selectedContact.id, editedUserData).subscribe({
          next: response => {
            this.matDialogRef.close(response);
          },
          error: error => {
            if (error.error && error.error.message) { // Check if 'message' property exists
              this._snackBar.open(error.error.message, '', {
                duration: 3000
              });
            }
          }
        }
      );
    }
  }

  private saveContactAndAddToAssignment(customerId: bigint, assignmentId: bigint) {
    this.customerService.addNewContactAndAssignCustomer(customerId, assignmentId, this.contactForm.value).subscribe({
      next: response => {
        this.matDialogRef.close(response);
      },
      error: () => {
        this.isSaving = false
      }

    })
  }

}
