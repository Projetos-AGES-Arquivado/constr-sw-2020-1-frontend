import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Grupo5Component } from './screens/grupo-5/grupo-5.component';
import { HomeComponent } from './screens/home/home.component';
import { UserRegistrationComponent } from './screens/grupo-1/user-registration/user-registration.component';
import { ListBuildingsComponent } from './screens/buildings-rooms/list-buildings/list-buildings.component';
import { ListRoomsComponent } from './screens/buildings-rooms/list-rooms/list-rooms.component';
import { AddBuildingComponent } from './screens/buildings-rooms/add-building/add-building.component';
import { AddRoomComponent } from './screens/buildings-rooms/add-room/add-room.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'grupo1',
    component: UserRegistrationComponent,
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
    path: 'buildings/:id/rooms',
    component: ListRoomsComponent,
  },
  {
    path: 'buildings/create',
    component: AddBuildingComponent,
  },
  {
    path: 'buildings/:id/rooms/create',
    component: AddRoomComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
