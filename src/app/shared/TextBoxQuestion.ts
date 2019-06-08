import {QuestionBase} from './question-base.model';

export class TextBoxQuestion extends QuestionBase<string> {
  controlType = 'textBox';
  type: string;

  constructor(formData: {} = {}) {
    super(formData, 'textBox');
  }
}
