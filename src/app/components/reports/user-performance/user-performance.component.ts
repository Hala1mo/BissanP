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

  constructor(
    private sharedService: SharedService,
  ) {
  }

  ngOnInit(): void {
    this.rows = this.sharedService.getUserPerformanceReportsAsList();
  }


  formatDec(num: any) {
    return (Math.round(num * 100) / 100).toFixed(2);
  }

  exportTable() {
    const excelHeaders: string[] = ["Username", "Full Name", "Total Assignments #", "Not Started Assignments #", "Undergoing Assignments #",
    "Completed Assignments #", "Total Forms #", "Not Started Forms #", "Undergoing Forms #", "Canceled Forms #", "Completed Forms #",
    "Not Started Forms %", "Undergoing Forms %", "Canceled Forms %", "Completed Forms %", "AVG. Time To Complete Forms",
    "Late Forms #"];

    const templateToExcel: string[][] = [excelHeaders, []];
    let element = document.getElementById('report-table');

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
