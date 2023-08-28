import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {RegistrationService} from '../../services/registration.service';
import {Customer} from "../../models/Customer";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatDialog} from "@angular/material/dialog";
import {City} from "../../models/City";
import {CustomerDialogueComponent} from "./customer-dialogue/customer-dialogue.component";


@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit, AfterViewInit {
    page = 1;
    pageSize = 10;

    isSearchLoading = false;
    selectedEnabledOption = "Enabled"
    displayedColumns: string[] = ['name', 'city', 'addressLine', 'enabled', 'actions']
    customerData: Customer[] = [];
   originalCustomerData: Customer[] = [];
    cityData: City[] = [];
    name: String = '';
    registrationForm!: FormGroup;

    searchInput: string = "";
    dataSource = new MatTableDataSource(this.customerData);
    @ViewChild('customerTablePaginator') paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


    constructor(
        private router: Router,
        private _registrationService: RegistrationService, private fb: FormBuilder, private _liveAnnouncer: LiveAnnouncer, private matDialog: MatDialog) {
    }

    ngOnInit() {
        this.fetchCityData();
        this.fetchCustomerData();

        // this.dataSource.filterPredicate = function (customer, filter) {
        //     return customer.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) || customer.address.city.name.toLocaleLowerCase()
        //         .includes(filter.toLocaleLowerCase()) || customer.address.addressLine1.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
        // }


      this.dataSource.filterPredicate = function (customer, filter) {
        const name = customer.name ? customer.name.toLocaleLowerCase() : '';
        const cityName = customer.address && customer.address.city ? customer.address.city.name.toLocaleLowerCase() : '';
        const addressLine1 = customer.address ? customer.address.addressLine1.toLocaleLowerCase() : '';

        return name.includes(filter.toLocaleLowerCase()) ||
          cityName.includes(filter.toLocaleLowerCase()) ||
          addressLine1.includes(filter.toLocaleLowerCase());
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


    fetchCustomerData() {
        this.selectedEnabledOption = "All"
        this._registrationService.fetchCustomerData().subscribe(
            data => {
                console.log('Fetched customer data:', data);
                this.originalCustomerData = data;
                this.customerData = data;
                this.dataSource.data = this.customerData;
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


    showEnabledCustomers() {
        this.selectedEnabledOption = "Enabled";

        console.log("DDDDDD"+this.dataSource.data);
      this.dataSource.filter = '';
      this.dataSource.data = this.customerData.filter(customer => customer.enabled === true);

    }

    showDisabledCustomers() {
        this.selectedEnabledOption = "Disabled";
      this.dataSource.filter = '';
        this.dataSource.data = this.customerData.filter(customer => customer.enabled === false);

    }

    // applySearchFilter(event: Event) {
    //     if (this.searchInput === "") {
    //         this.customerData = this.originalCustomerData;
    //     } else {
    //         this.searchCustomers(this.searchInput.toLowerCase().trim());
    //         const filterValue = (event.target as HTMLInputElement).value;
    //         this.dataSource.filter = filterValue.trim()
    //     }
    // }

  applySearchFilter(event: Event) {
    this.searchCustomers(this.searchInput.toLowerCase().trim());
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.data = this.customerData; // Update the data source with the search results
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
    searchCustomers(query: string) {
        this.dataSource.filter = query.trim().toLowerCase();
        this.isSearchLoading = true;
        this._registrationService.searchCustomers(query).subscribe(
            data => {
                console.log('Data Fetched successfully:', data);

                this.customerData = data;
                this.isSearchLoading = false;
                this.dataSource = data
            },
            (error) => {
                console.error('Error fetching customer data by city:', error);
                this.isSearchLoading = false;
            }
        )
    }

    protected readonly console = console;

    fetchCityData() {
        this._registrationService.fetchCityData().subscribe(
            data => {
                console.log('Fetched city data:', data);

                this.cityData = data;
            },
            error => {
                console.error('Error fetching city data:', error);
            }
        );

    }

    openAddDialog() {
        this.matDialog.open(CustomerDialogueComponent, {
            width: '40%',
            data: {
                'mode': 0,
                'cityData': this.cityData
            }

        }).afterClosed().subscribe(() => {
            this.fetchCustomerData();

        })
    }

    openEditDialog(customer: Customer) {
        this.matDialog.open(CustomerDialogueComponent, {
            width: '40%',

            data: {
                'mode': 1,
                'cityData': this.cityData,
                'customer': customer
            }

        }).afterClosed().subscribe(
            () => {
                this.fetchCustomerData();
            });
    }


}
