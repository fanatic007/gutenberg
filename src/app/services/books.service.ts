import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  base_url = environment.gutenberg_base_api_url;
  constructor(private httpClient: HttpClient) { }

  getBooksList(next_url?,genre?,search_query?):Observable<any>{
    let params = {mime_type: 'image/jpeg'};
    let url = '';
    if(next_url){
      url = next_url;
    }
    else{
      url = this.base_url;
      params['topic'] = genre;
      if(search_query){
        params['search'] = search_query;
      }
    }
    return this.httpClient.get(url, { params: params });
  }

  get(url): Observable<any>{
    return this.httpClient.get(url);
  }
}