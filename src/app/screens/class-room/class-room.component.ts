import { Component, OnInit } from '@angular/core';
import { Building } from '../../models/Building';
import { Room } from '../../models/Room';
import { DisciplinesService } from '../../services/disciplines.service';
import { ChipListComponent } from '../../components/chip-list/chip-list.component'
import { Card } from '../../../Card'

@Component({
  selector: 'app-class-room',
  templateUrl: './class-room.component.html',
  styleUrls: ['./class-room.component.scss']
})
export class ClassRoomComponent implements OnInit {

  constructor(private disciplineService: DisciplinesService) { }

  discipline: Building //MUDAR PARA MODEL DAS DISCIPLINAS
  rooms: Room[]
  cards: Card[]

  ngOnInit(): void {
    this.discipline = JSON.parse(sessionStorage.getItem('disciplineID'));
    this.getClasses();
    this.cards = []
  }

  getClasses() {
    this.disciplineService.getClasses(this.discipline.buildingID).subscribe((data: Room[]) => {
      this.rooms = data

      this.cards = this.rooms.map((room) =>{
        return {
          uniqueID: room.roomNumber,
          label: room.roomType,
          selected: false,
        }
      })
    })
  }

  cardsSelected(event: Card []){
    let res = ""
    event.forEach(item => {
        if (item.selected){
            res += `${item.label}; `
        }
    });
    alert(`Itens selecionados: ${res}`);
}

newForm(event){
    alert(`Disparar novo form`)
}

deleteItem(event: Card){
    if (confirm(`deletar ${event.label}?`)){
        alert(`item de ID: ${event.uniqueID} deletado`)
    }
    
}

}
