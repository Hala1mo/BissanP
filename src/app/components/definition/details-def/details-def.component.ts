import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {DefinitionService} from "../../../services/definition.service";
import {FormBuilder} from "@angular/forms";
import {Type} from "../../../models/type";
import {AssignmentService} from "../../../services/assignment.service";
import {Assignments} from "../../../models/Assignments";

@Component({
  selector: 'app-details-def',
  templateUrl: './details-def.component.html',
  styleUrls: ['./details-def.component.css']
})
export class DetailsDefComponent  implements OnInit {
  Data: Assignments[] = [];
  displayedColumns: string[] = ['Date', 'Comment'];
  dataSource = this.Data;

  constructor(
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute, // Use ActivatedRoute here
    private assignmentService: AssignmentService,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      console.log("id:",id);
       if (id) {
         this.fetchAssignemnts(id);

       }

    });

  }
  fetchAssignemnts(defId: any) {
    this.assignmentService.fetchAssignment(defId).subscribe(
      (data) => {
        console.log('Fetched Assignments data:', data);

        if (Array.isArray(data.visitAssignments)) {
          // Assuming that 'visitAssignments' is an array within the received data
          this.Data = data.visitAssignments.map((assignmentData: any) => new Assignments(assignmentData));
          console.log(this.Data);
        } else {
          console.error('Invalid or missing visitAssignments data in the response:', data);
        }
      },
      (error) => {
        console.error('Error fetching Assignments data:', error);
      }
    );
  }



}
