import { Component, EventEmitter, Output } from '@angular/core';

import { CARDS } from '../../../MockedCards';
import { Card } from 'src/Card';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  cardList:Card[]

  constructor() {
    this.cardList = CARDS;
  }

  someMethod($event) {
    console.log($event);
  }
  newForm($event) {
    console.log($event);
  }
}
