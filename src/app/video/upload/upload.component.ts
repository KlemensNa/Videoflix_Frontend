import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { lastValueFrom, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Location } from '@angular/common';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  constructor(
    private http: HttpClient,
    private location: Location){
  }

  uploadSuccessful: boolean = false;
  updatingProcessRunning:boolean = false;
  videofile?: File;
  thumbnailfile?: File;
  description: string = '';
  title: string = '';
  videoName: string | null = null;
  thumbnailName: string | null = null;
  maincategories: string[] = [];
  sportcategories: string[] = [];
  selectedSport: string = '';
  selectedCategory: string = '';
  sportChoices: any[] = [];
  categoryChoices: any[] = [];
  boundAdjustLayout: any;
  private subscriptions: Subscription = new Subscription();


  ngOnInit(){
    const choices = this.getVideoChoices().subscribe((data: any) => {
      this.sportChoices = data.sport_choices;
      this.categoryChoices = data.category_choices;
    });
    this.subscriptions.add(choices)
  }

  ngAfterViewInit() {
    this.boundAdjustLayout = this.adjustLayout.bind(this);
    window.addEventListener('resize', this.boundAdjustLayout);
    this.adjustLayout(); 
  }


  ngOnDestroy(){
    window.removeEventListener('resize', this.boundAdjustLayout);
    this.subscriptions.unsubscribe();
  }


  getVideoChoices() {
    const url = environment.baseURL + '/video/choices/';
    return this.http.get(url);
  }


  onVideoChange(event: any){
    this.videofile = event.target.files[0]    
    this.videoName = this.videofile!.name
  }


  onThumbnailChange(event: any){ 
    this.thumbnailfile = event.target.files[0]
    this.thumbnailName = this.thumbnailfile!.name
  }


 async createNewVideo() {
    const url = environment.baseURL + `/video/`;
    
    const formData = new FormData();
    formData.append('new_title', this.title);
    formData.append('new_description', this.description);
    formData.append('new_video', this.videofile!);
    formData.append('new_thumbnail', this.thumbnailfile!);
    formData.append('sport', this.selectedSport);
    formData.append('category', this.selectedCategory);

    try {
      this.updatingProcessRunning = true;
      const response: any = await lastValueFrom(this.http.post(url, formData));
      this.uploadSuccessful = true;
      this.updatingProcessRunning = false;
      setTimeout(() => {
        this.location.back();
      }, 3000)
  
    } catch (error) {
      this.updatingProcessRunning = false;
      console.error('Registrierung fehlgeschlagen:', error);
    }
}



  onDragOver(event: DragEvent) {
    event.preventDefault();  
    event.stopPropagation();
    const element = event.target as HTMLElement;
    element.classList.add('dragover');  
  }

  // Handle the dragleave event
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const element = event.target as HTMLElement;
    element.classList.remove('dragover');  
  }

  // Handle the drop event for videos
  onVideoDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const element = event.target as HTMLElement;
    element.classList.remove('dragover');

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      
      const videoFile = files[0];  
      this.onVideoChange({ target: { files: [videoFile] } }); 
    }
  }

  // Handle the drop event for thumbnails
 onThumbnailDrop(event: DragEvent) {
  event.preventDefault();
  event.stopPropagation();
  const element = event.target as HTMLElement;
  element.classList.remove('dragover');

  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    const thumbnailFile = files[0];
    
    const fakeEvent = {
      target: {
        files: [thumbnailFile]
      }
    };
    
    this.onThumbnailChange(fakeEvent);  
  }
}

back(){
  this.location.back();
}

reload(){
  window.location.reload()
}


adjustLayout() {
  const uploadContainer = document.querySelector('.uploadContainer')! as HTMLElement;
  if (uploadContainer && window.innerWidth > document.documentElement.clientWidth) {
    uploadContainer.style.width = "calc(100vw - 20px)";
  } else {
      uploadContainer.style.width = "100vw"; 
  }
}

}
