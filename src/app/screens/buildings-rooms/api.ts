import { HttpClient } from '@angular/common/http';

export class BuildingRoomsApi {
  private baseURL: string = 'https://stark-gorge-03313.herokuapp.com';

  constructor(private httpClient: HttpClient) {}

  async listBuildings() {
    const response = await this.httpClient
      .get(`${this.baseURL}/buildings`)
      .toPromise();
    return response;
  }
}