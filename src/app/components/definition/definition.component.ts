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

  displayedColumns: string[] = ['name', 'description', 'frequency', 'allowRecurring', 'type', 'enabled', 'actions'];
  dataSource = new MatTableDataSource(this.visitDefinitionData);

  @ViewChild('definitionTablePaginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private definitionService: DefinitionService,
    private router: Router,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
  }


  ngOnInit() {
    this.fetchAllDefinitions();
    this.fetchVisitTypes();

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
        console.log('Fetched definitions data:', response);
        this.originalVisitDefinitionData = response;

        this.resetFilters();
      },
      error: error => {
        console.error('Error fetching definitions:', error);
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

  fetchVisitTypes() {
    this.definitionService.fetchTypesData().subscribe({
      next: response => {
        console.log('Fetched types data:', response);
        this.visitTypesData = response;
      },
      error: error => {
        console.error('Error fetching visit types:', error);
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

  openCreateDialog() {
    this.matDialog.open(DefinitionDialogComponent, {
      width: '40%',
      data: {
        'mode': 0,
        'types': this.visitTypesData
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
        'types': this.visitTypesData
      }
    }).afterClosed().subscribe(() => {
      this.fetchAllDefinitions();
    });
  }

  updateDefinitionStatus(definition: VisitDefinition) {
    definition.enabled = definition.enabled == 1 ? 0 : 1;
    this.definitionService.updateDefinitionEnabledStatus(definition.id).subscribe(
      {
        next: response => {
          console.log('Enabled status updated successfully:', response);

          definition.enabled = response.enabled;
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
          definition.enabled = definition.enabled == 1 ? 0 : 1;
        }
      }
    );
  }

  applyFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  resetFilters() {
    this.visitDefinitionData = this.originalVisitDefinitionData;

    this.dataSource.data = this.visitDefinitionData;
  }

  showEnabledDefinitions() {
    this.visitDefinitionData = this.originalVisitDefinitionData.filter(def => def.enabled === 1);

    this.dataSource.data = this.visitDefinitionData;
  }

  showDisabledDefinitions() {
    this.visitDefinitionData = this.originalVisitDefinitionData.filter(def => def.enabled === 0);

    this.dataSource.data = this.visitDefinitionData;
  }

  showRecurringDefinitions() {
    this.visitDefinitionData = this.originalVisitDefinitionData.filter(def => def.allowRecurring);

    this.dataSource.data = this.visitDefinitionData;
  }

  showNonRecurringDefinitions() {
    this.visitDefinitionData = this.originalVisitDefinitionData.filter(def => !def.allowRecurring);

    this.dataSource.data = this.visitDefinitionData;
  }

  showTypeDefinitions(typeId: bigint) {
    this.visitDefinitionData = this.originalVisitDefinitionData.filter(def => def.type.id == typeId);

    this.dataSource.data = this.visitDefinitionData;
  }


  openDetailsPage(definition: any) {
    this.router.navigate(['/definitions', definition.id])
  }
}
