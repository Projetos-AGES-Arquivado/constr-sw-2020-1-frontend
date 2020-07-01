import { Component, OnInit } from '@angular/core';
import { Building } from '../../models/Building';
import { Room } from '../../models/Room';
import { DisciplinesService } from '../../services/disciplines.service';
import { CardInterface } from '../../components/card/card.interface'
import { ChipListComponent } from '../../components/chip-list/chip-list.component'
import { StandardFormComponent } from '../../components/standard-form/standard-form.component';
import { CLASS_FORM } from './class-form'
import { FormModel } from '../../models/form-interface'
import { Card } from '../../../Card'
import { DisciplineClass } from 'src/app/models/DisciplineClass';
import { Discipline } from 'src/app/models/Discipline';
import { RequestType } from 'src/app/models/request-type.enum';

@Component({
  selector: 'app-class-room',
  templateUrl: './class-room.component.html',
  styleUrls: ['./class-room.component.scss']
})
export class ClassRoomComponent implements OnInit {

  constructor(private disciplineService: DisciplinesService) { }

  discipline: Discipline
  disciplines: Discipline[]
  cardInterface: CardInterface[];
  disciplineClasses: DisciplineClass[]
  cards: Card[]
  lessonCards: Card[]
  disciplineSelected: boolean
  classSelected: boolean
  selectedClassId: string
  editionMode: boolean
  classFormOpen: boolean
  lessonFormOpen: boolean
  lessonForm: FormModel
  classForm: FormModel
  selectedDisciplineID: string

  ngOnInit(): void {
    this.classSelected = false
    this.editionMode = false
    this.discipline = JSON.parse(sessionStorage.getItem('disciplineID'));
    this.getDisciplines();
    this.cards = []
    this.lessonCards = []
    this.classForm = CLASS_FORM
    this.classFormOpen = false
    this.lessonFormOpen = false
    this.disciplineSelected = false
  }

  changeEdition(e) {
    this.editionMode = e.target.checked
  }

  getDisciplines() {
    this.disciplineService.getDiscipline().subscribe((data: Discipline[]) => {
      this.disciplines = data
      this.cards = this.disciplines.map((discipline)=>{
        return {
          uniqueID: discipline.id,
          label: discipline.name,
          selected: false
        }
      })
      console.log(this.disciplines)
    });

  }

  getClasses(disciplineID) {
    this.disciplineService.getClasses(disciplineID).subscribe((data: DisciplineClass[]) => {
      this.disciplineClasses = data
      console.log(this.disciplineClasses)
      this.cardInterface = this.disciplineClasses.map((disciplineClass) => {
        return {
          _id: disciplineClass.id,
          label: `${disciplineClass.number}`,
        }
      })
      this.disciplineSelected = true;

    })
  }

  cardsSelected(event: Card[]) {
    let selectedClassList: Card [] = event.filter((card) => {
      return card.selected
    })
    if (selectedClassList.length > 0) {
      const classID = selectedClassList[0].uniqueID
      console.log(`id: ${classID}`)
      this.getClasses(classID)
      this.selectedClassId = classID
    }
    else {
      console.log('flase')
      this.disciplineSelected = false
    }
  }

  newClassForm(event) {
    this.classFormOpen = true;
  }

  saveFormData(event) {
    this.lessonFormOpen = false;
    this.classFormOpen = false;
    this.getClasses(this.selectedClassId)
    alert("item adicionada")
  }

  newLessonForm(event) {
    //DADO ABAIXO MOCADO. DEVEMOS ENCAMINHAR PARA UM FORM, E O FORM FAZER ESSA REQUISÇÃO CONFORME OS DADOS NELE
    this.lessonFormOpen = !this.lessonFormOpen
  }

  deleteItem(classID) {
    if (confirm(`deletar ${classID}?`)) {
      this.disciplineService.deleteClass(classID).subscribe(() => {
        this.getClasses(this.selectedClassId)
        alert(`item de ID: ${classID} deletado`)
      })
    }
  }

  btnClick(event) {
    console.log(event.action);
    if (event.action === "remove") {
      this.deleteItem(event.id);
    } else if (event.action === "edit"){
      this.editionForm(event.id);
    }
    // sessionStorage.setItem('disciplineID', JSON.stringify(discipline))
    // this.router.navigateByUrl('/turmas');
  };

  editionForm(eventID) {
    const selectedClass = this.disciplineClasses.filter(data => data.id === eventID)[0];
    console.log(this.disciplineClasses);
    console.log(selectedClass);
    this.classForm.inputs[0].standardValue = `${selectedClass.number}`;
    this.classForm.inputs[1].standardValue = `${selectedClass.timeSchedule}`;
    this.classForm.inputs[2].standardValue = selectedClass.teacher;
    this.classForm.inputs[3].standardValue = `${selectedClass.course}`;
    this.classForm.requestType = RequestType.PUT
    this.classForm.saveEndpoint = `http://18.230.151.22:3000/classes/${eventID}`,
    this.classFormOpen = true
  }

  closeModal(){
    this.classFormOpen = false
  }

  showForm(){
    this.classForm.saveEndpoint = 'http://18.230.151.22:3000/classes'
    this.classForm.requestType = RequestType.POST
    this.classFormOpen = true
  }

}
