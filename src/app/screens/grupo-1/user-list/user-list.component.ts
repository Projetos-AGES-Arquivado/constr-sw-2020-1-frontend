import { Component, OnInit } from '@angular/core';
import { CardInterface } from 'src/app/components/card/card.interface';
import { HttpClient } from '@angular/common/http';
import { FormInputModel } from 'src/app/models/form-input.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}

  cards: CardInterface[];
  exibiForm: boolean;

  ngOnInit(): void {
    this.cards = new Array<CardInterface>();
    this.exibiForm = false;
    this.getUsers();
  }

  public getUsers() {
    this.httpClient.get('http://54.211.11.43:3456/api/users').subscribe(
      (response: any[]) => {
        response.forEach((element) => {
          console.log(element);
          this.cards.push({
            _id: element._id,
            label: element.name,
          });
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showForm() {
    this.exibiForm = !this.exibiForm;
  }

  eventEmmiter(event) {
    alert(`Evento ${event.action} -> ${event.id}`);
    switch (event.action) {
      case 'edit':
        this.onEdit(event.id);
        break;
      case 'remove':
        this.onRemove(event.id);
        break;
    }
  }

  onEdit(id) {
    alert(`Vamos editar o id ${id}`);
  }

  onRemove(id) {
    console.log(id);
    this.httpClient
      .delete('http://54.211.11.43:3456/api/users/' + id)
      .subscribe(() => {
        this.cards = this.cards.filter((cards) => cards._id !== id);
      });
  }
}
