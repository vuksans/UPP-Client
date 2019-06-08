import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Magazine} from '../shared/magazine.model';
import {Subject} from 'rxjs/index';

@Injectable()
export class MagazineService {
  serverUrl = 'http://localhost:8080';
  appendTask = new Subject();
  constructor(private httpClient: HttpClient) {}

  getAllMagazines() {
    return this.httpClient.get<Magazine[]>(this.serverUrl + '/stationApi/magazines/all');
  }

  startProcess(magazineId: number) {
    const requestOptions = {
      headers: new HttpHeaders({ Authorization : 'Bearer ' + localStorage.getItem('token')})
    };
    return this.httpClient.get(this.serverUrl + '/stationApi/magazines/' + magazineId, requestOptions);
  }
}
