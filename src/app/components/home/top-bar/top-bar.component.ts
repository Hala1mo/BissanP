import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../../services/dashboard.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  isLoaded: boolean = false;

  completedForms: number = 0;
  totalForms: number = 0;
  canceledForms: number = 0;
  customersThisMonth: number = 0;
  undergoingForms: number = 0;

  constructor(
    private dashService: DashboardService,
  ) {

  }

  ngOnInit(): void {
    this.dashService.fetchCounts().subscribe({
      next: (response: any) => {
        this.isLoaded = true;

        this.completedForms = response.completedToday;
        this.totalForms = response.totalToday;
        this.canceledForms = response.canceledFormsThisWeek;
        this.customersThisMonth = response.newCustomersThisMonth;
        this.undergoingForms = response.currentlyUndergoing;
      }
    })
  }
}
