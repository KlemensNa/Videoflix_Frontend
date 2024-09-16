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
import { ProfilComponent } from './landing/profil/profil.component';
import { AuthInterceptor } from './auth.interceptor';

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
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
