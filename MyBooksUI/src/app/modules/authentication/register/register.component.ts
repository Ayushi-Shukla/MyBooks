import { Component, OnInit } from '@angular/core';
import { user } from '../User';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newUser: user;
  error: any;

  constructor(private snackbar: MatSnackBar,private authService: AuthenticationService, private router: Router) {
    this.newUser=new user();
  }

  ngOnInit() {
  }

  registerUser(){
    this.authService.registerUser(this.newUser).subscribe((data)=>{
      console.log("user data: ", data);
      this.snackbar.open(data, '', {
        duration:5000
      });
      this.router.navigate(['/login']);
    },
    error => {
      this.error = error;
      if (this.error.status = 409) {
        this.error = "User aready exists, cannot be saved";
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
      }});
  }

  resetInput(registerForm: NgForm){
    registerForm.reset();
  }

}
