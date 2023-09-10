import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {CanvasJS} from "@canvasjs/angular-charts";
import {User} from "../../../models/User";
import {MatDialog} from "@angular/material/dialog";
import {EditUserComponent} from "../edit-user/edit-user.component";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  isUserLoaded: boolean = false;
  noReportsAvailable: boolean = false;
  routeUsername!: string;

  barChartPoints: any[] = [];
  pieChartPoints: any[] = [];

  currentUser: User | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private matDialog: MatDialog,
  ) {
  }

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
    this.userService.fetchUserByUsername(username).subscribe({
        next: response => {
          this.currentUser = new User(response);
        },
        error: error => {
          console.error('Error fetching User data:', error);
        }
      }
    );
  }

  fetchUserReports(username: string) {
    this.userService.fetchUserReportsByUsername(username).subscribe({
        next: response => {
          this.isUserLoaded = true;

          if (response.percentages.length === 0) {
            this.noReportsAvailable = true;
            return;
          }
          this.barChartPoints = response.count;
          this.pieChartPoints = response.percentages;

          setTimeout(() => {
            this.renderBarChart();
            this.renderPieChart();
          }, 50);

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
      theme: "light2",
      axisY: {
        includeZero: false,
      },
      data: [{
        type: "column",
        dataPoints: this.barChartPoints,
      }]
    });

    // Render the chart
    chart.render();
  }

  renderPieChart() {
    // Create a new chart instance using CanvasJS
    let chart = new CanvasJS.Chart("pieChart", {
      animationEnabled: true,
      data: [{
        type: "doughnut",
        includeZero: false,
        indexLabel: "{name}: {y}",
        yValueFormatString: "##.##'%'",
        dataPoints: this.pieChartPoints,
      }]
    });

    // Render the chart
    chart.render();
  }

  openEditUserDialog() {
    console.log(this.currentUser);

    this.matDialog.open(EditUserComponent, {
      width: '40%',
      data: this.currentUser
    }).afterClosed().subscribe(
      response => {
        console.log("AFTER EDIT CLOSED", response);

        if (response === undefined) return;
        if (!this.currentUser) return;

        this.currentUser.firstName = response.firstName;
        this.currentUser.lastName = response.lastName;
        this.currentUser.accessLevel = response.accessLevel;
      })
  }
}
