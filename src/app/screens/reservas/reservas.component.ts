import {Component} from '@angular/core';
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

  urlApi: string;

  async showForm(){
    this.exibiForm = !this.exibiForm;
    await this.montaForm({method : 'POST', endPoint: this.urlApi});
  }

  async montaForm(defaultValues){
    this.users = await this.apiService.getUsers();
    this.resources = await this.apiService.getResources();
    this.subjects = await this.apiService.getSubjects();

    this.form = {
      title: (!defaultValues.title ? 'Cadastrar nova reserva' : defaultValues.title),
      inputs: [
        {
          inputType: InputType.Dropdown,
          fieldName: 'idResources',
          label: 'Recursos',
          dropdownElements: this.resources,
          multiple: 'multiple',
          standardValue: defaultValues.idResources
        },
        {
          inputType: InputType.Dropdown,
          fieldName: 'idUser',
          label: 'Usuario',
          dropdownElements: this.users,
          standardValue: defaultValues.idUser,
        },
        {
          inputType: InputType.Dropdown,
          fieldName: 'idSubject',
          label: 'Disciplina',
          dropdownElements: this.subjects,
          standardValue: defaultValues.idSubject
        },
        {
          inputType: InputType.Text,
          label: 'Data Inicio',
          fieldName: 'timeOpen',
          standardValue: defaultValues.timeOpen
        },
        {
          inputType: InputType.Text,
          fieldName: 'timeClose',
          label: 'Data Fim',
          standardValue: defaultValues.timeClose
        },
      ],
      chipInputs: [{
        chips: 'teste',
        cardList: 'teste'
      }],
      requestType: (defaultValues.method === 'POST') ? RequestType.POST : RequestType.PUT,
      saveEndpoint: defaultValues.endPoint,
    };
  }

  constructor( private apiService: ReservasApiService, private routeParams: ActivatedRoute, private route: Router ) {

    this.exibiCardInfo = false;
    this.exibiForm = false;

    this.urlApi = 'http://3.16.255.145:3457/reserves';

    this.montaForm({method : 'POST', endPoint: this.urlApi});
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

      this.subjects.forEach(subject => {
        if (this.reserve.idSubject === subject.name){
          this.reserve.idSubject = subject.label;
        }
      });
  }

  async getReserves(){

    this.cards = [];
    this.reserves = await this.apiService.getReserves();
    this.reserves.forEach(reserve => {
      const reserva: {_id: string; label: string} = {
        _id: reserve._id,
        label: `Reserva ${reserve.timeOpen}`
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
      default:
        break;
    }
  }

  async onEdit(id){
    this.reserves = await this.apiService.getReserves();
    this.reserve = this.reserves.filter(r => r._id === id)[0];
    const defaultValues = {
      title: `Editar ${id}`,
      idUser: this.reserve.idUser,
      idSubject: this.reserve.idSubject,
      idResources: this.reserve.idResources,
      timeOpen: this.reserve.timeOpen,
      timeClose: this.reserve.timeClose,
      endPoint: `${this.urlApi}/${id}`,
      method: 'PUT',
    };

    await this.montaForm(defaultValues);
    this.exibiForm = !this.exibiForm;
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
      alert('Efetuado com sucesso!');
    } else {
      alert ('Erro ao cadastrar');
    }
  }

}
