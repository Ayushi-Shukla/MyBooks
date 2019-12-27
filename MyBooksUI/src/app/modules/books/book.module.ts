import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatIconModule } from '@angular/material/icon'
import { TokenInterceptor } from 'src/app/modules/books/interceptor.service';
import { FavouriteService } from './favourite.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FavouriteComponent } from './favourite/favourite.component';

@NgModule({
  declarations: [DashboardComponent,FavouriteComponent],
  imports: [
    CommonModule, HttpClientModule, AppRoutingModule, MatCardModule,
    MatButtonModule,MatSnackBarModule,MatDialogModule, 
    MatDialogModule, MatInputModule,FormsModule,
    ReactiveFormsModule, MatFormFieldModule,MatIconModule
  ],
  // entryComponents:[MovieDialogComponent],
  exports:[AppRoutingModule, DashboardComponent,FavouriteComponent 
    
  ],
  providers:[FavouriteService,],
})
export class BookModule { }
