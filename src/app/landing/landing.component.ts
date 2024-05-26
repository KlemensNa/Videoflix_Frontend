import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private router: Router){
    
  }

  toLoginPage(){
    this.router.navigateByUrl('login')
  }

  toRegister(){
    this.router.navigateByUrl('signIn')
  }
}
