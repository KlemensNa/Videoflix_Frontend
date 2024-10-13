import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  isLoggedIn: boolean = false;
  uid: string = '';
  token: string = '';
  boundAdjustLayout: any;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,    
    private userService: UserService,
  ) {}

  /**
   * Lifecycle hook that runs when the component is initialized.
   * Retrieves the user token from the UserService and loads user data if the token exists.
   */
  ngOnInit() {        
    this.token = this.userService.getUserToken();

    if (this.token) {
      this.isLoggedIn = true;
      this.loadUserData();
    }
  }

  /**
   * Lifecycle hook that runs after the component's view is fully initialized.
   * Adds a resize event listener to adjust the layout of the footer based on window size.
   */
  ngAfterViewInit() {
    this.boundAdjustLayout = this.adjustLayout.bind(this);
    this.adjustLayout(); 
    window.addEventListener('resize', this.boundAdjustLayout);
  }

  /**
   * Lifecycle hook that runs when the component is destroyed.
   * Removes the resize event listener and unsubscribes from all active subscriptions.
   */
  ngOnDestroy() {
    window.removeEventListener('resize', this.boundAdjustLayout);
    this.subscriptions.unsubscribe();
  }

  /**
   * Loads the current user's data by subscribing to the UserService.
   * Stores the user's ID once the data is successfully retrieved.
   */
  loadUserData() {
    const userDataSub = this.userService.getCurrentUser().subscribe({
      next: (data: any) => {
        if (data) {
          this.uid = data.id;
        }
      },
      error: (error: any) => {
        console.error('Error retrieving user data. Try again please', error);
      }
    });

    // Add the subscription to the Subscription object for cleanup
    this.subscriptions.add(userDataSub);
  }

  /**
   * Navigates to the 'Impressum' page.
   */
  toImpressum() {
    this.router.navigateByUrl('impressum');
  }

  /**
   * Navigates to the 'Datenschutz' page.
   */
  toData() {
    this.router.navigateByUrl('datenschutz');
  }

  /**
   * Navigates to the 'Upload Video' page.
   */
  toUploadVideo() {
    this.router.navigateByUrl('upload');
  }

  /**
   * Opens the profile page of the current user using the user's ID and token.
   */
  openProfile() {
    this.router.navigateByUrl(`profil/${this.uid}/${this.token}`);
  }

  /**
   * Adjusts the layout of the footer based on the window size.
   * Ensures the footer's width stays consistent with the viewport width.
   */
  adjustLayout() {
    const footerContainer = document.querySelector('.footerContainer')! as HTMLElement;
    if (window.innerWidth > document.documentElement.clientWidth) {
      footerContainer.style.width = "calc(100vw - 20px)";
    } else {
      footerContainer.style.width = "100vw";
    }
  }
}

