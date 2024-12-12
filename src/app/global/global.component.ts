import { Component } from '@angular/core';
import {TableViewComponent} from '../tableview/table-view.component';
import {DataService} from '../data/data.service';
import {FilterComponent} from '../filter/filter.component';
import {ChartviewComponent} from '../chartview/chartview.component';

@Component({
  selector: 'app-global',
  imports: [
    //TableViewComponent,
    FilterComponent,
    ChartviewComponent
  ],
  templateUrl: './global.component.html',
  styleUrl: './global.component.css'
})
export class GlobalComponent {
  minPopulation: number | null = null

  constructor(public dataService: DataService) {}

  onMinPopulation(minPopulation: number) {
    this.minPopulation = minPopulation;
  }
}
