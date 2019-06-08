import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  flag = false;
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    this.flag = false;
    this.authService.login(form.value).subscribe(
      (res) => {
        this.authService.setSession(res);
        this.router.navigate(['../'], {relativeTo: this.route});
      },
      (err) => {
        if (err.status === 401) {
          this.flag = true;
        }
      }
    );
  }
}
