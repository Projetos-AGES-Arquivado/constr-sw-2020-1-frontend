import { HttpClient } from '@angular/common/http';

export interface Building {
  buildingID: string;
  buildingName: string;
  campus: string;
  numberOfRooms: number;
}

export class BuildingRoomsApi {
  private baseURL: string = 'https://stark-gorge-03313.herokuapp.com';

  constructor(private httpClient: HttpClient) {}

  async listBuildings(): Promise<Building[]> {
    const response = await this.httpClient
      .get(`${this.baseURL}/buildings`)
      .toPromise();
    return response as Building[];
  }
}
