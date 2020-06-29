import { InputType } from "src/app/models/input-type.enum";
import { RequestType } from 'src/app/models/request-type.enum';
import { FormModel } from '../../models/form-interface'
import { CARDS } from 'src/app/screens/grupo-5/MockedCards';

export const LESSON_FORM: FormModel = {
  title: 'Aulas',
  inputs: [
    {
      inputType: InputType.Text,
      fieldName: 'date',
    },
    {
      inputType: InputType.Text,
      fieldName: 'class_id'
    }
  ],
  requestType: RequestType.POST,
  saveEndpoint: 'http://18.230.151.22:3000/lessons',
};
