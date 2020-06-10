import { InputType } from './input-type.enum';
import { RequestType } from './request-type.enum';
import { Card } from 'src/Card';

export class FormInputModel {
  inputType: InputType;
  //required only to DropDownInputs
  dropdownElements?: DropdownElement[];
  //required if you want to create a HTML input with a name different of the fieldName property
  label?: string;
  fieldName: string;
  //required to chipset type of input
  title?: string
  //required to chipset type of input
  cardList?: Card[]
  //required to chipset type of input
  editionList? :boolean
}

export class DropdownElement {
  //do not send an id
  id?: number;
  //required, this property ill be send on the API request's body
  name: string;
  //required if you need to show on screen a value and send on the API another one
  //Example:
  //show on the dropdown the Professor's Name
  //send on the API the professor's UUID
  label?: string;
}