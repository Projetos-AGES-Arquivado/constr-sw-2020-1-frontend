import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BuildingRoomsApi } from '../api';
import { Router, ActivatedRoute } from '@angular/router';
import { ROOM_EDITION_MODEL } from './roomModel';

@Component({
  selector: 'edit-room',
  templateUrl: './edit-room.component.html',
})
export class EditRoomComponent implements OnInit {
  private api: BuildingRoomsApi;
  private buildingId: string;
  private roomId: string;
  public loading = true;

  roomModel = ROOM_EDITION_MODEL;

  constructor(
    httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.buildingId = this.route.snapshot.paramMap.get('id');
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    this.roomModel.saveEndpoint = this.roomModel.saveEndpoint
      .replace(':id', this.buildingId)
      .replace(':roomId', this.roomId);
    this.api = new BuildingRoomsApi(httpClient);
  }

  async ngOnInit() {
    const room = await this.api.getRoom(this.buildingId, this.roomId);
    Object.keys(room).forEach((key) => {
      const input = this.roomModel.inputs.find(
        (input) => input.fieldName === key
      );
      if (input) {
        input.standardValue = room[key];
      }
    });
    this.loading = false;
  }

  onEdit() {
    this.router.navigateByUrl(`buildings/${this.buildingId}/rooms`);
  }
}
