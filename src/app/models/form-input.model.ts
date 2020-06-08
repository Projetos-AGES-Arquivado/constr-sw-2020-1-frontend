import { InputType } from './input-type.enum';
import { RequestType } from './request-type.enum';

export class FormInputModel {
  inputType: InputType;
  dropdownElements?: DropdownElement[];
  standardValue?: string[];
  fieldName: string;
}

export class DropdownElement {
  id?: number;
  name: string;
}
