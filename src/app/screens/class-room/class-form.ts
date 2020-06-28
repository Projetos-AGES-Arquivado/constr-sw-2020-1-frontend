import { InputType } from "src/app/models/input-type.enum";
import { RequestType } from 'src/app/models/request-type.enum';
import { FormModel } from '../../models/form-interface'

export const CLASS_FORM: FormModel = {
    title: 'Turma',
    inputs: [
        {
            inputType: InputType.Text,
            fieldName: 'number',
        },
        {
            inputType: InputType.Text,
            fieldName: 'timeSchedule'
        },
        {
            inputType: InputType.Text,
            fieldName: 'teacher'
        },
        {
            inputType: InputType.Text,
            fieldName: 'course'
        }
    ],
    requestType: RequestType.POST,
    saveEndpoint: 'http://18.230.151.22:3000/classes',
};

