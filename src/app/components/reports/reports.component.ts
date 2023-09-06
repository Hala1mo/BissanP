import {Component, OnInit, ViewChild} from '@angular/core';
import {ReportsService} from '../../services/reports.service';
import {MatSort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {formatDate} from "@angular/common";
import {FormControl} from "@angular/forms";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  Date: any[] = [];
  DateData: any[] = [];
  cusData: any[] = [];

  isDateDataEmpty: boolean = false;

  fromDate: Date | null = null;
  toDate: Date | null = null;

  userFromDate: any;
  userToDate: any;
  myControl = new FormControl();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('reportsTablePaginator') paginator!: MatPaginator;

  constructor(private router: Router,
              private _liveAnnouncer: LiveAnnouncer,
              private _reportsService: ReportsService,
              private sharedService: SharedService
  ) {
  }

  ngOnInit(): void {
    // this.fetchAllData();
    this.fetchDate();
  }

  fetchDate() {
    this._reportsService.fetchAssignmentsByDate().subscribe(
      data => {
        console.log('Fetched assignments data:', data);

        this.Date = data;
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
      this.fetchDateData(fromDateString, toDateString);
    }
  }


  fetchDateData(from: string, to: string) {
    this._reportsService.fetchAssignmentByDateBetween(from, to).subscribe(
      (data) => {
        console.log('Fetched Date data:', data);
        this.DateData = data;

        if (this.DateData.length === 0) {
          this.isDateDataEmpty = true;
        } else {
          this.isDateDataEmpty = false;
          // this.router.navigate(['/reports', fromDateString, toDateString]);
          this.sharedService.updateDateData(this.DateData);
          this.router.navigate(['/reports/date']);
        }
      },
      (error) => {
        console.error('Error fetching Date data:', error);
      }
    );
  }

  generateUserPerformanceReport() {
    const fromDateString = formatDate(this.userFromDate, 'yyyy-MM-dd', 'en');
    const toDateString = formatDate(this.userToDate, 'yyyy-MM-dd', 'en');

    this._reportsService.generateUserReports(fromDateString, toDateString).subscribe({
      next: response => {
        this.sharedService.setUserPerformanceReports(response);
        this.router.navigate(['/reports/user-performance'])
      },
      error: error => {

      }
    })
  }
}
