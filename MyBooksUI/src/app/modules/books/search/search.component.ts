import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { book } from '../book';
import { FavouriteService } from '../favourite.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  beforeSearch: boolean = true;
  afterSearch: boolean = false;
  staticBookList: any;
  bks: any;
  searchText: any;
  apiUrl: string;
  bookList: any = [];
  errorDiv: boolean = false;
  errorMessage: any;
  SearchForm: FormGroup;
  selected: any;
  books: Array<book>;
  dbBookList: any = [];
  modifiedList = [];
  book: book;
  isFavourite: boolean;
  selectedCategory: any;
  categories = ['author', 'title', 'any']
  
  constructor(private snackbar: MatSnackBar,private fb: FormBuilder,private favouriteservice: FavouriteService,private authSerice: AuthenticationService) { }

  ngOnInit() {
    this.favouriteservice.getFavourites(this.authSerice.user).subscribe(
      data => {
        console.log(data);
        if (data.length > 0) {
          this.dbBookList = data;
        }
      }
    );
  }


  search(searchKey) {
    console.log(searchKey);
    console.log(this.selected);
    this.afterSearch = true;
    this.beforeSearch = false;
    this.errorDiv = false;
    this.bookList = new Array<any>();
    if (searchKey == 'any') {
      this.selected = 'q';
    }
    this.checkAlready();
    this.apiUrl = 'http://openlibrary.org/search.json?' + this.selected + '=' + searchKey;
    this.favouriteservice.getBooks(this.apiUrl).subscribe(
      data => {
        console.log(data);
        if (data.numFound > 0) {
          this.bks = this.formatObjects(data.docs);
          for (let book of this.bks) {
            if ((book.isbn != null && book.isbn.length > 1) && book.author_name != undefined) {
              this.bookList.push(book);
            }
          }
          this.checkAlready();
        } else {
          this.errorDiv = true;
          this.errorMessage = 'No such result found';
        }
      },
      error => {
        console.log(error);
        this.errorDiv = true;
        this.errorMessage = 'Retry';
      }
    );
  }

  checkAlready() {
    if (this.bookList.length > 0) {
      for (let book of this.bookList) {
        for (let bk of this.dbBookList) {
          if (book.isbn[0] === bk.isbn) {
            book.isFavourite = false;
          }
        }
      }
    }
  }

  formatObjects(objects) {
    let books = [];
    for (let obj of objects) {
      let modified = {
        title: obj.title,
        author_name: obj.author_name,
        isbn: obj.isbn,
        isFavourite: true,
        key: obj.key,
      };
      books.push(modified);
    }
    return books;
  }


  favourite(book){
    let message=`${book.title} add to favourites`;
    console.log(book);
    console.log(this.authSerice.user);
      let saveBook = {
      title: book.title,
      author_name: book.author_name[0],
      isbn: book.isbn[0],
    };
    this.favouriteservice.saveBook(saveBook).subscribe(book=>{
      console.log("book saved");
      this.snackbar.open(message, '', {
        duration:1000
      });
    })
  }

}
