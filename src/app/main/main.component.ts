import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(
    public userService: UserService, private router: Router){
  }

  ngOnInit(){
    // const token = localStorage.getItem('token');
    // if (token) {
    //   return    
    // } else {
    //   // Umleitung zur Login-Seite, falls kein Token vorhanden ist
    //   this.router.navigateByUrl('');
    // }
  
  }
}
