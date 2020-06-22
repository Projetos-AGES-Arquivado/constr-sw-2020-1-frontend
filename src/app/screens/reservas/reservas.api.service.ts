import {HttpClient} from '@angular/common/http';
import { Injectable} from '@angular/core';
import {User} from './reservas.interfaces';


@Injectable({ providedIn: 'root' })

export class ReservasApiService{

  apiUsers: string;

  apiResources: string;

  apiSubject: string;

  constructor(private http: HttpClient) {

    this.apiUsers = 'http://54.211.11.43:3456/api/users';

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
}
