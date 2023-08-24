import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {link} from "../models/link";

@Injectable({
    providedIn: 'root'
})
export class DefinitionService {
    private visitDefinitionsURL = link.urlIP+'/visit_definitions';
    private visitTypesURL = link.urlIP+'/visit_types';

    constructor(private http: HttpClient) {
    }

    fetchAllDefinitions(): Observable<any> {
        return this.http.get<any>(this.visitDefinitionsURL).pipe(
            catchError(this.handleError)
        );
    }

    fetchDefinitionById(id: bigint): Observable<any> {
        const getUrl = `${this.visitDefinitionsURL}/${id}`
        return this.http.get<any>(getUrl).pipe(
            catchError(this.handleError)
        );
    }

    updateDefinitionEnabledStatus(id: bigint): Observable<any> {
        const updateUrl = `${this.visitDefinitionsURL}/${id}/endis`;
        return this.http.put<any>(updateUrl, '').pipe(
            catchError(this.handleError) // Handle errors
        );
    }

    updateVisitDefinition(definitionId: bigint, updatedVisitDefinition: any): Observable<any> {
        const updateUrl = `${this.visitDefinitionsURL}/${definitionId}`;
        return this.http.put<any>(updateUrl, updatedVisitDefinition);
    }

    saveNewDefinition(visitDefinition: any) {
        return this.http.post<any>(this.visitDefinitionsURL, visitDefinition).pipe(
            catchError(this.handleError)
        );
    }

    fetchTypesData(): Observable<any> {
        return this.http.get<any>(this.visitTypesURL).pipe(
            catchError(this.handleError)
        );
    }

    saveNewAssignmentToDefinition(assignment: any, definitionId: bigint): Observable<any> {
        const urlAssignment = `${this.visitDefinitionsURL}/${definitionId}/assignments`;
        return this.http.post<any>(urlAssignment, assignment).pipe();
    }

    private handleError(error: any): Observable<never> {
        console.error('An error occurred:', error);
        return throwError('Something went wrong. Please try again later.');
    }


}
