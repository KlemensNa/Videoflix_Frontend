import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';

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

  constructor(private router: Router){}

  openSearchfield() {
    this.searchfield = !this.searchfield
  }

  toggleMenuo() { 
      this.menuOpen = !this.menuOpen
  }

  toggleMenuc(){
    this.menuOpen = !this.menuOpen
  }

  

  toLandingPage(){
    this.router.navigateByUrl('')
  }

}
