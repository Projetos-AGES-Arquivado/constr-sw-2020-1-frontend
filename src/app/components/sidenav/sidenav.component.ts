import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ItensMenu } from "../../model/itens-menu.model";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  items = {};
  name= 'thominhas'
  
  constructor() { }

  ngOnInit() {
     this.items = ItensMenu.admin;
  }

  
@Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

sideBarOpen = true;


toggleSidebar() {
  this.toggleSideBarForMe.emit();
  this.sideBarOpen = !this.sideBarOpen;
  setTimeout(() => {
    window.dispatchEvent(
      new Event('resize')
    );
  }, 300);
}

}