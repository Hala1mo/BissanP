import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DocumentService} from "../../services/document.service";
import * as XLSX from "xlsx";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import {Customer} from "../../models/Customer";
import {RegistrationService} from "../../services/registration.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit, AfterViewInit {
  customerData: Customer[] = [];
  rows: any[] = [];
  dataSource: any[] = [];
  searchInput: string = "";
  filteredUsers: User[] | undefined;
  userData: User [] = [];
  selectedUserForm: FormGroup;
  displayedColumns: string[] = ['customerName', 'userFullName', 'paymentDate', 'amount', 'paymentType', 'visitType'];
  fileName = 'ExcelSheet.xlsx';
  filteredCustomers: Customer[] | undefined;
  originalUserData: User[] = [];
  originalCustomerData: Customer[] = []

  fromDate: any;
  toDate: any;

  userSelectControl = new FormControl();
  customerSelectControl = new FormControl();

  @ViewChild('customerInput') customerInput!: ElementRef<HTMLInputElement>;
  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;
  isSaving: boolean = false;

  constructor(
    formBuilder: FormBuilder,
    private documentService: DocumentService,
    private registrationService: RegistrationService,
    private userService: UserService,
    private router: Router,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    this.selectedUserForm = formBuilder.group({
      username: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.fetchAllDefinitions();
    this.fetchUserData();
    this.fetchCustomerData();

  }

  filterUsers() {
    const filterValue = this.userInput.nativeElement.value.toLowerCase();
    this.filteredUsers = this.userData.filter(option => option.username.toLowerCase().includes(filterValue)
      || option.firstName.toLowerCase().includes(filterValue)
      || option.lastName.toLowerCase().includes(filterValue));
  }

  ngAfterViewInit(): void {
  }


  fetchAllDefinitions() {
    this.documentService.fetchPaymentDetails().subscribe({
      next: response => {
        console.log(response);
        this.rows = response;
      },
      error: error => {
        if (error.message) {
          let errorMessage = error.message;
          this.snackBar.open(errorMessage, '', {
            duration: 3000
          });
        }
      }
    });
  }

  exportTable() {
    let element = document.getElementById('report-table');

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  displayUser(user: User): string {
    return user ? `${user.username} (${user.firstName} ${user.lastName})` : '';
  }

  private fetchUserData() {
    this.userService.fetchEmployees().subscribe({
        next: response => {
          this.userData = response;
          this.originalUserData = response;
        },
        error: error => {
          console.error('Error fetching user data:', error);
        }
      }
    );
  }


  displayCustomer(customer: Customer): string {
    return customer ? `${customer.name}` : '';
  }

  fetchCustomerData() {
    this.registrationService.fetchCustomers().subscribe({
      next: response => {
        this.customerData = response;
        this.originalCustomerData = response;
      }
    });
  }


  filterCustomers() {
    const filterValue = this.customerInput.nativeElement.value.toLowerCase();
    this.filteredCustomers = this.customerData.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  searchPayments() {
    let username = '';
    let customerId = '';
    let fromDateString = '';
    let toDateString = '';

    if (this.userSelectControl.value) {
      username = this.userSelectControl.value.username;
    }
    if (this.customerSelectControl.value) {
      customerId = this.customerSelectControl.value.id || undefined;
    }

    if (this.fromDate && this.toDate) {
      fromDateString = formatDate(this.fromDate, 'yyyy-MM-dd', 'en');
      toDateString = formatDate(this.toDate, 'yyyy-MM-dd', 'en');
    }
    console.log("CUS", customerId);
    if (!username && !customerId)
      this.resetFilters();
    this.documentService.searchPayments(customerId, username, fromDateString, toDateString).subscribe({
      next: value => {
        this.rows = value;
      }
    })
  }

  resetFilters() {
    this.searchInput = '';
    this.userSelectControl.setValue('');
    this.customerSelectControl.setValue('');

    this.userData = this.originalUserData;
    this.rows = this.dataSource;
  }

}
