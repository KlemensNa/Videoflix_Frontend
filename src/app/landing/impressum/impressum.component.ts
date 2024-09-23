import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.scss']
})
export class ImpressumComponent {

  profilData: any = {};
  uid: string = '';
  token: string = '';

  constructor(private router: Router, private userService: UserService,){}

  ngOnInit(){
    this.userService.getCurrentUser().subscribe({
      next: (data:any) => {
        this.profilData = data;
        this.uid = this.profilData.id
        this.token = this.profilData.token;
      },
      error: (error:any) => {
        console.error('Fehler beim Abrufen der Nutzerdaten', error);
      },
      complete: () => {
        return
      }
    });
  }

  toMain(){
    if(this.token != ''){
      this.router.navigateByUrl(`main/${this.token}/${this.uid}`)
    } else {
      this.router.navigateByUrl('login')
    }
  }
}
