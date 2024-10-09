import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  
  private apiUrl = 'https://sportflixapi.naueka.de/icons/';  // Hier musst du die URL deiner Django API angeben

  constructor(private http: HttpClient) { }

  getAllIcons(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getSpecificIcon(iconID: number): Observable<any>{
    const url = `${this.apiUrl}${iconID}/`;  // API-Endpunkt für Icon mit ID
    return this.http.get<any>(url);
  }
}
