import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

  constructor(private router: Router){}

  /**
   * sets automatically a five second countdown and redirect to Login
   */
  ngOnInit(){
    setTimeout(() => {
      this.toLogin()
    }, 5000)
  }

  /**
   * redirect to Login
   */
  toLogin(){
    this.router.navigateByUrl('login')
  }
}
