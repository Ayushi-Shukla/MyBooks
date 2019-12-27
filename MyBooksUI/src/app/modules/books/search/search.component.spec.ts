import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FavouriteService } from '../favourite.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { FavouriteComponent } from '../favourite/favourite.component';
import { of } from 'rxjs';
import { LoginComponent } from '../../authentication/login/login.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RegisterComponent } from '../../authentication/register/register.component';
import { TokenInterceptor } from '../interceptor.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { SearchComponent } from './search.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatLabel, MatCardModule, MatButtonModule, MatSnackBarModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatIconModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let homeservice: FavouriteService;

  beforeEach(async(() => {

    
    TestBed.configureTestingModule({
      declarations: [ SearchComponent, DashboardComponent,
      LoginComponent, RegisterComponent,
    FavouriteComponent ],
      imports : [
        BrowserModule, BrowserAnimationsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule, MatSelectModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,MatSnackBarModule,MatDialogModule, 
        MatDialogModule, MatInputModule,FormsModule,
        ReactiveFormsModule, MatFormFieldModule,MatIconModule
      ],
      providers : [
        FavouriteService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        AuthenticationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('able to show the searched book details', () => {
    let searchKey : string = 'harry';
    homeservice = fixture.debugElement.injector.get(FavouriteService);
    const bookapi: any = JSON.parse(JSON.stringify({
      json : {
        datafound : 121,
        datadocs : [{
          isbn : '3543'
        },
      ]
      }
    }));
    spyOn(homeservice, "getBooks").and.returnValue(of(bookapi));
    component.search(searchKey);
    expect(homeservice.getBooks).toHaveBeenCalled();
  });

  it('invalid search! no such book', () => {
    let searchKey : string = 'harry';
    homeservice = fixture.debugElement.injector.get(FavouriteService);
    const bookapi: any = JSON.parse(JSON.stringify({
      json : {
      }
    }));
    spyOn(homeservice, "getBooks").and.returnValue(of(bookapi));
    component.search(searchKey);
    expect(homeservice.getBooks).toHaveBeenCalled();
    expect(component.errorMessage).toBe('No such result found');
  });

});
