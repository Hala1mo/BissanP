import {Component} from '@angular/core';
import {CityDialogComponent} from "../definition/city-dialog/city-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {SharedService} from "../../services/shared.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {LoginComponent} from "../../auth/login/login.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isAuthed: boolean = false;

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private sharedService: SharedService,
    authService: AuthService,
  ) {
    authService.isAuthenticated.subscribe((isAuth) => {
      this.isAuthed = isAuth;

      if (!isAuth) {
        this.matDialog.open(LoginComponent, {
          width: '40%',
        })
      }
    })
  }

  openCityDialog() {
    this.matDialog.open(CityDialogComponent, {
      width: '40%',
      data: {
        addingCity: true,
      }
    }).afterClosed().subscribe(() => {
      this.sharedService.updateCities();
    });
  }

  openLocationsDialog() {
    this.matDialog.open(CityDialogComponent, {
      width: '40%',
      data: {
        addingCity: false,
      }
    }).afterClosed().subscribe(() => {
      this.sharedService.updateCities();
    });
  }

  openPaymentPage() {
    void this.router.navigate(['/documents/payment']);
  }
  openQuestionPage() {
    void this.router.navigate(['/documents/question-templates']);
  }
}
