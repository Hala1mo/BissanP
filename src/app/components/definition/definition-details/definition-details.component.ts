import {Component, OnInit, ViewChild} from '@angular/core';
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
import {AssignmentDetailsComponent} from "../../assignments/assignment-details.component";
import {ReportsService} from "../../../services/reports.service";
import {CanvasJS} from "@canvasjs/angular-charts";
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-details-def',
  templateUrl: './definition-details.component.html',
  styleUrls: ['./definition-details.component.css']
})

export class DefinitionDetailsComponent implements OnInit {

  currentDefinition: VisitDefinition | undefined;
  visitTypes: VisitType[] = [];

  displayedColumns: string[] = ['date', 'comment', 'user', 'status', 'actions'];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatPaginator) assignmentPaginator!: MatPaginator;
  @ViewChild(MatSort) assignmentSort!: MatSort;

  dataColChar: any[] = [];
  dataPieChart: any[] = [];

  //UNUSED
  id!: bigint;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private definitionService: DefinitionService,
    private reportsService: ReportsService,
    private matDialog: MatDialog,
  ) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.fetchDefinitionDetails(this.id);
        this.fetchDefinitionReports(this.id)
      }
    });
  }


  openAssignmentDetails(assignmentId: bigint) {
    this.matDialog.open(AssignmentDetailsComponent, {
      width: '50%',
      data: {
        assignmentId: assignmentId,
        locationId: this.currentDefinition?.location.id
      }
    }).afterClosed().subscribe(() => {
      this.fetchDefinitionDetails(this.id);
    })

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
        'types': this.sharedService.getVisitTypesAsList(),
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

  fetchDefinitionDetails(id: any) {
    this.definitionService.fetchDefinitionById(id).subscribe({
        next: response => {
          this.currentDefinition = response;
          this.dataSource = new MatTableDataSource(response.visitAssignments);

          setTimeout(() => {
            this.dataSource.sort = this.assignmentSort;
            this.dataSource.paginator = this.assignmentPaginator;
          }, 20)
        }
      }
    );
  }

  fetchDefinitionReports(id: any) {
    this.reportsService.fetchDefinitionReports(id).subscribe({
        next: response => {
          this.dataColChar = response.count;
          this.dataPieChart = response.percentages;
        }
      }
    );
  }


  renderChart() {
    // Create a new chart instance using CanvasJS
    let chart = new CanvasJS.Chart("chartContainer2", {
      animationEnabled: true,
      title: {
        text: "Forms Status"
      },
      theme: "light2",
      exportEnabled: true,
      axisY: {
        includeZero: true,
      },
      data: [{
        type: "column",
        dataPoints: this.dataColChar,
      }]
    });

    // Render the chart
    chart.render();
  }

  renderPieChart() {
    // Create a new chart instance using CanvasJS
    let chart = new CanvasJS.Chart("chartAreaContainer", {
      animationEnabled: true,
      title: {
        text: "status"
      },
      data: [{
        type: "doughnut",
        // startAngle: -90,
        indexLabel: "{name}: {y}",
        yValueFormatString: "##.##'%'",
        dataPoints: this.dataPieChart,
      }]
    });

    // Render the chart
    chart.render();
  }
}
