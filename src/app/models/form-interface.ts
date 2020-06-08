import { FormInputModel } from './form-input.model';
import { RequestType } from './request-type.enum';

export class FormModel {
  title: string;
  inputs: FormInputModel[];
  requestType: RequestType;
  saveEndpoint: string;
}
