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


  graphDataPoints: [{ label: string, y: number }] = [{label: '', y: 0}];

  constructor(
    private sharedService: SharedService,
  ) {
    console.log(this.graphDataPoints);
  }


  ngOnInit(): void {
    this.rows = this.sharedService.getUserPerformanceReportsAsList();
    this.graphDataPoints.pop();

    for (const row of this.rows) {
      this.graphDataPoints.push({label: row.user.username, y: row.completedForms});
    }
    console.log(this.rows);
  }


  formatDec(num: any) {
    return (Math.round(num * 100) / 100).toFixed(2);
  }

  exportTable() {
    const excelHeaders: string[] = ["Username", "Full Name", "Total Assignments #", "Not Started Assignments #", "Undergoing Assignments #",
      "Completed Assignments #", "Total Forms #", "Not Started Forms #", "Undergoing Forms #", "Canceled Forms #", "Completed Forms #",
      "Not Started Forms %", "Undergoing Forms %", "Canceled Forms %", "Completed Forms %", "AVG. Time To Complete Forms",
      "Late Forms #"];

    let element = document.getElementById('report-bot-bar');

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
