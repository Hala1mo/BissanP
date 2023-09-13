import {Component, OnInit} from '@angular/core';
import {SharedService} from "../../../services/shared.service";
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


  graphDataPoints1: { label: string, y: number }[] = [{label: '', y: 0}];
  graphDataPoints2: { label: string, y: number }[] = [{label: '', y: 0}];
  displayedColumns = [
    'username', 'totA', 'nstA', 'undA', 'comA',
    'totF', 'nstF', 'undF', 'cnlF', 'comF',
    'nstFP', 'undFP', 'cnlFP', 'comFP',
    'avgT', 'lateF'
  ];

  constructor(
    private sharedService: SharedService,
  ) {
  }

  ngOnInit(): void {
    this.rows = this.sharedService.getUserPerformanceReportsAsList();
    this.graphDataPoints1.pop();
    this.graphDataPoints2.pop();

    for (const row of this.rows) {
      this.graphDataPoints1.push({label: row.user.username, y: row.completedForms});
      this.graphDataPoints2.push({label: row.user.username, y: row.completedAssignments});
    }
    this.renderChart(); // Call the renderChart method
  }

  formatDec(num: any) {
    return (Math.round(num * 100) / 100).toFixed(2);
  }

  formatTime(seconds: number) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  }

  exportTable() {
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
