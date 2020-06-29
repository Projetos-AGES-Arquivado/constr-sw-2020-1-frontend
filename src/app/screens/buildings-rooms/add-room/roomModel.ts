import { RequestType } from 'src/app/models/request-type.enum';
import { InputType } from 'src/app/models/input-type.enum';
import { FormModel } from 'src/app/models/form-interface';

export const ROOM_REGISTRATION_MODEL: FormModel = {
  title: 'Cadastro de salas',
  requestType: RequestType.POST,
  saveEndpoint: 'https://stark-gorge-03313.herokuapp.com/buildings/:id/rooms',
  inputs: [
    {
      inputType: InputType.Text,
      label: 'Numero da sala',
      fieldName: 'roomNumber',
    },
    {
      inputType: InputType.Text,
      label: 'Tipo de Sala',
      fieldName: 'roomType',
    },
    {
      inputType: InputType.Number,
      label: 'Capacidade da sala',
      fieldName: 'roomCapacity',
    },
  ],
};