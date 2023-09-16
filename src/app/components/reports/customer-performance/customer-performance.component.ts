import {Component, OnInit} from '@angular/core';
import { SharedService } from "../../../services/shared.service";
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-customer-performance',
  templateUrl: './customer-performance.component.html',
  styleUrls: ['./customer-performance.component.css']
})
export class CustomerPerformanceComponent implements OnInit {

  rows: any[] = [];
  fileName = 'ExcelSheet.xlsx';

  displayedColumns: string[] = ['name','totForms','nstForms','undForms','canForms','compForms','nstFormPer','undFormPer','canFormPer',
    'compFormPer','avg','late'];

  constructor(
    private sharedService: SharedService,
  ) {
  }

  ngOnInit(): void {
    this.rows = this.sharedService.getCustomerPerformanceReportsAsList();
    console.log(this.rows);

  }

  formatDec(num: any) {
    return (Math.round(num * 100) / 100).toFixed(2);
  }

  formatTime(seconds: any) {
    if (isNaN(seconds)) return '00:00:00'

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
}
