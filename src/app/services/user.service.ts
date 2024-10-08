import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private apiUrl: string = 'http://34.159.79.177/api/users/me';

  // BehaviorSubject to store and make status observable
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  private userSubject = new BehaviorSubject<any>(null);
  user$: Observable<any> = this.userSubject.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Retrieves the current user's token from localStorage.
   * @returns The token stored in localStorage.
   */
  getUserToken() {
    let json: any = localStorage.getItem('token')
    let token = json    

    return token
  }

  /**
   * Fetches the current user's data from the API.
   * Stores the data in a BehaviorSubject, which can be subscribed to.
   * @returns An Observable containing the user data.
   */
  // getCurrentUser(): Observable<any> {    
  //     this.http.get<any>(this.apiUrl).pipe(
  //       tap(user => this.userSubject.next(user)) // Store the data in the BehaviorSubject
  //     ).subscribe();
    
  //   return this.user$;
  // }


  getCurrentUser(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      tap(user => {
        this.userSubject.next(user); // Store the data in the BehaviorSubject
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  

  /**
   * Sets the user's login status (logged in or logged out).
   * @param status The new login status of the user (true for logged in, false for logged out).
   */
  setLoginStatus(status: boolean) {
    this.isLoggedIn.next(status);
  }
}
