import { Component } from '@angular/core';
import { VideoService } from '../services/video.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {

  videoData: any;
  sessionStorage: any;

  constructor(private videoService: VideoService, private router: Router) {}

  ngOnInit(): void {
    this.getSessionStorage()
    
    if(this.sessionStorage.length === 0){

    }

    this.videoData = this.videoService.getVideoData()
    this.setSessionStorage();
  }

  getVideoUrl(videoPath: string): string {
    return `http://127.0.0.1:8000${videoPath}`;
  }

  closeVideo(){
    this.router.navigateByUrl('main')
  }

  setSessionStorage(){

  }

  getSessionStorage(){
    this.sessionStorage = sessionStorage.getItem('Data')

    console.log(this.sessionStorage)
    
  }

}
