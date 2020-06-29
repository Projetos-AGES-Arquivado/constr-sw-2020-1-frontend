import { Component, Input, OnInit } from '@angular/core';
import { createPipe } from '@angular/compiler/src/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-predios',
  templateUrl: './predios.component.html',
  styleUrls: ['./predios.component.scss']
})
export class PrediosComponent implements OnInit {

  @Input() predioCards: any[];

  constructor() { }

  ngOnInit(): void {
    this.predioCards = ["Predio 1", "Predio 2", "Predio 3"]
  }

}
