import { Component , OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import {Customer} from "../models/Customer";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NavigationExtras, Router} from "@angular/router";


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  page = 1;
  pageSize = 10;

  customerData: any[] = [];
  name: String = '';
  registrationForm!: FormGroup;

  constructor(
    private router: Router,
    private _registrationService: RegistrationService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.fetchCustomerData();


    this.registrationForm = this.fb.group({
      name: [''],
      address: this.fb.group({
        addressLine1: [''],
        addressLine2: [''],
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


  openCustomerDetails(id: bigint) {
    this.router.navigate(['/details', id]);
    //this.router.navigate(['/details']);
  }

  updateEnabled(id: bigint) {

    this._registrationService.updateEnabledStatusCustomer(id).subscribe(
      (res: any) => {
        if (res) {
          console.log('Enabled status updated successfully:', res);
          this.fetchCustomerData();
        } else {
          console.error('Error updating enabled status:', res);
        }
      },
      (error) => {
        console.error('Error updating enabled status:', error);
      }
    );
  }


  protected readonly Customer = Customer;


  openAddCustomer() {
    this.router.navigate(['/add']);
  }

  openEditCustomer(customer:any){
    this.router.navigate(['/edit'],customer);
  }
}
