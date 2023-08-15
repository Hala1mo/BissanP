import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {DefinitionService} from "../../../services/definition.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Type} from "../../../models/type";
import {AssignmentService} from "../../../services/assignment.service";
import {Assignments} from "../../../models/Assignments";
import {PasswordValidators} from "../../../shared/password.validators";

@Component({
  selector: 'app-details-def',
  templateUrl: './details-def.component.html',
  styleUrls: ['./details-def.component.css']
})
export class DetailsDefComponent  implements OnInit {
  Data: Assignments[] = [];
  displayedColumns: string[] = ['Date', 'Comment'];
  dataSource = this.Data;
  registrationForm!: FormGroup;
  isEditMode = false; // Toggle between add and edit modes
  id!: bigint;
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
      this.registrationForm = this.fb.group({
        date: [''],
        comment: [''],
      });


    });

  }

  fetchAssignemnts(defId: any) {
    this.id=defId;
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
  onSubmit() {
    const registrationFormValue = this.registrationForm.value;

    this.assignmentService.AddAssignment(this.registrationForm.value,this.id).subscribe(
      (res) => {
        console.log('Registration successful:', res);
        this.registrationForm.reset();
        this.fetchAssignemnts(this.id);
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



}
