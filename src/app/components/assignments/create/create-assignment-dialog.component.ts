import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DefinitionService} from "../../../services/definition.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-create',
    templateUrl: './create-assignment-dialog.component.html',
    styleUrls: ['./create-assignment-dialog.component.css']
})
export class CreateAssignmentDialogComponent {
    assignmentForm: FormGroup;
    currentDefinitionId: bigint;

    constructor(
        formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
        private definitionService: DefinitionService,
        public matDialogRef: MatDialogRef<CreateAssignmentDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        this.currentDefinitionId = data.definitionId;

        this.assignmentForm = formBuilder.group({
            date: ['', [Validators.required]],
            comment: ['', [Validators.maxLength(255)]]
        })
    }

    submitForm() {
        if (this.assignmentForm.invalid) return;

        console.log(this.assignmentForm.value);

        this.definitionService.saveNewAssignmentToDefinition(this.assignmentForm.value, this.currentDefinitionId).subscribe({
            next: response => {
                console.log("SAVED NEW ASSIGNMENT", response);
                this.matDialogRef.close(response);
            },
            error: error => {

              if (error.error && error.error.message) { // Check if 'message' property exists
                const errorMessage = error.error.message;
                console.log('Error message:', errorMessage);

                this.snackBar.open(errorMessage, '', {
                  duration: 3000
                });
              } else {
                console.log('Unknown error occurred.');
              }
            }
        })
    }
}
