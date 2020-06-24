import { Component, OnInit } from '@angular/core';
import { FormModel } from 'src/app/models/form-interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InputType } from 'src/app/models/input-type.enum';
import { RequestType } from 'src/app/models/request-type.enum';
import { Card } from 'src/Card';
import { DropdownElement } from 'src/app/models/form-input.model';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {
  constructor(private httpClient: HttpClient) {
    this.registrationModel = this.buildForm();
  }

  registrationModel: FormModel;

  ngOnInit(): void {}

  public eventEmitted($event) {
    this.registrationModel.inputs.forEach((input) => {
      let cardExists = false;
      if (input.inputType === 2) {
        input.cardList.forEach((card) => {
          if (card.label === $event.name) {
            cardExists = true;
          }
        });
        if (!cardExists) {
          input.cardList.push({
            uniqueID: $event.uniqueID,
            label: $event.name,
            selected: false,
          });
        }
      }
    });
  }

  public deleteCard($event) {
    this.registrationModel.inputs.forEach((input) => {
      if (input.inputType === 2) {
        const newCardList = new Array<Card>();
        input.cardList.forEach((card) => {
          if (card.label !== $event.label) {
            newCardList.push(card);
          }
        });
        input.cardList = newCardList;
      }
    });
  }

  private buildForm() {
    return {
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
          label: 'Email',
          fieldName: 'email',
        },
        {
          inputType: InputType.Text,
          label: 'Apelido',
          fieldName: 'nickname',
        },
        {
          inputType: InputType.Dropdown,
          label: 'Grupo',
          fieldName: 'roleName',
          dropdownElements: this.buildDropdownElements(),
          addButton: true,
          shouldNotSend: true,
          modalForm: {
            title: 'Adicionar Grupos',
            requestType: RequestType.POST,
            saveEndpoint: 'http://54.211.11.43:3456/api/roles',
            inputs: [
              {
                fieldName: 'name',
                inputType: InputType.Text,
                label: 'Nome do Grupo',
              },
            ],
          },
        },
        {
          inputType: InputType.Chip,
          label: 'Grupos',
          fieldName: 'roles',
          title: 'Grupos',
          cardList: [],
          editionList: true,
          multiSelection: true,
        },
      ],
    };
  }

  private buildDropdownElements(): DropdownElement[] {
    const elements = new Array<DropdownElement>();

    this.httpClient.get('http://54.211.11.43:3456/api/roles').subscribe(
      (response: any[]) => {
        response.forEach((element) => {
          elements.push({
            name: element.name,
            outputOnClick: true,
            uniqueID: element._id,
          });
        });
      },
      (error) => {
        console.log(error);
      }
    );
    return elements;
  }
}
