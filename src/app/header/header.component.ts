import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {User} from '../shared/user.model';
import {Router} from '@angular/router';
import {TasksService} from '../service/tasks.service';
import {Task} from '../shared/task.model';
import {MagazineService} from '../service/magazine.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  email: string;
  isUserLogged: boolean;
  styleFlag = false;
  numberOfTasks: number;
  constructor(private authService: AuthService, private router: Router, private tasksService: TasksService, private magazineService: MagazineService) {}

  ngOnInit() {
    this.isUserLogged = this.authService.isLoggedIn();
    if (this.isUserLogged) {
      const loggedUser: User = JSON.parse(localStorage.getItem('user'));
      this.username = loggedUser.firstName;
      this.email = loggedUser.email;
      this.getNumberOfTasks();
    }
    this.authService.userLogged.subscribe(
      (useLogged: boolean) => {
        this.isUserLogged = useLogged;
        if (useLogged) {
          this.getUserInfo();
          this.getNumberOfTasks();
        }
      }
    );
    this.magazineService.appendTask.subscribe(
      (appended: boolean) => {
        if (appended) {
          this.numberOfTasks++;
        } else {
          this.numberOfTasks--;
        }
      }
    );
  }
  showDropDown() {
    this.styleFlag = !this.styleFlag;
  }
  signOut() {
    this.authService.logout();
    this.styleFlag = false;
    this.router.navigate(['']);
  }
  getUserInfo() {
    this.authService.getUserFromToken().subscribe(
      (user: User) => {
        this.username = user.firstName;
        this.email = user.email;
        localStorage.setItem('user', JSON.stringify(user));
      }
    );
  }
  getNumberOfTasks() {
    this.tasksService.getTasksForUser()
      .subscribe(
        (res: Task[]) => {
          this.numberOfTasks = res.length;
        }
      );
  }
}
