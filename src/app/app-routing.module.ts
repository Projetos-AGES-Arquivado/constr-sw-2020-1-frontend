import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Grupo5Component } from './screens/grupo-5/grupo-5.component';
import { HomeComponent } from './screens/home/home.component';
import { UserRegistrationComponent } from './screens/grupo-1/user-registration/user-registration.component';
import { ListBuildingsComponent } from './screens/buildings-rooms/list-buildings/list-buildings.component';
import { ListRoomsComponent } from './screens/buildings-rooms/list-rooms/list-rooms.component';
import { AddBuildingComponent } from './screens/buildings-rooms/add-building/add-building.component';
import { ReservasComponent } from './screens/reservas/reservas.component';
import { DisciplinesScreenComponent } from './screens/disciplines-screen/disciplines-screen.component';
import { ClassRoomComponent } from './screens/class-room/class-room.component';
import { LessonScreenComponent } from './screens/lesson-screen/lesson-screen.component';
import { AddRoomComponent } from './screens/buildings-rooms/add-room/add-room.component';
import { EditBuildingComponent } from './screens/buildings-rooms/edit-building/edit-building.component';
import { EditRoomComponent } from './screens/buildings-rooms/edit-room/edit-room.component';
import { GroupListComponent } from './screens/grupo-1/group-list/group-list.component';
import { UserListComponent } from './screens/grupo-1/user-list/user-list.component';
import { TypesResourcesComponent } from './screens/types-resources/types-resources.component';

const routes: Routes = [
  {
    path: 'usuarios',
    component: UserListComponent,
  },
  {
    path: 'grupos',
    component: GroupListComponent,
  },
  {
    path: 'grupo2',
    component: TypesResourcesComponent,
  },
  {
    path: 'grupo5',
    component: Grupo5Component,
  },
  {
    path: 'buildings',
    component: ListBuildingsComponent,
  },
  {
    path: 'buildings/create',
    component: AddBuildingComponent,
  },
  {
    path: 'buildings/:id',
    component: EditBuildingComponent,
  },
  {
    path: 'buildings/:id/rooms',
    component: ListRoomsComponent,
  },
  {
    path: 'buildings/:id/rooms/:roomId',
    component: EditRoomComponent,
  },
  {
    path: 'buildings/:id/rooms/create',
    component: AddRoomComponent,
  },
  {
    path: 'reservas',
    component: ReservasComponent,
  },
  {
    path: 'disciplinas',
    component: DisciplinesScreenComponent,
  },
  {
    path: 'turmas',
    component: ClassRoomComponent,
  },
  {
    path: 'aulas',
    component: LessonScreenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
