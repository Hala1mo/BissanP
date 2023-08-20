import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ReportsService} from "../../../services/reports.service";
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {MatPaginator} from "@angular/material/paginator";
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent  implements OnInit, AfterViewInit {
  Data: any[] = [];
  originalData: any[] = [];
  displayedColumns: string[] = ['Name', 'Address', 'Date', 'Type', 'State', 'Start Time', 'End Time'];
  dataSource = new MatTableDataSource(this.Data);
  searchInput: string = "";
  isSearchLoading = false;
  selectedEnabledOption: string = "";


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('reportsTablePaginator') paginator!: MatPaginator;
  constructor(
      private _liveAnnouncer: LiveAnnouncer,
      private _reportsService: ReportsService
  ) {}

  ngOnInit(): void {
    this.fetchAllData();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchAllData() {
    this._reportsService.fetchReports().subscribe(
        data => {
          console.log('Fetched Reports data:', data);
          this.Data = data;
          this.dataSource.data = data;
        },
        error => {
          console.error('Error fetching Reports data:', error);
        }
    );
  }

  showCompleted() {
    this._reportsService.Completed().subscribe(
        data => {
          console.log('Fetched Reports data:', data);
          this.Data = data;
          this.dataSource.data = data;
        },
        error => {
          console.error('Error fetching Reports data:', error);
        }
    );
  }


  showunderGoing() {
    this._reportsService.underGoing().subscribe(
        data => {
          console.log('Fetched Reports data:', data);
          this.Data = data;
          this.dataSource.data = data;
        },
        error => {
          console.error('Error fetching Reports data:', error);
        }
    );
  }

  shownotStarted() {
    this._reportsService.notStarted().subscribe(
        data => {
          console.log('Fetched Reports data:', data);
          this.Data = data;
          this.dataSource.data = data;
        },
        error => {
          console.error('Error fetching Reports data:', error);
        }
    );
  }



  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
    console.log(this.dataSource.sort?.active);
  }


  protected readonly console = console;

}
