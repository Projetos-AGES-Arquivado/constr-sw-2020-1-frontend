import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Building, BuildingRoomsApi } from '../api';

@Component({
  selector: 'add-building',
  templateUrl: './add-building.component.html',
})
export class AddBuildingComponent implements OnInit {
  private api: BuildingRoomsApi;

  @Input() public building: Building;

  constructor(httpClient: HttpClient) {
    this.api = new BuildingRoomsApi(httpClient);
  }

  async ngOnInit(): Promise<void> {
    this.api.addBuilding(this.building);
  }
}
