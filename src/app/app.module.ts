import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import { MoviebarComponent } from './main/moviebar/moviebar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MoviebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
