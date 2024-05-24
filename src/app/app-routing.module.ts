import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviebarComponent } from './main/moviebar/moviebar.component';
import { LandingComponent } from './landing/landing.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './landing/login/login.component';
import { SignInComponent } from './landing/sign-in/sign-in.component';

const routes: Routes = [
  { path: 'landing', component:  LandingComponent},
  { path: '', component:  LoginComponent},
  { path: 'main', component:  MainComponent},
  { path: 'signIn', component:  SignInComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
