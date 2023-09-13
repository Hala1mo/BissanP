import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {RegistrationService} from "../../services/registration.service";
import {AssignmentService} from "../../services/assignment.service";
import {Customer} from "../../models/Customer";
import {FormControl} from "@angular/forms";
import {User} from "../../models/User";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VisitAssignment} from "../../models/VisitAssignment";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {UserService} from "../../services/user.service";
import {visitForms} from "../../models/visitForms";

@Component({
  selector: 'app-assignments',
  templateUrl: './assignment-details.component.html',
  styleUrls: ['./assignment-details.component.css']
})
export class AssignmentDetailsComponent implements OnInit, AfterViewInit {
  customerData: Customer[] = [];
  userData: User [] = [];
  formsData: visitForms[] = [];

  filteredCustomers: Customer[] | undefined;
  customerSelectControl = new FormControl();
  @ViewChild('customerInput') customerInput!: ElementRef<HTMLInputElement>;

  filteredUsers: User[] | undefined;
  userSelectControl = new FormControl();
  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;


  currentAssignmentId: bigint;
  currentAssignmentLocationId: bigint;
  currentAssignment: VisitAssignment | undefined;

  selectedUser: User | undefined; // Placeholder for selected user
  selectedCustomer: Customer | undefined; // Placeholder for selected customer

  displayedColumns = ['name', 'status', 'startedTime', 'endTime', 'actions'];
  formsDataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private assignmentService: AssignmentService,
    private registrationService: RegistrationService,
    private userService: UserService,
    public matDialogRef: MatDialogRef<AssignmentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.currentAssignmentId = data.assignmentId;
    this.currentAssignmentLocationId = data.locationId;

  }

  ngOnInit(): void {
    this.fetchCurrentAssignment(this.currentAssignmentId);
    this.fetchForms(this.currentAssignmentId);
    this.fetchUserData();
    this.fetchCustomerData();
  }


  selectUser(event: MatAutocompleteSelectedEvent): void {
    this.selectedUser = event.option.value;
  }

  selectCustomer(event: MatAutocompleteSelectedEvent): void {
    this.selectedCustomer = event.option.value;
  }

  ngAfterViewInit() {
    this.formsDataSource.sort = this.sort;
    this.formsDataSource.paginator = this.paginator;
  }

  fetchCurrentAssignment(id: any) {
    this.assignmentService.findAssignmentById(id).subscribe({
        next: response => {
          // this.customerDataSource.data = response.customers;
          this.currentAssignment = response;

          this.selectedUser = response.user;
          this.userSelectControl.setValue(this.selectedUser);
        }
      }
    );
  }

  fetchCustomerData() {
    this.registrationService.fetchCustomersInLocation(this.currentAssignmentLocationId).subscribe({
      next: response => {
        this.customerData = response;
      }
    });
  }


  fetchUserData() {
    this.userService.fetchEmployees().subscribe({
        next: response => {
          this.userData = response;
        }
      }
    );
  }

  displayUser(user: User): string {
    return user ? `${user.username} (${user.firstName} ${user.lastName})` : '';
  }

  displayCustomer(customer: Customer): string {
    return customer ? `${customer.name}` : '';
  }


  assignCustomer(customerId: bigint | undefined) {
    if (!customerId) return;

    this.assignmentService.assignCustomer(this.currentAssignmentId, customerId).subscribe({
        next: () => {
          this.fetchCurrentAssignment(this.currentAssignmentId);
          this.fetchCustomerData();
          this.fetchForms(this.currentAssignmentId);
        }
      }
    );
  }

  deleteCustomerFromAssignment(customerId: bigint) {
    this.assignmentService.deleteCustomer(this.currentAssignmentId, customerId).subscribe({
      next: () => {
        this.fetchCurrentAssignment(this.currentAssignmentId);
        this.fetchForms(this.currentAssignmentId);
      }
    })
  }


  assignUser(username: string | undefined) {
    if (!username) return;

    this.assignmentService.assignUser(this.currentAssignmentId, username).subscribe({
        next: () => {
          this.fetchCurrentAssignment(this.currentAssignmentId);
        }
      }
    );
  }

  filterUsers() {
    const filterValue = this.userInput.nativeElement.value.toLowerCase();
    this.filteredUsers = this.userData.filter(option => option.username.toLowerCase().includes(filterValue)
      || option.firstName.toLowerCase().includes(filterValue)
      || option.lastName.toLowerCase().includes(filterValue));
  }

  filterCustomers() {
    const filterValue = this.customerInput.nativeElement.value.toLowerCase();

    this.filteredCustomers = this.customerData.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  fetchForms(currentAssignmentId: bigint) {
    this.assignmentService.fetchAssignmentForms(currentAssignmentId).subscribe({
        next: response => {
          this.formsData = response;
          this.formsDataSource.data = response;
        }
      }
    );
  }

  closeDialog() {
    this.matDialogRef.close();
  }

}


