import { Component, OnInit } from '@angular/core';
import { SharedService } from "../../../services/shared.service";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-user-performance',
  templateUrl: './user-performance.component.html',
  styleUrls: ['./user-performance.component.css']
})
export class UserPerformanceComponent implements OnInit {

  rows: any[] = [];
  fileName = 'ExcelSheet.xlsx';
  chartOptions: any;



  graphDataPoints1: { label: string, y: number }[] = [{ label: '', y: 0 }];
  graphDataPoints2: { label: string, y: number }[] = [{ label: '', y: 0 }];

  constructor(
    private sharedService: SharedService,
  ) {
  }

  ngOnInit(): void {
    this.rows = this.sharedService.getUserPerformanceReportsAsList();
    this.graphDataPoints1.pop();
    this.graphDataPoints2.pop();

    for (const row of this.rows) {
      this.graphDataPoints1.push({ label: row.user.username, y: row.completedForms });
      this.graphDataPoints2.push({ label: row.user.username, y: row.completedAssignments });
    }
    console.log(this.rows);
    this.renderChart(); // Call the renderChart method
  }

  formatDec(num: any) {
    return (Math.round(num * 100) / 100).toFixed(2);
  }

  exportTable() {
    const excelHeaders: string[] = ["Username", "Full Name", "Total Assignments #", "Not Started Assignments #", "Undergoing Assignments #",
      "Completed Assignments #", "Total Forms #", "Not Started Forms #", "Undergoing Forms #", "Canceled Forms #", "Completed Forms #",
      "Not Started Forms %", "Undergoing Forms %", "Canceled Forms %", "Completed Forms %", "AVG. Time To Complete Forms",
      "Late Forms #"];

    let element = document.getElementById('report-table');

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  renderChart() {
    this.chartOptions = { // Use 'this' to access class properties
      animationEnabled: true,
      title: {
        text: ""
      },
      axisX: {
        title: "User"
      },

      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer",
        itemclick: function (e: any) {
          if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          } else {
            e.dataSeries.visible = true;
          }
          e.chart.render();
        }
      },
      data: [{
        type: "column",
        name: "Completed Forms",
        legendText: "Completed Forms",
        showInLegend: true,
        dataPoints: this.graphDataPoints1, // Use 'this' to access class properties
      }, {
        type: "column",
        name: "Completed Assignments",
        legendText: "Completed Assignments",
        axisYType: "secondary",
        showInLegend: true,
        dataPoints: this.graphDataPoints2, // Use 'this' to access class properties
      }]
    }
  }
}
