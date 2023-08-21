import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'http://10.10.33.91:8080/users';

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
}
