import {QuestionBase} from './question-base.model';

export class PropertiesQuestion extends QuestionBase<string> {
  controlType: 'array';
  properties: {fieldName: string, fieldType: string}[] = [];
  constructor(formData: {} = {}) {
    super(formData, 'array');
    this.properties = formData['properties'] || [];
  }
}
