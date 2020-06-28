import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { Grupo5Component } from './screens/grupo-5/grupo-5.component';
import {HomeComponent} from './screens/home/home.component';
import { StandardFormComponent } from './components/standard-form/standard-form.component';
import { RequestType } from './models/request-type.enum';
import { UserRegistrationComponent } from './screens/grupo-1/user-registration/user-registration.component';

import {ReservasComponent} from './screens/reservas/reservas.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'grupo1',
    component: UserRegistrationComponent
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
    path: 'reservas/:id',
    component: ReservasComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
