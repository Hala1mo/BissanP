import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {link} from "../models/link";

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private reportss =link.urlIP+ '/reports';
  private reports = link.urlIP+'/reports/forms/all';
  private notstarted = link.urlIP+'/reports/forms/not_started';
  private undergoing = link.urlIP+'/reports/forms/under_going';
  private completed = link.urlIP+'/reports/forms/completed';
  private _visitAssignment = link.urlIP+'/visit_assignments';
  private _customers_url = link.urlIP+'/customers';
  private types_url=link.urlIP+'/reports/customers/countByType';
  private areas_url=link.urlIP+'/reports/customers/countByArea';

  private definitionReports=link.urlIP+'/reports/visit_definitions';
  private customersReports=link.urlIP+'/reports/customers';



  private customers = 'http://10.10.33.91:8080/reports/customers';

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



  fetchDateData(from: string,to:string): Observable<any> {
    const _urlDetails = `${this.reportss}/visit_assignments?from=${from}&to=${to}`;
    return this._http.get<any>(_urlDetails);
  }

  getCustomers(): Observable<any> {
    const _urlDetails = `${this._customers_url}/assignment`;
    return this._http.get<any>(_urlDetails);
  }

  getCustomerDate(id:bigint): Observable<any> {
    const _urlDetails = `${this.customers}/${id}`;
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


  fetchDefinitionReports(id:bigint): Observable<any> {
    const _urlDetails = `${this.definitionReports}/${id}`;
    return this._http.get<any>(_urlDetails);
  }

  fetchCustomersReports(id:bigint): Observable<any> {
    const _urlDetails = `${this.customersReports}/${id}`;
    return this._http.get<any>(_urlDetails);
  }



}

