import { HttpClient } from '@angular/common/http';
import {  Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  disableInput: boolean = false;
  wrongData: boolean = false;
  isErrorVisible: boolean = false;
  isEmailValid: boolean = false;
  passwordVisible: boolean = false;
  boundAdjustLayout: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
  ) { }

  /**
   * Lifecycle hook that runs when the component is initialized.
   * Currently does not perform any actions.
   */
  ngOnInit() { }


  /**
  * after Init checkScroll to hide LeftScrollArrows 
  * and only show RightArrows when enough Videos
  */
  ngAfterViewInit() {
    this.boundAdjustLayout = this.adjustLayout.bind(this);
    this.adjustLayout();
    window.addEventListener('resize', this.boundAdjustLayout);
  }


  togglePasswordVisibility(): void{
    this.passwordVisible = !this.passwordVisible
  }

  /**
   * Validates the email format using a regular expression.
   * @param email The email to be validated.
   * @returns `true` if the email is valid, `false` otherwise.
   */
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  /**
   * Navigates to the landing page.
   */
  toLandingPage() {
    this.router.navigateByUrl('');
  }

  /**
   * Navigates to the password reset page.
   */
  toResetPassword() {
    this.router.navigateByUrl('passwordreset');
  }

  /**
   * Attempts to log in the user with the provided email and password.
   * handles different szenarios
   */
  async login() {
    this.disableInput = true;
    try {
      this.wrongData = false;
      let resp: any = await this.loginWithEmailAndPassword();
      this.handleLoginResponse(resp);
    } catch (e) {
      this.handleLoginError(e);
    } finally {
      this.disableInput = false;
    }
  }
  
  /**
   * If successful, saves the token and user ID in localStorage and navigates to the main page.
   * @param resp Response Data from backend
   */
  handleLoginResponse(resp: any) {
    if (resp && resp.token) {
      localStorage.setItem('token', resp.token);
      this.userService.setLoginStatus(true);
      this.router.navigateByUrl(`main/${resp.token}/${resp.user_id}`);
    }
  }
  
  /**
   * Displays an error if login fails.
   * @param e error message
   */
  handleLoginError(e: any) {
    this.wrongData = true;
    this.resetLoginForm();
    console.error("Error", e);
  }
  
  /**
   * resets email & password input field
   */
  resetLoginForm() {
    this.email = '';
    this.password = '';
  }

  /**
   * Sends a POST request to log in the user with the provided email and password.
   * @returns A promise that resolves with the response from the server.
   */
  async loginWithEmailAndPassword() {
    const url = environment.baseURL + "/login/";
    const body = {
      "username": this.email,
      "password": this.password
    };
    return lastValueFrom(this.http.post(url, body));
  }

  /**
   * sets width of mainContainer, depends if its shown on desktop or mobilescreen
   */
  adjustLayout() {
    const logincontainer = document.querySelector('.loginMain')! as HTMLElement;
    if (window.innerWidth > document.documentElement.clientWidth) {
      logincontainer.style.width = "calc(100vw - 20px)";
    } else {
      logincontainer.style.width = "100vw";
    }
  }
}

