import { Component } from '@angular/core';
import {DataService} from '../data/data.service';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  selectedOption: string = 'Global';

  constructor(public dataService: DataService) {
  }

  selectOption(option: string): void {
    this.selectedOption = option;
    //console.log(`Selected: ${option}`);
  }

}
