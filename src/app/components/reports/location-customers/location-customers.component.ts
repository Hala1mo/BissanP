import {Component, OnInit} from '@angular/core';
import * as XLSX from "xlsx";
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-location-customers',
  templateUrl: './location-customers.component.html',
  styleUrls: ['./location-customers.component.css']
})
export class LocationCustomersComponent implements OnInit {
  rows: any[] = [];
  displayedColumns = [
    'city', 'location', 'newCus', 'totCus',
    'totAssig', 'nstAssig', 'undAssig', 'comAssig'
  ];

  constructor(
    private sharedService: SharedService,
  ) {
  }

  ngOnInit(): void {
    this.rows = this.sharedService.getLocationCustomersReport();
  }

  exportTable() {
    let element = document.getElementById('report-table');

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, "Customers By Location.xlsx");
  }


}
