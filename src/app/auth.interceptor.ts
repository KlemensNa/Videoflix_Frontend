import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const authToken = localStorage.getItem('token');
  
    if (authToken) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Token ${authToken}`)
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const token = localStorage.getItem('token');
    
  //   // Überprüfen, ob es sich um den Login-Endpunkt handelt
  //   if (req.url.includes('/login') || req.url.includes('/register')) {
  //     return next.handle(req);  // Keine Token hinzufügen
  //   }
  
  //   if (token) {
  //     const cloned = req.clone({
  //       headers: req.headers.set('Authorization', 'Bearer ' + token)
  //     });
  //     console.log(cloned)
  //     return next.handle(cloned);
  //   } else {
  //     return next.handle(req);
  //   }
  // }
}
