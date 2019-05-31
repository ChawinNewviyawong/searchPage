import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Response } from '../app/model/search';
import { environment } from '../environments/environment';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'API_KEY': 'byCqSJgvw6k2awJpOUhfsZbj'
});

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  constructor(private http: HttpClient) { }

  getLicense(juristicNo): Observable<Response[]> {
    const url = environment.url + '/client/search';
    const params = {
      juristicNo: juristicNo,
    };
    const httpOptions = {
      headers: headers,
      params: params
    };
    console.log(url);
    return this.http.get<Response[]>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${JSON.stringify(error.status)}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
