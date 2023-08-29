import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {CanvasJS} from "@canvasjs/angular-charts";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ReportsService} from "../../../services/reports.service";
import {User} from "../../../models/User";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {MatDialog} from "@angular/material/dialog";
import {EditUserComponent} from "../edit-user/edit-user.component";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  isUserLoaded: boolean = false;

  userForms: any[] = [];
  displayedColumns: string[] = ['Name', 'Address', 'Date', 'Type', 'State', 'Start Time', 'End Time'];

  dataSource = new MatTableDataSource(this.userForms);
  userReports: any[] = [];
  routeUsername!: string;

  dataColChar: any[] = [];
  dataPieChart: any[] = [];

  currentUser: User | undefined;


  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private matDialog: MatDialog,
  ) {
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('reportsTablePaginator') paginator!: MatPaginator;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const username = params['username'];
      if (username) {
        this.routeUsername = username;
        this.fetchUser(username);

        this.fetchUserReports(username);
      }
    });
  }

  fetchUser(username: string) {
    this.userService.getUserData(username).subscribe({
        next: response => {
          this.isUserLoaded = true;
          this.currentUser = response;
          console.log(response)

          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          })
        },
        error: error => {
          console.error('Error fetching User data:', error);
        }
      }
    );
  }

  fetchUserReports(username: string) {
    this.userService.getUserReports(username).subscribe({
        next: response => {
          console.log('Fetched  user Details data:', response);
          this.userReports = response;
          this.dataColChar = response.count;
          this.dataPieChart = response.percentages;

          this.renderBarChart();
          this.renderPieChart();
        },
        error: error => {
          console.error('Error fetching user Details data:', error);
        }
      }
    );
  }


  renderBarChart() {
    // Create a new chart instance using CanvasJS
    const chart = new CanvasJS.Chart("barChart", {
      animationEnabled: true,
      title: {
        text: "Forms Status"
      },
      theme: "light2",
      axisY: {
        includeZero: false,
      },
      data: [{
        type: "column",
        dataPoints: this.dataColChar,
      }]
    });

    // Render the chart
    chart.render();
  }

  renderPieChart() {
    // Create a new chart instance using CanvasJS
    let chart = new CanvasJS.Chart("pieChart", {
      animationEnabled: true,
      title: {
        text: "status"
      },
      data: [{
        type: "doughnut",
        // startAngle: -90,
        indexLabel: "{name}: {y}",
        yValueFormatString: "##.##'%'",
        dataPoints: this.dataPieChart,
      }]
    });

    // Render the chart
    chart.render();
  }


  tabChanged($event: MatTabChangeEvent) {
    if ($event.index === 1) {
      this.fetchUserReports(this.routeUsername);
    }
  }

  openEditDialog() {
    this.matDialog.open(EditUserComponent, {
      width: '40%',
      data: this.currentUser
    }).afterClosed().subscribe(
      response => {
        if (response === undefined) return;
        if (this.currentUser === undefined) return;

        if (response.firstName && response.lastName && response.accessLevel) {
          this.currentUser.firstName = response.firstName;
          this.currentUser.lastName = response.lastName;
          this.currentUser.accessLevel = response.accessLevel;
        }
      })
  }
}
