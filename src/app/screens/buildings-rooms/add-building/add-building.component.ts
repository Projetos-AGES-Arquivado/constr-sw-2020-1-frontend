import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Building, BuildingRoomsApi } from '../api';
import { BUILDING_REGISTRATION_MODEL } from './buildingModel';
import { Router } from '@angular/router';

@Component({
  selector: 'add-building',
  templateUrl: './add-building.component.html',
})
export class AddBuildingComponent implements OnInit {
  private api: BuildingRoomsApi;
  buildingModel = BUILDING_REGISTRATION_MODEL;

  @Input() public building: Building;

  constructor(httpClient: HttpClient, private router: Router) {
    this.api = new BuildingRoomsApi(httpClient);
  }

  async ngOnInit(): Promise<void> {
    // this.api.addBuilding(this.building);
  }

  onCreate() {
    this.router.navigateByUrl('buildings');
  }
}
