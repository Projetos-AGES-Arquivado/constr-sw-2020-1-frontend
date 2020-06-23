import { Component, OnInit } from '@angular/core';
import { TypesResourcesService } from '../../services/types-resources.service'
import { Resources } from '../../models/resources.model';

@Component({
  selector: 'app-types-resources',
  templateUrl: './types-resources.component.html',
  styleUrls: ['./types-resources.component.scss']
})
export class TypesResourcesComponent implements OnInit {

  constructor(private typesResourcesService: TypesResourcesService) { }

  resources: Resources[];
  resourcesTypes: any[];
  cols: any[];

  ngOnInit() {
    this.getResourcesTypes();
    this.getResources();
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
