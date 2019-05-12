import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Search } from '../app/domain/search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getLicense(){
    return this.http.get<any>('assets/mock/data/licenses-dev.json')
                    .toPromise()
                    .then(res => <Search[]>res.data)
                    .then(data => { return data; });
  }

}
