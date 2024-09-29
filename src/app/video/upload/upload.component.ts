import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
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


  ngOnInit(){
    this.getVideoChoices().subscribe((data: any) => {
      this.sportChoices = data.sport_choices;
      this.categoryChoices = data.category_choices;
    });
  }


  getVideoChoices() {
    const url = environment.baseURL + '/video/choices/';
    return this.http.get(url);
  }


  onVideoChange(event: any){
    console.error(event)
    this.videofile = event.target.files[0]    
    this.videoName = this.videofile!.name
  }


  onThumbnailChange(event: any){ 
    this.thumbnailfile = event.target.files[0]
    this.thumbnailName = this.thumbnailfile!.name
  }


 createNewVideo() {
    const url = environment.baseURL + `/video/`;
    
    const formData = new FormData();
    formData.append('new_title', this.title);
    formData.append('new_description', this.description);
    formData.append('new_video', this.videofile!);
    formData.append('new_thumbnail', this.thumbnailfile!);
    formData.append('sport', this.selectedSport);
    formData.append('category', this.selectedCategory);

    return lastValueFrom(this.http.post(url, formData));
}



  onDragOver(event: DragEvent) {
    event.preventDefault();  // Verhindert, dass das Standardverhalten der Seite ausgelöst wird (z.B. Datei öffnen)
    event.stopPropagation();
    const element = event.target as HTMLElement;
    element.classList.add('dragover');  // Optional: CSS-Klasse hinzufügen, um visuelles Feedback zu geben
  }

  // Handle the dragleave event
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const element = event.target as HTMLElement;
    element.classList.remove('dragover');  // CSS-Klasse entfernen
  }

  // Handle the drop event for videos
  onVideoDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const element = event.target as HTMLElement;
    element.classList.remove('dragover');

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      
      const videoFile = files[0];  // Hole die Datei
      this.onVideoChange({ target: { files: [videoFile] } });  // Auf die bestehende onVideoChange Funktion anwenden
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
    // Simulate the event structure expected by onThumbnailChange
    const fakeEvent = {
      target: {
        files: [thumbnailFile]
      }
    };
    
    this.onThumbnailChange(fakeEvent);  // Auf die angepasste onThumbnailChange Funktion anwenden
  }
}

back(){
  this.location.back();
}

reload(){
  window.location.reload()
}

}
