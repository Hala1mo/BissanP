import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {


  //this service for sending data from component to component
  private dateDataSubject = new BehaviorSubject<any[]>([]);
  public dateData$ = this.dateDataSubject.asObservable();

  updateDateData(dateData: any[]) {
    this.dateDataSubject.next(dateData);
  }
  constructor() { }
}
