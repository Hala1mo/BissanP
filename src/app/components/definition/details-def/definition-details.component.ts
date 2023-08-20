import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Type} from "../../../models/type";
import {AssignmentService} from "../../../services/assignment.service";
import {Assignments} from "../../../models/Assignments";
import {PasswordValidators} from "../../../shared/password.validators";
import {Customer} from "../../../models/Customer";
import {Sort} from "@angular/material/sort";
@Component({
  selector: 'app-details-def',
  templateUrl: './definition-details.component.html',
  styleUrls: ['./definition-details.component.css']
})

export class DefinitionDetailsComponent implements OnInit {
  definition: any;
  assignments: Assignments[] = [];
  displayedColumns: string[] = ['Date', 'Comment','Action'];
  dataSource = this.assignments;
  registrationForm!: FormGroup;
  isEditMode = false; // Toggle between add and edit modes
  id!: bigint;
  constructor(
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private assignmentService: AssignmentService,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
       if (this.id) {
         this.fetchDefinitionDetails(this.id);

       }
      this.registrationForm = this.fb.group({
        date: [''],
        comment: [''],
      });


    });

  }

  fetchDefinitionDetails(defId: any) {
    this.assignmentService.fetchDefinitionDetails(defId).subscribe(
      (data) => {
        console.log('Fetched Definition data:', data);
        this.definition = data;

        if (Array.isArray(data.visitAssignments)) {
          this.assignments = [...data.visitAssignments];
          console.log(this.assignments);
        } else {
          console.error('Invalid or missing visitAssignments data in the response:', data);
        }
      },
      (error) => {
        console.error('Error fetching Assignments data:', error);
      }
    );
  }
  onSubmit() {
    console.log(this.registrationForm);
    console.log("id",this.id);
    this.assignmentService.AddAssignment(this.registrationForm.value,this.id).subscribe(
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
          this._snackBar.open(errorMessage, '', {
            duration: 3000
          });

        }
      }
    );
  }
  openAssignmentsDetails(id: bigint) {
    console.log("jnjnsjndks",id);
    this.router.navigate(['../../assignments', id]);

  }


  // announceSortChange($event: Sort) {
  //     if (sortState.direction) {
  //       this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //     } else {
  //       this._liveAnnouncer.announce('Sorting cleared');
  //     }
  //
  // }
}
