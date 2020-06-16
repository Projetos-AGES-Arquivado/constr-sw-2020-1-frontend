import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DisciplinesService } from '../../services/disciplines.service';
import { Building } from '../../models/Building';
import { CardComponent } from '../../components/card/card.component'

@Component({
  selector: 'app-disciplines-screen',
  templateUrl: './disciplines-screen.component.html',
  styleUrls: ['./disciplines-screen.component.scss']
})
export class DisciplinesScreenComponent implements OnInit {

  buildings: Building[];

  constructor(private disciplineService: DisciplinesService) { }

  ngOnInit() {
    this.getDisciplines();
  }

  getDisciplines() {
    this.disciplineService.getBuilding().subscribe((data: Building[]) => {
      this.buildings = data
      console.log(this.buildings)
    });

  }

}
