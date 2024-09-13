import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUserData(){
    let json:any = localStorage.getItem('userData')
    let profilData = JSON.parse(json)

    return profilData
  }

  setUserData(userData: any){
    let json:any = localStorage.setItem('userData', JSON.stringify(userData))
  }
}
