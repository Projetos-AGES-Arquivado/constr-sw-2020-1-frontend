import { Component, OnInit } from '@angular/core';
import { CardInterface } from 'src/app/components/card/card.interface';
import { HttpClient } from '@angular/common/http';
import { InputType } from 'src/app/models/input-type.enum';
import { RequestType } from 'src/app/models/request-type.enum';
import { FormModel } from 'src/app/models/form-interface';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}

  cards: CardInterface[];
  exibiForm: boolean;
  form: FormModel;

  ngOnInit(): void {
    this.cards = new Array<CardInterface>();
    this.exibiForm = false;
    this.form = this.buildForm();
    this.getUsers();
  }

  public getUsers() {
    this.httpClient.get('http://54.211.11.43:3456/api/roles').subscribe(
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
    this.form.requestType = RequestType.POST;
    this.form.inputs.forEach((input) => {
      if (input.fieldName === 'name') {
        input.standardValue = '';
      }
    });
    this.exibiForm = !this.exibiForm;
  }

  eventEmmiter(event) {
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
    this.httpClient
      .get('http://54.211.11.43:3456/api/roles/' + id)
      .subscribe((user) => {
        this.form.requestType = RequestType.PUT;
        this.form.saveEndpoint = 'http://54.211.11.43:3456/api/roles/' + id;
        this.form.inputs.forEach((input) => {
          if (input.fieldName === 'name') {
            input.standardValue = user['name'];
          }
        });
        this.exibiForm = !this.exibiForm;
      });
  }

  onRemove(id) {
    console.log(id);
    this.httpClient
      .delete('http://54.211.11.43:3456/api/roles/' + id)
      .subscribe(() => {
        this.cards = this.cards.filter((cards) => cards._id !== id);
      });
  }

  private buildForm(): FormModel {
    return {
      title: 'Cadastro de Grupos',
      requestType: RequestType.POST,
      saveEndpoint: 'http://54.211.11.43:3456/api/roles',
      inputs: [
        {
          inputType: InputType.Text,
          label: 'Nome',
          fieldName: 'name',
        },
      ],
    } as FormModel;
  }

  public getResponse($event) {
    window.location.reload();
  }
}
