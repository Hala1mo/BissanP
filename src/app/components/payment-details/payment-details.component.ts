import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
export class PaymentDetailsComponent implements OnInit {
  customerData: Customer[] = [];
  filteredCustomers: Customer[] | undefined;

  userData: User [] = [];
  filteredUsers: User[] | undefined;

  receipts: any[] = [];
  originalReceipts: any[] = [];

  searchInput: string = "";
  selectedUserForm: FormGroup;
  displayedColumns: string[] = ['customerName', 'userFullName', 'paymentDate', 'amount', 'paymentType', 'visitType'];
  fileName = 'ExcelSheet.xlsx';


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
  ) {
    this.selectedUserForm = formBuilder.group({
      username: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.fetchAllPayments();
    this.fetchUserData();
    this.fetchCustomerData();

  }

  filterUsers() {
    const filterValue = this.userInput.nativeElement.value.toLowerCase();
    this.filteredUsers = this.userData.filter(option => option.username.toLowerCase().includes(filterValue)
      || option.firstName.toLowerCase().includes(filterValue)
      || option.lastName.toLowerCase().includes(filterValue));
  }


  fetchAllPayments() {
    this.documentService.fetchPaymentDetails().subscribe({
      next: response => {
        this.originalReceipts = response;
        this.receipts = response;
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
      }
    });
  }


  filterCustomers() {
    const filterValue = this.customerInput.nativeElement.value.toLowerCase();
    this.filteredCustomers = this.customerData.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  searchPayments() {
    let username: string | undefined;
    let customerId: string | undefined;
    let fromDateString: string | undefined;
    let toDateString: string | undefined;

    if (this.userSelectControl.value)
      username = this.userSelectControl.value.username || undefined;
    else
      username = undefined;

    if (this.customerSelectControl.value)
      customerId = this.customerSelectControl.value.id || undefined;
    else
      customerId = undefined

    if (this.fromDate && this.toDate) {
      fromDateString = formatDate(this.fromDate, 'yyyy-MM-dd', 'en');
      toDateString = formatDate(this.toDate, 'yyyy-MM-dd', 'en');
    }else {
      fromDateString = undefined;
      toDateString = undefined;
    }

    console.log(username, customerId, fromDateString, toDateString)

    if (!username && !customerId && !fromDateString && !toDateString)
      this.resetFilters();

    this.documentService.searchPayments(customerId, username, fromDateString, toDateString).subscribe({
      next: value => {
        this.receipts = value;
      }
    })
  }

  resetFilters() {
    this.searchInput = '';
    this.userSelectControl.setValue('');
    this.customerSelectControl.setValue('');
    this.fromDate = ''
    this.toDate = ''

    this.receipts = this.originalReceipts;
  }

}
