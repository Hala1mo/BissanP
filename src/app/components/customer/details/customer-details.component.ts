import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router'; // Import ActivatedRoute
import {RegistrationService} from '../../../services/registration.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../../../models/Customer';
import {DefinitionService} from "../../../services/definition.service";
import {nameValidator, telValidator} from "../../../shared/Name.validators";
import {ContactDialogueComponent} from "./contact-dialogue/contact-dialogue.component";
import {MatDialog} from "@angular/material/dialog";
import {Contact} from "../../../models/Contact";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {ReportsService} from "../../../services/reports.service";
import {CanvasJS} from "@canvasjs/angular-charts";
import {CustomerDialogComponent} from "../customer-dialog/customer-dialog.component";
import {SharedService} from "../../../services/shared.service";

@Component({
    selector: 'app-details',
    templateUrl: './customer-details.component.html',
    styleUrls: ['./customer-details.component.css'],
})

export class CustomerDetailsComponent implements OnInit {
    customerLoaded: boolean = false;
    currentCustomer: Customer | null = null;

    customerId: bigint = BigInt(0);
    contactsData: Contact[] = [];

    displayedColumns: string[] = ['name', 'email', 'phoneNumber', 'enabled', 'actions']
    contactDataSource = new MatTableDataSource(this.contactsData);
    @ViewChild('customerTablePaginator') paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    dataColChar: any[] = [];
    dataPieChart: any[] = [];
    dataPieChart2: any[] = [];

    dataReport: any[] = [];
    dataSource2 = new MatTableDataSource(this.dataReport);
    displayedColumns2: string[] = ['Date', 'userName', 'FullName', 'Type'];
    @ViewChild(MatSort) sort2!: MatSort;
    @ViewChild('reportsTablePaginator') paginator2!: MatPaginator;

    constructor(
        private route: ActivatedRoute,
        private definitionService: DefinitionService,
        private sharedService: SharedService,
        private reportsService: ReportsService,
        private customerService: RegistrationService,
        private matDialog: MatDialog,
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            const id = params['id'];
            if (id) {
                this.customerId = id;
                this.fetchCustomerDetails(id);
                this.fetchCustomerReports(id);
            }
        });
    }


    fetchCustomerDetails(id: bigint) {
        this.customerService.fetchCustomerDetails(id).subscribe({
                next: response => {
                    this.customerLoaded = true;
                    this.currentCustomer = new Customer(response);

                    this.contactsData = this.currentCustomer.contacts;
                    this.contactDataSource.data = this.contactsData;

                    setTimeout(() => {
                        this.contactDataSource.sort = this.sort;
                        this.contactDataSource.paginator = this.paginator;
                    }, 10);
                },
                error: error => {
                    console.error('Error fetching customer data:', error);
                }
            }
        );
    }

    fetchCustomerReports(id: any) {
        this.reportsService.fetchCustomersReports(id).subscribe({
                next: response => {
                    console.log("RESPONSE", response)
                    this.dataColChar = response.count;
                    this.dataPieChart = response.percentages;
                    this.dataReport = response.details;

                    this.dataSource2.data = this.dataReport;

                    this.renderChart();
                    this.renderPieChart();
                    this.renderPieChart2();

                },
                error: error => {
                    console.error('Error fetching VisitAssignment data:', error);
                }
            }
        );
    }

    updateEnabled(contact: Contact) {
        contact.enabled = !contact.enabled;
        this.customerService.updateEnabledStatusContact(contact.id).subscribe(
            (res: any) => {
                console.log('Enabled status updated successfully:', res);
                this.fetchCustomerDetails(this.customerId);
            },
            (error) => {
                console.error('Error updating enabled status:', error);
            }
        );
    }

    openCreateContactDialog() {
        this.matDialog.open(ContactDialogueComponent, {
            data: {
                'mode': 0,
                'typesData': this.sharedService.getVisitTypesAsList(),
                'customerId': this.customerId
            }
        }).afterClosed().subscribe(
            response => {
                this.fetchCustomerDetails(this.customerId);
            });
    }

    openEditContactDialog(contact: Contact) {
        this.matDialog.open(ContactDialogueComponent, {
            width: '40%',

            data: {
                'mode': 1,
                'typesData': this.sharedService.getVisitTypesAsList(),
                'contact': contact,
                'customerId': this.customerId
            }

        }).afterClosed().subscribe(
            response => {
                this.fetchCustomerDetails(this.customerId);
            });
    }

    openEditCustomerDialog() {
        this.matDialog.open(CustomerDialogComponent, {
            width: '40%',
            data: {
                'mode': 1,
                'cityData': this.sharedService.getCitiesAsList(),
                'customer': this.currentCustomer
            }

        }).afterClosed().subscribe((response) => {
            if (response === undefined)
                return

            if (!this.currentCustomer)
                return;

            this.currentCustomer.enabled = response.enabled;
            this.currentCustomer.name = response.name;
            this.currentCustomer.address = response.address;
        });
    }


    renderChart() {
        // Create a new chart instance using CanvasJS
        let chart = new CanvasJS.Chart("chartContainer2", {
            animationEnabled: true,
            title: {
                text: "Forms Status"
            },
            theme: "light2",
            exportEnabled: true,
            axisY: {
                includeZero: true,
            },
            data: [{
                type: "column",
                dataPoints: this.dataColChar,
            }]
        });

        // Render the chart
        chart.render();
    }

    renderPieChart2() {
        // Create a new chart instance using CanvasJS
        let chart = new CanvasJS.Chart("chartAreaContainer2", {
            animationEnabled: true,
            title: {
                text: "Types"
            },
            data: [{
                type: "doughnut",
                indexLabel: "{name}: {y}",
                yValueFormatString: "##.##'%'",
                dataPoints: this.dataPieChart2,
            }]
        });
        // Render the chart
        chart.render();
        console.log("RENDERED CHART 2");
    }

    renderPieChart() {
        // Create a new chart instance using CanvasJS
        let chart = new CanvasJS.Chart("chartAreaContainer", {
            animationEnabled: true,
            title: {
                text: "status"
            },
            data: [{
                type: "doughnut",
                indexLabel: "{name}: {y}",
                yValueFormatString: "##.##'%'",
                dataPoints: this.dataPieChart,
            }]
        });

        // Render the chart
        chart.render();
        console.log("RENDERED CHART 1");
    }

}
