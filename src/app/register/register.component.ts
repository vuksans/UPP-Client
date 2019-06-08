import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpForm: FormGroup;
  passwordsMatch = false;
  registerSuccess: boolean;
  working = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log(this.registerSuccess);
    this.signUpForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      repeatPassword: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required)
    });
  }
  onSubmit() {
    this.working = true;
    this.registerSuccess = null;
    if (this.signUpForm.controls['password'].value !== this.signUpForm.controls['repeatPassword'].value) {
      this.passwordsMatch = true;
      return;
    }
    this.passwordsMatch = false;
    this.authService.register(this.signUpForm.value)
      .subscribe(
        (res) => {
          this.working = false;
          this.registerSuccess = true;
        },
        (err) => {
          this.working = false;
          this.registerSuccess = false;
        }
      );
  }
}
