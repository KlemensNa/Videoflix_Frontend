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
    this.token = this.userService.getUserToken()

    if(this.token){
      this.isLoggedIn = true;
      this.loadUserData()
    } 
  }


  ngAfterViewInit() {
    window.addEventListener('resize', this.adjustLayout.bind(this));
    this.adjustLayout(); // Call it here after the view is initialized
  }

  ngOnDestroy(){
    window.removeEventListener('resize', this.adjustLayout.bind(this));
    this.subscriptions.unsubscribe();
  }


  loadUserData(){
    const userDataSub = this.userService.getCurrentUser().subscribe({
      next: (data: any) => {
        if (data) {          
          this.uid = data.id;
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

  toUploadVideo(){
    this.router.navigateByUrl('upload')
  }

  openProfile(){
    this.router.navigateByUrl(`profil/${this.uid}/${this.token}`)
  }

  adjustLayout() {
    const footerContainer = document.querySelector('.footerContainer')! as HTMLElement;
    if (window.innerWidth > document.documentElement.clientWidth) {
      footerContainer.style.width = "calc(100vw - 20px)";
    } else {
      footerContainer.style.width = "100vw";
    }
  }
}
