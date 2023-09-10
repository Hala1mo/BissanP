import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
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
import {MatSnackBar} from "@angular/material/snack-bar";
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

  displayedColumns = ['name', 'status', 'startedTime', 'endTime','actions'];
  formsDataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private router: Router,
    private assignmentService: AssignmentService,
    private registrationService: RegistrationService,
    private userService: UserService,
    private snackBar: MatSnackBar,
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
        },
        error: error => {
          console.error('Error fetching Assignment data:', error);
        }
      }
    );
  }

  fetchCustomerData() {
    this.registrationService.fetchCustomersInLocation(this.currentAssignmentLocationId).subscribe({
      next: response => {
        console.log("CUSTOMERS ==> ", response)
        this.customerData = response;
      },
      error: error => {
        console.error('Error fetching customer data:', error);
      }
    });
  }


  fetchUserData() {
    this.userService.fetchEmployees().subscribe({
        next: response => {
          this.userData = response;
        },
        error: error => {
          console.error('Error fetching user data: ', error);
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
        next: response => {
          this.fetchCurrentAssignment(this.currentAssignmentId);
          console.log('Customer assigned successfully:', response);
        },
        error: error => {
          console.error('Customer not assigned successfully:', error);

          if (error.error && error.error.message) { // Check if 'message' property exists
            const errorMessage = error.error.message;
            console.log('Error message:', errorMessage);

            this.snackBar.open(errorMessage, '', {
              duration: 3000
            });
          } else {
            console.log('Unknown error occurred.');
          }
        }
      }
    );
  }

  deleteCustomerFromAssignment(customerId: bigint) {
    this.assignmentService.deleteCustomer(this.currentAssignmentId, customerId).subscribe({
      next: () => {
        this.fetchCurrentAssignment(this.currentAssignmentId);
      },
      error: error => {
        console.error(error)
      }
    })
  }


  assignUser(username: string | undefined) {
    if (!username) return;

    this.assignmentService.assignUser(this.currentAssignmentId, username).subscribe({
        next: response => {
          this.fetchCurrentAssignment(this.currentAssignmentId);
          console.log('Customer assigned successfully:', response);

        },
        error: error => {
          console.error('Customer not assigned successfully:', error);
          if (error.error && error.error.message) { // Check if 'message' property exists
            const errorMessage = error.error.message;
            console.log('Error message:', errorMessage);
            this.snackBar.open(errorMessage, '', {
              duration: 3000
            });
          } else {
            console.log('Unknown error occurred.');
          }
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
    console.log("FILTERING", filterValue);

    this.filteredCustomers = this.customerData.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  fetchForms(currentAssignmentId: bigint) {
    this.assignmentService.fetchAssignmentForms(currentAssignmentId).subscribe({
        next: response => {
          console.log(response);
          this.formsData = response;
          this.formsDataSource.data = response;
          //  console.log("Test",this.formsData);

          console.log("DATASOURCE", this.formsDataSource);
        },
        error: error => {
          console.error('Error fetching forms data:', error);
        }
      }
    );
  }
}

