import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../../services/dashboard.service";

@Component({
  selector: 'app-mid-bar',
  templateUrl: './mid-bar.component.html',
  styleUrls: ['./mid-bar.component.css']
})
export class MidBarComponent implements OnInit {

  isLoaded: boolean = true;
  totalDailyForms: any;
  completedDailyForms: any;
  popularLocations: any;


  constructor(
    private dashService: DashboardService,
  ) {

  }

  ngOnInit(): void {
    this.dashService.fetchGraphs().subscribe({
      next: response => {
        this.totalDailyForms = response.total;
        this.completedDailyForms = response.completed;
        this.popularLocations = response.locations;
      }
    })
  }


}
