import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error.error && error.error.message) {
          this.snackBar.open(error.error.message, 'close', {
            duration: 3000, panelClass: 'errorSnack'
          });
        } else if (error.message) {
          this.snackBar.open(error.message, 'close', {
            duration: 3000, panelClass: 'errorSnack'
          });
        }
        return throwError(error);
      })
    );
  }
}
