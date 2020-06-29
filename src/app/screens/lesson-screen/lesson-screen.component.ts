import { Component, OnInit } from '@angular/core';
import { Building } from '../../models/Building';
import { Room } from '../../models/Room';
import { DisciplinesService } from '../../services/disciplines.service';
import { CardInterface } from '../../components/card/card.interface'
import { ChipListComponent } from '../../components/chip-list/chip-list.component'
import { StandardFormComponent } from '../../components/standard-form/standard-form.component';
import { LESSON_FORM } from './lesson-form'
import { FormModel } from '../../models/form-interface'
import { Card } from '../../../Card'
import { DisciplineClass } from 'src/app/models/DisciplineClass';
import { Discipline } from 'src/app/models/Discipline';
import { Lesson } from 'src/app/models/Lesson';
import { RequestType } from 'src/app/models/request-type.enum';

@Component({
  selector: 'app-lesson-screen',
  templateUrl: './lesson-screen.component.html',
  styleUrls: ['./lesson-screen.component.scss']
})
export class LessonScreenComponent implements OnInit {

  constructor(private disciplineService: DisciplinesService) { }

  disciplines: Discipline[]
  cardInterface: CardInterface[];
  disciplineClasses: DisciplineClass[]
  lessons: Lesson[]
  cards: Card[]
  classCards: Card[]
  disciplineSelected: boolean
  classSelected: boolean
  selectedClassID: string
  editionMode: boolean
  openForm: boolean
  lessonForm: FormModel
  lessonFormOpen: boolean

  ngOnInit(): void {
    this.classSelected = false
    this.selectedClassID = ""
    this.getDisciplines();
    this.cards = []
    this.classCards = []
    this.disciplineSelected = false
    this.editionMode = false
    this.openForm = false
    this.lessonForm = LESSON_FORM
    this.lessonFormOpen = false
  }

  getDisciplines() {
    this.disciplineService.getDiscipline().subscribe((data: Discipline[]) => {
      this.disciplines = data
      this.cards = this.disciplines.map((discipline) => {
        return {
          uniqueID: discipline.id,
          label: discipline.name,
          selected: false
        }
      })
    });
  }

  getClasses(disciplineID) {
    this.disciplineService.getClasses(disciplineID).subscribe((data: DisciplineClass[]) => {
      this.disciplineClasses = data
      this.classCards = this.disciplineClasses.map((disciplineClass) => {
        return {
          uniqueID: disciplineClass.id,
          label: `${disciplineClass.number}`,
          selected: false
        }
      })
      this.disciplineSelected = true;
    })
  }

  getLessons(classID) {
    console.log(`class id: ${classID}`)
    this.disciplineService.getLessons(classID).subscribe((data: Lesson[]) => {
      this.lessons = data;
      this.cardInterface = this.lessons.map((lesson) => {
        return {
          _id: lesson.id,
          label: `${lesson.date}`,
        }
      })
      this.classSelected = true
    })
  }

  cardsSelected(event: Card[]) {
    this.openForm = false
    this.classSelected = false
    let selectedDisciplineList: Card[] = event.filter((card) => {
      return card.selected
    })
    if (selectedDisciplineList.length > 0) {
      const classID = selectedDisciplineList[0].uniqueID
      this.getClasses(classID)
    }
    else {
      this.disciplineSelected = false
    }
  }

  classCardsSelected(event: Card[]) {
    let selectedClassList: Card[] = event.filter((card) => {
      return card.selected
    })
    if (selectedClassList.length > 0) {
      const classID = selectedClassList[0].uniqueID
      this.selectedClassID = classID
      this.getLessons(classID)
    }
    else {
      this.classSelected = false
    }
  }

  newClassForm(event) {
    console.log(event)
  }

  saveFormData(event) {
    this.openForm = false;
    alert("requisição feita")
    this.lessonFormOpen = false
    this.getLessons(this.selectedClassID)
  }

  newLessonForm(event) {
    this.lessonFormOpen = !this.lessonFormOpen
  }

  deleteItem(itemID) {
    if (confirm(`deletar ${itemID}?`)) {
      this.disciplineService.deleteLesson(itemID).subscribe(() => {
        alert(`item de ID: ${itemID} deletado`)
        this.getLessons(this.selectedClassID);
      });

    }
  }

  btnClick(event) {
    console.log(event);
    if (event.action === "remove") {
      this.deleteItem(event.id);
    } else if (event.action === "edit"){
      this.lessonForm.requestType = RequestType.PUT
      this.lessonForm.saveEndpoint = `http://18.230.151.22:3000/lessons/${this.selectedClassID}`
      this.lessonFormOpen = true
    }
  };

  closeModal(){
    this.lessonFormOpen = false;
  }

  showForm(){
    this.lessonForm.requestType = RequestType.POST
    this.lessonForm.saveEndpoint = "http://18.230.151.22:3000/lessons";
    this.lessonFormOpen = true
  }

}
