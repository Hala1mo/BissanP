import {Component, OnInit} from '@angular/core';
import {RegistrationService} from '../../services/registration.service';
import {Customer} from "../../models/Customer";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {
  page = 1;
  pageSize = 10;

  isSearchLoading = false;
  selectedEnabledOption = "Enabled"

  customerData: Customer[] = [];
  originalCustomerData: Customer[] = [];

  name: String = '';
  registrationForm!: FormGroup;


  selectedSearchCriteria: string = "name";
  searchInput: string = "";

  onSelected(value: string): void {
    if (value == "Name") {
      this.selectedSearchCriteria = "name";
    } else if (value == "City") {
      this.selectedSearchCriteria = "city";
    } else if (value == "Address") {
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
    this.selectedEnabledOption = "All"
    this._registrationService.fetchCustomerData().subscribe(
      data => {
        console.log('Fetched customer data:', data);
        this.originalCustomerData = data;
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

  openEditCustomer(uuid: bigint) {

    this.router.navigate(['/edit', uuid]);
  }


  showEnabledCustomers() {
    this.selectedEnabledOption = "Enabled"
    const enabledCustomers = this.originalCustomerData.filter(customer => customer.enabled === 1);
    this.customerData = enabledCustomers;
  }

  showDisabledCustomers() {
    this.selectedEnabledOption = "Disabled"
    const disabledCustomers = this.originalCustomerData.filter(customer => customer.enabled === 0);
    this.customerData = disabledCustomers;
  }

  applySearchFilter() {
    if (this.searchInput === "") {
      this.customerData = this.originalCustomerData;
    } else {
      this.searchCustomers(this.searchInput.toLowerCase().trim());
    }
  }

  searchCustomers(query: string) {
    this.isSearchLoading = true;
    this._registrationService.searchCustomers(query).subscribe(
      data => {
        console.log('Data Fetched successfully:', data);

        this.customerData = data;
        this.isSearchLoading = false;
      },
      (error) => {
        console.error('Error fetching customer data by city:', error);
        this.isSearchLoading = false;
      }
    )
  }
}
