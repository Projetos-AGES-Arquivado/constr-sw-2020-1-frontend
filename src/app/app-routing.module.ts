import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Grupo5Component } from './screens/grupo-5/grupo-5.component';
import { HomeComponent } from './screens/home/home.component';
import { UserRegistrationComponent } from './screens/grupo-1/user-registration/user-registration.component';
import { ListBuildingsComponent } from './screens/buildings-rooms/list-buildings/list-buildings.component';
import { ListRoomsComponent } from './screens/buildings-rooms/list-rooms/list-rooms.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
