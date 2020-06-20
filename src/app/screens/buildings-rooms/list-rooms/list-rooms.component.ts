import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Building, BuildingRoomsApi, Room } from '../api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'list-rooms',
  templateUrl: './list-rooms.component.html',
})
export class ListRoomsComponent implements OnInit {
  private api: BuildingRoomsApi;
  private buildingId: string;

  @Input() public building: Building;
  @Input() public rooms: Room[];

  constructor(
    httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.api = new BuildingRoomsApi(httpClient);
    this.buildingId = this.route.snapshot.paramMap.get('id');
  }

  async ngOnInit(): Promise<void> {
    this.loadBuilding();
    this.loadRooms();
  }

  async loadBuilding() {
    this.building = await this.api.getBuilding(this.buildingId);
  }

  async loadRooms() {
    this.rooms = await this.api.listRooms(this.buildingId);
    console.log(this.rooms);
  }

  redirectToEditScreen(room: Room) {
    //
  }

  removeRoom(room: Room) {
    //
  }

  goBack() {
    this.router.navigateByUrl(`/buildings`);
  }
}
