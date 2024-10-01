import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent {

  mail: string = '';
  emailSended: boolean = false;
  sendDataLoading: boolean = false;
  BACKEND_URL: string = "http://127.0.0.1:8000";

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  /**
   * Initiates the password reset request process by sending the user's email to the backend.
   * Handles response and error scenarios.
   */
  passwordResetRequest() {
    const headers = this.createRequestHeaders();

    // Set loading state to true while sending data
    this.sendDataLoading = true;

    // Make HTTP POST request to send password reset email
    this.http.post(`${this.BACKEND_URL}/password_reset/`,
      { email: this.mail },
      { headers: headers }
    ).pipe(
      tap(response => this.handleSuccessResponse(response)),
      catchError(error => this.handleErrorResponse(error)),
      finalize(() =>{})
    ).subscribe();
  }

  /**
   * Creates the required HTTP headers for the password reset request.
   * @returns An instance of HttpHeaders with the necessary headers.
   */
  private createRequestHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  /**
   * Handles the successful password reset request response.
   * Sets the emailSended flag to true and resets loading state.
   * @param response The response from the backend (currently unused).
   */
  private handleSuccessResponse(response: any) {
    this.emailSended = true;
    this.sendDataLoading = false;
  }

  /**
   * Handles errors that occur during the password reset request.
   * Logs the error to the console and resets the loading state.
   * @param error The error encountered during the HTTP request.
   * @returns An observable that returns null to prevent breaking the stream.
   */
  private handleErrorResponse(error: any): Observable<null> {
    console.error('Error sending reset email:', error);
    this.sendDataLoading = false;
    return of(null); // Prevents the stream from breaking in case of error
  }

   /**
   * Navigates to the login page.
   */
   toLogin() {
    this.router.navigateByUrl('login');
  }
}

