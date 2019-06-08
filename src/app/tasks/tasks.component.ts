import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {TasksService} from '../service/tasks.service';
import {Task} from '../shared/task.model';
import {QuestionBase} from '../shared/question-base.model';
import {GenericFormModel} from '../shared/genericForm.model';
import {TextBoxQuestion} from '../shared/TextBoxQuestion';
import {DropDownQuestion} from '../shared/DropDownQuestion';
import {QuestionControlService} from '../service/QuestionControlService';
import {PropertiesQuestion} from "../shared/PropertiesQuestion";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @ViewChild('myDiv') myDiv: ElementRef;
  userTasks: Task[];
  /*questions: QuestionBase<any>[] = [];
  hideForm = true;*/
  constructor(private taskService: TasksService, private renderer: Renderer2, private questionControlService: QuestionControlService) { }

  ngOnInit() {
    this.taskService.getTasksForUser()
      .subscribe(
        (res: Task[]) => {
          this.userTasks = res;
        }
      );
   /* let p = this.renderer.createElement('input');
    this.renderer.addClass(p, 'form-control');
    this.renderer.setAttribute(p, 'formControlName', 'username');
    const text = this.renderer.createText('Some text');
    this.renderer.appendChild(p, text);
    this.renderer.appendChild(this.myDiv.nativeElement, p);*/
  }
  /*getTaskFormData(taskId: string) {
    this.questions = [];
    this.hideForm = false;
    this.taskService.getTaskFormData(taskId)
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
          this.taskService.selectedTask.next(taskId);
        }
      );
  }*/

}
