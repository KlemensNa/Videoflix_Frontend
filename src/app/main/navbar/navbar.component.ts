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
  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private searchService: SearchService,
    public userService: UserService,
  ) { }

  ngOnInit(): void {
    this.token = this.userService.getUserToken()
    if(this.token){
      this.loadProfilData();
    } else {
      this.router.navigateByUrl('')
    }    
  }


  ngAfterViewInit() {
    window.addEventListener('resize', this.adjustLayout.bind(this));
    this.adjustLayout(); 
  }


  /**
   * get Observable datas of currentUser from userService.
   * execute function if data are completly loaded
   */
  loadProfilData() {
    const userDataSub= this.userService.getCurrentUser().subscribe({
      next: (data: any) => {
        if (data) {
          this.profilData = data;
          this.loadingFinished = true;
          this.uid = this.profilData.id;
          this.loadIcon();
        }
      },
      error: (error: any) => {
        console.error('Fehler beim Abrufen der Nutzerdaten. Try again please', error);
      }
    });
    this.subscriptions.add(userDataSub);
  }


  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }


  loadIcon(): void {
    let imageURL = this.profilData.icon.image;
    this.icon = "http://127.0.0.1:8000/" + imageURL
  }


  openSearchfield() {
    this.searchfield = !this.searchfield
  }


  closeSearchfield() {
    this.searchfield = !this.searchfield;
    this.searchService.updateSearchTerm('')
  }


  toggleMenuo() {
    this.menuOpen = !this.menuOpen
  }


  toggleMenuc() {
    this.menuOpen = !this.menuOpen
  }


  logout() {
    localStorage.removeItem("token")
    this.userService.setLoginStatus(false)
    this.toLandingPage()
  }


  toLandingPage() {
    this.router.navigateByUrl('')
  }

  toUploadVideo(){
    this.router.navigateByUrl('upload')
  }


  openProfil() {
    this.router.navigateByUrl(`profil/${this.uid}/${this.token}`)
  }


  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.searchService.updateSearchTerm(searchTerm);
  }


  adjustLayout() {
    const navbarContainer = document.querySelector('.navbarContainer')! as HTMLElement;
    if (window.innerWidth > document.documentElement.clientWidth) {
      navbarContainer.style.width = "calc(100vw - 20px)";
    } else {
      navbarContainer.style.width = "100vw";
    }
  }
}
