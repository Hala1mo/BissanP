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
    userData: User[] = [];
    originalUserData: User[] = [];

    searchInput: string = "";

    displayedColumns: string[] = ['username', 'firstName', 'lastName', 'accessLevel', 'enabled', 'actions']
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
        console.log('ON INIT');
        console.log(this.userPaginator);
        console.log(this.userSort);
        this.dataSource.paginator = this.userPaginator;
        this.dataSource.sort = this.userSort;
    }

    fetchAllUserData() {
        this.userService.getAllUsers().subscribe({
            next: response => {
                console.log('Fetched user data:', response);
                this.originalUserData = response;

                this.resetFilters();
                console.log('AFTER RESET');
                console.log(this.userPaginator);
                console.log(this.userSort);
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
        this.userData = this.originalUserData.filter(user => user.enabled === 1);

        this.dataSource.data = this.userData;
    }

    showDisabledUsers() {
        this.userData = this.originalUserData.filter(user => user.enabled === 0);

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

    protected readonly Customer = Customer;


    openUserDetails(username: string) {
        this.router.navigate(['/users/details', username]);

    }
}
