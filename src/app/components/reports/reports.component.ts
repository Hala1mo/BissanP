import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {formatDate} from "@angular/common";
import {FormControl} from "@angular/forms";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit{
    Date: any[] = [];
  cusData:any[]=[];
    uniqueDates: string[] = [];
  fromDate: Date | null = null;
  toDate: Date | null = null;
  myControl = new FormControl();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('reportsTablePaginator') paginator!: MatPaginator;
  constructor(    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private _reportsService: ReportsService
  ) {}

  ngOnInit(): void {
    // this.fetchAllData();
    this.fetchDate();
    this.fetchCustomer();

  }


    fetchDate() {
        this._reportsService.getDate().subscribe(
            data => {
                console.log('Fetched assignments data:', data);

                this.Date = data;

            },
            error => {
                console.error('Error fetching assignments data:', error);
            }
        );

    }


  fetchCustomer() {
    this._reportsService.getCustomers().subscribe(
      data => {
        console.log('Fetched assignments data:', data);

        this.cusData = data;

      },
      error => {
        console.error('Error fetching assignments data:', error);
      }
    );

  }

  protected readonly console = console;
  onTypeSelect() {
    if (this.fromDate && this.toDate) {
      const fromDateString = formatDate(this.fromDate, 'yyyy-MM-dd', 'en');
      const toDateString = formatDate(this.toDate, 'yyyy-MM-dd', 'en');

      console.log('From Date:', fromDateString);
      console.log('To Date:', toDateString);

      this.router.navigate(['/reports', fromDateString, toDateString]);
    }
  }
  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    console.log("Selected option:", event.option.value);
    if (event.option.value && event.option.value.name) {
      console.log("Selected name:", event.option.value.name);
      console.log("Selected id:", event.option.value.uuid);
      this.router.navigate(['/reports', event.option.value.uuid]);
    } else {
      console.error("Invalid option or name");
    }
  }

}
