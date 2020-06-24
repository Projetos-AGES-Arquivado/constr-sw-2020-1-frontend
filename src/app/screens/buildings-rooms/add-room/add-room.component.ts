import { Component } from '@angular/core';
import { ROOM_REGISTRATION_MODEL } from './roomModel';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'add-room',
  templateUrl: './add-room.component.html',
})
export class AddRoomComponent {
  private buildingId: string;
  roomModel = ROOM_REGISTRATION_MODEL;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.buildingId = this.route.snapshot.paramMap.get('id');
    this.roomModel.saveEndpoint = this.roomModel.saveEndpoint.replace(
      ':id',
      this.buildingId
    );
  }

  onCreate() {
    this.router.navigateByUrl(`buildings/${this.buildingId}/rooms`);
  }
}
