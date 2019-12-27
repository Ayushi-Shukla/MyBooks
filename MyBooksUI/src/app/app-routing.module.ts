import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardService } from './authguard.service';
import { DashboardComponent } from './modules/books/dashboard/dashboard.component';
import { FavouriteComponent } from './modules/books/favourite/favourite.component';
import { SearchComponent } from './modules/books/search/search.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
        canActivate:[AuthguardService]
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate : [AuthguardService]
      },
      {
        path: 'favourite',
        component: FavouriteComponent,
        canActivate : [AuthguardService]
      },
      {
        path: 'search',
        component: SearchComponent,
        canActivate : [AuthguardService]
      },

    ]
  }];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
