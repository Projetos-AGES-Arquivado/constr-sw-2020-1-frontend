import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../../../Card';

@Component({
  selector: 'chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss']
})
export class ChipListComponent implements OnInit {

  @Input() cardList: Card[]
  @Input() title: string
  @Input() editionList: boolean
  @Input() multiSelection: boolean

  @Output() selection = new EventEmitter<Card[]>();
  @Output() newCard = new EventEmitter<string>();
  @Output() delete = new EventEmitter<Card>();


  onSelect(card: Card): void {
    if (this.multiSelection) {
      card.selected = !card.selected;

    } else {
      this.cardList.forEach(item => {
        if (item.uniqueID !== card.uniqueID) {
          item.selected = false
        }
      });
      card.selected = !card.selected;

    }
    this.selection.emit(this.cardList);

  }

  createNewCard(): void {
    this.newCard.emit("createNewCard")
  }

  deleteCard(card: Card){
    this.delete.emit(card)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
