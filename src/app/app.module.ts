import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import { MoviebarComponent } from './main/moviebar/moviebar.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './landing/login/login.component';
import { LandingComponent } from './landing/landing.component';
import { MainComponent } from './main/main.component';
import {MatCardModule} from '@angular/material/card';
import { SignInComponent } from './landing/sign-in/sign-in.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ImpressumComponent } from './landing/impressum/impressum.component';
import { FooterComponent } from './footer/footer.component';
import { VideoComponent } from './video/video.component';
import { ProfilComponent } from './main/profil/profil.component';
import { AuthInterceptor } from './auth.interceptor';
import { DatenschutzComponent } from './landing/datenschutz/datenschutz.component';
import { ConfirmComponent } from './landing/sign-in/confirm/confirm.component';
import { ConfirminfoComponent } from './landing/sign-in/confirm/confirminfo/confirminfo.component';
import { ResetpasswordComponent } from './landing/resetpassword/resetpassword.component';
import { PasswordchangeformComponent } from './landing/resetpassword/passwordchangeform/passwordchangeform.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MoviebarComponent,
    LoginComponent,
    LandingComponent,
    MainComponent,
    SignInComponent,
    ImpressumComponent,
    FooterComponent,
    VideoComponent,
    ProfilComponent,
    DatenschutzComponent,
    ConfirmComponent,
    ConfirminfoComponent,
    ResetpasswordComponent,
    PasswordchangeformComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
