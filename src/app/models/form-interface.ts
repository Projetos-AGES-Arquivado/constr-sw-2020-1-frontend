import { FormInputModel } from './form-input.model';
import { RequestType } from './request-type.enum';
import { Card } from 'src/Card';

export class FormModel {
  title: string;
  inputs: FormInputModel[];
  requestType: RequestType;
  //if your API uses a query param build the URL before send it to the component
  saveEndpoint: string;
}
