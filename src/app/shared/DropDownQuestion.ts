import {QuestionBase} from './question-base.model';

export class DropDownQuestion extends QuestionBase<string> {
  controlType: 'dropDown';
  options: {key: string, value: string}[] = [];
  constructor(formData: {} = {}) {
    super(formData, 'dropDown');
    this.options = formData['options'] || [];
  }
}
