import { RequestType } from 'src/app/models/request-type.enum';
import { InputType } from 'src/app/models/input-type.enum';

export const USER_REGISTRATION_MODEL = {
  title: 'Cadastro de Usuários',
  requestType: RequestType.POST,
  saveEndpoint: 'http://54.211.11.43:3456/api/users',
  inputs: [
    {
      inputType: InputType.Text,
      label: 'Nome',
      fieldName: 'name',
    },
    {
      inputType: InputType.Text,
      label: 'Grupos',
      fieldName: 'roleName',
    },
    {
      inputType: InputType.Text,
      label: 'Email',
      fieldName: 'email',
    },
    {
      inputType: InputType.Text,
      label: 'Apelido',
      fieldName: 'nickname',
    },
  ],
};
