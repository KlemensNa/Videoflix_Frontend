import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-datenschutz',
  templateUrl: './datenschutz.component.html',
  styleUrls: ['./datenschutz.component.scss']
})
export class DatenschutzComponent {

  constructor(
    private location: Location
  ) { }


/**
 * go back to last location
 * if logged in go back to main, if not, go to login
 */
  toMain() {
    this.location.back()
  }

  /**
   * scroll to the top
   */
  toTop() {
    window.scrollTo(0, 0);
  }

}
