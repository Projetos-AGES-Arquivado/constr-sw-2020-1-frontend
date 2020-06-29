import { Component, OnInit, OnDestroy } from '@angular/core';
import {InputType} from '../../models/input-type.enum';
import {RequestType} from '../../models/request-type.enum';
import {ReservasApiService} from './reservas.api.service';
import {CardInterface} from '../../components/card/card.interface';
import {Reserves} from './reservas.interfaces';

import {ActivatedRoute, Router} from '@angular/router';

@Component ({
    selector: 'app-reservas',
    templateUrl: './reservas.component.html',
    styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent{

  users: { name: string, label: string }[];

  resources: { name: string, label: string }[];

  subjects: { name: string, label: string }[];

  reserves: Reserves[] ;

  exibiForm: boolean;

  exibiCardInfo: boolean;

  form: {};

  // tslint:disable-next-line:ban-types
  cards: CardInterface[] ;

  id: string;

  reserve: Reserves;

  optionsDatetime = {year: 'numeric',  month: 'numeric',  day: 'numeric',  hour: 'numeric',  minute: 'numeric',  second: 'numeric'};

  showForm(){
    this.exibiForm = !this.exibiForm;
  }

  async montaForm(){
    this.users = await this.apiService.getUsers();
    this.resources = await this.apiService.getResources();
    this.subjects = this.apiService.getSubjects();

    this.form = {
      title: 'Cadastrar nova reserva',
      inputs: [
        {
          inputType: InputType.Dropdown,
          fieldName: 'idResources',
          label: 'Recursos',
          dropdownElements: this.resources,
          multiple: 'multiple'
        },
        {
          inputType: InputType.Dropdown,
          fieldName: 'idUser',
          label: 'Usuario',
          dropdownElements: this.users
        },
        {
          inputType: InputType.Dropdown,
          fieldName: 'idSubject',
          label: 'Disciplina',
          dropdownElements: this.subjects
        },
        {
          inputType: InputType.Text,
          label: 'Data Inicio',
          fieldName: 'timeOpen',
        },
        {
          inputType: InputType.Text,
          fieldName: 'timeClose',
          label: 'Data Fim',
        },
      ],
      chipInputs: [{
        chips: 'teste',
        cardList: 'teste'
      }],
      requestType: RequestType.POST,
      saveEndpoint: 'http://3.16.255.145:3457/reserves',
    };
  }

  constructor( private apiService: ReservasApiService, private routeParams: ActivatedRoute, private route: Router ) {

    this.exibiCardInfo = false;
    this.exibiForm = false;

    this.montaForm();
    this.cards = [];
    this.getReserves();


    this.routeParams.params.subscribe(params => {
      this.id = params.id;
    });

    if (this.id){
      this.exibiCardInfo = true;
      this.showInfo();
    }
  }


  async showInfo(){
      this.users = await this.apiService.getUsers();
      this.resources = await this.apiService.getResources();
      this.subjects = await this.apiService.getSubjects();
      this.reserves = await this.apiService.getReserves();
      this.reserve = this.reserves.filter(r => r._id === this.id)[0];
      this.reserve.timeOpen = Intl.DateTimeFormat('pt-BR', this.optionsDatetime).format(new Date(this.reserve.timeOpen));
      this.reserve.timeClose = Intl.DateTimeFormat('pt-BR', this.optionsDatetime).format(new Date(this.reserve.timeClose));
      this.users.forEach(user => {
        if (this.reserve.idUser === user.name){
          this.reserve.idUser = user.label;
        }
      });
      this.reserve.idResources.forEach((value, ix) => {
        this.resources.forEach(resource => {
          if (value === resource.name){
            this.reserve.idResources[ix] = resource.label;
          }
        });
      });
  }

  async getReserves(){
    this.cards = [];
    this.reserves = await this.apiService.getReserves();
    this.reserves.forEach(reserve => {
      const reserva: {_id: string; label: string} = {
        _id: reserve._id,
        label: `Reserva ${Intl.DateTimeFormat('pt-BR', this.optionsDatetime).format(new Date(reserve.timeOpen))}`
      };
      this.cards.push(reserva);
    });
  }


  eventEmmiter(event){
    switch (event.action) {
      case 'edit':
        this.onEdit(event.id);
        break;
      case 'remove':
        this.onRemove(event.id);
        break;
      case 'show':
        this.onShow(event.id);
        break;
      default:
        break;
    }
  }

  onEdit(id){
    alert(`Vamos editar o id ${id}`);
  }

  onShow(id){
    this.route.navigate([`/reservas/${id}`]);
  }

  onRemove(id){
    if (!confirm(`Tem certeza que quer remover o id: ${id}`)){
      return null;
    }
    this.apiService.delReserve(id);

    this.cards = this.cards.filter(cards => cards._id !== id);
  }

  async onSubmitForm(event){
    const newReserve = (JSON.parse(event));
    if (newReserve._id){
      await this.getReserves();
      this.exibiForm = !this.exibiForm;
      alert('Cadastrado com sucesso!');
    } else {
      alert ('Erro ao cadastrar');
    }
  }

}
