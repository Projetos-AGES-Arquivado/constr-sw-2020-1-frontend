import { Component, OnInit } from '@angular/core';
import { Building } from '../../models/Building';
import { Room } from '../../models/Room';
import { DisciplinesService } from '../../services/disciplines.service';
import { ChipListComponent } from '../../components/chip-list/chip-list.component'
import { Card } from '../../../Card'
import { DisciplineClass } from 'src/app/models/DisciplineClass';
import { Discipline } from 'src/app/models/Discipline';
import { Lesson } from 'src/app/models/Lesson';

@Component({
  selector: 'app-class-room',
  templateUrl: './class-room.component.html',
  styleUrls: ['./class-room.component.scss']
})
export class ClassRoomComponent implements OnInit {

  constructor(private disciplineService: DisciplinesService) { }

  discipline: Discipline
  disciplineClasses: DisciplineClass[]
  lessons: Lesson[]
  cards: Card[]
  lessonCards: Card[]
  classSelected: boolean
  editionMode: boolean

  ngOnInit(): void {
    this.classSelected = false
    this.editionMode = false
    this.discipline = JSON.parse(sessionStorage.getItem('disciplineID'));
    this.getClasses();
    this.cards = []
  }

  changeEdition(e){
    this.editionMode = e.target.checked
  }

  getClasses() {
    this.disciplineService.getClasses(this.discipline.id).subscribe((data: DisciplineClass[]) => {
      this.disciplineClasses = data

      this.cards = this.disciplineClasses.map((disciplineClass) =>{
        return {
          uniqueID: disciplineClass.id,
          label: `${disciplineClass.number}`,
          selected: false,
        }
      })
    })
  }

  getLessons(classID) {
    this.disciplineService.getLessons(classID).subscribe((data: Lesson[]) => {
      this.lessons = data;

      this.lessonCards = this.lessons.map((lesson) => {
        return {
          uniqueID: lesson.id,
          label: `${lesson.date}`,
          selected: false,
        }
      })
      this.classSelected = true
    })
  }

  cardsSelected(event: Card []){
    let classID = event[0].uniqueID
    if (event[0].selected){
      this.getLessons(classID);
    }
    else{
      this.classSelected = false
    }
}

lessonCardsSelected(event: Card []){
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
