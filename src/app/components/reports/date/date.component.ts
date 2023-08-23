import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportsService } from '../../../services/reports.service';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {User} from "../../../models/User";
import {CusComponent} from "./cus/cus.component";
import {MatDialog} from "@angular/material/dialog";
import {SharedServiceService} from "../../../services/shared-service.service";


@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit,AfterViewInit {
   DateData:any[]=[] ;

  displayedColumns: string[] = ['Date', 'userName', 'FullName', 'Comment','Customer'];
  dataSource = new MatTableDataSource(this.DateData);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('reportsTablePaginator') paginator!: MatPaginator;
  constructor(
      private route: ActivatedRoute,
      private _reportsService: ReportsService,
      private _liveAnnouncer: LiveAnnouncer,
      private matDialog: MatDialog,
      private sharedService: SharedServiceService
  ) {}

  ngOnInit() {

    this.sharedService.dateData$.subscribe((data) => {
      this.DateData = data;
      this.dataSource.data = this.DateData;
    });

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // fetchData(from: string,to:string) {
  //   console.log(from);
  //   this._reportsService.fetchDateData(from,to).subscribe(
  //       (data) => {
  //         console.log('Fetched Date data:', data);
  //         this.Data = data;
  //         this.dataSource.data=data;
  //
  //       },
  //       (error) => {
  //         console.error('Error fetching Date data:', error);
  //       }
  //   );
  // }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
    console.log(this.dataSource.sort?.active);
  }

  protected readonly console = console;


  openDialog(customer: any[]) {
    this.matDialog.open(CusComponent, {
      width: '50%',
      data: customer

    }).afterClosed().subscribe(
      response => {
        if (response === undefined) return;
      })
  }
}
