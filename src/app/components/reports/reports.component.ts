import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, AfterViewInit {
  Data: any[] = [];
  displayedColumns: string[] = ['Name', 'Address', 'Date', 'Type', 'State', 'Start Time', 'End Time'];
  dataSource = new MatTableDataSource(this.Data);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _reportsService: ReportsService
  ) {}

  ngOnInit(): void {
    this.fetchAllData();
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  fetchAllData() {
    this._reportsService.fetchReports().subscribe(
      data => {
        console.log('Fetched Reports data:', data);
        this.Data = data;
        this.dataSource.data = this.Data;
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
  }
}
