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

  constructor(private router: Router, private userService: UserService) {

  }

  ngOnInit() {
    let token = this.userService.getUserToken()
    if (token != null) {
      this.userService.setLoginStatus(true)
    }    
  }


  ngAfterViewInit() {
    window.addEventListener('resize', this.adjustLayout.bind(this));
    this.adjustLayout(); // Call it here after the view is initialized
  }


  ngOnDestroy(){
    window.removeEventListener('resize', this.adjustLayout.bind(this));
  }


  toLoginPage() {
    this.router.navigateByUrl('login')
  }

  toRegister() {
    this.router.navigateByUrl('signIn')
  }

  hasScrollbar() {
    return window.innerWidth > document.documentElement.clientWidth;
  }


  /**
   * adjust screen width, depend on scrollbar
   * nice to have because tablets dont have a scrollbar,but little laptops have
   */
  adjustLayout() {
    const landingMain = document.querySelector('.landingMain')! as HTMLElement;
    if (window.innerWidth > document.documentElement.clientWidth) {
        landingMain.style.width = "calc(100vw - 20px)";
    } else {
        landingMain.style.width = "100vw";
    }
}
}
