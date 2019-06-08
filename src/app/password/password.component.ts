import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  passwordsMatch = false;
  changeSuccess: boolean;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl(null, Validators.required),
      newPassword: new FormControl(null, Validators.required),
      repeatPassword: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    this.changeSuccess = null;
    console.log(this.changePasswordForm.value);
    if (this.changePasswordForm.controls['newPassword'].value !== this.changePasswordForm.controls['repeatPassword'].value) {
      this.passwordsMatch = true;
      return;
    }
    this.authService.changePassword(this.changePasswordForm.value)
      .subscribe(
        (res) => {
          this.changeSuccess = true;
        },
        (err) => {
          console.log(err);
          this.changeSuccess = false;
        }
      );
  }

}
