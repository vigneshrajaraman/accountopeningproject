import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeType } from 'src/app/model/employeeType';
import { CardType } from 'src/app/model/cardType';
import { AccountType } from 'src/app/model/accountType';
import { Application } from 'src/app/model/application';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  url = "http://localhost:8085";
  //url ="https://accountopeningproject.herokuapp.com"
  constructor(private http: HttpClient) { }

  getAllEmployeeType() {
    return this.http.get<EmployeeType[]>(this.url + "/dataentry/getAllEmployeeType")
  }
  getAllCardType() {
    return this.http.get<CardType[]>(this.url + "/dataentry/getAllCardType")
  }
  getAllAccountType() {
    return this.http.get<AccountType[]>(this.url + "/dataentry/getAllAccountType")
  }
  insertApplication(data) {
    return this.http.post<Application>(this.url + "/dataentry/insertApplication", data)
  }
  getAllVerifierData() {
    return this.http.get<Application[]>(this.url + "/dataentry/getAllSubmitApplication");
  }
  setAllVerifierStatus(data) {
    return this.http.put<Application>(this.url + "/dataentry/verfierStatus", data);
  }
  getAllReworkData() {
    return this.http.get<Application[]>(this.url + "/dataentry/getAllReworkData");
  }
  updateApplication(data){
    console.log("Service Request",data)
    return this.http.put<Application>(this.url +"/dataentry/updateApplication", data);
  }
  getCountRework(){
    return this.http.get<Number>(this.url + "/dataentry/getCountRework");
  }
  getCountVerifier(){
    return this.http.get<Number>(this.url + "/dataentry/getCountVerifier");
  }
  search(data){
    return this.http.patch<Application[]>(this.url + "/dataentry/Search", data);
  }
}
