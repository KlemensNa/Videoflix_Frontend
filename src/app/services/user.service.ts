import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = 'http://127.0.0.1:8000/api/users/me';

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  private userSubject = new BehaviorSubject<any>(null);
  user$: Observable<any> = this.userSubject.asObservable();

  constructor(private http: HttpClient) { }

  getUserToken(){
    let json:any = localStorage.getItem('token')
    let token = json    

    return token
  }


  getCurrentUser(): Observable<any> {    
      this.http.get<any>(this.apiUrl).pipe(
        tap(user => this.userSubject.next(user)) // Speichere die Daten im BehaviorSubject
      ).subscribe();
    
    return this.user$;
  }

  // Falls notwendig, eine Funktion zum expliziten Neuladen des Users
  refreshUser() {
    this.http.get<any>(this.apiUrl).pipe(
      tap(user => this.userSubject.next(user))
    ).subscribe();
  }


  setLoginStatus(status: boolean) {
    this.isLoggedIn.next(status);
    console.log(this.isLoggedIn)
  }
}
