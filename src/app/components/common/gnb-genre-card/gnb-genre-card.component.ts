import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gnb-genre-card',
  templateUrl: './gnb-genre-card.component.html',
  styleUrls: ['./gnb-genre-card.component.scss']
})
export class GnbGenreCardComponent implements OnInit {
  @Input() icon1Path: String;
  @Input() icon2Path: String;
  @Input() genreName: String;

  constructor(){
    this.icon2Path = '/assets/icons/Next.svg';
  }

  ngOnInit(): void {
  }

}
