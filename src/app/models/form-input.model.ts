import { InputType } from './input-type.enum';
import { RequestType } from './request-type.enum';
import { Card } from 'src/Card';
import { FormModel } from './form-interface';

export class FormInputModel {
  inputType: InputType;
  //required only to DropDownInputs
  dropdownElements?: DropdownElement[];
  //required if you want to create a HTML input with a name different of the fieldName property
  label?: string;
  fieldName: string;
  shouldNotSend?: boolean;
  //required to chipset type of input
  title?: string;
  //required to chipset type of input
  cardList?: Card[];
  //required to chipset type of input
  editionList?: boolean;
  //required to chipset type of input
  multiSelection?: boolean;
  usesName?: boolean;
  standardValue?: string;
  addButton?: boolean;
  modalForm?: FormModel;
}

export class DropdownElement {
  //do not send an id
  id?: number;
  uniqueID?: string;
  //required, this property ill be send on the API request's body
  name: string;
  //just in case
  uuid?: string;
  //required if you need to show on screen a value and send on the API another one
  //Example:
  //show on the dropdown the Professor's Name
  //send on the API the professor's UUID
  label?: string;
  formModal?: FormModel;
  outputOnClick?: boolean;
}
