import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ReportsService} from '../../services/reports.service';
import {Router} from "@angular/router";
import {formatDate} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {SharedService} from "../../services/shared.service";
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  filteredUsers: User[] | undefined;
  assignmentDate: any[] = [];
  userDetailedReportData: any[] = [];
  userData: User [] = [];

  isDateDataEmpty: boolean = false;
  userSelectControl = new FormControl();
  fromDate: any;
  toDate: any;
  selectedUserForm: FormGroup;
  userFromDate: any;
  userToDate: any;

  customerFromDate: any;
  customerToDate: any;

  specificUserFromDate: any;
  specificUserToDate: any;

  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;
  isSaving: boolean = false;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private reportsService: ReportsService,
    private sharedService: SharedService,
  ) {
    this.selectedUserForm = formBuilder.group({
      username: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.fetchDate();
    this.fetchUserData();
  }

  fetchDate() {
    this.reportsService.fetchAssignmentsByDate().subscribe({
        next: response => {
          this.assignmentDate = response;
        }
      }
    );
  }

  fetchAssignmentByDateBetween(from: string, to: string) {
    this.reportsService.fetchAssignmentByDateBetween(from, to).subscribe({
        next: (response) => {
          this.userDetailedReportData = response;

          if (this.userDetailedReportData.length === 0) {
            this.isDateDataEmpty = true;
          } else {
            this.isDateDataEmpty = false;
            this.sharedService.updateDateData(this.userDetailedReportData);
            void this.router.navigate(['/reports/date']);
          }
        }
      }
    );
  }

  generateUserPerformanceReport() {
    const fromDateString = formatDate(this.userFromDate, 'yyyy-MM-dd', 'en');
    const toDateString = formatDate(this.userToDate, 'yyyy-MM-dd', 'en');

    this.reportsService.generateUserPerformanceReport(fromDateString, toDateString).subscribe({
      next: response => {
        this.sharedService.setUserPerformanceReports(response);
        void this.router.navigate(['/reports/user-performance'])
      }
    })
  }

  generateAssignmentReport() {
    const fromDateString = formatDate(this.fromDate, 'yyyy-MM-dd', 'en');
    const toDateString = formatDate(this.toDate, 'yyyy-MM-dd', 'en');
    this.fetchAssignmentByDateBetween(fromDateString, toDateString);
  }

  filterUsers() {
    const filterValue = this.userInput.nativeElement.value.toLowerCase();
    this.filteredUsers = this.userData.filter(option => option.username.toLowerCase().includes(filterValue)
      || option.firstName.toLowerCase().includes(filterValue)
      || option.lastName.toLowerCase().includes(filterValue));
  }


  displayUser(user: User): string {
    return user ? `${user.username} (${user.firstName} ${user.lastName})` : '';
  }

  private fetchUserData() {
    this.userService.fetchEmployees().subscribe({
        next: response => {
          this.userData = response;
        },
        error: error => {
          console.error('Error fetching user data:', error);
        }
      }
    );
  }

  selectUser(event: MatAutocompleteSelectedEvent): void {
    this.selectedUserForm.patchValue({
      username: event.option.value.username,
    })
  }

  generateSpecificUserReport() {
    const fromDateString = formatDate(this.specificUserFromDate, 'yyyy-MM-dd', 'en');
    const toDateString = formatDate(this.specificUserToDate, 'yyyy-MM-dd', 'en');
    this.fetchSpecificUserData(fromDateString, toDateString);
  }


  fetchSpecificUserData(from: string, to: string) {
    this.reportsService.generateUserDetailedReport(this.selectedUserForm.value, from, to).subscribe({
        next: response => {
          this.userDetailedReportData = response;
          if (this.userDetailedReportData.length === 0) {
            this.isDateDataEmpty = true;
          } else {
            this.isDateDataEmpty = false;
            this.sharedService.setUserDetailedReports(response);
            void this.router.navigate(['/reports/user-detailed']);
          }
        }
      }
    );
  }

  generateCustomerPerformanceReport() {
    const fromDateString = formatDate(this.customerFromDate, 'yyyy-MM-dd', 'en');
    const toDateString = formatDate(this.customerToDate, 'yyyy-MM-dd', 'en');

    this.reportsService.generateCustomerPerformanceReport(fromDateString, toDateString).subscribe({
      next: response => {
        this.sharedService.setCustomerPerformanceReports(response);
        void this.router.navigate(['/reports/customer-performance'])
      }
    })

  }
}
