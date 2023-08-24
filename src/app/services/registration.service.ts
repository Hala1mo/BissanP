import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {link} from "../models/link";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {


  private _customers_url = link.urlIP+'/customers';
  private _contacts_url = link.urlIP+'/contacts';
  private _city_url = link.urlIP+'/city';


  constructor(private _http: HttpClient) {
  }


  registerCustomer(customerData: any) {
    return this._http.post<any>(this._customers_url, customerData)
      .pipe(
      );
  }

  updateEnabledStatusCustomer(id: bigint): Observable<any> {
    const updateUrl = `${this._customers_url}/${id}/endis`; // Adjust the URL endpoint as needed
    const body = "";

    return this._http.put<any>(updateUrl, body);
  }

  updateEnabledStatusContact(id: bigint): Observable<any> {
    const updateUrl = `${this._contacts_url}/${id}/endis`; // Adjust the URL endpoint as needed
    const body = "";

    return this._http.put<any>(updateUrl, body);
  }

  fetchCustomerData(): Observable<any> {
    // Send a GET request to the server to fetch user data
    return this._http.get<any>(this._customers_url);
  }


  AddnewContact(id: bigint, contactDetails: any) {
    const _urlDetails = `${this._customers_url}/${id}/contacts`;
    return this._http.post<any>(_urlDetails, contactDetails)
      .pipe(
      );
  }

  updateContactData(conId: bigint, updatedUserData: any): Observable<any> {
    const updateUrl = `${this._contacts_url}/${conId}`; // Adjust the URL endpoint as needed

    return this._http.put<any>(updateUrl, updatedUserData);
  }

  updateCustomerData(id: bigint, updatedCustomerData: any): Observable<any> {
    const updateUrl = `${this._customers_url}/${id}`; // Adjust the URL endpoint as needed

    return this._http.put<any>(updateUrl, updatedCustomerData);
  }

  fetchCustomerDetails(id: bigint): Observable<any> {
    const _urlDetails = `${this._customers_url}/${id}`;
    return this._http.get<any>(_urlDetails);
  }

  searchCustomers(query: string): Observable<any> {
    const _urlDetails = `${this._customers_url}/search?query=${query}`;
    return this._http.get<any>(_urlDetails);
  }

  fetchCityData(): Observable<any> {
    return this._http.get<any>(this._city_url);
  }
}
