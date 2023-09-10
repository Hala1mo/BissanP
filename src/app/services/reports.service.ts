import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {link} from "../models/link";

@Injectable({
  providedIn: 'root'
})

export class ReportsService {
  private reportsBaseUrl = link.urlIP + '/reports';
  private reportsNotStartedForms = link.urlIP + '/reports/forms/not_started';
  private reportsUndergoingForms = link.urlIP + '/reports/forms/under_going';
  private reportsCompletedForms = link.urlIP + '/reports/forms/completed';

  private _visitAssignment = link.urlIP + '/visit_assignments';
  private types_url = link.urlIP + '/reports/customers/count_by_type';
  private areas_url = link.urlIP + '/reports/customers/count-by-area';

  private definitionReports = link.urlIP + '/reports/visit_definitions';
  private customersReports = link.urlIP + '/reports/customers';


  constructor(private _http: HttpClient) {

  }


  fetchReports(): Observable<any> {
    const _urlDetails = `${this.reportsBaseUrl}/forms/all`;
    return this._http.get<any>(_urlDetails);
  }


  fetchNotStartedForms(): Observable<any> {
    const _urlDetails = `${this.reportsNotStartedForms}`;
    return this._http.get<any>(_urlDetails);
  }

  fetchUndergoingForms(): Observable<any> {
    const _urlDetails = `${this.reportsUndergoingForms}`;
    return this._http.get<any>(_urlDetails);
  }

  fetchCompletedForms(): Observable<any> {
    const _urlDetails = `${this.reportsCompletedForms}`;
    return this._http.get<any>(_urlDetails);
  }


  fetchAssignmentsByDate(): Observable<any> {
    const _urlDetails = `${this._visitAssignment}`;
    return this._http.get<any>(_urlDetails);
  }


  fetchAssignmentByDateBetween(from: string, to: string): Observable<any> {
    const _urlDetails = `${this.reportsBaseUrl}/visit_assignments?from=${from}&to=${to}`;
    return this._http.get<any>(_urlDetails);
  }

  fetchTypeChart(): Observable<any> {
    const _urlDetails = `${this.types_url}`;
    return this._http.get<any>(_urlDetails);
  }

  fetchAreaChart(): Observable<any> {
    const _urlDetails = `${this.areas_url}`;
    return this._http.get<any>(_urlDetails);
  }

  fetchDefinitionReports(id: bigint): Observable<any> {
    const _urlDetails = `${this.definitionReports}/${id}`;
    return this._http.get<any>(_urlDetails);
  }

  fetchCustomersReports(id: bigint): Observable<any> {
    const _urlDetails = `${this.customersReports}/${id}`;
    return this._http.get<any>(_urlDetails);
  }


  generateUserReports(fromDateString: string, toDateString: string) {
    const url = `${this.reportsBaseUrl}/user_performance?from=${fromDateString}&to=${toDateString}`

    return this._http.get<any>(url).pipe();
  }
}

