import { Injectable } from '@angular/core';
import {link} from "../models/link";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private dashUrl = link.urlIP + '/dash';
  private authUrl = link.urlIP + '/auth';

  constructor(private httpClient: HttpClient) {

  }

  fetchCounts(){
    return this.httpClient.get<any>(`${this.dashUrl}/count`).pipe();
  }

  fetchGraphs() {
    return this.httpClient.get<any>(`${this.dashUrl}/graph`).pipe();
  }

  fetchTables() {
    return this.httpClient.get<any>(`${this.authUrl}/reset_password`).pipe();
  }

  acceptPasswordResetRequest(requestId: bigint) {
    return this.httpClient.put<any>(`${this.authUrl}/reset_password/${requestId}`, '').pipe();
  }

  rejectPasswordResetRequest(requestId: bigint) {
    return this.httpClient.delete<any>(`${this.authUrl}/reset_password/${requestId}`).pipe();
  }
}
