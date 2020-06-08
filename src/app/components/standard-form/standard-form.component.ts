import { Component, OnInit, Input, Output } from '@angular/core';
import { FormModel } from 'src/app/models/form-interface';
import { FormInputModel } from 'src/app/models/form-input.model';
import { InputType } from 'src/app/models/input-type.enum';

@Component({
  selector: 'app-standard-form',
  templateUrl: './standard-form.component.html',
  styleUrls: ['./standard-form.component.scss'],
})
export class StandardFormComponent implements OnInit {

  @Input()
  formModel: FormModel;

  textInputs: FormInputModel[]
  dropdownInputs: FormInputModel[]
  chipInpust: FormInputModel[]

  constructor() {
    this.textInputs = new Array<FormInputModel>();
    this.dropdownInputs = new Array<FormInputModel>();
    this.chipInpust = new Array<FormInputModel>();
  }

  ngOnInit(): void {
    this.validateInputs()
    ? this.buildInputs()
    : console.log('Invalid FormModel');
    console.log(this.textInputs);
  }

  public validateInputs(): boolean {
    return true;
  }

  public buildInputs() {
    this.formModel.inputs.forEach((input) => {
      switch (+input.inputType) {
        case InputType.Text:
        this.textInputs.push(input);
        break;
        case InputType.Dropdown:
        this.dropdownInputs.push(input);
        break;
        case InputType.Chip:
        this.chipInpust.push(input);
        break;
      }
    });
  }
}
