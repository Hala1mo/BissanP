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
import {City} from "../../models/City";
import {Location} from "../../models/Location";


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {
  isTableLoaded: boolean = false;

  selectedEnabledOption = "";
  selectedCityOption = "";
  selectedLocationOption = "";

  cities: City[] = [];
  selectedCity: City | null = null;
  selectedCityLocations: Location[] | any = [];


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
    this.cities = this.sharedService.getCitiesAsList();
    if (this.cities.length < 1) {
      this.sharedService.fetchCities().subscribe({
        next: value => {
          this.cities = value;
        }
      });
    }

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
          }, 10);
        }
      }
    );
  }

  openCustomerDetails(id: bigint) {
    void this.router.navigate(['/customers', id]);
  }

  updateEnabled(customer: Customer) {
    customer.enabled = !customer.enabled;
    this.customerService.updateEnabledStatusCustomer(customer.id).subscribe({
        next: response => {
          customer.enabled = response.enabled;
        },
        error: () => {
          customer.enabled = !customer.enabled;
        }
      }
    );
  }

  resetFilters() {
    this.searchInput = "";
    this.selectedEnabledOption = "";
    this.selectedCityOption = "";
    this.selectedLocationOption = "";
    this.selectedCity = null;

    this.customerData = this.originalCustomerData;
    this.dataSource.data = this.customerData;
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

  searchCustomers() {
    let name = this.searchInput || undefined;
    let enabled = this.selectedEnabledOption || undefined;
    let city = this.selectedCityOption || undefined;
    let location = this.selectedLocationOption || undefined;

    if (!city) {
      this.selectedCity = null;
      this.selectedLocationOption = '';
      location = undefined;
    }
    if (!name && !enabled && !city && !location)
      this.resetFilters();

    this.customerService.searchCustomers(name, enabled, city, location).subscribe({
      next: value => {
        this.customerData = value;
        this.dataSource.data = this.customerData;
      }
    })
  }

  changeSelectedCity(city: City) {
    this.selectedCity = city;
    this.selectedCityLocations = [...this.selectedCity.locations];
  }
}
