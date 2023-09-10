import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {ReportsService} from '../../services/reports.service';
import {MatSort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {formatDate} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {SharedService} from "../../services/shared.service";
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  filteredUsers: User[] | undefined;
  Date: any[] = [];
  DateData: any[] = [];
  cusData: any[] = [];
  userData: User [] = [];

  isDateDataEmpty: boolean = false;
  userSelectControl = new FormControl();
  fromDate: any;
  toDate: any;
  selectedUserForm: FormGroup;
  userFromDate: any;
  userToDate: any;

  specificUserfromDate: any;
  specificUsertoDate: any;

  myControl = new FormControl();

  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;
  isSaving: boolean = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('reportsTablePaginator') paginator!: MatPaginator;

  constructor(private router: Router,
              formBuilder: FormBuilder,
              private userService: UserService,
              private _liveAnnouncer: LiveAnnouncer,
              private _reportsService: ReportsService,
              private sharedService: SharedService,
  ) {
    this.selectedUserForm = formBuilder.group({
      username: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    // this.fetchAllData();
    this.fetchDate();
    this.fetchUserData();
  }

  fetchDate() {
    this._reportsService.fetchAssignmentsByDate().subscribe(
      data => {
        console.log('Fetched assignments data:', data);

        this.Date = data;
      },
      error => {
        console.error('Error fetching assignments data:', error);
      }
    );

  }


  protected readonly console = console;

  // onTypeSelect() {
  //   if (this.fromDate && this.toDate) {
  //     const fromDateString = formatDate(this.fromDate, 'yyyy-MM-dd', 'en');
  //     const toDateString = formatDate(this.toDate, 'yyyy-MM-dd', 'en');
  //     this.fetchDateData(fromDateString, toDateString);
  //   }
  // }


  fetchDateData(from: string, to: string) {
    this._reportsService.fetchAssignmentByDateBetween(from, to).subscribe(
      (data) => {
        console.log('Fetched Date data:', data);
        this.DateData = data;

        if (this.DateData.length === 0) {
          this.isDateDataEmpty = true;
        } else {
          this.isDateDataEmpty = false;
          // this.router.navigate(['/reports', fromDateString, toDateString]);
          this.sharedService.updateDateData(this.DateData);
          this.router.navigate(['/reports/date']);
        }
      },
      (error) => {
        console.error('Error fetching Date data:', error);
      }
    );
  }

  generateUserPerformanceReport() {
    const fromDateString = formatDate(this.userFromDate, 'yyyy-MM-dd', 'en');
    const toDateString = formatDate(this.userToDate, 'yyyy-MM-dd', 'en');

    this._reportsService.generateUserPerformanceReport(fromDateString, toDateString).subscribe({
      next: response => {
        this.sharedService.setUserPerformanceReports(response);
        this.router.navigate(['/reports/user-performance'])
      },
      error: error => {

      }
    })
  }


  generateAssignmentReport() {
    const fromDateString = formatDate(this.fromDate, 'yyyy-MM-dd', 'en');
    const toDateString = formatDate(this.toDate, 'yyyy-MM-dd', 'en');
    this.fetchDateData(fromDateString, toDateString);
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
    const fromDateString = formatDate(this.specificUserfromDate, 'yyyy-MM-dd', 'en');
    const toDateString = formatDate(this.specificUsertoDate, 'yyyy-MM-dd', 'en');
    this.fetchSpecificUserData(fromDateString, toDateString);
  }


  fetchSpecificUserData(from: string, to: string) {
    this._reportsService.generateUserDetailedReport(this.selectedUserForm.value, from, to).subscribe(
      (data) => {
        console.log('Fetched userrr data:', data);
        this.DateData = data;

        if (this.DateData.length === 0) {
          this.isDateDataEmpty = true;
        } else {
          this.isDateDataEmpty = false;
          this.router.navigate(['/reports/user-detailed']);
        }
      },
      (error) => {
        console.error('Error fetching Date data:', error);
      }
    );
  }
}
