import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {link} from "../models/link";
import {VisitDefinition} from "../models/VisitDefinition";


export interface DefinitionForm {
  name: string;
  description: string;
  frequency: number;
  allowRecurring: boolean;
  typeId: bigint;
  locationId: bigint;
  question1?:string;
  question2?:string;
  question3?:string;
}

interface AssignmentDTO {
  date: string;
  comment: string;
  username: string;
}

interface typeDTO {
  name: string;
  i:number,
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
    return this.http.get<any>(`${this.visitDefinitionsURL}/all`).pipe(
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
      question1:visitDefinition.question1,
      question2:visitDefinition.question2,
      question3:visitDefinition.question3,

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

  saveNewLocation(cityId: bigint, locationForm: any) {
    const addPayload: simpleNameDTO = {
      name: locationForm.name
    }

    return this.http.post<any>(`${this._city_url}/${cityId}`, addPayload).pipe();
  }

  saveNewType(typeForm: any) {
    const addPayload: typeDTO = {
      name: typeForm.name,
      i:typeForm.i,
    };

    return this.http.post<any>(this.visitTypesURL, addPayload).pipe(
      catchError(this.handleError)
    );
  }

  searchDefinitions(name?: string, enabled?: string, recurring?: string, type?: string, city?: string, location?: string) {
    let params = new HttpParams();

    if (name)
      params = params.set('name', name);
    if (recurring)
      params = params.set('recurring', recurring);
    if (type)
      params = params.set('type', type);
    if (city)
      params = params.set('city', city);
    if (location)
      params = params.set('location', location);
    if (enabled !== undefined)
      params = params.set('enabled', enabled);

    return this.http.get<VisitDefinition[]>(`${this.visitDefinitionsURL}/search`, {params}).pipe();

  }
}
