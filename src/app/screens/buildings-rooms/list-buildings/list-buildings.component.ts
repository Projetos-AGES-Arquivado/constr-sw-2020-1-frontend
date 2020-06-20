import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BuildingRoomsApi } from '../api';

@Component({
  selector: 'list-buildings',
  templateUrl: './list-buildings.component.html',
})
export class ListBuildingsComponent implements OnInit {
  private api: BuildingRoomsApi;
  buildings: any[] = [];

  constructor(httpClient: HttpClient) {
    this.api = new BuildingRoomsApi(httpClient);
  }

  async ngOnInit(): Promise<void> {
    const buildings = await this.api.listBuildings();
    console.log(buildings);
  }
}
