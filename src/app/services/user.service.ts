import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {link} from "../models/link";
import {User} from "../models/User";


export interface addCustomerTDO {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  accessLevel: string;
}

export interface editCustomerDTO {
  firstName: string;
  lastName: string;
  accessLevel: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = link.urlIP + '/users';
  private usersReports = link.urlIP + '/reports/users';

  constructor(private _http: HttpClient) {
  }

  fetchAllUsers(): Observable<any> {
    const url = `${this.usersUrl}/all`
    return this._http.get<any>(url);
  }

  saveNewUser(userJson: any) {
    // Sends a POST request to the server to save a new user
    const newUserPayload: addCustomerTDO = {
      username: userJson.username,
      firstName: userJson.firstName,
      lastName: userJson.lastName,
      password: userJson.password,
      confirmPassword: userJson.confirmPassword,
      accessLevel: userJson.accessLevel,
    };

    return this._http.post<any>(this.usersUrl, newUserPayload);
  }

  updateUserStatus(username: string): Observable<any> {
    const updateUrl = `${this.usersUrl}/${username}/endis`;

    return this._http.put<any>(updateUrl, '');
  }

  updateUser(username: string, updatedUserData: any): Observable<any> {
    const updateUrl = `${this.usersUrl}/${username}`;


    const editUserPayload: editCustomerDTO = {
      firstName: updatedUserData.firstName,
      lastName: updatedUserData.lastName,
      accessLevel: updatedUserData.accessLevel,
    };

    return this._http.put<any>(updateUrl, editUserPayload);
  }

  fetchUserReportsByUsername(username: string): Observable<any> {
    const Url = `${this.usersReports}/${username}`;
    return this._http.get<any>(Url);
  }

  fetchUserByUsername(username: string): Observable<any> {
    const Url = `${this.usersUrl}/${username}`;
    return this._http.get<any>(Url);
  }

  fetchEmployees(): Observable<any> {
    const _urlDetails = `${this.usersUrl}/employees`;
    return this._http.get<any>(_urlDetails);
  }

  searchUsers(name?: string, role?: string, enabled?: string) {
    let params = new HttpParams();

    if (name)
      params = params.set('name', name);
    if (role)
      params = params.set('role', role);
    if (enabled !== undefined)
      params = params.set('enabled', enabled);


    return this._http.get<User[]>(`${this.usersUrl}/search`, {params}).pipe();
  }

}

