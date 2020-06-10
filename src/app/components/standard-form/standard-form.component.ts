import { Component, OnInit, Input, Output } from '@angular/core';
import { FormModel } from 'src/app/models/form-interface';
import {
  FormInputModel,
  DropdownElement,
} from 'src/app/models/form-input.model';
import { InputType } from 'src/app/models/input-type.enum';
import { FormGroup, FormControl } from '@angular/forms';
import { RequestType } from 'src/app/models/request-type.enum';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-standard-form',
  templateUrl: './standard-form.component.html',
  styleUrls: ['./standard-form.component.scss'],
})
export class StandardFormComponent implements OnInit {
  @Input()
  formModel: FormModel;

  @Output()
  response = new EventEmitter();

  textInputs: FormInputModel[];
  dropdownInputs: FormInputModel[];
  chipInpust: FormInputModel[];
  myForm: FormGroup;

  constructor(private httpClient: HttpClient) {
    this.textInputs = new Array<FormInputModel>();
    this.dropdownInputs = new Array<FormInputModel>();
    this.chipInpust = new Array<FormInputModel>();
  }

  ngOnInit(): void {
    this.validateInputs()
      ? this.buildInputs()
      : console.log('Invalid FormModel');
    console.log(this.textInputs);

    const group = {};
    this.formModel.inputs.forEach((input) => {
      group[input.fieldName] = new FormControl('');
    });
    this.myForm = new FormGroup(group);
  }

  public validateInputs(): boolean {
    return true;
  }

  public buildInputs() {
    const index = 0;
    this.formModel.inputs.forEach((input) => {
      switch (+input.inputType) {
        case InputType.Text:
          this.textInputs.push(input);
          break;
        case InputType.Dropdown:
          this.dropdownInputs.push(this.formatDropdownElements(input));
          break;
        case InputType.Chip:
          this.chipInpust.push(input);
          break;
      }
    });
  }

  public getOptions(options: string[]) {
    const result = new Array<any>();
    for (let index = 0; index < options.length; index++) {
      result.push({
        id: index,
        name: options[index],
      });
    }
    return result;
  }

  public formatDropdownElements(model: FormInputModel): FormInputModel {
    const elements = new Array<DropdownElement>();

    for (let index = 0; index < model.dropdownElements.length; index++) {
      elements.push({ id: index, name: model.dropdownElements[index].name, label: model.dropdownElements[index].label });
    }

    model.dropdownElements = elements;

    return model;
  }

  onSubmit() {
    let response: Observable<any>;
    switch (+this.formModel.requestType) {
      case RequestType.POST:
        response = this.httpClient.post(this.formModel.saveEndpoint, this.myForm.getRawValue());
        break;
      case RequestType.PUT:
        response = this.httpClient.put(this.formModel.saveEndpoint, this.myForm.getRawValue());
        break;
      case RequestType.PATCH:
        response = this.httpClient.patch(this.formModel.saveEndpoint, this.myForm.getRawValue());
        break;
    }

    response.subscribe(res => {
      this.response.emit(JSON.stringify(res));
    },
      err => {
        this.response.emit(JSON.stringify(err));
      }
    );
  }
}
