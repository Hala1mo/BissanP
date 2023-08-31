import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {link} from "../models/link";
import {VisitAssignment} from "../models/VisitAssignment";
import {id} from "@swimlane/ngx-charts";


@Injectable({
    providedIn: 'root'
})
export class AssignmentService {
    private _visitAssignment = link.urlIP+'/visit_assignments';
    private employeeUsers = link.urlIP+'/users/employees'

    constructor(private _http: HttpClient) {

    }

    findAssignmentById(id: bigint): Observable<any> {
        const _urlDetails = `${this._visitAssignment}/${id}`;
        return this._http.get<any>(_urlDetails);
    }



  assignCustomer(id: bigint, cusId: bigint): Observable<any> {
    const assignUrl = `${this._visitAssignment}/${id}/customers`;

    return this._http.put<any>(assignUrl, cusId);
  }

  deleteCustomer(assignmentId: bigint, customerId: bigint): Observable<VisitAssignment> {
      const deleteUrl = `${this._visitAssignment}/${assignmentId}/customers/${customerId}`;
      return this._http.delete<VisitAssignment>(deleteUrl).pipe();
  }

  assignUser(id: bigint, username: string): Observable<any> {
    const assignUrl = `${this._visitAssignment}/${id}/users`;
    console.log("ruruur",username);
    return this._http.put<any>(assignUrl, username);
  }

}
