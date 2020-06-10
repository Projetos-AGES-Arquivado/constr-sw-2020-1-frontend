import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {HomeComponent} from './screens/home/home.component'
import { StandardFormComponent } from './components/standard-form/standard-form.component';
import { RequestType } from './models/request-type.enum';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
