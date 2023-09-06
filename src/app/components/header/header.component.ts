import {Component} from '@angular/core';
import {CityDialogComponent} from "../definition/city-dialog/city-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private matDialog: MatDialog,
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
}
