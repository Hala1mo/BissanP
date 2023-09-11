import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {VisitDefinition} from "../../models/VisitDefinition";
import {VisitType} from "../../models/VisitType";
import {DefinitionService} from "../../services/definition.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DefinitionDialogComponent} from "./definition-dialog/definition-dialog.component";
import {Router} from "@angular/router";
import {TypeDialogComponent} from "./type-dialog/type-dialog.component";
import {SharedService} from "../../services/shared.service";
import {City} from "../../models/City";
import {Location} from "../../models/Location";

@Component({
  selector: 'app-definition',
  templateUrl: './definition.component.html',
  styleUrls: ['./definition.component.css']
})
export class DefinitionComponent implements OnInit, AfterViewInit {
  visitDefinitionData: VisitDefinition[] = [];
  originalVisitDefinitionData: VisitDefinition[] = [];

  visitTypesData: VisitType[] = [];
  searchInput: string = "";

  displayedColumns: string[] = ['name', 'description', 'frequency', 'allowRecurring', 'type', 'city', 'location', 'enabled', 'actions'];
  dataSource = new MatTableDataSource(this.visitDefinitionData);

  @ViewChild('definitionTablePaginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  cities: City[] = [];
  selectedEnabledOption = '';
  selectedTypeOption = '';
  selectedRecurringOption = '';
  selectedCityOption = '';
  selectedLocationOption = '';
  selectedCity: City | null = null;
  selectedCityLocations: Location[] = [];


  constructor(
    private definitionService: DefinitionService,
    private sharedService: SharedService,
    private router: Router,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
  }


  ngOnInit() {
    this.fetchAllDefinitions();

    this.cities = this.sharedService.getCitiesAsList();
    this.visitTypesData = this.sharedService.getVisitTypesAsList();

    if (this.cities.length < 1) {
      this.sharedService.fetchCities().subscribe({
        next: value => {
          this.cities = value;
        }
      });
    }
    if (this.visitTypesData.length < 1) {
      this.sharedService.fetchVisitTypes().subscribe({
        next: value => {
          this.visitTypesData = value;
        }
      });
    }

    this.dataSource.filterPredicate = function (definition, filter) {
      return definition.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) || definition.description.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;
  }


  fetchAllDefinitions() {
    this.definitionService.fetchAllDefinitions().subscribe({
      next: response => {
        this.originalVisitDefinitionData = response;
        this.resetFilters();
      },
      error: error => {
        if (error.message) {
          let errorMessage = error.message;
          this.snackBar.open(errorMessage, '', {
            duration: 3000
          });
        }
      }
    });
  }


  openCreateDialog() {
    this.matDialog.open(DefinitionDialogComponent, {
      width: '40%',
      data: {
        'mode': 0,
        'types': this.sharedService.getVisitTypesAsList(),
        'cities': this.sharedService.getCitiesAsList()
      }
    }).afterClosed().subscribe(() => {
      this.fetchAllDefinitions();
    });
  }

  openEditDialog(definition: VisitDefinition) {
    this.matDialog.open(DefinitionDialogComponent, {
      width: '40%',
      data: {
        'mode': 1,
        'definition': definition,
        'types': this.sharedService.getVisitTypesAsList(),
        'cities': this.sharedService.getCitiesAsList()
      }
    }).afterClosed().subscribe(() => {
      this.fetchAllDefinitions();
    });
  }

  updateDefinitionStatus(definition: VisitDefinition) {
    definition.enabled = !definition.enabled;
    this.definitionService.updateDefinitionEnabledStatus(definition.id).subscribe(
      {
        next: response => {
          definition.enabled = response.enabled;
        },
        error: error => {
          if (error.message) {
            let errorMessage = error.message;
            this.snackBar.open(errorMessage, '', {
              duration: 3000
            });
          }
          definition.enabled = !definition.enabled;
        }
      }
    );
  }

  resetFilters() {
    this.searchInput = "";
    this.selectedRecurringOption = "";
    this.selectedTypeOption = "";
    this.selectedEnabledOption = "";
    this.selectedCityOption = "";
    this.selectedLocationOption = "";
    this.selectedCity = null;

    this.visitDefinitionData = this.originalVisitDefinitionData;
    this.dataSource.data = this.visitDefinitionData;
  }

  openDetailsPage(definition: any) {
    this.router.navigate(['/definitions', definition.id])
  }

  openTypeDialog() {
    this.matDialog.open(TypeDialogComponent, {
      width: '40%',
    }).afterClosed().subscribe(() => {
      this.sharedService.updateVisitTypes();
    });
  }

  searchDefinitions() {
    let name = this.searchInput || undefined;
    let enabled = this.selectedEnabledOption || undefined;
    let recurring = this.selectedRecurringOption || undefined;
    let type = this.selectedTypeOption || undefined;
    let city = this.selectedCityOption || undefined;
    let location = this.selectedLocationOption || undefined;

    if (!city){
      this.selectedCity = null;
      this.selectedLocationOption = '';
      location = undefined;
    }
    if (!name && !enabled && !city && !location && !recurring && !type)
      this.resetFilters();

    this.definitionService.searchDefinitions(name, enabled, recurring, type, city, location).subscribe({
      next: value => {
        this.visitDefinitionData = value;
        this.dataSource.data = this.visitDefinitionData;
      }
    })

  }

  changeSelectedCity(city: City) {
    this.selectedCity = city;
    this.selectedCityLocations = [...this.selectedCity.locations];
  }

}
