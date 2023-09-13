import {Component} from '@angular/core';
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
  name: string = '';

  displayedPerformanceColumns = [
    'username', 'totA', 'nstA', 'undA', 'comA',
    'totF', 'nstF', 'undF', 'cnlF', 'comF',
    'nstFP', 'undFP', 'cnlFP', 'comFP',
    'avgT', 'lateF'
  ];
  displayedInteractionColumns = [
    'customerName', 'customerAddress', 'formLocation',
    'formDueDate', 'formDuration', 'formStatus', 'formType'
  ];

  reportPerformance: any[];

  constructor(
    private sharedService: SharedService,
  ) {
    this.report = this.sharedService.getUserDetailedReportsAsList();

    this.reportPerformance = [
      {
        user: this.report.performance.user,
        totalAssignments: this.report.performance.totalAssignments,
        notStartedAssignments: this.report.performance.notStartedAssignments,
        undergoingAssignments: this.report.performance.undergoingAssignments,
        completedAssignments: this.report.performance.completedAssignments,
        totalForms: this.report.performance.totalForms,
        notStartedForms: this.report.performance.notStartedForms,
        undergoingForms: this.report.performance.undergoingForms,
        canceledForms: this.report.performance.canceledForms,
        completedForms: this.report.performance.completedForms,
        notStartedFormsPer: this.report.performance.notStartedFormsPer,
        undergoingFormsPer: this.report.performance.undergoingFormsPer,
        canceledFormsPer: this.report.performance.canceledFormsPer,
        completedFormsPer: this.report.performance.completedFormsPer,
        averageCompletionTime: this.report.performance.averageCompletionTime,
        lateFormsCount: this.report.performance.lateFormsCount
      },
    ]
  }

  ngOnInit(): void {
  }


  exportTable() {
    // Get references to the two tables by their IDs
    let element1 = document.getElementById('performance-report');
    let element2 = document.getElementById('interaction-report');

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

  formatTime(seconds: number) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  }
}
