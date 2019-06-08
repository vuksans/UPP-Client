import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs/index';
import {User} from '../shared/user.model';

@Injectable()
export class AuthService {

  serverUrl = 'http://localhost:8080';
  userLogged = new Subject();
  constructor(private httpClient: HttpClient) {

  }

  login(loginRequest) {
    return this.httpClient.post(this.serverUrl + '/auth', loginRequest);
  }
  register(registerRequest) {
    return this.httpClient.post(this.serverUrl + '/stationApi/users/create', registerRequest);
  }
  confirmUser(token) {
    return this.httpClient.get(this.serverUrl + '/stationApi/users/confirm/' + token);
  }
  changePassword(request) {
    const requestOptions = {
      headers: new HttpHeaders({ Authorization : 'Bearer ' + localStorage.getItem('token')})
    };
    return this.httpClient.post(this.serverUrl + '/stationApi/users/changePassword', request, requestOptions);
  }
  getUserFromToken() {
    const requestOptions = {
      headers: new HttpHeaders({ Authorization : 'Bearer ' + localStorage.getItem('token')})
    };
    return this.httpClient.get<User>(this.serverUrl + '/stationApi/users/user', requestOptions);
  }
  setSession(authResult) {
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('exp', authResult.exp);
    console.log(authResult);
    this.userLogged.next(true);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('exp');
    localStorage.removeItem('user');
    this.userLogged.next(false);
  }

  getExpiration() {
    const expiration = JSON.parse(localStorage.getItem('exp'));
    return expiration;
  }

  isLoggedIn() {
    const currentDate: Date = new Date();
    if (currentDate.getTime() < this.getExpiration()) {
      return true;
    }
    return false;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

}
