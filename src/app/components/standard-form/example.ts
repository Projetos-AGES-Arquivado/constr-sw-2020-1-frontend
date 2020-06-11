import { InputType } from "src/app/models/input-type.enum";
import { RequestType } from 'src/app/models/request-type.enum';
import { CARDS } from 'src/MockedCards';

export const EXAMPLE = {
  title: 'TITULLLOOSOS',
  inputs: [
    {
      inputType: InputType.Text,
      fieldName: 'teste',
    },
    {
      inputType: InputType.Text,
      fieldName: 'teste',
    },
    {
      inputType: InputType.Text,
      fieldName: 'teste',
    },
    {
      inputType: InputType.Dropdown,
      fieldName: 'testanderson',
      dropdownElements: [
        {
          name: 'Teste1'
        },
        {
          name: 'Teste2'
        }
      ]
    },
    {
      inputType: InputType.Dropdown,
      fieldName: 'testanderson',
      dropdownElements: [
        {
          name: 'Teste1'
        },
        {
          name: 'Teste2'
        }
      ]
    },
    {
      inputType: InputType.Dropdown,
      fieldName: 'testanderson',
      dropdownElements: [
        {
          name: 'Teste1'
        },
        {
          name: 'Teste2'
        }
      ]
    },
    {
      inputType: InputType.Chip,
      fieldName: 'testechip',
      title: 'Titulo do Chipset',
      cardList: CARDS,
      editionList: true
    }
  ],
  requestType: RequestType.POST,
  saveEndpoint: 'gugou',
};
