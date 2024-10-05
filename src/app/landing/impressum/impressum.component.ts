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


/**
 * go back to last location
 * if logged in go back to main, if not, go to login
 */
toMain(){
this.location.back()
}

}
