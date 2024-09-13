import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
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
  userData: any;

  constructor(
    private router: Router,
    private searchService: SearchService,
    private userService: UserService
  ){}

  ngOnInit(){
    this.userData = this.userService.getUserData()
    console.log(this.userData)
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
    localStorage.removeItem("userData")
    this.toLandingPage()
  }
  

  toLandingPage(){
    this.router.navigateByUrl('')
  }

  openProfil(){
    this.router.navigateByUrl('profil')
  }
  

  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.searchService.updateSearchTerm(searchTerm);
  }

}
