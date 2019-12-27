import { Component, OnInit } from '@angular/core';
import { FavouriteService } from '../favourite.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../authentication/authentication.service';
import { user } from '../../authentication/User';
import { MatSnackBar } from '@angular/material';
import { book } from '../book';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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
  selectedCategory: any;
  categories = ['author', 'title', 'any']

  constructor(private snackbar: MatSnackBar,private fb: FormBuilder,private favouriteservice: FavouriteService,private authSerice: AuthenticationService) { }

  ngOnInit() {
    console.log(this.authSerice.user);
    this.favouriteservice.getFavourites(this.authSerice.user).subscribe(
      data => {
        console.log(this.authSerice.user);
        console.log(data);
        if (data.length > 0) {
          this.dbBookList = data;
        }
      }
    );
    this.SearchForm = this.fb.group({
      searchControl: ['any', Validators.required],
      searchText: [null, Validators.required],
    });
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
