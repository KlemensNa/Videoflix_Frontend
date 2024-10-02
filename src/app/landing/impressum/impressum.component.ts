import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.scss']
})
export class ImpressumComponent {

  constructor(
    private location: Location
  ){}

toMain(){
this.location.back()
}

toTop(){
window.scrollTo(0, 0);
}
}
