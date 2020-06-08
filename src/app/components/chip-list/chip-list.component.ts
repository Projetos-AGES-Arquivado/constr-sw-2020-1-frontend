import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss']
})
export class ChipListComponent implements OnInit {

  @Input() title:string
  @Input() condition:boolean

  constructor() { }

  ngOnInit(): void {
  }

}
