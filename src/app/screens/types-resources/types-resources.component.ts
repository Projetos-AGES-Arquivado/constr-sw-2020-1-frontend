import { Component, OnInit } from '@angular/core';
import { TypesResourcesService } from '../../services/types-resources.service'
import { Resources } from '../../models/resources.model';
import {InputType} from '../../models/input-type.enum';
import {RequestType} from '../../models/request-type.enum';

@Component({
  selector: 'app-types-resources',
  templateUrl: './types-resources.component.html',
  styleUrls: ['./types-resources.component.scss']
})
export class TypesResourcesComponent implements OnInit {

  constructor(private typesResourcesService: TypesResourcesService) { 
    this.exibiForm = false;
    this.exibiFormEdit = false;

    this.montaForm();
  }

  resources: Resources[];
  resourcesTypes: any[];
  form: {};
  formEdit: {};
  cols: any[];
  exibiForm: boolean;
  exibiFormEdit : boolean
  resouceTypeId : any

  ngOnInit() {
    this.getResourcesTypes();
    this.getResources();
  }

  async montaForm(){
    // this.users = await this.apiService.getUsers();

    this.form = {
      title: 'Cadastrar Tipo de Recurso',
      inputs: [
        {
          inputType: InputType.Text,
          fieldName: 'Tipo de recurso',
        },
      ],
      requestType: RequestType.POST,
      saveEndpoint: 'http://52.91.97.146:3456/resources-types/',
    };

    this.formEdit = {
      title: 'Editar Tipo de Recurso',
      inputs: [
        {
          inputType: InputType.Text,
          fieldName: 'Tipo de recurso',
        },
      ],
      requestType: RequestType.PATCH,
      saveEndpoint: 'http://52.91.97.146:3456/resources-types/' + this.resouceTypeId,
    }
  }

  eventEmmiter(event){
    console.log('event', event);
    this.resouceTypeId = event.id;
    
    switch (event.action) {
      case 'edit':
        this.showFormEdit();
        this.montaForm();
          break;
      case 'remove':
        this.onRemove(event.id);
        break;
    }
  }

  showForm(){
    this.exibiForm = !this.exibiForm;
    this.exibiFormEdit = false;
  }

  showFormEdit(){
    this.exibiFormEdit = !this.exibiFormEdit;
    this.exibiForm = false;
  }

  onEdit(id){
    alert(`Vamos editar o id ${id}`);
    // this.showForm();
  }

  onRemove(id){
    this.resourcesTypes = this.resourcesTypes.filter(cards => cards._id !== id);
  }


  getResourcesTypes(){
    this.typesResourcesService.getResourcesTypes().subscribe((data: any[]) => {
      for(let i = 0; i < data.length; i++){
        data[i].label = data[i].type;
      }
      console.log('data', data);
      this.resourcesTypes = data;
      console.log("peace2", this.resourcesTypes)
    });
  }

  getResources() {
    this.typesResourcesService.getResources().subscribe((data: Resources[]) => {
      this.resources = data;
      console.log("peace", this.resources)
    });
  }

}
