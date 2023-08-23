import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {VisitDefinition} from "../../../models/VisitDefinition";
import {MatDialog} from "@angular/material/dialog";
import {DefinitionDialogComponent} from "../definition-dialog/definition-dialog.component";
import {DefinitionService} from "../../../services/definition.service";
import {VisitType} from "../../../models/VisitType";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {CreateAssignmentDialogComponent} from "../../assignments/create/create-assignment-dialog.component";

@Component({
    selector: 'app-details-def',
    templateUrl: './definition-details.component.html',
    styleUrls: ['./definition-details.component.css']
})

export class DefinitionDetailsComponent implements OnInit {
    currentDefinition: VisitDefinition | undefined;
    visitTypes: VisitType[] = [];

    displayedColumns: string[] = ['date', 'comment', 'user', 'actions'];
    dataSource = new MatTableDataSource([]);

    @ViewChild(MatPaginator) assignmentPaginator!: MatPaginator;
    @ViewChild(MatSort) assignmentSort!: MatSort;


    //UNUSED
    id!: bigint;

    constructor(
        private snackBar: MatSnackBar,
        private activatedRoute: ActivatedRoute,
        private definitionService: DefinitionService,
        private matDialog: MatDialog,
    ) {

    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            this.id = params['id'];
            if (this.id) {
                this.fetchDefinitionDetails(this.id);
                this.fetchVisitTypes();
            }
        });
    }


    openAssignmentDetails(id: bigint) {
        console.log("OPENING ASSIGNMENT", id);
        // this.router.navigate(['../../assignments', id]).then( () => {
        //
        // });
    }

    openCreateAssignmentDialog() {
        if (this.currentDefinition === undefined) return;

        this.matDialog.open(CreateAssignmentDialogComponent, {
            width: '40%',
            data: {
                definitionId: this.currentDefinition.id
            }
        }).afterClosed().subscribe(() => {
            this.fetchDefinitionDetails(this.id);
        });
    }

    openDefinitionEditDialog() {
        if (this.currentDefinition === undefined) return;

        this.matDialog.open(DefinitionDialogComponent, {
            width: '40%',
            data: {
                'mode': 1,
                'definition': this.currentDefinition,
                'types': this.visitTypes
            }
        }).afterClosed().subscribe(response => {
            if (response === undefined) return;
            if (this.currentDefinition === undefined) return;

            this.currentDefinition.createdTime = response.createdTime;
            this.currentDefinition.lastModifiedTime = response.lastModifiedTime;
            this.currentDefinition.name = response.name;
            this.currentDefinition.frequency = response.frequency;
            this.currentDefinition.allowRecurring = response.allowRecurring;
            this.currentDefinition.description = response.description;
        });
    }


    formatDateString(timeString: string) {
        const date = new Date(timeString);

        return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    }


    fetchVisitTypes() {
        this.definitionService.fetchTypesData().subscribe({
            next: response => {
                console.log('Fetched types data:', response);
                this.visitTypes = response;
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

    fetchDefinitionDetails(id: any) {
        this.definitionService.fetchDefinitionById(id).subscribe({
                next: response => {
                    console.log('Fetched VisitDefinition data:', response);
                    this.currentDefinition = response;
                    this.dataSource = new MatTableDataSource(response.visitAssignments);

                    setTimeout(() => {
                        this.dataSource.sort = this.assignmentSort;
                        this.dataSource.paginator = this.assignmentPaginator;
                    }, 10)
                },
                error: error => {
                    console.error('Error fetching VisitAssignment data:', error);

                }
            }
        );
    }


}
