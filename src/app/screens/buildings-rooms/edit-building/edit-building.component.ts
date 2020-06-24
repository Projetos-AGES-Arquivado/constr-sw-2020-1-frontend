import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Building, BuildingRoomsApi } from '../api';
import { BUILDING_EDITION_MODEL } from './buildingModel';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edit-building',
  templateUrl: './edit-building.component.html',
})
export class EditBuildingComponent implements OnInit {
  private api: BuildingRoomsApi;
  private buildingId: string;
  public loading = true;

  buildingModel = BUILDING_EDITION_MODEL;

  @Input() public building: Building;

  constructor(
    httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.buildingId = this.route.snapshot.paramMap.get('id');
    this.buildingModel.saveEndpoint = this.buildingModel.saveEndpoint.replace(
      ':id',
      this.buildingId
    );
    this.api = new BuildingRoomsApi(httpClient);
  }

  async ngOnInit() {
    const building = await this.api.getBuilding(this.buildingId);
    Object.keys(building).forEach((key) => {
      const input = this.buildingModel.inputs.find(
        (input) => input.fieldName === key
      );
      if (input) {
        input.standardValue = building[key];
      }
    });
    console.log(building);
    this.loading = false;
  }

  onEdit() {
    this.router.navigateByUrl('buildings');
  }
}
