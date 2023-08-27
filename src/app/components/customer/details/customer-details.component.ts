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

@Component({
  selector: 'app-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit, AfterViewInit {
  customerDetails: Customer | null = null;
  registrationForm!: FormGroup;
  TypesData: any[] = [];
  types: any[] = [];
  customerId!: bigint;
  contactsData!: Contact[];

  displayedColumns: string[] = ['firstName','lastName', 'email', 'phoneNumber', 'enabled', 'actions']
  dataSource = new MatTableDataSource(this.contactsData);
  @ViewChild('customerTablePaginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataColChar: any[] = [];
  dataPieChart: any[] = [];
  dataPieChart2: any[] = [];
  private dataReport: any[]=[] ;
  dataSource2 = new MatTableDataSource(this.dataReport);
  displayedColumns2: string[] = ['Date', 'userName', 'FullName', 'Type'];
  @ViewChild(MatSort) sort2!: MatSort;
  @ViewChild('reportsTablePaginator') paginator2!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private VisitServices: DefinitionService,
    private reportsService:ReportsService,
    private _registrationService: RegistrationService,
    private matDialog: MatDialog,
    private fb: FormBuilder
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
      this.fetchvisitTypes();
    });
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, nameValidator]],
      lastName: ['', [Validators.required, nameValidator]],
      phoneNumber: ['', [Validators.required, telValidator]],
      email: ['', [Validators.required, Validators.email]],
      Types: this.fb.group({
        id: ['']
      }),
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


    this.dataSource.paginator = this.paginator2;
    this.dataSource.sort = this.sort2;
  }




  fetchCustomerDetails(id: bigint) {
    this._registrationService.fetchCustomerDetails(id).subscribe({
        next: response => {
          console.log('Fetched details data:', response);
          this.customerDetails = new Customer(response);

          this.contactsData = this.customerDetails.contacts;

          console.log("customerDetails", this.customerDetails);

          this.dataSource.data = this.contactsData;

          console.log("DATASOURCE", this.dataSource);

          setTimeout( () => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }, 10);
        },
        error: error => {
          console.error('Error fetching customer data:', error);

        }

      }
    );
  }

  updateEnabled(contact: Contact) {
    contact.enabled = contact.enabled == true ? false : true;
    this._registrationService.updateEnabledStatusContact(contact.id).subscribe(
      (res: any) => {
        console.log('Enabled status updated successfully:', res);

        this.fetchCustomerDetails(this.customerId);

      },
      (error) => {
        console.error('Error updating enabled status:', error);

      }
    );
  }

  fetchvisitTypes() {
    this.VisitServices.fetchTypesData().subscribe(
      (data) => {
        console.log('Fetched types data:', data);
        this.TypesData = data;
      },
      (error) => {
        console.error('Error fetching types data:', error);
      }
    );
  }

  formatDateString(timeString: string) {
    const date = new Date(timeString);

    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  }


  openCreateContactDialog() {
    this.matDialog.open(ContactDialogueComponent, {
      data: {
        'mode': 0,
        'typesData': this.TypesData,
        'customerId': this.customerId
      }
    }).afterClosed().subscribe(
      response => {
        this.fetchCustomerDetails(this.customerId);
      });
  }

  openEditDialog(contact: Contact) {
    this.matDialog.open(ContactDialogueComponent, {
      width: '40%',

      data: {
        'mode': 1,
        'typesData': this.TypesData,
        'contact': contact,
        'customerId': this.customerId
      }

    }).afterClosed().subscribe(
      response => {
        this.fetchCustomerDetails(this.customerId);
      });
  }


  fetchCustomerReports(id: any) {
    this.reportsService.fetchCustomersReports(id).subscribe({
        next: response => {
          console.log('Fetched customer Reports data:', response);

          this.dataColChar = response.count;
          console.log(this.dataColChar);
          this.dataPieChart = response.percentages;

          this.dataReport = response.details;
          console.log("kmdfkmdf",this.dataReport);
          this.dataSource2.data=this.dataReport ;
          console.log("gdgdgdg",this.dataSource2.data);

          this.dataPieChart2 = response.percentagesForType;


          console.log(this.dataPieChart);

        },
        error: error => {
          console.error('Error fetching VisitAssignment data:', error);

        }
      }
    );
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
        // startAngle: -90,
        indexLabel: "{name}: {y}",
        yValueFormatString: "##.##'%'",
        dataPoints: this.dataPieChart2,
      }]
    });

    // Render the chart
    chart.render();
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
        // startAngle: -90,
        indexLabel: "{name}: {y}",
        yValueFormatString: "##.##'%'",
        dataPoints: this.dataPieChart,
      }]
    });

    // Render the chart
    chart.render();
  }
  tabChanged($event: MatTabChangeEvent) {
    this.renderChart();
    this.renderPieChart();
    this.renderPieChart2();
  }
}
