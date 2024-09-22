import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
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

  constructor(
    private router: Router,
    private searchService: SearchService,
    private userService: UserService,
  ){}

  ngOnInit(){
    this.loadProfilData();
    this.token = this.userService.getUserToken()
    
  }


  loadProfilData(){
    this.userService.getCurrentUser().subscribe({
      next: (data:any) => {
        this.profilData = data;
        this.uid = this.profilData.id
        this.loadingFinished = true;
      },
      error: (error:any) => {
        console.error('Fehler beim Abrufen der Nutzerdaten', error);
      },
      complete: () => {
        this.loadIcon();
      }
    });
  }

  loadIcon(): void {
    let imageURL = this.profilData.icon.image;
    this.icon = "http://127.0.0.1:8000/" + imageURL
  }


  openSearchfield() {
    this.searchfield = !this.searchfield
  }


  closeSearchfield(){
    this.searchfield = !this.searchfield;    
    this.searchService.updateSearchTerm('')
  }


  toggleMenuo() { 
      this.menuOpen = !this.menuOpen
  }


  toggleMenuc(){
    this.menuOpen = !this.menuOpen
  }


  logout(){
    localStorage.removeItem("token")
    this.toLandingPage()
  }
  

  toLandingPage(){
    this.router.navigateByUrl('')
  }


  openProfil(){
    console.error(this.uid)
    this.router.navigateByUrl(`profil/${this.uid}/${this.token}`)
  }
  

  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.searchService.updateSearchTerm(searchTerm);
  }
}
