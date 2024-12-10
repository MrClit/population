import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {GlobalComponent} from './global/global.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, GlobalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
