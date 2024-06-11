import { Component } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';



@Component({
  selector: 'app-moviebar',
  templateUrl: './moviebar.component.html',
  styleUrls: ['./moviebar.component.scss']
})
export class MoviebarComponent {

  videos: any[] = [];
  ballsport: any[] = [];
  ussport:any[] = [];
  golf: any[] = [];
  football: any[] = [];
  handball: any[] = [];
  basketball: any[] = [];
  videoOpened: boolean = false;

  constructor(private videoService: VideoService) { }

  ngOnInit(): void {
    this.videoService.getVideos().subscribe(data => {
      this.videos = data;
      this.sortVideosToCategory()
    });
    console.warn("Golfen", this.golf)
    console.warn("Fußball", this.football)
  }

  getVideoUrl(videoPath: string): string {
    return `http://127.0.0.1:8000${videoPath}`;
  }

  toggleVideo(video: any){
    console.log(video)
      video.isplaying =! video.isplaying      
  }

  sortVideosToCategory(){

    this.videos.forEach(video => {      
      this.sortToSpecificCategory(video)
      if(video.category){
        console.error(video.category)
        this.sortToMainCategory(video)
      }
    });
    
  }

  sortToMainCategory(video: any){
    switch (video.category.toLowerCase()) {
      case 'ballsport':
        this.ballsport.push(video);
        break;
      case 'ussport':
        this.ussport.push(video);
        break;
      // case 'handball':
      //   this.handball.push(video);
      //   break;
      // case 'basketball':
      //   this.basketball.push(video);
      //   break;
      default:
        // Handle case where category doesn't match any predefined categories
        console.warn(`Unknown category: ${video.category}`);
    }    
  }

  sortToSpecificCategory(video: any){
    switch (video.sport.toLowerCase()) {
      case 'golf':
        this.golf.push(video);
        break;
      case 'football':
        this.football.push(video);
        break;
      case 'handball':
        this.handball.push(video);
        break;
      case 'basketball':
        this.basketball.push(video);
        break;
      default:
        // Handle case where category doesn't match any predefined categories
        console.warn(`Unknown category: ${video.category}`);
    }    
  }






}
