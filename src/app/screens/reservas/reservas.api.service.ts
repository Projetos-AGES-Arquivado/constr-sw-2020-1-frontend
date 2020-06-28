import {HttpClient} from '@angular/common/http';
import { Injectable} from '@angular/core';
import {User, Resources, Reserves, Subjects, Courses, SubjectsReturn} from './reservas.interfaces';
import {resetFakeAsyncZone} from "@angular/core/testing";


@Injectable({ providedIn: 'root' })

export class ReservasApiService{

  apiUsers: string;

  apiResources: string;

  apiSubject: string;

  apiReserves: string;

  constructor(private http: HttpClient) {

    this.apiUsers = 'http://54.211.11.43:3456/api/users';

    this.apiResources = 'http://168.227.250.164:3456/resources';

    this.apiSubject = 'http://18.230.151.22:3000';

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
        label: `${resource.resourceType ? resource.resourceType.type : ''} - ${resource.resourceName}`
      };
    });
  }

  getSubjects(){
    const subjects = [];
    this.http.get<Subjects[]>(`${this.apiSubject}/classes`).subscribe( res => {
      res.forEach(classes => {
        this.http.get<Courses>(`${this.apiSubject}/courses/${classes.course}`).subscribe(courses => {
          const subject: SubjectsReturn = {
            name: classes._id,
            label: `${courses.name} - ${Intl.DateTimeFormat('pt-BR').format(new Date(classes.timeSchedule))}`,
          };
          subjects.push(subject);
        });
      });
    });
    return subjects;
  }

  async getReserves(){
    return this.http.get<Reserves[]>(this.apiReserves).toPromise();
  }

  delReserve(id){
    this.http.delete(`${this.apiReserves}/${id}`).subscribe(res => {
      alert(`${id} removido com sucesso!`);
    }, error => {
      alert('Erro ao remover!');
      console.log(error);
    });
  }
}
