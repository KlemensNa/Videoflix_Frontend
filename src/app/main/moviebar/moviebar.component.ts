import { Component } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';



@Component({
  selector: 'app-moviebar',
  templateUrl: './moviebar.component.html',
  styleUrls: ['./moviebar.component.scss']
})
export class MoviebarComponent {

  videos: any[] = [];
  videoOpened: boolean = false;

  constructor(private videoService: VideoService) { }

  ngOnInit(): void {
    this.videoService.getVideos().subscribe(data => {
      this.videos = data;
    });
  }

  getVideoUrl(videoPath: string): string {
    return `http://127.0.0.1:8000${videoPath}`;
  }

  toggleVideo(video: any){

    console.log(video)
      video.isplaying =! video.isplaying

      
    
  }







}
