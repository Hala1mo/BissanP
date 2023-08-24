import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {link} from "../models/link";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = link.urlIP+'/users';
  private usersReports = link.urlIP+'/reports/users';
  constructor(private _http: HttpClient) {
  }

  getAllUsers(): Observable<any> {
    // Send a GET request to the server to fetch user data
    return this._http.get<any>(this.usersUrl);
  }

  saveNewUser(userJson: any) {
    // Sends a POST request to the server to save a new user
    return this._http.post<any>(this.usersUrl, userJson);
  }

  updateUserStatus(username: string): Observable<any> {
    const updateUrl = `${this.usersUrl}/${username}/endis`;

    return this._http.put<any>(updateUrl, '');
  }

  updateUser(username: string, updatedUserData: any): Observable<any> {
    const updateUrl = `${this.usersUrl}/${username}`;

    return this._http.put<any>(updateUrl, updatedUserData);
  }

  searchUsers(query: string): Observable<any> {
    const _urlDetails = `${this.usersUrl}/search?query=${query}`;
    return this._http.get<any>(_urlDetails);
  }

  getUserReports(username:string): Observable<any> {
    const Url = `${this.usersReports}/${username}`;
    return this._http.get<any>(Url);
  }

  getUserData(username:string): Observable<any> {
    const Url = `${this.usersUrl}/${username}`;
    return this._http.get<any>(Url);
  }




}
