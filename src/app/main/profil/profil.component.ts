import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { lastValueFrom, Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { IconService } from 'src/app/services/icon.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})

export class ProfilComponent {
  
  isErrorVisible: boolean = false;
  signInPageOne: boolean = true;
  succesful: boolean = false;
  nameChangeSuccesful: boolean = false;
  error: boolean = false;
  menuOpen: boolean = false;
  sendDataLoading: boolean = false; 
  loadingFinished: boolean = false; 
  errorMessage: string = '';

  uid: string = '';
  token: string = '';
  oldPassword: string = "";
  newPassword: string = "";
  passwordNotMatch: boolean = false; 
  newPasswordConfirm: string = "";
  profilData: any = {}; 
  selectedIcon: any; 
  icons: any[] = []; 

  private subscriptions: Subscription = new Subscription(); 

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
    private iconService: IconService,
    private location: Location
  ) {}

  /**
   * load user profile data if token is available.
   * Otherwise, redirect to the login page.
   */
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.loadProfilData();
    } else {
      this.router.navigateByUrl(''); // Redirect to login if no token
    }
  }

  /**
   * after the view is initialized, attach resize event listener
   * and adjust the layout.
   */
  ngAfterViewInit() {
    window.addEventListener('resize', this.adjustLayout.bind(this));
    this.adjustLayout(); // Initial layout adjustment
  }

  /**
   * unsubscribe from all subscriptions to avoid memory leaks.
   */
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  /**
   * loads the current user's profile data and their associated icon.
   */
  loadProfilData() {
    const userDataSub = this.userService.getCurrentUser().subscribe({
      next: (data: any) => {
        if (data) {
          this.profilData = data;
          this.loadingFinished = true; 
          this.uid = this.profilData.id;
          this.loadIcon();
          this.loadIcons();
        }
      },
      error: (error: any) => {
        console.error('Error retrieving user data. Try again please', error);
      }
    });

    this.subscriptions.add(userDataSub);
  }

  /**
   * loads the specific icon related to the user's profile data.
   */
  loadIcon() {
    if (this.profilData.icon && this.profilData.icon.id) {
      this.iconService.getSpecificIcon(this.profilData.icon.id).subscribe((iconData) => {
        this.selectedIcon = iconData; // Set the user's selected icon
      });
    }
  }

  /**
   * toggles loading state for data submission.
   */
  toggleLoading() {
    this.sendDataLoading = !this.sendDataLoading;
  }

  /**
   * loads all available icons from the backend to allow the user to choose a new one.
   */
  loadIcons() {
    this.iconService.getAllIcons().subscribe((data) => {
      this.icons = data;
    });
  }

  /**
   * selects an icon from the available options.
   * @param icon - The selected icon
   */
  selectIcon(icon: any) {
    this.selectedIcon = icon;
    this.menuOpen = false; 
  }

  /**
   * toggles the state of the icon selection menu.
   */
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  /**
   * submits a request to change the user's profile information.
   */
  async changeUserData() {
    try {
      await this.sendPutUserRequestToServer();  
      this.nameChangeSuccesful = true;
    } catch (e: any) {
      console.error("Error", e);
    }
  }

  /**
   * sends a PUT request to update the user's profile information (name, icon, etc.).
   */
  async sendPutUserRequestToServer() {
    const url = environment.baseURL + `/change_name/${this.profilData.id}/`;
    const body = {
      "new_name": this.profilData.username,
      "new_firstname": this.profilData.first_name,
      "new_lastname": this.profilData.last_name,
      "new_icon": this.selectedIcon
    };
    return lastValueFrom(this.http.put(url, body)); 
  }

  /**
   * validates password match and sends a request to change the user's password.
   */
  async changePassword() {
    if (this.newPassword === this.newPasswordConfirm) {
      this.passwordNotMatch = false;
      this.sendPasswordToBackend(); 
    } else {
      this.passwordNotMatch = true; 
    }
  }

  /**
   * sends a request to the backend to change the user's password.
   */
  async sendPasswordToBackend() {
    try {
      this.sendDataLoading = true;
      await this.passwordPutRequest(); 
      this.sendDataLoading = false;
      this.succesful = true;
      setTimeout(() => {
        location.reload(); 
      }, 2000);
    } catch (e: any) {
      this.sendDataLoading = false;
      console.error("Error", e);
    }
  }

  /**
   * sends a PUT request to change the user's password.
   */
  async passwordPutRequest() {
    const url = environment.baseURL + `/change_password/${this.profilData.id}/`;
    const body = {
      "old_password": this.oldPassword,
      "new_password": this.newPassword
    };
    return lastValueFrom(this.http.put(url, body));
  }

  /**
   *handles errors returned by the server, particularly during password change.
   * @param e - Error object returned from the backend
   */
  handleError(e: any) {
    let error = e.error['error'];

    if (error === "Old password does not match") {
      this.errorMessage = "Old password is incorrect. Please try again.";
    } else {
      this.errorMessage = "An error occurred. Please try again.";
    }

    // Clear form fields on error
    this.oldPassword = "";
    this.newPassword = "";
    this.error = true;
  }

  /**
   * navigates back to the main page.
   */
  toMain() {
    this.location.back();
  }

  /**
   * adjusts the layout based on the screen size and presence of a scrollbar.
   */
  adjustLayout() {
    const changePasswordMain = document.querySelector('.changePasswordMain')! as HTMLElement;
    if (window.innerWidth > document.documentElement.clientWidth) {
      changePasswordMain.style.width = "calc(100vw - 20px)";
    } else {
      changePasswordMain.style.width = "100vw";
    }
  }
}

