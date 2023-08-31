import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {City} from "../models/City";
import {VisitType} from "../models/VisitType";
import {link} from "../models/link";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private visitTypesURL = link.urlIP + '/visit_types';
  private citiesURL = link.urlIP + '/cities';

  constructor(
    private httpClient: HttpClient,
  ) {

  }

  //this service for sending data from component to component
  private dateDataSubject = new BehaviorSubject<any[]>([]);
  public dateData$ = this.dateDataSubject.asObservable();

  private citiesSubject = new BehaviorSubject<City[]>([]);
  private visitTypesSubject = new BehaviorSubject<VisitType[]>([]);

  updateDateData(dateData: any[]) {
    this.dateDataSubject.next(dateData);
  }

  updateCities() {
    this.fetchCities().subscribe({
      next: response => {
        this.citiesSubject.next(response)
      },
      error: error => {
        console.error("Shared Service 'Cities' Error", error);
      }
    });
  }

  getCitiesAsList() {
    return this.citiesSubject.getValue();
  }

  updateVisitTypes() {
    this.fetchVisitTypes().subscribe({
      next: response => {
        this.visitTypesSubject.next(response)
      },
      error: error => {
        console.error("Shared Service 'VisitTypes' Error", error);
      }
    });
  }

  getVisitTypesAsList() {
    return this.visitTypesSubject.getValue();
  }

  fetchVisitTypes(): Observable<VisitType[]> {
    return this.httpClient.get<any>(this.visitTypesURL).pipe();
  }

  fetchCities(): Observable<City[]> {
    return this.httpClient.get<any>(this.citiesURL).pipe();
  }


  fetchCityById(id: bigint): Observable<City> {
    return this.httpClient.get<any>(`${this.citiesURL}/${id}`).pipe();
  }
}