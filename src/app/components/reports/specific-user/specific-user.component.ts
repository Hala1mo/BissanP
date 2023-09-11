import { Component } from '@angular/core';
import {SharedService} from "../../../services/shared.service";
import * as XLSX from "xlsx";

@Component({
  selector: 'app-specific-user',
  templateUrl: './specific-user.component.html',
  styleUrls: ['./specific-user.component.css']
})
export class SpecificUserComponent {

  report: any;
  fileName = 'ExcelSheet.xlsx';
  name:string="";

  constructor(
    private sharedService: SharedService,
  ) {
  }

  ngOnInit(): void {
    this.report = this.sharedService.getUserDetailedReportsAsList();
  }


  exportTable() {
   // Get references to the two tables by their IDs
    let element1 = document.getElementById('report-table');
    let element2 = document.getElementById('report2-table');

    // Convert each table to worksheets
    const ws1: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element1);
    const ws2: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element2);

    // Create a new workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    // Append the worksheets to the workbook with respective sheet names
    XLSX.utils.book_append_sheet(wb, ws1, 'User Performance');
    XLSX.utils.book_append_sheet(wb, ws2, 'User Interactions');

    /* Save to file */
    XLSX.writeFile(wb, this.fileName);

  }

  formatDec(num: any) {
    return (Math.round(num * 100) / 100).toFixed(2);
  }

}
