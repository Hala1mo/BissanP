import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordValidators} from "../../shared/password.validators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {nameValidator} from "../../shared/Name.validators";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../models/User";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {MatDialog, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {AddUserComponent} from "./add/add-user.component";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})

export class UserComponent implements OnInit, AfterViewInit {
  userData: User[] = [];
  originalUserData: User[] = [];

  searchInput: string = "";
  selectedRoleOption: string = "";
  selectedEnabledOption: string = "";

  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'accessLevel', 'actions']
  dataSource = new MatTableDataSource(this.userData);

  @ViewChild('userTablePaginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isSearchLoading = false;

  registrationForm!: FormGroup;
  editForm!: FormGroup;
  selectedUser: any | null = null; // To store the selected user for editing
  isEditMode = false; // Toggle between add and edit modes
  editingUsername: string | null = null;

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    private _liveAnnouncer: LiveAnnouncer,
    private _dialog: MatDialog,
    private fb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.fetchAllUserData();

    this.dataSource.filterPredicate = function (user, filter) {
      return user.username.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) || user.firstName.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) || user.lastName.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
    }

    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', [Validators.required, nameValidator]],
      password: ['', Validators.required],
      confirmPassword: [''],
      lastName: ['', [Validators.required, nameValidator]],
      accessLevel: ['']
    }, {validator: PasswordValidators});

    this.editForm = this.fb.group({
      firstName: ['', [Validators.required, nameValidator]],
      lastName: ['', [Validators.required, nameValidator]],
      accessLevel: ['']
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
    console.log(this.dataSource.sort?.active);
  }


  fetchAllUserData() {
    this.userService.getAllUsers().subscribe({
      next: response => {
        console.log('Fetched user data:', response);
        this.originalUserData = response;

        this.resetFilters();
      },
      error: error => {
        console.error('Error fetching users:', error);
        if (error.message) {
          let errorMessage = error.message;
          console.log('Error message:', errorMessage);

          this.snackBar.open(errorMessage, '', {
            duration: 3000
          });

        }

      }
    });
  }

  updateUserStatus(user: User) {
    user.enabled = user.enabled == 1 ? 0 : 1;
    this.userService.updateUserStatus(user.username).subscribe(
      {
        next: response => {
          console.log('Enabled status updated successfully:', response);

          user.enabled = response.enabled;
        },
        error: error => {
          console.error('Error updating enabled status:', error);
          if (error.message) {
            let errorMessage = error.message;
            console.log('Error message:', errorMessage);

            this.snackBar.open(errorMessage, '', {
              duration: 3000
            });

          }
          user.enabled = user.enabled == 1 ? 0 : 1;
        }
      }
    );
  }

  updateUser(user : User) {

  }

  // TO REMOVE START

  populateEditForm(user: any) {
    this.editForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      accessLevel: user.accessLevel
    });
  }

  onEditUser(user: any) {
    this.selectedUser = user;
    this.isEditMode = true;
    this.editingUsername = user.username;
    this.populateEditForm(user);
    this.editForm.get('accessLevel')?.setValue(user.accessLevel === 1);
  }

  onSubmitEdit() {
    if (this.editForm.valid && this.editingUsername) {

      const editedUserData = this.editForm.value;

      editedUserData.accessLevel = editedUserData.accessLevel ? 1 : 0;
      this.userService.updateUser(this.editingUsername, editedUserData).subscribe(
        (response) => {
          console.log('User data updated successfully:', response);

          const editedUserIndex = this.userData.findIndex(user => user.username === editedUserData.username);
          if (editedUserIndex !== -1) {
            this.userData[editedUserIndex] = editedUserData;
          }

          // Reset the form and exit edit mode
          this.editForm.reset();
          this.isEditMode = false;
          this.fetchAllUserData();

        },
        (error) => {
          console.error('Error updating user data:', error);
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
  }

  cancelEdit() {
    this.isEditMode = false;
    this.selectedUser = null;
    this.editForm.reset();
  }

  // TO MOVE END

  showEnabledUsers() {
    this.selectedEnabledOption = "Active"
    this.userData = this.originalUserData.filter(user => user.enabled === 1);

    this.dataSource.data = this.userData;
  }

  showDisabledUsers() {
    this.selectedEnabledOption = "Inactive"
    this.userData = this.originalUserData.filter(user => user.enabled === 0);

    this.dataSource.data = this.userData;
  }

  showAdminUsers() {
    this.selectedRoleOption = "Supervisors"
    this.userData = this.originalUserData.filter(user => user.accessLevel === 1);

    this.dataSource.data = this.userData;
  }

  showEmployeeUsers() {
    this.selectedRoleOption = "Employees"
    this.userData = this.originalUserData.filter(user => user.accessLevel === 0);

    this.dataSource.data = this.userData;
  }

  resetFilters() {
    this.userData = this.originalUserData;

    this.dataSource.data = this.userData;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  protected readonly console = console;

  openAddDialog() {
    this._dialog.open(AddUserComponent).afterClosed().subscribe(() => {
      this.fetchAllUserData();
    });
  }

}
