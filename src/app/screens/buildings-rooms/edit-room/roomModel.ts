import { RequestType } from 'src/app/models/request-type.enum';
import { InputType } from 'src/app/models/input-type.enum';
import { FormModel } from 'src/app/models/form-interface';

export const ROOM_EDITION_MODEL: FormModel = {
  title: 'Edição de salas',
  requestType: RequestType.PUT,
  saveEndpoint:
    'https://stark-gorge-03313.herokuapp.com/buildings/:id/rooms/:roomId',
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
