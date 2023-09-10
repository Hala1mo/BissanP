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

interface AssignmentDTO {
  date: string;
  comment: string;
  username: string;
}

interface simpleNameDTO {
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

  saveNewAssignmentToDefinition(assignment: any, definitionId: bigint): Observable<any> {
    const urlAssignment = `${this.visitDefinitionsURL}/${definitionId}/visit_assignments`;
    const newAssignment: AssignmentDTO = {
      date: assignment.date,
      comment: assignment.comment,
      username: assignment.username,
    };

    return this.http.post<any>(urlAssignment, newAssignment).pipe();
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.');
  }


  saveNewCity(cityForm: any) {
    const addPayload: simpleNameDTO = {
      name: cityForm.name,
    };

    return this.http.post<any>(this._city_url, addPayload).pipe(
      catchError(this.handleError)
    );
  }

  saveNewLocation(cityId: bigint, locationForm: any){
    const addPayload: simpleNameDTO = {
      name: locationForm.name
    }

    return this.http.post<any>(`${this._city_url}/${cityId}`, addPayload).pipe();
  }

  saveNewType(typeForm: any) {
    const addPayload: simpleNameDTO = {
      name: typeForm.name,
    };

    return this.http.post<any>(this.visitTypesURL, addPayload).pipe(
      catchError(this.handleError)
    );
  }
}
