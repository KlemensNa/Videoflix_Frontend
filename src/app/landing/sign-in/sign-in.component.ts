import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

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

  toLogin(){
    this.router.navigateByUrl('')
  }
  
}
