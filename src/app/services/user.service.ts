import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = 'http://127.0.0.1:8000/api/users/me';

  constructor(private http: HttpClient) { }

  getUserData(){
    let json:any = localStorage.getItem('userData')
    let profilData = JSON.parse(json)    

    return profilData
  }

  getCurrentUser(): any {
    let rp = this.http.get<any>(this.apiUrl);
    return rp;
  }

  setUserData(userData: any){
    let json:any = localStorage.setItem('userData', JSON.stringify(userData))
  }
}
