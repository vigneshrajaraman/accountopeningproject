import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptor.service';

export const HttpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass:InterceptorService , multi: true },
  ];