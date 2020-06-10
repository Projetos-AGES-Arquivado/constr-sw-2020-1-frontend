import { Component } from '@angular/core';
import { RoutesRecognized, Router } from '@angular/router';

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.scss'],
})
export class PageContentComponent {
  title: string;

  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof RoutesRecognized) {
        const route = event.state.root.firstChild;
        this.title = route.data.title;
      }
    });
  }
}
