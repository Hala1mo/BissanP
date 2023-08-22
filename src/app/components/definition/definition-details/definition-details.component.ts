import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AssignmentService} from "../../../services/assignment.service";
import {VisitAssignment} from "../../../models/VisitAssignment";
import {VisitDefinition} from "../../../models/VisitDefinition";
import {MatDialog} from "@angular/material/dialog";
import {DefinitionDialogComponent} from "../definition-dialog/definition-dialog.component";
import {DefinitionService} from "../../../services/definition.service";
import {VisitType} from "../../../models/VisitType";

@Component({
  selector: 'app-details-def',
  templateUrl: './definition-details.component.html',
  styleUrls: ['./definition-details.component.css']
})

export class DefinitionDetailsComponent implements OnInit {
  definition: VisitDefinition | undefined;
  assignments: VisitAssignment[] = [];

  visitTypes: VisitType[] = [];
  displayedColumns: string[] = ['Date', 'Comment', 'Action'];
  dataSource = this.assignments;
  registrationForm!: FormGroup;
  isEditMode = false; // Toggle between add and edit modes
  id!: bigint;

  constructor(
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private definitionService: DefinitionService,
    private matDialog: MatDialog,
    private router: Router,
    private assignmentService: AssignmentService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.fetchDefinitionDetails(this.id);
        this.fetchVisitTypes();
      }
      this.registrationForm = this.formBuilder.group({
        date: [''],
        comment: [''],
      });


    });

  }

  fetchDefinitionDetails(defId: any) {
    this.assignmentService.fetchDefinitionDetails(defId).subscribe({
        next: response => {
          console.log('Fetched VisitDefinition data:', response);
          this.definition = response;

          if (Array.isArray(response.visitAssignments)) {

            this.assignments = [...response.visitAssignments];

            console.log(this.assignments);
          } else {
            console.error('Invalid or missing visitAssignments data in the response:', response);
          }
        },
        error: error => {
          console.error('Error fetching VisitAssignment data:', error);

        }
      }
    );
  }

  onSubmit() {
    console.log(this.registrationForm);
    console.log("id", this.id);
    this.assignmentService.AddAssignment(this.registrationForm.value, this.id).subscribe(
      (res) => {
        console.log('Registration successful:', res);
        this.registrationForm.reset();
        this.fetchDefinitionDetails(this.id);
      },
      (error) => {
        console.error('Registration failed:', error);
        if (error.error && error.error.errors && error.error.errors.length > 0) {
          const errorMessage = error.error.errors[0];
          console.log('Error message:', errorMessage);
          // this.toastService.show('Error', errorMessage);
          this.snackBar.open(errorMessage, '', {
            duration: 3000
          });

        }
      }
    );
  }

  openAssignmentsDetails(id: bigint) {
    this.router.navigate(['../../assignments', id]);
  }

  openCreateAssignmentDialog(definition: VisitDefinition) {
    console.log("OPENING ASSIGNMENT DIALOG")
  }

  formatDateString(timeString: string) {
    const date = new Date(timeString);

    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  }

  fetchVisitTypes() {
    this.definitionService.fetchTypesData().subscribe({
      next: response => {
        console.log('Fetched types data:', response);
        this.visitTypes = response;
      },
      error: error => {
        console.error('Error fetching visit types:', error);
        if (error.message) {
          let errorMessage = error.message;
          console.log('Error message:', errorMessage);

          this.snackBar.open(errorMessage, '', {
            duration: 3000
          });
        }
      }
    });
  }

  openEditDialog(definition: VisitDefinition) {
    this.matDialog.open(DefinitionDialogComponent, {
      width: '40%',
      data: {
        'mode': 1,
        'definition': definition,
        'types': this.visitTypes
      }
    }).afterClosed().subscribe(response => {
      if (response == undefined) return

      definition.createdTime = response.createdTime


    });
  }

}
