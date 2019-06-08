export class GenericFormModel {
  value: string;
  key: string;
  label: string;
  required: boolean;
  options: {key: string, value: string}[];
  properties: {fieldName: string, fieldType: string}[];
  constructor(formData: {
    value?: string,
    key?: string,
    label?: string,
    required?: boolean,
    options?: {key: string, value: string}[],
    properties?: {fieldName: string, fieldType: string}[]
  }) {
    this.value = formData.value;
    this.key = formData.key;
    this.label = formData.label;
    this.required = formData.required;
    this.options = formData.options;
    this.properties = formData.properties;
  }
}
