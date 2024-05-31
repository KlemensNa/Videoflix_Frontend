import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  isErrorVisible: boolean = false;
  signInPageOne: boolean = true;
  email: string =  "";
  username: string =  "";
  password: string =  "";

  constructor(  
                // private authService: AuthService,
                private fb: FormBuilder, 
                private router: Router,
                private http: HttpClient){

  }

  ngOnInit(){
    return
  }

  async signIn(){
    try {
      let resp = await this.signInWithEmailAndPassword();
      console.log("Successful")
      this.toLogin()
    } catch (e) {
      console.error("Error", e)
    }
  }

  async signInWithEmailAndPassword(){

    console.log(this.email)
    const url = environment.baseURL + "/register/";
    const body = {
      "email": this.email,
      "username": this.username,
      "password": this.password
    }
    return lastValueFrom(this.http.post(url, body))
  }

  toLogin(){
    this.router.navigateByUrl('login')
  }
  
}
