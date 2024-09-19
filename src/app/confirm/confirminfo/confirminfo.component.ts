import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirminfo',
  templateUrl: './confirminfo.component.html',
  styleUrls: ['./confirminfo.component.scss']
})
export class ConfirminfoComponent {

  constructor(private router: Router){}

  toLogin(){
    this.router.navigateByUrl('login')
  }
}
