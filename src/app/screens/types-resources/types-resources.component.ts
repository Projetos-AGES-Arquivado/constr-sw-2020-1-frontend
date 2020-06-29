import { Component, OnInit } from '@angular/core';
import { TypesResourcesService } from '../../services/types-resources.service'
import { Resources } from '../../models/resources.model';
import {InputType} from '../../models/input-type.enum';
import {RequestType} from '../../models/request-type.enum';
import { Card } from '../../../Card';
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
    this.exibiFormPostResources = false;

    this.montaForm();
  }

  resources: any[];
  resourcesFilter: any[];
  resourcesTypes: any[];
  form: {};
  formEdit: {};
  formPostResources: {};
  cols: any[];
  exibiForm: boolean;
  exibiFormEdit : boolean
  exibiFormPostResources: boolean
  resourceTypeId : any

  ngOnInit() {
    this.getResourcesTypes();
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
      saveEndpoint: 'http://168.227.250.164:3456/resources-types/' + this.resourceTypeId,
    };

    this.formPostResources = {
      title: 'Incluir Recurso',
      inputs: [
        {
          inputType: InputType.Dropdown,
          fieldName: 'resourceType',
          dropdownElements: [
            {
              name: this.resourceTypeId
            }
          ]
        },
        {
          inputType: InputType.Text,
          fieldName: 'resourceName',
        },
      ],
      requestType: RequestType.POST,
      saveEndpoint: 'http://168.227.250.164:3456/resources/',
    }
  }

  eventEmmiter(event){
    this.resourceTypeId = event.id;
    
    switch (event.action) {
      case 'edit':
        this.getResources(true);
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

  newResource(){
    this.exibiFormPostResources = !this.exibiFormPostResources;
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
      this.resourcesTypes = data;
    });
  }

  getResources(isFilter: boolean) {
    this.typesResourcesService.getResources().subscribe((data: any[]) => {
      for(let i = 0; i < data.length; i++){
        data[i].label = data[i].resourceName;
      }
      this.resources = data;
      
      if(isFilter){
       this.getResourcesByType(this.resourceTypeId);
      }
    });
  }

  getResourcesByType(id: any){
    this.resourcesFilter = [];
    this.resources.forEach(resource => {
      if(resource.resourceType && resource.resourceType._id == id){
        this.resourcesFilter.push(resource);
      }  
    });
  }

  reloadPage(){
    this.exibiFormPostResources = false;
    this.getResources(true);
  }

  reloadResource(){
    alert("Tipo de recurso editado/incluído com sucesso!");
    this.backList();
  } 

  deleteResource(event: any) {
    this.typesResourcesService.deleteResources(event._id).subscribe((data: any[]) => {
      this.getResources(true);
      alert("Recurso excluído com sucesso!");
    }); 
  }
  
}
