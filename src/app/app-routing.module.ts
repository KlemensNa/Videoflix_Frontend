import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviebarComponent } from './main/moviebar/moviebar.component';

const routes: Routes = [
    { path: '', component:  MoviebarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
