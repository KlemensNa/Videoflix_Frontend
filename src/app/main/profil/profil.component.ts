import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { lastValueFrom, Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { IconService } from 'src/app/services/icon.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent {
  isErrorVisible: boolean = false;
  signInPageOne: boolean = true;
  succesful: boolean = false;
  nameChangeSuccesful: boolean = false;
  error: boolean = false;
  menuOpen: boolean = false;
  sendDataLoading: boolean = false;
  loadingFinished: boolean = false;
  errorMessage: string = '';
  uid: string = '';
  token: string = '';
  oldPassword: string =  "";
  newPassword: string =  "";
  passwordNotMatch: boolean = false;
  newPasswordConfirm: string =  "";
  profilData: any = {};
  selectedIcon: any;
  icons: any[] = [];
  private subscriptions: Subscription = new Subscription();


  constructor(  
                private router: Router,
                private http: HttpClient,
                private userService: UserService,
                private iconService: IconService,
                private location: Location){
  }


  ngOnInit(){
    const token = localStorage.getItem('token');
  if (token) {
    this.loadProfilData();    
  } else {
    // Umleitung zur Login-Seite, falls kein Token vorhanden ist
    this.router.navigateByUrl('');
  }
  }


  ngAfterViewInit() {
    window.addEventListener('resize', this.adjustLayout.bind(this));
    this.adjustLayout(); 
  }


  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }


  loadProfilData(){

    const userDataSub = this.userService.getCurrentUser().subscribe({
      next: (data: any) => {
        if (data) {
          this.profilData = data;
          this.loadingFinished = true;
          this.uid = this.profilData.id;
          this.loadIcon();
          this.loadIcons();
        }
      },
      error: (error: any) => {
        console.error('Fehler beim Abrufen der Nutzerdaten. Try again please', error);
      }
    });

    this.subscriptions.add(userDataSub)
  }


  loadIcon(){
    if(this.profilData.icon && this.profilData.icon.id){
      this.iconService.getSpecificIcon(this.profilData.icon.id).subscribe((iconData) => {        
        this.selectedIcon = iconData;
      });
    }
  }

  
  toggleLoading(){
    this.sendDataLoading = !this.sendDataLoading
  }


  loadIcons(){
    this.iconService.getAllIcons().subscribe((data) => {
      this.icons = data;
    });
  }


  selectIcon(icon: any) {
    this.selectedIcon = icon;
    this.menuOpen = false;
  }


  toggleMenu(){
    this.menuOpen = !this.menuOpen;
  }


  async changeUserData(){
    try {
      let resp = await this.sendPutUserRequestToServer();
      this.nameChangeSuccesful = true;
    } catch (e:any) {
      console.error("Error", e)
    }
  }


  async sendPutUserRequestToServer(){
    const url = environment.baseURL + `/change_name/${this.profilData.id}/`;
    const body = {
      "new_name": this.profilData.username,
      "new_firstname": this.profilData.first_name,
      "new_lastname": this.profilData.last_name,
      "new_icon": this.selectedIcon
    }
    return lastValueFrom(this.http.put(url, body))
  }


  async changePassword(){
    
    if (this.newPassword === this.newPasswordConfirm) {
      this.passwordNotMatch = false;      
      this.sendPasswordToBackend()
    } else {
      this.passwordNotMatch = true;
    }    
  }


  async sendPasswordToBackend(){
    try {
      this.sendDataLoading = true;
      let resp = await this.passwordPutRequest();
        this.sendDataLoading = false;
        this.succesful = true;
        setTimeout(() => {
          location.reload()
        }, 2000);
    } catch (e:any) {
      this.sendDataLoading = false;
      console.error("Error", e)
      this.handleError(e)
    }   
  }


  async passwordPutRequest(){
    const url = environment.baseURL + `/change_password/${this.profilData.id}/`;
    const body = {
      "old_password": this.oldPassword,
      "new_password": this.newPassword,
    }
    return lastValueFrom(this.http.put(url, body))
  }

  /**
   * evtl weg
   * @param e 
   */
  handleError(e: any){
    let error = e.error['error']

    if(error === "Old password does not match"){
      this.errorMessage = "Altes Password falsch. Versuch es noch einmal."
    } else {
      this.errorMessage = "Ein Fehler ist aufgetreten. Versuch es noch einmal."
    }
    
    this.oldPassword =  "";
    this.newPassword =  "";
    this.error =  true
  }


  toMain(){
    this.location.back();
  }


  adjustLayout() {
    const changePasswordMain = document.querySelector('.changePasswordMain')! as HTMLElement;
    if (window.innerWidth > document.documentElement.clientWidth) {
      changePasswordMain.style.width = "calc(100vw - 20px)";
    } else {
      changePasswordMain.style.width = "100vw";
    }
  }
  
  
}
