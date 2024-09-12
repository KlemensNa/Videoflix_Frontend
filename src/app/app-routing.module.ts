import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviebarComponent } from './main/moviebar/moviebar.component';
import { LandingComponent } from './landing/landing.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './landing/login/login.component';
import { SignInComponent } from './landing/sign-in/sign-in.component';
import { ImpressumComponent } from './landing/impressum/impressum.component';
import { VideoComponent } from './video/video.component';
import { ProfilComponent } from './landing/profil/profil.component';

const routes: Routes = [
  { path: '', component:  LandingComponent},
  { path: 'login', component:  LoginComponent},
  { path: 'main', component:  MainComponent},
  { path: 'video', component:  VideoComponent},
  { path: 'signIn', component:  SignInComponent},
  { path: 'profil', component:  ProfilComponent},
  { path: 'impressum', component:  ImpressumComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
