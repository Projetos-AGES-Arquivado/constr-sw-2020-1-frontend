import { InputType } from "src/app/models/input-type.enum";
import { RequestType } from 'src/app/models/request-type.enum';
import { FormModel } from '../../models/form-interface'

export const DISCIPLINE_FORM: FormModel = {
    title: 'Disciplina',
    inputs: [
        {
            inputType: InputType.Text,
            fieldName: 'name',
            label:'Nome',
            standardValue: ''
        },
        {
            inputType: InputType.Text,
            fieldName: 'academy',
            label: 'ID da Escola',
            standardValue: '507f191e810c19729de860ea'
        }
    ],
    requestType: RequestType.POST,
    saveEndpoint: ``,
};