import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

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
  errorMessage: string = '';
  oldPassword: string =  "";
  newPassword: string =  "";
  newPasswordTwo: string =  "";
  profilData: any;

  constructor(  
                // private authService: AuthService,
                private fb: FormBuilder, 
                private router: Router,
                private http: HttpClient,
                private userService: UserService){
  }


  ngOnInit(){
    this.profilData = this.userService.getUserData()
  }


  async changeName(){
    try {
      let resp = await this.sendPutUserRequestToServer();
      this.userService.setUserData(this.profilData);
      this.nameChangeSuccesful = true;
      // setTimeout(() => {
      //   location.reload()
      // }, 2000);
    } catch (e:any) {
      console.error("Error", e)
    }
  }


  async sendPutUserRequestToServer(){
    const url = environment.baseURL + `/change_name/${this.profilData.user_id}/`;
    const body = {
      "new_name": this.profilData.username,
    }
    return lastValueFrom(this.http.put(url, body))
  }


  async changePassword(){
    try {
      let resp = await this.sendPutPasswordRequestToServer();
      this.succesful = true;
      setTimeout(() => {
        location.reload()
      }, 2000);
    } catch (e:any) {
      console.error("Error", e)
      this.handleError(e)
    }
  }


  async sendPutPasswordRequestToServer(){
    const url = environment.baseURL + `/change_password/${this.profilData.user_id}/`;
    const body = {
      "old_password": this.oldPassword,
      "new_password": this.newPassword,
    }
    return lastValueFrom(this.http.put(url, body))
  }


  handleError(e: any){
    let error = e.error['error']

    console.log(error)

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
    this.router.navigateByUrl("main")
  }
  
  
}