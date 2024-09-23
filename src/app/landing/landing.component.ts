import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private router: Router, private userService: UserService){
    
  }

  ngOnInit(){
    let token = this.userService.getUserToken()
    if(token != null){
      this.userService.setLoginStatus(true)
    }
  }

  toLoginPage(){
    this.router.navigateByUrl('login')
  }

  toRegister(){
    this.router.navigateByUrl('signIn')
  }
}
