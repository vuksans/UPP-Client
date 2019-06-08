import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {MagazineComponent} from './magazine/magazine.component';
import {TasksComponent} from './tasks/tasks.component';
import {TaskInfoComponent} from './tasks/task-info/task-info.component';
import {RegisterComponent} from './register/register.component';
import {ConfirmComponent} from './confirm/confirm.component';
import {PasswordComponent} from './password/password.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full'},
  { path: 'welcome' , component: WelcomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'magazines/:mode', component: MagazineComponent},
  { path: 'tasks', component: TasksComponent},
  { path: 'task/:id', component: TaskInfoComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'confirm/:token', component: ConfirmComponent},
  { path: 'changePassword', component: PasswordComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
