import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportsService } from '../../../services/reports.service';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit,AfterViewInit {
  Data: any[] = [];
  from!: string;
  to!:string;
  displayedColumns: string[] = ['Date', 'userName', 'FullName', 'Comment'];
  dataSource = new MatTableDataSource(this.Data);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('reportsTablePaginator') paginator!: MatPaginator;
  constructor(
      private route: ActivatedRoute,
      private _reportsService: ReportsService,
      private _liveAnnouncer: LiveAnnouncer,
  ) {}

  ngOnInit() {

    this.route.params.subscribe((params) => {
      this.from = params['from'];
      this.to=params['to'];
      if (this.from) {

        console.log(this.from);
        this.fetchData(this.from,this.to);
      }
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchData(from: string,to:string) {
    console.log(from);
    this._reportsService.fetchDateData(from,to).subscribe(
        (data) => {
          console.log('Fetched Date data:', data);
          this.Data = data;
          this.dataSource=data;
        },
        (error) => {
          console.error('Error fetching Date data:', error);
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