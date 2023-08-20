import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {Definiton} from "../../models/definiton";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit{
    Date: any[] = [];
    uniqueDates: string[] = [];


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('reportsTablePaginator') paginator!: MatPaginator;
  constructor(    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private _reportsService: ReportsService
  ) {}

  ngOnInit(): void {
    // this.fetchAllData();
    this.fetchDate();

  }

  // fetchAllData() {
  //   this._reportsService.fetchReports().subscribe(
  //     data => {
  //       console.log('Fetched Reports data:', data);
  //       this.Data = data;
  //       this.dataSource.data = data;
  //     },
  //     error => {
  //       console.error('Error fetching Reports data:', error);
  //     }
  //   );
  // }

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

  protected readonly console = console;

    onTypeSelect(from: any,to:any) {

        this.router.navigate(['/reports',from,to]);
    }

    // getUniqueDates(): string[] {
    //     const dateSet = new Set<string>(); // Using a set to ensure uniqueness
    //
    //     for (const item of this.Date) {
    //         if (item.date) {
    //             dateSet.add(item.date);
    //         }
    //     }
    //
    //     const sortedDates = Array.from(dateSet).sort();
    //     return sortedDates;
    // }



}
