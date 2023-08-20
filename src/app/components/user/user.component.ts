import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../models/User";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {AddUserComponent} from "./add/add-user.component";
import {UserService} from "../../services/user.service";
import {EditUserComponent} from "./edit-user/edit-user.component";


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

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    private matDialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.fetchAllUserData();

    this.dataSource.filterPredicate = function (user, filter) {
      return user.username.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) || user.firstName.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) || user.lastName.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    this.matDialog.open(EditUserComponent, {
      data: user,}).afterClosed().subscribe({
      next: response => {
        if (response === undefined) return;

        if (response.firstName && response.lastName && response.accessLevel){
          user.firstName = response.firstName;
          user.lastName = response.lastName;
          user.accessLevel = response.accessLevel;
        }
      }
    })
  }

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

  openAddDialog() {
    this.matDialog.open(AddUserComponent).afterClosed().subscribe(() => {
      this.fetchAllUserData();
    });
  }

}
