import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private reports = 'http://10.10.33.91:8080/reports/forms/all';
  private notstarted = 'http://10.10.33.91:8080/reports/forms/not_started';
  private undergoing = 'http://10.10.33.91:8080/reports/forms/under_going';
  private completed = 'http://10.10.33.91:8080/reports/forms/completed';


  constructor(private _http: HttpClient) {
  }


  fetchReports(): Observable<any> {
    const _urlDetails = `${this.reports}`;
    return this._http.get<any>(_urlDetails);
  }


  notStarted(): Observable<any> {
    const _urlDetails = `${this.notstarted}`;
    return this._http.get<any>(_urlDetails);
  }

  underGoing(): Observable<any> {
    const _urlDetails = `${this.undergoing}`;
    return this._http.get<any>(_urlDetails);
  }

  Completed(): Observable<any> {
    const _urlDetails = `${this.undergoing}`;
    return this._http.get<any>(_urlDetails);
  }
}

