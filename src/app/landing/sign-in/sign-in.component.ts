import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IconService } from 'src/app/services/icon.service';
import { Icon } from 'src/app/model/icon';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent {

  isErrorVisible: boolean = false;
  signInPageOne: boolean = true;
  menuOpen: boolean = false;
  passwordNotMatch: boolean = false;
  passwordVisible: boolean = false;
  passwordConfirmVisible: boolean = false;
  email: string = "";
  username: string = "";
  password: string = "";
  passwordConfirm: string = "";
  icons: Icon[] = [];
  selectedIcon: any | null = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private iconService: IconService
  ) { }

  /**
   * initializes the component by loading available icons.
   */
  ngOnInit(): void {
    this.loadIcons();
  }


  togglePasswordVisibility(): void{
    this.passwordVisible = !this.passwordVisible
  }

  togglePasswordConfirmVisibility(): void{
    this.passwordConfirmVisible = !this.passwordConfirmVisible
  }

  /**
   * loads all available icons using the IconService and sets a default icon if icons are available.
   */
  loadIcons() {
    this.iconService.getAllIcons().subscribe((data) => {
      this.icons = data;
      if (this.icons.length > 0) {
        this.selectedIcon = this.icons[0];  // Set the first icon as the default
      }
    });
  }

  /**
   * selects an icon from the icon list and closes the dropdown menu.
   * @param icon The icon object that was selected.
   */
  selectIcon(icon: any) {
    this.selectedIcon = icon;
    this.menuOpen = false;
  }

  /**
   * toggles the visibility of the icon selection menu.
   */
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  /**
   * initiates the sign-in process by checking if the password and password confirmation match.
   * if they match, calls the sign-in function. Otherwise, sets an error flag.
   */
  async signIn() {
    if (this.passwordsMatch()) {
      this.passwordNotMatch = false;
      try {
        await this.signInWithEmailAndPassword();
      } catch (e) {
        console.error("Error during sign-in:", e);
      }
    } else {
      this.passwordNotMatch = true;
    }
  }

  /**
   * checks if the entered passwords match.
   * @returns a boolean indicating whether the password and confirmation match.
   */
  private passwordsMatch(): boolean {
    return this.password === this.passwordConfirm;
  }

  /**
   * sends a sign-in request with email, username, password, and selected icon.
   * if successful, redirects to the confirmation info page.
   */
  async signInWithEmailAndPassword() {
    const url = environment.baseURL + "/register/";
    const body = {
      "email": this.email,
      "username": this.username,
      "password": this.password,
      "icon": this.selectedIcon
    };

    try {
      const response: any = await lastValueFrom(this.http.post(url, body));
      this.router.navigateByUrl('confirminfo');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }

  /**
   * navigates to the login page.
   */
  toLogin() {
    this.router.navigateByUrl('login');
  }

  /**
   * navigates to the landing page.
   */
  toLandingPage() {
    this.router.navigateByUrl('');
  }

}
