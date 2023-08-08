import { Component , OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import {Customer} from "./customer";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PasswordValidators} from "../shared/password.validators";


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements  OnInit{
  customerDetails: Customer | null = null;
  customerData: any[] = [];
  name: String = '';
  registrationForm!: FormGroup;

  constructor(private _snackBar: MatSnackBar,
    private _registrationService: RegistrationService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.fetchCustomerData();


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

  updateEnabled(id:bigint) {

    this._registrationService.updateEnabledStatusCustomer(id).subscribe(
      (res: any) => {
        console.log('Enabled status updated successfully:', res);

        this.fetchCustomerData();

      },
      (error) => {
        console.error('Error updating enabled status:', error);

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

  protected readonly Customer = Customer;
}
