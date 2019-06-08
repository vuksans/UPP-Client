import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TasksService} from '../../service/tasks.service';
import {QuestionBase} from '../../shared/question-base.model';
import {ProcessInfoModel} from '../../shared/processInfo.model';
import {GenericFormModel} from '../../shared/genericForm.model';
import {TextBoxQuestion} from '../../shared/TextBoxQuestion';
import {DropDownQuestion} from '../../shared/DropDownQuestion';
import {PropertiesQuestion} from '../../shared/PropertiesQuestion';
import {QuestionControlService} from '../../service/QuestionControlService';
import {User} from '../../shared/user.model';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.css']
})
export class TaskInfoComponent implements OnInit {

  questions: QuestionBase<any>[] = [];
  processInfo: ProcessInfoModel;
  id: string;
  user: User;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private taskService: TasksService,
              private questionControlService: QuestionControlService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.getProcessInfoData();
        this.getTaskFormData();
      }
    );
  }
  downloadFile() {
    location.href = 'http://localhost:8080/api/tasks/file/' + this.id;
  }
  getProcessInfoData() {
    this.taskService.getProcessInfo(this.id)
      .subscribe(
        (res: ProcessInfoModel) => {
          this.processInfo = res;
          console.log(this.processInfo);
        }
      );
  }
  getTaskFormData() {
    this.questions = [];
    this.taskService.getTaskFormData(this.id)
      .subscribe(
        (res: GenericFormModel[]) => {
          res.forEach(formControl => {
            console.log(res);
            if (formControl.options == null && formControl.properties == null) {
              this.questions.push(new TextBoxQuestion({
                value: formControl.value,
                key: formControl.key,
                label: formControl.label,
                required: formControl.required
              }));
            } else if (formControl.properties == null) {
              this.questions.push(
                new DropDownQuestion({
                  value: formControl.value,
                  key: formControl.key,
                  label: formControl.label,
                  required: formControl.required,
                  options: formControl.options
                })
              );
            } else {
              this.questions.push(
                new PropertiesQuestion({
                  value: formControl.value,
                  key: formControl.key,
                  label: formControl.label,
                  required: formControl.required,
                  properties: formControl.properties
                })
              );
            }
          });
          console.log(this.questions);
          this.questionControlService.questionsChanged.next(this.questions);
          this.taskService.selectedTask.next(this.id);
        }
      );
  }

}
