import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-passwordchangeform',
  templateUrl: './passwordchangeform.component.html',
  styleUrls: ['./passwordchangeform.component.scss']
})
export class PasswordchangeformComponent {

  password: string = '';
  passwordconfirm: string = '';
  emailSended: boolean = false;
  succesfulSet: boolean = false;
  uid: string;
  token: string;
  BACKENDURL: string = "http://127.0.0.1:8000";

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute){

      this.uid = this.route.snapshot.paramMap.get('uid') || '';
      this.token = this.route.snapshot.paramMap.get('token') || '';
    }

  toLogin(){
    this.router.navigateByUrl('login')
  }

  passwordResetRequest(){
    this.emailSended = true
  }

  setNewPassword(){
  
  this.http.post(`${this.BACKENDURL}/reset/${this.uid}/${this.token}/`, { 
    new_password1: this.password, 
    new_password2: this.passwordconfirm 
  }).pipe(
    tap(response => {
      console.log("Passwort erfolgreich geändert.")
    }),
    catchError(error => {
      console.error('Error changing password:', error);
      throw error; // Rethrow the error if necessary
    }),
    finalize(() => {
      this.succesfulSet = true
      setTimeout(() => {
        this.toLogin()
      }, 3000)
    })
  ).subscribe();
  }
}
