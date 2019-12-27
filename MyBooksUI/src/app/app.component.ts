import { Component } from '@angular/core';
import { AuthenticationService } from './modules/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MovieCruiser';

  constructor(private auth:AuthenticationService,private routes:Router, public router:Router){
  }
  ngOnInit() {
    
  }

  logout(){
    this.auth.deleteToken();
    this.routes.navigate(['/login']);
  }
}
