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
  originalcustomerData: any[] = [];


  selectedSearchCriteria: string = "name";
  searchInput: string = "";
  onSelected(value:string): void {
    if (value =="Name"){
      this.selectedSearchCriteria = "name";}
else if(value=="City"){
      this.selectedSearchCriteria = "city";
    }
    else if(value=="Address"){
      this.selectedSearchCriteria = "address";
    }
  }


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
       this.originalcustomerData=data;
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

  openEditCustomer(uuid:bigint){

    this.router.navigate(['/edit',uuid]);
  }


  showEnables(){

    const enabledCustomers = this.originalcustomerData.filter(customer => customer.enabled === 1);
    this.customerData =enabledCustomers;

  }
  showDisables(){

    const disabledCustomers = this.originalcustomerData.filter(customer => customer.enabled === 0);
    this.customerData =disabledCustomers;

  }

  applySearchFilter() {
    if (this.searchInput === "") {
      this.customerData = this.originalcustomerData;
    } else {
      if (this.selectedSearchCriteria.toLowerCase() === "name") {
        this.customerData = this.originalcustomerData.filter(customer => {
          const searchValue = customer[this.selectedSearchCriteria].toLowerCase();
          return searchValue.includes(this.searchInput.toLowerCase());
        });
      } else if (this.selectedSearchCriteria.toLowerCase() === "city") {

        this.getCity(this.searchInput.toLowerCase());
      }
      else if (this.selectedSearchCriteria.toLowerCase() === "address") {

        this.getAddress(this.searchInput.toLowerCase());
      }
    }
  }
  getCity(city: string) {
    this._registrationService.getCityData(city).subscribe(
      data => {
        console.log('Data Fetched successfully:', data);

        // Filter the fetched data based on the selected city
        const filteredCustomers = data;

        // Update the customerData array with the filtered data
        this.customerData = filteredCustomers;
      },
      (error) => {
        console.error('Error fetching customer data by city:', error);
      }
    );
  }
  getAddress(address: string) {
    this._registrationService.getAddressData(address).subscribe(
      data => {
        console.log('Data Fetched successfully:', data);

        // Filter the fetched data based on the selected city
        const filteredCustomers = data;

        // Update the customerData array with the filtered data
        this.customerData = filteredCustomers;
      },
      (error) => {
        console.error('Error fetching customer data by city:', error);
      }
    );
  }




}
