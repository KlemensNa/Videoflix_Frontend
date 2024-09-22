import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './landing/login/login.component';
import { SignInComponent } from './landing/sign-in/sign-in.component';
import { ImpressumComponent } from './landing/impressum/impressum.component';
import { VideoComponent } from './video/video.component';
import { ProfilComponent } from './main/profil/profil.component';
import { DatenschutzComponent } from './landing/datenschutz/datenschutz.component';
import { ConfirmComponent } from './landing/sign-in/confirm/confirm.component';
import { ConfirminfoComponent } from './landing/sign-in/confirm/confirminfo/confirminfo.component';
import { ResetpasswordComponent } from './landing/resetpassword/resetpassword.component';
import { PasswordchangeformComponent } from './landing/resetpassword/passwordchangeform/passwordchangeform.component';

const routes: Routes = [
  { path: '', component:  LandingComponent},
  { path: 'signIn', component:  SignInComponent},
  { path: 'confirm/:uid', component:  ConfirmComponent},
  { path: 'confirminfo', component:  ConfirminfoComponent},
  { path: 'login', component:  LoginComponent},
  { path: 'main', component:  MainComponent},
  { path: 'video/:videoTitle', component:  VideoComponent},
  { path: 'profil/:uid/:token', component:  ProfilComponent},
  { path: 'passwordreset', component:  ResetpasswordComponent,},
  { path: 'setnewpassword/:uid/:token', component:  PasswordchangeformComponent,},
  { path: 'impressum', component:  ImpressumComponent},
  { path: 'datenschutz', component:  DatenschutzComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
