import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VisitType} from "../../../models/VisitType";
import {VisitDefinition} from "../../../models/VisitDefinition";
import {DefinitionService} from "../../../services/definition.service";
import {City} from "../../../models/City";
import {Location} from "../../../models/Location"

@Component({
  selector: 'app-definition-dialog',
  templateUrl: './definition-dialog.component.html',
  styleUrls: ['./definition-dialog.component.css']
})

export class DefinitionDialogComponent implements OnInit {
  definitionForm: FormGroup;

  editMode: boolean;
  visitTypes: VisitType[];
  cities: City[];
  selectedDefinition: VisitDefinition;
  selectedCity: City | null = null;
  selectedType: VisitType | null = null;
  selectedCityLocations: Location[] = [];
  isSaving: boolean = false;
  isQuestionTypeSelected: boolean = false;

  constructor(
    formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private definitionService: DefinitionService,
    public matDialogRef: MatDialogRef<DefinitionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editMode = data.mode === 1;
    this.visitTypes = data.types;
    this.selectedDefinition = data.definition;
    this.cities = data.cities;


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

      allowRecurring: [true, [Validators.required]],

      typeId: ['', [Validators.required]],
      cityId: ['', [Validators.required]],
      locationId: ['', [Validators.required]],

    })
  }

  ngOnInit(): void {
    if (this.editMode) {
      this.changeSelectedCity(this.cities.filter((city: City) => city.id == this.selectedDefinition.location.cityId)[0]);
      this.definitionForm.patchValue({
        name: this.selectedDefinition.name,
        description: this.selectedDefinition.description,
        frequency: this.selectedDefinition.frequency,
        allowRecurring: this.selectedDefinition.allowRecurring,
        typeId: this.selectedDefinition.visitType.id,
        cityId: this.selectedDefinition.location.cityId,
        locationId: this.selectedDefinition.location.id,
      });
    }
  }

  submitForm() {
    if (this.definitionForm.invalid) return;
    if (this.isSaving) return;

    this.isSaving = false;
    if (this.editMode)
      this.updateDefinition(this.selectedDefinition, this.definitionForm.value);
    else
      this.saveNewDefinition(this.definitionForm.value);
  }

  private updateDefinition(currentDefinition: VisitDefinition, formJson: any) {
    this.definitionService.updateVisitDefinition(currentDefinition.id, formJson).subscribe({
      next: response => {
        this.matDialogRef.close(response);
      },
      error: error => {
        if (error.error && error.error.message) { // Check if 'message' property exists
          const errorMessage = error.error.message;
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
        console.log(response);
        this.matDialogRef.close(response);
      },
      error: error => {
        if (error.error && error.error.message) { // Check if 'message' property exists
          const errorMessage = error.error.message;

          this.snackBar.open(errorMessage, '', {
            duration: 3000
          });
        }
      }
    })
  }

  changeSelectedCity(city: City) {
    this.selectedCity = city;
    this.selectedCityLocations = [...this.selectedCity.locations];
  }

  changeSelectedType(type: VisitType) {
    this.selectedType = type;
    this.isQuestionTypeSelected = this.selectedType.base === 'QUESTION';
    if (this.isQuestionTypeSelected && !this.editMode) {
      this.definitionForm.addControl('question1', new FormControl('', [Validators.required]));
      this.definitionForm.addControl('question2', new FormControl('', [Validators.required]));
      this.definitionForm.addControl('question3', new FormControl('', [Validators.required]));
    } else {
      // If it's not a question type, you may want to remove the controls.
      this.definitionForm.removeControl('question1');
      this.definitionForm.removeControl('question2');
      this.definitionForm.removeControl('question3');
    }
  }
}
