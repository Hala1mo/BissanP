import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DefinitionService} from "../../../services/definition.service";
import {City} from "../../../models/City";
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-city-dialog',
  templateUrl: './city-dialog.component.html',
  styleUrls: ['./city-dialog.component.css']
})
export class CityDialogComponent {
  addForm: FormGroup;
  addingCity: boolean = true;
  cities: City[] = [];
  selectedCity: City | null = null;
  isSaving: boolean = false;


  constructor(
    formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private definitionService: DefinitionService,
    public matDialogRef: MatDialogRef<CityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    sharedService: SharedService,
  ) {
    this.addingCity = data.addingCity;

    if (!this.addingCity)
      this.cities = sharedService.getCitiesAsList();

    this.addForm = formBuilder.group({
      name: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)]],
    });
  }

  submitForm() {
    this.isSaving = true;
    if (this.addingCity) this.addCity();
    else this.addLocation();
  }

  addCity() {
    this.definitionService.saveNewCity(this.addForm.value).subscribe({
      next: () => {
        this.matDialogRef.close();
      },
      error: () => {
        this.isSaving = false;
      }
    })
  }

  addLocation() {
    if (!this.selectedCity) {
      this.snackBar.open("Choose a city", '', {
        duration: 3000
      });
      return;
    }

    this.definitionService.saveNewLocation(this.selectedCity.id, this.addForm.value).subscribe({
      next: () => {
        this.matDialogRef.close();
      },
      error: () => {
        this.isSaving = false;
      }
    });
  }

  changeSelectedCity(city: City) {
    this.selectedCity = city;
  }
}
