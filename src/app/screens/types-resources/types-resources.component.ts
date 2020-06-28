import { Component, OnInit } from '@angular/core';
import { TypesResourcesService } from '../../services/types-resources.service'
import { Resources } from '../../models/resources.model';
import {InputType} from '../../models/input-type.enum';
import {RequestType} from '../../models/request-type.enum';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StandardModalComponent } from '../../components/standard-form/modal/standard-modal/standard-modal.component';
@Component({
  selector: 'app-types-resources',
  templateUrl: './types-resources.component.html',
  styleUrls: ['./types-resources.component.scss']
})
export class TypesResourcesComponent implements OnInit {

  constructor(private typesResourcesService: TypesResourcesService, public dialog: MatDialog) { 
    this.exibiForm = false;
    this.exibiFormEdit = false;

    this.montaForm();
  }

  resources: any[];
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
          fieldName: 'type',
        },
      ],
      requestType: RequestType.POST,
      saveEndpoint: 'http://168.227.250.164:3456/resources-types',
    };

    this.formEdit = {
      title: 'Editar Tipo de Recurso',
      inputs: [
        {
          inputType: InputType.Text,
          fieldName: 'type',
        },
      ],
      requestType: RequestType.PATCH,
      saveEndpoint: 'http://168.227.250.164:3456/resources-types/' + this.resouceTypeId,
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

  backList(){
    this.exibiForm = false;
    this.exibiFormEdit = false;
    this.getResourcesTypes();
  }

  onEdit(id){
    alert(`Vamos editar o id ${id}`);
    // this.showForm();
  }

  onRemove(id){
    this.typesResourcesService.deleteResourceTypes(id).subscribe((data: any[]) => {
      alert('Excluido com sucesso!');
      this.resourcesTypes = this.resourcesTypes.filter(cards => cards._id !== id);
    });
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
    this.typesResourcesService.getResources().subscribe((data: any[]) => {
      for(let i = 0; i < data.length; i++){
        data[i].label = data[i].resourceName;
      }
      this.resources = data;
      console.log("peace", this.resources)
    });
  }

}
