import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DefinitionService} from "../../../services/definition.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../models/User";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-create',
  templateUrl: './create-assignment-dialog.component.html',
  styleUrls: ['./create-assignment-dialog.component.css']
})
export class CreateAssignmentDialogComponent implements OnInit {
  filteredUsers: User[] | undefined;
  userData: User [] = [];

  assignmentForm: FormGroup;
  currentDefinitionId: bigint;
  userSelectControl = new FormControl();

  @ViewChild('userInput') userInput!: ElementRef<HTMLInputElement>;
  isSaving: boolean = false;

  constructor(
    formBuilder: FormBuilder,
    private definitionService: DefinitionService,
    private userService: UserService,
    public matDialogRef: MatDialogRef<CreateAssignmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.currentDefinitionId = data.definitionId;

    this.assignmentForm = formBuilder.group({
      date: ['', [Validators.required]],
      comment: ['', [Validators.maxLength(30)]],
      username: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.fetchUserData();
  }

  private fetchUserData() {
    this.userService.fetchEmployees().subscribe({
        next: response => {
          this.userData = response;
        },
        error: error => {
          console.error('Error fetching user data:', error);
        }
      }
    );
  }

  filterUsers() {
    const filterValue = this.userInput.nativeElement.value.toLowerCase();
    this.filteredUsers = this.userData.filter(option => option.username.toLowerCase().includes(filterValue)
      || option.firstName.toLowerCase().includes(filterValue)
      || option.lastName.toLowerCase().includes(filterValue));
  }

  submitForm() {
    if (this.assignmentForm.invalid) return;
    if (this.isSaving) return;

    this.isSaving = true;
    this.definitionService.saveNewAssignmentToDefinition(this.assignmentForm.value, this.currentDefinitionId).subscribe({
      next: response => {
        this.matDialogRef.close(response);
      },
      error: () => {
        this.isSaving = false;
      }
    })
  }

  displayUser(user: User): string {
    return user ? `${user.username} (${user.firstName} ${user.lastName})` : '';
  }


  selectUser(event: MatAutocompleteSelectedEvent): void {
    this.assignmentForm.patchValue({
      username: event.option.value.username,
    })
  }

}
