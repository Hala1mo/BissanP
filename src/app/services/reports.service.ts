import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private reportss = 'http://10.10.33.91:8080/reports';
  private reports = 'http://10.10.33.91:8080/reports/forms/all';
  private notstarted = 'http://10.10.33.91:8080/reports/forms/not_started';
  private undergoing = 'http://10.10.33.91:8080/reports/forms/under_going';
  private completed = 'http://10.10.33.91:8080/reports/forms/completed';
  private _visitAssignment = 'http://10.10.33.91:8080/visit_assignments';

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
    const _urlDetails = `${this.completed}`;
    return this._http.get<any>(_urlDetails);
  }


  getDate(): Observable<any> {
    const _urlDetails = `${this._visitAssignment}`;
    return this._http.get<any>(_urlDetails);
  }

  // getCustomer(): Observable<any> {
  //   const _urlDetails = `${this._visitAssignment}/AllDistinctAssignment}`;
  //   return this._http.get<any>(_urlDetails);
  // }

  fetchDateData(from: string,to:string): Observable<any> {

    const _urlDetails = `${this.reportss}/visit_assignment/(${from}/${to})`;
    return this._http.get<any>(_urlDetails);
  }

}

