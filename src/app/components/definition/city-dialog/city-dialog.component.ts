import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DefinitionService} from "../../../services/definition.service";

@Component({
  selector: 'app-city-dialog',
  templateUrl: './city-dialog.component.html',
  styleUrls: ['./city-dialog.component.css']
})
export class CityDialogComponent {


  addForm: FormGroup;


  constructor(
    formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private definitionService: DefinitionService,
    public matDialogRef: MatDialogRef<CityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.addForm = formBuilder.group({
      name: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)]],

    });
  }



 saveNewCity() {
    this.definitionService.saveNewCity(this.addForm.value).subscribe({
      next: response => {
        console.log("Added new City: ", response)
        this.matDialogRef.close();
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
