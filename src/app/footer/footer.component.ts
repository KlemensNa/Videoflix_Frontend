import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private router: Router){}

  toImpressum(){
    this.router.navigateByUrl('impressum')
  }

  toData(){
    this.router.navigateByUrl('datenschutz')
  }
}
