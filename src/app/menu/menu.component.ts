import { Component } from '@angular/core';
import {DataService} from '../data/data.service';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  continents: string[] = ['Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America'];
  selectedOption: string = 'Global';

  constructor(public dataService: DataService) {
  }

  selectOption(option: string): void {
    this.selectedOption = option;
    console.log(`Selected: ${option}`);
  }
}
