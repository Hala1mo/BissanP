import { Injectable } from '@angular/core';
import {link} from "../models/link";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private dashUrl = link.urlIP + '/dash';

  constructor(private httpClient: HttpClient) {

  }

  fetchCounts(){
    return this.httpClient.get<any>(`${this.dashUrl}/count`).pipe();
  }

  fetchGraphs() {
    return this.httpClient.get<any>(`${this.dashUrl}/graph`).pipe();
  }
}
