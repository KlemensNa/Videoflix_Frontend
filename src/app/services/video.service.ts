import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private apiURL = 'https://sportflixapi.naueka.de/video/'
  private videoData: any;

  constructor(private http: HttpClient) { }


  getVideos(): Observable<any> {
    return this.http.get(this.apiURL);
  }  


  /**
   * setVideoDatas to SessionStorage, to start video when refreshing videopage
   * @param data Array of VideoTitle and VideoURL
   */
  setVideoData(data: any) {
    this.videoData = data;
    sessionStorage.setItem('videoDatas', JSON.stringify(this.videoData))
  }


  /**
   * 
   * @returns VideoDatas as JSON
   */
  getVideoData(){
    const data: any = sessionStorage.getItem('videoDatas')
    this.videoData = JSON.parse(data)
    return this.videoData
  }
}
