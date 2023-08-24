import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {link} from "../models/link";

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

    fetchUser(): Observable<any> {
        const _urlDetails = `${this.employeeUsers}`;
        return this._http.get<any>(_urlDetails);
    }



}
