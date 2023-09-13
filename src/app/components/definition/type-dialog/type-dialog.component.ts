import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DefinitionService} from "../../../services/definition.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-type-dialog',
  templateUrl: './type-dialog.component.html',
  styleUrls: ['./type-dialog.component.css']
})
export class TypeDialogComponent {

  addForm: FormGroup;


  constructor(
    formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private definitionService: DefinitionService,
    public matDialogRef: MatDialogRef<TypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.addForm = formBuilder.group({
      name: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)]],
      i: ['0', Validators.required]
    });
  }


  saveNewType() {
    this.definitionService.saveNewType(this.addForm.value).subscribe({
      next: () => {
        this.matDialogRef.close();
      }
    })
  }
}
