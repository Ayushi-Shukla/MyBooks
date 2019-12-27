import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatCardModule, MatSelectModule, MatSnackBarModule, MatIconModule, MatSidenavModule, MatListModule, MatMenuTrigger, MatMenuModule, MatMenuItem } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationRoutingModule } from './modules/authentication/authentication-router.module';
import { AuthenticationService } from './modules/authentication/authentication.service';
import { AuthguardService } from './authguard.service';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { DashboardComponent } from 'src/app/modules/books/dashboard/dashboard.component';
import { FavouriteService } from './modules/books/favourite.service';
import { FavouriteComponent } from './modules/books/favourite/favourite.component';
import { TokenInterceptor } from './modules/books/interceptor.service';
import { SearchComponent } from 'src/app/modules/books/search/search.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { BookModule } from './modules/books/book.module';
import { FlexLayoutModule } from "@angular/flex-layout";

const appRoutes: Routes=[{
  path:'',
  redirectTo:'/login',
  pathMatch:'full',
}]
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    MainNavComponent
  ],
  imports: [
    BrowserModule,AppRoutingModule,HttpClientModule,
    RouterModule.forRoot(appRoutes), BrowserAnimationsModule, MatToolbarModule,
    MatButtonModule,MatDialogModule,FormsModule,MatInputModule,
    ReactiveFormsModule, MatFormFieldModule, AuthenticationRoutingModule,
    AuthenticationModule, MatCardModule, MatSelectModule,MatSnackBarModule,
    MatIconModule, LayoutModule,
    MatSidenavModule, MatMenuModule,
    MatListModule, BookModule,FlexLayoutModule
    ],
  providers: [AuthenticationService,AuthguardService,FavouriteService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
