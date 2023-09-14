import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DocumentService} from "../../../services/document.service";
import * as XLSX from "xlsx";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  isLoaded: boolean = false
  rows: any[] = [];
  dataSource:any[]=[];

  questions: any;
  fileName = 'ExcelSheet.xlsx';
  assignmentId: bigint = BigInt(0);

  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;
  displayedColumns: string[] = ['customer', 'date', 'ans1', 'ans2', 'ans3']

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.assignmentId = id;
        this.fetchAssignmentDetails(id);
      }

    });
  }

  fetchAssignmentDetails(id: bigint) {
    this.documentService.fetchQuestionAssignment(id).subscribe({
        next: response => {
          this.isLoaded = true;
          this.rows = response.answers;

          this.questions = response.questions;
        }
      }
    );
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
