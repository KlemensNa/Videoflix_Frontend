import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IconService } from 'src/app/services/icon.service';
import { Icon } from 'src/app/model/icon';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  isErrorVisible: boolean = false;
  signInPageOne: boolean = true;
  menuOpen:boolean = false;
  email: string =  "";
  username: string =  "";
  password: string =  "";
  icons: Icon[] = [];
  selectedIcon: any | null = null;

  constructor(  
                private fb: FormBuilder, 
                private router: Router,
                private http: HttpClient,
                private iconService: IconService){
  }


  ngOnInit(): void{
      this.loadIcons()
  }


  loadIcons(){
    this.iconService.getAllIcons().subscribe((data) => {
      this.icons = data;
      if (this.icons.length > 0) {
        this.selectedIcon = this.icons[0];  // Erstes Icon als Default
      }
    });
  }


  selectIcon(icon: any) {
    this.selectedIcon = icon;
    this.menuOpen = false;
  }


  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }


  async signIn(){
    try {
      await this.signInWithEmailAndPassword();
    } catch (e) {
      console.error("Error", e)
    }
  }


  async signInWithEmailAndPassword(){
    const url = environment.baseURL + "/register/";
    const body = {
      "email": this.email,
      "username": this.username,
      "password": this.password,
      "icon": this.selectedIcon
    }
    
    try {
      // POST-Request und Warten auf die Antwort
      const response: any = await lastValueFrom(this.http.post(url, body));
  
      // Wenn erfolgreich, leite zur Bestätigungsseite weiter
      console.log(response.message);  // Prüfe die Nachricht vom Backend (optional)
      this.router.navigateByUrl('confirminfo/');  // Redirect zu /confirminfo
  
    } catch (error) {
      // Fehlerbehandlung
      console.error('Registrierung fehlgeschlagen:', error);
    }

  }
  

  toLogin(){
    this.router.navigateByUrl('login')
  }


  
}
