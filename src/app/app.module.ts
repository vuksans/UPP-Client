import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './service/auth.service';
import { WelcomeComponent } from './welcome/welcome.component';
import {AppRoutingModule} from './app-routing.module';
import {CookieService} from 'ngx-cookie-service';
import {MagazineService} from './service/magazine.service';
import { MagazineComponent } from './magazine/magazine.component';
import {MagazineItemDirective} from './shared/magazine-item.directive';
import {TasksService} from './service/tasks.service';
import { TasksComponent } from './tasks/tasks.component';
import {QuestionControlService} from './service/QuestionControlService';
import { DynamicFormComponent } from './tasks/task-info/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './tasks/task-info/dynamic-form/dynamic-form-question/dynamic-form-question.component';
import { TaskInfoComponent } from './tasks/task-info/task-info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { PasswordComponent } from './password/password.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    WelcomeComponent,
    MagazineComponent,
    MagazineItemDirective,
    TasksComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    TaskInfoComponent,
    RegisterComponent,
    ConfirmComponent,
    PasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [AuthService, CookieService, MagazineService, TasksService, QuestionControlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
