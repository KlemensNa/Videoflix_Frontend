import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  searchfield: boolean = false;
  myControl = new FormControl('');


  openSearchfield(){
    this.searchfield = !this.searchfield
  }

}
