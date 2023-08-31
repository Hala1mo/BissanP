import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {link} from "../models/link";


export interface DefinitionForm {
    name: string;
    description: string;
    frequency: number;
    allowRecurring: boolean;
    typeId: bigint;
    locationId: bigint;
}

interface AssignmentForm {
    date: string; // Change the type to match your use case
    comment: string;
}

interface addForm {
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class DefinitionService {
    private visitDefinitionsURL = link.urlIP + '/visit_definitions';
    private visitTypesURL = link.urlIP + '/visit_types';
    private _city_url = link.urlIP + '/cities';

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
        const editDefinitionPayload: DefinitionForm = {
            name: updatedVisitDefinition.name,
            description: updatedVisitDefinition.description,
            frequency: updatedVisitDefinition.frequency,
            allowRecurring: updatedVisitDefinition.allowRecurring,
            typeId: updatedVisitDefinition.typeId,
            locationId: updatedVisitDefinition.locationId,

        };
        const updateUrl = `${this.visitDefinitionsURL}/${definitionId}`;
        return this.http.put<any>(updateUrl, editDefinitionPayload);
    }

    saveNewDefinition(visitDefinition: any) {
        const addDefinitionPayload: DefinitionForm = {
            name: visitDefinition.name,
            description: visitDefinition.description,
            frequency: visitDefinition.frequency,
            allowRecurring: visitDefinition.allowRecurring,
            typeId: visitDefinition.typeId,
            locationId: visitDefinition.locationId,

        };
        return this.http.post<any>(this.visitDefinitionsURL, addDefinitionPayload).pipe(
            catchError(this.handleError)
        );
    }

    fetchTypesData(): Observable<any> {
        return this.http.get<any>(this.visitTypesURL).pipe(
            catchError(this.handleError)
        );
    }


    fetchCityData(): Observable<any> {
        return this.http.get<any>(this._city_url).pipe(
            catchError(this.handleError)
        );
    }

    saveNewAssignmentToDefinition(assignment: any, definitionId: bigint): Observable<any> {
        const urlAssignment = `${this.visitDefinitionsURL}/${definitionId}/assignments`;
        const newAssignment: AssignmentForm = {
            date: assignment.date,
            comment: assignment.comment,
        };

        return this.http.post<any>(urlAssignment, newAssignment).pipe();
    }

    private handleError(error: any): Observable<never> {
        console.error('An error occurred:', error);
        return throwError('Something went wrong. Please try again later.');
    }


    saveNewCity(cityForm: any) {

        const addPayload: addForm = {
            name: cityForm.name,
        };

        return this.http.post<any>(this._city_url, addPayload).pipe(
            catchError(this.handleError)
        );
    }

    saveNewType(typeForm: any) {

        const addPayload: addForm = {
            name: typeForm.name,
        };
        return this.http.post<any>(this.visitTypesURL, addPayload).pipe(
            catchError(this.handleError)
        );
    }
}
