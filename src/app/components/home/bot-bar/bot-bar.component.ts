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
        this.passwordRequestsData = response;
        this.dataSource.data = this.passwordRequestsData;

        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }, 50);
      }

    })
  }


  acceptPasswordReset(requestId: bigint) {
    this.dashService.acceptPasswordResetRequest(requestId).subscribe({
      next: () => {
        this.dashService.fetchTables().subscribe({
          next: response => {
            this.passwordRequestsData = response;
            this.dataSource.data = this.passwordRequestsData;
          }
        })
      }
    });
  }

  rejectPasswordReset(requestId: bigint) {
    this.dashService.rejectPasswordResetRequest(requestId).subscribe({
      next: () => {
            this.dashService.fetchTables().subscribe({
              next: response => {
                this.passwordRequestsData = response;
                this.dataSource.data = this.passwordRequestsData;
              }
            })
      }
    });


  }
}
