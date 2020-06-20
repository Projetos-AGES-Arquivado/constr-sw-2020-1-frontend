import { HttpClient } from '@angular/common/http';

export interface Building {
  buildingID: string;
  buildingName: string;
  campus: string;
  numberOfRooms: number;
}

export interface Room {
  roomNumber: string;
  roomType: string;
  roomCapacity: number;
}

export class BuildingRoomsApi {
  private baseURL: string = 'https://stark-gorge-03313.herokuapp.com';

  constructor(private httpClient: HttpClient) {}

  async getBuilding(buildingId: string): Promise<Building> {
    const response = await this.httpClient
      .get(`${this.baseURL}/buildings/${buildingId}`)
      .toPromise();
    return response as Building;
  }

  async listBuildings(): Promise<Building[]> {
    const response = await this.httpClient
      .get(`${this.baseURL}/buildings`)
      .toPromise();
    return (response as Building[]).filter((building) => building.buildingID);
  }

  async removeBuilding(buildingID: string): Promise<void> {
    await this.httpClient
      .delete(`${this.baseURL}/buildings/${buildingID}`)
      .toPromise();
  }

  async listRooms(buildingId: string): Promise<Room[]> {
    const response = await this.httpClient
      .get(`${this.baseURL}/buildings/${buildingId}/rooms`)
      .toPromise();
    return response as Room[];
  }

  async addBuilding(building: Building) {
    await this.httpClient
      .post(`${this.baseURL}/buildings`, building)
      .toPromise();
  }

  async removeRoom(buildingID: string, roomId: string): Promise<void> {
    await this.httpClient
      .delete(`${this.baseURL}/buildings/${buildingID}/rooms/${roomId}`)
      .toPromise();
  }
}
