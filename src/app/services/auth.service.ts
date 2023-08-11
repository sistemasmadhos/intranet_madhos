import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  host: string  = environment.api_url;

  constructor(private http:HttpClient) { }

  login(data){
    console.log('service', data);
    console.log('service22222', data);
    return this.http.post(this.host + 'login', data);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return token ? true : false;
  }
}
