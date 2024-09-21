import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passwordchangeform',
  templateUrl: './passwordchangeform.component.html',
  styleUrls: ['./passwordchangeform.component.scss']
})
export class PasswordchangeformComponent {

  password: string = '';
  passwordconfirm: string = '';
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

  setNewPassword(){
    
  }
}
