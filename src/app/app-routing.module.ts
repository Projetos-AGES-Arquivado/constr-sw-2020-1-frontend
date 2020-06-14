import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { Grupo5Component } from './screens/grupo-5/grupo-5.component'
import { HomeComponent }  from './screens/home/home.component'
import { TypesResourcesComponent } from './screens/types-resources/types-resources.component';
import { StandardFormComponent } from './components/standard-form/standard-form.component';
import { RequestType } from './models/request-type.enum';



const routes: Routes = [
  // {
  //   path: 'grupo1',
  //   component: 
  // },
  {
    path: 'grupo2',
    component: TypesResourcesComponent
  },
  // {
  //   path: 'grupo3',
  //   component: 
  // },
  // {
  //   path: 'grupo4',
  //   component: 
  // },
  {
    path: 'grupo5',
    component: Grupo5Component
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
