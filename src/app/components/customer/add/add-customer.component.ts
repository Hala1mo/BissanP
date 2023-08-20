import {Component, OnInit} from '@angular/core';
import {RegistrationService} from "../../../services/registration.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../../../models/Customer";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {nameValidator} from "../../../shared/Name.validators";

@Component({
  selector: 'app-add',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  registrationForm!: FormGroup;
  customerData: Customer[] = [];
  customerDetails: Customer | null = null;
  preciseLocationCheck: boolean = false;

  constructor(private _snackBar: MatSnackBar, private router: Router,
              private _registrationService: RegistrationService, private fb: FormBuilder) {




  }

  ngOnInit() {


    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, nameValidator]],

      address: this.fb.group({
        addressLine1: ['',Validators.required],
        addressLine2: [''],
        longitude: [],
        latitude: [],
        precise: [false],
        zipcode: [''],
        city: ['',[Validators.required, nameValidator]],

      }),

    });

    console.log("this.registrationForm", this.registrationForm);

  }
  get firstName() {
    return this.registrationForm.get('name');
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


  fetchCustomerDetails(id: bigint) {
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
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      this._registrationService.registerCustomer(this.registrationForm.value).subscribe(
        (res) => {
          console.log('Registration successful:', res);
          this.registrationForm.reset();
          this.fetchCustomerData();

          this.router.navigate(['/customers']);

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
  togglePreciseLocation() {
    this.preciseLocationCheck = !this.preciseLocationCheck;
  }
  get latitudeControl() {
    return this.registrationForm.get('address.latitude');
  }

  get longitudeControl() {
    return this.registrationForm.get('address.longitude');
  }

  protected readonly name = name;
}
