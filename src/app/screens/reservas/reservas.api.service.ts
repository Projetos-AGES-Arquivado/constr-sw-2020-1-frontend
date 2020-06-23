import {HttpClient} from '@angular/common/http';
import { Injectable} from '@angular/core';
import {User, Resources, Reserves } from './reservas.interfaces';


@Injectable({ providedIn: 'root' })

export class ReservasApiService{

  apiUsers: string;

  apiResources: string;

  apiSubject: string;

  apiReserves: string;

  constructor(private http: HttpClient) {

    this.apiUsers = 'http://54.211.11.43:3456/api/users';

    this.apiResources = 'http://52.91.97.146:3456/resources/';

    this.apiSubject = 'http://52.91.97.146:3456/resources/';

    this.apiReserves = 'http://3.16.255.145:3457/reserves';

  }

  async getUsers(){
    const users = await this.http.get<User[]>(this.apiUsers).toPromise();
    return users.map(user => {
      return {
        name: user._id,
        label: user.name
      };
    });
  }

  async getResources(){
    const resources = await this.http.get<Resources[]>(this.apiResources).toPromise();
    return resources.map(resource => {
      return {
        name: resource._id,
        label: resource.resourceName
      };
    });
  }

  async getReserves(){
    return await this.http.get<Reserves[]>(this.apiReserves).toPromise();
  }
}
