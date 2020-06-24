import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { Grupo5Component } from './screens/grupo-5/grupo-5.component';
import {HomeComponent} from './screens/home/home.component';
import {ReservasComponent} from './screens/reservas/reservas.component';
import { DisciplinesScreenComponent } from './screens/disciplines-screen/disciplines-screen.component';
import { ClassRoomComponent} from './screens/class-room/class-room.component';
import { LessonScreenComponent} from './screens/lesson-screen/lesson-screen.component'
import { UserListComponent } from './screens/grupo-1/user-list/user-list.component';
import { GroupListComponent } from './screens/grupo-1/group-list/group-list.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'usuarios',
    component: UserListComponent
  },
  {
    path: 'grupos',
    component: GroupListComponent
  },
  {
    path: 'grupo5',
    component: Grupo5Component
  },
  {
    path: 'reservas',
    component: ReservasComponent
  },
  {
    path: 'disciplinas',
    component: DisciplinesScreenComponent
  },
  {
    path: 'turmas',
    component: ClassRoomComponent
  },
  {
    path: 'aulas',
    component: LessonScreenComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
