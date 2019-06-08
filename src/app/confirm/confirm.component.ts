import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  confirmTry: boolean;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(
(params: Params) => {
        this.authService.confirmUser(params['token'])
          .subscribe(
            (res) => {
              this.confirmTry = true;
            },
            (err) => {
              this.confirmTry = false;
            }
          );
    }
    );
  }

}
