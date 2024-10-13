import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, finalize, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-passwordchangeform',
  templateUrl: './passwordchangeform.component.html',
  styleUrls: ['./passwordchangeform.component.scss']
})
export class PasswordchangeformComponent {

  password: string = '';
  passwordconfirm: string = '';
  passwordNotMatch: boolean = false;
  emailSended: boolean = false;
  succesfulSet: boolean = false;
  passwordVisible: boolean = false;
  passwordConfirmVisible: boolean = false;
  uid: string;
  token: string;
  BACKENDURL: string = "https://sportflixapi.naueka.de";

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    // Extracts the UID and token from the URL parameters
    this.uid = this.route.snapshot.paramMap.get('uid') || '';
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }


  togglePasswordVisibility(): void{
    this.passwordVisible = !this.passwordVisible
  }

  togglePasswordConfirmVisibility(): void{
    this.passwordConfirmVisible = !this.passwordConfirmVisible
  }

  /**
   * Simulates a password reset request and sets the emailSended flag.
   */
  passwordResetRequest() {
    this.emailSended = true;
  }

  /**
   * Sends the new password to the backend for password reset.
   * On success, it navigates the user to the login page after a delay.
   */
  setNewPassword() {
    if (this.passwordsMatch()) {
      this.passwordNotMatch = false
    this.http.post(`${this.BACKENDURL}/reset/${this.uid}/${this.token}/`, {
      new_password1: this.password,
      new_password2: this.passwordconfirm
    }).pipe(
      tap(response => this.handleSuccessResponse(response)),
      catchError(error => this.handleErrorResponse(error)),
      finalize(() => this.finalizePasswordChange())
    ).subscribe();
  } else {
    this.passwordNotMatch = true;
  }
  }


  /**
   * checks if the entered passwords match.
   * @returns a boolean indicating whether the password and confirmation match.
   */
  private passwordsMatch(): boolean {
    return this.password === this.passwordconfirm;
  }

  /**
   * Handles the successful password change response.
   * @param response The response from the backend (currently unused).
   */
  private handleSuccessResponse(response: any) {
    console.log("Password changed successfully.");
  }

  /**
   * Handles errors that occur during the password change request.
   * Logs the error to the console and rethrows it if necessary.
   * @param error The error encountered during the HTTP request.
   * @returns An observable that rethrows the error.
   */
  private handleErrorResponse(error: any): Observable<never> {
    console.error('Error changing password:', error);
    throw error; // Rethrow the error if needed for further handling
  }

  /**
   * Finalizes the password change process by setting the success flag and navigating to the login page after a delay.
   */
  private finalizePasswordChange() {
    this.succesfulSet = true;
    setTimeout(() => {
      this.toLogin();
    }, 3000);
  }


  /**
   * Navigates to the login page.
   */
  toLogin() {
    this.router.navigateByUrl('login');
  }
}
