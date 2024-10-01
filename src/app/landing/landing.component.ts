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

  constructor(
    private router: Router, 
    private userService: UserService
  ) {}

  /**
   * checks if a user token exists in localStorage, and if it does, sets the login status to true.
   */
  ngOnInit() {
    let token = this.userService.getUserToken(); // Retrieve the token from localStorage
    if (token != null) {
      this.userService.setLoginStatus(true); // Set login status to true if token exists
    }    
  }

  /**
   * attach a resize event listener to adjust the layout for different screen sizes
   * call the adjustLayout method immediately.
   */
  ngAfterViewInit() {
    window.addEventListener('resize', this.adjustLayout.bind(this)); // Adjust layout on window resize
    this.adjustLayout(); // Initial layout adjustment
  }

  /**
   * removes the resize event listener when the component is destroyed.
   */
  ngOnDestroy(){
    window.removeEventListener('resize', this.adjustLayout.bind(this)); // Clean up event listener
  }

  /**
   * navigates to the login page when called.
   */
  toLoginPage() {
    this.router.navigateByUrl('login');
  }

  /**
   * navigates to the sign-in (registration) page when called.
   */
  toRegister() {
    this.router.navigateByUrl('signIn');
  }

  /**
   * checks if a scrollbar is present, useful for adjusting layout on devices 
   * like laptops that have scrollbars, compared to tablets that often don't.
   * @returns boolean - true if a scrollbar is present, false otherwise
   */
  hasScrollbar() {
    return window.innerWidth > document.documentElement.clientWidth;
  }

  /**
   * adjusts the width of the `.landingMain` container based on whether a scrollbar is present.
   * if the window width is greater than the document's client width (indicating a scrollbar), 
   * reduce the container's width slightly to accommodate it.
   */
  adjustLayout() {
    const landingMain = document.querySelector('.landingMain')! as HTMLElement;
    if (this.hasScrollbar()) {
      landingMain.style.width = "calc(100vw - 20px)"; // Adjust width if a scrollbar is present
    } else {
      landingMain.style.width = "100vw"; // Full width if no scrollbar
    }
  }
}

