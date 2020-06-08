import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import {HomeComponent} from './screens/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StandardFormComponent } from './components/standard-form/standard-form.component';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    StandardFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
