import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {DefinitionService} from "../../../services/definition.service";
import {MatDialog} from "@angular/material/dialog";
import {Customer} from "../../../models/Customer";
import {UserService} from "../../../services/user.service";
import {CanvasJS} from "@canvasjs/angular-charts";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ReportsService} from "../../../services/reports.service";
import {User} from "../../../models/User";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, AfterViewInit {

  UserData: any[] = [];
  displayedColumns: string[] = ['Name', 'Address', 'Date', 'Type', 'State', 'Start Time', 'End Time'];
  dataSource = new MatTableDataSource(this.UserData);
  userReports: any[] = [];
  userName!: string;

  dataColChar: any[] = [];
  dataPieChart: any[] = [];

  userSpecificData!:User;

  constructor(
    private route: ActivatedRoute,
    private _userService: UserService,
    private _reportsService: ReportsService
  ) {
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('reportsTablePaginator') paginator!: MatPaginator;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const username = params['username'];
      if (username) {
        this.userName=username;
        this.fetchUserReports(username);
        this.fetchAllData();
        this.fetchuserData(username);
      }
    });


  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  renderChart() {
    // Create a new chart instance using CanvasJS
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title: {
        text: "User Status"
      },
      theme: "light2",
      exportEnabled: true,
      axisY: {
        includeZero: true,
      },
      data: [{
        type: "column",
        dataPoints: this.dataColChar,
      }]
    });

    // Render the chart
    chart.render();
  }


  fetchUserReports(username: string) {
    this._userService.getUserReports(username).subscribe({
        next: response => {
          console.log('Fetched  user Details data:', response);
          this.dataColChar = response.count;
          this.dataPieChart = response.percentages;
          this.userReports = response;
          this.renderChart();
          this.renderPieChart();
        },
        error: error => {
          console.error('Error fetching user Details data:', error);

        }
      }
    );
  }


  renderPieChart() {
    // Create a new chart instance using CanvasJS
    let chart = new CanvasJS.Chart("chartAreaContainer", {
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


  fetchAllData() {
    this._reportsService.fetchReports().subscribe(
      data => {
        console.log('Fetched Reports data:', data);
        this.UserData = data;
        this.dataSource.data = data;
      },
      error => {
        console.error('Error fetching Reports data:', error);
      }
    );
  }



  fetchuserData(username:string) {
    this._userService.getUserData(username).subscribe(
      data => {
        console.log('Fetched Reports data:', data);
        this.userSpecificData = data;

      },
      error => {
        console.error('Error fetching Reports data:', error);
      }
    );
  }


}
