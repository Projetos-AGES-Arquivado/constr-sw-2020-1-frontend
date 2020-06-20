import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Building, BuildingRoomsApi } from '../api';

@Component({
  selector: 'list-buildings',
  templateUrl: './list-buildings.component.html',
})
export class ListBuildingsComponent implements OnInit {
  private api: BuildingRoomsApi;

  @Input() public buildings: Building[] = [];

  constructor(httpClient: HttpClient) {
    this.api = new BuildingRoomsApi(httpClient);
  }

  async ngOnInit(): Promise<void> {
    this.buildings = await this.api.listBuildings();
  }
}
