import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../services/auth.service';
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
  isUsernameRequired: boolean = false;
  isPasswordRequired: boolean = false;
  isErrorVisible: boolean = false;
  isEmailValid: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
  ) { }


  ngOnInit() {
    
  }

  onEmailChange(value: string) {
    this.isEmailValid = this.validateEmail(value);
    this.isUsernameRequired = !this.isEmailValid; // Setzt isUsernameRequired auf true, wenn die E-Mail ungültig ist
  }

  onPasswordChange(value: string) {
    this.isPasswordRequired = value.length < 8; // Setzt isPasswordRequired auf true, wenn das Passwort weniger als 8 Zeichen hat
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  toLandingPage() {
    this.router.navigateByUrl('')
  }

  toResetPassword(){
    this.router.navigateByUrl('passwordreset')
  }


  async login() {

    this.disableInput = true;
    try {
      this.wrongData = false;
      let resp: any = await this.loginWithEmailAndPassword();

      if (resp && resp.token) {
        console.log(resp)
        localStorage.setItem('token', resp.token);
        this.userService.setLoginStatus(true)
        this.router.navigateByUrl(`main/${resp.token}/${resp.user_id}`)
      } else {
        this.email = '';
        this.password = ''
      }
      this.disableInput = false;
    } catch (e) {
      this.wrongData = true;
      this.disableInput = false;
      console.error("Error", e)
    }
  }


  async loginWithEmailAndPassword(){
    const url = environment.baseURL + "/login/";
    const body = {
      "username": this.email,
      "password": this.password
    }
    return lastValueFrom(this.http.post(url, body))
  }  

}
