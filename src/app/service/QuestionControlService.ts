import {Injectable} from '@angular/core';
import {QuestionBase} from '../shared/question-base.model';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs/index';
import {PropertiesQuestion} from '../shared/PropertiesQuestion';

@Injectable()
export class QuestionControlService {
  questionsChanged = new Subject();
  constructor() {}

  toFormGroup(questions: QuestionBase<any>[]) {
    console.log(questions);
    const group: any = {};
    questions.forEach(question => {
      /*if (question.key !== 'pdfJournal') {*/
        if (!(question instanceof PropertiesQuestion)) {
          group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
            : new FormControl(question.value || '');
        } else {
          group[question.key] = new FormArray([]);
        }
    });
    return new FormGroup(group);
  }
}
