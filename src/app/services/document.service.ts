import { Injectable } from '@angular/core';
import {link} from "../models/link";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents = link.urlIP + '/documents';
  constructor(private _http: HttpClient) {

  }

  fetchPaymentDetails(): Observable<any> {
    const _urlDetails = `${this.documents}/receipts`;
    return this._http.get<any>(_urlDetails);
  }

  searchPayments(customerId?: string, username?: string,from?:string,to?:string) {
    let params = new HttpParams();

    if (username)
      params = params.set('user', username);
    if (customerId)
      params = params.set('customer', customerId);
    if (from && to) {
      params = params.set('from', from);
      params = params.set('to', to);
    }
    return this._http.get<any>(`${this.documents}/receipts/search`, {params}).pipe();
  }

}
