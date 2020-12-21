import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GenreComponent } from './components/genre/genre.component';

const routes: Routes = [
  { path:'home', component:HomeComponent },
  { path:'genre/:genreName', component:GenreComponent },
  { path:'', redirectTo:'home' , pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }