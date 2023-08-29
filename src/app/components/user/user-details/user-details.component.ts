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
  routeUsername!: string;

  barChartPoints: any[] = [];
  pieChartPoints: any[] = [];

  currentUser: User | undefined;

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
    this.userService.getUserData(username).subscribe({
        next: response => {
          this.currentUser = response;
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
          this.isUserLoaded = true;

          console.log(response);

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
