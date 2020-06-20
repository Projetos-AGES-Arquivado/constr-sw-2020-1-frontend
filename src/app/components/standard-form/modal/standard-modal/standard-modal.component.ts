import { Component, OnInit, Input, Inject, Output } from '@angular/core';
import { FormModel } from 'src/app/models/form-interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-standard-modal',
  templateUrl: './standard-modal.component.html',
  styleUrls: ['./standard-modal.component.scss'],
})
export class StandardModalComponent implements OnInit {
  formModel: FormModel;


  @Output()
  modalResponse = new EventEmitter();

  constructor(
    private dialogRef: MatDialogRef<StandardModalComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.formModel = data.formValue;
  }

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }
}
