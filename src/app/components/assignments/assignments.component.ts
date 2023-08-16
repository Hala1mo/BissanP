import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RegistrationService} from "../../services/registration.service";
import {AssignmentService} from "../../services/assignment.service";
import {Customer} from "../../models/Customer";
import {FormControl} from "@angular/forms";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements  OnInit{

  customerNames: string[] | undefined ;
  customerData : Customer[]=[];
  myControl = new FormControl();
  filteredCustomers: Observable<Customer[]> | undefined;
AssignmentId!:bigint ;


  constructor(
     private route: ActivatedRoute,
     private _assignmentService:AssignmentService,
     private _registrationService:RegistrationService
) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.AssignmentId = params['id'];
      if (this.AssignmentId) {
        this.fetchCustomerAssignments(this.AssignmentId);
      }
      this.fetchCustomerData();

    });
    this.filteredCustomers = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
  );
  }

  fetchCustomerAssignments(id: any) {
    this._assignmentService.fetchAssignmentsDetails(id).subscribe(
      data => {
        console.log('Fetched Assignment data:', data);
        // Assuming data.customers is an array containing customer objects
        if (data.customers && data.customers.length > 0) {
          this.customerNames = data.customers.map((customer: { name: string; }) => customer.name);
          console.log('Customer Names:', this.customerNames);
        }
      },
      error => {
        console.error('Error fetching Assignment data:', error);
      }
    );
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
  private _filter(value: string): Customer[] {
    const filterValue = this._normalizeValue(value);
    return this.customerData.filter(customer => this._normalizeValue(customer.name).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    if (typeof value !== 'string') {
      return '';
    }
    return value.toLowerCase().replace(/\s/g, '');
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.myControl.setValue(event.option.value.name); // Set the selected customer's name to the FormControl
  }
  addCustomer(selectedCustomerName: string) {
    if (selectedCustomerName) {
      const selectedCustomer = this.customerData.find(customer => customer.name === selectedCustomerName);
      if (selectedCustomer && selectedCustomer.uuid) {
        const customerId = selectedCustomer.uuid;
        // Now you can use the customerId in your logic to add the customer
        console.log('Selected Customer ID:', customerId);

        var customerDTO = {
          "uuid" : customerId
        }
        this._assignmentService.AddCustomer(customerDTO,this.AssignmentId).subscribe(
          data => {
            console.log('Fetched customer data:', data);
            this.customerData = data;
            this.fetchCustomerAssignments(this.AssignmentId);
          },
          error => {
            console.error('Error fetching customer data:', error);
          }
        );


      }
    }
  }






}
