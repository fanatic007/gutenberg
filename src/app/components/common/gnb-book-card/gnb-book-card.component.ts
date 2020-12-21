import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gnb-book-card',
  templateUrl: './gnb-book-card.component.html',
  styleUrls: ['./gnb-book-card.component.scss']
})
export class GnbBookCardComponent implements OnInit {

  @Input() bookCoverUrl;
  @Input() bookTitle;
  @Input() bookAuthor;
  constructor() {
  }

  ngOnInit(): void {
  }

}
