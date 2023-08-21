import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DefinitionService {
  private VistUrl = 'http://10.10.33.91:8080/visit_definitions';
  private TypeUrl='http://10.10.33.91:8080/visit_types';

  constructor(private http: HttpClient) {}

  fetchDefinition(): Observable<any> {
    return this.http.get<any>(this.VistUrl).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  updateEnabledStatusDefinition(id: bigint): Observable<any> {
    const updateUrl = `${this.VistUrl}/${id}/endis`;

    return this.http.put<any>(updateUrl, {}).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  fetchTypesData(): Observable<any> {
    const typesUrl = `${this.TypeUrl}`; // Assuming you have a separate URL for fetching types
    return this.http.get<any>(typesUrl).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  addDefinition(defData: any): Observable<any> {
    return this.http.post<any>(this.VistUrl, defData).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.');
  }
  fetchdef(id: bigint): Observable<any> {
    const urlVisit = `${this.VistUrl}/${id}`;
    return this.http.get<any>(urlVisit);
  }
  updateVisitData(uuid: bigint, updatedVisitData: any): Observable<any> {
    const updateUrl = `${this.VistUrl}/${uuid}`; // Adjust the URL endpoint as needed
    return this.http.put<any>(updateUrl, updatedVisitData);
  }


  saveNewDefinition(defData: any) {
    return this.http.post<any>(this.VistUrl,defData).pipe(
      catchError(this.handleError)
    );
  }
}
