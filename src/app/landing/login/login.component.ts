import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  isErrorVisible: boolean = false;

  constructor(  
                // private authService: AuthService,
                private fb: FormBuilder, 
                private router: Router){

  }

  ngOnInit(){
    this.form.valueChanges.subscribe(() => {
      this.isErrorVisible = this.form.invalid; // isErrorVisible wird true, wenn das Formular ungültig ist, andernfalls false
    });
  }

  toLandingPage(){
    this.router.navigateByUrl('landing')
  }

  async login(){
    // let user = await this.authService.login(this.form.value.username, this.form.value.password);
    // if(!user){
    //   alert('Invalid username or password')
    // } else {
    //   this.router.navigateByUrl('/admin')
    // }
  }

 


}
