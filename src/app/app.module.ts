import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GnbGenreCardComponent } from './components/common/gnb-genre-card/gnb-genre-card.component';
import { GnbBookCardComponent } from './components/common/gnb-book-card/gnb-book-card.component';
import { HomeComponent } from './components/home/home.component';
import { GenreComponent } from './components/genre/genre.component';

@NgModule({
  declarations: [
    AppComponent,
    GnbGenreCardComponent,
    GnbBookCardComponent,
    HomeComponent,
    GenreComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
