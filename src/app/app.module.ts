import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { HomeComponent } from './screens/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChipListComponent } from './components/chip-list/chip-list.component';
import { ChipComponent } from './components/chip/chip.component';

@NgModule({
  declarations: [
    HomeComponent,
    ChipListComponent,
    ChipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule { }
