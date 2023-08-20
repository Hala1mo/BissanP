import {Component, OnInit, ViewChild} from '@angular/core';
import {RegistrationService} from '../../services/registration.service';
import {Customer} from "../../models/Customer";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";



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
  displayedColumns: string[] = ['name', 'city', 'addressLine','enabled']
  customerData: Customer[] = [];
  originalCustomerData: Customer[] = [];

  name: String = '';
  registrationForm!: FormGroup;


  selectedSearchCriteria: string = "name";
  searchInput: string = "";
  dataSource = new MatTableDataSource(this.customerData);
  @ViewChild('customerTablePaginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
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
    private _registrationService: RegistrationService, private fb: FormBuilder,private _liveAnnouncer: LiveAnnouncer) {
  }

  ngOnInit() {
    this.fetchCustomerData();

    this.dataSource.filterPredicate = function (customer, filter) {
      return customer.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())||customer.address.city.toLocaleLowerCase()
        .includes(filter.toLocaleLowerCase())||customer.address.addressLine1.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    }


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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
    console.log(this.dataSource.sort?.active);
  }

  fetchCustomerData() {
    this.selectedEnabledOption = "All"
    this._registrationService.fetchCustomerData().subscribe(
      data => {
        console.log('Fetched customer data:', data);
        this.originalCustomerData = data;
        this.customerData = data;
        this.dataSource=data;
      },
      error => {
        console.error('Error fetching customer data:', error);
      }
    );
  }


  openCustomerDetails(id: bigint) {
    this.router.navigate(['/customers', id]);

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
    this.router.navigate(['/customers/add']);
  }

  openEditCustomer(uuid: bigint) {

    this.router.navigate(['customers/edit', uuid]);
  }


  showEnabledCustomers() {
    this.selectedEnabledOption = "Enabled"
    const enabledCustomers = this.originalCustomerData.filter(customer => customer.enabled === 1);
    this.customerData = enabledCustomers;
    this.dataSource=new MatTableDataSource(this.customerData);

  }

  showDisabledCustomers() {
    this.selectedEnabledOption = "Disabled"
    const disabledCustomers = this.originalCustomerData.filter(customer => customer.enabled === 0);
    this.customerData = disabledCustomers;
    // this.dataSource.data = this.customerData;
    console.log("this.dataSource.data", this.dataSource.data);
    this.dataSource=new MatTableDataSource(this.customerData);

  }

  applySearchFilter(event: Event) {
    if (this.searchInput === "") {
      this.customerData = this.originalCustomerData;
    } else {
      this.searchCustomers(this.searchInput.toLowerCase().trim());
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter=filterValue.trim()
    }
  }

  searchCustomers(query: string) {
    this.dataSource.filter = query.trim().toLowerCase();
    this.isSearchLoading = true;
    this._registrationService.searchCustomers(query).subscribe(
      data => {
        console.log('Data Fetched successfully:', data);

        this.customerData = data;
        this.isSearchLoading = false;
        this.dataSource=data
      },
      (error) => {
        console.error('Error fetching customer data by city:', error);
        this.isSearchLoading = false;
      }
    )
  }

  protected readonly console = console;
}
