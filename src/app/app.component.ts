import { Component, afterNextRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

declare var $: any;
declare function HOMEINIT([]): any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce';

  constructor() {
    afterNextRender(() => {
      // Hack to make jQuery work with Angular
      setTimeout(() => {
        HOMEINIT($);
      }, 50);
      $(window).on('load', function () {
        $("#loading").fadeOut(500);
      });
    });
  }
}
