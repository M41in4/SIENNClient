import { Injectable } from '@angular/core';
import { Http, Headers,  Response, RequestOptions } from '@angular/http';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

const url = 'http://recruits.siennsoft.com/api/Jwt';

@Injectable()
export class AuthenticationService {

  public token: string;

  constructor(private http: Http) {
      // set token if saved in local storage
      var token = JSON.parse(localStorage.getItem('currentUser'));
      this.token = token;
  }

  login(username: string, password: string): Observable<boolean> {

    const formData: FormData = new FormData();
    formData.append('UserName', username);
    formData.append('Password', password);

    return this.http.post(url, formData)
    .map((response: Response) => {
      // login successful if there's a jwt token in the response
      let token = response.json().access_token;
      if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

          // return true to indicate successful login
          return true;
      } else {
          // return false to indicate failed login
          return false;
      }
    }).catch(this.handleError);
  }

  logout(): void {
      // clear token remove user from local storage to log user out
      this.token = null;
      localStorage.removeItem('currentUser');
  }

  private handleError(error: Response | any) {
    return Observable.throw(error._body);
  }
}
