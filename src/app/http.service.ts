import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Observer } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

export interface DataForm {
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class HttpService {

  private urlApi = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  get(){
    // return this.http.get(this.urlApi)
    //   .pipe(
    //     catchError(this.handleError)
    //   );
    return this.http.post(this.urlApi + '/getLicense', '', httpOptions)
    // console.log(entitynumber + " " + fullname + " " + licensecategory + " " + licenseform + " " + licensenumber + " " + servicecategory + " " + yearcategory)
  }

  getJson(json) {
    console.log(json);
  }

  post(params) {
    return this.http.post(this.urlApi, params, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    }
    else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }

    return throwError(
      'Something bad happened; please try again later.'
    )
  }
}
