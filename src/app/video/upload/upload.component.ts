import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  constructor(
    private http: HttpClient){
  }

  videofile?: File;
  thumbnailfile?: File;
  description: string = '';
  title: string = '';
  maincategories: string[] = [];
  sportcategories: string[] = [];
  maincategoriy: string = '';
  sportcategory: string = '';


  onVideoChange(event: any){
    console.error(event)
    this.videofile = event.target.files[0]
  }


  onThumbnailChange(event: any){
    this.thumbnailfile = event.target.files[0]
  }


  createNewVideo(){
    const url = environment.baseURL + `/videoideo/`;
    const body = {
      "new_title": this.title,
      "new_description": this.description,
      "new_video": this.videofile,
      "new_thumbnail": this.thumbnailfile
    }
    console.log(body)
    // this.http.post(url, body)
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
      
    console.log(files[0])
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
      this.onThumbnailChange({ target: { files: [thumbnailFile] } });  // Auf die bestehende onThumbnailChange Funktion anwenden
    }
  }



  

}
