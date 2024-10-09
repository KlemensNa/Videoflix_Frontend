import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Icon } from 'src/app/model/icon';
import { IconService } from 'src/app/services/icon.service';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent { 

  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  menuOpen: boolean = false;
  searchfield: boolean = false;
  myControl = new FormControl('');
  profilData: any = {}; 
  loadingFinished: boolean = false; 
  icon: string = ''; 
  uid: string = ''; 
  token: string = '';
  boundAdjustLayout: any;
  private subscriptions: Subscription = new Subscription(); 

  constructor(
    private router: Router,
    private searchService: SearchService,
    public userService: UserService,
  ) { }


  /**
   * on component initialization, retrieve the user's token.
   * if token is present, load profile data; otherwise, redirect to the landing page.
   */
  ngOnInit(): void {
    this.token = this.userService.getUserToken();
    if (this.token) {
      this.loadProfilData(); 
    } else {
      this.router.navigateByUrl('');
    }    
  }


  /**
   * after the view is initialized, attach a resize event listener and adjust layout based on screen size.
   */
  ngAfterViewInit() {
    this.boundAdjustLayout = this.adjustLayout.bind(this);
    window.addEventListener('resize', this.boundAdjustLayout); 
    this.adjustLayout();
  }


  /**
   * loads the profile data of the current user via the userService.
   * updates the profile data once it's loaded and then calls loadIcon().
   */
  loadProfilData() {
    const userDataSub = this.userService.getCurrentUser().subscribe({
      next: (data: any) => {
        if (data) {
          this.profilData = data; 
          this.loadingFinished = true; 
          this.uid = this.profilData.id; 
          this.loadIcon(); 
        }
      },
      error: (error: any) => {
        console.error('Error retrieving user data. Try again please', error);
      }
    });
    this.subscriptions.add(userDataSub); 
  }


  /**
   * clean up all subscriptions when the component is destroyed
   * to prevent memory leaks.
   */
  ngOnDestroy() {
    window.removeEventListener('resize', this.boundAdjustLayout);;
    this.subscriptions.unsubscribe();
  }

  /**
   * builds the full URL for the user's icon and stores it in the `icon` variable.
   */
  loadIcon(): void {
    let imageURL = this.profilData.icon.image;
    this.icon = "https://34.159.79.177/" + imageURL; 
  }

  /**
   * toggles the visibility of the search field in the navbar.
   */
  openSearchfield() {
    this.searchfield = !this.searchfield;
  }

  /**
   * closes the search field and clears the current search term.
   */
  closeSearchfield() {
    this.searchfield = false;
    this.searchService.updateSearchTerm(''); 
  }

  /**
   * toggles the visibility of the menu.
   */
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  /**
   * logs out the user by removing the token, updating the login status, 
   * and redirecting to the landing page.
   */
  logout() {
    localStorage.removeItem("token"); 
    this.userService.setLoginStatus(false); 
    this.toLandingPage(); 
  }

  /**
   * navigates to the landing page.
   */
  toLandingPage() {
    this.router.navigateByUrl('');
  }

  /**
   * navigates to the video upload page.
   */
  toUploadVideo() {
    this.router.navigateByUrl('upload');
  }

  /**
   * navigates to the user's profile page, using the user's ID and token in the URL.
   */
  openProfil() {
    this.router.navigateByUrl(`profil/${this.uid}/${this.token}`);
  }

  /**
   * handles search input, converting the term to lowercase and passing it to the search service.
   * @param event - Input event triggered by the search field
   */
  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.searchService.updateSearchTerm(searchTerm);
  }

  /**
   * adjusts the layout of the navbar based on the presence of a scrollbar.
   * if a scrollbar is present, reduce the navbar width slightly to prevent overflow.
   */
  adjustLayout() {
    const navbarContainer = document.querySelector('.navbarContainer')! as HTMLElement;
    if (window.innerWidth > document.documentElement.clientWidth) {
      navbarContainer.style.width = "calc(100vw - 20px)"; 
    } else {
        navbarContainer.style.width = "100vw";    
    }
  }
}

