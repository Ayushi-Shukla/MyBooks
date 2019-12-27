import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { book } from './book';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class FavouriteService{
  saveUrl: string = "http://localhost:9898/api/bookservice/book";
  getUrl: string = "http://localhost:9898/api/bookservice/books/";
delUrl: string="http://localhost:9898/api/bookservice/book/";
    constructor(private http: HttpClient) { }
    
    getBooks(apiUrl): Observable<any> {
      return this.http.get<any>(apiUrl);
    }


    saveBook(saveBook){
      console.log(saveBook);
      return this.http.post(this.saveUrl, saveBook);
    }

    
    getFavourites(userId): Observable<any> {
      return this.http.get<any>(this.getUrl);
    }

    getMyFavourites(): Observable<Array<book>>{
      return this.http.get<Array<book>>("http://localhost:9898/api/bookservice/books");
  }

    deleteFromFavouriteList(book:book){
      console.log(book);
      
      return this.http.delete(this.delUrl+book.id);
  }
    
}