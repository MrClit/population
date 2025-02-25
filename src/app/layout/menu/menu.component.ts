import {Component, computed, OnInit, signal, Signal} from '@angular/core';
import {DataService} from '../../core/data.service';
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
export class MenuComponent implements OnInit {
  selectedOption = 'Global';

  continents: Signal<string[]> = signal<string[]>([]);

  constructor(public dataService: DataService) {
  }

  ngOnInit() {
    this.continents = computed(()=> {
      return this.dataService.getContinents();
    });
  }

  selectOption(option: string): void {
    this.selectedOption = option;
    //console.log(`Selected: ${option}`);
  }

}
