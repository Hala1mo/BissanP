import {Component} from '@angular/core';
import {CityDialogComponent} from "../definition/city-dialog/city-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {SharedService} from "../../services/shared.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private sharedService: SharedService) {

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
    this.router.navigate(['/documents/payment']);
  }
  openQuestionPage() {
    this.router.navigate(['/documents/question-templates']);
  }
}
