import { RequestType } from 'src/app/models/request-type.enum';
import { InputType } from 'src/app/models/input-type.enum';
import { FormModel } from 'src/app/models/form-interface';

export const BUILDING_EDITION_MODEL: FormModel = {
  title: 'Edição de prédios',
  requestType: RequestType.PUT,
  saveEndpoint: 'https://stark-gorge-03313.herokuapp.com/buildings/:id',
  inputs: [
    {
      inputType: InputType.Text,
      label: 'Campus',
      fieldName: 'campus',
    },
    {
      inputType: InputType.Number,
      label: 'Número de Salas',
      fieldName: 'numberOfRooms',
    },
    {
      inputType: InputType.Text,
      label: 'Nome do Predio',
      fieldName: 'buildingName',
    },
    {
      inputType: InputType.Text,
      label: 'Identificador do Prédio',
      fieldName: 'buildingID',
    },
  ],
};
