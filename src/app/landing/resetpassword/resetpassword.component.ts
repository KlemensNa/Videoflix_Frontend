import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent {

  mail: string = '';
  emailSended: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient){}

  toLogin(){
    this.router.navigateByUrl('login')
  }

  passwordResetRequest(){
    this.emailSended = true
  }

  

}
