import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  isLoggedIn: boolean = false;
  uid: string = '';
  token: string = '';
  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,    
    private userService: UserService,
  ){}

  ngOnInit(){
    const loginStatusSub = this.userService.isLoggedIn$.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });

    if(this.isLoggedIn){
      this.loadUserData()
    }

    this.subscriptions.add(loginStatusSub);
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }


  loadUserData(){
    const userDataSub = this.userService.getCurrentUser().subscribe({
      next: (data: any) => {
        if (data) {          
          this.uid = data.id;
          this.token = this.userService.getUserToken()
        }
      },
      error: (error: any) => {
        console.error('Fehler beim Abrufen der Nutzerdaten. Try again please', error);
      }
    });

    this.subscriptions.add(userDataSub)
  }



  toImpressum(){
    this.router.navigateByUrl('impressum')
  }

  toData(){
    this.router.navigateByUrl('datenschutz')
  }

  openProfile(){
    this.router.navigateByUrl(`profil/${this.uid}/${this.token}`)
  }
}
