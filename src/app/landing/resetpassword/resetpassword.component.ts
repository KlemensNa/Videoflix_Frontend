import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, of, tap } from 'rxjs';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent {

  mail: string = '';
  emailSended: boolean = false;
  BACKEND_URL: string = "http://127.0.0.1:8000"

  constructor(
    private router: Router,
    private http: HttpClient) { }

  toLogin() {
    this.router.navigateByUrl('login')
  }

  passwordResetRequest() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
      
  this.http.post(`${this.BACKEND_URL}/password_reset/`, 
    { email: this.mail }, 
    { headers: headers }
  ).pipe(
    tap(response => {
      this.emailSended = true; // Handle successful response
    }),
    catchError(error => {
      console.error('Error sending reset email:', error);
      return of(null); // Handle error without breaking the stream
    }),
    finalize(() => {
      // Optional cleanup or final actions
    })
  ).subscribe();
}

  

}
