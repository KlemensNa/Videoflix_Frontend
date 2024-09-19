import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './landing/login/login.component';
import { SignInComponent } from './landing/sign-in/sign-in.component';
import { ImpressumComponent } from './landing/impressum/impressum.component';
import { VideoComponent } from './video/video.component';
import { ProfilComponent } from './landing/profil/profil.component';
import { DatenschutzComponent } from './landing/datenschutz/datenschutz.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ConfirminfoComponent } from './confirm/confirminfo/confirminfo.component';

const routes: Routes = [
  { path: '', component:  LandingComponent},
  { path: 'login', component:  LoginComponent},
  { path: 'main', component:  MainComponent},
  { path: 'video', component:  VideoComponent},
  { path: 'signIn', component:  SignInComponent},
  { path: 'profil', component:  ProfilComponent},
  { path: 'impressum', component:  ImpressumComponent},
  { path: 'datenschutz', component:  DatenschutzComponent},
  { path: 'confirm', component:  ConfirmComponent},
  { path: 'confirminfo', component:  ConfirminfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
