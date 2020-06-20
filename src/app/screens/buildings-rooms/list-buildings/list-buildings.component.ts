import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Building, BuildingRoomsApi } from '../api';
import { Router } from '@angular/router';

@Component({
  selector: 'list-buildings',
  templateUrl: './list-buildings.component.html',
})
export class ListBuildingsComponent implements OnInit {
  private api: BuildingRoomsApi;

  @Input() public buildings: Building[] = [];

  constructor(httpClient: HttpClient, private router: Router) {
    this.api = new BuildingRoomsApi(httpClient);
  }

  async ngOnInit(): Promise<void> {
    await this.loadBuildings();
  }

  async loadBuildings() {
    this.buildings = await this.api.listBuildings();
  }

  async removeBuilding(building: Building) {
    await this.api.removeBuilding(building.buildingID);
    await this.loadBuildings();
  }

  redirectToNewScreen() {
    this.router.navigateByUrl(`/buildings/create`);
  }

  redirectToEditScreen(buiding: Building) {
    // redirect to edit screen
  }

  redirectToRoomsScreen(building: Building) {
    this.router.navigateByUrl(`/buildings/${building.buildingID}/rooms`);
    // redirect to rooms
  }
}
