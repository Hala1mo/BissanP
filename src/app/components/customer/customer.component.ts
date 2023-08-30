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

    isSearchLoading = false;
    selectedEnabledOption = "Enabled"
    displayedColumns: string[] = ['name', 'city', 'addressLine', 'enabled', 'actions']
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
            const cityName = customer.address && customer.address.cityName ? customer.address.cityName.toLocaleLowerCase() : '';
            const addressLine1 = customer.address ? customer.address.addressLine1.toLocaleLowerCase() : '';

            return name.includes(filter.toLocaleLowerCase()) ||
                cityName.includes(filter.toLocaleLowerCase()) ||
                addressLine1.includes(filter.toLocaleLowerCase());
        }

    }


    fetchCustomerData() {
        this.selectedEnabledOption = "All"
        this.customerService.fetchCustomerData().subscribe({
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
        this.selectedEnabledOption = "Enabled";
        this.dataSource.filter = '';
        this.dataSource.data = this.customerData.filter(customer => customer.enabled);
    }

    showDisabledCustomers() {
        this.selectedEnabledOption = "Disabled";
        this.dataSource.filter = '';
        this.dataSource.data = this.customerData.filter(customer => !customer.enabled);
    }

    resetFilters() {
        this.customerData = this.originalCustomerData;
        this.dataSource.data = this.customerData;
    }

    applySearchFilter(event: Event) {
        this.searchCustomers(this.searchInput.toLowerCase().trim());
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.data = this.customerData; // Update the data source with the search results
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    searchCustomers(query: string) {
        this.dataSource.filter = query.trim().toLowerCase();
        this.customerService.searchCustomers(query).subscribe({
                next: response => {
                    console.log('Data Fetched successfully:', response);
                    this.customerData = response;
                    this.dataSource = response;
                },
                error: error => {
                    console.error('Error fetching customer data by city:', error);
                }
            }
        )
    }

    openAddDialog() {
        this.matDialog.open(CustomerDialogComponent, {
            width: '40%',
            data: {
                'mode': 0,
                'cityData': this.sharedService.getCitiesAsList()
            }

        }).afterClosed().subscribe((response) => {
            if (response === undefined)
                this.fetchCustomerData();

            if (!response.availableAssignments)
                this.fetchCustomerData();

            if (response.availableAssignments.length < 1)
                return;

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
            if (response === undefined)
                return

            customer.enabled = response.enabled;
            customer.name = response.name;
            customer.address = response.address;
        });
    }

    openAssignNewCustomer(assignments: VisitAssignment[], customer: Customer) {
        this.matDialog.open(AssignNewCustomerDialogComponent, {
            width: '40%',
            data: {
                'assignments': assignments,
                'customer': customer,
            }
        })
    }

}
