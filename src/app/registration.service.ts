import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private _users_url = 'http://10.10.33.91:8080/users'; // Update the URL to your server endpoint

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

  updateEnabledStatus(username: string): Observable<any> {
    const updateUrl = `${this._users_url}/${username}/endis`; // Adjust the URL endpoint as needed
    const body = "";

    return this._http.put<any>(updateUrl, body);
  }


}
