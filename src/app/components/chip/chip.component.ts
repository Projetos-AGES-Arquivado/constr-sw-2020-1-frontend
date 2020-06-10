import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent implements OnInit {

  constructor() { }
  @Input() label: string;
  @Input() deletable: boolean;
  @Input() chipSelected: boolean;

  @Output() delete = new EventEmitter();


  ngOnInit(): void {
  }

  deleteCard(){
    this.delete.emit();
  }
}
