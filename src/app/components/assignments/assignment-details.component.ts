import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {RegistrationService} from "../../services/registration.service";
import {AssignmentService} from "../../services/assignment.service";
import {Customer} from "../../models/Customer";
import {FormControl} from "@angular/forms";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {User} from "../../models/User";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VisitAssignment} from "../../models/VisitAssignment";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-assignments',
  templateUrl: './assignment-details.component.html',
  styleUrls: ['./assignment-details.component.css']
})
export class AssignmentDetailsComponent implements OnInit, AfterViewInit {
  customerData: Customer[] = [];
  userData: User [] = [];

  customerSelectControl = new FormControl();
  userSelectControl = new FormControl();

  filteredCustomers: Observable<Customer[]> | undefined;
  filteredUsers: Observable<User[]> | undefined;

  currentAssignmentId: bigint;
  currentAssignment: VisitAssignment | undefined;


  selectedUser: any; // Placeholder for selected user
  selectedCustomer: any; // Placeholder for selected customer

  displayedColumns = ['name', 'actions'];
  customerDataSource = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private router: Router,
    private assignmentService: AssignmentService,
    private registrationService: RegistrationService,
    private _snackBar:MatSnackBar,
    public matDialogRef: MatDialogRef<AssignmentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.currentAssignmentId = data.assignmentId;
  }

  ngOnInit(): void {
    this.fetchAssignmentData(this.currentAssignmentId);
    this.fetchCustomerData();
    this.fetchUserData();

    this.filteredUsers = this.userSelectControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const username = typeof value === 'string' ? value : value?.username;
        return username ? this._filterUser(username as string) : this.userData.slice();
      }),
    );

    this.filteredCustomers = this.customerSelectControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filterCustomer(name as string) : this.customerData.slice();
      })
    )

  }


  selectUser(event: MatAutocompleteSelectedEvent): void {
    this.selectedUser = event.option.value;
  }

  selectCustomer(event: MatAutocompleteSelectedEvent): void {
    this.selectedCustomer = event.option.value;
  }

  ngAfterViewInit() {
    this.customerDataSource.sort = this.sort;
    this.customerDataSource.paginator = this.paginator;
  }

  fetchAssignmentData(id: any) {
    this.assignmentService.findAssignmentById(id).subscribe({
        next: response => {
          this.customerDataSource.data = response.customers;
          this.currentAssignment = response;
          console.log("RESPONSE --->", this.currentAssignment);

          // if (response.user) {
          //     this.userSelectControl.setValue(response.user.username);
          // }

        },
        error: error => {
          console.error('Error fetching Assignment data:', error);
        }
      }
    );
  }

  fetchCustomerData() {
    this.registrationService.fetchCustomerData().subscribe({
      next: response => {
        console.log('Fetched customer data:', response);
        this.customerData = response;
      },
      error: error => {
        console.error('Error fetching customer data:', error);
      }
    });
  }


  fetchUserData() {
    this.assignmentService.fetchUser().subscribe(
      data => {
        console.log('Fetched user data:', data);
        this.userData = data;

      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  displayUser(user: User): string {
    return user ? user.username  : '';
  }

  displayCustomer(customer: Customer): string {
    return customer ? customer.name : '';
  }


  private _filterUser(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.userData.filter(option => option.username.toLowerCase().includes(filterValue)
      || option.firstName.toLowerCase().includes(filterValue)
      || option.lastName.toLowerCase().includes(filterValue));
  }

  private _filterCustomer(name: string) {
    const filterValue = name.toLowerCase();

    return this.customerData.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  openCustomerDetails(id: bigint) {
    this.router.navigate(['/customers', id]).then(() => {
      this.matDialogRef.close();
    });
  }


  assignCustomer(id:bigint) {

    this.assignmentService.assignCustomer(this.currentAssignmentId, id).subscribe({
        next: response => {
          this.fetchAssignmentData(this.currentAssignmentId);
          console.log('Customer assigned successfully:', response);

        },
        error: error => {
          console.error('Customer not assigned successfully:', error);

          if (error.error && error.error.message) { // Check if 'message' property exists
            const errorMessage = error.error.message;
            console.log('Error message:', errorMessage);

            this._snackBar.open(errorMessage, '', {
              duration: 3000
            });
          } else {
            console.log('Unknown error occurred.');
          }
        }
      }
    );
  }


  assignUser(username:string) {
    this.assignmentService.assignUser(this.currentAssignmentId, username).subscribe({
        next: response => {
          this.fetchAssignmentData(this.currentAssignmentId);
          console.log('Customer assigned successfully:', response);

        },
        error: error => {
          console.error('Customer not assigned successfully:', error);

          if (error.error && error.error.message) { // Check if 'message' property exists
            const errorMessage = error.error.message;
            console.log('Error message:', errorMessage);

            this._snackBar.open(errorMessage, '', {
              duration: 3000
            });
          } else {
            console.log('Unknown error occurred.');
          }
        }
      }
    );
  }
}

