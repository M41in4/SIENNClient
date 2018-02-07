import { Injectable } from '@angular/core';
import { Http, Headers,  Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Product } from '../../model/index';

const url = 'http://recruits.siennsoft.com/api/Products';

@Injectable()
export class ProductService {

  constructor(private http: Http) {}

  getProducts(): Observable<Product[]> {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    let options = new RequestOptions();
    let header = new Headers({'Content-Type': 'application/json'});
    header.append('Authorization', `Bearer ${user.token}`);
    options.headers = header;

    return this.http.get(url, options)
      .map((response: Response) => {
        return response.json() || {};
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    return Observable.throw(error.statusText);
  }
}
