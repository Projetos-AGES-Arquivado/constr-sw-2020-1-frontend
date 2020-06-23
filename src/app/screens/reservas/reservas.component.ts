import { Component } from '@angular/core';
import {InputType} from '../../models/input-type.enum';
import {RequestType} from '../../models/request-type.enum';
import {ReservasApiService} from './reservas.api.service';
import {CardInterface} from '../../components/card/card.interface';
@Component ({
    selector: 'app-reservas',
    templateUrl: './reservas.component.html',
    styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent{

  users: { name: string, label: string }[];

  exibiForm: boolean;

  form: {};

  // tslint:disable-next-line:ban-types
  cards: CardInterface[] ;

  showForm(){
    this.exibiForm = !this.exibiForm;
  }

  async montaForm(){
    this.users = await this.apiService.getUsers();

    this.form = {
      title: 'Cadastrar nova reserva',
      inputs: [
        {
          inputType: InputType.Dropdown,
          fieldName: 'Recursos',
          dropdownElements: [
            {
              name: 'Sala'
            },
            {
              name: 'Projetor'
            }
          ]
        },
        {
          inputType: InputType.Dropdown,
          fieldName: 'Usuario',
          dropdownElements: this.users
        },
        {
          inputType: InputType.Dropdown,
          fieldName: 'Disciplinas',
          dropdownElements: [
            {
              name: 'Matematica'
            },
            {
              name: 'Frances'
            }
          ]
        },
        {
          inputType: InputType.Text,
          fieldName: 'Data Inicio',
        },
        {
          inputType: InputType.Text,
          fieldName: 'Data Fim',
        },
      ],
      requestType: RequestType.POST,
      saveEndpoint: 'gugou',
    };
  }

  constructor( private apiService: ReservasApiService ) {

    this.exibiForm = false;

    this.montaForm();

    this.cards = [
      { _id: 1231, label: 'Reserva 01/07/2020'},
      { _id: 1232, label: 'Reserva 08/07/2020'},
      { _id: 1233, label: 'Reserva 18/07/2020'},
    ];
  }


  eventEmmiter(event){
    alert(`Evento ${event.action} -> ${event.id}`);
    switch (event.action) {
      case 'edit':
          this.onEdit(event.id);
          break;
      case 'remove':
        this.onRemove(event.id);
        break;
    }
  }

  onEdit(id){
    alert(`Vamos editar o id ${id}`);
  }

  onRemove(id){
    this.cards = this.cards.filter(cards => cards._id !== id);
  }

}
