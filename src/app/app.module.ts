import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule} from '@angular/material/divider';
import { MatIconModule} from '@angular/material/icon';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'
import { MatNativeDateModule, MatRippleModule} from '@angular/material/core';

import { HomeComponent } from './screens/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
  declarations: [
    HomeComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
    MatNativeDateModule,
    MatRippleModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule { }
