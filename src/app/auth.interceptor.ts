import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Token aus dem Local Storage abrufen (hier als Beispiel)
    const authToken = localStorage.getItem('token');
    console.log(authToken)
    // Wenn der Token vorhanden ist, klonen wir die Anfrage und fügen den Token zum Header hinzu
    if (authToken) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Token ${authToken}`)
      });
      return next.handle(authReq);
    }

    // Wenn kein Token vorhanden ist, wird die Anfrage ohne Änderungen weitergeleitet
    return next.handle(req);
  }
}
