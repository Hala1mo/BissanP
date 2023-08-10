import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private _users_url = 'http://10.10.33.91:8080/users';
  private _customers_url = 'http://10.10.33.91:8080/customers';
  private _contacts_url = 'http://10.10.33.91:8080/contacts';



  constructor(private _http: HttpClient) {}

  fetchUserData(): Observable<any> {
    // Send a GET request to the server to fetch user data
    return this._http.get<any>(this._users_url);
  }



  registerUser(userData: any){
    return this._http.post<any>(this._users_url,userData)
      .pipe(
      );
  }


  registerCustomer(customerData: any){
    return this._http.post<any>(this._customers_url,customerData)
      .pipe(
      );
  }

  updateEnabledStatus(username: string): Observable<any> {
    const updateUrl = `${this._users_url}/${username}/endis`; // Adjust the URL endpoint as needed
    const body = "";

    return this._http.put<any>(updateUrl, body);
  }

  updateEnabledStatusCustomer(id:bigint): Observable<any> {
    const updateUrl = `${this._customers_url}/${id}/endis`; // Adjust the URL endpoint as needed
    const body = "";

    return this._http.put<any>(updateUrl, body);
  }

  updateEnabledStatusContact(id:bigint): Observable<any> {
    const updateUrl = `${this._contacts_url}/${id}/endis`; // Adjust the URL endpoint as needed
    const body = "";

    return this._http.put<any>(updateUrl, body);
  }



  updateUserData(username: string, updatedUserData: any): Observable<any> {
    const updateUrl = `${this._users_url}/${username}`; // Adjust the URL endpoint as needed

    return this._http.put<any>(updateUrl, updatedUserData);
  }


  fetchCustomerData(): Observable<any> {
    // Send a GET request to the server to fetch user data
    return this._http.get<any>(this._customers_url);
  }


  fetchCustomerDetails(id:bigint):  Observable<any>{
    const _urlDetails=`${this._customers_url}/${id}`;
    return this._http.get<any>(_urlDetails);
  }

  AddnewContact(id:bigint,contactDetails:any){
    const _urlDetails=`${this._customers_url}/${id}/contacts`;
    return this._http.post<any>(_urlDetails,contactDetails)
      .pipe(
      );
  }

  updateContactData(conId:bigint, updatedUserData: any): Observable<any> {
    const updateUrl = `${this._contacts_url}/${conId}`; // Adjust the URL endpoint as needed

    return this._http.put<any>(updateUrl, updatedUserData);
  }

  updateCustomerData(uuid: bigint, updatedCustomerData: any): Observable<any> {
    const updateUrl = `${this._customers_url}/${uuid}`; // Adjust the URL endpoint as needed

    return this._http.put<any>(updateUrl, updatedCustomerData);
  }
}
