import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datenschutz',
  templateUrl: './datenschutz.component.html',
  styleUrls: ['./datenschutz.component.scss']
})
export class DatenschutzComponent {

  constructor(private router: Router){}

  toMain(){
    this.router.navigateByUrl('main')
  }
  
}
