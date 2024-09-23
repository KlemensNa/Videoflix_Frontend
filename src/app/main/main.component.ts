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

  // ngOnInit(){
  //   let loggedIn;
  //   this.userService.isLoggedIn$.subscribe((status: boolean) => {
  //     loggedIn = status;
  //   });
  //   if(!loggedIn){
  //     this.router.navigateByUrl('')
  //   }
  // }
  

}
