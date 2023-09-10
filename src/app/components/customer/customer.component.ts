import {Component, OnInit, ViewChild} from '@angular/core';
import {RegistrationService} from '../../services/registration.service';
import {Customer} from "../../models/Customer";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {CustomerDialogComponent} from "./customer-dialog/customer-dialog.component";
import {VisitAssignment} from "../../models/VisitAssignment";
import {AssignNewCustomerDialogComponent} from "./assign-new-customer-dialog/assign-new-customer-dialog.component";
import {SharedService} from "../../services/shared.service";


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {
  isTableLoaded: boolean = false;

  selectedEnabledOption = "All Customers"
  displayedColumns: string[] = ['name', 'city', 'location', 'enabled', 'actions']
  customerData: Customer[] = [];
  originalCustomerData: Customer[] = [];

  searchInput: string = "";
  dataSource = new MatTableDataSource(this.customerData);
  @ViewChild('customerTablePaginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private router: Router,
    private customerService: RegistrationService,
    private sharedService: SharedService,
    private matDialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.fetchCustomerData();

    this.dataSource.filterPredicate = function (customer, filter) {
      const name = customer.name ? customer.name.toLocaleLowerCase() : '';
      const cityName = customer.location && customer.location.cityName ? customer.location.cityName.toLocaleLowerCase() : '';
      const address = customer.location ? customer.location.address.toLocaleLowerCase() : '';

      return name.includes(filter.toLocaleLowerCase()) ||
        cityName.includes(filter.toLocaleLowerCase()) ||
        address.includes(filter.toLocaleLowerCase());
    }

  }

  fetchCustomerData() {
    this.customerService.fetchCustomers().subscribe({
        next: response => {
          this.isTableLoaded = true;
          this.originalCustomerData = response;

          this.resetFilters();
          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          })

        },
        error: error => {
          console.error('Error fetching customer data:', error);
        }
      }
    );
  }

  openCustomerDetails(id: bigint) {
    this.router.navigate(['/customers', id]);
  }

  updateEnabled(customer: Customer) {
    customer.enabled = !customer.enabled;
    this.customerService.updateEnabledStatusCustomer(customer.id).subscribe({
        next: response => {
          customer.enabled = response.enabled;
        },
        error: error => {
          console.error(error)
          customer.enabled = !customer.enabled;
        }
      }
    );
  }


  protected readonly Customer = Customer;


  showEnabledCustomers() {
    this.customerData = this.originalCustomerData.filter(customer => customer.enabled);
    this.dataSource.data = this.customerData;
  }

  showDisabledCustomers() {
    this.customerData = this.originalCustomerData.filter(customer => !customer.enabled);
    this.dataSource.data = this.customerData;
  }

  resetFilters() {
    this.customerData = this.originalCustomerData;
    this.dataSource.data = this.customerData;
  }

  applySearchFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddDialog() {
    this.matDialog.open(CustomerDialogComponent, {
      width: '40%',
      data: {
        'mode': 0,
        'cityData': this.sharedService.getCitiesAsList()
      }

    }).afterClosed().subscribe((response) => {
      if (!response || !response.availableAssignments || response.availableAssignments.length < 1) {
        this.fetchCustomerData();
        return;
      }
      this.openAssignNewCustomer(response.availableAssignments, response.customer);
    })
  }

  openEditCustomerDialog(customer: Customer) {
    this.matDialog.open(CustomerDialogComponent, {
      width: '40%',
      data: {
        'mode': 1,
        'cityData': this.sharedService.getCitiesAsList(),
        'customer': customer
      }

    }).afterClosed().subscribe((response) => {
      if (!response || !response.availableAssignments || response.availableAssignments.length < 1)
        return;

      customer.enabled = response.enabled;
      customer.name = response.name;
      customer.location = response.location;
    });
  }

  openAssignNewCustomer(assignments: VisitAssignment[], customer: Customer) {
    this.matDialog.open(AssignNewCustomerDialogComponent, {
      width: '40%',
      data: {
        'assignments': assignments,
        'customer': customer,
      }
    }).afterClosed().subscribe(() => {
      this.fetchCustomerData();
    })
  }

}
