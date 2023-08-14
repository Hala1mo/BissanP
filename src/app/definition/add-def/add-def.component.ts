import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {RegistrationService} from "../../registration.service";

@Component({
  selector: 'app-add-def',
  templateUrl: './add-def.component.html',
  styleUrls: ['./add-def.component.css']
})
export class AddDefComponent implements OnInit {


  registrationForm!: FormGroup;

  TypesData: any[] = [];
  types: any[] = [];


  constructor(private _snackBar: MatSnackBar, private router: Router,
              private _registrationService: RegistrationService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.fetchvisitTypes();
    this.registrationForm = this.fb.group({
      name: [''],
      description: [''],
      frequency: [''],
      allowRecurring: ['false'],
      typeUUID: ['']

    });

  }


  fetchvisitTypes() {

    this._registrationService.fetchTypesData().subscribe(
      (data) => {
        console.log('Fetched types data:', data);
        this.TypesData = data;
        this.types = data;
      },
      (error) => {
        console.error('Error fetching types data:', error);
      }
    );
  }
  onTypeSelect(event: any) {
    const selectedValue = event.target.value;
    this.registrationForm.get('typeUUID')?.setValue(selectedValue);
  }


  onSubmit() {
    console.log(this.registrationForm.value);
    this._registrationService.addDefinition(this.registrationForm.value).subscribe(
      (res) => {
        console.log('Registration successful:', res);
        this.registrationForm.reset();
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
}

