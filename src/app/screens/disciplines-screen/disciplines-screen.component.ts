import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DisciplinesService } from '../../services/disciplines.service';
import { Building } from '../../models/Building';
import { Discipline } from '../../models/Discipline'
import { CardInterface } from '../../components/card/card.interface'
import { Router } from '@angular/router';
import {DISCIPLINE_FORM} from './discipline-form';
import { FormModel } from '../../models/form-interface'
import { RequestType } from 'src/app/models/request-type.enum';

@Component({
  selector: 'app-disciplines-screen',
  templateUrl: './disciplines-screen.component.html',
  styleUrls: ['./disciplines-screen.component.scss']
})
export class DisciplinesScreenComponent implements OnInit {

  buildings: Building[];
  disciplines: Discipline[];
  cardInterface: CardInterface[];
  disciplineForm: FormModel;
  formOpen: boolean;

  constructor(private disciplineService: DisciplinesService, private router: Router) { }

  ngOnInit() {
    this.cardInterface = []
    this.disciplineForm = DISCIPLINE_FORM;
    this.getDisciplines();
  }

  getDisciplines() {
    this.disciplineService.getDiscipline().subscribe((data: Discipline[]) => {
      this.disciplines = data
      this.cardInterface = this.disciplines.map((discipline)=>{
        return {
          _id: discipline.id,
          label: discipline.name
        }
      })
      console.log(this.disciplines)
    });
  }

  deleteItem(disciplineID){
    if (confirm(`deletar ${disciplineID}?`)) {
      this.disciplineService.deleteDiscipline(disciplineID).subscribe(() => {
        this.getDisciplines()
        alert(`item de ID: ${disciplineID} deletado`)
      })
    }
  }

  btnClick (event) {
    console.log(event.action);
    if (event.action === "remove") {
      this.deleteItem(event.id);
    } else if (event.action === "edit"){
      this.disciplineForm.requestType = RequestType.PUT
      this.disciplineForm.saveEndpoint = `http://18.230.151.22:3000/courses/${event.id}`
      this.formOpen = true
    }
    // sessionStorage.setItem('disciplineID', JSON.stringify(discipline))
    // this.router.navigateByUrl('/turmas');
  };

  saveFormData(event){
    alert("Requisição feita")
    this.formOpen = false
    this.getDisciplines()
  }

  showForm(){
    this.disciplineForm.requestType = RequestType.POST
    this.disciplineForm.saveEndpoint = "http://18.230.151.22:3000/courses"
    this.formOpen = true
  }

  closeModal(){
    this.formOpen = false
  }

}
