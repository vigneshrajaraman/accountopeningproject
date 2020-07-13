import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
  useClass: InterceptorService,

})
export class InterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem("token");
    var req;
    console.log(token)
    if (token) {
      req = request.clone({ headers: request.headers.set('Authorization', token) })
    }
    else{
      req= request.clone();
    }
    return next.handle(req);
  }
}
