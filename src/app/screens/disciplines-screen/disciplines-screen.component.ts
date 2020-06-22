import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DisciplinesService } from '../../services/disciplines.service';
import { Building } from '../../models/Building';
import { Discipline } from '../../models/Discipline'
import { CardComponent } from '../../components/card/card.component'
import { Router } from '@angular/router';

@Component({
  selector: 'app-disciplines-screen',
  templateUrl: './disciplines-screen.component.html',
  styleUrls: ['./disciplines-screen.component.scss']
})
export class DisciplinesScreenComponent implements OnInit {

  buildings: Building[];
  disciplines: Discipline[];

  constructor(private disciplineService: DisciplinesService, private router: Router) { }

  ngOnInit() {
    this.getDisciplines();
  }

  getDisciplines() {
    this.disciplineService.getDiscipline().subscribe((data: Discipline[]) => {
      this.disciplines = data
      console.log(this.disciplines)
    });

  }

  btnClick (discipline: Building) {
    sessionStorage.setItem('disciplineID', JSON.stringify(discipline))
    this.router.navigateByUrl('/turmas');
  };

}
