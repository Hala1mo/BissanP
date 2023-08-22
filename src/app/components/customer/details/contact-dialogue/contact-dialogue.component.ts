import {Component, Inject,OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {RegistrationService} from "../../../../services/registration.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {nameValidator, telValidator} from "../../../../shared/Name.validators";

@Component({
  selector: 'app-contact-dialogue',
  templateUrl: './contact-dialogue.component.html',
  styleUrls: ['./contact-dialogue.component.css']
})
export class ContactDialogueComponent implements  OnInit{

  selectedContact: any;
  registrationForm!: FormGroup;
  editMode: boolean;
  constructor(private _snackBar: MatSnackBar,
              private router: Router,
              private _registrationService: RegistrationService,
              private fb: FormBuilder,
              public matDialogRef: MatDialogRef<ContactDialogueComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.editMode = data.mode === 1;


    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, nameValidator]],
      lastName: ['', [Validators.required, nameValidator]],
      phoneNumber: ['', [Validators.required, Validators.pattern("0-9.- ")]],
      email: ['', [Validators.required, Validators.email]],
      Types: this.fb.group({
        id: ['']
      }),
    });
  }

  ngOnInit() {

    console.log("this.registrationForm", this.registrationForm);

    if (this.editMode) {
      // populateEditForm(contact);
    }

}


  // populateEditForm(contact: any) {
  //   console.log("jmdcksdcksdc", contact.checkedVisits);
  //   this.editForm.patchValue({
  //     firstName: contact.firstName,
  //     lastName: contact.lastName,
  //     phoneNumber: contact.phoneNumber,
  //     email: contact.email,
  //     Types: this.buildTypesFormArray()
  //   });
  //   console.log(">>>>", contact);
  //   console.log("this.TypesData", this.TypesData);
  //   this.TypesData.forEach(type => {
  //     debugger
  //     const typeControl = this.editForm.get(['Types', type.id]) as FormControl;
  //     const isSelected = contact.checkedVisits.some((contactType: { id: any; }) => contactType.id === type.id);
  //     typeControl.setValue(isSelected);
  //   });
  // }

  getNameErrorMessage() {
    let nameControl = this.registrationForm.controls['name'];
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
      return 'Name is required';
    if (nameControl.hasError('pattern'))
      return 'Phone number must contain only numbers ';

    return '';
  }
}
