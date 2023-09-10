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
import {Customer} from "../../models/Customer";
import {Router} from "@angular/router";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})

export class UserComponent implements OnInit, AfterViewInit {
  isTableLoaded: boolean = false;
  userData: User[] = [];
  originalUserData: User[] = [];

  searchInput: string = "";
  selectedActiveFilter = 'All Users';
  selectedRoleFilter = 'All Users';


  displayedColumns: string[] = ['username', 'name', 'accessLevel', 'enabled', 'actions']
  dataSource = new MatTableDataSource(this.userData);

  @ViewChild('userTablePaginator') userPaginator!: MatPaginator;
  @ViewChild(MatSort) userSort!: MatSort;

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    private matDialog: MatDialog,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.fetchAllUserData();

    this.dataSource.filterPredicate = function (user, filter) {
      return user.username.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) || user.firstName.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) || user.lastName.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.userPaginator;
    this.dataSource.sort = this.userSort;
  }

  fetchAllUserData() {
    this.userService.fetchAllUsers().subscribe({
      next: response => {
        this.isTableLoaded = true;

        this.originalUserData = response;
        this.resetFilters();

        setTimeout(() => {
          this.dataSource.sort = this.userSort;
          this.dataSource.paginator = this.userPaginator;
        }, 10);

      },
      error: error => {
        if (!error.message) return

        this.snackBar.open(error.message, '', {
          duration: 3000
        });
      }
    });
  }

  updateUserStatus(user: User) {
    user.enabled = !user.enabled;
    this.userService.updateUserStatus(user.username).subscribe(
      {
        next: response => {
          user.enabled = response.enabled;
        },
        error: error => {
          if (error.message) {
            this.snackBar.open(error.message, '', {
              duration: 3000
            });
          }
          user.enabled = !user.enabled;
        }
      }
    );
  }

  openAddDialog() {
    this.matDialog.open(AddUserComponent, {
      width: '40%'
    }).afterClosed().subscribe(() => {
      this.fetchAllUserData();
    });
  }

  openEditDialog(user: User) {
    this.matDialog.open(EditUserComponent, {
      width: '40%',
      data: user
    }).afterClosed().subscribe(
      response => {
        if (response === undefined) return;

        if (response.firstName && response.lastName && response.accessLevel) {
          user.firstName = response.firstName;
          user.lastName = response.lastName;
          user.accessLevel = response.accessLevel;
        }
      })
  }

  showEnabledUsers() {
    this.userData = this.originalUserData.filter(user => user.enabled);
    this.dataSource.data = this.userData;
  }

  showDisabledUsers() {
    this.userData = this.originalUserData.filter(user => !user.enabled);
    this.dataSource.data = this.userData;
  }

  showAdminUsers() {
    this.userData = this.originalUserData.filter(user => user.accessLevel === 1);
    this.dataSource.data = this.userData;
  }

  showEmployeeUsers() {
    this.userData = this.originalUserData.filter(user => user.accessLevel === 0);
    this.dataSource.data = this.userData;
  }

  applyFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  resetFilters() {
    this.userData = this.originalUserData;
    this.dataSource.data = this.userData;
  }

  openUserDetails(username: string) {
    this.router.navigate(['/users/', username]);
  }

  protected readonly Customer = Customer;

}
