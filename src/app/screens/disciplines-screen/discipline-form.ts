import { InputType } from "src/app/models/input-type.enum";
import { RequestType } from 'src/app/models/request-type.enum';
import { FormModel } from '../../models/form-interface'

export const DISCIPLINE_FORM: FormModel = {
    title: 'Disciplina',
    inputs: [
        {
            inputType: InputType.Text,
            fieldName: 'name',
        },
        {
            inputType: InputType.Text,
            fieldName: 'academy'
        }
    ],
    requestType: RequestType.POST,
    saveEndpoint: 'http://18.230.151.22:3000/courses',
};