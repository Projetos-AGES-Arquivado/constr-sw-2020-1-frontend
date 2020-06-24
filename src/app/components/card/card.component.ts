import {Component, Input, Output, EventEmitter} from '@angular/core';
import {CardInterface} from './card.interface';

@Component({
  selector: 'app-list',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() cards: CardInterface[];

  @Output() eventEmmiter = new EventEmitter();

  constructor() { }

  remove(id: string | number){
    this.eventEmmiter.emit({
      action: 'remove',
      id
    });
  }

  edit(id: string | number){
    this.eventEmmiter.emit({
      action: 'edit',
      id
    });
  }


}
