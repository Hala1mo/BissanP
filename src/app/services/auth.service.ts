import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, distinctUntilChanged, map, Observable, tap} from "rxjs";
import {link} from "../models/link";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentAuthenticatedSubject = new BehaviorSubject<boolean>(true);
  public currentAuth = this.currentAuthenticatedSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  public isAuthenticated = this.currentAuth.pipe(map((isAuth) => isAuth));

  private baseUrl = link.urlIP + '/auth';

  constructor(
    private http: HttpClient,
  ) {

  }

  login(cred: { username: string, password: string }): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, cred).pipe(
      tap({
          next: () => {
            this.currentAuthenticatedSubject.next(true);
          },
          error: () => {
            this.currentAuthenticatedSubject.next(false);
          }
        }
      )
    )
  }

}
