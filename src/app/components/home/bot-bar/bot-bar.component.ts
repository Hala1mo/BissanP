import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DashboardService} from "../../../services/dashboard.service";

@Component({
  selector: 'app-bot-bar',
  templateUrl: './bot-bar.component.html',
  styleUrls: ['./bot-bar.component.css']
})
export class BotBarComponent implements OnInit {
  isLoaded: boolean = true;

  private passwordRequestsData: any[] = [];

  displayedColumns: string[] = ['username', 'date', 'actions']
  dataSource = new MatTableDataSource(this.passwordRequestsData);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dashService: DashboardService) {
  }

  ngOnInit(): void {
    this.dashService.fetchTables().subscribe({
      next: response => {
        this.isLoaded = true;
        console.log(response);
        this.passwordRequestsData = response;
        this.dataSource.data = this.passwordRequestsData;

        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }, 50);

      },
      error: error => {
        console.error(error)
      }

    })
  }


  acceptPasswordReset(requestId: bigint) {
    console.log("ACCEPTING REQUEST " + requestId)

    this.dashService.acceptPasswordResetRequest(requestId).subscribe({
      next: response => {

      },
      error: error => {

      }
    });
  }

  rejectPasswordReset(requestId: bigint) {
    console.log("REJECTING REQUEST " + requestId)

    this.dashService.rejectPasswordResetRequest(requestId).subscribe({
      next: response => {

      },
      error: error => {

      }
    });


  }
}
