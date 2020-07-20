import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppServiceService } from './app-service.service';

@Injectable({
  providedIn: 'root'
})
export class CountService {
  verifier;
  rework;
  constructor(private service:AppServiceService) {
    this.verifier = new BehaviorSubject<Number>(0);
    this.rework = new BehaviorSubject<Number>(0);
  }
  getverifierCount(): Observable<Number> {
    return this.verifier.asObservable();
  }
  setverifierCount(data): void {
    this.verifier.next(data);
  }

  getReworkCount(): Observable<Number> {
    return this.rework.asObservable();
  }
  setReworkCount(data): void {
    this.rework.next(data); 
  }
}
