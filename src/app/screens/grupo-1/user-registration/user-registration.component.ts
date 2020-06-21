import { Component, OnInit } from '@angular/core';
import { FormModel } from 'src/app/models/form-interface';
import { USER_REGISTRATION_MODEL } from './userModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InputType } from 'src/app/models/input-type.enum';
import { DropdownElement } from 'src/app/models/form-input.model';
import { RequestType } from 'src/app/models/request-type.enum';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {
  constructor(private httpClient: HttpClient) {
    this.registrationModel = USER_REGISTRATION_MODEL;
    this.buildDropdownElements();
  }

  registrationModel: FormModel;

  ngOnInit(): void {}

  private buildDropdownElements() {
    const dropdown = {
      inputType: InputType.Dropdown,
      label: 'Grupo',
      fieldName: 'roleName',
      dropdownElements: [],
      addButton: true,
      modalForm: {
        title: 'Adicionar Grupos',
        requestType: RequestType.POST,
        saveEndpoint: 'http://54.211.11.43:3456/api/roles',
        inputs: [
          {
            fieldName: 'name',
            inputType: InputType.Text,
            label: 'Nome do Grupo',
          },
        ],
      },
    };


    this.httpClient.get('http://54.211.11.43:3456/api/roles').subscribe(
      (response: any[]) => {
        response.forEach((element) => {
          dropdown.dropdownElements.push({
            name: element.name,
          });
        });
      },
      (error) => {
        console.log(error);
      }
    );

    this.registrationModel.inputs.push(dropdown);
  }
}
