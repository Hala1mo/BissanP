import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DefinitionService {
    private definitionsUrl = 'http://192.168.1.62:8080/visit_definitions';
    private typesUrl = 'http://192.168.1.62:8080/visit_types';

    constructor(private http: HttpClient) {
    }

    fetchDefinition(): Observable<any> {
        return this.http.get<any>(this.definitionsUrl).pipe(
            catchError(this.handleError) // Handle errors
        );
    }

    updateEnabledStatusDefinition(id: bigint): Observable<any> {
        const updateUrl = `${this.definitionsUrl}/${id}/endis`;

        return this.http.put<any>(updateUrl, {}).pipe(
            catchError(this.handleError) // Handle errors
        );
    }

    fetchTypesData(): Observable<any> {
        const typesUrl = `${this.typesUrl}`; // Assuming you have a separate URL for fetching types
        return this.http.get<any>(typesUrl).pipe(
            catchError(this.handleError) // Handle errors
        );
    }

    saveNewDefinition(defData: any): Observable<any> {
        return this.http.post<any>(this.definitionsUrl, defData).pipe(
            catchError(this.handleError) // Handle errors
        );
    }

    fetchDefinitionById(id: bigint): Observable<any> {
        const urlVisit = `${this.definitionsUrl}/${id}`;
        return this.http.get<any>(urlVisit);
    }

    updateVisitDefinition(id: bigint, updatedVisitData: any): Observable<any> {
        const updateUrl = `${this.definitionsUrl}/${id}`;

        return this.http.put<any>(updateUrl, updatedVisitData);
    }

    private handleError(error: any): Observable<never> {
        console.error('An error occurred:', error);
        return throwError('Something went wrong. Please try again later.');
    }
}
