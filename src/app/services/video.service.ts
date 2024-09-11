import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private apiURL = 'http://127.0.0.1:8000/video/'
  private videoData: any;

  constructor(private http: HttpClient) { }

  getVideos(): Observable<any> {
    return this.http.get(this.apiURL);
  }  

  setVideoData(data: any) {
    this.videoData = data;
  }

  getVideoData() {
    return this.videoData;
  }
}
