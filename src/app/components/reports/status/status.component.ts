import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ReportsService} from "../../../services/reports.service";
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit, AfterViewInit {
  formsData: any[] = [];
  displayedColumns: string[] = ['Name', 'Address', 'Date', 'Type', 'State', 'Start Time', 'End Time'];
  dataSource = new MatTableDataSource(this.formsData);
  searchInput: string = "";
  selectedEnabledOption: string = "";

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('reportsTablePaginator') paginator!: MatPaginator;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _reportsService: ReportsService
  ) {
  }

  ngOnInit(): void {
    this.fetchAllData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchAllData() {
    this._reportsService.fetchReports().subscribe({
        next: response => {
          console.log('Fetched Reports data:', response);

          this.formsData = response;

          this.dataSource.data = this.formsData;

          console.log("DATASOURCE", this.dataSource);

          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          }, 10);
        }
      }
    );
  }

  showCompleted() {
    this._reportsService.fetchCompletedForms().subscribe({
        next: data => {
          console.log('Fetched Reports data:', data);
          this.formsData = data;
          this.dataSource.data = data;
        }
      }
    );
  }


  showUnderGoing() {
    this._reportsService.fetchUndergoingForms().subscribe({
        next: data => {
          this.formsData = data;
          this.dataSource.data = data;
        }
      }
    );
  }

  showNotStarted() {
    this._reportsService.fetchNotStartedForms().subscribe(
      data => {
        this.formsData = data;
        this.dataSource.data = data;
      }
    );
  }

  protected readonly console = console;

}
