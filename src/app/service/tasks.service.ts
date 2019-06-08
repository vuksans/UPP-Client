import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Task} from '../shared/task.model';
import {GenericFormModel} from '../shared/genericForm.model';
import {Subject} from 'rxjs/index';
import {ProcessInfoModel} from '../shared/processInfo.model';

@Injectable()
export class TasksService {
  serverUrl = 'http://localhost:8080';
  selectedTask = new Subject();
  selectedFile = new Subject();
  constructor(private httpClient: HttpClient) {}

  getTasksForUser() {
    const requestOptions = {
      headers: new HttpHeaders({ Authorization : 'Bearer ' + localStorage.getItem('token')})
    };
    return this.httpClient.get<Task[]>(this.serverUrl + '/api/tasks/all', requestOptions);
  }
  getTaskFormData(taskId: string) {
    const requestOptions = {
      headers: new HttpHeaders({ Authorization : 'Bearer ' + localStorage.getItem('token')})
    };
    return this.httpClient.get<GenericFormModel[]>(this.serverUrl + '/api/tasks/task/' + taskId, requestOptions);
  }
  executeTask(taskFormData, taskId) {
    const requestOptions = {
      headers: new HttpHeaders({ Authorization : 'Bearer ' + localStorage.getItem('token')})
    };
    return this.httpClient.post(this.serverUrl + '/api/tasks/execute/' + taskId, taskFormData, requestOptions);
  }
  getProcessInfo(taskId: string) {
    const requestOptions = {
      headers: new HttpHeaders({ Authorization : 'Bearer ' + localStorage.getItem('token')})
    };
    return this.httpClient.get<ProcessInfoModel>(this.serverUrl + '/api/tasks/info/' + taskId, requestOptions);
  }
  uploadPdf(pdf, taskId) {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization : 'Bearer ' + localStorage.getItem('token'),
        ContentType : 'multipart/form-data'
      }),
    };
    return this.httpClient.post(this.serverUrl + '/api/tasks/uploadPdf/' + taskId, pdf, requestOptions);
  }
  /*downloadPdf(taskId) {
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization : 'Bearer ' + localStorage.getItem('token'),
        ContentType : 'multipart/form-data'
      }),
    };
    return this.httpClient.get(this.serverUrl + '/api/tasks/file/' + taskId, requestOptions);
  }*/
}
