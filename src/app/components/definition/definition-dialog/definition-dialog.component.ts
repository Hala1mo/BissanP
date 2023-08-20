import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VisitType} from "../../../models/VisitType";
import {VisitDefinition} from "../../../models/VisitDefinition";
import {DefinitionService} from "../../../services/definition.service";

@Component({
    selector: 'app-definition-dialog',
    templateUrl: './definition-dialog.component.html',
    styleUrls: ['./definition-dialog.component.css']
})

export class DefinitionDialogComponent implements OnInit {
    definitionForm: FormGroup;

    editMode: boolean;
    types: VisitType[];
    currentDefinition: VisitDefinition;

    constructor(
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
        private definitionService: DefinitionService,
        public matDialogRef: MatDialogRef<DefinitionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.editMode = data.mode === 1;
        this.types = data.types;
        this.currentDefinition = data.definition;


        this.definitionForm = formBuilder.group({
            name: ['', [Validators.required,
                Validators.minLength(3),
                Validators.maxLength(30)]],

            description: ['', [Validators.required,
                Validators.minLength(3),
                Validators.maxLength(255)]],

            frequency: ['', [Validators.required,
                Validators.min(1),
                Validators.max(365)]],

            allowRecurring: ['false', [Validators.required]],

            typeUUID: ['', [Validators.required]]
        })
    }

    ngOnInit(): void {
        console.log(this.currentDefinition);

        if (this.editMode){
            this.definitionForm.patchValue({
                name: this.currentDefinition.name,
                description: this.currentDefinition.description,
                frequency: this.currentDefinition.frequency,
                allowRecurring: this.currentDefinition.allowRecurring,
                typeUUID : this.currentDefinition.type.uuid
            });
        }
    }

    submitForm() {
        if (this.definitionForm.invalid) return;

        if (this.editMode)
            this.updateDefinition(this.currentDefinition, this.definitionForm.value);
        else
            this.saveNewDefinition(this.definitionForm.value);
    }

    private updateDefinition(currentDefinition: VisitDefinition, formJson: any) {
        this.definitionService.updateVisitDefinition(currentDefinition.uuid, formJson).subscribe({
            next: response => {
                console.log("Updated VisitDefinition: ", response)
                this.matDialogRef.close(response);
            },
            error: error => {
                if (error.error && error.error.errors && error.error.errors.length > 0) {
                    const errorMessage = error.error.errors[0];
                    console.log('Error message:', errorMessage);

                    this.snackBar.open(errorMessage, '', {
                        duration: 3000
                    });
                }
            }
        })
    }

    private saveNewDefinition(formJson: any) {
        this.definitionService.saveNewDefinition(formJson).subscribe({
            next: response => {
                console.log("Created new VisitDefinition: ", response)
                this.matDialogRef.close();
            },
            error: error => {
                if (error.error && error.error.errors && error.error.errors.length > 0) {
                    const errorMessage = error.error.errors[0];
                    console.log('Error message:', errorMessage);

                    this.snackBar.open(errorMessage, '', {
                        duration: 3000
                    });
                }
            }
        })
    }
}
