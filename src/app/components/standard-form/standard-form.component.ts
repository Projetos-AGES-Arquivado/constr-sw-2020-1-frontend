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
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StandardModalComponent } from './modal/standard-modal/standard-modal.component';
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

  @Output() selectionEmmiter = new EventEmitter();
  @Output() deleteCardEmmiter = new EventEmitter();

  textInputs: FormInputModel[];
  numberInputs: FormInputModel[];
  dropdownInputs: FormInputModel[];
  chipInputs: FormInputModel[];
  myForm: FormGroup;

  constructor(private httpClient: HttpClient, public dialog: MatDialog) {
    this.textInputs = new Array<FormInputModel>();
    this.numberInputs = new Array<FormInputModel>();
    this.dropdownInputs = new Array<FormInputModel>();
    this.chipInputs = new Array<FormInputModel>();
  }

  ngOnInit(): void {
    this.validateInputs()
      ? this.buildInputs()
      : console.log('Invalid FormModel');

    const group = {};
    this.formModel.inputs.forEach((input) => {
      console.log(input)
      group[input.fieldName] = new FormControl(!!input.standardValue?input.standardValue:'')
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
        case InputType.Number:
          this.numberInputs.push(input);
          break;
        case InputType.Dropdown:
          this.dropdownInputs.push(this.formatDropdownElements(input));
          break;
        case InputType.Chip:
          this.chipInputs.push(input);
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
      elements.push({
        id: index,
        name: model.dropdownElements[index].name,
        label: model.dropdownElements[index].label,
      });
    }

    if (model.addButton) {
      elements.push({
        id: 666,
        name: 'Adicionar...',
        formModal: model.modalForm,
      });
    }

    model.dropdownElements = elements;

    return model;
  }

  onSubmit() {
    let request: Observable<any>;
    let rawValue = this.myForm.getRawValue();
    this.formModel.inputs.forEach((input) => {
      if (!!input.shouldNotSend) {
        delete rawValue[input.fieldName];
      }
      if (input.inputType === 2) {
        rawValue[input.fieldName] = [];
        input.cardList.map((item) => {
          if (!!item.uniqueID) {
            rawValue[input.fieldName].push(item.uniqueID);
          }
        });
      }
    });
    switch (+this.formModel.requestType) {
      case RequestType.POST:
        request = this.httpClient.post(this.formModel.saveEndpoint, rawValue);
        break;
      case RequestType.PUT:
        request = this.httpClient.put(this.formModel.saveEndpoint, rawValue);
        break;
      case RequestType.PATCH:
        request = this.httpClient.patch(this.formModel.saveEndpoint, rawValue);
        break;
    }

    request.subscribe(
      (res) => {
        console.log(res);
        this.response.emit(JSON.stringify(res));
      },
      (err) => {
        console.log(err);
        this.response.emit(JSON.stringify(err));
      }
    );
  }

  public openModal(element: DropdownElement) {
    if (element.id === 666) {
      const dialogConfig = new MatDialogConfig();

      const dialogRef = this.dialog.open(StandardModalComponent, {
        data: {
          formValue: element.formModal,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        window.location.reload();
      });
    } else if (!!element.outputOnClick) {
      this.response.emit(element);
    }
  }

  public selection($event) {
    this.selectionEmmiter.emit($event);
  }

  public deleteCard($event) {
    this.deleteCardEmmiter.emit($event);
  }
}
