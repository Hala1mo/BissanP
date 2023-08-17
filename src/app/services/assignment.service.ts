import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  private _visitDefinition = 'http://10.10.33.91:8080/visit_definitions';
  private _visitAssignment = 'http://10.10.33.91:8080/visit_assignments';
  private employeeUsers='http://10.10.33.91:8080/users/employees'

  constructor(private _http: HttpClient) {
  }

  fetchDefinitionDetails(id: bigint): Observable<any> {
    const _urlDetails = `${this._visitDefinition}/${id}`;
    return this._http.get<any>(_urlDetails);
  }

  AddAssignment(Data: any, id: bigint) {
    const urlAssignment = `${this._visitDefinition}/${id}/assignments`;
    return this._http.post<any>(urlAssignment, Data)
      .pipe(
      );
  }


  fetchAssignmentsDetails(id: bigint): Observable<any>{
    const _urlDetails = `${this._visitAssignment}/${id}`;
    return this._http.get<any>(_urlDetails);
  }

  AddCustomer(customerId: any, assignmentId: bigint) {
    const urlAssignment = `${this._visitAssignment}/${assignmentId}/customers`;
    return this._http.post<any>(urlAssignment, customerId)
      .pipe(
      );
  }


  fetchUser(): Observable<any>{
    const _urlDetails = `${this.employeeUsers}`;
    return this._http.get<any>(_urlDetails);
  }

  AddUser(userId: any, assignmentId: bigint) {
    const urlAssignment = `${this._visitAssignment}/${assignmentId}/users`;
    return this._http.post<any>(urlAssignment, userId)
      .pipe(
      );
  }


}
