import {Component, computed, OnInit, Signal, signal} from '@angular/core';
// import {TableViewComponent} from '../tableview/table-view.component';
import {DataService} from '../../../core/data.service';
import {FilterComponent} from '../../../shared/filter/filter.component';
import {ChartviewComponent} from '../../../shared/chartview/chartview.component';
import {DataTable} from '../../../core/data.model';

@Component({
  selector: 'app-global',
  imports: [
    // TableViewComponent,
    FilterComponent,
    ChartviewComponent
  ],
  templateUrl: './global.component.html',
  styleUrl: './global.component.css'
})
export class GlobalComponent implements OnInit {
  minPopulation: number | null = null
  populationByContinent: Signal<DataTable[]> = signal<DataTable[]>([]);

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.populationByContinent = computed(()=> {
      if (this.dataService.loading()) {
        return [] as DataTable[];
      } else {
        return this.dataService.getPopulationByContinent(this.minPopulation);
      }
    });
  }

  onMinPopulation(minPopulation: number) {
    this.minPopulation = minPopulation;
  }
}
