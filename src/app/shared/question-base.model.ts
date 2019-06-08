export class QuestionBase<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  controlType: string;
  constructor(formData: {
    value?: T,
    key?: string,
    label?: string,
    required?: boolean,
  }, controlType: string) {
    this.value = formData.value;
    this.key = formData.key;
    this.label = formData.label;
    this.required = formData.required;
    this.controlType = controlType;
  }
}
