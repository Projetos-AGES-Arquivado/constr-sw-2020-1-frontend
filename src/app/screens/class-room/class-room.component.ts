import { Component, OnInit } from '@angular/core';
import { Building } from '../../models/Building';
import { Room } from '../../models/Room';
import { DisciplinesService } from '../../services/disciplines.service';
import { ChipListComponent } from '../../components/chip-list/chip-list.component'
import { StandardFormComponent } from '../../components/standard-form/standard-form.component';
import { LESSON_FORM } from './lesson-form'
import { CLASS_FORM } from './class-form'
import { FormModel } from '../../models/form-interface'
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
  selectedClassId: string
  editionMode: boolean
  classFormOpen: boolean
  lessonFormOpen: boolean
  lessonForm: FormModel
  classForm: FormModel

  ngOnInit(): void {
    this.classSelected = false
    this.editionMode = false
    this.discipline = JSON.parse(sessionStorage.getItem('disciplineID'));
    this.getClasses();
    this.cards = []
    this.lessonCards = []
    this.lessonForm = LESSON_FORM
    this.classForm = CLASS_FORM
    this.classFormOpen = false
    this.lessonFormOpen = false
  }

  changeEdition(e) {
    this.editionMode = e.target.checked
  }

  getClasses() {
    this.disciplineService.getClasses(this.discipline.id).subscribe((data: DisciplineClass[]) => {
      this.disciplineClasses = data
      console.log(this.disciplineClasses)
      this.cards = this.disciplineClasses.map((disciplineClass) => {
        return {
          uniqueID: disciplineClass.id,
          label: `${disciplineClass.number}`,
          selected: false,
        }
      })
    })
  }

  getLessons(classID) {
    console.log(`clic`);
    this.disciplineService.getLessons(classID).subscribe((data: Lesson[]) => {
      this.lessons = data;
      console.log(data)
      this.lessonCards = this.lessons.map((lesson) => {
        return {
          uniqueID: lesson.id,
          label: `${lesson.date}`,
          selected: false,
        }
      })
      this.classSelected = true
      this.selectedClassId = classID
    })
  }

  cardsSelected(event: Card[]) {
    let selectedClassList: Card [] = event.filter((card) => {
      return card.selected
    })
    if (selectedClassList.length > 0) {
      const classID = selectedClassList[0].uniqueID
      console.log(`id: ${classID}`)
      this.getLessons(classID)
    }
    else {
      console.log('flase')
      this.classSelected = false
    }
  }

  lessonCardsSelected(event: Card[]) {
    let res = ""
    event.forEach(item => {
      if (item.selected) {
        res += `${item.label}; `
      }
    });
    alert(`Itens selecionados: ${res}`);
  }

  newClassForm(event) {
    this.classFormOpen = true;
  }

  saveFormData(event) {
    this.lessonFormOpen = false;
    this.classFormOpen = false;
    alert("item adicionada")
  }

  newLessonForm(event) {
    //DADO ABAIXO MOCADO. DEVEMOS ENCAMINHAR PARA UM FORM, E O FORM FAZER ESSA REQUISÇÃO CONFORME OS DADOS NELE
    this.lessonFormOpen = !this.lessonFormOpen
  }

  deleteLesson(event: Card) {
    if (confirm(`deletar ${event.label}?`)) {
      this.disciplineService.deleteLesson(event.uniqueID).subscribe(() => {
        this.getLessons(this.classSelected);
      });

    }
  }

  deleteItem(event: Card) {
    if (confirm(`deletar ${event.label}?`)) {
      alert(`item de ID: ${event.uniqueID} deletado`)
    }
  }

}
