import { Injectable } from '@angular/core';
import {link} from "../models/link";
import {HttpClient} from "@angular/common/http";
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

}
