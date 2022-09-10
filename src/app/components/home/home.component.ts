import { AfterViewInit, Component, OnInit, ViewChildren, ViewChild, ElementRef, QueryList } from '@angular/core';
import { GENRES } from './genres';
import { fromEvent, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  title = "Gutenberg Project";
  subtitle = "A library of over 60,000 free eBooks";
  iconsBasePath = '/assets/icons/';
  genres = GENRES;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  routeToGenre(path){
    this.router.navigateByUrl('genre/'+path);
  }
}