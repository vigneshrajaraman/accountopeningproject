import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from 'src/app/model/token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = "http://localhost:8085";
  //url ="https://accountopeningproject.herokuapp.com"
  constructor(private http: HttpClient) { }
 
  login(userDetails):Observable<Token>{
    console.log(userDetails)
    return this.http.post<Token>(this.url+"/login", userDetails)
  }

}
