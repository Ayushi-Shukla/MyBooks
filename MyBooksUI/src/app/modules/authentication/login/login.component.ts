import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { user } from '../User';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  newUser: user;
  error: any;

  constructor(private snackbar: MatSnackBar,private authService: AuthenticationService, private router: Router) {
    this.newUser=new user();
  }

  ngOnInit() {
  }

  loginUser(){
    console.log(this.newUser);
    this.authService.user=this.newUser.userId;
    this.authService.loginUser(this.newUser).subscribe((data)=>{
      console.log("Logged in!!! ");
      console.log(data);
      if (data['token']){
        this.authService.setToken(data['token']);
        console.log('token' , data['token']);
        this.router.navigate(['/dashboard']);
      }
      },
      error => {
        this.error = error;
        if (this.error.status = 409) {
          this.error = "UserId and Password mismatch";
          console.log(this.error);
        this.snackbar.open(this.error, '', {
          duration:5000
        });
        }
        if (this.error.status = 500) {
          this.error = "Internal Server Error";
          console.log(this.error);
          this.snackbar.open(this.error, '', {
            duration:5000
          });
          
        }
    })
  }

}
