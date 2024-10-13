import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  
  private apiUrl = 'https://sportflixapi.naueka.de/icons/';  

  constructor(private http: HttpClient) { }

  getAllIcons(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getSpecificIcon(iconID: number): Observable<any>{
    const url = `${this.apiUrl}${iconID}/`;
    return this.http.get<any>(url);
  }
}
