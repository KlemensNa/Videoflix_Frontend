import { Component } from '@angular/core';
import { VideoService } from '../services/video.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {

  videoData: any;
  sessionStorage: any;

  constructor(
    private videoService: VideoService, 
    private router: Router, 
    private location: Location) {}


  /**
   * query video datas from service --> get title and URL 
   */
  ngOnInit(): void {
    this.videoData = this.videoService.getVideoData()
  }


  /**
   * 
   * @param videoPath URL-Ending for this video
   * @returns full videoURL to HTML
   */
  getVideoUrl(videoPath: string): string {
    return `http://34.159.79.177${videoPath}`;
  }


  /**
   * back to moviebar
   */
  closeVideo(){    
    this.location.back();
  }

}
