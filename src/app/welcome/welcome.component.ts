import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  isUserLogged: boolean;
  constructor(private authService: AuthService) {
    this.authService.userLogged.subscribe(
      (user: boolean) => {
        this.isUserLogged = user;
      }
    );
  }

  ngOnInit() {
    this.isUserLogged = this.authService.isLoggedIn();
  }

}
