import { Injectable } from '@angular/core';
import { CanActivate, Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private route: Router) { }
  canActivate(): boolean {
    const token = localStorage.getItem("token")
    if (token != null) {
      return true;
    } else {
      this.route.navigate(['login']);
      return false;
    }

  }
}
