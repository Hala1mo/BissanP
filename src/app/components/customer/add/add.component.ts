import {Component, OnInit} from '@angular/core';
import { RegistrationService} from "../../../services/registration.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Customer} from "../../../models/Customer";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{
  registrationForm!: FormGroup;
  customerData: any[] = [];
  customerDetails: Customer | null = null;

  constructor(private _snackBar: MatSnackBar,private router: Router,
              private _registrationService: RegistrationService, private fb: FormBuilder) {
  }

  ngOnInit() {



    this.registrationForm = this.fb.group({
      name: [''],
      address: this.fb.group({
        addressLine1: [''],
        addressLine2:[''],
        zipcode: [''],
        city: [''],
      }),

    });

  }
  fetchCustomerData() {
    this._registrationService.fetchCustomerData().subscribe(
      data => {
        console.log('Fetched customer data:', data);

        this.customerData = data;
      },
      error => {
        console.error('Error fetching customer data:', error);
      }
    );
  }


  fetchCustomerDetails(id:bigint){
    this._registrationService.fetchCustomerDetails(id).subscribe(
      data => {
        console.log('Fetched details data:', data);
        this.customerDetails = new Customer(data); // Create a new Customer object

      },
      error => {
        console.error('Error fetching customer data:', error);
      }
    );
  }


  onSubmitCustomer() {
    console.log(this.registrationForm.value);
    this._registrationService.registerCustomer(this.registrationForm.value).subscribe(
      (res) => {
        console.log('Registration successful:', res);
        this.registrationForm.reset();
        this.fetchCustomerData();

        this.router.navigate(['/customer']);
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
