import { Component, OnInit } from '@angular/core';
import { CardInterface } from 'src/app/components/card/card.interface';
import { HttpClient } from '@angular/common/http';
import {
  FormInputModel,
  DropdownElement,
} from 'src/app/models/form-input.model';
import { InputType } from 'src/app/models/input-type.enum';
import { RequestType } from 'src/app/models/request-type.enum';
import { FormModel } from 'src/app/models/form-interface';
import { element } from 'protractor';
import { Card } from 'src/Card';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}

  cards: CardInterface[];
  exibiForm: boolean;
  form: FormModel;

  ngOnInit(): void {
    this.cards = new Array<CardInterface>();
    this.exibiForm = false;
    this.form = this.buildForm();
    this.getUsers();
  }

  public getUsers() {
    this.httpClient.get('http://54.211.11.43:3456/api/users').subscribe(
      (response: any[]) => {
        response.forEach((element) => {
          console.log(element);
          this.cards.push({
            _id: element._id,
            label: element.name,
          });
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showForm() {
    this.form.requestType = RequestType.POST;
    this.form.inputs.forEach((input) => {
      if (input.fieldName === 'name') {
        input.standardValue = '';
      }
      if (input.fieldName === 'email') {
        input.standardValue = '';
      }
      if (input.fieldName === 'nickname') {
        input.standardValue = '';
      }
      if (input.fieldName === 'roles') {
        input.cardList = new Array<Card>();
      }
    });
    this.exibiForm = !this.exibiForm;
  }

  eventEmmiter(event) {
    switch (event.action) {
      case 'edit':
        this.onEdit(event.id);
        break;
      case 'remove':
        this.onRemove(event.id);
        break;
    }
  }

  onEdit(id) {
    console.log('editou');
    this.httpClient
      .get('http://54.211.11.43:3456/api/users/' + id)
      .subscribe((user) => {
        this.form.requestType = RequestType.PUT;
        this.form.saveEndpoint = 'http://54.211.11.43:3456/api/users/' + id;
        this.form.inputs.forEach((input) => {
          if (input.fieldName === 'name') {
            input.standardValue = user['name'];
          }
          if (input.fieldName === 'email') {
            input.standardValue = user['email'];
          }
          if (input.fieldName === 'nickname') {
            input.standardValue = user['nickname'];
          }
          if (input.fieldName === 'roles') {
            input.cardList = new Array<Card>();
            user['roles'].forEach((element) => {
              this.httpClient
                .get('http://54.211.11.43:3456/api/roles/' + element)
                .subscribe((role) => {
                  input.cardList.push({
                    uniqueID: role['_id'],
                    label: role['name'],
                    selected: false,
                  });
                });
            });
          }
        });
        this.exibiForm = !this.exibiForm;
      });
  }

  onRemove(id) {
    console.log(id);
    this.httpClient
      .delete('http://54.211.11.43:3456/api/users/' + id)
      .subscribe(() => {
        this.cards = this.cards.filter((cards) => cards._id !== id);
      });
  }

  private buildForm(): FormModel {
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
          usesName: true,
          title: 'Grupos',
          cardList: [],
          editionList: true,
          multiSelection: true,
        },
      ],
    } as FormModel;
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

  public eventEmitted($event) {
    this.form.inputs.forEach((input) => {
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
    this.form.inputs.forEach((input) => {
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

  public reload() {
    window.location.reload();
  }
}
