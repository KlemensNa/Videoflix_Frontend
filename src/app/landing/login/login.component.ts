import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  disableInput: boolean = false;
  isUsernameRequired: boolean = false;
  isPasswordRequired: boolean = false;
  isErrorVisible: boolean = false;
  isEmailValid: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }


  ngOnInit() {
    
  }

  onUsernameChange(value: string) {
    this.isEmailValid = this.validateEmail(value);
    this.isUsernameRequired = !this.isEmailValid; // Setzt isUsernameRequired auf true, wenn die E-Mail ungültig ist
  }

  onPasswordChange(value: string) {
    console.warn(this.isPasswordRequired)
    this.isPasswordRequired = value.length < 8; // Setzt isPasswordRequired auf true, wenn das Passwort weniger als 8 Zeichen hat
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  toLandingPage() {
    this.router.navigateByUrl('')
  }


  async loginWithEmailAndPassword(){
    const url = environment.baseURL + "/login/";
    const body = {
      "username": this.username,
      "password": this.password
    }
    return lastValueFrom(this.http.post(url, body))
  }


  async loginWithMailAndPassword() {

    this.disableInput = true;

    try {
      let resp = await this.loginWithEmailAndPassword();
      console.log(resp)
      // if (resp.ok) {
      //   let json = await resp.json();
      //   localStorage.setItem('token', json.token);
      //   this.router.navigateByUrl('main')
      // } else {
      //   this.username = '';
      //   this.password = ''
      // }
      this.disableInput = false;
    } catch (e) {
      console.error("Error", e)
    }



  }




}
