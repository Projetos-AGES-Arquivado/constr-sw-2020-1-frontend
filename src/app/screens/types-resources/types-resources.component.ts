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

  ngOnInit() {
    this.getResources();
  }

  getResources() {
    this.typesResourcesService.getResources().subscribe((data: Resources[]) => {
      this.resources = data;
      console.log("peace", this.resources)
    });
  }

}
