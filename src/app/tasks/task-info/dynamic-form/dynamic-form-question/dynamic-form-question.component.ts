import {Component, Input, OnInit} from '@angular/core';

import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {TasksService} from '../../../../service/tasks.service';
import {PropertiesQuestion} from '../../../../shared/PropertiesQuestion';
import {QuestionBase} from '../../../../shared/question-base.model';

@Component({
  selector: 'app-dynamic-form-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css']
})
export class DynamicFormQuestionComponent implements OnInit {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  constructor(private tasksService: TasksService) { }
  get isValid() {return this.form.controls[this.question.key].valid; }
  ngOnInit() {
  }
  addFormGroup() {
    const newGroup: any = {};
    (<PropertiesQuestion> this.question).properties.forEach( property => {
      newGroup[property.fieldName] = new FormControl(null, Validators.required);
    });
    (<FormArray> this.form.get(this.question.key)).push(new FormGroup(newGroup));
    console.log(this.form);
  }
  onFileSelected(event) {
    if (event.target.files.length > 0) {
      this.tasksService.selectedFile.next(event.target.files[0]);
    }
  }
}
