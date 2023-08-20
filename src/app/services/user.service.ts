import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users_url = 'http://192.168.1.62:8080/users';

  constructor(private _http: HttpClient) {
  }

  getAllUsers(): Observable<any> {
    // Send a GET request to the server to fetch user data
    return this._http.get<any>(this._users_url);
  }

  saveNewUser(userJson: any) {
    // Sends a POST request to the server to save a new user
    return this._http.post<any>(this._users_url, userJson);
  }

  updateUserStatus(username: string): Observable<any> {
    const updateUrl = `${this._users_url}/${username}/endis`;

    return this._http.put<any>(updateUrl, '');
  }

  updateUser(username: string, updatedUserData: any): Observable<any> {
    const updateUrl = `${this._users_url}/${username}`;

    return this._http.put<any>(updateUrl, updatedUserData);
  }

  searchUsers(query: string): Observable<any> {
    const _urlDetails = `${this._users_url}/search?query=${query}`;
    return this._http.get<any>(_urlDetails);
  }
}
