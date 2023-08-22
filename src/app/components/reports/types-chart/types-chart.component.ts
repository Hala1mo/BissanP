import { Component, OnInit } from '@angular/core';
import { ReportsService } from "../../../services/reports.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import {CanvasJS} from "@canvasjs/angular-charts";


@Component({
  selector: 'app-types-chart',
  templateUrl: './types-chart.component.html',
  styleUrls: ['./types-chart.component.css']
})
export class TypesChartComponent implements OnInit {
  fetchedTypeData: any[] = [];
  fetchedAreaData: any[] = [];

  constructor(
    private _reportsService: ReportsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.fetchTypes();
    this.fetchAreas();
  }

  fetchTypes() {
    this._reportsService.fetchTypeChart().subscribe(
      data => {
        console.log('Fetched types data:', data);
        this.fetchedTypeData = data;
        this.renderChart();
      },
      error => {
        console.error('Error fetching visit types:', error);
        if (error.message) {
          let errorMessage = error.message;
          console.log('Error message:', errorMessage);
          this._snackBar.open(errorMessage, '', {
            duration: 3000
          });
        }
      }
    );
  }


  fetchAreas() {
    this._reportsService.fetchAreaChart().subscribe(
      data => {
        console.log('Fetched types data:', data);
        this.fetchedAreaData = data;
        this.renderAreaChart();
      },
      error => {
        console.error('Error fetching visit types:', error);
        if (error.message) {
          let errorMessage = error.message;
          console.log('Error message:', errorMessage);
          this._snackBar.open(errorMessage, '', {
            duration: 3000
          });
        }
      }
    );
  }

  renderChart() {
    // Create a new chart instance using CanvasJS
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title: {
        text: "Types of Visits"
      },
      data: [{
        type: "pie",
        startAngle: -90,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###.##'%'",
        dataPoints: this.fetchedTypeData,
      }]
    });

    // Render the chart
    chart.render();
  }

  renderAreaChart() {
    // Create a new chart instance using CanvasJS
    let chart = new CanvasJS.Chart("chartAreaContainer", {
      animationEnabled: true,
      title: {
        text: "Areas"
      },
      data: [{
        type: "pie",
        startAngle: -90,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###.##'%'",
        dataPoints: this.fetchedAreaData,
      }]
    });

    // Render the chart
    chart.render();
  }
}
