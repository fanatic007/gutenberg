import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { map, throttleTime } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../services/books.service';
import * as JSZip from 'jszip';

interface Book{
  id:Number;
  title:String;
  authors:String;
  cover: String;
  book_url: String;
}

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit, AfterViewInit, OnDestroy {
  searchIconPath: String;
  cancelIconPath: String;
  backIconPath: String;
  @ViewChild('searchBox') searchBox:ElementRef;
  searchQuery: String = "The Ad";
  genreName;
  books : Book[] = [];
  @ViewChild('anchor') anchor: ElementRef;
  nextPageUrl:string;
  options = {
    root: null
  };
  searchBoxSubscription : Subscription;
  showSpinner = true;

  private intersectionObserver: IntersectionObserver;

  constructor(private route: ActivatedRoute, private router : Router, private booksService: BooksService, private host: ElementRef) {
    this.searchIconPath = '/assets/icons/Search.svg';
    this.cancelIconPath = '/assets/icons/Cancel.svg';
    this.backIconPath = '/assets/icons/Back.svg';
  }
  ngOnDestroy(): void {
    this.searchBoxSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.genreName = this.route.snapshot.paramMap.get('genreName');    //getting the clicked genre name from previous component
  }

  ngAfterViewInit(): void {
    /* Intersection observer being fed by by spinner div's nativeElement. Event is generated when it intersects viewport */
    this.intersectionObserver = new IntersectionObserver(([entry]) => {
      entry.isIntersecting && this.getMoreBooks();
    }, this.options);
    this.intersectionObserver.observe(this.anchor.nativeElement);
    /* Subsciption to an observable created from 'keyup' event of search box. Observed every second using throttleTime operator */
    this.searchBoxSubscription = fromEvent(this.searchBox.nativeElement, 'keyup').pipe(
        throttleTime(1000),
        map((event:any)=> !event.altKey && !(event.keyCode == 32) )
      ).subscribe(queryEntered=>{ console.log(queryEntered);
        if(queryEntered){
          this.nextPageUrl = undefined;
          this.books=[];
          this.getMoreBooks();
      }
    });
  }



  getMoreBooks(){
    /* Single function to fetch books for the page. Priority to searchQuery, then nextPageUrl otherwise plain genre. */
    this.booksService.getBooksList(this.nextPageUrl,this.genreName,this.searchQuery).subscribe(
      (res)=>{
        if(res.count === 0){
          this.showSpinner = false;
          alert("No results");
        }
        else{
          res.results.forEach(book => {
            this.books.push({
              id: book.id,
              title: book.title,
              authors: book.authors.map((author)=> {return author.name}).join(',') , 
              cover: book.formats['image/jpeg'],
              book_url: this.getBookUrl(book.formats)
            });
          });
        }
        this.nextPageUrl = res.next;
        this.showSpinner = res.count>18;
      },
      (err)=>{
      }
    );    
  }

  findPropertyNameByRegex(o, r) {
    for (var key in o) {
      if (key.match(r)) {
        return key;
      }
    }
    return undefined;
  };

  getBookUrl(book){ /* Returns book url by priority */
    let key = this.findPropertyNameByRegex(book,/text\/html/);
    if(key){
      return book[key];
    }
    else{
      key = this.findPropertyNameByRegex(book,/application\/pdf/);
      if(key){
        return book[key];
      }
      else{
        return book[this.findPropertyNameByRegex(book,/text\/plain/)];
      }
    }
  }

  goBack(){
    this.router.navigateByUrl('home');
  }

  openBook(book_url){
    if(book_url === undefined){
      alert('No Viewable Version Available');
    }
    else{
      if(book_url.includes('.zip')){
        try{ /* Zip fetched from URL, converted to BLOB, fed to JSZIP reader method and finally shows the file by converting it to base64 */
          fetch(book_url.replace('www.gutenberg.org','localhost:4200')).then(r => { //domain replaced to avoid CORS error. (webpack proxy already in place to correct redirection)
            r.blob().then(blob => {
              let content = blob;
              let new_zip = new JSZip();
              new_zip.loadAsync(content)
              .then((zip)=>{
                let key = "";
                let mime_type = "";
                key = this.findPropertyNameByRegex(zip.files,/\/*\.htm/g);
                if(key){
                  mime_type = "text/html";
                }
                else{
                  key = this.findPropertyNameByRegex(zip.files,/\/*\.pdf/g);
                  if(key){
                    mime_type = "application/pdf";
                  }
                  else{
                    key = this.findPropertyNameByRegex(zip.files,/\/*\.txt/g);
                    if(key){
                      mime_type = "text/plain";
                    }
                    else{
                      alert('No Viewable Version Available');                      
                      return;
                    }
                  }
                }
                zip.file(key).async("base64").then((res)=>{
                  let new_window = window.open("");
                  new_window.document.write("<iframe width='100%' height='100%' src='data:"+ mime_type +";base64, " + encodeURI(res) + "'></iframe>");
                })
              });
            });
          });
        }
        catch(e){ console.log(e) }
      }
      else{
        window.open(book_url);
      }
    }
  }
}