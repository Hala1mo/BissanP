import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute} from "@angular/router";
import {ReportsService} from "../../../services/reports.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";


@Component({
  selector: 'app-filter-cus',
  templateUrl: './filter-cus.component.html',
  styleUrls: ['./filter-cus.component.css']
})
export class FilterCusComponent implements OnInit,AfterViewInit{
  Data: any[] = [];
  searchInput!: string ;
  from!: string;
  to!:string;
  displayedColumns: string[] = ['Date', 'userName', 'FullName', 'Type'];
  dataSource = new MatTableDataSource(this.Data);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('reportsTablePaginator') paginator!: MatPaginator;
id!:bigint;

  constructor(
    private route: ActivatedRoute,
    private _reportsService: ReportsService,
    private _liveAnnouncer: LiveAnnouncer,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id= params['id'];
      {
        this.fetchData(this.id);
      }
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchData(id:bigint) {
    this._reportsService.getCustomerDate(id).subscribe(
      (data) => {
        console.log('Fetched customer data:', data);
        this.Data = data;
        this.dataSource.data=data;
      },
      (error) => {
        console.error('Error fetching customer data:', error);
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
