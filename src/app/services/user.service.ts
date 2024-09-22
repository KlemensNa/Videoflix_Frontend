import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = 'http://127.0.0.1:8000/api/users/me';

  constructor(private http: HttpClient) { }

  getUserToken(){
    let json:any = localStorage.getItem('token')
    let token = json    

    return token
  }


  /**
   * the http_intercepter sends the token in header and through auth in django you will get only your own data
   * @returns Data of currentUser
   */
  getCurrentUser(): any {
    let currentUser = this.http.get<any>(this.apiUrl);
    return currentUser;
  }


}
