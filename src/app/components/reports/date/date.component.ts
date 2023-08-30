import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {CusComponent} from "./cus/cus.component";
import {MatDialog} from "@angular/material/dialog";
import {SharedService} from "../../../services/shared.service";


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
      private matDialog: MatDialog,
      private sharedService: SharedService
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

    console.log('ON INIT');
    console.log(this.paginator);
    console.log(this.sort);
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
