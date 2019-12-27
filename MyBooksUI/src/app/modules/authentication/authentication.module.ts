import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { LoginComponent } from 'src/app/modules/authentication/login/login.component';
import { RegisterComponent } from 'src/app/modules/authentication/register/register.component'
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-router.module';
import { MatCardModule } from '@angular/material/card';
import { AuthenticationService } from './authentication.service';
import { FormsModule } from '@angular/forms';
import { AuthguardService } from 'src/app/authguard.service';


@NgModule({
  declarations: [
    LoginComponent, RegisterComponent
  ],

  imports: [
      CommonModule,FormsModule,AuthenticationRoutingModule,MatButtonModule,
      MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule,
      RouterModule,MatIconModule
  ],
  providers: [AuthenticationService],
  exports: [RegisterComponent,LoginComponent]
  
})
export class AuthenticationModule { }
