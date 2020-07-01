import { InputType } from "src/app/models/input-type.enum";
import { RequestType } from 'src/app/models/request-type.enum';
import { FormModel } from '../../models/form-interface'

export const CLASS_FORM: FormModel = {
    title: 'Turma',
    inputs: [
        {
            inputType: InputType.Text,
            fieldName: 'number',
            label: 'Numero',
            standardValue: ''
        },
        {
            inputType: InputType.Text,
            fieldName: 'timeSchedule',
            label: 'Data',
            standardValue: ''
        },
        {
            inputType: InputType.Text,
            fieldName: 'teacher',
            label: 'ID do Professor',
            standardValue: ''
        },
        {
            inputType: InputType.Text,
            fieldName: 'course',
            label: 'ID do Curso',
            standardValue: ''
        }
    ],
    requestType: RequestType.POST,
    saveEndpoint: 'http://18.230.151.22:3000/classes',
};

