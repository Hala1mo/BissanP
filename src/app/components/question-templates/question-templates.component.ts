import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {DocumentService} from "../../services/document.service";

import {VisitAssignment} from "../../models/VisitAssignment";


@Component({
  selector: 'app-question-templates',
  templateUrl: './question-templates.component.html',
  styleUrls: ['./question-templates.component.css']
})
export class QuestionTemplatesComponent implements OnInit{
  visitAssignments: VisitAssignment[] = [];

  displayedColumns: string[] = ['date', 'comment', 'user', 'visitType','status', 'actions'];


  constructor(
    private documentService: DocumentService,
    private  router:Router

  ) {

  }
  ngOnInit() {
this.fetchAssignments();
  }

  fetchAssignments() {
    this.documentService.fetchAllQuestionAssignments().subscribe({
        next: response => {
     this.visitAssignments=response;
        }
      }
    );
  }



  openAssignmentDetails(id: bigint) {
    void this.router.navigate(['/documents/question-templates/', id]);
  }

}
