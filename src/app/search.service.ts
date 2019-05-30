import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Search } from '../app/domain/search';
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

  // getLicense(){
  //   return this.http.get<any>('assets/mock/data/licenses-dev.json')
  //                   .toPromise()
  //                   .then(res => <Search[]>res.data)
  //                   .then(data => { return data; });
  // }

  // signin(credentials: any): Observable<any> {
  //   const body = JSON.stringify(credentials);
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   const options = new RequestOptions({ headers: headers });
  //   return this.http.post(this._signinURL, body, options)
  //       .map(res => {
  //         const data = res.json();
  //         //console.log("data : " + JSON.stringify(data));
  //         if (data.token) {
  //           // localStorage.setItem('id', data.id);
  //           localStorage.setItem('token', data.token);
  //           localStorage.setItem('apikey', data.key);
  //           localStorage.setItem('userName', data.doc.username);
  //           localStorage.setItem('firstname', data.doc.firstname);
  //           localStorage.setItem('lastname', data.doc.lastname);
  //           localStorage.setItem('orgId', data.doc.orgId);
  //           localStorage.setItem('appId', data.doc.appId);
  //         }
  //       })
  //       .catch(this.handleError);
  // }

  getLicense(juristicNo): Observable<Search[]> {
    const url = environment.url + '/client/search';
    const params = {
      juristicNo: '*'+juristicNo+'*',
    };
    const httpOptions = {
      headers: headers,
      params: params
    };
    console.log(url);
    return this.http.get<Search[]>(url, httpOptions)
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
