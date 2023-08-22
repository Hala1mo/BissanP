import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AssignmentService} from "../../../services/assignment.service";
import {VisitAssignment} from "../../../models/VisitAssignment";
import {VisitDefinition} from "../../../models/VisitDefinition";

@Component({
  selector: 'app-details-def',
  templateUrl: './definition-details.component.html',
  styleUrls: ['./definition-details.component.css']
})

export class DefinitionDetailsComponent implements OnInit {
  definition: VisitDefinition | undefined;
  assignments: VisitAssignment[] = [];
  displayedColumns: string[] = ['Date', 'Comment', 'Action'];
  dataSource = this.assignments;
  registrationForm!: FormGroup;
  isEditMode = false; // Toggle between add and edit modes
  id!: bigint;

  constructor(
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
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

  openCreateAssignmentDialog() {
    console.log("OPENING ASSIGNMENT DIALOG")
  }

  formatDateString(timeString: string) {
    const date = new Date(timeString);

    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  }
}
